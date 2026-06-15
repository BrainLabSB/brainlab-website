"use client";
import { useEffect, useId } from "react";

interface Props {
  portalId: string;
  formId: string;
  region?: string;
}

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

export default function HubSpotForm({ portalId, formId, region = "na1" }: Props) {
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const targetId = `hs-form-${uid}`;

    const init = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({ region, portalId, formId, target: `#${targetId}` });
      }
    };

    // If script already loaded, just init
    if (window.hbspt) { init(); return; }

    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }, [portalId, formId, region, uid]);

  return <div id={`hs-form-${uid}`} className="hs-form-target" />;
}
