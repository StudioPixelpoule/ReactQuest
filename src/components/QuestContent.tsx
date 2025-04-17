import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from 'lucide-react';
import * as marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configuration de marked pour utiliser highlight.js
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true
});

interface QuestContentProps {
  title: string;
  content: string;
}

export function QuestContent({ title, content }: QuestContentProps) {
  // Conversion du Markdown en HTML
  const htmlContent = marked.parse(content);

  return (
    <div className="h-full border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <h2 className="font-semibold">{title}</h2>
        </div>
      </div>
      <ScrollArea className="h-[calc(100%-4rem)]">
        <div className="p-6">
          <div 
            className="prose dark:prose-invert max-w-none prose-pre:bg-card prose-pre:border prose-pre:border-border"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </ScrollArea>
    </div>
  );
}