import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Field, FieldError } from './ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useGetRegion1, useGetRegion2 } from '@/hooks/queries/useHouse';
// 파일 경로는 상황에 맞게 수정해서 사용

interface HouseRegionFieldGroupProps {
  region1: string;
  region2: string;
  requiredRegion1?: boolean;
  requiredRegion2?: boolean;
}

export default function HouseRegionFieldGroup({
  region1,
  region2,
  requiredRegion1 = true,
  requiredRegion2 = true,
}: HouseRegionFieldGroupProps) {
  const { control, setValue } = useFormContext();

  // 1단계(시/도) 값 watch
  const watchedRegion1 = useWatch({ control, name: region1 });

  // 1단계 옵션 조회
  const { data: region1Options = [], isLoading: isRegion1Loading } = useGetRegion1();

  // 2단계 옵션 조회 (1단계 값이 있을 때만)
  const { data: region2Options = [], isLoading: isRegion2Loading } = useGetRegion2(watchedRegion1);

  const isRegion2Disabled = !watchedRegion1 || isRegion2Loading;

  return (
    <div className='flex gap-4'>
      {/* 1단계: 시/도 */}
      <Controller
        control={control}
        name={region1}
        rules={requiredRegion1 ? { required: '시/도를 선택해주세요.' } : undefined}
        render={({ field, fieldState: { error } }) => (
          <Field data-invalid={!!error}>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                // 1단계 변경 시 2단계 초기화
                setValue(region2, '');
              }}
              name={field.name}
              disabled={isRegion1Loading}>
              <SelectTrigger
                className='w-full'
                aria-invalid={!!error}>
                <SelectValue placeholder='지역 선택(시)' />
              </SelectTrigger>
              <SelectContent>
                {region1Options.map((option: { value: string; label: string }) => (
                  <SelectItem
                    key={option.value}
                    value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!!error && <FieldError errors={[error]} />}
          </Field>
        )}
      />

      {/* 2단계: 구/군 */}
      <Controller
        control={control}
        name={region2}
        rules={
          requiredRegion2
            ? {
                required: '구/군을 선택해주세요.',
                // 1단계가 선택되지 않았는데 2단계를 선택하려 할 경우 보호
                validate: () => (watchedRegion1 ? true : '먼저 시/도를 선택해주세요.'),
              }
            : undefined
        }
        render={({ field, fieldState: { error } }) => (
          <Field data-invalid={!!error}>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              name={field.name}
              disabled={isRegion2Disabled}>
              <SelectTrigger
                className='w-full'
                aria-invalid={!!error}>
                <SelectValue
                  placeholder={watchedRegion1 ? '지역 선택(구)' : '먼저 시/도를 선택해주세요.'}
                />
              </SelectTrigger>
              <SelectContent>
                {region2Options.map((option: { value: string; label: string }) => (
                  <SelectItem
                    key={option.value}
                    value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!!error && <FieldError errors={[error]} />}
          </Field>
        )}
      />
    </div>
  );
}
