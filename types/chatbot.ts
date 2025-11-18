export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface SuggestedPrompt {
  id: string;
  text: string;
  category: string;
}
