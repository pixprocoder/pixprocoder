import css from '../assets/tech/css.png';
import docker from '../assets/tech/docker.png';
import figma from '../assets/tech/figma.png';
import git from '../assets/tech/git.png';
import html from '../assets/tech/html.png';
import javascript from '../assets/tech/javascript.png';
import mongodb from '../assets/tech/mongodb.png';
import nodejs from '../assets/tech/nodejs.png';
import reactjs from '../assets/tech/reactjs.png';
import redux from '../assets/tech/redux.png';
import tailwind from '../assets/tech/tailwind.png';
import typescript from '../assets/tech/typescript.png';

// Contact Info
export const contactInfo = {
  phone: '+40 773 937 317',
  whatsapp: '+40 773 937 317',
  email: 'hello@sam.pixprocoder.com',
};

// Navigation links
export const navLinks = [
  { to: '/', key: 'Home' },
  { to: '/blog', key: 'Blog' },
  { to: '/gallery', key: 'Gallery' },
  { to: '/about', key: 'About' },
  { to: '/contact', key: 'Contact' },
];

export const faqItems = [
  {
    value: '1',
    question: 'What do you actually do?',
    answer:
      "I'm Sam Kobir, a full-stack engineer who now also owns DevOps. I design and ship products, then keep them running in production. Self-taught since 2020. Originally Dhaka, based in Bucharest.",
  },
  {
    value: '2',
    question: 'Do you work as a studio or as yourself?',
    answer:
      'I work independently. Client work is invoiced B2B through Pixprocoder Studio SRL, a registered EU consultancy I founded in Bucharest in 2023. A design contractor joins when a project needs one.',
  },
  {
    value: '3',
    question: 'What kind of work do you take?',
    answer:
      'Full-stack product work and DevOps. React, Next.js, SvelteKit, TypeScript, Node, Go, PostgreSQL. Docker, Terraform, Kubernetes, GitHub Actions, AWS. Remote EU preferred. I have shipped client work in Australia, the UK, and across Europe, plus my own products (MediStore, MomentPro).',
  },
  {
    value: '4',
    question: 'How did you get here?',
    answer:
      'I started from scratch in 2020. First paid projects in 2021–2022. I registered the company in 2023, then spent 2024–2025 shipping production SaaS. In 2026 I deliberately added the operations half: containers, infrastructure as code, CI/CD, and monitoring.',
  },
  {
    value: '5',
    question: 'How do we start a project?',
    answer:
      "Use the contact form, email, or WhatsApp. I'll reply — usually the same day during Bucharest hours, otherwise the next morning. We talk through the problem, the timeline, and whether I'm the right fit.",
  },
];

export const projects = [
  {
    id: '1',
    title: 'Blog Hub',
    description:
      'In This website users can read blog posts. and they can Track how much time is required to read specific blog post',
    image: 'https://i.ibb.co/kqTZcPF/Asset-1-3x.png',
    gitHubLink: 'https://github.com/pixprocoder/blog-hub',
    liveLink: 'https://my-quiz-hero.netlify.app/',
    category: 'React',
    tags: [
      {
        name: 'react',
        color: 'text-blue-500',
      },
      {
        name: 'restapi',
        color: 'text-green-500',
      },
      {
        name: 'scss',
        color: 'text-red-500',
      },
    ],
  },
  {
    id: '2',
    title: 'Ema john',
    description:
      'This is an E-commerce website. full stack application. there are so many features are in this website ',
    image: 'https://i.ibb.co/Zzxcbfc/Asset-2-3x.png',
    tags: [
      {
        name: 'react',
        color: 'text-purple-500',
      },
      {
        name: 'Next.js',
        color: 'text-green-500',
      },
      {
        name: 'scss',
        color: 'text-blue-500',
      },
    ],
    gitHubLink: 'https://github.com/pixprocoder/ema-john-with-auth',
    liveLink: 'https://ema-john-with-auth-5014f.web.app/',
    category: 'Full Stack',
  },
  {
    id: '3',
    title: 'Geometry Genius',
    description:
      'Problem solving website. This website has functionality such us calculation. visit for more info :) ',
    image: 'https://i.ibb.co/Krh5RCR/Asset-3-3x.png',
    tags: [
      {
        name: 'node.js',
        color: 'text-green-500',
      },
      {
        name: 'bootstrap',
        color: 'text-purple-500',
      },
      {
        name: 'scss',
        color: 'text-red-500',
      },
    ],
    gitHubLink: 'https://github.com/pixprocoder/geometry-genius',
    liveLink: 'https://js-geometry-genius.netlify.app/',
    category: 'HTML/CSS/JS',
  },
  {
    id: '4',
    title: 'AI Universe Hub',
    description:
      'This website is for data fetching. how to read data and implement them and show them in the ui. ',
    image: 'https://i.ibb.co/xHRWwrC/Asset-4-3x.png',
    tags: [
      {
        name: 'node.js',
        color: 'text-green-500',
      },
      {
        name: 'bootstrap',
        color: 'text-purple-500',
      },
      {
        name: 'scss',
        color: 'text-red-500',
      },
    ],

    gitHubLink: 'https://github.com/pixprocoder/ai-universe-hub',
    liveLink: 'https://ai-world-hub.netlify.app/',
    category: 'HTML/CSS/JS',
  },
  {
    id: '5',
    title: 'Quiz Hero',
    description:
      'Quiz Hero is an website were users can learn and paly with quiz. they can be able to see their result and much more ',
    tags: [
      {
        name: 'node.js',
        color: 'text-green-500',
      },
      {
        name: 'bootstrap',
        color: 'text-purple-500',
      },
      {
        name: 'scss',
        color: 'text-red-500',
      },
    ],

    image: 'https://i.ibb.co/ccY5JL1/Asset-5-3x.png',
    gitHubLink: 'https://github.com/pixprocoder/quiz-hero',
    liveLink: 'https://my-quiz-hero.netlify.app/',
    category: 'HTML/CSS/JS',
  },
  {
    id: '6',
    title: 'Career Hub',
    tags: [
      {
        name: 'react',
        color: 'text-blue-500',
      },
      {
        name: 'restapi',
        color: 'text-red-500',
      },
      {
        name: 'scss',
        color: 'text-purple-500',
      },
    ],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
    image: 'https://i.ibb.co/SNJ5TXY/Asset-6-3x.png',
    gitHubLink: 'https://github.com/pixprocoder/career-hub',
    liveLink: 'https://cerulean-pudding-a186f6.netlify.app/',
    category: 'React',
  },
];

