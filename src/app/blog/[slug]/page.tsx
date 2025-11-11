import { notFound } from "next/navigation";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { incrementViewCount } from "@/lib/supabase";
import { Prose } from "@/components/prose";
import rehypePrettyCode from "rehype-pretty-code";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

async function ViewCounter({ slug }: { slug: string }) {
  // Increment view count (server-side)
  const viewCount = await incrementViewCount(slug);

  return (
    <span className="text-muted-foreground">
      {viewCount} {viewCount === 1 ? "view" : "views"}
    </span>
  );
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    mdxOptions: {
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "github-dark",
            keepBackground: true,
          },
        ],
      ],
    },
  };

  return (
    <article className="space-y-8">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to all posts
      </Link>

      <header className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <p className="text-xl text-muted-foreground">{post.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM dd, yyyy")}
          </time>
          <span>•</span>
          <ViewCounter slug={slug} />
          {post.tags.length > 0 && (
            <>
              <span>•</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-muted rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <div className="border-t border-border pt-8">
        <Prose>
          <MDXRemote source={post.content} options={options} />
        </Prose>
      </div>
    </article>
  );
}
