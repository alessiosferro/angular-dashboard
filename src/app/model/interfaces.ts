export interface UserLogin {
  email: string | null;
  password: string | null;
}

export interface Profile {
}

export interface AdditionalUserInfo {
  isNewUser: boolean;
  providerId: string;
  profile: Profile;
}

export interface ProviderData {
  providerId: string;
  uid: string;
  displayName?: any;
  email: string;
  phoneNumber?: any;
  photoURL?: any;
}

export interface StsTokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

export interface User {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderData[];
  stsTokenManager: StsTokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

export interface UserLoginResponse {
  operationType: string;
  credential?: any;
  additionalUserInfo: AdditionalUserInfo;
  user: User;
}
