import BackLink from "@/components/BackLink"

export default function NotFound() {
    return (
        <div className="mx-auto my-12">
            <h1 className="bg-gradient-to-br from-[#e0f2fe] to-[#66ccff] bg-clip-text text-5xl font-extrabold text-transparent">
                404 Not Found
            </h1>
            <p className="my-2">Could not find requested resource</p>
            <BackLink>Return Home</BackLink>
        </div>
    )
}
