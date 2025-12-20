import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, Mail, BookOpen } from "lucide-react";

interface ContentBlock {
  id: string;
  type: 'image' | 'heading' | 'paragraph' | 'primaryBox';
  // For images
  src?: string;
  alt?: string;
  caption?: string;
  // For headings
  level?: number;
  value?: string;
  headingId?: string;
  // For paragraphs
  // value is used
  // For primaryBox
  title?: string;
  // value can be string or array of links
}

interface LinkItem {
  href: string;
  text: string;
  type: 'link';
}

interface BlogContentRendererProps {
  content: ContentBlock[] | string;
}

const BlogContentRenderer = ({ content }: BlogContentRendererProps) => {
  // If content is a string (old format), render with dangerouslySetInnerHTML
  if (typeof content === 'string') {
    return (
      <div 
        className="prose prose-lg max-w-none font-sans
          prose-headings:font-kanit prose-headings:font-bold prose-headings:text-foreground
          prose-h1:text-4xl prose-h1:mb-6
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-accent
          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
          prose-strong:text-foreground prose-strong:font-bold
          prose-ul:my-6 prose-ul:space-y-2
          prose-li:text-muted-foreground
          prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: content?.replace(/\n/g, '<br />') }}
      />
    );
  }

  // Render structured content blocks
  return (
    <div className="space-y-8">
      {content?.map((block) => {
        switch (block?.type) {
          case 'image':
            return (
              <figure key={block.id} className="my-10">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={block.src}
                    alt={block.alt || ''}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                {block?.caption && (
                  <figcaption className="mt-4 text-center text-sm text-muted-foreground font-sans italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'heading':
            const level = block.level || 2;
            const headingClasses: Record<number, string> = {
              2: 'text-2xl md:text-3xl font-kanit font-bold text-foreground mt-12 mb-6 pb-3 border-b border-border/50 scroll-mt-24',
              3: 'text-xl md:text-2xl font-kanit font-semibold text-foreground mt-10 mb-4 scroll-mt-24',
              4: 'text-lg md:text-xl font-kanit font-semibold text-foreground mt-8 mb-3 scroll-mt-24',
            };
            const HeadingComponent = level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
            return (
              <HeadingComponent
                key={block.id}
                id={block.headingId}
                className={headingClasses[level] || headingClasses[2]}
              >
                {block.value}
              </HeadingComponent>
            );

          case 'paragraph':
            return (
              <p
                key={block.id}
                className="text-base md:text-lg leading-relaxed text-muted-foreground font-sans"
              >
                {block.value}
              </p>
            );

          case 'primaryBox':
            const links = Array.isArray(block.value) 
              ? (block.value as LinkItem[]) 
              : [];
            
            return (
              <Card 
                key={block.id} 
                className="my-10 border-2 border-accent/30 bg-gradient-to-br from-accent/5 via-background to-primary/5 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      {block.title?.toLowerCase().includes('email') ? (
                        <Mail className="w-6 h-6 text-accent" />
                      ) : (
                        <BookOpen className="w-6 h-6 text-accent" />
                      )}
                    </div>
                    <div className="flex-1 space-y-4">
                      {block.title && (
                        <h4 className="font-kanit font-bold text-lg text-foreground">
                          {block.title}
                        </h4>
                      )}
                      <div className="flex flex-wrap gap-3">
                        {links.map((link, index) => (
                          <Button
                            key={index}
                            variant="default"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-semibold group"
                            asChild
                          >
                            <a
                              href={link.href.startsWith('https://www.info@') 
                                ? `mailto:${link.href.replace('https://www.', '')}` 
                                : link.href}
                              target={link.href.startsWith('mailto:') || link.href.startsWith('https://www.info@') ? undefined : '_blank'}
                              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                            >
                              {link.text}
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogContentRenderer;
