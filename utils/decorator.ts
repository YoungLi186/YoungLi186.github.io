export function cacheAsync<Args extends any[], Returns>(
    asyncFunc: (...args: Args) => Promise<Returns>,
) {
    let result: Returns
    return async (...args: Args) => {
        if (!result) result = await asyncFunc(...args)
        return result
    }
}
