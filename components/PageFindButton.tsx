"use client"

import { useState, useEffect } from "react"
import FancyButton from "./FancyButton"
import clsx from "clsx"
import "./PageFindButton.css"

declare global {
    interface Window {
        pagefind: any
        PagefindUI: any
    }
}

let isPageFindLoaded = false
function loadPageFindUI() {
    if (isPageFindLoaded) return Promise.resolve()
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script")
        script.src = "/pagefind/pagefind-ui.js"
        script.onload = () => {
            isPageFindLoaded = true
            resolve()
        }
        script.onerror = reject
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "/pagefind/pagefind-ui.css"
        document.head.append(link, script)
    })
}

/**
 * https://pagefind.app/docs/ui-usage/
 */
export default function PageFindButton({ className }: { className?: string }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        loadPageFindUI()

        const onkeydown = (e: KeyboardEvent) => {
            if (open && e.key === "Escape") {
                setOpen(false)
            }
        }

        window.addEventListener("keydown", onkeydown)
        return () => window.removeEventListener("keydown", onkeydown)
    }, [])

    useEffect(() => {
        if (open) {
            const input = document.querySelector(
                "input.pagefind-ui__search-input",
            ) as HTMLInputElement
            input.focus()
        }
    }, [open])

    // next.js cannot use with createPortal()
    const modal = (
        <div
            className={clsx(
                "fixed inset-0 z-20 h-full w-full bg-[rgb(1_1_1_/_0.1)] p-4 shadow backdrop-blur-sm dark:bg-[rgb(0_0_0_/_0.5)]",
                "pagefind-modal text-start",
                open && "pagefind-modal-open",
            )}
            ref={(el) => {
                // react work around
                if (!el) return
                el.onclick = (ev) => {
                    if (ev.target === el) {
                        setOpen(false)
                    }
                }
            }}
        >
            <div className="mx-auto max-w-[600px] rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                <PageFind />
            </div>
        </div>
    )

    return (
        <>
            <FancyButton
                className={className}
                active={open}
                onClick={() => setOpen(true)}
            >
                Search
            </FancyButton>
            {modal}
        </>
    )
}

function PageFind({ className }: { className?: string }) {
    useEffect(() => {
        loadPageFindUI().then(
            () =>
                new window.PagefindUI({
                    element: "#search",
                    showSubResults: true,
                    // patch for next.js on vercel
                    processResult: (result: PageFindResult) => {
                        result.url = removeUnneededStuff(result.url)
                        result.sub_results?.forEach((sub) => {
                            sub.url = removeUnneededStuff(sub.url)
                        })
                        return result
                    },
                }),
        )
    }, [])
    return <div className={clsx("break-all", className)} id="search"></div>
}

function removeUnneededStuff(s: string) {
    if (s.endsWith(".html")) {
        return s.slice(0, -5)
    } else {
        return s.replace(/\.html#/, "#")
    }
}

interface PageFindResult {
    anchors: Array<{
        element: string
        id: string
        location: number
        text: number
    }>
    content: string
    excerpt: string
    filters: object
    locations: number[]
    meta: object
    raw_content: string
    raw_url: string
    sub_results: Array<
        Pick<
            PageFindResult,
            "anchors" | "excerpt" | "locations" | "url" | "weighted_locations"
        > & {
            title: string
        }
    >
    url: string
    weighted_locations: object
    word_count: number
}
