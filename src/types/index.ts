export interface BlogPostMeta {
  title: string;
  slug: string;
  date: string;
  author: string;
  authorId: string;
  authorProfile?: string;
  excerpt: string;
  tags: string[];
  thumbnail?: string;
  published: boolean;
}

export interface BlogPost {
  slug: string;
  meta: BlogPostMeta;
  content: string;
  filePath?: string;
}
export type IPost = {
  name: string;
};
