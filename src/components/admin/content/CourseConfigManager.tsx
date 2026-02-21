import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { authApi } from "@/lib/axiosConfig";

export const CourseConfigManager = () => {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);

  const { data: courses, isLoading } = useQuery({
    queryKey: ['course-configs'],
    queryFn: async () => {
      // const { data, error } = await supabase
      //   .from('course_configurations' as any)
      //   .select('*')
      //   .order('created_at', { ascending: false });
      // if (error) throw error;
       const {data} =  await authApi.get(
                `/get-courses`
                
              )
      return data?.courses as any[];

    },
  });


  const createMutation = useMutation({
    mutationFn: async (values: any) => {
      // For create, we might need to send to a different endpoint
      const payload = {
        data: values,
        name: values.name,
        slug: values.slug,
      };
      
      const response = await authApi.post(
        `/create-course`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-configs'] });
      toast.success('Course created successfully');
      setIsDialogOpen(false);
      setEditingCourse(null);
    },
    onError: (error: any) => {
      toast.error('Failed to create course');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: any) => {
      // Map the values to the update payload format expected by the API
      const updates = {
        name: values.name,
        slug: values.slug,
        level: values.level,
        price: values.price,
        original_price: values.original_price,
        description: values.description,
        preview_description: values.preview_description,
        course_image: values.course_image,
        estimated_time: values.estimated_time,
        category: values.category,
        course_include: values.course_include,
        target_audience: values.target_audience,
        learning_outcomes: values.learning_outcomes,
        required_materials: values.required_materials,
      };

      const response = await authApi.patch(
        `/update-course`,
        { id, updates }
      );
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-configs'] });
      toast.success('Course updated successfully');
      setIsDialogOpen(false);
      setEditingCourse(null);
    },
    onError: (error: any) => {
      toast.error('Failed to update course');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await authApi.delete(`/delete-course?id=${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-configs'] });
      toast.success('Course deleted successfully');
    },
    onError: () => toast.error('Failed to delete course'),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Parse array fields from form
    const parseArrayField = (prefix: string, maxItems: number) => {
      const items = [];
      for (let i = 1; i <= maxItems; i++) {
        const value = formData.get(`${prefix}${i}`);
        if (value) items.push(value);
      }
      return items;
    };

    const courseInclude = {
      include: formData.get('include_1') || '',
      include2: formData.get('include_2') || '',
      include3: formData.get('include_3') || '',
      include4: formData.get('include_4') || '',
      include5: formData.get('include_5') || '',
      include6: formData.get('include_6') || '',
      include7: formData.get('include_7') || '',
    };

    const targetAudiences = parseArrayField('target_audience_', 4);
    const learningOutcomes = parseArrayField('learning_outcome_', 4);
    const requiredMaterials = parseArrayField('required_material_', 4);

    const values = {
      name: formData.get('course_title'),
      slug: formData.get('course_slug'),
      level: formData.get('level') || 'Beginner Friendly',
      price: parseFloat(formData.get('price') as string),
      original_price: parseFloat(formData.get('original_price') as string) || 0,
      description: formData.get('description'),
      preview_description: formData.get('preview_description'),
      course_image: formData.get('course_image'),
      estimated_time: formData.get('estimated_time'),
      category: {
        id: parseInt(formData.get('category_id') as string) || 1,
        name: formData.get('category_name') || 'Software Skill',
      },
      course_include: courseInclude,
      target_audience: {
        audiences: targetAudiences,
      },
      learning_outcomes: {
        outcomes: learningOutcomes,
      },
      required_materials: {
        requirements: requiredMaterials,
      },
    };

    if (editingCourse) {
      updateMutation.mutate({ id: editingCourse.id, values });
    } else {
      createMutation.mutate(values);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Course Configurations</h3>
          <p className="text-sm text-muted-foreground">Manage course prices, dates, and availability</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingCourse(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? 'Edit Course' : 'Add Course'}</DialogTitle>
              <DialogDescription>
                Configure complete course details including pricing, content, and learning objectives
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-4">Basic Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="course_slug">Course Slug *</Label>
                    <Input
                      id="course_slug"
                      name="course_slug"
                      defaultValue={editingCourse?.slug}
                      required
                      placeholder="software-testing"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course_title">Course Title *</Label>
                    <Input
                      id="course_title"
                      name="course_title"
                      defaultValue={editingCourse?.name}
                      required
                      placeholder="Software Testing"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Level *</Label>
                    <Input
                      id="level"
                      name="level"
                      defaultValue={editingCourse?.data?.level || 'Beginner Friendly'}
                      placeholder="Beginner Friendly"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimated_time">Estimated Time *</Label>
                    <Input
                      id="estimated_time"
                      name="estimated_time"
                      defaultValue={editingCourse?.data?.estimated_time}
                      placeholder="12 weeks"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-4">Pricing</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (£) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={editingCourse?.data?.price}
                      required
                      placeholder="699"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original_price">Original Price (£)</Label>
                    <Input
                      id="original_price"
                      name="original_price"
                      type="number"
                      step="0.01"
                      defaultValue={editingCourse?.data?.original_price}
                      placeholder="1100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Category ID</Label>
                    <Input
                      id="category_id"
                      name="category_id"
                      type="number"
                      defaultValue={editingCourse?.data?.category?.id || 1}
                      placeholder="1"
                      disabled={editingCourse === null ? false : true}
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="category_name">Category Name</Label>
                  <Input
                    id="category_name"
                    name="category_name"
                    defaultValue={editingCourse?.data?.category?.name || 'Software Skill'}
                    placeholder="Software Skill"
                    disabled={editingCourse === null ? false : true}
                  />
                </div>
              </div>

              {/* Images & URLs */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-4">Media</h4>
                <div className="space-y-2">
                  <Label htmlFor="course_image">Course Image URL</Label>
                  <Input
                    id="course_image"
                    name="course_image"
                    defaultValue={editingCourse?.data?.course_image}
                    placeholder="https://titanscareers.s3.eu-north-1.amazonaws.com/..."
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-4">Descriptions</h4>
                <div className="space-y-2">
                  <Label htmlFor="preview_description">Preview Description</Label>
                  <Textarea
                    id="preview_description"
                    name="preview_description"
                    defaultValue={editingCourse?.data?.preview_description}
                    placeholder="Master essential methodologies to ensure software quality..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="description">Full Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    defaultValue={editingCourse?.data?.description}
                    placeholder="Learn end-to-end QA from manual testing to automation..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Course Includes */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-4">What's Included (7 Items)</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <div key={num} className="space-y-1">
                      <Label htmlFor={`include_${num}`}>Include {num}</Label>
                      <Textarea
                        id={`include_${num}`}
                        name={`include_${num}`}
                        defaultValue={
                          editingCourse?.data?.course_include?.[`include${num > 1 ? num : ''}`]
                        }
                        placeholder={`Course include item ${num}...`}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-4">Target Audience</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="space-y-1">
                      <Label htmlFor={`target_audience_${num}`}>Audience {num}</Label>
                      <Textarea
                        id={`target_audience_${num}`}
                        name={`target_audience_${num}`}
                        defaultValue={editingCourse?.data?.target_audience?.audiences?.[num - 1]}
                        placeholder={`Target audience ${num}...`}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-4">Learning Outcomes</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="space-y-1">
                      <Label htmlFor={`learning_outcome_${num}`}>Outcome {num}</Label>
                      <Textarea
                        id={`learning_outcome_${num}`}
                        name={`learning_outcome_${num}`}
                        defaultValue={editingCourse?.data?.learning_outcomes?.outcomes?.[num - 1]}
                        placeholder={`Learning outcome ${num}...`}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Materials */}
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-4">Required Materials</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="space-y-1">
                      <Label htmlFor={`required_material_${num}`}>Requirement {num}</Label>
                      <Textarea
                        id={`required_material_${num}`}
                        name={`required_material_${num}`}
                        defaultValue={editingCourse?.data?.required_materials?.requirements?.[num - 1]}
                        placeholder={`Required material ${num}...`}
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingCourse ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading courses...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses?.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{course.name}</CardTitle>
                    <CardDescription className="mt-1 text-xs">{course.slug}</CardDescription>
                  </div>
                  <Badge variant={course.is_active ? "default" : "secondary"} className="text-xs">
                    {course.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-semibold">£{course?.data?.price}</span>
                  </div>
                  {course?.data?.original_price && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Original:</span>
                      <span className="text-xs">£{course?.data?.original_price}</span>
                    </div>
                  )}
                  {course?.data?.level && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span>{course?.data?.level}</span>
                    </div>
                  )}
                  {course?.data?.estimated_time && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{course?.data?.estimated_time}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingCourse(course);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this course?')) {
                        deleteMutation.mutate(course.id);
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
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
