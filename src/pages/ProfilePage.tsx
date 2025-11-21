import GlobalLoader from '@/components/common/GlobalLoader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useGetMe, useGetOtherProfile } from '@/hooks/queries/useProfile';

import { Link, useParams } from 'react-router';

export default function ProfilePage() {
  const { userId } = useParams();

  const { data: user } = useGetOtherProfile(Number(userId));

  const { data: me, isPending } = useGetMe();

  if (isPending) return <GlobalLoader />;
  return (
    <div className='flex flex-col gap-10 p-8'>
      <div className='flex items-center gap-14'>
        <Avatar className='size-25'>
          <AvatarImage
            src={
              user?.profileImageUrl.startsWith('http')
                ? user.profileImageUrl
                : `${import.meta.env.VITE_API_URL}${user?.profileImageUrl}`
            }
          />
          <AvatarFallback>profile</AvatarFallback>
        </Avatar>
        <span className='flex text-2xl'>{user?.nickname}</span>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center'>
          <span className='w-32 text-xl'>희망 거주 지역</span>
          <div className='flex-1 rounded-2xl border bg-gray-200 py-2 text-center'>
            {user?.desiredArea || '희망 거주 지역을 추가해주세요!'}
          </div>
        </div>
        <div className='flex items-center'>
          <span className='w-32 text-xl'>희망 입주 시기</span>
          <div className='flex-1 rounded-2xl border bg-gray-200 py-2 text-center'>
            {user?.desiredMoveInDate || '희망 입주 시기를 입력해주세요!'}
          </div>
        </div>
      </div>
      <div>
        <span className='text-xl'>자기소개</span>
        <p
          //whitespace-pre-line :줄바꿈 문자 기준으로 실제 줄이 바뀜
          className='my-4 rounded-2xl bg-gray-200 p-4 whitespace-pre-line'>
          {user?.introduction || '자기소개를 입력해주세요!'}
        </p>
      </div>

      {me?.id === user?.id && (
        <Button className='w-30 self-center'>
          <Link to={`/profile/${user?.id}/update`}>수정하기</Link>
        </Button>
      )}
    </div>
  );
}
