import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useEditor, EditorContent, EditorContext, useEditorState } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
import { shouldShowHeadingMenu } from "../../configs/HeadingConfig"; 
import { Bold, ChevronDown, Highlighter, Italic, List, TextQuote, Underline } from "lucide-react";
import Collaboration from "@tiptap/extension-collaboration"
import { Color, TextStyle } from "@tiptap/extension-text-style"
import { HocuspocusProvider } from "@hocuspocus/provider"
import { CollaborationCaret } from '@tiptap/extension-collaboration-caret'
import * as Y from "yjs"
import { Editor } from "@tiptap/core";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDataContext } from "@/hooks/useDataContext";

interface NotesEditorProps {
  id?: string;
}

export default function NotesEditor({ id }: NotesEditorProps) {
  const axiosPrivate = useAxiosPrivate();
  const { currentNoteId, setCurrentNoteId } = useDataContext();
  
  const editorRef = useRef<Editor | null>(null);
  const providerRef = useRef<HocuspocusProvider | null>(null);
  const ydocRef = useRef<Y.Doc | null>(null);
  const currentIdRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);

  // Memoized extensions configuration
  const extensionsConfig = useRef([
    StarterKit.configure({
      heading: { levels: [1, 2, 3, 4] },
      history: false,
    }),
    Highlight.configure({ multicolor: true }),
    Image,
    Typography,
    TextStyle,
    Color,
  ]).current;

  // Load note data
  const loadNote = useCallback(async (noteId: string) => {
    try {
      setCurrentNoteId(noteId);
      const file = await axiosPrivate.get(`/notes/${noteId}`);
      console.log(file.data);
    } catch (err) {
      console.error('Failed to load note:', err);
    }
  }, [axiosPrivate, setCurrentNoteId]);

  // Switch document by recreating editor with new provider
  const switchDocument = useCallback((newId: string) => {
    // Destroy old instances
    if (editorRef.current) {
      editorRef.current.destroy();
      editorRef.current = null;
    }
    if (providerRef.current) {
      providerRef.current.destroy();
      providerRef.current = null;
    }
    if (ydocRef.current) {
      ydocRef.current.destroy();
      ydocRef.current = null;
    }

    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    const provider = new HocuspocusProvider({
      url: "ws://localhost:3000/collab",
      name: newId,
      document: ydoc,
    });
    providerRef.current = provider;

    const editor = new Editor({
      extensions: [
        ...extensionsConfig,
        Collaboration.configure({ document: ydoc }),
      ],
      autofocus: "end",
    });

    editorRef.current = editor;
    currentIdRef.current = newId;
    
    // Update state to trigger re-render
    setEditor(editor);
  }, [extensionsConfig]);

  // Initialize editor once
  useEffect(() => {
    if (!id || isInitializedRef.current) return;

    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    const provider = new HocuspocusProvider({
      url: "ws://localhost:3000/collab",
      name: id,
      document: ydoc,
    });
    providerRef.current = provider;

    const editor = new Editor({
      extensions: [
        ...extensionsConfig,
        Collaboration.configure({ document: ydoc }),
      ],
      autofocus: "end",
    });

    editorRef.current = editor;
    currentIdRef.current = id;
    isInitializedRef.current = true;

    // Load initial note
    loadNote(id);

    // Cleanup on unmount only
    return () => {
      editor.destroy();
      provider.destroy();
      ydoc.destroy();
      isInitializedRef.current = false;
      editorRef.current = null;
    };
  }, []); // Empty deps - only run once

  // Handle document switching
  useEffect(() => {
    if (!id || !isInitializedRef.current || currentIdRef.current === id) return;

    switchDocument(id);
    loadNote(id);
  }, [id, switchDocument, loadNote]);

  // Get editor for hooks (convert ref to state-like value)
  const [editor, setEditor] = useState<Editor | null>(null);
  
  useEffect(() => {
    setEditor(editorRef.current);
  }, [isInitializedRef.current]);

  // Memoize the provider value to avoid unnecessary re-renders
  const providerValue = useMemo(() => ({ editor }), [editor]);
  
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      if (!ctx.editor) {
        return {
          color: undefined,
          isPurple: false,
          isRed: false,
          isOrange: false,
          isYellow: false,
          isBlue: false,
          isTeal: false,
          isGreen: false,
        }
      }
      
      return {
        color: ctx.editor.getAttributes('textStyle').color,
        isPurple: ctx.editor.isActive('textStyle', { color: '#958DF1' }),
        isRed: ctx.editor.isActive('textStyle', { color: '#F98181' }),
        isOrange: ctx.editor.isActive('textStyle', { color: '#FBBC88' }),
        isYellow: ctx.editor.isActive('textStyle', { color: '#FAF594' }),
        isBlue: ctx.editor.isActive('textStyle', { color: '#70CFF8' }),
        isTeal: ctx.editor.isActive('textStyle', { color: '#94FADB' }),
        isGreen: ctx.editor.isActive('textStyle', { color: '#B9F18D' }),
      }
    },
  });

  if (!editor) return null;

  return (
    <>
      <EditorContext.Provider value={providerValue}>
        <EditorContent editor={editor} />
        
        <FloatingMenu 
          editor={editor}
          shouldShow={({ editor }) => shouldShowHeadingMenu({ editor }, 1)}
        >
          Heading 1
        </FloatingMenu>
        
        <FloatingMenu 
          editor={editor}
          shouldShow={({ editor }) => shouldShowHeadingMenu({ editor }, 2)}
        >
          Heading 2
        </FloatingMenu>
        
        <FloatingMenu 
          editor={editor}
          shouldShow={({ editor }) => shouldShowHeadingMenu({ editor }, 3)}
        >
          Heading 3
        </FloatingMenu>
        
        <FloatingMenu 
          editor={editor}
          shouldShow={({ editor }) => shouldShowHeadingMenu({ editor }, 4)}
        >
          Heading 4
        </FloatingMenu>
        
        <BubbleMenu editor={editor}>
          <div className="rounded-sm bg-primary-white border border-light-border z-20">
            <div className="mt-1 flex">
              <button className="editor-icon flex items-center">
                <input 
                  className="rounded-full w-5 h-5"
                  type="color"
                  onInput={event => editor.chain().focus().setColor(event.currentTarget.value).run()}
                  value={editorState.color}
                />
                <ChevronDown/>
              </button>
              
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="editor-icon"
                type="button"
              >
                <Bold/>
              </button>
              
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="editor-icon"
                type="button"
              >
                <Italic/>
              </button>
              
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className="editor-icon"
                type="button"
              >
                <Underline/>
              </button>
              
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="editor-icon"
                type="button"
              >
                <List/>
              </button>
              
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className="editor-icon"
                type="button"
              >
                <TextQuote/>
              </button>
            </div>
          </div>
        </BubbleMenu>
      </EditorContext.Provider>
    </>
  );
}