import Comment from './Comment';
import { getShowComments } from '../API';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useEffect, useState } from 'react';
import { selectors, useCommentsStore } from '../stateStores';

export default function CommentList({ show }) {
  const comments = useCommentsStore(selectors.comments);
  const addComments = useCommentsStore(selectors.addComments);
  const resetComments = useCommentsStore(selectors.resetComments);

  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStars, setFilterStars] = useState(6);

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: () => setCurrentPage((page) => page + 1),
  });

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const newComments = await getShowComments(show, currentPage, filterStars);
      addComments(newComments);

      if (newComments.length === 0) setHasNextPage(false);
      setIsLoading(false);
    })();
  }, [show, currentPage]);

  useEffect(() => {
    return resetComments;
  }, []);

  function filterComments(ev) {
    resetComments();
    setFilterStars(Number(ev.target.value));
    setCurrentPage(1);
    setHasNextPage(true);
  }

  return (
    <>
      <div className="flex mt-5">
        <label className="self-center text-slate-700 mr-4 mb-2">Filtrar:</label>

        <select
          onChange={filterComments}
          className="text-sm mb-2 p-2 outline outline-1 outline-slate-400 rounded-md"
        >
          <option value="6">Todos</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
      </div>
      {comments.map((commentData, i) => (
        <Comment
          id={commentData.id}
          index={i}
          key={commentData.user.name + i}
          stars={commentData.stars}
          user={commentData.user}
          comment={commentData.comment}
        />
      ))}
      {(isLoading || hasNextPage) && <div ref={sentryRef}>Cargando...</div>}
      {comments.length === 0 && !isLoading && (
        <div className="text-center mt-8 text-slate-500">
          Nada por aquí ¡Sé el primero en comentar!
        </div>
      )}
    </>
  );
}
