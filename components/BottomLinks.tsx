import Link from "next/link"
import clsx from "clsx"
import { SVGProps } from "react"
import * as config from "@/app/config"

export default function BottomLinks({ className }: { className?: string }) {
    const mapper: [React.FC, string][] = [
        [PhRssSimpleDuotone, "/feed.json"],
    ] as const

    if (config.github) {
        mapper.unshift([
            PhGithubLogoDuotone,
            `https://github.com/${config.github}`,
        ])
    }

    return (
        <ul
            className={clsx(
                className,
                "flex items-center justify-center gap-2",
            )}
        >
            {mapper.map(([Icon, url]) => (
                <li
                    key={url}
                    className="duration-300 hover:scale-110 active:scale-95"
                >
                    <Link href={url}>
                        <Icon />
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export function PhGithubLogoDuotone(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            {...props}
        >
            <g fill="currentColor">
                <path
                    d="M208 104v8a48 48 0 0 1-48 48h-24a32 32 0 0 1 32 32v40h-64v-40a32 32 0 0 1 32-32h-24a48 48 0 0 1-48-48v-8a49.28 49.28 0 0 1 8.51-27.3A51.92 51.92 0 0 1 76 32a52 52 0 0 1 43.83 24h32.34A52 52 0 0 1 196 32a51.92 51.92 0 0 1 3.49 44.7A49.28 49.28 0 0 1 208 104Z"
                    opacity=".2"
                ></path>
                <path d="M208.3 75.68A59.74 59.74 0 0 0 202.93 28a8 8 0 0 0-6.93-4a59.75 59.75 0 0 0-48 24h-24a59.75 59.75 0 0 0-48-24a8 8 0 0 0-6.93 4a59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24a40 40 0 0 0-40-40a8 8 0 0 0 0 16a24 24 0 0 1 24 24a40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58 58 0 0 0-7.7-28.32ZM200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48a8 8 0 0 0 1.1-7.69a43.81 43.81 0 0 1 .79-33.58a43.88 43.88 0 0 1 32.32 20.06a8 8 0 0 0 6.71 3.69h32.35a8 8 0 0 0 6.74-3.69a43.87 43.87 0 0 1 32.32-20.06a43.81 43.81 0 0 1 .77 33.58a8.09 8.09 0 0 0 1 7.65a41.76 41.76 0 0 1 7 22.52Z"></path>
            </g>
        </svg>
    )
}

export function PhRssSimpleDuotone(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
            {...props}
        >
            <g fill="currentColor">
                <path
                    d="M208 200H56V48a152 152 0 0 1 152 152Z"
                    opacity=".2"
                ></path>
                <path d="M216 200a8 8 0 0 1-16 0c0-79.4-64.6-144-144-144a8 8 0 0 1 0-16c88.22 0 160 71.78 160 160ZM56 112a8 8 0 0 0 0 16a72.08 72.08 0 0 1 72 72a8 8 0 0 0 16 0a88.1 88.1 0 0 0-88-88Zm4 72a12 12 0 1 0 12 12a12 12 0 0 0-12-12Z"></path>
            </g>
        </svg>
    )
}