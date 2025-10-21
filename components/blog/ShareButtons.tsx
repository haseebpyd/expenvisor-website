"use client";

import { useState } from "react";
import {
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
  Check,
} from "lucide-react";

interface ShareButtonsProps {
  title: string;
  url: string;
  description: string;
}

export default function ShareButtons({
  title,
  url,
  description,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `https://expenvisor.com${url}`;

  const shareData = {
    title,
    text: description,
    url: fullUrl,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copy to clipboard
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log("Error copying:", err);
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      fullUrl
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      fullUrl
    )}`,
  };

  return (
    <div className="flex items-center gap-4 p-6 bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-xl">
      <span className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
        Share this article:
      </span>

      <div className="flex items-center gap-3">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-200"
        >
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">Share</span>
        </button>

        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors duration-200"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-700 transition-colors duration-200"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>

        <button
          onClick={handleCopyLink}
          className="p-2 text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <LinkIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
