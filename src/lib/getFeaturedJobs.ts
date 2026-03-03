/* eslint-disable @typescript-eslint/no-explicit-any */

import { getJobs } from "./getJobs";

export async function getFeaturedJobs() {
  const jobs = await getJobs();

  return jobs.filter((job: any) => job.featured === true);
}
