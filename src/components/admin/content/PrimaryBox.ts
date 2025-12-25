
import { Node } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import PrimaryBoxComponent from './PrimaryBoxComponent';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    primaryBox: {
      setPrimaryBox: (attributes?: { title: string; value: any[] }) => ReturnType;
    };
  }
}

export const PrimaryBox = Node.create({
  name: 'primaryBox',

  group: 'block',

  content: 'inline*',

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'primary-box',
      },
    };
  },

  addAttributes() {
    return {
      title: {
        default: 'Call to Action',
      },
      value: {
        default: [],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="primary-box"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        { 'data-type': 'primary-box' },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(PrimaryBoxComponent);
  },

  addCommands() {
    return {
      setPrimaryBox: (attributes = {
          title: '',
          value: []
      }) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: attributes,
        });
      },
    };
  },
});