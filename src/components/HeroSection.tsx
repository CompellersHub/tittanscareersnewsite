import { GraduationCap } from "lucide-react";
import CountdownTimer from "./CountdownTimer";

// Next live class date - Feb 10, 2026 at 10:00 AM
const nextLiveClassDate = new Date("2026-02-10T10:00:00");

const HeroSection = () => {
  return (
    <div className="text-center mb-4">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-3">
        <GraduationCap className="w-3.5 h-3.5 text-accent" />
        <span className="text-xs font-medium text-accent">Live Interactive Classes</span>
      </div>

      {/* Main Heading */}
      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
        <span className="text-foreground">Join Our</span>
        <span className="text-accent"> Free </span>
        <span className="text-gradient">Masterclass</span>
      </h1>

      {/* Subtitle */}
      <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-4">
        Join expert-led live classes and gain practical skills in cybersecurity, 
        data analysis, compliance, and more.
      </p>

      {/* Countdown Timer */}
      <CountdownTimer targetDate={nextLiveClassDate} />
    </div>
  );
};

export default HeroSection;
