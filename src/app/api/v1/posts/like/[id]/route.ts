import { apiJson } from '@/src/lib/api-response';
import { authJson, requireFirebaseUid } from '@/src/lib/firebase-token';
import { getPostLikeCount, togglePostLike } from '@/src/lib/posts';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { id: slug } = await params;
  const userId = new URL(req.url).searchParams.get('userId');
  const data = await getPostLikeCount(slug, userId);
  return apiJson({
    message: 'Like fetched successfully',
    data,
  });
}

export async function POST(req: Request, { params }: Ctx) {
  const { id: slug } = await params;
  try {
    const uid = await requireFirebaseUid(req);
    const body = await req.json().catch(() => ({}));
    const data = await togglePostLike({
      slug,
      userId: uid,
      isLiked: body.isLiked,
    });
    return apiJson({
      message: 'Like Added successfully',
      data,
    });
  } catch (error: any) {
    const unauthorized = authJson(error);
    if (unauthorized) return unauthorized;
    return apiJson({
      statusCode: 500,
      success: false,
      message: error?.message,
    });
  }
}
