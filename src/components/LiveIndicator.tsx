interface LiveIndicatorProps {
  isLive: boolean;
}

const LiveIndicator = ({ isLive }: LiveIndicatorProps) => {
  if (!isLive) {
    return (
      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold text-[8px]">
        <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
        <span>SOON</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-live text-white font-semibold text-[8px] animate-pulse-live">
      <div className="w-1 h-1 rounded-full bg-white animate-blink" />
      <span>LIVE</span>
    </div>
  );
};

export default LiveIndicator;
