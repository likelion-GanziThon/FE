import ProfileItem from '@/components/common/ProfileItem';
import { Button } from '@/components/ui/button';

import { useDeleteComment } from '@/hooks/queries/useComment';
import { useGetMe } from '@/hooks/queries/useProfile';
import type { PostCategory } from '@/types';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface CommentCardProps {
  name: string;
  imageUrl: string;
  userId: number;
  content: string;
  commentId: number;
  postId: number;
  category: PostCategory;
}

export default function CommentCard({
  name,
  imageUrl,
  userId,
  content,
  commentId,
  postId,
  category,
}: CommentCardProps) {
  const { data: user } = useGetMe();

  const { mutate: deleteComment, isPending } = useDeleteComment({
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.', { position: 'bottom-center' });
    },
    onError: () => {
      toast.error('댓글 삭제에 실패했습니다.');
    },
  });

  const handleDelete = () => {
    if (window.confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      // 쿼리 무효화를 위해 함꼐 보낸다.
      deleteComment({ category: category as PostCategory, postId: Number(postId), commentId });
    }
  };

  return (
    <div className='group relative flex w-full flex-col gap-1 px-5 py-4 transition-colors hover:bg-gray-50/80'>
      <div className='flex items-start justify-between gap-2'>
        {/* 프로필 정보 (ProfileItem 재사용) */}
        <ProfileItem
          name={name}
          imageUrl={imageUrl}
          userId={userId}
        />

        {/* 작성자 본인일 경우 삭제 버튼 노출 */}
        {user?.id === userId && (
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 text-gray-400 transition-all hover:bg-red-50 hover:text-red-500'
            onClick={handleDelete}
            disabled={isPending}
            title='댓글 삭제'>
            <Trash2 className='size-4' />
          </Button>
        )}
      </div>

      {/* 댓글 내용: 프로필 사진 너비(약 40~48px)만큼 들여쓰기하여 가독성 확보 */}
      <div className='pl-12'>
        <p className='text-[15px] leading-relaxed break-all whitespace-pre-wrap text-gray-800'>
          {content}
        </p>
      </div>
    </div>
  );
}
