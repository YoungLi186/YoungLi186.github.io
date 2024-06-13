import pako from "pako"

export function compressString(
    s: string,
    options?: pako.DeflateFunctionOptions,
) {
    const data = Buffer.from(s, "utf8")
    const compressed = pako.deflate(data, options)
    const result = Buffer.from(compressed)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
    return result
}

/**
 * @docs https://kroki.io/
 */
export function krori(
    diagram_type: string,
    diagram_source: string,
    output_format: "svg" | "png" | "pdf" = "svg",
) {
    return `https://kroki.io/${diagram_type}/${output_format}/${compressString(diagram_source, { level: 9 })}`
}

/**
 * @docs https://mermaid.ink/
 * https://github.com/jihchi/mermaid.ink/blob/main/src/node_modules/getOptionsFromCode.js
 */
export function mermaid(code: string, format = "svg") {
    return `https://mermaid.ink/${format}/pako:${compressString(JSON.stringify({ code }))}`
}
