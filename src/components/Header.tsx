
import { Sparkles, Wand2 } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center space-x-2">
            <Wand2 className="h-8 w-8 text-purple-600" />
            <Sparkles className="h-6 w-6 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            PromptFixer AI
          </h1>
        </div>
        <p className="text-center text-gray-600 mt-2">
          Analyze, improve, and execute your AI prompts with precision
        </p>
      </div>
    </header>
  );
};
