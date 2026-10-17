import { apiJson } from '@/src/lib/api-response';
import { authJson, requireFirebaseUid } from '@/src/lib/firebase-token';
import { getCommentLikeCount, toggleCommentLike } from '@/src/lib/posts';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { id: commentId } = await params;
  const userId = new URL(req.url).searchParams.get('userId');
  try {
    const data = await getCommentLikeCount(commentId, userId);
    return apiJson({
      message: 'Comment like fetched successfully',
      data,
    });
  } catch (error: any) {
    const missing = error?.message === 'Comment not found';
    return apiJson({
      statusCode: missing ? 404 : 400,
      success: false,
      message: error?.message,
    });
  }
}

export async function POST(req: Request, { params }: Ctx) {
  const { id: commentId } = await params;
  try {
    const uid = await requireFirebaseUid(req);
    const body = await req.json().catch(() => ({}));
    const data = await toggleCommentLike({
      commentId,
      userId: uid,
      isLiked: body.isLiked,
    });
    return apiJson({
      message: 'Comment like updated successfully',
      data,
    });
  } catch (error: any) {
    const unauthorized = authJson(error);
    if (unauthorized) return unauthorized;
    const message = error?.message || 'Could not update comment like.';
    const notFound = message === 'Comment not found';
    const badRequest =
      message === 'Only parent comments can be liked' ||
      message.includes('required') ||
      message.includes('boolean');
    return apiJson({
      statusCode: notFound ? 404 : badRequest ? 400 : 500,
      success: false,
      message,
    });
  }
}
