'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType } from '@/types/chatbot';

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      }));

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput, history }),
      });

      const data = await response.json();

      const botMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b-2 border-border">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <CardTitle>Synapse Agent</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <Bot className="h-16 w-16" />
            <div>
              <h3 className="font-heading text-lg">How can I help you today?</h3>
              <p className="text-sm">Ask me anything about your courses, assignments, or grades</p>
            </div>
            <SuggestedPrompts onSelect={setInput} />
          </div>
        )}

        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span className="text-sm">Synapse is typing...</span>
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="border-t-2 border-border p-4">
        <ChatInput value={input} onChange={setInput} onSend={handleSend} disabled={isTyping} />
      </CardFooter>
    </Card>
  );
}
