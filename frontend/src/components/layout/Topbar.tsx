import { Bell, Search, ChevronDown } from "lucide-react";
import avatar from "@/assets/avatar-user.jpg";
import { Link } from "@tanstack/react-router";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
      <div className="flex items-center gap-4 px-6 lg:px-8 h-16">
        <div className="flex-1 max-w-xl relative">
          <Search className="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search items, locations..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/60 border border-transparent text-sm placeholder:text-muted-foreground focus:outline-none focus:bg-background focus:border-border transition-colors"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-muted transition-colors" aria-label="Notifications">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
              3
            </span>
          </button>

          <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
  <div className="hidden sm:block">
    <div className="text-sm font-semibold leading-tight">Riya Sharma</div>
    <div className="text-xs text-muted-foreground">Student</div>
  </div>
  <ChevronDown className="h-4 w-4 text-muted-foreground" />
</Link>
        </div>
      </div>
    </header>
  );
}
