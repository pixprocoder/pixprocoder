// app/(dashboard)/blogs/page.tsx
'use client';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { Badge } from '@/src/components/ui/badge';
import { motion } from 'framer-motion';
import { FiSearch, FiPlus, FiEdit, FiTrash, FiFileText } from 'react-icons/fi';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { cn } from '@/src/lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';

const BlogsPage = () => {
  // Mock data - replace with real data
  const posts = [
    {
      id: 'B-001',
      title: 'Getting Started with Next.js 14',
      author: 'Sarah Johnson',
      categories: ['Web Development', 'JavaScript'],
      status: 'Published',
      date: '2024-03-15',
      comments: 12,
      image: '/web-dev.png',
    },
    {
      id: 'B-002',
      title: 'UI Design Fundamentals',
      author: 'Mike Chen',
      categories: ['Design', 'UX'],
      status: 'Draft',
      date: '2024-03-14',
      comments: 5,
      image: '/web-dev.png',
    },
    {
      id: 'B-003',
      title: 'Advanced React Patterns',
      author: 'Alex Turner',
      categories: ['Frontend', 'React'],
      status: 'Archived',
      date: '2024-03-13',
      comments: 28,
      image: '/web-dev.png',
    },
  ];

  const statusVariants: { [key: string]: string } = {
    Published: 'bg-green-100 text-green-800',
    Draft: 'bg-blue-100 text-blue-800',
    Archived: 'bg-gray-100 text-gray-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Blog Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts and content
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary">
          <FiPlus className="mr-2" /> New Post
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <CardTitle>All Posts</CardTitle>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search posts..." className="pl-8" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Featured</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.image} />
                      <AvatarFallback>
                        <FiFileText className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="outline"
                          className="text-muted-foreground"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(statusVariants[post.status], 'capitalize')}
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-muted-foreground">
                      {post.comments}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon">
                        <FiEdit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-destructive"
                      >
                        <FiTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
        <Button variant="outline" disabled>
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">Page 1 of 1</span>
        <Button variant="outline" disabled>
          Next
        </Button>
      </div>
    </motion.div>
  );
};

export default BlogsPage;
