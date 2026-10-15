import { NextResponse } from 'next/server';

type ApiBody<T> = {
  statusCode?: number;
  success?: boolean;
  message?: string;
  data?: T;
  meta?: unknown;
};

export function apiJson<T>(body: ApiBody<T>) {
  const statusCode = body.statusCode ?? 200;
  return NextResponse.json(
    {
      statusCode,
      success: body.success ?? statusCode < 400,
      message: body.message,
      data: body.data,
      meta: body.meta,
    },
    { status: statusCode },
  );
}
