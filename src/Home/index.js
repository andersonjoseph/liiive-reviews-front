import { Suspense } from 'react';
import Sidebar from '../Sidebar';

import { NewShowList, NewShowListSkeleton } from './NewShowList';
import { ShowList } from './ShowList';
import { Hero, HeroSkeleton } from './Hero';

function Home() {
  return (
    <section className="grid grid-cols-12 gap-5">
      <main className="col-span-12 md:col-span-9">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-700">
          Nuevos Shows
        </h2>

        <Suspense fallback={<NewShowListSkeleton />}>
          <NewShowList />
        </Suspense>

        <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-700">Todos</h2>

        <ShowList />
      </main>

      <aside className="col-span-12 md:col-span-3">
        <Sidebar />
      </aside>
    </section>
  );
}

export default Home;
