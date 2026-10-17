import { apiJson } from '@/src/lib/api-response';
import { ROOT_COMMENT_PAGE_SIZE } from '@/src/lib/comment-limits';
import { authJson, requireFirebaseUid } from '@/src/lib/firebase-token';
import { createComment, getComments } from '@/src/lib/posts';

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const search = new URL(req.url).searchParams;
  const sortBy = search.get('sortBy') || 'desc';
  const page = Number(search.get('page')) || 1;
  const limit = Number(search.get('limit')) || ROOT_COMMENT_PAGE_SIZE;
  const userId = search.get('userId');

  try {
    const result = await getComments({ slug, sortBy, page, limit, userId });
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
    const uid = await requireFirebaseUid(req);
    const body = await req.json();
    const data = await createComment({
      content: body.content,
      authorId: uid,
      slug,
      parentId: body.parentId ?? null,
    });
    return apiJson({
      message: 'Comment added successfully',
      data,
    });
  } catch (error: any) {
    const unauthorized = authJson(error);
    if (unauthorized) return unauthorized;
    const message = error?.message || 'Could not add that comment.';
    const bad =
      typeof message === 'string' &&
      (message.includes('10 replies') ||
        message.includes('empty') ||
        message.includes('at most') ||
        message.includes('not found'));
    return apiJson({
      statusCode: bad ? 400 : 500,
      success: false,
      message,
      data: error,
    });
  }
}
