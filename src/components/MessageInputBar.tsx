import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Send } from 'lucide-react';
import { useState } from 'react';

interface MessageInputBarProps {
  onSubmit: (text: string) => void;
}

export default function MessageInputBar({ onSubmit }: MessageInputBarProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onSubmit(text); // 부모에게 입력값 전달
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='fixed bottom-0 left-0 w-full bg-white px-4 pb-4'>
      <InputGroup>
        <InputGroupInput
          placeholder='댓글 작성'
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <InputGroupAddon align={'inline-end'}>
          <button
            type='submit'
            aria-label='댓글 보내기' // 접근성 고려
          >
            <Send className='size-6 text-blue-500' />
          </button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
