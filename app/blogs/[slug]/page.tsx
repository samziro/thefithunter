import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured_image?: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'beach-workouts-watamu',
    title: '5 Essential Beach Workouts in Watamu',
    excerpt:
      'Use Watamu’s sand and sea for natural resistance training. These simple exercises build strength, burn fat, and keep you motivated with ocean views.',
    date: 'December 20, 2025',
    readTime: '5 min',
    featured_image: '/mike.webp',
    content: `
      <h2>Why Train on the Beach?</h2>
      <p>Watamu’s beaches are more than beautiful—they’re a free, natural gym. Soft sand increases resistance, waves add fun cardio, and the ocean breeze keeps you cool. These 5 workouts are perfect for beginners and advanced clients alike.</p>

      <h2>1. Sand Squats & Lunges</h2>
      <p>Do 3 sets of 12–15 reps per leg. The unstable surface fires up glutes, quads, and stabilizers more than gym floors. Keep your chest up and core tight.</p>

      <h2>2. Shoreline Sprints</h2>
      <p>Run in shallow water for 20 seconds all-out, walk back to recover. Repeat 8–10 times. Great for fat loss and explosive power.</p>

      <h2>3. Push-Up Variations</h2>
      <p>Standard, wide, or diamond push-ups on sand. 3 sets to near failure. Builds chest, shoulders, and core while being gentle on joints.</p>

      <h2>4. Plank Hip Dips</h2>
      <p>Hold plank and slowly dip hips side to side. 3 sets of 20 dips per side. Targets obliques and deep core muscles.</p>

      <h2>5. Wave Burpees</h2>
      <p>Do burpees timed with incoming waves. 4 sets of 10–12 reps. Combines strength, cardio, and pure coastal fun.</p>

      <p>Want to learn perfect form and progress safely? Book a session with your personal trainer in Watamu — starting at just KSh 2,000.</p>
    `,
  },
  {
    slug: 'nutrition-kenya-heat',
    title: 'Staying Strong in Kenya’s Tropical Heat',
    excerpt:
      'Train smarter in tropical weather. Learn local hydration tips, pre-workout meals, and recovery foods to fuel your sessions without fatigue.',
    date: 'December 15, 2025',
    readTime: '7 min',
    featured_image: '/mike.webp',
    content: `
      <h2>Why Heat Changes Everything</h2>
      <p>Watamu’s climate means higher sweat rates and faster energy use. Without the right nutrition and hydration, performance drops and recovery slows.</p>

      <h2>Hydration Rules</h2>
      <p>Drink 500 ml of water 2 hours before training. Sip 200–300 ml every 15–20 minutes during sessions. Rehydrate afterward with coconut water or fresh fruit juice for natural electrolytes.</p>

      <h2>Pre-Workout Fuel (1–2 hours before)</h2>
      <p>Choose easy-to-digest carbs + some protein: banana with peanut butter, chapati with eggs, or ugali with vegetables. Avoid heavy fried foods.</p>

      <h2>Post-Workout Recovery (within 30–60 min)</h2>
      <p>Combine carbs + protein: mango or pineapple with yogurt, grilled fish with rice, or beans with avocado. Aim for 20–30 g protein to repair muscle.</p>

      <h2>Daily Habits That Help</h2>
      <ul>
        <li>Eat local superfoods: avocado, mango, passion fruit, fish, beans</li>
        <li>Small, frequent meals to keep energy steady</li>
        <li>Limit caffeine and alcohol before training</li>
        <li>Consider electrolyte tabs if sweating heavily</li>
      </ul>

      <p>Need a nutrition plan tailored to your training and Watamu lifestyle? Let’s build one together during your next session.</p>
    `,
  },
  {
    slug: 'beginner-personal-training',
    title: "Beginner's Guide to Starting Personal Training in Watamu",
    excerpt:
      'New to fitness? Learn how to begin safely and affordably with your personal trainer in Watamu — from goal setting to your first session.',
    date: 'December 10, 2025',
    readTime: '6 min',
    featured_image: '/mike.webp',
    content: `
      <h2>Step 1: Define Your Goals</h2>
      <p>Be clear: lose fat, gain strength, improve energy, or prepare for an event? Specific goals help your trainer create the right plan.</p>

      <h2>Step 2: Choose Your Starting Point</h2>
      <p>One-on-one sessions (KSh 2,000) or group classes are great for beginners. Beach workouts in Watamu make learning enjoyable and effective.</p>

      <h2>Step 3: Prepare for Day One</h2>
      <p>Wear comfortable clothes and shoes. Bring water. Arrive 10 minutes early. Tell your trainer about any injuries or health conditions.</p>

      <h2>Step 4: What Happens in Your First Session</h2>
      <p>Short assessment → warm-up → main workout → cool-down. Focus is on form and breathing. You’ll feel challenged but supported.</p>

      <h2>Step 5: Build the Habit</h2>
      <p>Commit to 2–3 sessions per week. Track progress. Adjust with your trainer. Consistency turns small steps into big changes.</p>

      <p>Ready to take the first step? Book a free consultation with Fit Hunter today — no pressure, just real guidance.</p>
    `,
  },
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#292929] py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back button */}
        <Link
          href="/blogs"
          className="inline-flex items-center text-yellow-500 hover:text-yellow-400 text-sm md:text-base font-medium mb-8 transition-colors font-inter"
        >
          ← Back to Blog
        </Link>

        {/* Article */}
        <article className="bg-[#4a4a4a] rounded-xl shadow-2xl overflow-hidden">
          {/* Featured Image */}
          {post.featured_image && (
            <div className="relative aspect-video">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-3 drop-shadow-lg">
                  {post.title}
                </h1>
                <p className="text-base font-inter text-slate-200 drop-shadow-md">
                  {post.date} • {post.readTime}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            <div
              className="prose prose-invert prose-yellow max-w-none font-inter text-slate-200 leading-relaxed prose-headings:font-poppins prose-headings:text-white prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* CTA at bottom */}
        <div className="mt-16 text-center">
          <p className="text-slate-300 font-inter text-lg mb-6">
            Ready to put these tips into action?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/programs"
              className="bg-yellow-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-yellow-700 transition-colors font-poppins"
            >
              Book a Session
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-[#292929] transition-colors font-poppins"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
