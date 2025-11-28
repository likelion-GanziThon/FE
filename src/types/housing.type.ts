export interface HousingInfo {
  id: number;
  /** 단지 일련번호 (문자열로 들어오는 점 주의) */
  hsmpSn: string;
  /** 광역시/도 명 (예: 경기도) */
  brtcNm: string;
  /** 시/군/구 명 (예: 성남시 분당구) */
  signguNm: string;
  /** 단지 명 (예: 판교해링턴 플레이스) */
  hsmpNm: string;
  /** 세대 수 */
  hshldCo: number;
  /** 기본 임대 보증금 (원 단위) */
  bassRentGtn: number;
  /** 기본 월 임대료 (원 단위) */
  bassMtRntchrg: number;
}

export interface RecommendationItem {
  /** 추천 순위 */
  rank: number;
  /** 주택 상세 정보 객체 */
  housingInfo: HousingInfo;
  /** 추천 사유 */
  reason: string;
}

//DTO

export interface PostRecommendRequest {
  sido: string;
  districts: string[];
  prompt: string;
}
