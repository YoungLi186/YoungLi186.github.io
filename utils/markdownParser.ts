import { Marked, type MarkedExtension } from "marked"
import { markedHighlight } from "./markedHighlight"
import { mermaid } from "./krori"
import markedAlert from "marked-alert"
import GithubSlugger from "github-slugger"
import { codeToHtml } from "shiki"
import {
    transformerNotationDiff,
    transformerNotationHighlight,
    transformerNotationWordHighlight,
    transformerNotationFocus,
    transformerNotationErrorLevel,
} from "@shikijs/transformers"

const shikiOptions: Parameters<typeof codeToHtml>[1] = {
    /** https://shiki.style/packages/transformers */
    transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationFocus(),
        transformerNotationErrorLevel(),
    ],
    /** https://shiki.style/themes */
    theme: "dark-plus",
    /** https://shiki.style/languages */
    lang: "text",
}

function gfmHeadings(): MarkedExtension {
    const slugger = new GithubSlugger()
    const headings: { id: string; text: string; level: number }[] = []

    return {
        renderer: {
            heading(innerHTML: string, level: number) {
                const text = innerHTML.replace(/(<([^>]+)>)/gi, "").trim()
                const id = slugger.slug(text)

                const html = /*html*/ `
              <h${level} id="${id}">
                <a class="anchor" href="#${id}">
                  <div class="octicon octicon-link"></div>
                </a>
                ${innerHTML}
              </h${level}>`
                headings.push({ id, text, level })
                return html
            },
        },
        hooks: {
            preprocess: (x) => x,
            postprocess(html) {
                // hide if no headings
                if (headings.length === 0)
                    return /*html*/ `<aside class="markdown-body">${html}</aside><style>.\\\$markdownParser\\\${margin:0 auto}</style>`

                const tableOfContents = /*html*/ `<ul class="table-of-contents">${headings
                    .map(
                        ({ id, text, level }) =>
                            /*html*/ `<li>${"&nbsp;".repeat(
                                (level - 1) * 2,
                            )}<a href="#${id}" class="h${level}" title="${text}">${text}</a></li>`,
                    )
                    .join("\n")}</ul>`

                const tableOfContentsNormal = /*html*/ `<aside class="table-of-contents-normal"><div class="table-of-contents-inner"><strong>Table Of Contents</strong>${tableOfContents}</div></aside>`

                const tableOfContentsFloating = /*html*/ `<aside class="table-of-contents-floating"><details class="table-of-contents-inner"><summary>Table Of Contents</summary>${tableOfContents}</details></aside>`

                return /*html*/ `<aside class="markdown-body">${html}</aside> ${tableOfContentsNormal} ${tableOfContentsFloating}`
            },
        },
    }
}

async function highlight(code: string, lang: string, name?: string) {
    if (lang === "mermaid") {
        return `<figure><img src="${mermaid(code)}" alt="${name}"/></figure>`
    }
    try {
        return (
            /*html*/ `
<header class="before-shiki"><svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="52" height="16">
    <circle cx="8" cy="8" r="6" fill="rgb(255,95,86)" />
    <circle cx="26" cy="8" r="6" fill="rgb(255,189,46)" />
    <circle cx="44" cy="8" r="6" fill="rgb(39,201,63)" />
</svg>
<div class="text-ellipsis overflow-hidden">${name || lang}</div></header>` +
            (await codeToHtml(code, { ...shikiOptions, lang }))
        )
    } catch (e) {
        console.error(e)
        return await codeToHtml(code, shikiOptions)
    }
}

export function parseMarkdown(md: string, isSimpleOutput = false) {
    const extensions: MarkedExtension[] = []

    if (!isSimpleOutput) {
        extensions.push(
            markedHighlight({
                async: true,
                async highlight(code, lang, info) {
                    let name = lang

                    if (info.length > lang.length) {
                        const meta = info.slice(lang.length).trim() // meta as query
                        /**
                         * This is our special syntax, we use URLSearchParams
                         * Example:
                         * ```js ?name=file.js&collapse
                         * console.log('hi')
                         * ```
                         */
                        const sp = new URLSearchParams(meta)
                        if (sp.has("name")) {
                            name = sp.get("name")!
                        }
                        if (sp.has("hide")) {
                            return ""
                        } else if (sp.has("collapse")) {
                            const summary = sp.get("collapse") || lang
                            return /*html*/ `<details><summary>${summary}</summary>${await highlight(code, lang, name)}</details>`
                        }
                    }

                    return highlight(code, lang, name)
                },
            }),
        )
    }

    const marked = new Marked(...extensions).use(markedAlert())

    if (!isSimpleOutput) {
        marked
            .use({
                async: true,
                pedantic: false,
                gfm: true,
            })
            .use(gfmHeadings())
    }

    return marked.parse(md)
}
