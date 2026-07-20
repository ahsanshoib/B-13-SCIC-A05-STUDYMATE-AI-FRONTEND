import { api } from "@/lib/axios";
import { Conversation } from "@/types/ai";

export const fetchConversations = async (): Promise<Conversation[]> => {
  const { data } = await api.get<{ success: true; conversations: Conversation[] }>(
    "/chat/conversations"
  );
  return data.conversations;
};

export const fetchConversation = async (id: string): Promise<Conversation> => {
  const { data } = await api.get<{ success: true; conversation: Conversation }>(
    `/chat/conversations/${id}`
  );
  return data.conversation;
};

export const deleteConversation = async (id: string): Promise<void> => {
  await api.delete(`/chat/conversations/${id}`);
};