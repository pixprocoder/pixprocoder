import Image from "next/image";
import { projects } from "../../../constants";
import Link from "next/link";

function PortfolioDetailPage({ params }: any) {
  const singleProject = projects.find((p) => p.id === params?.id);

  return (
    <div className="container mx-auto">
      <Image width={640} height={640} src={singleProject?.image} alt="img" />
      <h1 className="text-2xl">{singleProject?.title}</h1>
      <div>
        <p>{singleProject?.description}</p>
        <ul className="my-4">
          <li>👉 User can login</li>
          <li>👉 User can Sign up</li>
          <li>👉 User can Test</li>
        </ul>
      </div>
      <div className="flex gap-3">
        <Link href={singleProject?.gitHubLink} target="_blank">
          <div className="flex gap-2 underline hover:text-blue-500">GitHub</div>
        </Link>
        <Link href={singleProject?.liveLink} target="_blank">
          <div className="flex gap-2 underline hover:text-blue-500">
            Live Link
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PortfolioDetailPage;
