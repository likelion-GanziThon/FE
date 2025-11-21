import { Button } from '@/components/ui/button';
import { Link, useNavigate, useParams } from 'react-router';
import { Heart, Trash2, ChevronLeft, MessageCircle } from 'lucide-react';
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

import { Separator } from '@/components/ui/separator';

interface CommentFormValues {
  content: string;
}

export default function PostDetailPage() {
  const navigate = useNavigate();
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

  // 댓글 작성
  const onSubmit: SubmitHandler<CommentFormValues> = (values) => {
    createComment({
      category: category as PostCategory,
      id: Number(PostId),
      content: values.content,
    });
    commentForm.resetField('content');
  };

  // 좋아요
  const handleLike = () => {
    if (post) {
      createLike({ category: post?.category, id: post?.id });
    }
  };

  if (isLoading || !post || isUserLoding || !user) return <GlobalLoader />;

  const categoryLabel =
    {
      FREE: '자유게시판',
      ROOMMATE: '룸메이트 구해요',
      POLICY: '주거 정책 정보',
    }[category as string] || '게시글';

  return (
    <div className='animate-in fade-in min-h-screen bg-white pb-24 duration-500'>
      {/* 1. 상단 네비게이션 헤더 */}
      <header className='sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-100 bg-white/80 px-4 backdrop-blur-md'>
        <button
          onClick={() => navigate(-1)}
          className='-ml-2 p-2 text-gray-600 hover:text-black'>
          <ChevronLeft className='size-6' />
        </button>
        <span className='text-sm font-semibold text-gray-500'>{categoryLabel}</span>
        <div className='flex gap-2'>
          {post.userId === user?.id && (
            <Button
              variant={'ghost'}
              size='icon'
              className='text-gray-400 hover:bg-red-50 hover:text-red-500'>
              <Trash2 className='size-5' />
            </Button>
          )}
        </div>
      </header>

      <main className='px-5 pt-6'>
        {/* 2. 타이틀 및 작성자 정보 */}
        <div className='mb-6'>
          <h1 className='mb-4 text-2xl leading-tight font-bold tracking-tight break-keep text-gray-900'>
            {post?.title}
          </h1>

          <div className='flex items-center justify-between'>
            <ProfileItem
              name={post?.writerLoginId}
              imageUrl={`${import.meta.env.VITE_API_URL}${post?.writerProfileImagePath}`}
              userId={post?.userId}
            />
            {/* 날짜가 있다면 여기에 추가 (예: <span className="text-xs text-gray-400">10분 전</span>) */}
          </div>
        </div>

        <Separator className='my-6 bg-gray-100' />

        {/* 3. 본문 내용 */}
        <section className='mb-8 min-h-[100px]'>
          <p className='text-base leading-relaxed break-words whitespace-pre-line text-gray-800'>
            {post?.content}
          </p>
        </section>

        {/* 4. 이미지 갤러리 (가로 스크롤) */}
        {post.imageUrls.length > 0 && (
          <div className='-mx-5 mb-8'>
            <div className='scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4'>
              {post.imageUrls.map((image, idx) => (
                <div
                  key={idx}
                  className='relative aspect-[4/3] w-[85%] flex-none snap-center overflow-hidden rounded-2xl border border-gray-100 shadow-sm'>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${image}`}
                    alt={`attachment-${idx}`}
                    className='h-full w-full object-cover'
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. 액션 버튼 (오픈채팅 & 좋아요) */}
        <div className='mb-10 flex flex-col gap-4'>
          {category === 'ROOMMATE' && post.openchatUrl && (
            <Button
              asChild
              size='lg'
              className='from-home-orange-600 to-home-orange-500 hover:from-home-orange-500 hover:to-home-orange-600 w-full rounded-xl bg-gradient-to-r font-bold text-white shadow-md transition-all hover:shadow-lg'>
              <Link
                to={post.openchatUrl}
                target='_blank'
                rel='noreferrer'>
                💬 오픈채팅방 참여하기
              </Link>
            </Button>
          )}

          <div className='flex items-center justify-center gap-4 py-2'>
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 rounded-full border px-6 py-2.5 transition-all active:scale-95 ${
                post?.likedByMe
                  ? 'border-red-200 bg-red-50 text-red-500 shadow-inner'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}>
              <Heart
                className={`size-5 ${post?.likedByMe ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
              />
              <span className='text-sm font-semibold'>{post?.likeCount}</span>
            </button>
          </div>
        </div>
      </main>

      {/* 6. 댓글 섹션 */}
      <div className='border-t border-gray-100 pt-2'>
        <div className='flex items-center gap-2 px-5 py-4'>
          <MessageCircle className='size-5 text-gray-400' />
          <span className='font-bold text-gray-700'>댓글 {post.comments.length}</span>
        </div>

        <div className='flex flex-col gap-0 pb-10'>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div
                key={comment.id}
                className='border-b border-gray-100 last:border-0'>
                <CommentCard
                  name={comment.writerLoginId}
                  imageUrl={`${import.meta.env.VITE_API_URL}${comment.writerProfileImagePath}`}
                  userId={comment.userId}
                  content={comment.content}
                  commentId={comment.id}
                  category={post.category}
                  postId={post.id}
                />
              </div>
            ))
          ) : (
            <div className='py-10 text-center text-sm text-gray-400'>
              첫 번째 댓글을 남겨보세요!
            </div>
          )}
        </div>
      </div>

      {/* 7. 플로팅 입력창 */}
      <FormProvider {...commentForm}>
        <form onSubmit={commentForm.handleSubmit(onSubmit)}>
          <MessageInputBar
            name='content'
            placeholder='따뜻한 댓글을 남겨주세요...'
          />
        </form>
      </FormProvider>
    </div>
  );
}
