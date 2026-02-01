'use client';

import { TwitterShareButton, TwitterIcon } from 'react-share';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('链接已复制到剪贴板！');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium" style={{ color: 'var(--morandi-charcoal)' }}>
        分享到：
      </span>

      {/* Twitter */}
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="w-8 h-8 flex items-center justify-center rounded-full transition-all hover:scale-110"
        style={{ backgroundColor: 'var(--morandi-light-blue)' }}
        aria-label="复制链接"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: 'var(--morandi-slate-blue)' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
}
