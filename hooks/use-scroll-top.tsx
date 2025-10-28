import { useEffect, useState } from "react";

export const useScrollTop = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScrool = () => {
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScrool);

    return () => window.removeEventListener("scroll", handleScrool);
  }, [threshold]);

  return {
    scrolled,
  };
};
