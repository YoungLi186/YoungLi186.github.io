export const name = "Young"
export const github = "YoungLi186"
export const siteTitle = "Young's blog"

// optional
export const baseUrl = ""

// waline: https://waline.js.org/
export const walineServerURL: string | undefined = ""

// this is for <meta name="description" ...>
export const description = "A personal blog powered by Next.js"

// this can also be a url
export const profileImage = "/images/profile.png"

export const pages: Record<string, string> = {
    // this is for navigation
    Home: "/",
    Archives: "/archives",
    Tags: "/tags",
    Friends: "/friends",
}

export const friends: Array<{
    name: string
    url: string
}> = [
    {
        name: "aozakiaoko",
        url: "https://aozakiaoko.love",
    },
    {
        name: "departever",
        url: "https://www.roxybest.top",
    },
]
