// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { SuccessStory } from "@/data/successStories";

// interface StoryCardProps {
//   story: SuccessStory;
//   index?: number;
//   onShare?: () => void;
// }

// export function StoryCard({ story }: StoryCardProps) {
//   return (
//     <Card className="p-6 h-full flex flex-col">
//       <div className="flex items-start gap-4 mb-4">
//         <Avatar className="h-12 w-12">
//           <AvatarImage src={story.image} alt={story.name} />
//           <AvatarFallback className="font-kanit">{story.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
//         </Avatar>
//         <div className="flex-1">
//           <h3 className="font-kanit font-bold text-lg text-primary">{story.name}</h3>
//           <p className="font-sans text-sm text-muted-foreground">{story.role}</p>
//           <Badge variant="secondary" className="mt-1 font-sans">{story.company}</Badge>
//         </div>
//       </div>
      
//       <p className="font-sans text-muted-foreground italic mb-4 flex-grow">
//         "{story.story}"
//       </p>
      
//       {(story.previousRole || story.salary) && (
//         <div className="pt-4 border-t border-border space-y-1 text-sm font-sans">
//           {story.previousRole && (
//             <p className="text-muted-foreground">
//               <span className="font-medium">Previous:</span> {story.previousRole}
//             </p>
//           )}
//           {story.salary && (
//             <p className="text-muted-foreground">
//               <span className="font-medium">Salary:</span> {story.salary}
//             </p>
//           )}
//         </div>
//       )}
//     </Card>
//   );
// }


import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Quote } from "lucide-react";
import { SuccessStory } from "@/data/successStories";

interface StoryCardProps {
  story: SuccessStory;
  index?: number;
}

export function StoryCard({ story }: StoryCardProps) {
  const initials = story.name.split(' ').map(n => n[0]).join('');
  
  return (
    <Card className="p-6 h-full flex flex-col bg-card border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
      {/* Quote Icon */}
      <Quote className="h-8 w-8 text-[#00B6F4]/30 mb-4" />
      
      {/* Story Content */}
      <p className="font-sans text-muted-foreground leading-relaxed mb-6 flex-grow text-sm">
        {story.story}
      </p>
      
      {/* Transformation Badge */}
      {story.previousRole && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge variant="outline" className="font-sans text-xs bg-muted/50">
            {story.previousRole}
          </Badge>
          <ArrowRight className="h-3 w-3 text-accent" />
          <Badge className="font-sans text-xs bg-primary text-accent-foreground">
            {story.role}
          </Badge>
        </div>
      )}
      
      {/* Author */}
      <div className="pt-4 border-t border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="font-kanit font-bold text-primary text-sm">{initials}</span>
        </div>
        <div>
          <h3 className="font-kanit font-bold text-primary text-sm">{story.name}</h3>
          <p className="font-sans text-xs text-muted-foreground">{story.role}</p>
        </div>
      </div>
    </Card>
  );
}
