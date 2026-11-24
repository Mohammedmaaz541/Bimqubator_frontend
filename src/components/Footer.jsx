import Link from "next/link";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  const partners = [
    "360 BIM Solutions",
    "Voltas ME",
    "IM Projects",
    "Zephyr Engineering",
    "Acornhive",
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Join Our Team", href: "/careers" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Declaration", href: "/declaration" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookies Policy", href: "/cookies-policy" },
    { name: "Disclaimer", href: "/disclaimer" },
  ];

  const socialLinks = [
    { icon: <FaLinkedin aria-hidden="true" size={16} />, href: "#", label: "LinkedIn" },
    { icon: <FaInstagram aria-hidden="true" size={16} />, href: "#", label: "Instagram" },
    {
      icon: <FaEnvelope aria-hidden="true" size={16} />,
      href: "mailto:info@bimqubator.com",
      label: "Email",
    },
  ];

  const sectionHeadingClass =
    "mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white";
  const footerLinkClass =
    "text-[13px] leading-5 text-slate-300 transition-colors duration-200 hover:text-blue-400 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400";

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-12 px-5 py-14 sm:grid-cols-2 sm:px-7 md:gap-x-12 md:gap-y-14 md:py-16 lg:grid-cols-[1.2fr_0.8fr_1.1fr_1.1fr] lg:px-8">
        <section aria-label="Company information" className="min-w-0">
          <Link
            href="/"
            className="inline-flex rounded-sm transition-opacity duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
          >
            <img
              src="/Bimqubator.png"
              alt="Bimqubator"
              className="h-16 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300/80">
            Leading Engineering &amp; BIM service consultants specializing in
            high-performance building and infrastructure projects.
          </p>
          <div className="mt-6 flex gap-3" aria-label="Social links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-slate-200 transition-colors duration-200 hover:border-blue-500/60 hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="footer-quick-links" className="min-w-0">
          <h2 id="footer-quick-links" className={sectionHeadingClass}>
            Quick Links
          </h2>
          <ul className="space-y-3.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={footerLinkClass}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-services" className="min-w-0">
          <h2 id="footer-services" className={sectionHeadingClass}>
            <Link
              href="/services"
              className="transition-colors duration-200 hover:text-blue-400 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
            >
              Our Services
            </Link>
          </h2>
          <h3 className={`${sectionHeadingClass} mb-4 mt-2 text-slate-400`}>
            Partners
          </h3>
          <ul className="space-y-3">
            {partners.map((partner) => (
              <li
                key={partner}
                className="flex items-center gap-3 text-[13px] leading-5 text-slate-300/90"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"
                />
                {partner}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="footer-contact" className="min-w-0">
          <h2 id="footer-contact" className={sectionHeadingClass}>
            Contact
          </h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-3.5">
              <FaMapMarkerAlt
                aria-hidden="true"
                className="mt-1 h-4 w-4 shrink-0 text-blue-400"
              />
              <span className="text-[13px] leading-6 text-slate-200">
                Red Hills, Hyderabad, <br />
                Telangana 500089, India
              </span>
            </li>
            <li className="flex items-center gap-3.5">
              <FaEnvelope
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-blue-400"
              />
              <a
                href="mailto:info@bimqubator.com"
                className={`${footerLinkClass} break-all`}
              >
                info@bimqubator.com
              </a>
            </li>
            <li className="flex items-center gap-3.5">
              <FaPhoneAlt
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-blue-400"
              />
              <a href="tel:+919000663628" className={footerLinkClass}>
                +91 90006 63628
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-6 text-center sm:px-7 lg:flex-row lg:justify-between lg:gap-8 lg:px-8 lg:text-left">
          <div className="space-y-2">
            <p className="text-[11px] font-medium leading-5 text-slate-400">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-100">Bimqubator.</span>{" "}
              All Rights Reserved.
            </p>
            <p className="text-[10px] leading-5 text-slate-500">
              Designed &amp; Developed by{" "}
              <a
                href="https://luminatewebsol.com/"
                target="blank"
                rel="noopener noreferrer"
                aria-label="Luminate Web Solutions"
                className="font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
              >
                Luminate Web Solutions
              </a>
            </p>
          </div>

          <nav aria-label="Legal links" className="flex max-w-full flex-wrap justify-center gap-x-5 gap-y-3 lg:justify-end">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] leading-5 text-slate-400 transition-colors duration-200 hover:text-blue-300 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
