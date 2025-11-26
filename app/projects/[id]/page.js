import ProjectDetail from "@/components/ProjectDetail";

export default async function ProjectPage({ params }) {
  const projectId = (await params).id;
  return <ProjectDetail projectId={projectId} />;
}
