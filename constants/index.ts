import css from "../public/tech/css.png";
import docker from "../public/tech/docker.png";
import figma from "../public/tech/figma.png";
import git from "../public/tech/git.png";
import html from "../public/tech/html.png";
import javascript from "../public/tech/javascript.png";
import mongodb from "../public/tech/mongodb.png";
import nodejs from "../public/tech/nodejs.png";
import reactjs from "../public/tech/reactjs.png";
import redux from "../public/tech/redux.png";
import tailwind from "../public/tech/tailwind.png";
import typescript from "../public/tech/typescript.png";

import web from "../public/assets/web.png";
import mobile from "../public/assets/mobile.png";
import backend from "../public/assets/backend.png";
import creator from "../public/assets/creator.png";

export type NavLink = {
  to: string;
  key: string;
  external?: boolean; // Make 'external' property optional with '?' to handle internal links.
};

export const navLinks: NavLink[] = [
  { to: "home", key: "Home" },
  { to: "about", key: "About" },
  { to: "portfolio", key: "Portfolio" },
  { to: "skills-section", key: "Skills" },
  { to: "services", key: "Services" },
  { to: "contact-section", key: "Contact" },
];

export const skills = [];

export const portfolioMenu = [
  { href: "/", id: 1, value: "All" },
  { href: "/", id: 2, value: "Full Stack" },
  { href: "/", id: 3, value: "Graphic Design" },
  { href: "/", id: 4, value: "Angular" },
  { href: "/", id: 5, value: "Node" },
  { href: "/", id: 6, value: "React" },
];
/**
 * 




 * 
 */

// type IProject = {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   gitHubLink: string;
//   liveLink: string;
//   category: string;
//   tags?: [] | null;
// };

export const projects = [
  {
    id: "1",
    title: "Blog Hub",
    description:
      "In This website users can read blog posts. and they can Track how much time is required to read specific blog post",
    image: "https://i.ibb.co/kqTZcPF/Asset-1-3x.png",
    gitHubLink: "https://github.com/pixprocoder",
    liveLink: "https://github.com/pixprocoder",
    category: "Full Stack",
  },
  {
    id: "2",
    title: "Ema john",
    description:
      "This is an E-commerce website. full stack application. there are so many features are in this website ",
    image: "https://i.ibb.co/Zzxcbfc/Asset-2-3x.png",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "Next.js",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    gitHubLink: "https://github.com/pixprocoder",
    liveLink: "https://github.com/pixprocoder",
    category: "Full Stack",
  },
  {
    id: "3",
    title: "Geometry Genius",
    description:
      "Problem solving website. This website has functionality such us calculation. visit for more info :) ",
    image: "https://i.ibb.co/Krh5RCR/Asset-3-3x.png",
    tags: [
      {
        name: "node.js",
        color: "blue-text-gradient",
      },
      {
        name: "bootstrap",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    gitHubLink: "https://github.com/pixprocoder",
    liveLink: "https://github.com/pixprocoder",
    category: "Graphic Design",
  },
  {
    id: "4",
    title: "AI Universe Hub",
    description:
      "This website is for data fetching. how to read data and implement them and show them in the ui. ",
    image: "https://i.ibb.co/xHRWwrC/Asset-4-3x.png",
    gitHubLink: "https://github.com/pixprocoder",
    liveLink: "https://github.com/pixprocoder",
    category: "Angular",
  },
  {
    id: "5",
    title: "Quiz Hero",
    description:
      "Quiz Hero is an website were users can learn and paly with quiz. they can be able to see their result and much more ",
    image: "https://i.ibb.co/ccY5JL1/Asset-5-3x.png",
    gitHubLink: "https://github.com/pixprocoder",
    liveLink: "https://github.com/pixprocoder",
    category: "Node",
  },
  {
    id: "6",
    title: "Project 3",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    image: "https://i.ibb.co/Zzxcbfc/Asset-2-3x.png",
    gitHubLink: "https://github.com/pixprocoder",
    liveLink: "https://github.com/pixprocoder",
    category: "Node",
  },
];

export const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

export const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },

  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

// const experiences = [
//   {
//     title: "React.js Developer",
//     company_name: "Starbucks",
//     icon: starbucks,
//     iconBg: "#383E56",
//     date: "March 2020 - April 2021",
//     points: [
//       "Developing and maintaining web applications using React.js and other related technologies.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Implementing responsive design and ensuring cross-browser compatibility.",
//       "Participating in code reviews and providing constructive feedback to other developers.",
//     ],
//   },
//   {
//     title: "React Native Developer",
//     company_name: "Tesla",
//     icon: tesla,
//     iconBg: "#E6DEDD",
//     date: "Jan 2021 - Feb 2022",
//     points: [
//       "Developing and maintaining web applications using React.js and other related technologies.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Implementing responsive design and ensuring cross-browser compatibility.",
//       "Participating in code reviews and providing constructive feedback to other developers.",
//     ],
//   },
//   {
//     title: "Web Developer",
//     company_name: "Shopify",
//     icon: shopify,
//     iconBg: "#383E56",
//     date: "Jan 2022 - Jan 2023",
//     points: [
//       "Developing and maintaining web applications using React.js and other related technologies.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Implementing responsive design and ensuring cross-browser compatibility.",
//       "Participating in code reviews and providing constructive feedback to other developers.",
//     ],
//   },
//   {
//     title: "Full stack Developer",
//     company_name: "Meta",
//     icon: meta,
//     iconBg: "#E6DEDD",
//     date: "Jan 2023 - Present",
//     points: [
//       "Developing and maintaining web applications using React.js and other related technologies.",
//       "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
//       "Implementing responsive design and ensuring cross-browser compatibility.",
//       "Participating in code reviews and providing constructive feedback to other developers.",
//     ],
//   },
// ];

// const testimonials = [
//   {
//     testimonial:
//       "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
//     name: "Sara Lee",
//     designation: "CFO",
//     company: "Acme Co",
//     image: "https://randomuser.me/api/portraits/women/4.jpg",
//   },
//   {
//     testimonial:
//       "I've never met a web developer who truly cares about their clients' success like Rick does.",
//     name: "Chris Brown",
//     designation: "COO",
//     company: "DEF Corp",
//     image: "https://randomuser.me/api/portraits/men/5.jpg",
//   },
//   {
//     testimonial:
//       "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
//     name: "Lisa Wang",
//     designation: "CTO",
//     company: "456 Enterprises",
//     image: "https://randomuser.me/api/portraits/women/6.jpg",
//   },
// ];

// const projects2 = [
//   {
//     name: "Car Rent",
//     description:
//       "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
//     tags: [
//       {
//         name: "react",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "mongodb",
//         color: "green-text-gradient",
//       },
//       {
//         name: "tailwind",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: carrent,
//     source_code_link: "https://github.com/",
//   },
//   {
//     name: "Job IT",
//     description:
//       "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
//     tags: [
//       {
//         name: "react",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "restapi",
//         color: "green-text-gradient",
//       },
//       {
//         name: "scss",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: jobit,
//     source_code_link: "https://github.com/",
//   },
//   {
//     name: "Trip Guide",
//     description:
//       "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
//     tags: [
//       {
//         name: "nextjs",
//         color: "blue-text-gradient",
//       },
//       {
//         name: "supabase",
//         color: "green-text-gradient",
//       },
//       {
//         name: "css",
//         color: "pink-text-gradient",
//       },
//     ],
//     image: tripguide,
//     source_code_link: "https://github.com/",
//   },
// ];
