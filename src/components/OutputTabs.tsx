
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileText, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
import { OutputData } from '@/pages/Index';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface OutputTabsProps {
  data: OutputData;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const OutputTabs = ({ data, activeTab, onTabChange }: OutputTabsProps) => {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          <span>Results</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scoring" className="flex items-center space-x-2 data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
              <CheckCircle className="h-4 w-4" />
              <span>Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="rewritten" className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <FileText className="h-4 w-4" />
              <span>Rewrite</span>
            </TabsTrigger>
            <TabsTrigger value="output" className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Sparkles className="h-4 w-4" />
              <span>AI Output</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scoring" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Prompt Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {data.scoring ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium">Score:</span>
                      <Badge className={`${getScoreColor(data.scoring.score)} text-white`}>
                        {data.scoring.score}/10
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Suggestions for improvement:</h4>
                      <ul className="space-y-2">
                        {data.scoring.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Click "Analyze + Score" to see your prompt analysis</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rewritten" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Rewritten Prompt</CardTitle>
                {data.rewrittenPrompt && (
                  <Button
                    onClick={() => handleCopy(data.rewrittenPrompt!, 'Rewritten Prompt')}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    {copiedStates['Rewritten Prompt'] ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>{copiedStates['Rewritten Prompt'] ? 'Copied!' : 'Copy'}</span>
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {data.rewrittenPrompt ? (
                  <ScrollArea className="h-64 w-full">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">{data.rewrittenPrompt}</pre>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Click "Rewrite Prompt" to see the improved version</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="output" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">AI Response</CardTitle>
                {data.aiOutput && (
                  <Button
                    onClick={() => handleCopy(data.aiOutput!, 'AI Response')}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    {copiedStates['AI Response'] ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span>{copiedStates['AI Response'] ? 'Copied!' : 'Copy'}</span>
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {data.aiOutput ? (
                  <ScrollArea className="h-64 w-full">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">{data.aiOutput}</pre>
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Click "Run Prompt" to see the AI-generated response</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
