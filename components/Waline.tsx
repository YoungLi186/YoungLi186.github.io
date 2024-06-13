"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import {
    type WalineInstance,
    type WalineInitOptions,
    init,
} from "@waline/client"

import "@waline/client/waline.css"

export type WalineOptions = Omit<WalineInitOptions, "el" | "serverURL"> & {
    path?: string
    serverURL: string
}

export const Waline = (props: WalineOptions) => {
    const walineInstanceRef = useRef<WalineInstance | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const path = usePathname()

    useEffect(() => {
        walineInstanceRef.current = init({
            path,
            pageview: true,
            dark: "html.dark",
            ...props,
            el: containerRef.current,
        })

        return () => walineInstanceRef.current?.destroy()
    }, [])

    useEffect(() => {
        walineInstanceRef.current?.update(props)
    }, [props])

    return <div ref={containerRef} />
}
export default Waline
