import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Send } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface MessageInputBarProps {
  placeholder?: string;
  name: string;
}

export default function MessageInputBar({ placeholder, name }: MessageInputBarProps) {
  const { register } = useFormContext();

  return (
    <div className='fixed bottom-0 w-full max-w-175 bg-white px-4 py-2 pb-4'>
      <InputGroup className='border-home-orange-300 border-2'>
        <InputGroupInput
          placeholder={placeholder}
          type='text'
          {...register(name, { required: '내용을 입력해주세요.' })}
        />
        <InputGroupAddon align={'inline-end'}>
          <button
            type='submit' // 부모 폼하고 연결
          >
            <Send className='text-home-orange-300 size-6' />
          </button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
