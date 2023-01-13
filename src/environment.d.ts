declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test' | 'demo';
      APPLICATION_PORT: string | number;
      CACHE_TTL: string | number;
      THROTTLE_TTL: string | number;
      THROTTLE_LIMIT: string | number;
      DATABASE_MYSQL_URL: string;
      DATABASE_MYSQL_CA: string;
      JWT_SECRET: string;
    }
  }
}

export {};
