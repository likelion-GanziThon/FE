import PostCard from '@/components/common/PostCard';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMainPosts } from '@/hooks/queries/usePost';
import { CirclePlus } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const { data: mainPosts } = useGetMainPosts();
  const navigate = useNavigate();
  return (
    <div className='flex flex-col gap-10 p-10'>
      <Card>
        <CardHeader className=''>
          <CardTitle>커뮤니티 게시판</CardTitle>
          <CardAction>
            <Button
              onClick={() => navigate('/community')}
              variant={'ghost'}
              size={'icon-sm'}
              asChild>
              <CirclePlus size={20} />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {mainPosts?.free.map((freePost) => (
            <PostCard
              key={freePost.id}
              category='FREE'
              post={freePost}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className=''>
          <CardTitle>룸메이트 게시판</CardTitle>
          <CardAction>
            <Button
              onClick={() => navigate('/roommate')}
              variant={'ghost'}
              size={'icon-sm'}
              asChild>
              <CirclePlus />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {mainPosts?.roommate.map((roomatePost) => (
            <PostCard
              key={roomatePost.id}
              category='ROOMMATE'
              post={roomatePost}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className=''>
          <CardTitle>정부 주거 관련 게시판</CardTitle>
          <CardAction>
            <Button
              onClick={() => navigate('/public-housing')}
              variant={'ghost'}
              size={'icon-sm'}
              asChild>
              <CirclePlus />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {mainPosts?.policy.map((policyPost) => (
            <PostCard
              key={policyPost.id}
              category='POLICY'
              post={policyPost}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
