import { Controller, useFormContext } from 'react-hook-form';
import { Field } from './ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { CommunityFormValues } from '@/pages/CommunityPage';

export default function SearchTypeField() {
  const { control } = useFormContext<CommunityFormValues>();

  return (
    <Controller
      control={control}
      name='type'
      render={({ field }) => (
        <Field>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            name={field.name} // type이 여기 들어간다.
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='검색할 타입을 정하세요.' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='title'>제목</SelectItem>
              <SelectItem value='content'>내용</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
