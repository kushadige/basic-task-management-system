import { useCallback, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

import { Modal } from "./modal";
import { Button } from "./button";

import { type Monaco } from "@monaco-editor/react";
import { type editor } from "monaco-editor";

interface JSONInputProps<K> {
  onSave?: (data?: string) => void;
  initialData?: K;
}

export const JSONInput = <T extends unknown>({
  initialData,
  onSave,
}: JSONInputProps<T>) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [open, setOpen] = useState(false);
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
      onCloseJsonInput();
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };

  const onCloseJsonInput = useCallback(() => {
    setOpen(false);
    setError(null);
  }, []);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 ease-in-out shadow-md"
      >
        JSON Input
      </button>

      <Modal open={open} onClose={onCloseJsonInput}>
        <h2 className="mb-4 text-2xl select-none font-bold text-center text-gray-800 uppercase tracking-wider leading-6">
          JSON Input
        </h2>
        <Editor
          onMount={handleEditorDidMount}
          height="40vh"
          defaultLanguage="json"
          value={JSON.stringify(initialData, null, 2)}
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

        <div className="flex items-start py-5 rounded mt-5 border border-gray-200">
          <ul className="basis-1/2 shrink text-wrap list-disc pl-5">
            {errorMessages.map((message, index) => (
              <li
                key={index}
                className="text-red-500 text-sm w-full break-words"
              >
                {message}
              </li>
            ))}
          </ul>

          <div className="grow flex justify-end space-x-2.5 px-5">
            <Button color="primary" onClick={onSaveJsonInput}>
              Save
            </Button>
            <Button color="danger" onClick={onCloseJsonInput}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
