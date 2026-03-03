import { Link } from "next-view-transitions";
import Image from "next/image";
import { Youtube, Rss } from "lucide-react";
import { footerNavigation } from "@/lib/data/navigation";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

const socialIconMap = {
  linkedin: LinkedInIcon,
  youtube: Youtube,
  spotify: SpotifyIcon,
  rss: Rss,
} as const;

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        {/* Top section: Logo + contact info + sitemap columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Column 1-2: Logo + description + contact info */}
          <div className="col-span-2">
            <Image
              src="/images/logo/kenexis-logo.jpg"
              alt="Kenexis"
              width={160}
              height={40}
              className="brightness-0 invert"
            />
            <p className="mt-4 max-w-xs text-sm text-navy-300">
              Globally recognized process safety consultancy specializing in
              risk analysis and engineered safeguards.
            </p>
            <div className="mt-4 space-y-1 text-sm text-navy-300">
              <p>{footerNavigation.contactInfo.phone}</p>
              <p>{footerNavigation.contactInfo.email}</p>
              <p className="text-xs">
                {footerNavigation.contactInfo.address}
              </p>
            </div>
          </div>

          {/* Columns 3-6: Sitemap sections */}
          {footerNavigation.sections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-300 transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar: copyright + social + external links */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-700 pt-8 sm:flex-row">
          <p className="text-sm text-navy-400">
            {footerNavigation.copyright}
          </p>

          <div className="flex items-center gap-4">
            {/* Social links */}
            {footerNavigation.socialLinks.map((social) => {
              const Icon = socialIconMap[social.platform];
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-400 transition-colors hover:text-orange"
                >
                  <Icon className="size-5" />
                  <span className="sr-only">{social.label}</span>
                </a>
              );
            })}

            {/* Separator */}
            <span className="text-navy-700">|</span>

            {/* External links: KISS Login, Kenexis Store */}
            {footerNavigation.externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-navy-300 transition-colors hover:text-orange"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
