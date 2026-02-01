import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* 日期标签 */}
          <div className="mb-6">
            <span className="text-sm font-medium tracking-wider uppercase" style={{ color: '#999' }}>
              My Personal Space
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="text-6xl md:text-8xl font-normal mb-8" style={{ color: '#000', fontFamily: 'Georgia, serif' }}>
            Hi, 我是 JUN
          </h1>

          {/* 副标题 */}
          <p className="text-2xl md:text-3xl text-gray-600 mb-12 font-light">
            探索心理学、美食与运动的世界
          </p>

          {/* 个人简介卡片 */}
          <div className="bg-gray-50 rounded-2xl p-10 mb-12 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#333' }}>
              "一个不会画画的心理学爱好者，不是一个好厨子。"
            </p>
          </div>

          {/* 按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#sections"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-colors"
            >
              开始探索
            </Link>
            <Link
              href="/psychology"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black rounded-full text-lg font-medium hover:bg-black hover:text-white transition-colors"
            >
              阅读文章
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
