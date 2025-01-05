import { FC } from 'react';
import Link from 'next/link';

const Footer: FC = () => {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:150px_150px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-medium text-white/90 tracking-wider uppercase">
              Return Resources
            </h3>
            <p className="mt-4 text-base text-white/60 font-light">
              Supporting your journey back to the workforce with comprehensive resources and guidance.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/90 tracking-wider uppercase">
              Quick Start
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/skills-refresh" className="text-base text-white/60 hover:text-white transition-colors font-light">
                  Skills Refresh
                </Link>
              </li>
              <li>
                <Link href="/return-program" className="text-base text-white/60 hover:text-white transition-colors font-light">
                  Return Program
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/90 tracking-wider uppercase">
              Success Stories
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/testimonials" className="text-base text-white/60 hover:text-white transition-colors font-light">
                  Return Stories
                </Link>
              </li>
              <li>
                <Link href="/impact" className="text-base text-white/60 hover:text-white transition-colors font-light">
                  Impact Report
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-white/90 tracking-wider uppercase">
              Support Network
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/mentorship" className="text-base text-white/60 hover:text-white transition-colors font-light">
                  Mentorship
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-base text-white/60 hover:text-white transition-colors font-light">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-center text-base text-white/60 font-light">
            <span className="mr-2">🔄</span>
            © {new Date().getFullYear()} WikiJobs - Your Return to Work Partner
            <span className="ml-2">✨</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 