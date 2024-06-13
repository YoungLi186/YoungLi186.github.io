---
title: OSS阿里云直传图片
date: 2024-06-13 15:23:42
categories:
  - 对象存储
tags:
  - 实践
typora-root-url: ./
---



# 客户端直传

客户端直传是指客户端直接上传文件到对象存储OSS。相对于服务端代理上传，客户端直传避免了业务服务器中转文件，提高了上传速度，节省了服务器资源。



## 为什么需要客户端直传

传统文件上传流程涉及客户端到业务服务器，再到对象存储服务（OSS）的两次数据传输，这不仅增加了网络负担，还提高了服务端的资源消耗。尽管在不常上传文件的场景下此方案可行，但对于中小型公司而言，其服务器带宽通常在10~50M之间，若文件上传频繁，则不到10人同时上传就可能导致带宽饱和，进而影响服务稳定性。







## 如何实现客户端直传

### **跨域访问**

如果客户端是Web端或小程序，需要解决跨域访问被限制的问题。

浏览器以及小程序容器出于安全考虑，通常都会限制跨域访问，这一限制也会限制的客户端代码直连OSS。可以通过配置OSS Bucket的跨域访问规则，来允许指定域名下的Web应用或小程序直接访问OSS。



![image-20240613153633116](/OSS阿里云直传图片/image-20240613153633116.png)





### 安全授权

上传文件到OSS需要使用RAM用户的访问密钥（AccessKey）来完成签名认证，但是在客户端中使用长期有效的访问密钥，可能会导致访问密钥泄露，进而引起安全问题。为了解决这一问题，可以选择以下方案实现安全上传：

- **服务端生成STS临时访问凭证**

  对于大部分上传文件的场景，建议您在服务端使用STS SDK获取STS临时访问凭证，然后在客户端使用STS临时凭证和OSS SDK直接上传文件。客户端能重复使用服务端生成的STS临时访问凭证生成签名，因此适用于基于分片上传大文件、基于分片断点续传的场景。需要注意的是，频繁地调用STS服务会引起限流，因此建议您对STS临时凭证做缓存处理，并在有效期前刷新。为了确保STS临时访问凭证不被客户端滥用，建议您为STS临时访问凭证添加额外的权限策略，以进一步限制其权限。更多信息，请参见[什么是STS](https://help.aliyun.com/zh/ram/product-overview/what-is-sts)。

- **服务端生成PostObject所需的签名和Post Policy**

  对于需要限制上传文件属性的场景，您可以在服务端生成PostObject所需的Post签名、PostPolicy等信息，然后客户端可以凭借这些信息，在一定的限制下不依赖OSS SDK直接上传文件。您可以借助服务端生成的PostPolicy限制客户端上传的文件，例如限制文件大小、文件类型。此方案适用于通过HTML表单上传的方式上传文件。需要注意的是，此方案不支持基于分片上传大文件、基于分片断点续传的场景。更多信息，请参见[PostObject](https://help.aliyun.com/zh/oss/developer-reference/postobject#t4705.html)。

- **服务端生成PutObject所需的签名URL**

  对于简单上传文件的场景，您可以在服务端使用OSS SDK生成PutObject所需的签名URL，客户端可以凭借签名URL，不依赖OSS SDK直接上传文件。需要注意的是，此方案不适用于基于分片上传大文件、基于分片断点续传的场景。在服务端对每个分片生成签名URL，并将签名URL返回给客户端，会增加与服务端的交互次数和网络请求的复杂性。另外，客户端可能会修改分片的内容或顺序，导致最终合并的文件不正确。更多信息，请参见[签名版本1](https://help.aliyun.com/zh/oss/developer-reference/ddd-signatures-to-urls)。







### 具体示例

**服务端生成PostObject所需的签名和Post Policy**

服务端代码

```java
    @GetMapping("/getPolicy")
    public ResponseDO getPolicy() throws UnsupportedEncodingException, JSONException {
        // host的格式为 bucketname.endpoint
        String host = StringFormatter.concat("https://", OSSConstant.bucketName, ".", OSSConstant.endpoint).getValue();
        // callbackUrl为 上传回调服务器的URL，请将下面的IP和Port配置为您自己的真实信息。
        // String callbackUrl = "http://88.88.88.88:8888";
        // 每一天产生一个文件夹
        String dir = LocalDate.now().toString() + "/"; // 用户上传文件时指定的前缀,如果是 / 则自动检测为文件夹。

        JSONObject jsonObject = new JSONObject();

        long expireTime = 100;
        long expireEndTime = System.currentTimeMillis() + expireTime * 1000; //过期时间 100 秒
        Date expiration = new Date(expireEndTime);
        // PostObject请求最大可支持的文件大小为5 GB，即CONTENT_LENGTH_RANGE为5*1024*1024*1024。
        PolicyConditions policyConds = new PolicyConditions();
        policyConds.addConditionItem(PolicyConditions.COND_CONTENT_LENGTH_RANGE, 0, 1048576000);
        policyConds.addConditionItem(MatchMode.StartWith, PolicyConditions.COND_KEY, dir);
        String postPolicy = ossClient.generatePostPolicy(expiration, policyConds);
        byte[] binaryData = postPolicy.getBytes(StandardCharsets.UTF_8);
        String encodedPolicy = BinaryUtil.toBase64String(binaryData);
        String postSignature = ossClient.calculatePostSignature(postPolicy);

        jsonObject.put("OSSAccessKeyId", OSSConstant.accessId);
        jsonObject.put("policy", encodedPolicy);
        jsonObject.put("signature", postSignature);
        jsonObject.put("dir", dir);
        jsonObject.put("host", host);
        jsonObject.put("expire", String.valueOf(expireEndTime / 1000));
        log.info("get Policy");
        return ResponseDO.success(jsonObject);
    }
```





客户端代码

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>文件上传</title>
</head>
<body>
<div>
    <input type="file" id="file">

    <button id="upload">上传文件</button>
</div>
</body>

<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>

<script>
    var filename = '';
    var file = null;
    $("#file").change(function () {
        let f = document.getElementById("file").files[0];
        if (typeof f != "undefined") {
            let src = window.URL.createObjectURL(f);
            if (src === null || src === '') {
                return;
            }
            filename = f.name;
            file = f;
        }
    });

    $("#upload").click(function () {
        let data = getPolicy();
        var formData = new FormData();
        formData.append("OSSAccessKeyId", data.OSSAccessKeyId);
        formData.append("signature", data.signature);
        formData.append("policy", data.policy);
        formData.append("key", data.dir + (new Date()).valueOf() + filename);//注意顺序，file要在key的后面。不然会返回找不到key 的错误
        formData.append("file", file);
        formData.append("success_action_status", 200);
        $.ajax({
            url: data.host,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data, status, response) {
                if (status === 'success') {
                    alert("上传成功！")
                }
            },
            error: function (e) {
                alert("上传失败！");
                console.log("失败", e);
            }
        });
    });

    function getPolicy() {
        var restultData = null;
        $.ajax({
            url: "http://localhost:8080/getPolicy",//设置为后台服务地址
            type: "GET",
            async: false,
            success: function (data, status, request) {
                if (status === 'success') {
console.log(restultData,status);
                    restultData = data.data;
                }
            },
            error: function (e) {
                console.log("失败", e);
            }
        });

        
        return restultData;
    }


</script>
</html>

```















