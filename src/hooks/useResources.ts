import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as resourceApi from "@/lib/api/resources";
import { Resource, ResourceFiltersState, CreateResourceInput } from "@/types/resource";

export const resourceKeys = {
  all: ["resources"] as const,
  list: (filters: ResourceFiltersState) => ["resources", "list", filters] as const,
  mine: ["resources", "mine"] as const,
  detail: (id: string) => ["resources", "detail", id] as const,
  related: (id: string) => ["resources", "related", id] as const,
};

export function useResources(filters: ResourceFiltersState) {
  return useQuery({
    queryKey: resourceKeys.list(filters),
    queryFn: () => resourceApi.fetchResources(filters),
    placeholderData: (previousData) => previousData,
  });
}

export function useMyResources() {
  return useQuery({
    queryKey: resourceKeys.mine,
    queryFn: resourceApi.fetchMyResources,
  });
}

export function useResource(id: string) {
  return useQuery({
    queryKey: resourceKeys.detail(id),
    queryFn: () => resourceApi.fetchResourceById(id),
    enabled: !!id,
  });
}

export function useRelatedResources(id: string) {
  return useQuery({
    queryKey: resourceKeys.related(id),
    queryFn: () => resourceApi.fetchRelatedResources(id),
    enabled: !!id,
  });
}

export function useCreateResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateResourceInput) => resourceApi.createResource(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.all });
      toast.success("Resource added");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Could not add resource");
    },
  });
}

export function useDeleteResource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resourceApi.deleteResource(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: resourceKeys.mine });
      const previous = queryClient.getQueryData<Resource[]>(resourceKeys.mine);
      queryClient.setQueryData<Resource[]>(
        resourceKeys.mine,
        (old) => old?.filter((r) => r._id !== id) ?? []
      );
      return { previous };
    },
    onError: (error: Error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(resourceKeys.mine, context.previous);
      }
      toast.error(error.message || "Could not delete resource");
    },
    onSuccess: () => {
      toast.success("Resource deleted");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: resourceKeys.all });
    },
  });
}