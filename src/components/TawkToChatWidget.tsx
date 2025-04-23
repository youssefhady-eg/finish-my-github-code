
import { useEffect } from "react";

// TODO: REPLACE with your own Tawk.to property/script (go to tawk.to and sign up for free)
const TAWKTO_PROPERTY_ID = "YOUR_TAWKTO_PROPERTY_ID"; // Example: "5a7a49afd7591465c7067fa2"
const TAWKTO_WIDGET_ID = "default"; // Usually 'default', can be changed on tawk.to

const TawkToChatWidget = () => {
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById("tawkto-script")) return;

    const s1 = document.createElement("script");
    s1.id = "tawkto-script";
    s1.async = true;
    s1.src = `https://embed.tawk.to/${TAWKTO_PROPERTY_ID}/${TAWKTO_WIDGET_ID}`;
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    document.body.appendChild(s1);

    return () => {
      document.body.removeChild(s1);
    };
  }, []);

  return null;
};

export default TawkToChatWidget;
