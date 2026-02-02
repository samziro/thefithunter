'use client';

export default function WhyChooseUs() {
  const features = [
    {
      icon: 'ri-fire-line',
      title: 'Passion for Fitness',
      description: 'Fitness is my lifestyle, not just a job. Every program comes from a real love for training and helping people unlock their potential.',
    },
    {
      icon: 'ri-brain-line',
      title: 'Progressive Approach',
      description: 'No old-school routines or guesswork. I use modern, science-based methods that adapt to your body, goals, and daily life for lasting results.',
    },
    {
      icon: 'ri-service-line',
      title: 'Strong Client Bonds',
      description: 'Results thrive on trust and enjoyment. I build genuine relationships, keep you motivated, and provide the right push to help you succeed.',
    },
  ];

  return (
    <section className="py-12 bg-lightBg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-textSecondary mb-4 ">
            Why Choose Fit Hunter?
          </h2>
          <p className="text-lg md:text-xl text-textMain max-w-3xl mx-auto  leading-relaxed">
            As your personal trainer in Watamu, Kenya, I offer affordable, tailored sessions—one-on-one, both gym and home workouts to help you reach your fitness goals simply and effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-bg flex flex-col items-center justify-start p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-3xl text-button`}></i>
              </div>
              <h3 className="text-xl font-semibold text-textSecondary mb-4 ">
                {feature.title}
              </h3>
              <p className="text-textMain leading-relaxed text-center  text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
