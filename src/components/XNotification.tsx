'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function XNotification(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    // Check if notification was previously dismissed
    const isDismissed = localStorage.getItem('x-notification-dismissed');
    
    if (!isDismissed) {
      // Show notification after a short delay
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleClose = (): void => {
    setIsClosing(true);
    
    // Save dismissal to localStorage
    localStorage.setItem('x-notification-dismissed', 'true');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isClosing ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
      }`}
      style={{
        animation: isClosing ? 'none' : 'slideInFromRight 0.5s ease-out',
      }}
    >
      <div className="retro-panel px-4 py-3 pr-10 relative max-w-md hover:scale-105 transition-transform duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 retro-text hover:retro-text-highlight transition-all duration-200 hover:rotate-90"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="flex flex-col gap-1">
          <span className="retro-text text-sm font-bold">
            Follow us on X:
          </span>
          <a
            href="https://x.com/voltnewsdotxyz"
            target="_blank"
            rel="noopener noreferrer"
            className="retro-text-highlight text-sm hover:underline transition-all duration-200"
          >
            https://x.com/voltnewsdotxyz
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          60% {
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .retro-panel {
            max-width: calc(100vw - 2rem);
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}
