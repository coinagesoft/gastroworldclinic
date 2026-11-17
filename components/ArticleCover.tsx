import Image from 'next/image';
import { NEWS_ARTICLES } from '@/lib/newsData';

interface ArticleCoverProps {
  category: string;
  title: string;
  /** "hero" is the large cover on the article page. Anything else is a card thumbnail. */
  size?: 'hero' | 'card';
  /** Optional: pass an image path directly instead of looking it up by title. */
  image?: string;
}

/**
 * Cover image for a blog article.
 * The image comes from `article.image` in lib/newsData.ts (found by title),
 * so the index page, article page and home carousel all show the same cover.
 */
export default function ArticleCover({ category, title, size = 'card', image }: ArticleCoverProps) {
  const src = image ?? NEWS_ARTICLES.find((a) => a.title === title)?.image;
  const ratio = size === 'hero' ? '16 / 9' : '16 / 10';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        overflow: 'hidden',
        background: '#f3f2ff',
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={`${category}: ${title}`}
          fill
          unoptimized
          priority={size === 'hero'}
          sizes={size === 'hero' ? '(max-width: 900px) 100vw, 800px' : '(max-width: 640px) 100vw, 400px'}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f3f2ff, #dedcfb)',
            color: '#4749bd',
            fontWeight: 700,
            fontSize: size === 'hero' ? 28 : 18,
          }}
        >
          {category}
        </div>
      )}
    </div>
  );
}