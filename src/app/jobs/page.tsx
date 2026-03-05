import { connection } from "next/server";
import JobsContent from "./__components/JobsContent";

export default async function JobsPage() {
  await connection();
  return <JobsContent />;
}
