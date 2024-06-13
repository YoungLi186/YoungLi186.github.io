export default function FriendCard({
    url,
    name,
}: {
    url: string
    name: string
}) {
    return (
        <div className="relative inline-block overflow-hidden rounded-3xl bg-white shadow transition duration-200 dark:bg-gray-800">
            <header className="h-[90px] bg-gradient-to-r from-[#6190E8] to-[#A7BFE8]">
                <img
                    className="block h-full w-full select-none object-cover"
                    src={`https://s0.wp.com/mshots/v1/${url}`}
                    alt={name}
                />
                <a
                    href={url}
                    target="_blank"
                    className="border-1 absolute right-2 top-2 inline-grid h-7 w-7 cursor-pointer place-items-center overflow-hidden rounded-xl border border-zinc-200 bg-white text-black transition duration-200 hover:rotate-12 hover:scale-105 dark:border-zinc-600 dark:bg-gray-800"
                >
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                            fill="currentColor"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </a>
            </header>
            <div className="px-4 py-2">
                <div
                    className="flex select-all flex-nowrap items-center gap-1"
                    title={name}
                >
                    <img
                        className="h-4 w-4 select-none object-cover"
                        src={`https://favicone.com/${new URL(url).hostname}`}
                        alt={name}
                    />
                    <span className="overflow-hidden text-ellipsis">
                        {name}
                    </span>
                </div>
                <small
                    className="inline-block max-w-full select-all overflow-hidden text-ellipsis text-xs text-zinc-400"
                    title={url}
                >
                    {url}
                </small>
            </div>
            <footer className="px-2 pb-2">
                <a href={url} target="_blank">
                    <button className="dark:saturate-75 group flex items-center gap-1 rounded-xl bg-[#e0f2fe] px-4 py-1 font-thin text-[#66ccff] dark:brightness-75">
                        <svg
                            className="transition duration-200 group-hover:opacity-0"
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            />
                            <path
                                d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            />
                            <path
                                d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            />
                            <path
                                d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span className="inline-block transition duration-200 group-hover:-translate-x-2 group-hover:scale-105 group-hover:font-normal">
                            Goto
                        </span>
                    </button>
                </a>
            </footer>
        </div>
    )
}
