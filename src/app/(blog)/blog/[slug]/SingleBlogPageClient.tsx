'use client';
import CommentBox from '@/src/app/(blog)/_components/CommentBox';
import { BlogContentRenderer } from '@/src/components/BlogContentRenderer';
import SocialShareButtons from '@/src/components/SocialShareButtons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/src/components/ui/pagination';
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
  useGetCommentsQuery,
  useGetPostLikesQuery,
  useGetPostViewsQuery,
  useIncrementPostViewMutation,
  useTogglePostLikeMutation,
} from '@/src/redux/api/posts/PostApiSlice';
import { setLike } from '@/src/redux/features/post/LikeSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import { BlogPost } from '@/src/types';
import { formatDateToUTC } from '@/src/utils/FormatDate';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Reply } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaComment, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { FiChevronLeft } from 'react-icons/fi';

interface SingleBlogPageClientProps {
  blogPost: BlogPost;
}

/**
 * Renders a full single-blog post page including header, featured image, content, like and view counters, comments, and related-posts tab.
 *
 * @param blogPost - The blog post data used to populate the page (metadata, content, thumbnail, slug, etc.).
 * @returns The component's rendered JSX for the single blog post page.
 */
export default function SingleBlogPageClient({
  blogPost,
}: SingleBlogPageClientProps) {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('content');
  // redux
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector(
    (state) => state.like.likedPosts[blogPost.slug] || false,
  );
  const { data: totalLikeCount, isLoading } = useGetPostLikesQuery({
    postId: blogPost.slug,
    userId: user?.uid || null,
  });

  const [incrementView] = useIncrementPostViewMutation();
  const { data: viewData, isLoading: viewIsLoading } = useGetPostViewsQuery(
    blogPost.slug,
  );
  const viewCount = viewData?.data?.views;

  const [postLike, { isLoading: isLikeLoading }] = useTogglePostLikeMutation();
  const [localLikeCount, setLocalLikeCount] = useState(totalLikeCount);

  useEffect(() => {
    const viewKey = `viewed_${blogPost.slug}`;
    const lastViewed = localStorage.getItem(viewKey);
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // If never viewed OR more than 24 hours passed
    if (!lastViewed || now - parseInt(lastViewed) > cooldown) {
      incrementView(blogPost.slug);
      localStorage.setItem(viewKey, now.toString());
    }

    if (totalLikeCount) {
      setLocalLikeCount(totalLikeCount.likeCount);

      if (user?.uid && totalLikeCount?.isLiked !== undefined) {
        dispatch(
          setLike({
            userId: user.uid,
            slug: blogPost.slug,
            isLiked: totalLikeCount.isLiked,
          }),
        );
      }
    }
  }, [totalLikeCount, user?.uid, blogPost.slug]);

  // comments
  const {
    data: comments,
    isLoading: commentLoading,
    isError: commentError,
    isSuccess: commentSuccess,
  } = useGetCommentsQuery({
    sortBy,
    slug: blogPost.slug,
    page: currentPage,
    limit: 4,
  });

  // TODO: UPDATE WITH REDUX
  // const [totalLikeCount, setTotalLikeCount] = useState(0);
  // console.log(totalLikeCount);

  const handleLike = async () => {
    if (!user?.uid) {
      toast({ description: 'Login Required For Like' });
      return;
    }

    const optimisticCount = isLiked ? localLikeCount - 1 : localLikeCount + 1;
    setLocalLikeCount(optimisticCount);

    try {
      const result = await postLike({
        postId: blogPost.slug,
        data: {
          userId: user.uid,
          isLiked: !isLiked,
        },
      }).unwrap();

      if (result.data.count !== undefined) {
        setLocalLikeCount(result.data.count);
      }

      if ('error' in result) {
        throw new Error(result.error);
      }

      // ✅ ADD THIS CHECK
      console.log(
        'Before dispatch - user.uid:',
        user.uid,
        'blogPost.slug:',
        blogPost.slug,
      );

      if (!user.uid) {
        console.error('CRITICAL: user.uid became undefined after API call!');
        return;
      }

      dispatch(
        setLike({
          userId: user.uid,
          slug: blogPost.slug,
          isLiked: result.data.isLiked,
        }),
      );
    } catch (error) {
      console.error('Like error:', error);
      setLocalLikeCount(isLiked ? localLikeCount : localLikeCount);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update like status',
      });
    }
  };

  const handlePagination = (direction: 'prev' | 'next') => {
    const totalPages = comments?.meta?.totalPages || 1;

    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
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
          <div className="flex  items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={blogPost.meta.authorProfile} />
                <AvatarFallback>SK</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  className="hover:underline hover:text-primary"
                  href={`about-author/${blogPost.meta.authorId}`}
                >
                  {' '}
                  <p className="font-medium">{blogPost.meta.author}</p>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {blogPost.meta.date && formatDateToUTC(blogPost.meta.date)}
                </p>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2 hidden sm:block">
                Share:
              </span>
              <SocialShareButtons
                url={
                  typeof window !== 'undefined'
                    ? window.location.href
                    : `https://www.pixprocoder.com/blog/${blogPost.meta.slug}`
                }
                title={blogPost.meta.title}
                description={blogPost.meta.excerpt}
              />
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative aspect-video rounded-xl overflow-hidden border border-border mb-8"
        >
          <Image
            src={blogPost.meta.thumbnail || '/web-dev.png'}
            alt={blogPost.meta.title || 'Blog Post'}
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
                Comments ({comments?.meta?.total || 0})
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
              <BlogContentRenderer code={blogPost.content} />
            </motion.div>

            {/* Like & Stats Section */}
            <div className="mt-8 flex flex-col sm:flex-row items-start  sm:items-center gap-4 border-t border-border pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
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
                  <span>
                    {localLikeCount !== undefined ? (
                      <span>
                        {localLikeCount}{' '}
                        {localLikeCount <= 1 ? 'like' : 'likes'}{' '}
                      </span>
                    ) : (
                      <span>Loading...</span>
                    )}
                  </span>
                </Button>
                <div
                  className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-primary"
                  onClick={() => setActiveTab('comments')}
                >
                  <FaComment />
                  <span>{comments?.meta?.total || 0} Comments</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-primary">
                  <FaEye />
                  <span>{viewCount || 0} Views</span>
                </div>
              </div>

              {/* {blogPost.meta.tags && blogPost.meta.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blogPost.meta.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="capitalize">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )} */}
            </div>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" key="comments" className="py-8">
            <div className="space-y-8">
              <CommentBox id={blogPost.slug} />

              {comments?.data?.length !== 0 ? (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm">Sort By:</h3>
                  </div>
                  <Select
                    value={sortBy}
                    onValueChange={(value) => {
                      setSortBy(value);
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
                </div>
              ) : (
                ''
              )}

              <div className="space-y-6">
                {comments?.data?.map((comment: any) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-lg border border-border bg-background/50"
                  >
                    <div className="flex gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={comment?.author?.avatar || '/user.png'}
                        />
                        <AvatarFallback>
                          {comment?.author?.username?.[0] ||
                            comment?.author?.email?.[0] ||
                            'G'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">
                            {comment?.author?.username ||
                              (comment?.author?.email
                                ? `${comment?.author?.email?.split('@')[0].slice(0, 3)}***`
                                : 'Guest')}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <time className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </time>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {comment.content}
                        </p>
                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-2 text-xs"
                          >
                            <Reply className="w-3.5 h-3.5" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Pagination className="ml-auto">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      onClick={() => handlePagination('prev')}
                      disabled={currentPage === 1 || isLoading}
                    >
                      Prev
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4 text-sm text-muted-foreground">
                      Page {comments?.meta?.page || currentPage} of{' '}
                      {comments?.meta?.totalPages || 1}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      onClick={() => handlePagination('next')}
                      disabled={
                        currentPage >= (comments?.meta?.totalPages || 1) ||
                        isLoading
                      }
                    >
                      Next
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
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
}
