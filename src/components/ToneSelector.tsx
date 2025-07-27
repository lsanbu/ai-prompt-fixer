
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import { ToneMode } from '@/pages/Index';

interface ToneSelectorProps {
  value: ToneMode;
  onChange: (value: ToneMode) => void;
  disabled?: boolean;
}

export const ToneSelector = ({ value, onChange, disabled }: ToneSelectorProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="h-5 w-5 text-purple-600" />
          <span>Select Rewriting Tone</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="toneMode" className="text-sm font-medium">
            Choose the style for your prompt:
          </Label>
          <Select
            value={value}
            onValueChange={(val) => onChange(val as ToneMode)}
            disabled={disabled}
          >
            <SelectTrigger id="toneMode" className="w-full">
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
