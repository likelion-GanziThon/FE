import ProfileItem from '@/components/common/ProfileItem';
import { Button } from '@/components/ui/button';

interface ProfileItemProps {
  name: string;
  imageUrl: string;
  userId: number;
}

export default function CommentCard({ name, imageUrl, userId }: ProfileItemProps) {
  return (
    <div className='rounded-2xl border-2 p-4'>
      <div className='gpa-2 flex justify-between'>
        <ProfileItem
          name={name}
          imageUrl={imageUrl}
          userId={userId}
        />
        <div className='flex items-center gap-2'>
          <Button className='h-5 w-10 text-xs'>수정</Button>
          <Button
            className='h-5 w-10 text-xs'
            variant={'destructive'}>
            삭제
          </Button>
        </div>
      </div>
      <p className='py-3'>댓글내용입니다.왜그래정말왜그래</p>
    </div>
  );
}
