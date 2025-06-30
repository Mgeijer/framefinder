'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Glasses } from 'lucide-react';
import { SafeThemeToggle } from '@/components/safe-theme-toggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/guide', label: 'Face Shape Guide' },
    { href: '/style-tips', label: 'Style Tips' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-4 flex items-center space-x-2">
          <Glasses className="h-6 w-6 text-primary" />
          <span className="font-bold text-foreground">FrameFinder</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex flex-1 items-center justify-end space-x-2 md:hidden">
          <SafeThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 pt-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <Glasses className="h-6 w-6 text-primary" />
                    <span className="font-bold text-foreground">FrameFinder</span>
                  </Link>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="pt-4 border-t">
                  <Button asChild className="w-full">
                    <Link href="/face-analysis" onClick={() => setIsOpen(false)}>
                      <Glasses className="mr-2 h-4 w-4" />
                      Analyze My Face
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <nav className="flex items-center space-x-6 text-sm font-medium ml-6">
            <Link href="/guide" className="text-foreground/60 hover:text-foreground transition-colors">
              Face Shape Guide
            </Link>
            <Link href="/style-tips" className="text-foreground/60 hover:text-foreground transition-colors">
              Style Tips
            </Link>
            <Link href="/about" className="text-foreground/60 hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <SafeThemeToggle />
            <Button asChild>
              <Link href="/face-analysis">
                <Glasses className="mr-2 h-4 w-4" />
                Analyze My Face
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}