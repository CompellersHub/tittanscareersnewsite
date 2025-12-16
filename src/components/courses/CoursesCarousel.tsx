import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { CourseCard } from "./CourseCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoursesCarouselProps {
  courses: any[];
}

export function CoursesCarousel({ courses }: CoursesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border-border/50 hover:bg-background"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous</span>
        </Button>
      </div>
      
      <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm shadow-lg border-border/50 hover:bg-background"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
      

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {courses?.map((course) => (
            <div 
              key={course.slug} 
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {courses?.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === (emblaApi?.selectedScrollSnap() ?? 0)
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
