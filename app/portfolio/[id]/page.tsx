import { projects } from "@/constants";

function PortfolioDetailPage({ params }: any) {
  const singleProject = projects.find((p) => p.id === params?.id);

  return <div>PortfolioDetailPage {singleProject?.id}</div>;
}

export default PortfolioDetailPage;
