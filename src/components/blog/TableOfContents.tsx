import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: Array<{ id: string; type: string; value?: string; level?: number; headingId?: string }>;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from content
  const headings: HeadingItem[] = content
    .filter((block) => block.type === 'heading' && block.level && block.level <= 3)
    .map((block) => ({
      id: block.headingId || block.id,
      text: block.value || '',
      level: block.level || 2,
    }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-muted/30 rounded-xl p-5 mb-10 border border-border/50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-3">
          <List className="w-5 h-5 text-accent" />
          <span className="font-kanit font-semibold text-foreground">
            Table of Contents
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      
      {isExpanded && (
        <ul className="mt-4 space-y-2 border-l-2 border-border/50 ml-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                'transition-colors',
                heading.level === 2 ? 'pl-4' : 'pl-8'
              )}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  'text-left text-sm font-sans hover:text-accent transition-colors py-1',
                  activeId === heading.id
                    ? 'text-accent font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default TableOfContents;
