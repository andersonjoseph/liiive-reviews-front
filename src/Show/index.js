import axios from 'axios';
import { Suspense } from 'react';
import { suspend } from 'suspend-react';
import { getShow } from '../API';

import CommentForm from './CommentForm';
import CommentList from './CommentList';

function ShowSectionSkeleton() {
  return (
    <div className="animate-pulse col-span-12 md:col-span-8 rounded-2xl flex p-8 bg-slate-300 h-80 md:h-screen" />
  );
}

function ShowSection(props) {
  const show = suspend(async () => {
    const show = await getShow(props.id);
    show.image = axios.defaults.baseURL + '/public/' + show.image;
    return show;
  }, 'show-' + props.id);

  return (
    <div
      className="col-span-12 md:col-span-8 rounded-2xl flex p-8 bg-cover bg-center md:h-screen"
      style={{
        backgroundImage: `url(${show.image}), linear-gradient(rgba(0,0,0,0.0),rgba(0,0,0,1.0)`,
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="self-end">
        <span>{'⭐'.repeat(show.rating)}</span>
        <h2 className="text-4xl font-bold text-white mb-4">{show.title}</h2>
        <p className="text-white">{show.description}</p>
        <a className="text-white underline font-bold mt-4" href={show.link}>
          Ir al evento
        </a>
      </div>
    </div>
  );
}

function Show(props) {
  return (
    <section className="grid grid-cols-12 gap-5">
      <Suspense fallback={<ShowSectionSkeleton />}>
        <ShowSection id={props.id} />
      </Suspense>

      <aside className="col-span-12 md:col-span-4 md:overflow-y-scroll p-2 md:h-screen">
        <h3 className="text-2xl font-bold text-slate-700 mb-4">
          Deja un comentario
        </h3>

        <CommentForm show={props.id} />
        <CommentList show={props.id} />
      </aside>
    </section>
  );
}

export default Show;
