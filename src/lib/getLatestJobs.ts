/* eslint-disable @typescript-eslint/no-explicit-any */

import { getJobs } from "./getJobs";


export async function getLatestJobs() {
    const jobs = await getJobs();

    return jobs
        .filter((job: any) => job.latest === true)
        .sort(
            (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
}