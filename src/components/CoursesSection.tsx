// // import CourseCard from "./CourseCard";
// // import PaymentCard from "./PaymentCard";
// // import amlKycImage from "@/assets/aml-kyc.jpg";
// // import cybersecurityImage from "@/assets/cybersecurity.jpg";
// // import dataAnalysisImage from "@/assets/data-analysis.jpg";
// // import digitalMarketingImage from "@/assets/digital-marketing.jpg";
// // import softwareTestingImage from "@/assets/software-testing.jpg";

// // const courses = [
// //   {
// //     title: "AML/KYC Compliance",
// //     description:
// //       "Master anti-money laundering and know-your-customer regulations.",
// //     date: "Every Friday",
// //     time: "7:00 PM UK",
// //     image: amlKycImage,
// //     isLive: true,
// //     slogan: "Stay Compliant, Stay Secure",
// //     liveLink: "https://meet.google.com/igs-kwfe-tof",
// //   },
// //   {
// //     title: "Cybersecurity",
// //     description:
// //       "Protect digital assets and infrastructure with security best practices.",
// //     date: "Feb 12, 2026",
// //     time: "7:00 PM UK",
// //     image: cybersecurityImage,
// //     isLive: false,
// //     slogan: "Defend the Digital Frontier",
// //   },
// //   {
// //     title: "Data Analysis",
// //     description:
// //       "Transform raw data into actionable insights with Excel, SQL, Python.",
// //     date: "Every Thursday",
// //     time: "7:00 PM UK",
// //     image: dataAnalysisImage,
// //     isLive: true,
// //     slogan: "Turn Data into Decisions",
// //     liveLink: "https://meet.google.com/opd-cknt-emm",
// //   },
// //   {
// //     title: "Digital Marketing",
// //     description:
// //       "Master SEO, social media marketing, and growth hacking strategies.",
// //     date: "Every Saturday",
// //     time: "7:00 PM UK",
// //     image: digitalMarketingImage,
// //     isLive: true,
// //     slogan: "Digital skills without borders.",
// //     liveLink: "https://meet.google.com/vaw-eurk-ibk",
// //   },
// //   {
// //     title: "Software Testing",
// //     description: "Ensure software quality with manual and automated testing.",
// //     date: "Feb 20, 2026",
// //     time: "7:00 PM UK",
// //     image: softwareTestingImage,
// //     isLive: false,
// //     slogan: "Quality First, Always",
// //   },
// // ];

// // const CoursesSection = () => {
// //   return (
// //     <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
// //       {courses.map((course, index) => (
// //         <div 
// //           key={course.title} 
// //           className="animate-fade-in opacity-0"
// //           style={{ 
// //             animationDelay: `${index * 100}ms`,
// //             animationFillMode: 'forwards'
// //           }}
// //         >
// //           <CourseCard {...course} />
// //         </div>
// //       ))}
// //       <div 
// //         className="animate-fade-in opacity-0"
// //         style={{ 
// //           animationDelay: `${courses.length * 100}ms`,
// //           animationFillMode: 'forwards'
// //         }}
// //       >
// //         <PaymentCard />
// //       </div>
// //     </div>
// //   );
// // };

// // export default CoursesSection;



// import { useEffect, useRef, useState } from "react";
// import CourseCard from "./CourseCard";
// import PaymentCard from "./PaymentCard";
// import amlKycImage from "@/assets/aml-kyc.jpg";
// import cybersecurityImage from "@/assets/cybersecurity.jpg";
// import dataAnalysisImage from "@/assets/data-analysis.jpg";
// import digitalMarketingImage from "@/assets/digital-marketing.jpg";
// import softwareTestingImage from "@/assets/software-testing.jpg";

