import { GraduationCap, BookOpen, Award } from "lucide-react";
import RegistrationDialog from "./RegistrationDialog";
import { Card } from "./ui/card";


const PaymentCard = () => {
  return (
        <Card className="group hover-lift rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-border/50 shadow-[0_4px_16px_-4px_hsl(213_69%_13%/0.08)] hover:shadow-[0_12px_32px_-8px_hsl(213_69%_13%/0.15)] hover:border-accent/30 bg-card flex flex-col h-full relative overflow-hidden transition-all duration-400 ease-out">

    <div className="group card-gradient rounded-lg overflow-hidden  card-hover  flex flex-col">
      {/* Image Section */}
      <div className="relative h-16 sm:h-20 md:h-40 overflow-hidden">
        <img
          src={`https://res.cloudinary.com/djol7dcjq/image/upload/v1771796233/292d4801-8cd7-4909-a57e-e8198c1b5240.png`}
          alt="Full Course Package"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
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
        <h3 className="font-display text-sm font-bold text-foreground mb-1.5 group-hover:text-accent transition-colors duration-300 leading-tight">
          Full Course Package
        </h3>

        {/* Description */}
        <p className="text-[12px] font-medium text-muted-foreground mb-2 leading-tight flex-1">
          Register for our full course with twelve months support
        </p>

          <div className="flex items-center gap-1 mb-4">
<p className="text-base text-primary leading-tight flex-1">
  A complete career bundle covering Cybersecurity, Data Analysis, Digital Marketing, AML/KYC Compliance, and Software Testing — with live sessions and 12 months of support.
</p>
            
            </div>

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
    </Card>
  );
};

export default PaymentCard;
