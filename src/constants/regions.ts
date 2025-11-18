import REGIONS_JSON from '@/constants/regions.json';
// 전국 지역 데이터 매핑
export const REGIONS = REGIONS_JSON as Record<string, string[]>;

// 시/도 드롭다운 목록  ex) '서울' | '경기' | ...
export const REGION_1_OPTIONS = Object.keys(REGIONS);
