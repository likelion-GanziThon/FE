import { Search } from 'lucide-react';
import { Field } from './ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group';
import { useFormContext } from 'react-hook-form';
import type { CommunityFormValues } from '@/pages/CommunityPage';

export default function SearchTextField() {
  const { register } = useFormContext<CommunityFormValues>();

  return (
    <Field>
      <InputGroup>
        <InputGroupInput
          placeholder='검색어를 입력해주세요.'
          type='text'
          {...register('searchText')}
        />
        <InputGroupAddon align={'inline-end'}>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
