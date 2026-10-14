import { apiJson } from '@/src/lib/api-response';
import { getPosts } from '@/src/lib/posts';

export async function GET() {
  const data = await getPosts();
  return apiJson({
    message: 'Post fetched successfully',
    data,
  });
}
