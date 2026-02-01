import Link from 'next/link';

interface SectionCardProps {
  title: string;
  description: string;
  href: string;
  color: 'sage' | 'rose' | 'blue';
  icon: string;
}

const colorMap = {
  sage: {
    bg: 'var(--morandi-light-sage)',
    border: 'var(--morandi-sage)',
    text: 'var(--morandi-sage)',
  },
  rose: {
    bg: 'var(--morandi-light-rose)',
    border: 'var(--morandi-dusty-rose)',
    text: 'var(--morandi-dusty-rose)',
  },
  blue: {
    bg: 'var(--morandi-light-blue)',
    border: 'var(--morandi-slate-blue)',
    text: 'var(--morandi-slate-blue)',
  },
};

export default function SectionCard({ title, description, href, color, icon }: SectionCardProps) {
  const colors = colorMap[color];

  return (
    <Link href={href} className="block group">
      <div
        className="card p-8 h-full transition-all duration-300 group-hover:scale-105"
        style={{
          backgroundColor: colors.bg,
          border: `2px solid ${colors.border}`,
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: colors.border }}
        >
          <span className="text-3xl">{icon}</span>
        </div>

        {/* Title */}
        <h3
          className="text-2xl font-serif font-bold mb-4"
          style={{ color: 'var(--morandi-charcoal)' }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-base mb-6" style={{ color: 'var(--morandi-warm-gray)' }}>
          {description}
        </p>

        {/* Arrow */}
        <div
          className="flex items-center gap-2 font-medium transition-transform group-hover:translate-x-2"
          style={{ color: colors.text }}
        >
          <span>了解更多</span>
          <svg
            className="w-5 h-5"
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
    </Link>
  );
}
