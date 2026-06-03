import { ApiError } from './api-error.type';

/**
 * Convert positional args (["a","b"]) to named params.
 * Example output: { "0": "a", "1": "b" } or map to custom names if needed.
 */
export function positionalArgsToNamedParams(args?: string[]): Record<string, string> | undefined {
  if (!args || args.length === 0) return undefined;
  return args.reduce(
    (acc, v, i) => {
      acc[String(i)] = v;
      return acc;
    },
    {} as Record<string, string>,
  );
}

/**
 * Format api error to a user-facing message using a provided i18n instance.
 * i18n should expose: exists(key): boolean and t(key, options): string
 *
 * - Tries: i18n.t(errorKey, params) -> fallback to backend message -> fallback to generic text.
 */
export function formatApiError(i18n: any, payload: ApiError): string {
  if (!payload) return 'An error occurred';

  const { errorKey, message, messageArgs } = payload;

  if (errorKey && i18n && typeof i18n.exists === 'function' && i18n.exists(errorKey)) {
    const params = positionalArgsToNamedParams(messageArgs);
    // Many i18n libs support defaultValue as fallback; pass backend message as default
    return i18n.t(errorKey, { defaultValue: message, ...(params ?? {}) });
  }

  // If key absent or not translatable, use backend message
  if (message) return message;

  return 'An error occurred';
}
