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
import { Badge } from './ui/badge';
import { FaLongArrowAltRight } from 'react-icons/fa';

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
        <CardHeader className="px-4 py-2">
          <Link href={`/portfolio/${id}`}>
            <div className="  rounded-lg flex justify-center overflow-hidden">
              <img
                src={image}
                alt="Image"
                className="transform transition-transform duration-500 hover:scale-125"
              />
            </div>
          </Link>
          <CardTitle className="text-gray-200 mt-2 md:mt-4 font-bold">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-300 text-xs my-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex items-start flex-col gap-2">
          <div className="flex gap-2">
            {tags &&
              tags.map((t: any, i: number) => (
                <Badge
                  key={i}
                  className={`${t?.color} bg-gray-700 hover:bg-gray-800 cursor-pointer`}
                >
                  # {t?.name}
                </Badge>
              ))}
          </div>

          <Link
            className="group text-primary flex gap-2 underline items-center cursor-pointer"
            href={`/portfolio/${id}`}
          >
            <span>Read More</span>
            <FaLongArrowAltRight className="transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
};

export default PortfolioCard;
