'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/src/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import { Badge } from '@/src/components/ui/badge';
import { FiShare2, FiDownload, FiChevronLeft } from 'react-icons/fi';
import { FaRegClock, FaChartLine } from 'react-icons/fa6';
import ShareButtons from '@/src/components/shared/ShareButtons';
import Link from 'next/link';

const CourseDetailsPage = ({ params }: { params: { id: string } }) => {
  const courseData = {
    title: 'Advanced Full-Stack Development',
    price: '$299',
    description:
      'Master modern full-stack development with TypeScript, Next.js, Node.js, and PostgreSQL',
    features: [
      { icon: '🕒', text: '60+ Hours Content' },
      { icon: '📚', text: '12 Projects' },
      { icon: '🎓', text: 'Certification' },
      { icon: '💻', text: 'Lifetime Access' },
    ],
    curriculum: [
      { module: 1, title: 'Next.js Fundamentals', lessons: 8, duration: '6h' },
      { module: 2, title: 'API Development', lessons: 10, duration: '8h' },
      { module: 3, title: 'Database Design', lessons: 6, duration: '5h' },
    ],
    faqs: [
      {
        question: 'Course Requirements?',
        answer: 'Basic HTML/CSS/JS knowledge',
      },
      {
        question: 'Support Included?',
        answer: '24/7 Discord Community Access',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        {/* Back & Share Header */}
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" className="gap-2">
            <Link className="flex gap-2 items-center" href="/courses">
              {' '}
              <FiChevronLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </Button>
          {/* <ShareButtons 
            url={`/courses/${params.id}`}
            title={courseData.title}
          /> */}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Course Preview */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative aspect-video rounded-xl overflow-hidden border border-border"
          >
            <Image
              src="/web-dev.png"
              alt="Course preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <Badge className="absolute top-4 right-4 bg-green-500/20 text-green-500">
              Bestseller
            </Badge>
          </motion.div>

          {/* Course Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              {courseData.title}
            </h1>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-2">
                <FaRegClock className="w-4 h-4" />8 Weeks
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <FaChartLine className="w-4 h-4" />
                Intermediate
              </Badge>
            </div>

            <p className="text-xl text-muted-foreground">
              {courseData.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {courseData.features.map((feature, i) => (
                <div key={i} className="p-4 rounded-lg border border-border">
                  <span className="text-2xl">{feature.icon}</span>
                  <p className="mt-2">{feature.text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Button className="w-full gap-2 bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary">
                Enroll Now - {courseData.price}
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <FiDownload className="w-4 h-4" />
                Download Syllabus
              </Button>
            </div>
          </div>
        </div>

        {/* Curriculum & Details */}
        <Tabs defaultValue="curriculum">
          <TabsList className="grid grid-cols-3 bg-background/50 backdrop-blur">
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="curriculum" className="py-8">
            <div className="space-y-4">
              {courseData.curriculum.map((module, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 5 }}
                  className="p-6 rounded-lg border border-border bg-background/50"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">
                        Module {module.module}: {module.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {module.lessons} lessons • {module.duration}
                      </p>
                    </div>
                    <Button variant="ghost">Preview</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details" className="py-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">What You'll Learn</h3>
                <ul className="space-y-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary">▹</span>
                      Build full-stack applications with modern stack
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Technologies Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'AWS'].map(
                    (tech, i) => (
                      <Badge key={i} variant="outline">
                        {tech}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="py-8">
            <div className="space-y-4">
              {courseData.faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-lg border border-border">
                  <h4 className="font-medium">{faq.question}</h4>
                  <p className="text-muted-foreground mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Courses */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">
            More Courses You Might Like
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Add course cards here */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetailsPage;
