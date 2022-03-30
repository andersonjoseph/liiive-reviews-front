export function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-3 w-full"
    >
      {props.children}
    </button>
  );
}
