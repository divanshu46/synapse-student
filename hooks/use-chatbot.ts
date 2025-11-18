import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { chatbotApi } from '@/lib/api/chatbot';
import { ChatMessage } from '@/types';

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data: history } = useQuery({
    queryKey: ['chat-history'],
    queryFn: async () => {
      const { data } = await chatbotApi.getHistory();
      return data;
    },
  });

  const sendMessage = useMutation({
    mutationFn: (message: string) => chatbotApi.sendMessage(message),
    onSuccess: (response, message) => {
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      };
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
    },
  });

  return { messages, sendMessage: sendMessage.mutate, isLoading: sendMessage.isPending, history };
};
