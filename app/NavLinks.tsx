"use client"

import FancyButton from "@/components/FancyButton"
import DarkModeButton from "@/components/DarkModeButton"
import PageFindButton from "@/components/PageFindButton"
import { usePathname } from "next/navigation"
import { pages } from "@/app/config"
import Link from "next/link"

export default function NavLink() {
    const pathname = usePathname()
    const equal = (a: string, b: string) =>
        a.replace(/\/$/, "") === b.replace(/\/$/, "")
    return (
        <>
            <div className="grid">
                <nav className="mx-auto text-balance text-center">
                    {Object.entries(pages).map(([name, href]) => (
                        <Link
                            key={href}
                            href={href}
                            className="mx-2 inline-block min-w-[60px]"
                        >
                            <FancyButton active={equal(pathname, href)}>
                                {name}
                            </FancyButton>
                        </Link>
                    ))}
                    <DarkModeButton className="mx-2" />
                    <PageFindButton className="mx-2" />
                </nav>
            </div>
        </>
    )
}
