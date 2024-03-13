import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isServerError = (error: any): error is FetchBaseQueryError =>
  'data' in error && 'message' in error.data;
