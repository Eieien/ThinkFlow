import type { Editor } from "@tiptap/react"
const headingHashMatch = (level: number, line: string): boolean => {
    const s = (line ?? "").trim();
    const re = new RegExp(`^#{${level}}\\s*$`);
    return re.test(s);
  };
  
  export const shouldShowHeadingMenu = (
    { editor }: { editor: Editor },
    level: number
  ): boolean => {
    const { $from } = editor.state.selection;
    const parent = $from.parent;
    const line = parent.textContent ?? "";
  
    if (parent.type.name === "heading") {
      if (line.trim().length === 0) return parent.attrs?.level === level;
    }
  
    if (parent.type.name === "paragraph") {
      return headingHashMatch(level, line);
    }
  
    return false;
  };
  