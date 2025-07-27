
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Palette } from 'lucide-react';
import { ToneMode } from '@/pages/Index';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  onAnalyze?: () => void;
  toneMode: ToneMode;
  onToneModeChange: (value: ToneMode) => void;
}

export const PromptInput = ({ 
  value, 
  onChange, 
  disabled, 
  onAnalyze, 
  toneMode, 
  onToneModeChange 
}: PromptInputProps) => {
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
      <CardContent className="space-y-4">
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
        
        {/* Tone selector overlay */}
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 mb-2">
            <Palette className="h-4 w-4 text-purple-600" />
            <Label className="text-sm font-medium">Rewriting Tone</Label>
          </div>
          <Select
            value={toneMode}
            onValueChange={(val) => onToneModeChange(val as ToneMode)}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Creative">
                <div className="flex flex-col">
                  <span className="font-medium">Creative</span>
                  <span className="text-xs text-gray-500">Imaginative and engaging</span>
                </div>
              </SelectItem>
              <SelectItem value="Academic">
                <div className="flex flex-col">
                  <span className="font-medium">Academic</span>
                  <span className="text-xs text-gray-500">Formal and research-focused</span>
                </div>
              </SelectItem>
              <SelectItem value="Technical">
                <div className="flex flex-col">
                  <span className="font-medium">Technical</span>
                  <span className="text-xs text-gray-500">Precise and detailed</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
