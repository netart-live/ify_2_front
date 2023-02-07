export default function InstagramFrame({ vsrc, isrc, caption, type, href }) {
  return (
    <a target="_blank" href={href}>
      {type === "VIDEO" ? (
        <video className="my-4 gap-4" src={vsrc} autoPlay loop controls muted />
      ) : (
        <img className=" my-4 gap-4" src={isrc} alt={caption} />
      )}
      <div className="flex flex-col">
        <p className="text-xl font-montaga">{caption}</p>
      </div>
    </a>
  );
}
