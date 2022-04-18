import { Link } from 'wouter';

export default function SidebarShow(props) {
  return (
    <article className="flex gap-2 mb-2">
      <Link href={`/show/${props.id}`}>
        <img
          className="cursor-pointer w-3/12 rounded-lg"
          src={props.image}
          alt={props.title}
        />
      </Link>
      <div className="flex flex-col">
        <Link href={`/show/${props.id}`}>
          <h3 className="cursor-pointer text-1xl font-bold text-slate-700">
            {props.title}
          </h3>
        </Link>
        <small className="text-slate-700">
          <span>{'⭐'.repeat(props.rating)}</span>
        </small>
      </div>
    </article>
  );
}
