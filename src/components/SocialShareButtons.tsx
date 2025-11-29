'use client';

import { Button } from '@/src/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import {
  FaCopy,
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

  // Social media share URLs with proper parameters
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}&source=PixProcoder`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}%0A${encodedDescription}`,
    instagram: url, // Instagram doesn't support direct sharing, so we'll copy the URL
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
      url: shareUrls.copy, // Use the copy URL for Instagram since it doesn't support direct sharing
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
              <FaCopy className="text-gray-400" />
              <span>Copy Link</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
