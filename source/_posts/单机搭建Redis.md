---
title: 单机搭建Redis
date: 2023-11-11 15:32:18
categories:
  - Redis
tags:
  - 实践
typora-root-url: ./
---



# Redis安装

**下载方式**

可以从[此处](https://download.redis.io/releases/ )下载或者使用命令下载

```sh
wget https://download.redis.io/releases/redis-6.2.7.tar.gz
```



**解压**

```sh
tar xzf redis-6.2.7.tar.gz
```



**编译**

```sh
cd redis-6.2.7/
make
```



**安装**

```sh
sudo make install 
```



# 修改配置



打开配置文件

```sh
vim redis.conf
```



修改配置

```properties
# 绑定地址，默认是127.0.0.1，会导致只能在本地访问。修改为0.0.0.0则可以在任意IP访问
bind 0.0.0.0
# 保护模式，关闭保护模式
protected-mode no
# 数据库数量，设置为1
databases 1
# 以后台方式启动
daemonize yes
```



# 启动和关闭服务

带配置文件启动Redis：

```sh
redis-server ../redis.conf
```

停止redis服务：

```sh
redis-cli shutdown
```





















