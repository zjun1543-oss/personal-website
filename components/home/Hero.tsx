import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in" style={{ color: 'var(--morandi-charcoal)' }}>
          欢迎来到 MySpace
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--morandi-warm-gray)' }}>
          探索心理学、美食与运动的个人空间
        </p>
        <p className="text-lg mb-12 max-w-xl mx-auto" style={{ color: 'var(--morandi-warm-gray)' }}>
          在这里，我分享关于内心成长、烹饪乐趣和运动健康的思考与实践
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#sections" className="btn-primary">
            开始探索
          </Link>
          <Link href="/psychology" className="btn-secondary">
            阅读文章
          </Link>
        </div>
      </div>
    </section>
  );
}
