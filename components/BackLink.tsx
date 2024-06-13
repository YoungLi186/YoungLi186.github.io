import Link from "next/link"

export default function BackLink({
    href = "/",
    children = "Back to home",
}: {
    href?: string
    children?: React.ReactNode
}) {
    return (
        <Link href={href} className="group relative inline-flex">
            <div className="relative inline-block">
                <div className="absolute bottom-0 left-0 -z-10 box-border h-[2px] w-full bg-[#66ccff] transition-[height] group-hover:h-full group-hover:p-2"></div>
                <span className="absolute -left-4 -translate-x-4 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
                    ←
                </span>
                <span>{children}</span>
            </div>
        </Link>
    )
}
