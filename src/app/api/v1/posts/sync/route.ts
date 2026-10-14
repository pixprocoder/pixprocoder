import { apiJson } from '@/src/lib/api-response';
import { syncPosts } from '@/src/lib/posts';

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization');
  const secret =
    process.env.POST_SYNC_SECRET || process.env.NEXT_PUBLIC_POST_SYNC_SECRET;

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return apiJson({
      statusCode: 401,
      success: false,
      message: 'Unauthorized',
    });
  }

  try {
    const body = await req.json();
    const posts = Array.isArray(body?.posts) ? body.posts : [];
    const data = await syncPosts(posts);
    return apiJson({
      message: data.message,
      data,
    });
  } catch (error) {
    console.error('Sync error:', error);
    return apiJson({
      statusCode: 500,
      success: false,
      message: 'Sync failed',
    });
  }
}