// const courses = [
//   {
//     title: "AML/KYC Compliance",
//     description: "Master anti-money laundering and know-your-customer regulations.",
//     date: "Every Friday",
//     time: "7:00 PM UK",
//     image: amlKycImage,
//     isLive: true,
//     slogan: "Stay Compliant, Stay Secure",
//     liveLink: "https://meet.google.com/igs-kwfe-tof",
//   },
//   {
//     title: "Cybersecurity",
//     description: "Protect digital assets and infrastructure with security best practices.",
//     date: "Feb 12, 2026",
//     time: "7:00 PM UK",
//     image: cybersecurityImage,
//     isLive: false,
//     slogan: "Defend the Digital Frontier",
//   },
//   {
//     title: "Data Analysis",
//     description: "Transform raw data into actionable insights with Excel, SQL, Python.",
//     date: "Every Thursday",
//     time: "7:00 PM UK",
//     image: dataAnalysisImage,
//     isLive: true,
//     slogan: "Turn Data into Decisions",
//     liveLink: "https://meet.google.com/opd-cknt-emm",
//   },
//   {
//     title: "Digital Marketing",
//     description: "Master SEO, social media marketing, and growth hacking strategies.",
//     date: "Every Saturday",
//     time: "7:00 PM UK",
//     image: digitalMarketingImage,
//     isLive: true,
//     slogan: "Digital skills without borders.",
//     liveLink: "https://meet.google.com/vaw-eurk-ibk",
//   },
//   {
//     title: "Software Testing",
//     description: "Ensure software quality with manual and automated testing.",
//     date: "Feb 20, 2026",
//     time: "7:00 PM UK",
//     image: softwareTestingImage,
//     isLive: false,
//     slogan: "Quality First, Always",
//   },
// ];

// const CoursesSection = () => {
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const [isPaused, setIsPaused] = useState(false);

//   // Duplicate items for seamless infinite loop
//   const carouselItems = [...courses, ...courses];

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     let animationFrameId: number;
//     let scrollAmount = 0;

//     const scroll = () => {
//       if (isPaused || !carousel) return;

//       scrollAmount += 0.3; // adjust speed (higher = faster)

//       // Reset when we've scrolled one full set
//       if (scrollAmount >= carousel.scrollWidth / 2) {
//         scrollAmount = 0;
//         carousel.scrollLeft = 0;
//       } else {
//         carousel.scrollLeft = scrollAmount;
//       }

//       animationFrameId = requestAnimationFrame(scroll);
//     };

//     animationFrameId = requestAnimationFrame(scroll);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, [isPaused]);

//   return (
//     <div
//       className="relative overflow-hidden"
//       // onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//       // onTouchStart={() => setIsPaused(true)}
//       onTouchEnd={() => setIsPaused(false)}
//     >
//       <div
//         ref={carouselRef}
//         className="flex gap-3 sm:gap-4 overflow-x-hidden whitespace-nowrap scroll-smooth"
//         style={{
//           scrollBehavior: "smooth",
//         }}
//       >
//         {carouselItems.map((course, index) => (
//           <div
//             key={`${course.title}-${index}`}
//             className="min-w-[calc(100%/1)] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)] xl:min-w-[calc(100%/4)] flex-shrink-0"
//           >
//             <div
//               className="animate-fade-in opacity-0"
//               style={{
//                 animationDelay: `${(index % courses.length) * 100}ms`,
//                 animationFillMode: "forwards",
//               }}
//             >
//               <CourseCard {...course} />
//             </div>
//           </div>
//         ))}

//         {/* Payment Card appears after the duplicated set */}
//         <div
//           className="min-w-[calc(100%/1)] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)] xl:min-w-[calc(100%/4)] flex-shrink-0"
//         >
//           <div
//             className="animate-fade-in opacity-0"
//             style={{
//               animationDelay: `${courses.length * 100}ms`,
//               animationFillMode: "forwards",
//             }}
//           >
//             <PaymentCard />
//           </div>
//         </div>

//         {/* Duplicate PaymentCard for seamless loop (optional) */}
//         <div
//           className="min-w-[calc(100%/1)] sm:min-w-[calc(100%/2)] lg:min-w-[calc(100%/3)] xl:min-w-[calc(100%/4)] flex-shrink-0 hidden xl:block"
//         >
//           <PaymentCard />
//         </div>
//       </div>

