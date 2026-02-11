import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  Calendar, 
  Lock, 
  CheckCircle2,
  BookOpen,
  Shield,
  TrendingUp,
  FileSearch,
  Bitcoin,
  Briefcase,
  Megaphone,
  Building2,
  Copy,
  Check
} from "lucide-react";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";


import { BarChart3 } from "lucide-react";

const courses = [
  {
    name: "Software Testing",
    courseSlug: "software-testing",
    icon: FileSearch,
    price: 699,
  },
  {
    name: "Data Privacy",
    courseSlug: "data-privacy",
    icon: Shield,
    price: 699,
  },
  { name: "Digital Marketing Masterclass", courseSlug: "digital-marketing", icon: Megaphone, price: 699 },
  {
    name: "Cybersecurity",
    courseSlug: "cybersecurity",
    icon: Lock,
    price: 699,
  },
  {
    name: "KYC/AML Masterclass",
    courseSlug: "aml-kyc",
    icon: TrendingUp,
    price: 499,
  },
  {
    name: "Crypto & Digital Assets",
    courseSlug: "crypto-assets",
    icon: Bitcoin,
    price: 699,
  },
  {
    name: "Interview Prep",
    courseSlug: "interview-preparation",
    icon: Briefcase,
    price: 299,
  },
  {
    name: "Data Analysis",
    courseSlug: "data-analysis",
    icon: BarChart3,
    price: 249,
  },
];

const bankDetails = {
  bankName: "Barclays Bank",
  accountName: "Titans Careers Ltd",
  accountNumber: "53818284",
  sortCode: "20-11-43",
};

