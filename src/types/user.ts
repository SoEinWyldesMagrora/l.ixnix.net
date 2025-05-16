export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  pronouns: {
    de: string[];
    en: string[];
  };
}

export interface UserCredential {
  user: User;
}