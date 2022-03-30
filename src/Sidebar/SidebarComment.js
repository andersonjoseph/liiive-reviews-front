import { Link } from 'wouter';

export default function SidebarComment(props) {
  return (
    <article className="mb-4">
      <figure className="flex justify-items-center gap-2">
        <img
          className="w-1/12"
          src={`https://ui-avatars.com/api/?name=${props.user.name.replaceAll(
            ' ',
            '+',
          )}&background=random&rounded=true`}
          alt={`${props.user.name} profile`}
        />
        <div>
          <p className="text-slate-700 font-bold">{props.user.name}</p>
        </div>
      </figure>
      <small className="block">⭐⭐⭐</small>
      <small className="text-slate-700">{props.comment}</small>
      <br />
      <small className="text-slate-500">
        En{' '}
        <Link className="underline" href={`/show/${props.show.id}`}>
          {props.show.title}
        </Link>
      </small>
    </article>
  );
}