const RegistrationDialog = () => {
  const [step, setStep] = useState<"registration" | "payment" | "bank-transfer">("registration");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    voucherCode: "",
  });

  const [loading, setLoading] = useState(false);

 

  const handleCourseSelect = (courseName: string) => {
    setSelectedCourse((prev) => (prev === courseName ? null : courseName));
    // Optional: if you want to **force** selection (cannot deselect by clicking again)
    // setSelectedCourse(courseName);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse && formData.fullName && formData.email) {
      setStep("payment");
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     if (!selectedCourse) {
       alert("No course selected.");
       return;
     }

     const selectedCourseData = courses.find((c) => c.name === selectedCourse);
     if (!selectedCourseData) {
       alert("Selected course not found.");
       return;
     }

     if (paymentMethod === "transfer") {
       setStep("bank-transfer");
       return;
     }

      setLoading(true);


    const response =  await axios
        .post(
          "https://bzxzsidcifkhedydujqb.supabase.co/functions/v1/create-checkout-session",
          {
            courseSlug: selectedCourseData.courseSlug,
            courseTitle: selectedCourseData.name, // ← fixed: was using .title which didn't exist
            price: selectedCourseData.price,
            voucherCode: formData.voucherCode,
            userEmail: formData.email,
          },
        )

        console.log("Payment response:", response);
        if (response.data && response.data.url) {
          window.location.href = response.data.url;
          alert(
            "Payment successful! You will receive a confirmation email shortly.",
          );
          setLoading(false);
          resetForm();
          setStep("registration");
        }
       
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment. Please try again.");
    }finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const resetForm = () => {
   setStep("registration");
   setPaymentMethod("card");
   setSelectedCourse(null); 
   setCopiedField(null);
   setFormData({ fullName: "", email: "", phone: "", voucherCode: "" });
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      type="button"
      onClick={() => handleCopyToClipboard(text, field)}
      className="p-1 rounded hover:bg-accent/20 transition-colors"
    >
      {copiedField === field ? (
        <Check className="w-3.5 h-3.5 text-green-500" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );

  return (
    <Dialog onOpenChange={(open) => !open && resetForm()}>
      <DialogTrigger asChild>
        <button className="new-design w-full py-1.5 px-3 rounded-md bg-accent text-accent-foreground font-semibold text-[10px] hover:bg-accent/90 transition-all duration-300 border border-accent">
          Enroll Now
        </button>
      </DialogTrigger>
      <DialogContent className="newdesign max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background to-accent/5 border-accent/20">
        <DialogHeader className="text-center pb-2">
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-accent/20 border border-accent/30">
              {step === "bank-transfer" ? (
                <Building2 className="w-8 h-8 text-accent" />
              ) : (
                <GraduationCap className="w-8 h-8 text-accent" />
              )}
            </div>
          </div>
          <DialogTitle className="text-xl font-display bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
            {step === "registration"
              ? "Course Registration"
              : step === "payment"
                ? "Secure Payment"
                : "Bank Transfer Details"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {step === "registration"
              ? "Select your courses and enter your details"
              : step === "payment"
                ? "Complete your enrollment securely"
                : "Transfer the payment using the details below"}
          </DialogDescription>
        </DialogHeader>

        {step === "registration" ? (
          <form onSubmit={handleProceedToPayment} className="space-y-4">
            {/* Course Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                Select Your Courses
              </Label>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto p-3 border border-accent/20 rounded-lg bg-card/50">
                {courses.map((course) => {
                  // const IconComponent = course.icon;
                  // const isSelected = selectedCourses.includes(course.name);
                  const IconComponent = course.icon;
                  const isSelected = selectedCourse === course.name;
                  return (
                    <label
                      key={course.name}
                      htmlFor={`course-${course.name}`}
                      className={`flex items-center space-x-3 p-2 rounded-md transition-all cursor-pointer hover:bg-accent/10 ${
                        isSelected
                          ? "bg-accent/20 border border-accent/30"
                          : "border border-transparent"
                      }`}
                    >
                     
                      <Checkbox
                        id={`course-${course.name}`}
                        checked={isSelected}
                        onCheckedChange={() => handleCourseSelect(course.name)}
                        className="border-accent data-[state=checked]:bg-accent"
                      />
                      <IconComponent className="w-4 h-4 text-accent" />
                      <span className="text-sm flex-1 flex items-center justify-between">
                        <span>{course.name}</span>
                        <span className="text-xs text-muted-foreground font-medium">
                          £{course.price}
                        </span>
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                      )}
                    </label>
                  );
                })}
              </div>

              {selectedCourse === null ? (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                  Please select one course
                </p>
              ) : (
                <p className="text-xs text-accent flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />1 course selected
                </p>
              )}
            </div>

            {/* Personal Details */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                Personal Details
              </Label>
              <div className="space-y-3 p-3 border border-accent/20 rounded-lg bg-card/50">
                <div className="space-y-1">
                  <Label
                    htmlFor="fullName"
                    className="text-xs flex items-center gap-1.5"
                  >
                    <User className="w-3 h-3 text-muted-foreground" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="border-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="email"
                    className="text-xs flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="border-accent/20 focus:border-accent"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="phone"
                    className="text-xs flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="border-accent/20 focus:border-accent"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-accent-foreground font-semibold"
              disabled={!selectedCourse || !formData.fullName || !formData.email}
            >
              Proceed to Payment
            </Button>
          </form>
        ) : step === "payment" ? (
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            {/* Selected Courses Summary */}
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Selected Courses 
              </p>
              <div className="grid grid-cols-2 gap-1">
                 {selectedCourse && (
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    const course = courses.find(
                      (c) => c.name === selectedCourse,
                    );
                    const Icon = course?.icon || BookOpen;
                    return (
                      <>
                        <Icon className="w-4 h-4 text-accent" />
                        <span className="font-medium">{selectedCourse}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          £{course?.price ?? "?"}
                        </span>
                      </>
                    );
                  })()}
                </div>
              )}
              </div>
            </div>

            {/* Registrant Info */}
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs font-semibold mb-1 flex items-center gap-2">
                <User className="w-3 h-3 text-accent" />
                Registrant
              </p>
              <p className="text-sm text-foreground">{formData.fullName}</p>
              <p className="text-xs text-muted-foreground">{formData.email}</p>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-accent" />
                Payment Method
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === "card"
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-medium">Card Payment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("transfer")}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
                    paymentMethod === "transfer"
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="text-xs font-medium">Bank Transfer</span>
                </button>
              </div>
            </div>

            {/* Card Payment Details */}
            {/* {paymentMethod === "card" && (
              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-accent" />
                  Card Information
                </Label>
                <div className="space-y-3 p-3 border border-accent/20 rounded-lg bg-card/50">
                  <div className="space-y-1">
                    <Label htmlFor="cardName" className="text-xs flex items-center gap-1.5">
                      <User className="w-3 h-3 text-muted-foreground" />
                      Name on Card *
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="Enter name on card"
                      required
                      className="border-accent/20 focus:border-accent"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="cardNumber" className="text-xs flex items-center gap-1.5">
                      <CreditCard className="w-3 h-3 text-muted-foreground" />
                      Card Number *
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="border-accent/20 focus:border-accent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="expiry" className="text-xs flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        Expiry Date *
                      </Label>
                      <Input 
                        id="expiry" 
                        placeholder="MM/YY" 
                        required 
                        className="border-accent/20 focus:border-accent"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="cvv" className="text-xs flex items-center gap-1.5">
                        <Lock className="w-3 h-3 text-muted-foreground" />
                        CVV *
                      </Label>
                      <Input 
                        id="cvv" 
                        placeholder="123" 
                        required 
                        className="border-accent/20 focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )} */}

            {/* Bank Transfer Info */}
            {paymentMethod === "transfer" && (
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-xs text-muted-foreground text-center">
                  Click "Proceed to Transfer" to view bank details
                </p>
              </div>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 py-2 px-3 bg-accent/5 rounded-lg border border-accent/10">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">
                Your payment is secured with 256-bit SSL encryption
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("registration")}
                className="flex-1 border-primary/30 hover:bg-primary/10"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-accent-foreground font-semibold"
              >
                {loading ? "Processing..." : paymentMethod === "card"
                  ? "Complete Payment"
                  : "Proceed to Transfer"}
            
              </Button>
            </div>
          </form>
        ) : (
          /* Bank Transfer Details View */
          <div className="space-y-4">
            {/* Selected Courses Summary */}
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Selected Courses 
              </p>
              {selectedCourse && (
                <div className="flex items-center gap-2 text-sm">
                  {(() => {
                    const course = courses.find(
                      (c) => c.name === selectedCourse,
                    );
                    const Icon = course?.icon || BookOpen;
                    return (
                      <>
                        <Icon className="w-4 h-4 text-accent" />
                        <span className="font-medium">{selectedCourse}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          £{course?.price ?? "?"}
                        </span>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Bank Details */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4 text-accent" />
                Bank Account Details
              </Label>
              <div className="space-y-2 p-3 border border-accent/20 rounded-lg bg-card/50">
                {[
                  {
                    label: "Account Name",
                    value: bankDetails.accountName,
                    key: "accountName",
                  },
                  {
                    label: "Bank Name",
                    value: bankDetails.bankName,
                    key: "bankName",
                  },
                  {
                    label: "Sort Code",
                    value: bankDetails.sortCode,
                    key: "sortCode",
                  },
                  {
                    label: "Account Number",
                    value: bankDetails.accountNumber,
                    key: "accountNumber",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0"
                  >
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-foreground">
                        {item.value}
                      </p>
                    </div>
                    <CopyButton text={item.value} field={item.key} />
                  </div>
                ))}
              </div>
            </div>

            {/* Email Instruction */}
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <p className="text-xs text-foreground">
                  You can send the screenshot of your payment receipt to{" "}
                  <a
                    href="mailto:info@titanscareers.com"
                    className="font-semibold text-accent hover:underline"
                  >
                    info@titanscareers.com
                  </a>
                  . We will respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-3 bg-muted/50 rounded-lg border border-border">
              <p className="text-xs font-semibold mb-2">
                Important Instructions:
              </p>
              <ul className="text-[10px] text-muted-foreground space-y-1">
                <li>
                  • Complete the transfer within 24 hours to secure your
                  enrollment
                </li>
                <li>• Use the exact payment reference provided above</li>
                <li>
                  • Send a screenshot of your transfer receipt to our email
                </li>
                <li>
                  • You will receive a confirmation email once payment is
                  verified
                </li>
              </ul>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 py-2 px-3 bg-accent/5 rounded-lg border border-accent/10">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-xs text-muted-foreground">
                Your transaction details are secure
              </span>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("payment")}
                className="flex-1 border-primary/30 hover:bg-primary/10"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => {
                  alert(
                    "Thank you! Please complete the bank transfer using the details provided. We will verify your payment and send a confirmation email.",
                  );
                  resetForm();
                }}
                className="flex-1 bg-primary hover:bg-primary/90 text-accent-foreground font-semibold"
              >
                I've Made the Transfer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationDialog;
