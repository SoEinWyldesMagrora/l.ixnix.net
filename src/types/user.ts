export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  profileSymbol?: string;
  pronouns: {
    de: string[];
    en: string[];
  };
  links: {
    discord?: string;
    custom?: {
      label: string;
      url: string;
    };
  };
}

export interface UserCredential {
  user: User;
}