import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router';
import { Heart } from 'lucide-react';
import ProfileItem from '@/components/common/ProfileItem';
import CommentCard from '@/components/CommentCard';
import MessageInputBar from '@/components/MessageInputBar';
import { useGetDetailPost } from '@/hooks/queries/usePost';
import type { PostCategory } from '@/types';
import GlobalLoader from '@/components/common/GlobalLoader';
import { useGetMe } from '@/hooks/queries/useProfile';
import { useCreateComment } from '@/hooks/queries/useComment';
import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import { useCreateLike } from '@/hooks/queries/useLike';

import { queryClient } from '@/apis/queryClient';
import { QUERY_KEYS } from '@/constants/queryKeys';

interface CommentFormValues {
  content: string;
}

export default function PostDetailPage() {
  const { category, PostId } = useParams();
  const { mutate: createComment } = useCreateComment();
  const { data: user, isLoading: isUserLoding } = useGetMe();
  const { data: post, isLoading } = useGetDetailPost({
    category: category as PostCategory,
    id: Number(PostId),
  });
  const { mutate: createLike } = useCreateLike({
    onSuccess: () => {
      if (post) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.post.detail(category as PostCategory, post.id),
        });
      }
    },
  });
  const commentForm = useForm<CommentFormValues>({
    defaultValues: {
      content: '',
    },
  });

  //댓글 작성
  const onSubmit: SubmitHandler<CommentFormValues> = (values) => {
    createComment({
      category: category as PostCategory,
      id: Number(PostId),
      content: values.content,
    });
    commentForm.resetField('content'); // 댓글 비우기
  };

  //좋아요
  const handleLike = () => {
    if (post) {
      createLike({ category: post?.category, id: post?.id });
    }
  };

  if (isLoading || !post || isUserLoding || !user) return <GlobalLoader />;

  return (
    <div className='p-4 pb-20'>
      {post.userId === user?.id && (
        <header className='flex justify-end gap-3'>
          <Button variant={'destructive'}>삭제</Button>
        </header>
      )}

      <div>
        <span className='text-2xl'>{post?.title}</span>
        <div className='my-4 flex items-center justify-between border-b-2 pb-4'>
          <ProfileItem
            name={post?.writerLoginId}
            imageUrl={`${import.meta.env.VITE_API_URL}${post?.writerProfileImagePath}`}
            userId={post?.userId}
          />
          {category === 'ROOMMATE' && (
            <Button asChild>
              <Link to={post.openchatUrl!}>오픈 채팅방 링크</Link>
            </Button>
          )}

          <button
            className='flex items-center gap-2'
            onClick={handleLike}>
            <Heart
              color={post?.likedByMe ? 'red' : 'black'}
              fill={post?.likedByMe ? 'red' : 'transparent'}
            />
            <span>{post?.likeCount}</span>
          </button>
        </div>
      </div>
      <section className='pb-30'>
        <p>{post?.content}</p>
      </section>
      <div className='flex w-full flex-wrap gap-3'>
        {post.imageUrls.map((image, idx) => (
          <div
            key={idx}
            className='size-20'>
            <img
              src={`${import.meta.env.VITE_API_URL}${image}`}
              alt='img'
              className='h-full w-full rounded-2xl object-cover'
            />
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-1'>
        {post.comments.map((comment) => (
          <CommentCard
            key={comment.id}
            name={comment.writerLoginId}
            imageUrl={`${import.meta.env.VITE_API_URL}${comment.writerProfileImagePath}`}
            userId={comment.userId}
            content={comment.content}
            commentId={comment.id}
            category={post.category}
            postId={post.id}
          />
        ))}
      </div>
      <FormProvider {...commentForm}>
        <form onSubmit={commentForm.handleSubmit(onSubmit)}>
          <MessageInputBar
            name='content'
            placeholder='댓글 작성'
          />
        </form>
      </FormProvider>
    </div>
  );
}
