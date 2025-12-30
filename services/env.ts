
/**
 * OSIKANI ENVIRONMENT SERVICE
 * Mimics a .env file structure by centralizing all secrets.
 */

export interface AppEnv {
  GEMINI_API_KEY: string | undefined;
  META_ACCESS_TOKEN: string;
  META_PHONE_NUMBER_ID: string;
  CORS_PROXY: string;
  MOCK_MODE: boolean;
}

const STORAGE_KEYS = {
  META_TOKEN: 'osikani_env_meta_token',
  PHONE_ID: 'osikani_env_phone_id',
  PROXY: 'osikani_env_proxy',
  MOCK: 'osikani_env_mock'
};

export const EnvService = {
  /**
   * Returns the current environment state.
   * GEMINI_API_KEY is pulled directly from the platform environment.
   */
  getEnv: (): AppEnv => ({
    GEMINI_API_KEY: undefined, // Hidden by BFF
    META_ACCESS_TOKEN: localStorage.getItem(STORAGE_KEYS.META_TOKEN) || '',
    META_PHONE_NUMBER_ID: localStorage.getItem(STORAGE_KEYS.PHONE_ID) || '',
    CORS_PROXY: localStorage.getItem(STORAGE_KEYS.PROXY) || '',
    MOCK_MODE: localStorage.getItem(STORAGE_KEYS.MOCK) === 'true'
  }),

  /**
   * Updates a specific environment variable.
   */
  setVar: (key: keyof Omit<AppEnv, 'GEMINI_API_KEY'>, value: string | boolean) => {
    switch (key) {
      case 'META_ACCESS_TOKEN':
        localStorage.setItem(STORAGE_KEYS.META_TOKEN, value as string);
        break;
      case 'META_PHONE_NUMBER_ID':
        localStorage.setItem(STORAGE_KEYS.PHONE_ID, value as string);
        break;
      case 'CORS_PROXY':
        localStorage.setItem(STORAGE_KEYS.PROXY, value as string);
        break;
      case 'MOCK_MODE':
        localStorage.setItem(STORAGE_KEYS.MOCK, value.toString());
        break;
    }
  },

  /**
   * Bulk update environment from an object.
   */
  saveEnv: (env: Partial<AppEnv>) => {
    if (env.META_ACCESS_TOKEN !== undefined) localStorage.setItem(STORAGE_KEYS.META_TOKEN, env.META_ACCESS_TOKEN);
    if (env.META_PHONE_NUMBER_ID !== undefined) localStorage.setItem(STORAGE_KEYS.PHONE_ID, env.META_PHONE_NUMBER_ID);
    if (env.CORS_PROXY !== undefined) localStorage.setItem(STORAGE_KEYS.PROXY, env.CORS_PROXY);
    if (env.MOCK_MODE !== undefined) localStorage.setItem(STORAGE_KEYS.MOCK, env.MOCK_MODE.toString());
  }
};
