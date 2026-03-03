export async function getJobs() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/jobs`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) return [];

        const data = await res.json();
        return data?.data?.jobs ?? [];
    } catch (error) {
        console.error("Job fetch error:", error);
        return [];
    }
}