"use client";

import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { footerNavigation } from "./footer-data";
import { CodePilotMark } from "@/components/brand/codepilot-logo";

export function SiteFooter() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If it's an anchor link, try to scroll smoothly
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-background border-t border-border/50">
      
      {/* Decorative Top Gradient */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      


      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <CodePilotMark className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Build the future from a prompt. Turn ideas into working applications with AI.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col lg:col-span-1">
            <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
            <ul className="flex flex-col gap-3">
              {footerNavigation.product.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    onClick={handleScroll}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empty Space for Grid Balancing */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Footer CTA Column */}
          <div className="flex flex-col lg:col-span-1 bg-muted/20 p-6 rounded-2xl border border-border/50 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-2">Have an idea?</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Start building your application today.
            </p>
            <Button asChild size="sm" className="w-full rounded-full shadow-sm group">
              <Link href="/root">
                Start Building <ArrowRight className="ml-2 size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CodePilot. All rights reserved.
          </p>
          {/* Note: Terms/Privacy excluded intentionally per constraints to avoid fake routes */}
        </div>

      </div>
    </footer>
  );
}
