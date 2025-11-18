import { Card } from '@/components/ui/card';
import { FileText, BarChart3, ClipboardCheck, BookOpen } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  { id: '1', text: 'What assignments are due this week?', category: 'assignments', icon: FileText },
  { id: '2', text: 'Show my current grades', category: 'grades', icon: BarChart3 },
  { id: '3', text: 'When is my next quiz?', category: 'quizzes', icon: ClipboardCheck },
  { id: '4', text: 'Help me study for my exam', category: 'study', icon: BookOpen },
];

export function SuggestedPrompts({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-2xl">
      {SUGGESTED_PROMPTS.map(prompt => {
        const Icon = prompt.icon;
        return (
          <Card
            key={prompt.id}
            className="p-4 cursor-pointer hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-shadow transition-all"
            onClick={() => onSelect(prompt.text)}
          >
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-base">{prompt.text}</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

