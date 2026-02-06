import { GraduationCap, BookOpen, Award } from "lucide-react";
import RegistrationDialog from "./RegistrationDialog";
import fullCourseIllustration from "@/assets/full-course-illustration.png";

const PaymentCard = () => {
  return (
    <div className="group card-gradient rounded-lg overflow-hidden border border-accent/30 card-hover bg-gradient-to-br from-accent/10 to-accent/5 flex flex-col">
      {/* Image Section */}
      <div className="relative h-16 sm:h-20 overflow-hidden">
        <img
          src={fullCourseIllustration}
          alt="Full Course Package"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-1.5 left-1.5">
          <div className="px-1.5 py-0.5 rounded-md bg-accent/90 flex items-center gap-0.5">
            <Award className="w-2.5 h-2.5 text-accent-foreground" />
            <span className="text-[8px] font-semibold text-accent-foreground">FULL PACKAGE</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-2 flex flex-col flex-1">
        <h3 className="font-display text-xs font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300 leading-tight">
          Full Course Package
        </h3>

        {/* Description */}
        <p className="text-[9px] text-muted-foreground mb-2 leading-tight flex-1">
          Register for our full course with twelve months support
        </p>

        {/* CTA Button */}
        <RegistrationDialog />

        {/* Bottom Icons */}
        <div className="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-accent/20">
          <div className="flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-accent" />
            <span className="text-[8px] text-muted-foreground">7 Courses</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-accent" />
            <span className="text-[8px] text-muted-foreground">12 Months</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
