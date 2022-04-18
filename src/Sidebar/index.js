import { Suspense } from 'react';

import { LastComments, LastCommentsSkeleton } from './LastComments';
import { PopularShows, PopularShowsSkeleton } from './PopularShows';

function Sidebar() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-slate-700">Populares</h2>
      <Suspense fallback={<PopularShowsSkeleton />}>
        <PopularShows />
      </Suspense>

      <span className="my-4 block">
        <hr />
      </span>

      <h2 className="text-2xl font-bold my-4 text-slate-700">
        Últimos Comentarios
      </h2>
      <Suspense fallback={<LastCommentsSkeleton />}>
        <LastComments />
      </Suspense>
    </section>
  );
}

export default Sidebar;
