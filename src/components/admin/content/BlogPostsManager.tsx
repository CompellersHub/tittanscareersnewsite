import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "./RichTextEditor";
import { useCreateBlogPost, useDeleteBlogPost, useFetchBlogs, useUpdateBlogPost, useUploadAsset,  } from "@/hooks/useCourse";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/blogPosts";



export const BlogPostsManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
    const [contentHtml, setContentHtml] = useState('');

    const [imageUrl, setImageUrl] = useState<string>('');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

   const { data: fetchBlogs, isLoading } = useFetchBlogs();

    

    const uploadAsset = useUploadAsset();
  const createBlogPost = useCreateBlogPost();
  const {mutateAsync:updateBlogPost, isPending} = useUpdateBlogPost();
  const {mutateAsync:deleteBlogPost, isPending: isDeleting} = useDeleteBlogPost();


  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    
    const formData = new FormData();
    formData.append('file', file);
    // Optional: formData.append('prefix', 'blog-images'); // if your API supports it

    try {
      const response = await uploadAsset.mutateAsync(formData);
      // Adjust based on your actual API response shape
      const uploadedUrl = response.url || response.data?.url || response;
      setImageUrl(uploadedUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploadingImage(false);
    }
  };


  


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const isPublished = formData.get('is_published') === 'on';

    const payload = {
      slug: formData.get('slug'),
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content: contentHtml,
      author: formData.get('author'),
      category: formData.get('category'),
      tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
      image_url: imageUrl || editingPost?.image_url || null, // use uploaded or existing
      reading_time: parseInt(formData.get('reading_time') as string) || null,
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    try {
      if (editingPost) {
        // If you have an update endpoint, use it here
        await updateBlogPost(payload);
        toast.info('Edit via backend not implemented yet');
        setIsDialogOpen(false);
        return;
      }

      await createBlogPost.mutateAsync(payload);
      toast.success('Blog post created successfully');
      
      // Reset form
      setImageUrl('');
      setContentHtml('');
      setEditingPost(null);
      setIsDialogOpen(false);
      
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    } catch (error) {
      console.error(error);
      toast.error('Failed to create blog post');
    }
  };

// Delete handler
  const handleDelete = (postId: string, slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    deleteBlogPost({ id: postId, slug });
  };


  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Blog Posts</h3>
          <p className="text-sm text-muted-foreground">Manage blog posts and articles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            {/* <Button onClick={() => setEditingPost(null)}> */}
            <Button onClick={() => {
              setEditingPost(null);
              setContentHtml('');
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Add Blog Post'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    name="slug"
                    defaultValue={editingPost?.slug}
                    required
                    disabled={!!editingPost}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingPost?.title}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  defaultValue={editingPost?.data?.excerpt}
                  required
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                 <RichTextEditor
                  content={editingPost?.data?.content || contentHtml}
                  onChange={setContentHtml}
                  placeholder="Start writing your blog post..."
                />
                {/* <Textarea
                  id="content"
                  name="content"
                  defaultValue={editingPost?.content}
                  required
                  rows={8}
                /> */}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    name="author"
                    defaultValue={editingPost?.data?.author}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>

                  <Select onValueChange={(value) => {
                    // Manually set the value of the hidden input
                    const input = document.querySelector('input[name="category"]') as HTMLInputElement;
                    if (input) {
                      input.value = value;
                    }
                  }}  name="category" defaultValue={editingPost?.data?.category}>
                    <SelectTrigger name="category" defaultValue={editingPost?.data?.category}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* <Input
                    id="category"
                    name="category"
                    defaultValue={editingPost?.category}
                    required
                  /> */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    defaultValue={editingPost?.data?.tags?.join(', ')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reading_time">Reading Time (min)</Label>
                  <Input
                    id="reading_time"
                    name="reading_time"
                    type="number"
                    defaultValue={editingPost?.data?.reading_time}
                  />
                </div>
              </div>

            {/*  <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  defaultValue={editingPost?.image_url}
                />
              </div>
              */}

              <div className="space-y-2">
              <Label>Cover Image</Label>
              
              {/* Show current image if exists */}
              {imageUrl && (
                <div className="my-3">
                  <img 
                    src={imageUrl} 
                    alt="Cover" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingImage}
                />
                {isUploadingImage && (
                  <span className="text-sm text-muted-foreground">Uploading...</span>
                )}
              </div>

              {/* Hidden input to include the URL in form submission */}
              <input type="hidden" name="image_url" value={imageUrl} />
              
              
            </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  name="is_published"
                  defaultChecked={editingPost?.is_published ?? false}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createBlogPost.isPending || isPending}>
                  {editingPost ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading blog posts...</div>
      ) : (
        <div className="grid gap-4">
          {fetchBlogs?.blogs?.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      {post?.data?.category} • By {post?.data?.author}
                    </CardDescription>
                  </div>
                  <Badge variant={post?.data?.status ? "default" : "secondary"}>
                    {post?.data?.status ? "Published" : "Draft"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {post?.data?.excerpt}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingPost(post);
                      setContentHtml(post?.data?.content || '');
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>handleDelete(post.id, post.slug)}
                    // onClick={() => {
                    //   if (confirm('Delete this blog post?')) {
                    //     // deleteMutation.mutate(post.id);
                    //     handleDelete(post.id, post.slug);
                    //   }
                    // }}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Loader className="animate-spin" /> : (
                      <Trash2 className="h-3 w-3 mr-1" />
                    )}
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
