import css from "../assets/tech/css.png";
import docker from "../assets/tech/docker.png";
import figma from "../assets/tech/figma.png";
import git from "../assets/tech/git.png";
import html from "../assets/tech/html.png";
import javascript from "../assets/tech/javascript.png";
import mongodb from "../assets/tech/mongodb.png";
import nodejs from "../assets/tech/nodejs.png";
import reactjs from "../assets/tech/reactjs.png";
import redux from "../assets/tech/redux.png";
import tailwind from "../assets/tech/tailwind.png";
import typescript from "../assets/tech/typescript.png";
import web from "../assets/web.png";
import mobile from "../assets/mobile.png";
import backend from "../assets/backend.png";
import creator from "../assets/creator.png";

export const navLinks = [
  { to: "/", key: "Home" },
  { to: "/blog", key: "Blog" },
  { to: "/courses", key: "Courses" },
  { to: "/shop", key: "Shop" },
  { to: "/portfolio", key: "Portfolio" },
  { to: "/services", key: "Services" },
  { to: "/contact", key: "Contact" },
];

export const skills = [];

export const portfolioMenu = [
  { href: "/", id: 1, value: "All" },
  { href: "/", id: 2, value: "Full Stack" },
  { href: "/", id: 3, value: "HTML/CSS/JS" },
  { href: "/", id: 8, value: "Next" },
  { href: "/", id: 4, value: "React" },
];

export const faqItems = [
  {
    value: 1,
    question:
      "What is your approach to designing and developing a website or project?",
    answer:
      " I believe in a holistic approach that blends creativity and technical expertise. My process typically involves understanding your project's goals and target audience, followed by crafting a well-thought-out design concept. Once the design is approved, I move into the development phase, utilizing the latest technologies and coding practices to bring the design to life. Regular communication and collaboration ensure that the final product aligns with your vision and exceeds expectations.",
  },
  {
    value: 2,
    question:
      "How do you handle responsive design to ensure a seamless user experience across devices?",
    answer:
      " I believe in a holistic approach that blends creativity and technical expertise. My process typically involves understanding your project's goals and target audience, followed by crafting a well-thought-out design concept. Once the design is approved, I move into the development phase, utilizing the latest technologies and coding practices to bring the design to life. Regular communication and collaboration ensure that the final product aligns with your vision and exceeds expectations.",
  },
  {
    value: 3,
    question:
      "How do you ensure that your web development projects are secure and optimized for performance?",
    answer:
      "Security and performance are paramount in every project I undertake. To ensure a secure environment, I follow best practices in web development, implementing robust authentication mechanisms, data encryption, and regular security audits. Additionally, I optimize performance by meticulously optimizing code, compressing assets, and leveraging caching techniques. By prioritizing security and performance, I guarantee that your website not only looks exceptional but also operates seamlessly and safely for all users.",
  },
  // Add more FAQ items here
];

export const projects = [
  {
    id: "1",
    title: "Blog Hub",
    description:
      "In This website users can read blog posts. and they can Track how much time is required to read specific blog post",
    image: "https://i.ibb.co/kqTZcPF/Asset-1-3x.png",
    gitHubLink: "https://github.com/pixprocoder/blog-hub",
    liveLink: "https://my-quiz-hero.netlify.app/",
    category: "React",
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
    gitHubLink: "https://github.com/pixprocoder/ema-john-with-auth",
    liveLink: "https://ema-john-with-auth-5014f.web.app/",
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
    gitHubLink: "https://github.com/pixprocoder/geometry-genius",
    liveLink: "https://js-geometry-genius.netlify.app/",
    category: "HTML/CSS/JS",
  },
  {
    id: "4",
    title: "AI Universe Hub",
    description:
      "This website is for data fetching. how to read data and implement them and show them in the ui. ",
    image: "https://i.ibb.co/xHRWwrC/Asset-4-3x.png",
    gitHubLink: "https://github.com/pixprocoder/ai-universe-hub",
    liveLink: "https://ai-world-hub.netlify.app/",
    category: "HTML/CSS/JS",
  },
  {
    id: "5",
    title: "Quiz Hero",
    description:
      "Quiz Hero is an website were users can learn and paly with quiz. they can be able to see their result and much more ",
    image: "https://i.ibb.co/ccY5JL1/Asset-5-3x.png",
    gitHubLink: "https://github.com/pixprocoder/quiz-hero",
    liveLink: "https://my-quiz-hero.netlify.app/",
    category: "HTML/CSS/JS",
  },
  {
    id: "6",
    title: "Career Hub",
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
    image: "https://i.ibb.co/SNJ5TXY/Asset-6-3x.png",
    gitHubLink: "https://github.com/pixprocoder/career-hub",
    liveLink: "https://cerulean-pudding-a186f6.netlify.app/",
    category: "React",
  },
];

export const services = [
  {
    title: "Front-end web Development",
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
    title: "Graphic Design",
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

// Blog

export const blogs = [
  {
    id: 1,
    author: "John",
    published_date: "2015-3-1",
    title: "How Algorithmic Trading Systems Work",
    description:
      "In India, the popularity of online trading has helped transform the financial landscape. This has led to over 20% of all trading is now done via mobile through trading apps. In line with this, another development many traders have highlighted is the use of algorithmic trading systems to take advantage of ever-changing market opportunities. To date, algorithmic trading systems are used in up to 60% of all trading volume.",
  },
  {
    id: 2,
    author: "Jhanker mahbub",
    published_date: "2019-7-1",
    title: "Build an Email Validator with HTML, CSS, and JavaScript",
    description:
      "Learn how to create a responsive Email Validator using HTML, CSS, and JavaScript. This step-by-step guide walks you through integrating the Email Validation API to validate email addresses effectively. Perfect for beginners and experts alike!",
  },
  {
    id: 3,
    author: "Kabir Sing",
    published_date: "2017-8-10",
    title: "How to find the Python Installation Path on Windows?",
    description:
      "Discover how to locate the Python installation path on your Windows system using two effective methods: the traditional Command Prompt and the modern Terminal. Whether you're troubleshooting or setting up environment variables, this guide provides clear, step-by-step instructions with visuals to help you find the information you need. Explore now!",
  },
  {
    id: 4,
    author: "Nazmul Hasan",
    published_date: "2017-8-10",
    title: "How to Check if Keys Exist in JavaScript Objects",
    description:
      "Learn how to check if keys exist in JavaScript objects using two popular methods: the 'in' operator and the hasOwnProperty() method. This comprehensive guide provides syntax, examples, and insights to help you navigate object properties in JavaScript",
  },
  {
    id: 5,
    author: "Shakib Khan",
    published_date: "2010-8-10",
    title: "How to Open the Terminal in Visual Studio Code",
    description:
      "Learn how to open the terminal in Visual Studio Code (VS Code) using various methods, such as the menu bar, keyboard shortcuts, command palette, and sidebar icon. This guide also covers customizing the terminal and working with multiple terminals within VS Code.",
  },
];
