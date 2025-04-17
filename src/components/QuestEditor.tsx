import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, PlayCircle, CheckCircle2, XCircle } from 'lucide-react';

interface QuestEditorProps {
  code: string;
  onCodeChange: (value: string) => void;
  onVerify: () => void;
  showHint: boolean;
  isSuccess: boolean;
  hint: string;
  successMessage: string;
}

export function QuestEditor({
  code,
  onCodeChange,
  onVerify,
  showHint,
  isSuccess,
  hint,
  successMessage
}: QuestEditorProps) {
  return (
    <div className="h-full border rounded-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <h2 className="font-semibold">Éditeur de Code</h2>
          </div>
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
      
      <div className="h-[calc(100%-10rem)]">
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
          }}
        />
      </div>

      <div className="p-4">
        {showHint && !isSuccess && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">{hint}</AlertDescription>
          </Alert>
        )}

        {isSuccess && (
          <Alert className="bg-primary/10 text-primary border-primary">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription className="ml-2">{successMessage}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}