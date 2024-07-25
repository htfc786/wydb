// @ts-ignore
/* eslint-disable */
import request from '@/request.ts';

/** hello GET /hello */
export async function hello(options?: { [key: string]: any }) {
  return request<string>('/hello', {
    method: 'GET',
    ...(options || {}),
  });
}
