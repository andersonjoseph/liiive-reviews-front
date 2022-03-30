import { Show } from './Show';
import { getAllShows } from '../API';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useEffect, useState } from 'react';

export function ShowList() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: () => setCurrentPage((page) => page + 1),
  });

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const newShows = await getAllShows(currentPage);
      setShows((shows) => shows.concat(newShows));

      if (newShows.length === 0) setHasNextPage(false);
      setIsLoading(false);
    })();
  }, [currentPage]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
      {shows.map((showData, i) => (
        <Show
          key={`${showData.title}-${i}`}
          id={showData.id}
          title={showData.title}
          description={showData.description}
          image={showData.image}
          link={showData.link}
          rating={showData.rating}
        />
      ))}

      {(isLoading || hasNextPage) && <div ref={sentryRef}>Cargando...</div>}
    </div>
  );
}
