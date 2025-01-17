import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Powered by YIP */}
          <div className="flex items-center space-x-2">
            <span className="text-white/80">Powered by</span>
            <Link 
              href="https://yipinstitute.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/logos/yip-logo.png"
                alt="YIP Logo"
                width={60}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-white/80 text-sm text-center">
            © {new Date().getFullYear()} WikiJobs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 