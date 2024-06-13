/** @type {import('next').NextConfig} */
const nextConfig = {}
/** @type {import('next').NextConfig} */
const nextConfigSSG = {
    output: "export",
    images: { unoptimized: true },
}
module.exports = nextConfigSSG

module.exports = {
    ...nextConfigSSG,
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
    ) => {
        config.plugins.push(
            new webpack.DefinePlugin({
                __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
            }),
        )
        return config
    },
}
