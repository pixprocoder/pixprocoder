import React from 'react';
import Image from 'next/image';
import { projects } from '../../../../constants';
import Link from 'next/link';
import { Button } from '@/src/components/ui/button';
import GoogleAdsense from '../../../../components/GoogleAdSense.tsx';

function PortfolioDetailPage({ params }: any) {
  const singleProject = projects.find((p) => p.id === params?.id);

  return (
    <div className="container mx-auto">
      {/* <GoogleAdsense /> */}
      <h1 className="text-2xl my-2 text-center text-blue-500 font-bold ">
        {singleProject?.title}
      </h1>
      <p className="text-xl my-4 underline ">Overview</p>
      <p>{singleProject?.description}</p>
      <div className="">
        <p className="text-xl my-4 underline ">Screenshots</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Image
            width={640}
            height={640}
            src={singleProject?.image}
            alt="img"
          />
          <Image
            width={640}
            height={640}
            src={singleProject?.image}
            alt="img"
          />
          <Image
            width={640}
            height={640}
            src={singleProject?.image}
            alt="img"
          />
          <Image
            width={640}
            height={640}
            src={singleProject?.image}
            alt="img"
          />
        </div>
      </div>

      <div className="grid grid-col-2 lg:grid-cols-2">
        <div>
          <p className="text-xl my-4 underline ">Features</p>
          <ul className="my-4">
            <p>This section will be dynamic</p>
            <li>👉 User can login</li>
            <li>👉 User can Sign up</li>
            <li>👉 User can Test</li>
          </ul>
        </div>
        <div>
          <p className="text-xl my-4 underline ">Technologies</p>
          <ul className="my-4">
            <li>React.js</li>
            <li>Node.js</li>
            <li>Express.js</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-3 my-4">
        <Link href={singleProject?.gitHubLink} target="_blank">
          <Button>
            <div className="flex gap-2 underline hover:text-blue-500">
              GitHub
            </div>
          </Button>
        </Link>

        <Link href={singleProject?.liveLink} target="_blank">
          <Button className="flex gap-2 underline hover:text-blue-500">
            Live Link
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PortfolioDetailPage;
