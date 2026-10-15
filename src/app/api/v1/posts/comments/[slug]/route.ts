import { apiJson } from '@/src/lib/api-response';
import { createComment, getComments } from '@/src/lib/posts';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const search = new URL(req.url).searchParams;
  const page = Number(search.get('page')) || 1;
  const limit = Number(search.get('limit')) || 10;
  const skip = (page - 1) * limit;
  const sortBy = search.get('sortBy') || 'desc';

  try {
    const result = await getComments({ slug, sortBy, page, limit, skip });
    return apiJson({
      message: 'Comment Fetched successfully',
      data: result.result,
      meta: result.meta,
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

export async function POST(req: Request, { params }: Ctx) {
  const { slug } = await params;
  try {
    const body = await req.json();
    const data = await createComment({
      content: body.content,
      authorId: body.authorId,
      slug,
    });
    return apiJson({
      message: 'Comment added successfully',
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
