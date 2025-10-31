import Highlight from "@tiptap/extension-highlight";

export const CustomHighlightShortcut = Highlight.extend({
    addKeyboardShortcuts(){
        return{
            'Shift-h': () => this.editor.commands.toggleHighlight(),
        }
    }
})