'use client';

import { Button } from '@/src/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaShareAlt,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

export default function SocialShareButtons({
  url,
  title,
  description,
}: SocialShareButtonsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Encode parameters for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  // Social media share URLs
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    instagram: `https://www.instagram.com/?url=${encodedUrl}`, // Instagram doesn't support direct sharing, so we'll use a generic approach
    copy: url, // For copy functionality
  };

  const shareOptions = [
    {
      name: 'X (Twitter)',
      icon: <FaXTwitter />,
      url: shareUrls.twitter,
      color: 'text-blue-400',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: shareUrls.linkedin,
      color: 'text-blue-700',
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF />,
      url: shareUrls.facebook,
      color: 'text-blue-600',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      url: shareUrls.instagram,
      color: 'text-pink-500',
    },
  ];

  const handleShare = (url: string, platform: string) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setShowDropdown(false);
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FaShareAlt className="w-4 h-4" />
        <span className="hidden md:inline">Share</span>
      </Button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-50">
          <div className="py-1">
            {shareOptions.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  handleShare(option.url, option.name.toLowerCase())
                }
                className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
              >
                <span className={option.color}>{option.icon}</span>
                <span>{option.name}</span>
              </button>
            ))}
            <button
              onClick={() => {
                navigator.clipboard.writeText(url);
                setShowDropdown(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              <span className="text-gray-600 dark:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
