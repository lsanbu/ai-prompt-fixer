
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
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/prompt/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode: toneMode })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze prompt');
      }

      const data = await response.json();
      setOutputData(prev => ({ ...prev, scoring: data }));
      setActiveTab('scoring');
      
      toast({
        title: "Success",
        description: "Prompt analyzed successfully",
      });
    } catch (error) {
      // Mock scoring for demo
      const mockScoring = {
        score: Math.floor(Math.random() * 4) + 6,
        suggestions: [
          "Add more specific context to improve clarity",
          "Consider including examples for better results",
          "The tone could be more engaging for the target audience"
        ]
      };
      setOutputData(prev => ({ ...prev, scoring: mockScoring }));
      setActiveTab('scoring');
      
      toast({
        title: "Demo Mode",
        description: "Showing mock analysis results",
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
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/prompt/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode: toneMode })
      });

      if (!response.ok) {
        throw new Error('Failed to rewrite prompt');
      }

      const data = await response.json();
      setOutputData(prev => ({ ...prev, rewrittenPrompt: data.rewrite }));
      setActiveTab('rewritten');
      
      toast({
        title: "Success",
        description: "Prompt rewritten successfully",
      });
    } catch (error) {
      // Mock rewrite for demo
      const mockRewrite = `Enhanced ${toneMode.toLowerCase()} version: ${prompt}\n\nPlease provide a comprehensive response that includes specific examples, detailed explanations, and actionable insights. Structure your answer with clear headings and bullet points where appropriate.`;
      setOutputData(prev => ({ ...prev, rewrittenPrompt: mockRewrite }));
      setActiveTab('rewritten');
      
      toast({
        title: "Demo Mode",
        description: "Showing mock rewrite results",
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
      // Simulate API call - replace with actual endpoint
      const response = await fetch('/api/prompt/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToRun, mode: toneMode })
      });

      if (!response.ok) {
        throw new Error('Failed to run prompt');
      }

      const data = await response.json();
      setOutputData(prev => ({ ...prev, aiOutput: data.output }));
      setActiveTab('output');
      
      toast({
        title: "Success",
        description: "Prompt executed successfully",
      });
    } catch (error) {
      // Mock output for demo
      const mockOutput = `Here's a ${toneMode.toLowerCase()} response to your prompt:\n\n${promptToRun}\n\nThis is a demonstration of how the AI would respond to your optimized prompt. The actual implementation would connect to OpenAI's API to generate real responses based on your requirements.`;
      setOutputData(prev => ({ ...prev, aiOutput: mockOutput }));
      setActiveTab('output');
      
      toast({
        title: "Demo Mode",
        description: "Showing mock AI output",
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
