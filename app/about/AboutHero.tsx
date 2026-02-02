'use client';

export default function AboutHero() {
  return (
    <section 
      className="relative h-[90dvh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/trainer.webp')`
      }}
    >
      <div className="text-center text-textSecondary max-w-3xl px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About Fit Hunter
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          After adding 50 pound myself, I realized that fitness is about more than just the gym. I decided to help othes to navigate their own transformations with sustainable plans the don&apos;t require to giving up the foods they love.
        </p>
        <div className="inline-block bg-button border border-yellow-400/30 px-6 py-3">
          <p className="text-white text-xl font-bold">Building confidence through fitness, one rep at a time.</p>
        </div>
      </div>
    </section>
  );
}
