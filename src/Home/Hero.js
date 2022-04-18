import { suspend } from 'suspend-react';
import { getRandomShows } from '../API';
import { Link } from 'wouter';

export function HeroSkeleton() {
  return (
    <div className="h-80 animate-pulse rounded-2xl bg-slate-200 relative w-full" />
  );
}

export function Hero() {
  const shows = suspend(
    async () => {
      return await getRandomShows();
    },
    ['random', 'shows'],
    { lifespan: 60000 * 60 * 2 }, // 2 hours
  );

  const show = shows[(shows.length * Math.random()) | 0];

  return (
    <article
      className="p-4 rounded-2xl bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${show.image}), linear-gradient(rgba(0,0,0,0.0),rgba(0,0,0,1.0)`,
        backgroundBlendMode: 'overlay',
      }}
    >
      <Link href={`/show/${show.id}`}>
        <h2 className="cursor-pointer text-3xl font-bold mt-32 text-white mb-1">
          {show.title}
        </h2>
      </Link>
      <small className="w-full md:w-5/12 inline-block mb-4 text-white">
        {show.description}
      </small>
      <span className="block">{'⭐'.repeat(show.rating)}</span>
    </article>
  );
}
