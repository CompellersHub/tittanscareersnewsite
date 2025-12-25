

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Minus,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Pilcrow,
  RemoveFormatting,
  Box,
} from 'lucide-react';
import { useEffect, useCallback, useMemo } from 'react';

interface RichTextEditorProps {
  content: string | any[];
  onChange: (html: string) => void;
  placeholder?: string;
}

// Convert custom JSON format to HTML
const convertCustomJsonToHtml = (content: any): string => {
  // If it's already a string (HTML), return as-is
  if (typeof content === 'string') {
    // Check if it looks like JSON
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return convertCustomJsonToHtml(parsed);
      }
    } catch {
      // It's regular HTML, return as-is
      return content;
    }
    return content;
  }

  // If it's not an array, return empty
  if (!Array.isArray(content)) {
    return '';
  }

  // Convert each node to HTML
  return content.map((node: any) => {
    switch (node.type) {
      case 'heading':
        const level = node.level || 2;
        return `<h${level}>${escapeHtml(node.value || '')}</h${level}>`;
      
      case 'paragraph':
        return `<p>${escapeHtml(node.value || '')}</p>`;
      
      case 'image':
        const alt = node.alt || '';
        const src = node.src || '';
        return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" />`;
      
      case 'primaryBox':
        // Convert primaryBox to a styled div with links
        const title = node.title || '';
        const links = (node.value || [])
          .filter((item: any) => item.type === 'link')
          .map((link: any) => `<a href="${escapeHtml(link.href || '')}">${escapeHtml(link.text || '')}</a>`)
          .join(' ');
        return `<blockquote><strong>${escapeHtml(title)}</strong> ${links}</blockquote>`;
      
      case 'list':
        const listItems = (node.value || [])
          .map((item: any) => `<li>${escapeHtml(typeof item === 'string' ? item : item.value || '')}</li>`)
          .join('');
        return node.ordered ? `<ol>${listItems}</ol>` : `<ul>${listItems}</ul>`;
      
      case 'blockquote':
        return `<blockquote>${escapeHtml(node.value || '')}</blockquote>`;
      
      case 'code':
        return `<pre><code>${escapeHtml(node.value || '')}</code></pre>`;
      
      default:
        // For unknown types, try to render the value as a paragraph
        if (node.value) {
          return `<p>${escapeHtml(typeof node.value === 'string' ? node.value : JSON.stringify(node.value))}</p>`;
        }
        return '';
    }
  }).join('\n');
};

// Escape HTML special characters
const escapeHtml = (text: string): string => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

export const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
  // Convert content to HTML on initial load
  const initialContent = useMemo(() => {
    try {
      return convertCustomJsonToHtml(content);
    } catch (error) {
      console.error('Error converting content:', error);
      return typeof content === 'string' ? content : '';
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg',
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update content when it changes externally (but only if editor exists and content differs)
  useEffect(() => {
    if (!editor) return;
    
    try {
      const newHtml = convertCustomJsonToHtml(content);
      const currentHtml = editor.getHTML();
      
      // Only update if content actually changed
      if (newHtml !== currentHtml && newHtml) {
        editor.commands.setContent(newHtml);
      }
    } catch (error) {
      console.error('Error updating editor content:', error);
    }
  }, [content, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    
    const url = window.prompt('Image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const insertCallToAction = useCallback(() => {
    if (!editor) return;
    
    const title = window.prompt('CTA Title (e.g., "Enroll now:")');
    const linkText = window.prompt('Link Text (e.g., "Enroll Now")');
    const linkUrl = window.prompt('Link URL (e.g., "https://example.com")');
    
    if (title && linkText && linkUrl) {
      editor.chain().focus().insertContent(
        `<blockquote><strong>${title}</strong> <a href="${linkUrl}">${linkText}</a></blockquote>`
      ).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/50">
        {/* Undo/Redo */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Text Formatting */}
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('code')}
          onPressedChange={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headings */}
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 3 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 4 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          title="Heading 4"
        >
          <Heading4 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('paragraph')}
          onPressedChange={() => editor.chain().focus().setParagraph().run()}
          title="Paragraph"
        >
          <Pilcrow className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Block Elements */}
        <Toggle
          size="sm"
          pressed={editor.isActive('blockquote')}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Link & Image */}
        <Toggle
          size="sm"
          pressed={editor.isActive('link')}
          onPressedChange={setLink}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Toggle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={addImage}
          title="Add Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        {/* CTA Box */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertCallToAction}
          title="Add CTA Box"
        >
          <Box className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Clear Formatting */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          title="Clear Formatting"
        >
          <RemoveFormatting className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />

      {/* Element Info */}
      <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground border-t bg-muted/30">
        <span>Current:</span>
        {editor.isActive('heading', { level: 1 }) && <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">H1</span>}
        {editor.isActive('heading', { level: 2 }) && <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">H2</span>}
        {editor.isActive('heading', { level: 3 }) && <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">H3</span>}
        {editor.isActive('heading', { level: 4 }) && <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">H4</span>}
        {editor.isActive('paragraph') && !editor.isActive('heading') && <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">P</span>}
        {editor.isActive('bulletList') && <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">UL</span>}
        {editor.isActive('orderedList') && <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">OL</span>}
        {editor.isActive('blockquote') && <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">QUOTE</span>}
        {editor.isActive('codeBlock') && <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">CODE</span>}
        {editor.isActive('bold') && <span className="px-2 py-0.5 rounded bg-muted font-bold">B</span>}
        {editor.isActive('italic') && <span className="px-2 py-0.5 rounded bg-muted italic">I</span>}
        {editor.isActive('link') && <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">LINK</span>}
      </div>
    </div>
  );
};
