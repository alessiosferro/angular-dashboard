import { Nullable } from '@/model/types';
import { SafeHtml } from '@angular/platform-browser';

export interface UserLogin {
  email: Nullable<string>;
  password: Nullable<string>;
}

export interface AdditionalUserInfo {
  isNewUser: boolean;
  providerId: string;
}

export interface ProviderData {
  providerId: string;
  uid: string;
  displayName?: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
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

export interface MessageEmoji {
  email: string;
  emoji: string;
}

export interface EmojiSelected {
  selectedMessage: Message;
  selectedEmoji: MessageEmoji;
}

export interface Message {
  email: string;
  id: string;
  text: string;
  displayName: string;
  photoURL: string;
  created_at: string;
  emojis: MessageEmoji[];
}

export interface UserLoginResponse {
  operationType: string;
  credential?: unknown;
  additionalUserInfo: AdditionalUserInfo;
  user: User;
}

export interface DashboardForm {
  text: Nullable<string>;
}

export interface AppLink {
  routerLink: string;
  label: string;
  show: boolean;
}

export interface ParsedText {
  type: 'h1' | 'h2' | 'h3' | 'strong' | 'emphasis';
  content: SafeHtml;
}
