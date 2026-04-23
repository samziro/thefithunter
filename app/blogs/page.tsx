import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";


// ─── Types ───────────────────────────────────────────────────────────────────

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured_image?: string | null;
}

type SupabaseBlogRow = {
  slug: string;
  title: string;
  excerpt: string;
  created_at: string;
  read_time?: string | null;
  featured_image?: string | null;
};

// ─── Data Fetch ──────────────────────────────────────────────────────────────

async function getBlogPosts(): Promise<BlogPost[]> {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const fallbackPosts: BlogPost[] = [
    {
      slug: "beach-workouts-watamu",
      title: "5 Effective Beach Workouts in Watamu",
      excerpt:
        "Use the sand and sea to build strength naturally. These simple exercises are great for beginners and advanced clients alike.",
      date: "December 20, 2025",
      readTime: "5 min read",
      featured_image: "/mike.webp",
    },
    {
      slug: "nutrition-kenya-heat",
      title: "Nutrition Tips for Training in Kenya’s Heat",
      excerpt:
        "Stay energized during workouts in tropical weather. Learn which local foods help with hydration and recovery.",
      date: "December 15, 2025",
      readTime: "6 min read",
      featured_image: "/mike2.webp",
    },
  ];

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return fallbackPosts;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const { data, error } = await supabase
    .from("blogs")
    .select("slug, title, excerpt, created_at, read_time, featured_image")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error || !data || data.length === 0) {
    return fallbackPosts;
  }

  return data.map((row: SupabaseBlogRow) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: new Date(row.created_at).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: row.read_time || "5 min read",
    featured_image: row.featured_image || "/mike.webp",
  }));
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Head>
        <title>
          Fit Hunter Blog | Fitness Tips from Personal Trainer Watamu, Kenya
        </title>
        <meta
          name="description"
          content="Read practical fitness tips, workout ideas, and nutrition advice from your certified personal trainer in Watamu, Kenya."
        />
      </Head>

      <div className="min-h-screen bg-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl md:text-5xl font-bold text-textSecondary mb-4">
                Fit Hunter Blog
              </h1>

              <Link
                href="/"
                className="bg-button px-8 py-3 text-textSecondary font-medium flex items-center"
              >
                ← Back to Home
              </Link>
            </div>

            <p className="text-lg md:text-xl text-textMain max-w-3xl leading-relaxed">
              Practical fitness tips, workout ideas, and nutrition advice from
              your personal trainer in Watamu, Kenya.
            </p>
          </div>

          {/* Blog Grid */}
          {posts.length === 0 ? (
            <div className="text-center text-textMain py-12">
              <p>No posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-lightBg rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <Link href={`/blogs/${post.slug}`} className="block">
                    <div className="relative aspect-video">
                      <Image
                        src={post.featured_image || "/mike.webp"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <div className="absolute bottom-3 left-3 text-white text-sm">
                        {post.date} • {post.readTime}
                      </div>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-bold text-textSecondary mb-3 line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-textMain mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <span className="text-button font-medium">
                        Read more →
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* Footer note */}
          <div className="text-center mt-16 text-textMain">
            <p>
              More articles coming soon. Follow us on Instagram for updates!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}