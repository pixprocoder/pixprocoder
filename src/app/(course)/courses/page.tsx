'use client';
import { Button } from '@/src/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/src/components/ui/badge';
import { Input } from '@/src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import Image from 'next/image';

const courses = [
  {
    id: 1,
    title: 'Web Development Bootcamp',
    description: 'Master full-stack development with modern technologies',
    duration: '12 Weeks',
    difficulty: 'Intermediate',
    category: 'Development',
    image: '/web-dev.png',
  },
  {
    id: 2,
    title: 'Machine Learning Fundamentals',
    description: 'Learn core ML concepts with Python and TensorFlow',
    duration: '8 Weeks',
    difficulty: 'Advanced',
    category: 'Data Science',
    image: '/web-dev.png',
  },
  // Add more courses...
];

function CoursesPage() {
  return (
    <div className="min-h-screen container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-4">
          Explore Our Courses
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Dive into comprehensive learning paths designed by industry experts
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input placeholder="Search courses..." className="flex-1" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', 'Development', 'Data Science', 'Design', 'Business'].map(
          (cat) => (
            <Badge
              key={cat}
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-primary/10"
            >
              {cat}
            </Badge>
          ),
        )}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ y: -5 }}
            className="border border-border rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm"
          >
            <div className="relative h-48">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    '/course-placeholder.jpg';
                }}
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge className="bg-green-500/10 text-green-500">
                  {course.difficulty}
                </Badge>
              </div>

              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-muted-foreground mb-4">{course.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-primary" />
                  <span className="text-sm">{course.duration}</span>
                </div>
                <Link href={`/courses/${course.id}`}>
                  <Button className="gap-2">
                    Enroll Now
                    <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-12 flex justify-center">
        <Button variant="outline" className="px-8">
          Load More Courses
        </Button>
      </div>
    </div>
  );
}

// Add these icon components
function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default CoursesPage;
