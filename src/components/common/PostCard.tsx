import { Card } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import { MessageSquareText } from 'lucide-react';
import { Link } from 'react-router';
import type { Post, PostCategory } from '@/types';

interface PostCardProps {
  post: Post;
  category: PostCategory;
}

function PostCard({ category, post }: PostCardProps) {
  // 제목이 20자를 넘으면 자르고 ... 붙이기
  const displayTitle = post.title.length > 20 ? `${post.title.slice(0, 20)}   . . . ` : post.title;

  return (
    <Link
      to={`/post/${category}/${post.id}`}
      className='group block'>
      <Card className='hover:bg-home-orange-100 hover:border-home-orange-300/50 flex h-28 flex-row items-center justify-between p-4 transition-colors duration-300 ease-in-out'>
        <div className='flex flex-col gap-2 overflow-hidden pr-4'>
          <h3 className='text-foreground group-hover:text-home-orange-950 text-lg font-bold tracking-tight transition-colors'>
            {/* truncate 클래스는 제거하거나 유지해도 되지만, 위 로직이 우선 적용됩니다 */}
            {displayTitle}
          </h3>
          <div className='text-muted-foreground group-hover:text-home-orange-800/80 flex items-center gap-3 text-xs transition-colors'>
            <span className='text-sm font-extrabold'>{post.writerLoginId}</span>
            <span className='bg-border group-hover:bg-home-orange-400 h-2 w-[1px]' /> {/* 구분선 */}
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-1'>
                <Eye className='size-3.5' />
                {post.viewCount}
              </div>
              <div className='flex items-center gap-1'>
                <MessageSquareText className='size-3.5' />
                {post.commentCount}
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 썸네일 영역 */}
        {post.thumbnailUrl && (
          <div className='border-border/50 shrink-0 overflow-hidden rounded-md border shadow-sm'>
            <img
              src={`${import.meta.env.VITE_API_URL}${post.thumbnailUrl}`}
              alt='thumbnail'
              className='size-22 object-cover transition-transform duration-500 group-hover:scale-110'
            />
          </div>
        )}
      </Card>
    </Link>
  );
}

export default PostCard;
