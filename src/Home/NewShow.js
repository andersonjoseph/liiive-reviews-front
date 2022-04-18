import { Link } from 'wouter';

export function NewShow(props) {
  return (
    <Link href={`/show/${props.id}`}>
      <div
        className="cursor-pointer text-center w-full bg-center bg-cover rounded-2xl p-2"
        style={{
          backgroundImage: `url(${props.image}), linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.9)`,
          backgroundBlendMode: 'overlay',
        }}
      >
        <h3 className="text-2xl mt-32 mb-1 mt-16 text-white">{props.title}</h3>
        <span>{'⭐'.repeat(props.rating)}</span>
      </div>
    </Link>
  );
}
