import BottomLinks from "@/components/BottomLinks"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container mx-auto flex max-w-[767px] flex-grow flex-col px-4">
            <section>{children}</section>
            <section className="mt-auto pb-2 pt-8">
                <BottomLinks />
            </section>
        </main>
    )
}
