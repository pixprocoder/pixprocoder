'use client';

import { useState } from 'react';

interface Props {
  url: string;
  title: string;
  description: string;
}

export default function ShareButtons({ url, title, description }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  // Function to share on LinkedIn
  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url,
    )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
      description,
    )}`;
    window.open(linkedInUrl, '_blank');
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url,
    )}&quote=${encodeURIComponent(`${title} - ${description}`)}`;
    window.open(facebookUrl, '_blank');
  };

  // Function to copy the link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={shareOnLinkedIn}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        linkedIn
      </button>
      <button
        onClick={shareOnFacebook}
        className="bg-blue-800 text-white px-4 py-2 rounded"
      >
        Facebook
      </button>
      <button
        onClick={copyToClipboard}
        className="bg-gray-600 text-white px-4 py-2 rounded"
      >
        {isCopied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
