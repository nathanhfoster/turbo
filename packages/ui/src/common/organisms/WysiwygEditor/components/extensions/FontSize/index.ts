import TextStyle from "@tiptap/extension-text-style";

/**
 * Custom extension for font size support
 * Extends TextStyle to add fontSize attribute
 */
export const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontSize,
        renderHTML: (attributes: { fontSize?: string }) => {
          if (!attributes.fontSize) {
            return {};
          }
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },
});
