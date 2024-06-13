import "./globals.css"
import "./github-markdown.scss"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { profileImage, name, siteTitle, description } from "@/app/config"
import NavLinks from "./NavLinks"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
    title: siteTitle,
    description,
    authors: [{ name }],
    metadataBase: new URL("https://ray.deno.dev"),
    openGraph: {
        images: `https://og-image.vercel.app/${encodeURI(
            siteTitle,
        )}.png?${new URLSearchParams({
            theme: "light",
            md: "0",
            fontSize: "75px",
            // images: "https://assets.zeit.co/image/upload/front/assets/design/nextjs-black-logo.svg"
        })}`,
    },
    other: {
        custom: "meta",
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="flex min-h-[100vh] flex-col">
                <header className="pb-4 pt-8">
                    <Avatar />
                    <NavLinks />
                </header>
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    )
}

function Avatar() {
    return (
        <div className="flex items-center justify-center">
            <Link href="/">
                <div className="transition duration-500 hover:scale-105">
                    <Image
                        priority
                        src={profileImage}
                        height={144}
                        width={144}
                        alt={name}
                        className="rounded-full"
                    />
                </div>
                <h3 className="text-center font-mono text-gray-900 no-underline dark:text-gray-300">
                    {name}
                </h3>
            </Link>
        </div>
    )
}
