'use client';
import CommentBox from '@/src/app/(blog)/_components/CommentBox';
import RenderContent from '@/src/components/RenderContent';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import { useToast } from '@/src/components/ui/use-toast';
import { AuthContext } from '@/src/providers/AuthProviders';
import {
  useGetCommentQuery,
  useGetPostLikeQuery,
  useGetSinglePostQuery,
  usePostLikeMutation,
} from '@/src/redux/api/posts/PostApiSlice';
import { setLike, toggleLike } from '@/src/redux/features/post/LikeSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import { formatDateToUTC } from '@/src/utils/FormatDate';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { use, useContext, useState } from 'react';
import { FaComment, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { FiChevronLeft } from 'react-icons/fi';

const SingleBlogPage = ({ params }: { params: { id: string } }) => {
  const { id } = use(params);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const { isLiked } = useAppSelector((state) => state.like);
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('content');

  // RTK Query hooks
  const { data: post } = useGetSinglePostQuery(id);
  const { data: comments } = useGetCommentQuery({
    id,
    sort: sortOrder,
    page: currentPage,
    limit: 10,
  });
  const { data: totalLikeCount } = useGetPostLikeQuery(id);
  const [postLike, { isLoading: isLikeLoading }] = usePostLikeMutation();

  const handleLike = async () => {
    if (!user?.uid) {
      toast({ description: 'Please login to like posts' });
      return;
    }

    try {
      const result = await postLike({
        id,
        data: {
          liked: !isLiked,
          userId: user.uid,
        },
      }).unwrap();

      if ('error' in result) {
        throw new Error(result.error);
      }

      dispatch(
        result.data?.isLiked !== undefined
          ? setLike(result.data.isLiked)
          : toggleLike(),
      );
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update like status',
      });
    }
  };

  // Pagination controls
  const handlePagination = (direction: 'next' | 'prev') => {
    setCurrentPage((prev) =>
      direction === 'next' ? prev + 1 : Math.max(1, prev - 1),
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back Navigation */}
        <div className="mb-8">
          <Button variant="ghost" className="gap-2">
            <Link className="flex gap-2 items-center" href="/blog">
              {' '}
              <FiChevronLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-4">
            {post?.data?.title}
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/profile.png" />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Samsul Kobir</p>
                <p className="text-sm text-muted-foreground">
                  {post?.data?.createdAt &&
                    formatDateToUTC(post.data.createdAt)}
                </p>
              </div>
            </div>
            {/* <ShareButtons
              url={`https://www.pixprocoder.com/blog/${id}`}
              title={post?.data?.title}
              description={post?.data?.excerpt}
            /> */}
          </div>
        </div>

        {/* Featured Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative aspect-video rounded-xl overflow-hidden border border-border mb-8"
        >
          <Image
            src={post?.data?.thumbnail || '/placeholder.jpg'}
            alt={post?.data?.title || 'Blog Post'}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            //TODO: Reset scroll position
          }}
        >
          <div className="sticky top-[70px] z-40 bg-background/90 backdrop-blur-md border-b border-border">
            <TabsList className="grid grid-cols-3 bg-transparent">
              <TabsTrigger value="content">Article</TabsTrigger>
              <TabsTrigger value="comments">
                Comments ({comments?.data?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="related">Related Posts</TabsTrigger>
            </TabsList>
          </div>

          {/* Content Tab */}
          <TabsContent value="content" key="content" className="py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="prose dark:prose-invert max-w-none"
            >
              <RenderContent content={post?.data?.content} />
            </motion.div>

            {/* Like & Stats Section */}
            <div className="mt-8 flex items-center gap-6 border-t border-border pt-6">
              <Button
                variant="outline"
                onClick={handleLike}
                className="gap-2 hover:bg-primary/10"
                disabled={isLikeLoading}
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-muted-foreground" />
                )}
                <span>{totalLikeCount?.data?.likes || 0}</span>
              </Button>
              <div
                className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-primary"
                onClick={() => setActiveTab('comments')}
              >
                <FaComment />
                <span>{comments?.data?.length || 0} comments</span>
              </div>
              <Badge variant="outline" className="capitalize">
                {post?.data?.category || 'general'}
              </Badge>
            </div>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" key="comments" className="py-8">
            <div className="space-y-8">
              <CommentBox id={id} />

              <div className="flex items-center justify-between">
                <Select
                  value={sortOrder}
                  onValueChange={(value) => {
                    setSortOrder(value);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort comments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Newest First</SelectItem>
                    <SelectItem value="asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* <Pagination className="ml-auto">
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        variant="ghost"
                        onClick={() => handlePagination('prev')}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <span className="px-4">Page {currentPage}</span>
                    </PaginationItem>
                    <PaginationItem>
                      <Button
                        variant="ghost"
                        onClick={() => handlePagination('next')}
                        disabled={!comments?.hasNextPage}
                      >
                        Next
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination> */}
              </div>

              <div className="space-y-6">
                {comments?.data?.map((comment) => (
                  <motion.div
                    key={comment._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg border border-border bg-background/50"
                  >
                    <div className="flex gap-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.author?.avatar} />
                        <AvatarFallback>
                          {comment.author?.username?.[0] || 'G'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">
                            {comment.author?.username || 'Guest'}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {formatDateToUTC(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Related Posts Tab */}
          <TabsContent value="related" key="related" className="py-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Add related posts component here */}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SingleBlogPage;
