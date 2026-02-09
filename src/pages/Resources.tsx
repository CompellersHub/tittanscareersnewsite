import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileText, Briefcase, ClipboardList, TrendingUp, BookOpen, CheckCircle, Loader2 } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButton } from "@/components/ShareButton";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axiosConfig";
import { Link } from "react-router-dom";

interface Resource {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_path: string;
  file_type: string;
  file_size: number;
  series: string;
  created_at: string;
  updated_at: string;
}

const Resources = () => {
   const [resources, setResources] = useState<Resource[]>([]);

     const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

     useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get<Resource[]>('/resources');
        // Sort newest → oldest
        const sorted = [...data].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setResources(sorted);
      } catch (err) {
        console.error("Failed to load resources:", err);
        setError("Failed to load resources. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const categorizedResources = useMemo(() => {
    const groups: Record<string, Resource[]> = {
      "Career Guides": [],
      "Interview Preparation": [],
      "Industry Reports": [],
      "Other": [],
    };
  resources.forEach((res) => {
      const titleLower = res.title.toLowerCase();

      if (
        titleLower.includes("guide") ||
        titleLower.includes("career switch") ||
        titleLower.includes("graduate to professional")
      ) {
        groups["Career Guides"].push(res);
      } else if (
        titleLower.includes("interview") ||
        titleLower.includes("star method") ||
        titleLower.includes("questions")
      ) {
        groups["Interview Preparation"].push(res);
      } else if (
        titleLower.includes("salary") ||
        titleLower.includes("job market") ||
        titleLower.includes("compliance") ||
        titleLower.includes("analytics") ||
        titleLower.includes("deep dive")
      ) {
        groups["Industry Reports"].push(res);
      } else {
        groups["Other"].push(res);
      }
    });

    return groups;
  }, [resources]);


  const careerGuides = [
    {
      title: "Complete Career Switcher's Guide",
      description: "Everything you need to know about switching careers into tech, analytics, or compliance.",
      fileSize: "2.5 MB",
      icon: BookOpen
    },
    {
      title: "From Graduate to Professional",
      description: "Step-by-step roadmap for recent grads entering the professional world.",
      fileSize: "1.8 MB",
      icon: TrendingUp
    },
    {
      title: "UK Job Market 2024 Report",
      description: "Current salary trends, in-demand roles, and hiring patterns across industries.",
      fileSize: "3.2 MB",
      icon: FileText
    }
  ];

  const resumeTemplates = [
    {
      title: "ATS-Optimized Resume Template",
      description: "Modern template that passes Applicant Tracking Systems with ease.",
      fileSize: "450 KB",
      icon: FileText
    },
    {
      title: "Career Switcher Resume Template",
      description: "Highlight transferable skills when changing careers.",
      fileSize: "520 KB",
      icon: Briefcase
    },
    {
      title: "LinkedIn Profile Optimization Guide",
      description: "Make recruiters notice you with a standout LinkedIn profile.",
      fileSize: "1.1 MB",
      icon: TrendingUp
    }
  ];

  const interviewPrep = [
    {
      title: "200+ Interview Questions Bank",
      description: "Common interview questions with sample answers for tech, analytics & compliance.",
      fileSize: "2.8 MB",
      icon: ClipboardList
    },
    {
      title: "STAR Method Worksheet",
      description: "Master behavioral interviews with our proven framework.",
      fileSize: "650 KB",
      icon: CheckCircle
    },
    {
      title: "Interview Preparation Checklist",
      description: "Never miss a step with our comprehensive pre-interview checklist.",
      fileSize: "380 KB",
      icon: ClipboardList
    }
  ];

  const industryReports = [
    {
      title: "2024 Tech Salary Report UK",
      description: "Detailed breakdown of tech salaries across roles and experience levels.",
      fileSize: "4.2 MB",
      icon: TrendingUp
    },
    {
      title: "Compliance Careers Deep Dive",
      description: "Complete guide to compliance roles, certifications, and career progression.",
      fileSize: "2.9 MB",
      icon: Briefcase
    },
    {
      title: "Analytics & Data Roles Guide",
      description: "Navigate the world of data careers: from analyst to scientist.",
      fileSize: "3.5 MB",
      icon: BookOpen
    }
  ];

 const ResourceCard = ({ resource }: { resource: Resource }) => {
    const Icon = (() => {
      const t = resource.title.toLowerCase();
      if (t.includes("guide") || t.includes("from graduate")) return BookOpen;
      if (t.includes("interview") || t.includes("star") || t.includes("checklist") || t.includes("questions")) return ClipboardList;
      if (t.includes("salary") || t.includes("market") || t.includes("compliance") || t.includes("analytics")) return TrendingUp;
      return FileText;
    })();

    return (
      <a
        href={resource.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
        download // optional: try to force download instead of preview
      >
        <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-accent/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <div className="flex gap-2">
                <ShareButton
                  title={resource.title}
                  url={resource.file_url}
                  description={`Free career resource from Titans Training Group: ${resource.title}`}
                  variant="outline"
                  size="sm"
                />
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans"
                  asChild
                >
                  <div>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </div>
                </Button>
              </div>
            </div>
            <CardTitle className="font-kanit text-xl mt-4 group-hover:text-accent transition-colors line-clamp-2">
              {resource.title.replace(/-/g, " ")}
            </CardTitle>
            <CardDescription className="font-sans text-base line-clamp-2">
              {resource.description || "Professional PDF guide – instant access"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>PDF • {formatSize(resource.file_size)}</span>
              <span className="ml-auto text-xs">
                {new Date(resource.created_at).toLocaleDateString("en-GB", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </CardContent>
        </Card>
      </a>
    );
  };


  const renderSection = (title: string, icon: any, bgClass = "bg-background") => {
    const items = categorizedResources[title] || [];
    if (items.length === 0) return null;

    return (
      <section className={`py-20 ${bgClass}`}>
        <div className="container max-w-7xl">
          <div className="mb-12 space-y-3">
            <h2 className="font-kanit text-3xl md:text-4xl font-bold text-primary flex items-center gap-3">
              {icon}
              {title}
              <Badge variant="outline" className="ml-3 text-base">
                {items.length}
              </Badge>
            </h2>
            <p className="font-sans text-lg text-muted-foreground">
              {title === "Career Guides" && "Comprehensive roadmaps for your career transition"}
              {title === "Interview Preparation" && "Tools & frameworks to help you shine in interviews"}
              {title === "Industry Reports" && "Latest insights, salary data & role deep-dives"}
              {title === "Other" && "Additional helpful materials"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((res) => (
              <ResourceCard key={res.id} resource={res} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <PageLayout intensity3D="subtle" show3D={true}>
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container max-w-7xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-accent/20 text-accent border-accent/30 font-sans">
              <Download className="w-3 h-3 mr-2" />
              FREE RESOURCES
            </Badge>
            
            <h1 className="font-kanit text-white text-4xl md:text-6xl font-bold">
              Your <span className="text-accent">Free Career Toolkit</span>
            </h1>
            
            <p className="font-sans text-xl text-primary-foreground/80 leading-relaxed">
              Everything you need to kickstart your career transformation. 
              Download our professional guides, templates, and reports - completely free.
            </p>
          </div>
        </div>
      </section>

      {/* Career Guides Section */}
     {loading ? (
        <div className="py-32 flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
          <p className="text-xl text-muted-foreground">Loading your free resources...</p>
        </div>
      ) : error ? (
        <div className="py-32 text-center">
          <p className="text-xl text-destructive mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      ) : (
        <>
          {renderSection("Career Guides", <BookOpen className="w-8 h-8 text-accent" />)}
          {renderSection("Interview Preparation", <ClipboardList className="w-8 h-8 text-accent" />)}
          {renderSection("Industry Reports", <TrendingUp className="w-8 h-8 text-accent" />, "bg-muted/30")}
          {renderSection("Other", <FileText className="w-8 h-8 text-accent" />, "bg-background")}

          {/* Newsletter & CTA sections remain the same */}
         <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-kanit text-3xl font-bold text-primary mb-4">
                Want More Free Resources?
              </h2>
              <p className="font-sans text-lg text-muted-foreground mb-6">
                Subscribe to get new career guides, templates, and industry reports delivered straight to your inbox. Plus, receive exclusive WhatsApp updates with job alerts and quick tips.
              </p>
              <ul className="space-y-3 font-sans text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Weekly career tips and job search strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>New downloadable resources each month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Early access to course launches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Instant WhatsApp job alerts (optional)</span>
                </li>
              </ul>
            </div>
            <div>
              <NewsletterSignup 
                variant="card" 
                source="resources-page" 
                showWhatsApp={true}
                showName={true}
              />
            </div>
          </div>
        </div>
      </section>

          <section className="py-20 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
            <div className="container max-w-4xl text-center space-y-8">
              <h2 className="font-kanit text-3xl md:text-5xl font-bold">
                Ready to Go Further?
              </h2>
              <p className="font-sans text-xl text-primary-foreground/85 leading-relaxed">
                These free tools are just the start. Get structured training, projects, CV help & job support.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10"
                >
                  <Link to="/courses" className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Explore Courses
                  </Link>
                </Button>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold text-lg px-10"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Free Consultation
                </Button> */}
              </div>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  );
};

export default Resources;
