import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '@/types/chatbot';
import { MarkdownRenderer } from './MarkdownRenderer';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.sender === 'user';

  return (
    <div className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <Avatar className="h-8 w-8 border-2 border-border">
        <AvatarFallback className={cn(isUser ? 'bg-secondary-background' : 'bg-main')}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn('flex-1 space-y-2 max-w-[80%]', isUser && 'flex flex-col items-end')}>
        <div
          className={cn(
            'rounded-base p-3 border-2 border-border',
            isUser ? 'bg-main' : 'bg-secondary-background'
          )}
        >
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
        </div>

        <p className="text-xs">{format(message.timestamp, 'p')}</p>
      </div>
    </div>
  );
}
