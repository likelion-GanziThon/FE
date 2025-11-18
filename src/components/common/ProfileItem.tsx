import { Link } from 'react-router';

interface ProfileItemProps {
  name: string;
  imageUrl: string;
  userId: number;
}

export default function ProfileItem({ name, imageUrl, userId }: ProfileItemProps) {
  return (
    <Link
      to={`/profile/${userId}`}
      className='flex items-center gap-3'>
      <img
        src={imageUrl}
        alt='프로필 사진'
        className='size-10 rounded-full border-2'
      />
      <span className='text-muted-foreground'>{name}</span>
    </Link>
  );
}
