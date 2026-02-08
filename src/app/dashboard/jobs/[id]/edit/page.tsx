import { JobForm } from "../../_components/job-form";

export default async function DashboardEditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <JobForm jobId={id} />;
}
