import { Button } from '@/components/ui/button';
import { useParams } from 'react-router';
import { Heart } from 'lucide-react';
import ProfileItem from '@/components/common/ProfileItem';
import CommentCard from '@/components/CommentCard';
import MessageInputBar from '@/components/MessageInputBar';

export default function PostDetailPage() {
  const { category } = useParams();

  //댓글 작성
  const handleSubmit = (text: string) => {
    console.log(text);
    //TODO: API
  };

  return (
    <div className='p-4 pb-20'>
      <header className='flex justify-end gap-3'>
        <Button>수정</Button>
        <Button variant={'destructive'}>삭제</Button>
      </header>
      <div>
        <span className='text-2xl'>제목</span>
        <div className='my-4 flex items-center justify-between border-b-2 pb-4'>
          <ProfileItem
            name={'임재준'}
            imageUrl={
              'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
            }
            userId={12}
          />
          {category === 'roomate' && <div>오픈채팅 링크</div>}

          <div className='flex items-center gap-2'>
            <Heart fill='black' />
            <span>3</span>
          </div>
        </div>
      </div>
      <section className='pb-30'>
        <p>내용이 무척 많아요 정말 정말</p>
      </section>

      <div className='flex flex-col gap-1'>
        <CommentCard
          name='준호'
          imageUrl='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
          userId={10}
        />
        <CommentCard
          name='준호'
          imageUrl='https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
          userId={10}
        />
      </div>

      <MessageInputBar onSubmit={handleSubmit} />
    </div>
  );
}
