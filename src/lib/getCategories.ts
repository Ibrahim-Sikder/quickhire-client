/* eslint-disable @typescript-eslint/no-explicit-any */

import { Category } from "@/types/category";
import { getJobs } from "./getJobs";

export async function getCategories(): Promise<Category[]> {
  const jobs = await getJobs();

  const categoryMap: Record<string, Category> = {};

  jobs.forEach((job: any) => {
    const name = job.category;

    if (!categoryMap[name]) {
      categoryMap[name] = {
        name,
        jobCount: 0,
        isActive: false,
      };
    }

    categoryMap[name].jobCount += 1;
  });

  return Object.values(categoryMap);
}
