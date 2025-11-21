import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, X } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

export default function ImagePreviewList() {
  const { control, setValue } = useFormContext();

  // 이미지 구독
  const images = useWatch({ control, name: 'images' }) || [];

  // 파일 선택 핸들러
  const handleFileList = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    if (images.length + newFiles.length > 5) {
      toast.warning('이미지는 최대 5장까지 업로드 가능합니다.');
      return;
    }

    setValue('images', [...images, ...newFiles]);
    e.target.value = ''; // 같은 파일 재선택 가능하도록 초기화
  };

  // 이미지 삭제 핸들러
  const handleDeleteImage = (indexToRemove: number) => {
    const newImages = images.filter((_: File, index: number) => index !== indexToRemove);
    setValue('images', newImages);
  };

  return (
    <div className='flex w-full flex-wrap items-start gap-3'>
      {/* 1. 이미지 추가 버튼 (최대 개수 도달 시 숨김 처리 가능, 여기선 유지하되 비활성화 느낌만 줄 수도 있음) */}
      {images.length < 5 && (
        <>
          <Label
            htmlFor='image-upload'
            className='group flex size-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 bg-white text-gray-400 transition-all hover:border-orange-400 hover:bg-orange-50 hover:text-orange-500 active:scale-95'>
            <div className='flex size-8 items-center justify-center rounded-full bg-gray-100 group-hover:bg-white'>
              <Camera className='size-5' />
            </div>
            <span className='text-[10px] font-medium'>{images.length}/5</span>
          </Label>
          <Input
            id='image-upload'
            type='file'
            className='hidden'
            accept='image/*'
            multiple
            onChange={handleFileList}
          />
        </>
      )}

      {/* 2. 이미지 미리보기 리스트 */}
      {images?.map((file: File, index: number) => (
        <div
          key={index}
          className='group animate-in fade-in zoom-in-95 relative size-24 duration-200'>
          {/* 이미지 */}
          <div className='h-full w-full overflow-hidden rounded-xl border border-gray-100 shadow-sm'>
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${index}`}
              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
            />
          </div>

          {/* 삭제 버튼 (우상단, 호버 시 색상 변경) */}
          <button
            type='button'
            onClick={() => handleDeleteImage(index)}
            className='absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border border-white/20 bg-gray-900/70 text-white shadow-md backdrop-blur-[2px] transition-colors hover:bg-red-500'>
            <X className='size-3.5' />
          </button>
        </div>
      ))}
    </div>
  );
}
