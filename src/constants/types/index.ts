export * from './user';
export * from './website';
export * from './product';
export * from './scrapeTask';

export interface ServerError {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
  status: number;
}
