import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, X } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

export default function ImagePreviewList() {
  const { control, setValue } = useFormContext();

  //이미지 구독
  const images = useWatch({ control, name: 'images' }) || []; // 초기값

  // 파일 선택 핸들러
  const handleFileList = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files); // FileList -> Array 변환

    //이미지 개수 제한
    if (images.length + newFiles.length > 5) {
      toast.warning('이미지는 최대 5장까지 업로드 가능합니다.');
      return;
    }

    // 이미지 추가
    setValue('images', [...images, ...newFiles]);

    // input 값 초기화
    e.target.value = '';
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (indexToRemove: number) => {
    const newImages = images.filter((_: File, index: number) => index !== indexToRemove);
    setValue('images', newImages);
  };

  return (
    <div className='flex w-full flex-wrap gap-3'>
      <Label
        className='size-15 items-center justify-center rounded-full bg-amber-400'
        htmlFor='image'>
        <Camera className='size-8' />
      </Label>
      <Input
        id='image'
        type='file'
        className='hidden'
        accept='image/*'
        multiple // 여러 장
        onChange={handleFileList}
      />

      {images?.map((file: File, index: number) => (
        <div
          key={index}
          className='relative size-15'>
          <img
            src={URL.createObjectURL(file)}
            alt='미리보기'
            className='h-full w-full rounded-2xl object-cover'
          />
          <Button
            type='button'
            onClick={() => handleDeleteImage(index)}
            className='absolute top-0 right-0 size-5 bg-red-500'>
            <X className='text-white' />
          </Button>
        </div>
      ))}
    </div>
  );
}
