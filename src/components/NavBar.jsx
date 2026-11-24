"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact-us", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileToggleRef = useRef(null);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          mobileToggleRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navLinkClass = (href) =>
    `group relative inline-flex items-center py-2 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 ${
      pathname === href ? "text-blue-700" : "text-slate-700 hover:text-blue-700"
    }`;

  const activeIndicator = (href) => (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-blue-700 transition-transform duration-200 ${
        pathname === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );

  return (
    <header
      className="sticky top-0 z-[100] w-full border-b border-slate-100 bg-white transition-all duration-300"
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-7 lg:min-h-[84px] lg:px-8"
      >
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="shrink-0 rounded-sm transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
        >
          <Image
            src="/Bimqubator.png"
            alt="Bimqubator"
            width={160}
            height={112}
            className="h-12 w-auto object-contain sm:h-[54px]"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          <Link href="/" className={navLinkClass("/")}>
            Home
            {activeIndicator("/")}
          </Link>
          <Link href="/about-us" className={navLinkClass("/about-us")}>
            About Us
            {activeIndicator("/about-us")}
          </Link>

          <Link
            href="/solution"
            onClick={closeMobileMenu}
            aria-current={pathname === "/solution" ? "page" : undefined}
            className={navLinkClass("/solution")}
          >
            Our solution
            {activeIndicator("/solution")}
          </Link>

          {links.slice(2).map(({ href, label }) => (
            <Link key={href} href={href} className={navLinkClass(href)}>
              {label}
              {activeIndicator(href)}
            </Link>
          ))}
        </div>

        <Link
          href="/contact-us"
          className="hidden shrink-0 items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue-700 lg:inline-flex"
        >
          Get Quote
        </Link>

        <button
          ref={mobileToggleRef}
          type="button"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          aria-label="Toggle navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={isMobileMenuOpen}
          className="mobile-menu-toggle inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-800 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 lg:hidden"
        >
          {isMobileMenuOpen ? (
            <HiX aria-hidden="true" size={23} />
          ) : (
            <HiMenuAlt3 aria-hidden="true" size={23} />
          )}
        </button>
      </nav>
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-navigation-panel fixed inset-x-0 top-[76px] z-[110] m-0 max-h-[calc(100dvh-76px)] w-full max-w-none overflow-y-auto overscroll-contain border-0 border-t border-slate-100 bg-white px-5 pb-5 pt-3 shadow-[0_16px_24px_rgba(15,23,42,0.12)] sm:px-7 lg:hidden"
        >
        <div className="mx-auto flex max-w-7xl flex-col">
          {links.slice(0, 2).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobileMenu}
              aria-current={pathname === href ? "page" : undefined}
              className={`border-b border-slate-100 py-3.5 text-sm font-medium transition-colors hover:text-blue-700 ${
                pathname === href ? "text-blue-700" : "text-slate-700"
              }`}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/solution"
            onClick={closeMobileMenu}
            aria-current={pathname === "/solution" ? "page" : undefined}
            className={`border-b border-slate-100 py-3.5 text-sm font-medium transition-colors hover:text-blue-700 ${
              pathname === "/solution" ? "text-blue-700" : "text-slate-700"
            }`}
          >
            Our solution
          </Link>

          {links.slice(2).map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMobileMenu}
              aria-current={pathname === href ? "page" : undefined}
              className={`border-b border-slate-100 py-3.5 text-sm font-medium transition-colors hover:text-blue-700 ${
                pathname === href ? "text-blue-700" : "text-slate-700"
              }`}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/contact-us"
            onClick={closeMobileMenu}
            className="mt-4 inline-flex min-h-12 items-center justify-center rounded-md bg-blue-700 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-blue-800"
          >
            Get Quote
          </Link>
        </div>
      </div>
      )}
    </header>
  );
}
