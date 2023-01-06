declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test' | 'demo';
      APPLICATION_PORT: string;
    }
  }
}

export {};
