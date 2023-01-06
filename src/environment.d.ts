declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test' | 'demo';
      APPLICATION_PORT: string | number;
      CACHE_TTL: string | number;
      THROTTLE_TTL: string | number;
      THROTTLE_LIMIT: string | number;
    }
  }
}

export {};
