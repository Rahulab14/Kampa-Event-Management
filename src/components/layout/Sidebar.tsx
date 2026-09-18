import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home as HomeIcon, 
  CalendarDays, 
  Tickets,
  HelpCircle,
  Link as LinkIcon,
  Check,
  FileText
} from "lucide-react";
import { cn } from "../../utils/cn";
import image from '../../assets/logo2.png';

/* Comic-style burst badge matching the reference image */
function ComicNewBadge({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-flex items-center justify-center select-none pointer-events-none", className)}>
      <svg
        viewBox="0 0 100 80"
        className="w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Yellow comic burst body */}
        <path
          d="M50 3 
             C56 12, 65 14, 76 6 
             C74 18, 83 23, 96 22 
             C89 31, 92 41, 98 50 
             C86 52, 82 62, 80 73 
             C70 67, 59 71, 52 78 
             C47 69, 36 68, 25 74 
             C27 63, 20 54, 4 52 
             C14 43, 13 32, 2 24 
             C15 23, 22 15, 22 4 
             C31 12, 41 11, 50 3 Z"
          fill="#FACC15"
          stroke="#000000"
          strokeWidth="3.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Comic pop action lines */}
        <path d="M82 7 L90 1" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M88 12 L96 7" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M96 35 L104 33" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M95 41 L103 43" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M22 72 L14 78" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M27 77 L21 84" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M5 38 L-2 37" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M6 44 L-1 46" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {/* Made the "NEW" text smaller here */}
      <span className="absolute font-black text-[7px] tracking-tight text-black italic uppercase -rotate-6">
        NEW
      </span>
    </div>
  );
}

