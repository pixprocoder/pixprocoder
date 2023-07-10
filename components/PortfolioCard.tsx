import React from "react";
import Button from "./Button";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image: string;
  gitHubLink: string;
  liveLink: string;
};

const PortfolioCard = ({
  title,
  description,
  image,
  gitHubLink,
  liveLink,
}: Props) => {
  return (
    <div className="card card-compact  bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-start">
          <Button title="Github">
            <Link href={gitHubLink}></Link>
          </Button>
          <Button title="LiveLink">
            <Link href={liveLink}></Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
