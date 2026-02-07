import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CoursesSection from "@/components/CoursesSection";

const FreeClass = () => {
  return (
    <main className="h-screen new-design bg-background hero-gradient overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-coral/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <Header />

      <div className="relative z-10 flex flex-col flex-1 px-4 py-4 sm:py-6">
        <div className="container mx-auto flex flex-col h-full max-w-6xl">
          <HeroSection />
          <div className="flex-1 flex items-center">
            <div className="w-full">
              <CoursesSection />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FreeClass;
