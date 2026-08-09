import { Zap } from "lucide-react";
import { businessConfig } from "../data/businessConfig";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-2 font-bold text-brand-white">
          <span className="rounded-md bg-brand-yellow p-1.5 text-brand-black"><Zap size={17} fill="currentColor" /></span>
          {businessConfig.name}
        </a>
        <p className="text-sm text-brand-gray">Professional electrical services with safety at the centre.</p>
        <p className="text-sm text-brand-gray">© {new Date().getFullYear()} {businessConfig.name}</p>
      </div>
    </footer>
  );
}

export default Footer;
