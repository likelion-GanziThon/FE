export interface AuthRequest {
  id: string;
  password: string;
}

//프로필 정보 타입
export interface ProfileFields {
  desiredArea: string | null;
  desiredMoveInDate: string | null;
  introduction: string | null;
}

// 유저 타입
export interface User extends ProfileFields {
  id: number;
  nickname: string;
  profileImageUrl: string;
}

export interface UpdateProfile extends ProfileFields {
  profileImageUrl?: File | null;
}