export const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'MongoDB',
    icon: mongodb,
  },

  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

export const testimonials = [
  {
    name: 'aa_truck',
    role: 'CTO at TechInnovate',
    country: '🇨🇦 Canada',
    avatar: '',
    text: 'I had a fantastic experience working with Samsul on my website. From start to finish, he was professional, responsive, and incredibly creative. He took the time to understand my vision and brought it to life even better than I imagined. The site looks clean, modern, and functions perfectly on both desktop and mobile. He also made sure everything was optimized and easy to manage. I highly recommend him to anyone looking for high quality website design and development. Thanks again for the amazing work!',
    rating: 5,
    projectLink: 'https://aadrivers.com/',
  },
  {
    name: 'branco_electro',
    role: 'Lead Developer',
    country: '🇳🇱 Netherlands',
    avatar:
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/70ece62e7e25999669b889e725b8399e-1709235731099/5e846242-2f16-46a2-adcf-4f68202541dd.jpg',
    text: 'Did exactly what i asked for. Would definitely be coming back!',
    rating: 5,
    projectLink: 'https://www.brancoelektrotechniek.com/',
  },
  {
    name: 'dxmalam',
    role: 'Startup Founder',
    country: '🇷🇴 Romania',
    avatar:
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/70ece62e7e25999669b889e725b8399e-1709235731099/5e846242-2f16-46a2-adcf-4f68202541dd.jpg',
    text: 'Did exactly what i asked for. Would definitely be coming back!',
    text: 'very good and professional work. he did Exactly how I want. highly recommended 👍',
    rating: 5,
    projectLink: 'https://www.5stardrivers.com/',
  },
];

export const galleries = [
  {
    id: 'Programming',
    title: 'Programming Journey from 2020',
    description:
      'Ever since I started my programming journey. those are my memories throughout ',
    coverImage: 'https://i.ibb.co/q367h8bh/20251017-002019.jpg',
    date: 'December 2020',
    location: 'Bangladesh, Sylhet',
    mediaCount: 4,
    media: [
      {
        id: 'm1',
        type: 'image',
        url: 'https://i.ibb.co/KjQcyTnW/pc.jpg',
        title: 'My working desktop monitor',
        description: 'My second monitor',
      },
    ],
  },
  {
    id: 'europe-2024',
    title: 'Europe Summer 2024',
    description:
      'A summer backpacking trip across 6 countries — capturing moments from the streets of Paris to the canals of Amsterdam.',
    coverImage:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
    date: 'Summer 2024',
    location: 'Paris, Switzerland, Amsterdam',
    mediaCount: 3,
    media: [
      {
        id: 'e1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1511739001486-6bfe10cee32a?w=1600&h=1200&fit=crop',
        title: 'Eiffel Tower at Night',
        subtitle: 'The iron lady sparkling under the Parisian sky.',
      },
      {
        id: 'e2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1600&h=1200&fit=crop',
        title: 'Swiss Alps',
        subtitle: 'Jungfraujoch — Top of Europe.',
      },
      {
        id: 'e3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=1600&h=1200&fit=crop',
        title: 'Amsterdam Canals',
        subtitle: 'Golden hour reflections in the Jordaan district.',
      },
    ],
  },
  {
    id: 'personal-2024',
    title: 'Personal Moments 2024',
    description:
      'Snapshots of everyday life — celebrations, nature walks, and candid moments with friends.',
    coverImage:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=800&fit=crop',
    date: '2024',
    location: 'Various',
    mediaCount: 2,
    media: [
      {
        id: 'p1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=1600&h=1200&fit=crop',
        title: 'Birthday Celebration',
        subtitle: 'Another trip around the sun with the best people.',
      },
      {
        id: 'p2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&h=1200&fit=crop',
        title: 'Rainy Day Coffee',
        subtitle: 'Good book, better coffee, rainy afternoon.',
      },
    ],
  },
];
