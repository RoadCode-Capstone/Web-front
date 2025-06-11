import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";

import { oneDark } from "@codemirror/theme-one-dark";
import { dracula } from "thememirror";
import { cobalt } from "thememirror";

import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";

interface CodeEditorProps {
  initialCode?: string;
  onChange?: (value: string) => void;
  language: "python" | "java" | "cpp";
}

export default function CodeEditor({
  initialCode = "",
  onChange,
  language = "python",
}: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  const getLanguageExtension = (): Extension => {
    switch (language) {
      case "python":
        return python();
      case "java":
        return java();
      case "cpp":
        return cpp();
      default:
        return [];
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;

    // CodeMirror 상태 정의
    const startState = EditorState.create({
      doc: initialCode,
      extensions: [
        keymap.of(defaultKeymap), // 기본 키맵 설정
        basicSetup,
        getLanguageExtension(),
        // javascript(), // JavaScript 하이라이팅
        // oneDark, // 다크 테마
        dracula,
        // cobalt,

        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            const newCode = update.state.doc.toString();
            onChange(newCode); // 실시간 콜백 호출
          }
        }),
        EditorView.theme({
          "&": {
            height: "100%",
            width: "100%",
            fontSize: "16pt",
          },
          ".cm-editor": {
            height: "100%",
          },
          ".cm-scroller": {
            overflow: "auto",
            height: "100%",
          },
          ".cm-content": {
            height: "100%",
          },
        }),
      ],
    });

    // 에디터 뷰 생성
    viewRef.current = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    // 컴포넌트 언마운트 시 cleanup
    return () => {
      viewRef.current?.destroy();
    };
  }, [initialCode, onChange]);

  return <div ref={editorRef} className="flex h-screen w-screen" />;
}
