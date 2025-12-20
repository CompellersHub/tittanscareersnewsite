import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { generateBlogPostSchema } from "@/lib/structuredData";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { SocialShareButtons } from "@/components/blog/SocialShareButtons";
import { ShareButton } from "@/components/ShareButton";
import { useFetchBlogBySlug, useFetchBlogs } from "@/hooks/useCourse";
import TableOfContents from "@/components/blog/TableOfContents";
import BlogContentRenderer from "@/components/blog/BlogContentRenderer";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();

  const {data: singleBlogPost, isLoading, isError} = useFetchBlogBySlug(slug); 
  
     const { data: fetchBlogs } = useFetchBlogs();

  
  // If post not found, redirect to blog
  // Update page title for SEO
  useEffect(() => {
    document.title = `${singleBlogPost?.title} | Titans Careers Blog`;
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', singleBlogPost?.excerpt);
    }
    
    return () => {
      document.title = 'Titans Careers';
    };
  }, [singleBlogPost]);


  if (!singleBlogPost && !isLoading) {
    return <Navigate to="/blog" replace />;
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: singleBlogPost?.title,
          text: singleBlogPost?.data?.excerpt,
          url: url
        });
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        toast({
          title: "Link Copied!",
          description: "Article link copied to clipboard.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not copy link. Please copy manually from the address bar.",
          variant: "destructive"
        });
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "aml": "bg-accent/10 text-accent border-accent/20",
      "data": "bg-gold/10 text-gold border-gold/20",
      "career-tips": "bg-primary/10 text-primary border-primary/20",
      "business-analysis": "bg-accent/10 text-accent border-accent/20",
      "cybersecurity": "bg-primary/10 text-primary border-primary/20",
      "industry-news": "bg-muted text-muted-foreground border-border"
    };
    return colors[category] || "bg-muted text-muted-foreground border-border";
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = fetchBlogs?.blogs
    .filter(p => p?.data?.category === singleBlogPost?.data?.category && p.id !== singleBlogPost?.id)
    .slice(0, 3);


    const isStructuredContent = Array.isArray((singleBlogPost as any)?.structuredContent);
  const structuredContent = isStructuredContent ? (singleBlogPost as any)?.structuredContent : null;


  return (
    <PageLayout intensity3D="subtle" show3D={true}>
      <ReadingProgressBar readTime={singleBlogPost?.data?.readTime || 8} />
      <SocialShareButtons 
        title={singleBlogPost?.title}
        url={typeof window !== 'undefined' ? window.location.href : ''}
      />
      <SEO
        title={singleBlogPost?.title}
        description={singleBlogPost?.excerpt}
        type="article"
        keywords={`${singleBlogPost?.category}, ${singleBlogPost?.title}, career advice, professional development`}
        author={singleBlogPost?.author}
        publishedTime={singleBlogPost?.publishedAt}
        structuredData={generateBlogPostSchema({
          title: singleBlogPost?.title,
          description: singleBlogPost?.excerpt,
          image: singleBlogPost?.featuredImage,
          author: singleBlogPost?.author,
          publishedDate: singleBlogPost?.publishedAt,
          url: typeof window !== 'undefined' ? window.location.href : ''
        })}
      />
      
      {/* Article Header */}
      <article>
        <header className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container max-w-4xl">
            <Link to="/blog">
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:text-accent mb-8 -ml-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            
            <div className="space-y-6">
              <Badge 
                variant="outline" 
                className={`font-sans ${getCategoryColor(singleBlogPost?.data?.category)}`}
              >
                {singleBlogPost?.data?.category?.replace('-', ' ').toUpperCase()}
              </Badge>
              
              <h1 className="font-kanit text-white text-3xl md:text-5xl font-bold leading-tight">
                {singleBlogPost?.title}
              </h1>
              
              <p className="font-sans text-xl text-primary-foreground/80 leading-relaxed">
                {singleBlogPost?.data?.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm font-sans pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <time dateTime={singleBlogPost?.data?.publishedAt} className="text-primary-foreground/80">
                    {formatDate(singleBlogPost?.data?.publishedAt)}
                  </time>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  <span className="text-primary-foreground/80">{singleBlogPost?.data?.readTime || 8} min read</span>
                </div>
                
                <ShareButton 
                  title={singleBlogPost?.title}
                  url={window.location.href}
                  description={singleBlogPost?.data?.excerpt}
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:text-accent hover:bg-primary-foreground/10"
                />
              </div>
              
              <div className="pt-4 border-t border-primary-foreground/20">
                <p className="font-sans font-semibold text-primary-foreground">{singleBlogPost?.data?.author}</p>
                <p className="font-sans text-sm text-primary-foreground/70">{singleBlogPost?.data?.authorRole}</p>
              </div>
            </div>
          </div>
        </header>

         <section className="py-12 md:py-16 bg-background">
          <div className="container max-w-4xl">
            {/* Table of Contents for structured content */}
            {structuredContent && (
              <TableOfContents content={structuredContent} />
            )}
            
            {/* Content */}
            <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-6 md:p-10 lg:p-12">
              <BlogContentRenderer content={structuredContent || singleBlogPost?.data?.content} />
            </div>
          </div>
        </section>

        {/* Article Content */}
        {/* <section className="py-16 bg-background">
          <div className="container max-w-3xl">
            <div 
              className="prose prose-lg max-w-none font-sans
                prose-headings:font-kanit prose-headings:font-bold prose-headings:text-primary
                prose-h1:text-4xl prose-h1:mb-6
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-accent
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-strong:text-primary prose-strong:font-bold
                prose-ul:my-6 prose-ul:space-y-2
                prose-li:text-muted-foreground
                prose-a:text-accent prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: singleBlogPost?.data?.content?.replace(/\n/g, '<br />') }}
            />
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
          <div className="container max-w-3xl">
            <Card className="bg-primary-foreground/10 backdrop-blur border-primary-foreground/20">
              <CardContent className="p-8 text-center space-y-6">
                <BookOpen className="w-12 h-12 text-accent mx-auto" />
                
                <h2 className="font-kanit text-2xl md:text-3xl font-bold">
                  Ready to Take Action?
                </h2>
                
                <p className="font-sans text-primary-foreground/80 text-lg">
                  Join our free Q&A session to learn how our courses can help you 
                  break into {singleBlogPost?.category === 'aml' ? 'AML compliance' : 
                  singleBlogPost?.category === 'data' ? 'data analysis' : 'your dream career'}.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-sans font-bold"
                    asChild
                  >
                    <a 
                      href="https://wa.me/447539434403"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Free Session
                    </a>
                  </Button>
                  
                  <Link to="/courses">
                    <Button size="lg" variant="outline" className="border-primary-foreground bg-stone-400 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                      View Courses
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="font-kanit text-3xl font-bold text-primary mb-4">
                  More Articles You Might Like
                </h2>
                <p className="font-sans text-muted-foreground">
                  Continue exploring career insights and industry tips
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card 
                    key={relatedPost.id}
                    className="border-2 hover:border-accent/50 transition-all hover:shadow-xl"
                  >
                    <CardContent className="p-6 space-y-4">
                      <Badge 
                        variant="outline" 
                        className={`font-sans ${getCategoryColor(relatedPost?.data?.category)}`}
                      >
                        {relatedPost?.data?.category?.replace('-', ' ').toUpperCase()}
                      </Badge>
                      
                      <h3 className="font-kanit text-lg font-bold text-primary leading-tight">
                        {relatedPost?.title}
                      </h3>
                      
                      <p className="font-sans text-sm text-muted-foreground line-clamp-3">
                        {relatedPost?.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-3 text-xs font-sans text-muted-foreground">
                        <span>{relatedPost?.readTime || 8} min</span>
                      </div>
                      
                      <Link to={`/blog/${relatedPost.slug}`}>
                        <Button 
                          variant="ghost" 
                          className="w-full text-accent font-sans font-bold hover:text-accent/80"
                        >
                          Read Article
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </PageLayout>
  );
};

export default BlogPost;
