'use client';
import { useContext, useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { useCreatePostMutation } from '../redux/api/posts/PostApiSlice';
import { AuthContext } from '../providers/AuthProviders';

const BlogPostForm = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [createPost, { isLoading, isError, error, isSuccess }] =
    useCreatePostMutation();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    tags: [] as string[],
    thumbnail: '',
    content: '',
    published: false,
  });

  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your API call here
    const data = {
      authorId: user?.uid,
      formData,
    };
    createPost({ data });
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (['Enter', ','].includes(e.key) && currentTag) {
      e.preventDefault();
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      });
      setCurrentTag('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-8 text-white"
      >
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full bg-gray-800 rounded-lg border border-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Post title"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Slug</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full bg-gray-800 rounded-lg border border-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="post-slug"
          />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            className="w-full bg-gray-800 rounded-lg border border-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Short post excerpt"
            rows={3}
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Tags</label>
          <div className="flex flex-wrap gap-2 bg-gray-800 rounded-lg border border-gray-700 p-2">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      tags: formData.tags.filter((t) => t !== tag),
                    })
                  }
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={addTag}
              placeholder="Add tag (press Enter)"
              className="flex-1 bg-transparent p-1 min-w-[120px] focus:outline-none"
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Thumbnail URL</label>
          <input
            type="text"
            value={formData.thumbnail}
            onChange={(e) =>
              setFormData({ ...formData, thumbnail: e.target.value })
            }
            className="w-full bg-gray-800 rounded-lg border border-gray-700 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Rich Text Editor */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Content</label>
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <RichTextEditor
              onChange={(content) => setFormData({ ...formData, content })}
              className="p-4 min-h-[400px] text-white"
            />
          </div>
        </div>

        {/* Published Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.published}
            onChange={(e) =>
              setFormData({ ...formData, published: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600"
          />
          <label className="text-sm font-medium">Publish Immediately</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default BlogPostForm;
