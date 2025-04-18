import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, X, Send, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useAssistantStore } from '@/lib/assistant';
import * as marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

// Configure marked with highlight.js and custom renderer
const renderer = new marked.Renderer();
renderer.code = (code, language) => {
  const highlightedCode = language && hljs.getLanguage(language)
    ? hljs.highlight(code, { language }).value
    : hljs.highlightAuto(code).value;

  return `
    <div class="relative group">
      <button class="absolute right-2 top-2 opacity-30 group-hover:opacity-100 transition-opacity px-2.5 py-1.5 rounded bg-primary/20 hover:bg-primary/30 text-xs font-medium text-primary-foreground flex items-center gap-1.5" data-copy="${encodeURIComponent(code)}">
        <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        copier
      </button>
      <pre class="!mt-0"><code class="hljs ${language || ''}">${highlightedCode}</code></pre>
    </div>
  `;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
});

export function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isTyping, sendMessage, clearMessages } = useAssistantStore();
  const widgetRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [copiedTimeout, setCopiedTimeout] = useState<number | null>(null);

  // Auto-scroll when messages change or when typing
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleCopyClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest('[data-copy]') as HTMLButtonElement;
      if (button) {
        event.preventDefault();
        const code = decodeURIComponent(button.getAttribute('data-copy') || '');
        navigator.clipboard.writeText(code);
        
        // Show feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = `
          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          copié !
        `;
        button.classList.add('bg-primary/40');
        
        if (copiedTimeout) {
          clearTimeout(copiedTimeout);
        }
        
        const timeout = window.setTimeout(() => {
          button.innerHTML = originalHTML;
          button.classList.remove('bg-primary/40');
        }, 2000);
        
        setCopiedTimeout(timeout);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleCopyClick);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleCopyClick);
      if (copiedTimeout) {
        clearTimeout(copiedTimeout);
      }
    };
  }, [copiedTimeout]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const message = input.trim();
    setInput('');
    await sendMessage(message);
  };

  const handleReset = () => {
    clearMessages();
    setInput('');
  };

  const renderMessage = (content: string) => {
    return (
      <div
        className="prose dark:prose-invert max-w-none prose-pre:bg-card/80 prose-pre:border prose-pre:border-border prose-sm prose-pre:p-4 prose-pre:rounded-md"
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      />
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={widgetRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-[800px] shadow-lg border-2 border-primary/20 bg-background/70 backdrop-blur-md">
              <div className="p-3 border-b flex items-center justify-between bg-card/40 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">Assistant React</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleReset}
                    className="text-muted-foreground hover:text-primary h-8 w-8"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea ref={scrollAreaRef} className="h-[400px] p-4 bg-background/40 backdrop-blur-sm">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.type === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg px-4 py-2 max-w-[90%] text-sm",
                          message.type === 'user'
                            ? "bg-primary/90 text-primary-foreground"
                            : "bg-muted/60 backdrop-blur-sm"
                        )}
                      >
                        {message.type === 'assistant' 
                          ? renderMessage(message.content)
                          : <pre className="whitespace-pre-wrap font-mono bg-primary/10 p-2 rounded-sm">{message.content}</pre>
                        }
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted/60 backdrop-blur-sm rounded-lg px-4 py-2 text-sm">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            transition: {
                              repeat: Infinity,
                              duration: 1,
                            },
                          }}
                        >
                          ...
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-3 border-t bg-card/40 backdrop-blur-sm">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Pose ta question..."
                    className="min-h-[36px] max-h-[144px] bg-background/60 backdrop-blur-sm text-sm resize-none"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    size="icon"
                    className="h-9 w-9"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        variant="outline"
        className="fixed bottom-4 right-4 rounded-full h-10 w-10 bg-background/70 backdrop-blur-sm border-primary/20 shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Code2 className="h-4 w-4" />
      </Button>
    </div>
  );
}