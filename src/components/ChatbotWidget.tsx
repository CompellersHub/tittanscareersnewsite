import { useEffect } from "react";

// This component injects the Botpress chatbot scripts globally
export default function ChatbotWidget() {
  useEffect(() => {
    // Inject Botpress main script
    const script1 = document.createElement("script");
    let configScript: HTMLScriptElement | null = null;
    script1.src = "https://cdn.botpress.cloud/webchat/v3.2/inject.js";
    script1.async = true;
    script1.onload = () => {
      console.log("Botpress inject.js loaded");
      // Inject Botpress config script only after inject.js is loaded
      const script2 = document.createElement("script");
      script2.src = "https://files.bpcontent.cloud/2025/09/08/12/20250908124113-71Q3RR0M.js";
      script2.defer = true;
      script2.onload = () => console.log("Botpress config loaded");
      script2.onerror = () => console.error("Failed to load Botpress config");
      document.body.appendChild(script2);
      // Store reference for cleanup
      configScript = script2;
    };
    script1.onerror = () => console.error("Failed to load Botpress inject.js");
    document.body.appendChild(script1);

    return () => {
      if (configScript) {
        document.body.removeChild(configScript);
      }
      document.body.removeChild(script1);
    };
  }, []);

  return null; // No visible UI, just injects scripts
}