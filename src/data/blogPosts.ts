export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'aml' | 'data' | 'career-tips' | 'industry-news' | 'business-analysis' | 'cybersecurity';
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  featuredImage?: string;
}



export const categories = [
    { id:"Compliance", label: "AML Compliance" },
    { id: "Data", label: "Data Analysis" },
    { id: "Career-tips", label: "Career Tips" },
    { id: "Business-analysis", label: "Business Analysis" },
    { id: "Cybersecurity", label: "Cybersecurity" },
    { id: "Project-management", label: "Project Management" },
    { id: "Industry-news", label: "Industry News" }
  ];