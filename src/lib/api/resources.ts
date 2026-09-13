import { api } from "@/lib/axios";
import { auth } from "@/lib/firebase";
import {
  Resource,
  ResourceListResponse,
  ResourceFiltersState,
  CreateResourceInput,
} from "@/types/resource";

export const fetchResources = async (
  filters: ResourceFiltersState
): Promise<ResourceListResponse> => {
  const { data } = await api.get<ResourceListResponse>("/resources", {
    params: {
      search: filters.search || undefined,
      subject: filters.subject || undefined,
      difficulty: filters.difficulty || undefined,
      sort: filters.sort,
      page: filters.page,
      limit: 12,
    },
  });
  return data;
};

export const fetchMyResources = async (): Promise<Resource[]> => {
  const { data } = await api.get<{ success: true; items: Resource[] }>("/resources/mine");
  return data.items;
};

export const fetchResourceById = async (id: string): Promise<Resource> => {
  const { data } = await api.get<{ success: true; resource: Resource }>(`/resources/${id}`);
  return data.resource;
};

export const fetchRelatedResources = async (id: string): Promise<Resource[]> => {
  const { data } = await api.get<{ success: true; items: Resource[] }>(`/resources/${id}/related`);
  return data.items;
};

export const createResource = async (
  input: CreateResourceInput & { ownerId?: string }
): Promise<Resource> => {
  //  . Input-    ownerId   Firebase currentUser   UID  
  let ownerId = input.ownerId || auth.currentUser?.uid;

  //  .   auth.currentUser        , Token Result   UID    
  if (!ownerId && auth.currentUser) {
    try {
      const tokenResult = await auth.currentUser.getIdTokenResult();
      ownerId = tokenResult.claims.sub as string;
    } catch (e) {
      console.error("Failed to extract UID from token", e);
    }
  }

  const payload = {
    ...input,
    
  }

  const { data } = await api.post<{ success: true; resource: Resource }>("/resources", payload);
  return data.resource;
};

export const deleteResource = async (id: string): Promise<void> => {
  await api.delete(`/resources/${id}`);
};