export function Sidebar() {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Overview", path: "/", icon: HomeIcon },
    { name: "Euphoria Event", path: "/euphoria", icon: Tickets, isNew: true },
    { name: "My Calendar", path: "/calender", icon: CalendarDays },
    { name: "Support", path: "/support", icon: HelpCircle },
    { name: "Terms & Conditions", path: "/terms", icon: FileText },
  ];

  const handleShare = async () => {
    const currentUrl = window.location.href;

    const copyWithFallback = () => {
      const textArea = document.createElement("textarea");
      textArea.value = currentUrl;
      textArea.setAttribute("readonly", "true");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
    };

    try {
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(currentUrl);
        } catch {
          copyWithFallback();
        }
      } else {
        copyWithFallback();
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Unable to copy page link:", error);
    }
  };

  return (
    <>
      {/* ================= DESKTOP & LAPTOP SIDEBAR ================= */}
      <aside 
        className={cn(
          "bg-white h-full hidden lg:flex flex-col p-6 shadow-sm z-10 shrink-0 transition-all duration-300 relative",
          collapsed ? "w-[88px]" : "w-[260px]"
        )}
      >
        {/* Logo Area & Collapse Toggle Button */}
        <div className={cn("flex items-center mb-8 mt-2", collapsed ? "flex-col gap-4 items-center justify-center" : "justify-between")}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-[#E0E4F5] p-2.5 rounded-xl shrink-0">
              <img src={image} alt="Kampa Logo" className="h-6 w-6" />
            </div>
            {!collapsed && (
              <span className="text-2xl font-bold tracking-tight whitespace-nowrap transition-opacity duration-200">Kampa</span>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="text-gray-400 hover:text-black p-1.5 rounded-lg hover:bg-gray-100 transition-colors shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </button>
        </div>

        {!collapsed && (
          <>
            <hr className="border-gray-100 mb-6" />
            <p className="text-xs font-bold text-gray-400 mb-4 px-4 uppercase tracking-wider">Main Menu</p>
          </>
        )}
        
        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center py-3.5 rounded-full transition-all duration-300",
                  collapsed ? "justify-center px-0" : "gap-4 px-5",
                  isActive 
                    ? "bg-black text-white shadow-md translate-x-1" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-black"
                )
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="font-medium text-sm whitespace-nowrap overflow-hidden transition-opacity duration-200">
                  {item.name}
                </span>
              )}
              {item.isNew && (
                <ComicNewBadge 
                  className={cn(
                    "absolute w-7 h-5",
                    collapsed ? "-top-1.5 right-1.5" : "-top-2 right-2"
                  )} 
                />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Promo Card - Invite A Friend */}
        <div className="mt-auto pt-8">
          {collapsed ? (
            <div className="flex justify-center">
              <button
                onClick={handleShare}
                title={copied ? "Link Copied!" : "Invite a Friend (Copy Link)"}
                className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 shadow-md ${
                  copied 
                    ? "bg-emerald-500 text-white" 
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                {copied ? <Check size={20} strokeWidth={3} /> : <LinkIcon size={20} strokeWidth={2} />}
              </button>
            </div>
          ) : (
            <div className="relative z-10 bg-[#F8F9FC] rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex flex-col pr-2 overflow-hidden">
                <p className="text-sm font-extrabold text-[#000000] tracking-tight leading-snug truncate">
                  Invite A Friend
                </p>
                <p className="text-[11px] font-medium text-gray-500 truncate max-w-[120px] mt-0.5">
                  {copied ? "Link copied!" : "Share Kampa link"}
                </p>
              </div>

              <button
                onClick={handleShare}
                title="Copy Page Link"
                className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-90 shrink-0 ${
                  copied 
                    ? "bg-emerald-500 text-white shadow-md" 
                    : "bg-[#000000] text-white hover:bg-gray-800 shadow-md"
                }`}
              >
                {copied ? <Check size={18} strokeWidth={3} /> : <LinkIcon size={18} strokeWidth={2} />}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ================= MOBILE & TABLET NOTCHED DOCK NAVIGATION ================= */}
      <div className="lg:hidden fixed bottom-3 left-4 right-4 max-w-md mx-auto z-50 h-20 flex items-center justify-center">
        {/* SVG Curved Background with Notch Cutout */}
        <svg 
          className="absolute inset-0 w-full h-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.12)] pointer-events-none" 
          viewBox="0 0 380 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M 28 0 
               H 136 
               C 144 0 152 6 157 15 
               C 167 39 213 39 223 15 
               C 228 6 236 0 244 0 
               H 352 
               C 367.464 0 380 12.536 380 28 
               V 52 
               C 380 67.464 367.464 80 352 80 
               H 28 
               C 12.536 80 0 67.464 0 52 
               V 28 
               C 0 12.536 12.536 0 28 0 Z" 
            fill="white" 
            className="filter drop-shadow-md"
          />
        </svg>

        {/* Navigation Content Overlay */}
        <div className="relative w-full h-full flex items-center justify-between px-6 z-10">
          {/* Left Nav Items */}
          <div className="flex items-center gap-6">
            {navItems.slice(0, 2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative p-3 rounded-full transition-all duration-300",
                    isActive 
                      ? "bg-black text-white shadow-md scale-110 -translate-y-1" 
                      : "text-gray-400 hover:text-black hover:bg-gray-100"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {/* Replaced full badge with just the yellow dot for mobile */}
                {item.isNew && (
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#FACC15] border-2 border-white rounded-full"></span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Center Elevated Floating Share Button (Positioned higher up) */}
          <div className="absolute left-1/2 -top-7 -translate-x-1/2">
            <button
              onClick={handleShare}
              title={copied ? "Link Copied!" : "Share Link"}
              className={cn(
                "h-14 w-14 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 shadow-[0_8px_25px_rgba(0,0,0,0.2)] border-4 border-[#F8F9FC]",
                copied ? "bg-emerald-500 text-white" : "bg-black text-white hover:bg-gray-800"
              )}
            >
              {copied ? <Check size={22} strokeWidth={3} /> : <LinkIcon size={22} strokeWidth={2.2} />}
            </button>
          </div>

          {/* Right Nav Items */}
          <div className="flex items-center gap-6">
            {navItems.slice(2, 4).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative p-3 rounded-full transition-all duration-300",
                    isActive 
                      ? "bg-black text-white shadow-md scale-110 -translate-y-1" 
                      : "text-gray-400 hover:text-black hover:bg-gray-100"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                {/* Replaced full badge with just the yellow dot for mobile */}
                {item.isNew && (
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#FACC15] border-2 border-white rounded-full"></span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}