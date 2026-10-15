import { apiJson } from '@/src/lib/api-response';
import { getBookmarkState, toggleBookmark } from '@/src/lib/posts';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { id: slug } = await params;
  const userId = new URL(req.url).searchParams.get('userId');
  const data = await getBookmarkState(slug, userId);
  return apiJson({
    message: 'Bookmark fetched',
    data,
  });
}

export async function POST(req: Request, { params }: Ctx) {
  const { id: slug } = await params;
  try {
    const body = await req.json().catch(() => ({}));
    const data = await toggleBookmark({
      slug,
      userId: body.userId,
      saved: body.saved,
    });
    return apiJson({
      message: data.isSaved ? 'Post saved' : 'Post unsaved',
      data,
    });
  } catch (error: any) {
    return apiJson({
      statusCode: 500,
      success: false,
      message: error?.message,
    });
  }
}
