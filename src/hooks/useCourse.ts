import { api, authApi } from "@/lib/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useToast } from "./use-toast";
import { Preferences } from "@/lib/types";




  export const useFetchCourse = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get(
        `/get-courses`
      );

      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};


  export const useFetchBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await api.get(
        `/get-blogs`
      );

      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useUploadAsset = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await authApi.post('/upload-asset', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data; 
    },
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await authApi.post('/create-blog-post', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await authApi.put('/update-blog', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await authApi.delete(`/delete-blog?id=${data.id}?slug=${data.slug}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
}

  export const useFetchBlogBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["blogs", slug],
    queryFn: async () => {
      const response = await api.get(
        `/get-blog?slug=${slug}`
      );

      return response?.data?.blog;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!slug,
  });
};

  export const useFetchAuthUser = () => {
    const token = sessionStorage.getItem('userToken')
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const response = await authApi.get(
        `/me`
      );

      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!token,
  });
};

  export const useFetchSingleCourse = (id:string) => {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: async () => {
      const response = await api.get(
        `/get-course-by-slug?slug=${id}`
      );

      return response.data?.course;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

//   export const useFetchSingleCourse = (id:string) => {
//   return useQuery({
//     queryKey: ["courses", id],
//     queryFn: async () => {
//       const response = await api.get(
//         `/get-course?id=${id}`
//       );

//       return response.data?.course;
//     },
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     refetchOnWindowFocus: false,
//     enabled: !!id,
//   });
// };


 export const useFetchEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await api.get(
        `/get-events`
      );

      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};


export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences: Partial<Preferences>) => {
      const res = await authApi.patch("/user/preferences", preferences);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Preferences updated");
    },
    onError: () => {
      toast.error("Failed to update preferences");
    },
  });
};