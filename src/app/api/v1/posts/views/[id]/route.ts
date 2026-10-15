import { apiJson } from '@/src/lib/api-response';
import { getViews, incrementView } from '@/src/lib/posts';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id: slug } = await params;
  try {
    const data = await getViews(slug);
    return apiJson({
      message: 'fetched view count',
      data,
    });
  } catch (error: any) {
    return apiJson({
      statusCode: 500,
      success: false,
      message: error?.message,
      data: error,
    });
  }
}

export async function POST(_req: Request, { params }: Ctx) {
  const { id: slug } = await params;
  try {
    const data = await incrementView(slug);
    return apiJson({
      message: 'View count increment',
      data,
    });
  } catch (error: any) {
    return apiJson({
      statusCode: 500,
      success: false,
      message: error?.message,
      data: error,
    });
  }
}
