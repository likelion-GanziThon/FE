import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Field } from './ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { CommunityFormValues } from '@/pages/CommunityPage';
import { REGION_1_OPTIONS, REGIONS } from '@/constants/regions';

export default function RegionFieldGroup() {
  const { control, setValue } = useFormContext<CommunityFormValues>();

  // 시/도 드롭다운 value를 추적
  const watchedRegion_1 = useWatch({ control, name: 'region_1' });

  // 시/도 값이 있을 때, 시/구/군 정보 배열로 저장. 값이 없다면 빈 배열
  const REGION_2_OPTIONS = watchedRegion_1 ? REGIONS[watchedRegion_1] : [];

  return (
    <div className='flex gap-4'>
      <Controller
        control={control}
        name='region_1'
        render={({ field }) => (
          <Field>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue('region_2', ''); // region_1 바꾸면 region_2 초기화. (dirty/validation 상태 변경 옵션도 있음)
              }}
              name={field.name} // type이 여기 들어간다.
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='지역 선택(시)' />
              </SelectTrigger>
              <SelectContent>
                {REGION_1_OPTIONS.map((region) => (
                  <SelectItem
                    key={region}
                    value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
      <Controller
        control={control}
        name='region_2'
        render={({ field }) => (
          <Field>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              name={field.name}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='지역 선택(구)' />
              </SelectTrigger>
              <SelectContent>
                {REGION_2_OPTIONS?.map((region) => (
                  <SelectItem
                    key={region}
                    value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
    </div>
  );
}
