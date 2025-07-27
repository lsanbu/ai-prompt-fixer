
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onAnalyze?: () => void;
}

export const PromptInput = ({ value, onChange, disabled, onAnalyze }: PromptInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && onAnalyze) {
      e.preventDefault();
      onAnalyze();
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-purple-600" />
          <span>Enter Your Prompt</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="promptInput" className="text-sm font-medium">
            Describe what you want the AI to do:
          </Label>
          <Textarea
            id="promptInput"
            placeholder="e.g., Write a blog intro about AI in marketing... (Press Enter to Analyze)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="min-h-[120px] resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Press Enter to Analyze & Score (Shift+Enter for new line)</span>
            <span>{value.length}/1000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
