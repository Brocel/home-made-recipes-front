export type ApiError = {
  timestamp: string;
  status: number;
  error: string;
  errorKey: string; // preferred i18n key from backend
  message: string; // fallback English message
  messageArgs?: string[]; // positional args as strings
  path: string;
};
