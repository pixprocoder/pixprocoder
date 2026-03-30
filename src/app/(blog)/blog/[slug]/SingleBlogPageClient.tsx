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
import { Reply, ChevronLeft, Calendar, Clock, Eye, MessageSquare, Heart, Share2, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

interface SingleBlogPageClientProps {
  blogPost: BlogPost;
}

export default function SingleBlogPageClient({
  blogPost,
}: SingleBlogPageClientProps) {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('content');
  
  const dispatch = useAppDispatch();
  const isLiked = useAppSelector(
    (state) => state.like.likedPosts[blogPost.slug] || false,
  );
  const { data: totalLikeCount } = useGetPostLikesQuery({
    postId: blogPost.slug,
    userId: user?.uid || null,
  });

  const [incrementView] = useIncrementPostViewMutation();
  const { data: viewData } = useGetPostViewsQuery(blogPost.slug);
  const viewCount = viewData?.data?.views;

  const [postLike, { isLoading: isLikeLoading }] = useTogglePostLikeMutation();
  const [localLikeCount, setLocalLikeCount] = useState(0);

  useEffect(() => {
    const viewKey = `viewed_${blogPost.slug}`;
    const lastViewed = localStorage.getItem(viewKey);
    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000;

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
  }, [totalLikeCount, user?.uid, blogPost.slug, incrementView, dispatch]);

  const {
    data: comments,
    isLoading: commentLoading,
  } = useGetCommentsQuery({
    sortBy,
    slug: blogPost.slug,
    page: currentPage,
    limit: 4,
  });

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
    <div className="bg-background min-h-screen py-12 md:py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-12">
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>back_to_index()</span>
            </Link>
            
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary uppercase">
                  <Terminal size={12} />
                  <span>Log: {blogPost.slug.slice(0, 8)}...</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-mono text-green-500 uppercase">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span>Status: Published</span>
               </div>
            </div>
          </div>

          {/* Article Title & Metadata */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
              {blogPost.meta.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 pt-2 border-b border-border/50 pb-8 text-xs md:text-sm font-mono text-muted-foreground">
               <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  <span>{formatDateToUTC(blogPost.meta.date)}</span>
               </div>
               <div className="flex items-center gap-2">
                  <Clock size={14} className="text-primary" />
                  <span>5 MIN READ</span>
               </div>
               <div className="flex items-center gap-2">
                  <Eye size={14} className="text-primary" />
                  <span>{viewCount || 0} VIEWS</span>
               </div>
               <div className="flex items-center gap-3 ml-auto">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-border">
                      <AvatarImage src={blogPost.meta.authorProfile} />
                      <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <span className="text-foreground font-bold italic">@{blogPost.meta.author.toLowerCase().replace(' ', '_')}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border/50 mb-16 shadow-2xl">
            <Image
              src={blogPost.meta.thumbnail || '/web-dev.png'}
              alt={blogPost.meta.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>

          {/* Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-muted/20 p-1 rounded-xl border border-border mb-8">
                  <TabsTrigger value="content" className="flex-1 font-mono text-[10px] md:text-xs rounded-lg uppercase tracking-wider data-[state=active]:bg-background">./article_content</TabsTrigger>
                  <TabsTrigger value="comments" className="flex-1 font-mono text-[10px] md:text-xs rounded-lg uppercase tracking-wider data-[state=active]:bg-background">./peer_reviews ({comments?.meta?.total || 0})</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="mt-0">
                  <article className="prose prose-slate dark:prose-invert max-w-none prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-border prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary">
                    <BlogContentRenderer code={blogPost.content} />
                  </article>

                  {/* Tags */}
                  {blogPost.meta.tags && blogPost.meta.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/50">
                      {blogPost.meta.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 rounded-md bg-muted/30 border border-border text-[10px] font-mono text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors cursor-default">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="comments" className="mt-0 space-y-8">
                  <CommentBox id={blogPost.slug} />
                  
                  {comments?.data?.length > 0 && (
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <MessageSquare size={14} className="text-primary" />
                        System_Comments
                      </h3>
                      <Select value={sortBy} onValueChange={(v) => { setSortBy(v); setCurrentPage(1); }}>
                        <SelectTrigger className="w-[140px] h-8 text-[10px] font-mono bg-transparent border-border">
                          <SelectValue placeholder="Sort" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border font-mono text-xs">
                          <SelectItem value="desc">NEWEST</SelectItem>
                          <SelectItem value="asc">OLDEST</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-6">
                    {comments?.data?.map((comment: any) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-2xl border border-border bg-muted/10 group"
                      >
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={comment?.author?.avatar || '/user.png'} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs uppercase">
                              {comment?.author?.username?.[0] || 'G'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2 min-w-0">
                            <div className="flex items-center gap-3">
                              <h4 className="font-mono text-sm font-bold text-foreground truncate">
                                @{comment?.author?.username || 'guest_user'}
                              </h4>
                              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed italic">
                              "{comment.content}"
                            </p>
                            <Button variant="ghost" size="sm" className="h-7 px-2 gap-2 text-[10px] font-mono hover:text-primary transition-all opacity-0 group-hover:opacity-100">
                              <Reply size={12} />
                              sys_reply()
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {comments?.meta?.totalPages > 1 && (
                    <Pagination className="justify-center mt-12">
                      <PaginationContent className="gap-2">
                        <Button variant="outline" size="sm" onClick={() => handlePagination('prev')} disabled={currentPage === 1} className="h-8 font-mono text-[10px]">PREV</Button>
                        <span className="px-4 text-[10px] font-mono text-muted-foreground">PAGE {currentPage} OF {comments.meta.totalPages}</span>
                        <Button variant="outline" size="sm" onClick={() => handlePagination('next')} disabled={currentPage >= comments.meta.totalPages} className="h-8 font-mono text-[10px]">NEXT</Button>
                      </PaginationContent>
                    </Pagination>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar / Desktop Actions */}
            <div className="lg:col-span-4 space-y-8">
               <div className="sticky top-28 space-y-8">
                  {/* Interaction Card */}
                  <div className="p-6 rounded-2xl border border-border bg-muted/10 space-y-6">
                     <h3 className="font-mono text-xs font-bold uppercase tracking-widest border-b border-border pb-4">./user_interaction</h3>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <Button 
                          variant="outline" 
                          onClick={handleLike}
                          disabled={isLikeLoading}
                          className={`h-12 flex flex-col gap-1 items-center justify-center rounded-xl transition-all ${isLiked ? 'bg-primary/10 border-primary text-primary' : 'hover:border-primary/50'}`}
                        >
                           {isLiked ? <Heart size={16} className="fill-primary" /> : <Heart size={16} />}
                           <span className="text-[10px] font-mono font-bold">{localLikeCount} LIKES</span>
                        </Button>
                        
                        <Button 
                          variant="outline"
                          onClick={() => setActiveTab('comments')}
                          className="h-12 flex flex-col gap-1 items-center justify-center rounded-xl hover:border-primary/50 transition-all"
                        >
                           <MessageSquare size={16} />
                           <span className="text-[10px] font-mono font-bold uppercase">{comments?.meta?.total || 0} REVIEWS</span>
                        </Button>
                     </div>

                     <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                           <Share2 size={12} />
                           <span>Spread_the_knowledge</span>
                        </div>
                        <SocialShareButtons
                          url={typeof window !== 'undefined' ? window.location.href : `https://www.pixprocoder.com/blog/${blogPost.meta.slug}`}
                          title={blogPost.meta.title}
                          description={blogPost.meta.excerpt}
                        />
                     </div>
                  </div>

                  {/* About the Log / Metadata */}
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/5 space-y-4">
                     <div className="flex items-center gap-2 text-[10px] font-mono text-primary uppercase font-bold">
                        <Terminal size={12} />
                        <span>Log_Information</span>
                     </div>
                     <div className="space-y-2">
                        {[
                          { label: 'Version', value: '1.0.0' },
                          { label: 'Type', value: 'ARTICLE' },
                          { label: 'Category', value: blogPost.meta.tags?.[0]?.toUpperCase() || 'GENERAL' },
                          { label: 'Priority', value: 'HIGH' },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between text-[10px] font-mono">
                             <span className="text-muted-foreground">{item.label}:</span>
                             <span className="text-foreground font-bold">{item.value}</span>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
