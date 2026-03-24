import { Video, GraduationCap } from "lucide-react";
import LiveIndicator from "./LiveIndicator";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CourseCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  isLive: boolean;
  slogan: string;
  liveLink?: string;
  category: string;
}

const CourseCard = ({
  title,
  date,
  time,
  image,
  isLive,
  slogan,
  liveLink,
  description,
  category
}: CourseCardProps) => {

  const [expanded, setExpanded] = useState(false);


  return (
    <Card className="group hover-lift rounded-2xl border border-border/50 shadow-[0_4px_16px_-4px_hsl(213_69%_13%/0.08)] hover:shadow-[0_12px_32px_-8px_hsl(213_69%_13%/0.15)] hover:border-accent/30 bg-card flex flex-col h-full relative overflow-hidden transition-all duration-400 ease-out">

    <div className="group card-gradient rounded-lg overflow-hidden  card-hover flex flex-col">
      {/* Image Section */}
      <div className="relative h-16 sm:h-20 md:h-40 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Live Indicator */}
        <div className="absolute top-1.5 left-1.5">
          <LiveIndicator isLive={isLive} />
        </div>

        {/* Streaming Icon */}
        <div className="absolute top-1.5 right-1.5">
          <div
            className={`p-1 rounded-md ${isLive ? "bg-live/90" : "bg-muted/50"} flex items-center gap-0.5`}
          >
            <Video
              className={`w-3 h-3 ${isLive ? "text-white animate-blink" : "text-muted-foreground"}`}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-2 flex flex-col flex-1">
          <Badge className={`mb-4 w-fit font-sans bg-[#00B6F4] font-semibold text-xs tracking-wider uppercase transition-all duration-300 group-hover:shadow-[0_0_16px_hsl(43_100%_50%/0.3)] `}>
                  {category}
                </Badge>
        <h3 className="font-display text-2xl font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300 truncate">
          {title}
        </h3>

        {/* Date & Time */}
        <div className="flex justify-between mb-2">
          <div className="flex flex-col text-[10px] text-muted-foreground leading-tight">
            <span>{date.split(" ")[0]}</span>
            <span className="font-medium text-foreground">
              {date.split(" ").slice(1).join(" ")}
            </span>
          </div>
          <div className="flex flex-col font-semibold text-[10px] text-muted-foreground leading-tight text-right">
            <span>
              {time.split(" ")[0]} {time.split(" ")[1]}
            </span>
            <span className="font-semibold text-foreground">UK</span>
          </div>
        </div>

          <div className="mb-6 flex-grow">
  <p
    className={`font-sans text-base py-4 leading-relaxed !text-primary transition-all duration-300 ${
      expanded ? "" : "line-clamp-3"
    }`}
  >
    {description}
  </p>

  {description?.length > 120 && (
    <button
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
      className="mt-2 text-sm font-semibold text-[#00B6F4] hover:underline"
    >
      {expanded ? "Read less" : "Read more"}
    </button>
  )}
</div>


           

        {/* CTA Button */}
        <Button onClick={ ()=> window.open(liveLink, "_blank",
          "noopener,noreferrer" )} className="new-design w-full py-1.5 px-3 rounded-md bg-accent text-accent-foreground font-semibold text-lg hover:bg-accent/90 transition-all duration-300 border border-accent">
           {isLive ? " Join Live" : "coming soon"}
        </Button>
       

        {/* Mini Footer with Slogan */}
        <div className="flex items-center justify-center gap-1 mt-2 pt-2 border-t border-accent/20">
          <GraduationCap className="w-4 h-4 text-accent" />
          <span className="text-base text-muted-foreground italic text-center leading-tight">
            {slogan}
          </span>
        </div>
      </div>
    </div>
    </Card>
  );
};

export default CourseCard;
