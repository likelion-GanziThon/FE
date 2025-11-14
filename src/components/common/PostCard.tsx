import { Card, CardContent } from '@/components/ui/card';
import logo from '@/assets/react.svg';
import { Eye } from 'lucide-react';
import { MessageSquareText } from 'lucide-react';
import { Link } from 'react-router';

interface PostCardProps {}

function PostCard({}: PostCardProps) {
  return (
    <Card className='flex-row justify-between'>
      <CardContent className='flex flex-col gap-1'>
        <div className='text-2xl font-semibold'>제목</div>
        <div className='text-muted-foreground'>작성자</div>

        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            <Eye className='size-5' />
            23
          </div>
          <div className='flex items-center gap-2'>
            <MessageSquareText className='size-5' />2
          </div>
        </div>
      </CardContent>
      <CardContent className=''>
        <img
          src={logo}
          alt=''
          className='size-20'
        />
      </CardContent>
    </Card>
  );
}

export default PostCard;
