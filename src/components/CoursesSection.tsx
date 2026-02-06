import CourseCard from "./CourseCard";
import PaymentCard from "./PaymentCard";
import amlKycImage from "@/assets/aml-kyc.jpg";
import cybersecurityImage from "@/assets/cybersecurity.jpg";
import dataAnalysisImage from "@/assets/data-analysis.jpg";
import digitalMarketingImage from "@/assets/digital-marketing.jpg";
import softwareTestingImage from "@/assets/software-testing.jpg";

const courses = [
  {
    title: "AML/KYC Compliance",
    description:
      "Master anti-money laundering and know-your-customer regulations.",
    date: "Every Friday",
    time: "7:00 PM UK",
    image: amlKycImage,
    isLive: true,
    slogan: "Stay Compliant, Stay Secure",
    liveLink: "https://meet.google.com/igs-kwfe-tof",
  },
  {
    title: "Cybersecurity",
    description:
      "Protect digital assets and infrastructure with security best practices.",
    date: "Feb 12, 2026",
    time: "7:00 PM UK",
    image: cybersecurityImage,
    isLive: false,
    slogan: "Defend the Digital Frontier",
  },
  {
    title: "Data Analysis",
    description:
      "Transform raw data into actionable insights with Excel, SQL, Python.",
    date: "Every Thursday",
    time: "7:00 PM UK",
    image: dataAnalysisImage,
    isLive: true,
    slogan: "Turn Data into Decisions",
    liveLink: "https://meet.google.com/opd-cknt-emm",
  },
  {
    title: "Digital Marketing",
    description:
      "Master SEO, social media marketing, and growth hacking strategies.",
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

const CoursesSection = () => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
      {courses.map((course, index) => (
        <div 
          key={course.title} 
          className="animate-fade-in opacity-0"
          style={{ 
            animationDelay: `${index * 100}ms`,
            animationFillMode: 'forwards'
          }}
        >
          <CourseCard {...course} />
        </div>
      ))}
      <div 
        className="animate-fade-in opacity-0"
        style={{ 
          animationDelay: `${courses.length * 100}ms`,
          animationFillMode: 'forwards'
        }}
      >
        <PaymentCard />
      </div>
    </div>
  );
};

export default CoursesSection;
