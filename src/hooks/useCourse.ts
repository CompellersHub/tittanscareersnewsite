import { api } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";




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

  export const useFetchSingleCourse = (id:string) => {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: async () => {
      const response = await api.get(
        `/get-course?id=${id}`
      );

      return response.data?.course;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};


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