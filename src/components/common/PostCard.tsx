import { Card, CardContent } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { MessageSquareText } from 'lucide-react';
import { Link } from 'react-router';
import type { Post, PostCategory } from '@/types';

interface PostCardProps {
  post: Post;
  category: PostCategory;
}

function PostCard({ category, post }: PostCardProps) {
  return (
    <Link to={`/post/${category}/${post.id}`}>
      <Card className='flex-row justify-between'>
        <CardContent className='flex flex-col gap-1'>
          <div className='text-2xl font-semibold'>{post.title}</div>
          <div className='text-muted-foreground'>{post.writerLoginId}</div>

          <div className='flex items-center gap-8'>
            <div className='flex items-center gap-2'>
              <Eye className='size-5' />
              {post.viewCount}
            </div>
            <div className='flex items-center gap-2'>
              <MessageSquareText className='size-5' />
              {post.commentCount}
            </div>
          </div>
        </CardContent>
        <CardContent className=''>
          {post.thumbnailUrl && (
            <img
              src={`${import.meta.env.VITE_API_URL}${post.thumbnailUrl}`}
              alt='thumbnail'
              className='size-20'
            />
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default PostCard;
