import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Code, PlayCircle, CheckCircle2, XCircle, Code2 } from 'lucide-react';

interface QuestEditorProps {
  code: string;
  onCodeChange: (value: string) => void;
  onVerify: () => void;
  showHint: boolean;
  isSuccess: boolean;
  hint: string;
  successMessage: string;
  onHintClose?: () => void;
  showSolution?: boolean;
  solution?: string;
}

export function QuestEditor({
  code,
  onCodeChange,
  onVerify,
  showHint,
  isSuccess,
  hint,
  successMessage,
  onHintClose,
  showSolution,
  solution
}: QuestEditorProps) {
  return (
    <div className="h-full border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <h2 className="font-semibold">Éditeur de Code</h2>
          </div>
          <div className="flex items-center gap-2">
            {showSolution && solution && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => onCodeChange(solution)}
              >
                <Code2 className="h-4 w-4" />
                Solution
              </Button>
            )}
            <Button
              onClick={onVerify}
              size="sm"
              className="gap-2"
              disabled={isSuccess}
            >
              <PlayCircle className="h-4 w-4" />
              Vérifier mon code
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 h-[calc(100%-8rem)]">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={code}
          onChange={(value) => onCodeChange(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            // Configuration pour TypeScript/React
            "javascript.validate.enable": false, // Désactive la validation JS par défaut
            "typescript.validate.enable": false, // Désactive la validation TS par défaut
            "editor.formatOnType": true,
            "editor.formatOnPaste": true,
            "editor.tabSize": 2
          }}
          beforeMount={(monaco) => {
            // Configuration de l'environnement TypeScript
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
              jsx: monaco.languages.typescript.JsxEmit.React,
              jsxFactory: 'React.createElement',
              reactNamespace: 'React',
              allowNonTsExtensions: true,
              allowJs: true,
              target: monaco.languages.typescript.ScriptTarget.Latest
            });
          }}
        />
      </div>

      <Dialog open={showHint} onOpenChange={() => onHintClose?.()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <XCircle className="h-5 w-5" />
              Pas tout à fait !
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {hint}
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onHintClose?.()}
            >
              Réessayer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {isSuccess && (
        <Alert className="m-4 bg-primary/10 text-primary border-primary">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="ml-2">{successMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}