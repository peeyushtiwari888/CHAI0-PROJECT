"use client";

import { useState, useEffect } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { CodePilotLogo } from "@/components/brand/codepilot-logo";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

const navLinks = [
  { name: "Product", href: "#interactive-demo-section" },
  { name: "Features", href: "#capabilities-section" },
  { name: "How it Works", href: "#agent-experience-section" },
  { name: "Pricing", href: "#pricing-section" },
];

export function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
    <header 
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <nav 
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-4 transition-all duration-300",
          scrolled 
            ? "h-14 border border-border/40 bg-background/70 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/50" 
            : "h-16 border-transparent bg-transparent"
        )}
      >
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <CodePilotLogo className="gap-2" />
          </Link>
        </div>

        {/* CENTER - Desktop Only */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={handleNavClick}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
             <ModeToggle />
          </div>

          {isLoaded && isSignedIn && (
            <>
              <div className="hidden sm:block">
                <Button asChild size="sm" variant="default" className="rounded-full shadow-md">
                  <Link href="/root">Go to Dashboard</Link>
                </Button>
              </div>
              <UserButton />
            </>
          )}

          {isLoaded && !isSignedIn && (
            <div className="hidden sm:flex items-center gap-3">
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="rounded-full">Sign In</Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm" variant="default" className="rounded-full shadow-md transition-transform hover:scale-105">
                  Start Building
                </Button>
              </SignInButton>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="flex flex-col gap-6 rounded-b-2xl pt-10">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex items-center justify-between">
                  <CodePilotLogo className="gap-2" />
                  <ModeToggle />
                </div>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      onClick={handleNavClick}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  {isLoaded && !isSignedIn && (
                    <>
                      <SignInButton mode="modal">
                        <Button variant="outline" className="w-full rounded-full">Sign In</Button>
                      </SignInButton>
                      <SignInButton mode="modal">
                        <Button variant="default" className="w-full rounded-full shadow-md">Start Building</Button>
                      </SignInButton>
                    </>
                  )}
                  {isLoaded && isSignedIn && (
                    <Button asChild variant="default" className="w-full rounded-full shadow-md">
                      <Link href="/root">Go to Dashboard</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
