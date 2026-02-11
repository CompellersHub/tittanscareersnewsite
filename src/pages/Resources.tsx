import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileText, Briefcase, ClipboardList, TrendingUp, BookOpen, CheckCircle, Loader2, Lock, Share2 } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ShareButton } from "@/components/ShareButton";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/axiosConfig";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import z from "zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(9, "Please enter a valid phone number"),
  subscribeToNewsletter: z.boolean().optional(),
});

const Resources = () => {
   const [resources, setResources] = useState<Resource[]>([]);

     const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUnlockDialog, setShowUnlockDialog] = useState(false);
const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

// Check if already unlocked in this session/browser
const [isUnlocked, setIsUnlocked] = useState(() => {
  return localStorage.getItem("resources_unlocked") === "true";
});

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subscribeToNewsletter: false,
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const unlocked = localStorage.getItem("resources_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

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


  // Function to handle click on Download / Share
const handleProtectedAction = (action: () => void) => {
  if (isUnlocked) {
    action();
    return;
  }

  // Show dialog and remember what we want to do after success
  setPendingAction(() => action);
  setShowUnlockDialog(true);
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormLoading(true);

  try {
    const validated = formSchema.parse(formData);

    const { error } = await supabase.functions.invoke("register-for-resources", {
      body: {
        name: validated.name.trim(),
        email: validated.email.trim(),
        phoneNumber: validated.phoneNumber.trim(),
        subscribeToNewsletter: formData.subscribeToNewsletter,
      },
    });

    if (error) throw error;

    toast.success("Unlocked! Enjoy your resources.");
    setIsUnlocked(true);
    localStorage.setItem("resources_unlocked", "true");

    // Close dialog
    setShowUnlockDialog(false);

    // Execute the action user was trying to do
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }

    // Reset form
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      subscribeToNewsletter: false,
    });
  } catch (err: any) {
    toast.error(err.message || "Failed to unlock. Please try again.");
  } finally {
    setFormLoading(false);
  }
};

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


   
 

 const ResourceCard = ({ resource }: { resource: Resource }) => {
  const Icon = (() => {
    const t = resource.title.toLowerCase();
    if (t.includes("guide") || t.includes("from graduate")) return BookOpen;
    if (t.includes("interview") || t.includes("star") || t.includes("checklist") || t.includes("questions")) return ClipboardList;
    if (t.includes("salary") || t.includes("market") || t.includes("compliance") || t.includes("analytics")) return TrendingUp;
    return FileText;
  })();

  const handleDownload = () => {
    window.open(resource.file_url, "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(resource.file_url);
    toast.success("Link copied to clipboard!");
  };

    // if (!isUnlocked) {
    //   return (
    //     <Card className="h-full opacity-75 bg-muted/40 border-dashed">
    //       <CardHeader>
    //         <div className="flex items-center justify-center h-20">
    //           <Lock className="h-10 w-10 text-muted-foreground" />
    //         </div>
    //         <CardTitle className="text-center text-muted-foreground mt-4">
    //           Unlock to Access
    //         </CardTitle>
    //       </CardHeader>
    //     </Card>
    //   );
    // }

    return (
      
        <Card className="h-full hover:shadow-xl transition-all border-2 hover:border-accent/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-accent" />
              </div>
             <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProtectedAction(handleCopyLink)}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => handleProtectedAction(handleDownload)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
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

<Dialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="text-2xl">Unlock Resources</DialogTitle>
      <DialogDescription>
        Please enter your details to download or share this career resource (one-time per browser).
      </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-5 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="John Doe"
          required
          disabled={formLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="you@example.com"
          required
          disabled={formLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">WhatsApp / Phone</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          placeholder="+234 800 000 0000"
          required
          disabled={formLoading}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          checked={formData.subscribeToNewsletter}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, subscribeToNewsletter: !!checked }))
          }
          disabled={formLoading}
        />
        <Label htmlFor="newsletter" className="text-sm cursor-pointer">
          Subscribe to newsletter & WhatsApp job alerts (optional)
        </Label>
      </div>

      <DialogFooter className="sm:justify-between gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowUnlockDialog(false)}
          disabled={formLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-accent hover:bg-accent/90"
          disabled={formLoading}
        >
          {formLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Unlocking...
            </>
          ) : (
            "Unlock & Continue"
          )}
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
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
