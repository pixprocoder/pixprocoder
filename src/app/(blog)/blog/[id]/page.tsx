'use client';
import { use, useContext, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { Button } from '@/src/components/ui/button';
import { AuthContext } from '@/src/providers/AuthProviders';
import {
  useGetCommentQuery,
  useGetPostLikeQuery,
  useGetSinglePostQuery,
  usePostLikeMutation,
} from '@/src/redux/api/posts/PostApiSlice';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from '@/src/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { useToast } from '@/src/components/ui/use-toast';
import { setLike, toggleLike } from '@/src/redux/features/post/LikeSlice';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks/hooks';
import { formatDateToUTC, formatTimeToUTC } from '@/src/utils/FormatDate';
import Link from 'next/link';

import CommentBox from '@/src/app/(blog)/_components/CommentBox';
import RenderHTML from '@/src/components/RenderHTML';
import RenderContent from '@/src/components/RenderContent';

// ------------- import end --------------

const SingleBlogPage = ({ params }: any) => {
  const { id } = use(params);
  const [sortOrder, setSortOrder] = useState('desc');
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const { isLiked } = useAppSelector((state) => state.like);
  const { data: post } = useGetSinglePostQuery(id);
  const { data: comments } = useGetCommentQuery({
    id,
    sort: sortOrder,
  });
  const { data: totalLikeCount } = useGetPostLikeQuery(id);
  const [postLike, { isLoading, isSuccess }] = usePostLikeMutation({});
  const [currentPage, setCurrentPage] = useState(2); // Default to page 2

  console.log(comments?.data);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
    // Logic to fetch new data based on the page number
  };

  // Handling Like
  const handleLike = async () => {
    try {
      if (user?.uid) {
        const result = await postLike({
          id: id,
          data: { liked: !isLiked, userId: user.uid },
        });

        const updatedLike = result?.data?.data?.data?.isLiked;
        if (updatedLike !== undefined) {
          dispatch(setLike(updatedLike));
        } else {
          dispatch(toggleLike(id));
        }
      } else {
        toast({
          variant: 'outline',
          description: 'Please Login First',
        });
        return;
      }
    } catch (error) {
      console.error('Error updating like status', error);
    }
  };

  return (
    <section className="container mx-auto">
      <div className="w-full lg:w-2/4 mx-auto">
        {/* <GoogleAdsense /> */}
        <h1 className="text-left lg:text-center text-3xl lg:text-5xl font-bold  my-6">
          {post?.data?.title}
        </h1>
        {/* Avatar */}
        <div className="flex gap-3 items-center mb-4">
          <Avatar>
            <AvatarImage src={post?.data?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex  gap-2">
            <p className="text-white font-bold text-base">Kobir</p>
            <p className="text-gray-300 text-sm flex gap-2 items-center">
              {post?.data?.createdAt && formatDateToUTC(post?.data?.createdAt)}{' '}
              <small className="text-xs">at</small>
              <small>
                {post?.data?.createdAt &&
                  formatTimeToUTC(post?.data?.createdAt)}
              </small>
            </p>
          </div>
        </div>

        <div className="">
          <img
            className="w-full rounded-lg"
            width={500}
            height={500}
            src={post?.data?.thumbnail}
            alt="img"
          />
        </div>

        {/* Content */}
        <div className="mt-4">
          <RenderContent content={post?.data?.content} />
          {/* <RenderHTML content={post?.data?.content} /> */}
          {/* <p className="text-gray-400 font-light">{post?.data?.content}</p> */}
        </div>

        {/* like feature */}
        <div className="flex items-center gap-3 justify-center mt-2">
          <Button onClick={handleLike}>
            {isLiked ? (
              <>
                <motion.div
                  className="flex gap-2 items-center"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }} // Pulse effect
                  transition={{ duration: 0.3 }}
                >
                  <FaHeart className="text-red-500" />
                  <span>Liked</span>
                </motion.div>
              </>
            ) : (
              <motion.div
                className="flex gap-2 items-center "
                initial={{ scale: 1 }}
                animate={{ scale: [1.2, 1] }} // Shrink effect when unliked
                transition={{ duration: 0.3 }}
              >
                <FaRegHeart />
                <span>Like</span>
              </motion.div>
            )}
          </Button>
          {isLoading ? (
            '....'
          ) : (
            <p>
              {totalLikeCount?.data?.likes}{' '}
              <span>{totalLikeCount?.data?.likes <= 1 ? 'Like' : 'Likes'}</span>
            </p>
          )}
        </div>
        <hr className=" my-2" />

        <div className="mt-4 bg-gray-700 rounded-lg p-4">
          <h1 className="text-lg text-gray-100 ">Leave A Comment</h1>
          <CommentBox id={id} />
        </div>

        {/* Show comments */}
        <div className="flex justify-between items-center my-4">
          <p className="text-sm ">
            <span>{comments?.data?.length > 1 ? 'Comments' : 'Comment'}</span>:
            (
            {comments?.data?.length ? (
              <span className="text-purple-500">{comments?.data?.length}</span>
            ) : (
              'No Comment Found'
            )}
            ){' '}
          </p>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className=" w-auto border-none  ">
              <div className="flex justify-center items-center gap-2">
                <span className="text-purple-500 text-sm">Sort By:</span>{' '}
                <span className="text-xs">
                  <SelectValue />
                </span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-none text-white">
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <hr className="mb-4" />
        <div className="flex flex-col gap-2">
          {comments?.data?.map((comment: any) => (
            <div
              key={comment._id}
              className="bg-gray-800 rounded-lg flex flex-col p-2 gap-4"
            >
              <div className="flex gap-2 items-center">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={user?.photoURL} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm">{comment?.author?.email}</p>
                  <small className="text-gray-400 text-xs flex gap-2">
                    {formatDateToUTC(comment?.createdAt)}
                  </small>
                </div>
              </div>
              <p className="text-xs ml-6 border-l-2 border-gray-600  px-2 ">
                {comment?.content}
              </p>
              <div className="ml-8">
                <Button className="  w-12 h-8 text-xs   bg-gradient-to-r from-blue-500 to-purple-500  hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition duration-300">
                  Reply
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* // pagination */}
        <div className="my-4">
          <Pagination>
            <PaginationContent className="flex justify-around w-full">
              <PaginationItem>
                <PaginationPrevious
                  className="cursor-pointer border-none bg-purple-500 hover:bg-purple-700 hover:text-white "
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                <Link href="#" passHref>
                  <PaginationLink
                    size="sm" // Add the size prop here
                    onClick={() => handlePageChange(1)}
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                </Link>
              </PaginationItem>
              <PaginationItem>
                <Link href="#" passHref>
                  <PaginationLink
                    size="sm"
                    onClick={() => handlePageChange(2)}
                    isActive={currentPage === 2}
                  >
                    2
                  </PaginationLink>
                </Link>
              </PaginationItem>

              <PaginationItem>
                {/* Use PaginationLink for "Next" */}
                <Link href="#" passHref>
                  <PaginationLink
                    className="border-none bg-purple-500 hover:bg-purple-700 hover:text-white "
                    size="sm" // Add the size prop here
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </PaginationLink>
                </Link>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
