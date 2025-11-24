import ProjectDetail from '@/components/ProjectDetail';

export default function ProjectPage({ params }) {
  return <ProjectDetail projectId={params.id} />;
}