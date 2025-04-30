'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '../lib/utils';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  FaLongArrowAltRight,
  FaGithub,
  FaExternalLinkAlt,
} from 'react-icons/fa';

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
      className="group relative flex flex-col justify-center items-center hover:-translate-y-2 transition-transform duration-300"
    >
      <Card className="bg-background border border-border/50 w-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden">
          <Link href={`/portfolio/${id}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-4">
          {/* Tags */}
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t: any, i: number) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs font-medium px-3 py-1 rounded-full border-border/50 bg-background/80 backdrop-blur-sm hover:bg-accent/50 transition-colors"
                >
                  #{t?.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground font-montserrat">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/portfolio/${id}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <span>Case Study</span>
              <FaLongArrowAltRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full w-10 h-10 p-2 hover:bg-accent/50"
              >
                <Link href={gitHubLink} target="_blank">
                  <FaGithub className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full w-10 h-10 p-2 hover:bg-accent/50"
              >
                <Link href={liveLink} target="_blank">
                  <FaExternalLinkAlt className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default PortfolioCard;
