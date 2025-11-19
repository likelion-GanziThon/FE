import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function ProfilePage() {
  const userId: number = 12;
  return (
    <div className='flex flex-col gap-10 p-8'>
      <div className='flex items-center gap-14'>
        <Avatar className='size-25'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>profile</AvatarFallback>
        </Avatar>
        <span className='flex text-2xl'>닉네임</span>
      </div>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center'>
          <span className='w-32 text-xl'>희망 거주 지역</span>
          <div className='flex-1 rounded-2xl border bg-gray-200 py-2 text-center'>
            서울 동대문구
          </div>
        </div>
        <div className='flex items-center'>
          <span className='w-32 text-xl'>희망 입주 시기</span>
          <div className='flex-1 rounded-2xl border bg-gray-200 py-2 text-center'>2025.12.21</div>
        </div>
      </div>
      <div>
        <span className='text-xl'>자기소개</span>
        <p
          //whitespace-pre-line :줄바꿈 문자 기준으로 실제 줄이 바뀜
          className='my-4 rounded-2xl bg-gray-200 p-4 whitespace-pre-line'>
          저는 어릴적부터~~는 어릴적부터~~는 어릴적부터~~는 어릴적부터~~는 어릴적부터~~는
          어릴적부터~~는 어릴적부터~~는 어릴적부터~~는 어릴적부터~~
        </p>
      </div>

      <Button className='w-30 self-center'>
        <Link to={`/profile/${userId}/update`}>수정하기</Link>
      </Button>
    </div>
  );
}
