import Image from "next/image";

export default function YoutubeFrame({
  url,
  alt,
  videoId,
  title,
  description,
  width,
  height,
  href,
}) {
  return (
    <a
      target="_blank"
      href={href}
      className="flex flex-col my-4 gap-4 items-center"
    >
      <Image
        src={url}
        width={width}
        height={height}
        alt={alt}
        className="rounded-md"
        priority
      />

      <div className="flex flex-col">
        <h2 className="text-xl text-black">{title}</h2>
        <p className="flex text-gray-300">{description}</p>
      </div>
    </a>
  );
}
