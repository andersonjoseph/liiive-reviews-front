import { getNewShows } from '../API';
import { suspend } from 'suspend-react';
import { NewShow } from './NewShow';

export function NewShowListSkeleton() {
  const shows = [...Array(4).keys()];
  return (
    <div className="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
      {shows.map((i) => (
        <div key={i} className="bg-slate-300 h-40 rounded-2xl" />
      ))}
    </div>
  );
}

export function NewShowList() {
  let newShows = suspend(
    async () => {
      return await getNewShows();
    },
    ['new', 'shows'],
    { lifespan: 60000 * 60 * 2 }, // 2 hours
  );

  newShows = newShows.slice(0, 4);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
      {newShows.map((showData, i) => (
        <NewShow
          key={`${showData.title}-${i}`}
          id={showData.id}
          title={showData.title}
          description={showData.description}
          image={showData.image}
          link={showData.link}
          rating={showData.rating}
        />
      ))}
    </div>
  );
}
