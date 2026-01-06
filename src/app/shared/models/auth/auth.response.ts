// Interface décrivant les données utilisateur que le backend renverra lors de l'authentification
export interface AuthResponse {
  username: string;
  displayName?: string;
}
