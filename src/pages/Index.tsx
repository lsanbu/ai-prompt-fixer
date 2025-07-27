import { useState } from 'react';
import { PromptInput } from '@/components/PromptInput';
import { ToneSelector } from '@/components/ToneSelector';
import { ActionButtons } from '@/components/ActionButtons';
import { OutputTabs } from '@/components/OutputTabs';
import { Header } from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

export type ToneMode = 'Creative' | 'Academic' | 'Technical';

export interface ScoringResult {
  score: number;
  suggestions: string[];
}

export interface OutputData {
  scoring?: ScoringResult;
  rewrittenPrompt?: string;
  aiOutput?: string;
}

// Helper function to parse scoring feedback from backend
const parseScoreFeedback = (feedback: string): ScoringResult => {
  // Extract score (looking for patterns like "8/10", "Score: 7", etc.)
  const scoreMatch = feedback.match(/(\d+)(?:\/10|\/10|(?:\s*out\s*of\s*10))/i) || 
                    feedback.match(/(?:score|rating):\s*(\d+)/i) ||
                    feedback.match(/(\d+)\s*(?:out\s*of\s*10)/i);
  
  const score = scoreMatch ? parseInt(scoreMatch[1]) : 5; // Default to 5 if no score found
  
  // Split feedback into lines and extract suggestions
  const lines = feedback.split('\n').filter(line => line.trim());
  const suggestions = lines.slice(1, 4).map(line => line.replace(/^-\s*/, '').trim()).filter(Boolean);
  
  // If no proper suggestions found, create generic ones
  if (suggestions.length === 0) {
    suggestions.push("Review the feedback above for specific improvement recommendations");
  }
  
  return { score, suggestions };
};

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [toneMode, setToneMode] = useState<ToneMode>('Creative');
  const [outputData, setOutputData] = useState<OutputData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('scoring');
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/prompt/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const scoringResult = parseScoreFeedback(data.score_feedback);
      setOutputData(prev => ({ ...prev, scoring: scoringResult }));
      setActiveTab('scoring');
      
      toast({
        title: "Success",
        description: "Prompt analyzed successfully",
      });
    } catch (error) {
      console.error('Error analyzing prompt:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to analyze prompt",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRewrite = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to rewrite",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const requestBody = { prompt, mode: toneMode };
      console.log('=== REWRITE REQUEST DEBUG ===');
      console.log('Current toneMode state:', toneMode);
      console.log('Request body:', requestBody);
      console.log('JSON stringified:', JSON.stringify(requestBody));
      console.log('============================');
      
      const response = await fetch('http://localhost:5000/api/prompt/rewrite', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received rewrite response:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      setOutputData(prev => ({ ...prev, rewrittenPrompt: data.rewrite }));
      setActiveTab('rewritten');
      
      toast({
        title: "Success",
        description: "Prompt rewritten successfully",
      });
    } catch (error) {
      console.error('Error rewriting prompt:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to rewrite prompt",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRun = async () => {
    const promptToRun = outputData.rewrittenPrompt || prompt;
    
    if (!promptToRun.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt or rewrite one first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/prompt/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToRun })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setOutputData(prev => ({ ...prev, aiOutput: data.output }));
      setActiveTab('output');
      
      toast({
        title: "Success",
        description: "Prompt executed successfully",
      });
    } catch (error) {
      console.error('Error running prompt:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to run prompt",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                disabled={isLoading}
                onAnalyze={handleAnalyze}
              />
              
              <ToneSelector
                value={toneMode}
                onChange={setToneMode}
                disabled={isLoading}
              />
              
              <ActionButtons
                onAnalyze={handleAnalyze}
                onRewrite={handleRewrite}
                onRun={handleRun}
                isLoading={isLoading}
              />
            </div>
            
            {/* Right Column - Output */}
            <div>
              <OutputTabs
                data={outputData}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
