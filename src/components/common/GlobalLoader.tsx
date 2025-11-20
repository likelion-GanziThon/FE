import logo from '@/assets/react.svg';

function GlobalLoader() {
  return (
    <div className='bg-muted flex h-screen w-screen items-center justify-center'>
      <div className='flex animate-bounce gap-5'>
        <img
          src={logo}
          alt='logo'
          className='w-10'
        />
        <div className='text-2xl font-bold'>로딩 중입니다~</div>
      </div>
    </div>
  );
}

export default GlobalLoader;
