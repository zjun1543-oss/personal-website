import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="min-h-[60vh] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #9CAF88 0%, #C4A484 50%, #8B9DC3 100%)',
      }}
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* 日期标签 */}
          <div className="mb-6">
            <span className="text-sm font-medium tracking-wider uppercase text-white/90">
              My Personal Space
            </span>
          </div>

          {/* 主标题 */}
          <h1 className="text-6xl md:text-8xl font-normal mb-8 text-white" style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            Hi, 我是 JUN
          </h1>

          {/* 副标题 */}
          <p className="text-2xl md:text-3xl text-white/90 mb-12 font-light">
            探索心理学、美食与运动的世界
          </p>

          {/* 个人简介卡片 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-10 mb-12 max-w-3xl mx-auto shadow-xl">
            <p className="text-xl md:text-2xl leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#333' }}>
              "一个不会画画的心理学爱好者，不是一个好厨子。"
            </p>
          </div>

          {/* 按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#sections"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-800 rounded-full text-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              style={{
                boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 -2px 10px rgba(0,0,0,0.1)',
              }}
            >
              开始探索
            </Link>
            <Link
              href="/psychology"
              className="inline-flex items-center justify-center px-10 py-4 bg-transparent border-2 border-white rounded-full text-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white"
              style={{
                color: 'white',
                boxShadow: '0 8px 25px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              阅读文章
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
