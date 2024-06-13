"use client"

import { useState, useEffect } from "react"
import FancyButton from "@/components/FancyButton"

export default function DarkModeButton({ className }: { className?: string }) {
    const theme = globalThis.localStorage?.getItem("theme")
    const [isDark, setDark] = useState(
        theme
            ? theme === "dark"
            : globalThis.matchMedia?.("(prefers-color-scheme: dark)")
                  .matches === true,
    )

    useEffect(() => {
        const onChange = () => {
            const prefersDark = matchMedia(
                "(prefers-color-scheme: dark)",
            ).matches
            setDark(prefersDark)
        }
        const matchSource = matchMedia("(prefers-color-scheme: dark)")
        matchSource.addEventListener("change", onChange)
        return () => {
            matchSource.removeEventListener("change", onChange)
        }
    }, [])

    useEffect(() => {
        if (isDark) localStorage.setItem("theme", "dark")
        else localStorage.removeItem("theme")

        if (isDark) document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
    }, [isDark])

    return (
        <FancyButton
            className={className}
            active={isDark}
            onClick={() => {
                setDark((isDark) => {
                    const nextIsDark = !isDark
                    if (nextIsDark) localStorage.setItem("theme", "dark")
                    else localStorage.removeItem("theme")
                    return nextIsDark
                })
            }}
        >
            Darkmode
        </FancyButton>
    )
}
