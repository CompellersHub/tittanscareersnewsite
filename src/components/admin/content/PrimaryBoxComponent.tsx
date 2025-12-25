// src/components/RichTextEditor/PrimaryBoxComponent.tsx
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import { Button } from '@/components/ui/button';

export default function PrimaryBoxComponent({ node }) {
  const { title, value } = node.attrs;

  return (
    <NodeViewWrapper className="my-6">
      <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-r-lg">
        <p className="font-semibold text-lg mb-3">{title}</p>
        <div className="space-y-2">
          {value.map((item: any, i: number) => {
            if (item.type === 'link') {
              return (
                <Button key={i} asChild className="bg-primary hover:bg-primary/90">
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.text}
                  </a>
                </Button>
              );
            }
            return null;
          })}
        </div>
      </div>
    </NodeViewWrapper>
  );
}