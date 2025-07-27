
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Edit3, Play, Loader2 } from 'lucide-react';

interface ActionButtonsProps {
  onAnalyze: () => void;
  onRewrite: () => void;
  onRun: () => void;
  isLoading: boolean;
}

export const ActionButtons = ({ onAnalyze, onRewrite, onRun, isLoading }: ActionButtonsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={onAnalyze}
            disabled={isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 h-auto flex-col space-y-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>Analyze + Score</span>
          </Button>
          
          <Button
            onClick={onRewrite}
            disabled={isLoading}
            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 h-auto flex-col space-y-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Edit3 className="h-5 w-5" />
            )}
            <span>Rewrite Prompt</span>
          </Button>
          
          <Button
            onClick={onRun}
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 h-auto flex-col space-y-2"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Play className="h-5 w-5" />
            )}
            <span>Run Prompt</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
