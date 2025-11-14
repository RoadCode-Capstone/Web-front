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
}

export default function CodeEditor({
  initialCode = "",
  onChange,
  language,
  style,
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

  // 에디터 최초 생성
  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc:
        language === "java"
          ? 'public class Solution {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}'
          : initialCode,
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        getLanguageExtension(),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            const newCode = update.state.doc.toString();
            onChange(newCode);
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

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  // initialCode 변경 시 코드 반영
  useEffect(() => {
    if (!viewRef.current) return;
    const current = viewRef.current.state.doc.toString();
    if (initialCode !== current) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: current.length,
          insert: initialCode,
        },
      });
      viewRef.current.dispatch(transaction);
    }
  }, [initialCode]);

  // language 변경 시 문법 하이라이팅 교체
  useEffect(() => {
    if (!viewRef.current) return;
    const languageExtension = getLanguageExtension();
    viewRef.current.dispatch({
      effects: StateEffect.reconfigure.of([
        basicSetup,
        keymap.of(defaultKeymap),
        languageExtension,
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged && onChange) {
            const newCode = update.state.doc.toString();
            onChange(newCode);
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
      ]),
    });
  }, [language]);

  return <div ref={editorRef} className={cn(`${style}`)} />;
}
