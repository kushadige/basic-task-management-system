import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import { Button } from "@/components/ui/button";

import { type Monaco } from "@monaco-editor/react";
import { type editor } from "monaco-editor";

interface JSONInputProps<K> {
  data?: K;
  onSave?: (data?: string) => void;
  onCancel?: () => void;
}

export const JSONInput = <T extends unknown>({
  data,
  onSave,
  onCancel,
}: JSONInputProps<T>) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Parse the error message
  useEffect(() => {
    if (error) {
      try {
        const parsedError = JSON.parse(error);
        setErrorMessages(parsedError);
      } catch (err) {
        setErrorMessages([error]);
      }
    } else {
      setErrorMessages([]);
    }
  }, [error]);

  // Assign editor instance to the ref on mount
  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    _monaco: Monaco
  ) => {
    editorRef.current = editor;
  };

  // Save the JSON input
  const onSaveJsonInput = () => {
    const jsonInput = editorRef.current?.getValue();
    try {
      onSave && onSave(jsonInput);
      setError(null);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };

  return (
    <div>
      <Editor
        onMount={handleEditorDidMount}
        height="40vh"
        defaultLanguage="json"
        value={JSON.stringify(data, null, 2)}
        options={{
          minimap: {
            enabled: false,
          },
          lineNumbersMinChars: 0,
          glyphMargin: false,
          bracketPairColorization: {
            enabled: true,
          },
          folding: false,
          scrollBeyondLastLine: false,
          overviewRulerLanes: 0,
        }}
      />
      <div className="flex items-start py-5 rounded border border-gray-200">
        <ul className="basis-1/2 shrink text-wrap list-disc pl-8">
          {errorMessages.map((message, index) => (
            <li key={index} className="text-red-500 text-sm w-full break-words">
              {message}
            </li>
          ))}
        </ul>

        <div className="grow flex justify-end space-x-2.5 px-5">
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={onSaveJsonInput}
          >
            Save
          </Button>
          <Button onClick={onCancel} variant="destructive">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
