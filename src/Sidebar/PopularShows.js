import { suspend } from 'suspend-react';
import { getPopularShows } from '../API';

import SidebarShow from './SidebarShow';

export function PopularShowsSkeleton() {
  const shows = [...Array(4).keys()];

  return shows.map((i) => (
    <div
      key={i}
      className="animate-skeleton bg-slate-300 w-5/12 h-20 mb-5 rounded-lg"
    />
  ));
}

export function PopularShows() {
  let popularShows = suspend(
    async () => {
      const shows = await getPopularShows();
      return shows;
    },
    ['popular', 'shows'],
    { lifespan: 60000 * 60 * 2 }, // 2 hours
  );

  popularShows = popularShows.slice(0, 4);

  return popularShows.map((showData, i) => (
    <SidebarShow
      key={`${showData.title}-${i}`}
      id={showData.id}
      title={showData.title}
      description={showData.description}
      image={showData.image}
      link={showData.link}
      rating={showData.rating}
    />
  ));
}
