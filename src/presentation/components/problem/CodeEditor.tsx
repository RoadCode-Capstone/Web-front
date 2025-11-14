import { useEffect, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState, Extension, StateEffect } from "@codemirror/state";
import { defaultKeymap } from "@codemirror/commands";
import { oneDark } from "@codemirror/theme-one-dark";

import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { cn } from "@/utils/tailwind";

interface CodeEditorProps {
  initialCode?: string;
  onChange: (value: string) => void;
  language: "python" | "java" | "cpp" | "c";
  style?: string;
  readOnly?: boolean;
}

export default function CodeEditor({
  initialCode = "",
  onChange,
  language,
  style,
  readOnly = false,
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
      case "c":
        return cpp();
      default:
        return [];
    }
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const extensions = [
      basicSetup,
      keymap.of(defaultKeymap),
      getLanguageExtension(),
      oneDark,
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          onChange(update.state.doc.toString());
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
    ];

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true));
    }

    if (!viewRef.current) {
      // 최초 생성
      const state = EditorState.create({
        doc: initialCode,
        extensions,
      });
      const view = new EditorView({
        state,
        parent: editorRef.current,
      });
      viewRef.current = view;
    } else {
      // 업데이트
      const view = viewRef.current;
      // 언어 변경 시 reconfigure
      view.dispatch({
        effects: StateEffect.reconfigure.of(extensions),
      });

      // initialCode가 변경되었을 때만 문서 내용 업데이트
      const currentCode = view.state.doc.toString();
      if (initialCode !== currentCode) {
        view.dispatch({
          changes: { from: 0, to: currentCode.length, insert: initialCode },
        });
      }
    }

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [initialCode, language, readOnly]);

  return <div ref={editorRef} className={cn(`${style}`)} />;
}
