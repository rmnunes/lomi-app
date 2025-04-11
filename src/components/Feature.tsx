import { JSX } from "react";

export default function Feature({ icon, title, description }: { icon: JSX.Element; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-3 sm:space-x-4 text-left">
      <div className="text-lime-400 mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-white text-base sm:text-lg mb-1">{title}</h4>
        <p className="text-white/70 text-xs sm:text-sm">{description}</p>
      </div>
    </div>
  );
}
