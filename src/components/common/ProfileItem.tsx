import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router';

interface ProfileItemProps {
  name: string;
  imageUrl: string;
  userId: number;
}

export default function ProfileItem({ name, imageUrl, userId }: ProfileItemProps) {
  console.log(imageUrl);
  return (
    <Link
      to={`/profile/${userId}`}
      className='flex items-center gap-3'>
      <Avatar className='size-10'>
        <AvatarImage src={imageUrl} />
        <AvatarFallback>profile</AvatarFallback>
      </Avatar>
      <span className='text-muted-foreground'>{name}</span>
    </Link>
  );
}
