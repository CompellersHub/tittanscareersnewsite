import { useRef, useEffect, useState } from 'react';

export default function OptimizedVideo({
  src,
  poster,
  className = "w-full rounded-lg shadow-xl",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" } // Start loading 200px before it enters viewport
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={`object-cover w-full h-full ${className}`}
      poster={poster} // Shows a lightweight image until video loads
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={isInView ? "auto" : "none"} // Only load when in view
      //   loading="lazy"
    >
      {/* Best format order: WebM (smallest) → MP4 fallback */}
      <source src={src + ".webm"} type="video/webm" />
      <source src={src + ".mp4"} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}