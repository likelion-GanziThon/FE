import { queryClient } from '@/apis/queryClient';
import ProfileItem from '@/components/common/ProfileItem';
import { Button } from '@/components/ui/button';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { useDeleteComment } from '@/hooks/queries/useComment';
import { useGetMe } from '@/hooks/queries/useProfile';
import type { PostCategory } from '@/types';
import { toast } from 'sonner';

interface ProfileItemProps {
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
}: ProfileItemProps) {
  const { data: user } = useGetMe(); // 나의 댓글과 비교하는 로직
  const { mutate: deleteComment } = useDeleteComment({
    onSuccess: () => {
      toast.success('댓글이 삭제되었습니다.', { position: 'bottom-center' });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.post.detail(category, postId),
      });
    },
  });

  const handleDelte = () => {
    deleteComment(commentId);
  };

  return (
    <div className='rounded-2xl border-2 p-4'>
      <div className='gpa-2 flex justify-between'>
        <ProfileItem
          name={name}
          imageUrl={imageUrl}
          userId={userId}
        />

        {user?.id === userId && (
          <div className='flex items-center gap-2'>
            <Button
              className='h-5 w-10 text-xs'
              variant={'destructive'}
              onClick={handleDelte}>
              삭제
            </Button>
          </div>
        )}
      </div>
      <p className='py-3'>{content}</p>
    </div>
  );
}
