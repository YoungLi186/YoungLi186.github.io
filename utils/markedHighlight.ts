/**
 * A modified version of [marked-highlight](https://github.com/markedjs/marked-highlight)
 */

import type { MarkedExtension, Token } from "marked"

type Highlight = (code: string, lang: string, info: string) => string

type HighlightAsync = (
    code: string,
    lang: string,
    info: string,
) => Promise<string>

export function markedHighlight(
    options:
        | { async?: false; highlight: Highlight }
        | { async: true; highlight: HighlightAsync },
): MarkedExtension {
    if (typeof options === "function") {
        options = {
            highlight: options,
        }
    }

    if (!options || typeof options.highlight !== "function") {
        throw new Error("Must provide highlight function")
    }

    return {
        async: !!options.async,
        walkTokens(token: Token) {
            if (token.type !== "code") {
                return
            }

            const lang = getLang(token.lang)

            if (options.async) {
                return Promise.resolve(
                    options.highlight(token.text, lang, token.lang || ""),
                ).then(updateToken(token))
            }

            const code = options.highlight(token.text, lang, token.lang || "")

            //@ts-ignore
            if (code instanceof Promise) {
                throw new Error(
                    "markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.",
                )
            }
            updateToken(token)(code)
        },
        renderer: {
            code(
                code: string,
                infoString: string | undefined,
                escaped: boolean,
            ): string | false {
                code = code.replace(/\n$/, "")
                return escaped ? code : escape(code, true)
            },
        },
    }
}

function getLang(lang: string) {
    return (lang || "").match(/\S*/)![0]
}

function updateToken(token: Token & { text?: string; escaped?: boolean }) {
    return (code: string) => {
        if (typeof code === "string" && code !== token.text) {
            token.escaped = true
            token.text = code
        }
    }
}

// copied from marked helpers
const escapeTest = /[&<>"']/
const escapeReplace = new RegExp(escapeTest.source, "g")
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g")
const escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
} as const
const getEscapeReplacement = (ch: string) =>
    escapeReplacements[ch as keyof typeof escapeReplacements]
function escape(html: string, encode: boolean) {
    if (encode) {
        if (escapeTest.test(html)) {
            return html.replace(escapeReplace, getEscapeReplacement)
        }
    } else {
        if (escapeTestNoEncode.test(html)) {
            return html.replace(escapeReplaceNoEncode, getEscapeReplacement)
        }
    }

    return html
}
