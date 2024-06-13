import { Metadata } from "next"
import * as config from "@/app/config"
import FriendCard from "@/components/FriendCard"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Friends | ${config.siteTitle}`,
    }
}

export default function Page() {
    return (
        <div className="grid grid-cols-2 content-evenly items-center justify-evenly gap-4 md:grid-cols-3">
            {config.friends.map((friend) => (
                <FriendCard {...friend} />
            ))}
        </div>
    )
}
