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

export default function PostDetailPage() {
  const { category, PostId } = useParams();
  const { mutate: createComment } = useCreateComment();
  const { data: user } = useGetMe();
  const { data: post, isLoading } = useGetDetailPost({
    category: category as PostCategory,
    id: Number(PostId),
  });

  //댓글 작성
  const handleSubmit = (content: string) => {
    createComment({ category: category as PostCategory, id: Number(PostId), content });
  };

  if (isLoading || !post) return <GlobalLoader />;

  return (
    <div className='p-4 pb-20'>
      {post.userId === user?.id && (
        <header className='flex justify-end gap-3'>
          <Button>수정</Button>
          <Button variant={'destructive'}>삭제</Button>
        </header>
      )}

      <div>
        <span className='text-2xl'>{post?.title}</span>
        <div className='my-4 flex items-center justify-between border-b-2 pb-4'>
          <ProfileItem
            name={post?.title}
            imageUrl=''
            userId={post?.userId}
          />
          {category === 'ROOMMATE' && (
            <Button asChild>
              <Link to={post.openchatUrl!}>오픈 채팅방 링크</Link>
            </Button>
          )}

          <div className='flex items-center gap-2'>
            <Heart fill='black' />
            <span>{post?.likeCount}</span>
          </div>
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
            name={String(comment.userId)}
            imageUrl=''
            userId={comment.userId}
            content={comment.content}
          />
        ))}
      </div>

      <MessageInputBar onSubmit={handleSubmit} />
    </div>
  );
}
