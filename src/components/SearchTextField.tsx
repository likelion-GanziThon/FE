import { Search } from 'lucide-react';
import { Field, FieldError } from './ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { useFormContext } from 'react-hook-form';
import type { CommunityFormValues } from '@/pages/CommunityPage';

export default function SearchTextField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CommunityFormValues>();

  return (
    <Field data-inavlid={!!errors.searchText}>
      <InputGroup>
        <InputGroupInput
          aria-invalid={!!errors.searchText}
          placeholder='검색어를 입력해주세요.'
          type='text'
          {...register('searchText', { required: '검색어를 입력해주세요.' })}
        />
        <InputGroupAddon align={'inline-end'}>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      {!!errors.searchText && <FieldError errors={[errors.searchText]} />}
    </Field>
  );
}
