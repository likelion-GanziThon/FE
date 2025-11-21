import ProfileItem from '@/components/common/ProfileItem';
import { Button } from '@/components/ui/button';
import { useGetMe } from '@/hooks/queries/useProfile';

interface ProfileItemProps {
  name: string;
  imageUrl: string;
  userId: number;
  content: string;
}

export default function CommentCard({ name, imageUrl, userId, content }: ProfileItemProps) {
  const { data: user } = useGetMe(); // 나의 댓글과 비교하는 로직
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
            <Button className='h-5 w-10 text-xs'>수정</Button>
            <Button
              className='h-5 w-10 text-xs'
              variant={'destructive'}>
              삭제
            </Button>
          </div>
        )}
      </div>
      <p className='py-3'>{content}</p>
    </div>
  );
}
