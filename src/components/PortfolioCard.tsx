'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Link from 'next/link';
import { cn } from '../lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
  gitHubLink: string;
  liveLink: string;
  tags?: string[] | undefined | null | any;
};

const PortfolioCard = ({
  id,
  title,
  description,
  image,
  gitHubLink,
  liveLink,
  tags,
}: Props) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section
      data-aos="fade-up"
      data-aos-duration="500"
      className=" flex flex-col justify-center items-center "
    >
      <Card className="bg-gray-950 border border-gray-800 w-full ">
        <CardHeader>
          <Link href={`/portfolio/${id}`}>
            <div className="  rounded-lg flex justify-center overflow-hidden">
              <img
                src={image}
                alt="Image"
                className="transform transition-transform duration-500 hover:scale-125"
              />
            </div>
          </Link>
          <CardTitle className="text-white  font-bold">{title}</CardTitle>
          <CardDescription className="text-gray-300">
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Link className="w-full" href={`/portfolio/${id}`}>
            <Button className="w-full secondary-btn">Read More</Button>
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default PortfolioCard;
