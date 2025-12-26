import axios from "axios"
import { unstable_cache } from "next/cache";

export default async function useServerData({ endpoint, cacheKey, revalidateTime }) {
    try {
        if (cacheKey) {
            const fetchData = unstable_cache(
                async () => {
                    const { data } = await axios.get(`${API_URL}${endpoint}`);
                    return data;
                },
                [cacheKey],
                { revalidate: revalidateTime }
            );

            return fetchData();
        }

        const { data } = await axios.get(`${API_URL}${endpoint}`, {
            headers: { "Cache-Control": "no-store" },
        });
        return data;

    } catch (err) {
        console.error("SSR fetch error:", err?.message);
        throw new Error("Data fetch failed");
    }
}
