

// // src/components/marketing/LeadMagnetModal.tsx
// import { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { Download, FileText, Loader2, ExternalLink } from "lucide-react";
// import { api } from "@/lib/axiosConfig";

// interface Resource {
//   id: string;
//   title: string;
//   file_url: string;
//   file_size: number;
//   created_at: string;
//   file_type: string;
// }

// interface LeadMagnetModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const LeadMagnetModal = ({ isOpen, onClose }: LeadMagnetModalProps) => {
//   const [resources, setResources] = useState<Resource[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!isOpen) return;

//     const fetchResources = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const { data } = await api.get('/resources'); // returns array like in your console log
//         // Sort newest first (optional but nice UX)
//         const sorted = [...data].sort((a, b) =>
//           new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
//         );
//         setResources(sorted);
//       } catch (err) {
//         console.error("Failed to load resources:", err);
//         setError("Couldn't load the resources right now. Please try again later.");
//         toast.error("Failed to load free resources");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, [isOpen]);

//   const formatSize = (bytes: number) => {
//     if (bytes < 1024 * 1024) {
//       return `${(bytes / 1024).toFixed(0)} KB`;
//     }
//     return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
//   };

//   const formatDate = (iso: string) => {
//     return new Date(iso).toLocaleDateString('en-GB', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
//         <DialogHeader>
//           <DialogTitle className="text-2xl">Free Career Resources</DialogTitle>
//           <DialogDescription className="pt-1.5">
//             Browse and download our latest career guides, salary reports, interview tools and more.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="mt-5 flex-1 overflow-y-auto pr-2 -mr-2">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center h-48 gap-3">
//               <Loader2 className="h-8 w-8 animate-spin text-primary" />
//               <p className="text-sm text-muted-foreground">Loading resources...</p>
//             </div>
//           ) : error ? (
//             <div className="flex flex-col items-center justify-center h-48 text-center gap-3 px-4">
//               <p className="text-destructive">{error}</p>
//               <Button variant="outline" size="sm" onClick={onClose}>
//                 Close
//               </Button>
//             </div>
//           ) : resources.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
//               <FileText className="h-10 w-10 text-muted-foreground" />
//               <p className="text-muted-foreground">No resources available at the moment.</p>
//             </div>
//           ) : (
//             <div className="space-y-2.5">
//               {resources.map((res) => (
//                 <a
//                   key={res.id}
//                   href={res.file_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="group flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 hover:bg-accent/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
//                 >
//                   <div className="flex items-start gap-3.5 flex-1 min-w-0">
//                     <FileText className="h-6 w-6 text-primary/80 mt-0.5 flex-shrink-0" />
//                     <div className="min-w-0">
//                       <p className="font-medium leading-tight group-hover:text-primary transition-colors truncate">
//                         {res.title}
//                       </p>
//                       <p className="text-xs text-muted-foreground mt-1">
//                         {formatSize(res.file_size)} • {formatDate(res.created_at)}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-3 opacity-50 group-hover:opacity-100 transition-opacity ml-3">
//                     <ExternalLink className="h-4.5 w-4.5" />
//                     <Download className="h-4.5 w-4.5" />
//                   </div>
//                 </a>
//               ))}
//             </div>
//           )}
//         </div>

//         <DialogFooter className="pt-5 border-t mt-5 sm:justify-between">
//           <Button variant="outline" onClick={onClose}>
//             Close
//           </Button>

//           {!loading && resources.length > 0 && (
//             <Button
//               variant="secondary"
//               onClick={() => {
//                 resources.forEach(r => window.open(r.file_url, '_blank', 'noopener,noreferrer'));
//                 toast.info(`Opening ${resources.length} resources in new tabs...`);
//               }}
//             >
//               Open All
//             </Button>
//           )}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };


// src/components/marketing/LeadMagnetModal.tsx
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Download, FileText, Loader2, ExternalLink, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { api } from "@/lib/axiosConfig";
import z from "zod";

interface Resource {
  id: string;
  title: string;
  file_url: string;
  file_size: number;
  created_at: string;
  file_type: string;
}

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Zod schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phoneNumber: z.string().min(9, "Please enter a valid phone number"),
  subscribeToNewsletter: z.boolean().optional(),
});

export const LeadMagnetModal = ({ isOpen, onClose }: LeadMagnetModalProps) => {
  const [step, setStep] = useState<'form' | 'resources'>('form');
  const [resources, setResources] = useState<Resource[]>([]);
  const [loadingResources, setLoadingResources] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subscribeToNewsletter: false,
  });

  // Check if already unlocked (persistent across sessions)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return localStorage.getItem("lead_magnet_unlocked") === "true";
  });

  useEffect(() => {
    if (!isOpen) return;

    // If already unlocked → skip to resources
    if (isUnlocked) {
      setStep('resources');
      fetchResources();
    }
  }, [isOpen, isUnlocked]);

  const fetchResources = async () => {
    setLoadingResources(true);
    setError(null);
    try {
      const { data } = await api.get<Resource[]>('/resources');
      const sorted = [...data].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setResources(sorted);
    } catch (err) {
      console.error("Failed to load resources:", err);
      setError("Couldn't load resources right now. Please try again.");
      toast.error("Failed to load free resources");
    } finally {
      setLoadingResources(false);
    }
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

      toast.success("Thank you! Resources unlocked.");
      setIsUnlocked(true);
      localStorage.setItem("lead_magnet_unlocked", "true");

      setStep('resources');
      fetchResources();

      // Reset form
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        subscribeToNewsletter: false,
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to unlock resources. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col">
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Unlock Your Free Career Resources</DialogTitle>
              <DialogDescription className="pt-2">
                Enter your details once to get instant access to all guides, reports, worksheets and more.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 py-6">
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
                <Label htmlFor="phoneNumber">WhatsApp / Phone Number</Label>
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

              <DialogFooter className="pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={formLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={formLoading}
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    "Unlock Resources"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Your Free Career Resources</DialogTitle>
              <DialogDescription>
                Click any item below to view or download (PDFs open in new tab)
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 flex-1 overflow-y-auto pr-2 -mr-2">
              {loadingResources ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading resources...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-48 text-center gap-3 px-4">
                  <p className="text-destructive">{error}</p>
                  <Button variant="outline" size="sm" onClick={onClose}>
                    Close
                  </Button>
                </div>
              ) : resources.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">No resources available at the moment.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {resources.map((res) => (
                    <a
                      key={res.id}
                      href={res.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 border rounded-lg hover:border-accent hover:bg-accent/5 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <FileText className="h-6 w-6 text-primary/80 mt-1 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium truncate group-hover:text-accent transition-colors">
                            {res.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {formatSize(res.file_size)} • {formatDate(res.created_at)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 opacity-60 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-5 w-5" />
                        <Download className="h-5 w-5" />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="pt-6 border-t mt-6 sm:justify-between">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>

              {!loadingResources && resources.length > 0 && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    resources.forEach(r => window.open(r.file_url, '_blank', 'noopener,noreferrer'));
                    toast.info(`Opening ${resources.length} resources in new tabs...`);
                  }}
                >
                  Open All in Tabs
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};