//       {/* Optional gradient overlays for better look */}
//       <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
//       <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
//     </div>
//   );
// };

// export default CoursesSection;

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import PaymentCard from "./PaymentCard";
import amlKycImage from "@/assets/aml-kyc.jpg";
import cybersecurityImage from "@/assets/cybersecurity.jpg";
import dataAnalysisImage from "@/assets/data-analysis.jpg";
import digitalMarketingImage from "@/assets/digital-marketing.jpg";
import softwareTestingImage from "@/assets/software-testing.jpg";

// Define the shape of a course item
interface CourseItem {
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  isLive: boolean;
  slogan: string;
  liveLink?: string;
}

// Special marker for the payment card slot
interface PaymentItem {
  isPaymentCard: true;
}

// Union type for carousel items
type CarouselItem = CourseItem | PaymentItem;

const courses: CourseItem[] = [
  {
    title: "AML/KYC Compliance",
    description: "Master anti-money laundering and know-your-customer regulations.",
    date: "Every Friday",
    time: "7:00 PM UK",
    image: amlKycImage,
    isLive: true,
    slogan: "Stay Compliant, Stay Secure",
    liveLink: "https://meet.google.com/igs-kwfe-tof",
  },
  {
    title: "Cybersecurity",
    description: "Protect digital assets and infrastructure with security best practices.",
    date: "Feb 12, 2026",
    time: "7:00 PM UK",
    image: cybersecurityImage,
    isLive: false,
    slogan: "Defend the Digital Frontier",
  },
  {
    title: "Data Analysis",
    description: "Transform raw data into actionable insights with Excel, SQL, Python.",
    date: "Every Thursday",
    time: "7:00 PM UK",
    image: dataAnalysisImage,
    isLive: true,
    slogan: "Turn Data into Decisions",
    liveLink: "https://meet.google.com/opd-cknt-emm",
  },
  {
    title: "Digital Marketing",
    description: "Master SEO, social media marketing, and growth hacking strategies.",
    date: "Every Saturday",
    time: "7:00 PM UK",
    image: digitalMarketingImage,
    isLive: true,
    slogan: "Digital skills without borders.",
    liveLink: "https://meet.google.com/vaw-eurk-ibk",
  },
  {
    title: "Software Testing",
    description: "Ensure software quality with manual and automated testing.",
    date: "Feb 20, 2026",
    time: "7:00 PM UK",
    image: softwareTestingImage,
    isLive: false,
    slogan: "Quality First, Always",
  },
];

export default function CoursesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: true,
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setPrevBtnEnabled(emblaApi.canScrollPrev());
      setNextBtnEnabled(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // All carousel items: courses + one payment card
  const carouselItems: CarouselItem[] = [...courses, { isPaymentCard: true }];

  // Type guard to distinguish payment card from course
  const isPaymentItem = (item: CarouselItem): item is PaymentItem =>
    "isPaymentCard" in item && item.isPaymentCard;

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <div className="absolute -left-3 sm:-left-6 lg:-left-10 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          disabled={!prevBtnEnabled}
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background/90 backdrop-blur-md border shadow-md hover:bg-background"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Right Arrow */}
      <div className="absolute -right-3 sm:-right-6 lg:-right-10 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          disabled={!nextBtnEnabled}
          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background/90 backdrop-blur-md border shadow-md hover:bg-background"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-2 sm:-ml-3 lg:-ml-4">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className="
                flex-[0_0_100%]      pl-2 sm:pl-3 lg:pl-4
                sm:flex-[0_0_50%] 
                lg:flex-[0_0_33.333%] 
                xl:flex-[0_0_25%]     /* 4 cards visible on xl screens */
              "
            >
              {isPaymentItem(item) ? (
                <PaymentCard />
              ) : (
                <CourseCard {...item} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dots – shown on mobile */}
      <div className="flex justify-center gap-2 mt-5 sm:mt-6 lg:hidden">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === (emblaApi?.selectedScrollSnap() ?? 0)
                ? "w-6 bg-primary"
                : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}