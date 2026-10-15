import { apiJson } from '@/src/lib/api-response';
import { listBookmarks } from '@/src/lib/posts';

export async function GET(req: Request) {
  const userId = new URL(req.url).searchParams.get('userId');
  if (!userId) {
    return apiJson({
      statusCode: 400,
      success: false,
      message: 'userId is required',
    });
  }

  try {
    const bookmarks = await listBookmarks(userId);
    return apiJson({
      message: 'Bookmarks fetched',
      data: { bookmarks },
    });
  } catch (error: any) {
    return apiJson({
      statusCode: 500,
      success: false,
      message: error?.message,
    });
  }
}
