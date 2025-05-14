'use client';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';
import { Checkbox } from '@/src/components/ui/checkbox';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { FiX, FiLoader } from 'react-icons/fi';
import { AuthContext } from '../providers/AuthProviders';
import { useCreatePostMutation } from '../redux/api/posts/PostApiSlice';
import RichTextEditor from './RichTextEditor';

const BlogPostForm = () => {
  const { user } = useContext(AuthContext);
  const [createPost, { isLoading }] = useCreatePostMutation();
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
  const [editorKey, setEditorKey] = useState(Date.now()); // For resetting editor

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        authorId: user?.uid,
        formData: {
          ...formData,
          content: sanitizeContent(formData.content), // Add sanitization
        },
      };

      await createPost({ data }).unwrap();

      // Reset form after successful submission
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        tags: [],
        thumbnail: '',
        content: '',
        published: false,
      });
      setCurrentTag('');
      setEditorKey(Date.now()); // Reset editor content
    } catch (error) {
      console.error('Submission failed:', error);
      // Add error handling toast here
    }
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (['Enter', ','].includes(e.key) && currentTag) {
      e.preventDefault();
      setFormData({
        ...formData,
        tags: [...new Set([...formData.tags, currentTag.trim()])], // Prevent duplicates
      });
      setCurrentTag('');
    }
  };

  const sanitizeContent = (html: string) => {
    // Implement DOMPurify or similar sanitization
    return html; // Replace with actual sanitization
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            Write New Blog
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and publish new blog posts
          </p>
        </div>
      </div>

      <Card className="border-border">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2 col-span-2">
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Post title"
                    disabled={isLoading}
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="post-slug"
                    disabled={isLoading}
                  />
                </div>

                {/* Thumbnail */}
                <div className="space-y-2">
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={formData.thumbnail}
                    onChange={(e) =>
                      setFormData({ ...formData, thumbnail: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    disabled={isLoading}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2 col-span-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 p-2 border rounded-lg">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="flex items-center gap-2 py-1"
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
                          className="text-muted-foreground hover:text-foreground"
                          disabled={isLoading}
                        >
                          <FiX className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <Input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={addTag}
                      placeholder="Add tag (press Enter)"
                      className="border-0 shadow-none focus-visible:ring-0"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2 col-span-2">
                  <Label>Excerpt</Label>
                  <Textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Short post excerpt"
                    rows={3}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className="space-y-2">
                <Label>Content</Label>
                <div className="rounded-lg border overflow-hidden">
                  <RichTextEditor
                    key={editorKey}
                    onChange={(content) =>
                      setFormData({ ...formData, content })
                    }
                    className="min-h-[400px] p-4"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Publish Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="publish"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: !!checked })
                  }
                  disabled={isLoading}
                />
                <Label htmlFor="publish" className="text-sm font-medium">
                  Publish Immediately
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full primary-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <FiLoader className="animate-spin h-4 w-4" />
                  Publishing...
                </div>
              ) : (
                'Create Post'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BlogPostForm;
