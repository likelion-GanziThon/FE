import home from '@/assets/home.png';

function GlobalLoader() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex animate-bounce items-center gap-5'>
        <img
          src={home}
          alt='logo'
          className='w-15'
        />
        <div className='text-3xl font-bold'>로딩 중입니다~</div>
      </div>
    </div>
  );
}

export default GlobalLoader;
