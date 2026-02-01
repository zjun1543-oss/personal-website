import Link from 'next/link';
import Image from 'next/image';

interface SectionCardProps {
  title: string;
  description: string;
  href: string;
  color: 'sage' | 'rose' | 'blue';
  icon: string;
}

const colorMap = {
  sage: {
    bg: '#F5F5F5',
    text: '#9CAF88',
  },
  rose: {
    bg: '#FFF5F5',
    text: '#C4A484',
  },
  blue: {
    bg: '#F0F5FF',
    text: '#8B9DC3',
  },
};

export default function SectionCard({ title, description, href, color, icon }: SectionCardProps) {
  const colors = colorMap[color];

  return (
    <Link href={href} className="block group">
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1"
      >
        {/* 大图标区域 */}
        <div
          className="h-48 flex items-center justify-center"
          style={{ backgroundColor: colors.bg }}
        >
          <span className="text-8xl">{icon}</span>
        </div>

        {/* 内容区域 */}
        <div className="p-8">
          {/* 标签 */}
          <div className="mb-4">
            <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: colors.text }}>
              {title}
            </span>
          </div>

          {/* 标题 */}
          <h3
            className="text-2xl font-normal mb-4"
            style={{ fontFamily: 'Georgia, serif', color: '#000' }}
          >
            {title}
          </h3>

          {/* 描述 */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>

          {/* 链接 */}
          <div
            className="inline-flex items-center gap-2 text-sm font-medium transition-transform group-hover:translate-x-2"
            style={{ color: colors.text }}
          >
            <span>探索更多</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
