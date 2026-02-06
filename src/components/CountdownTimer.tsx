import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

const CountdownTimer = ({ targetDate, label = "Next Live Class Starts In" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <div className="flex items-center gap-2">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 min-w-[48px]">
                <span className="text-xl sm:text-2xl font-bold text-accent font-display">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">{unit.label}</span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-accent text-xl font-bold mb-4">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
