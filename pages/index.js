import Head from "next/head";
import useFacebook from "../hooks/useFacebook.hook";
import YoutubeFrame from "@/components/youtubeFrame";

export default function Home({ instaPosts, facebookPosts, youtubePosts }) {
  useFacebook({ addTrack: true });
  // console.log("facebook:", facebookPosts);
  console.log("instagram:", instaPosts);
  console.log("youtube:", youtubePosts);

  return (
    <>
      <Head>
        <title>ify_2_front</title>
        <meta name="description" content="ify_2_front" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-row justify-center">
        {/* youtube posts */}
        <ul className="flex flex-col w-96">
          {youtubePosts.items.map((post, key) => {
            return (
              <li
                key={post.id.videoId}
                className="flex flex-col items-center p-4"
              >
                <a href={`https://www.youtube.com/watch?v=${post.id.videoId}`}>
                  <YoutubeFrame
                    url={post.snippet.thumbnails.medium.url}
                    alt={post.snippet.title}
                    width={post.snippet.thumbnails.medium.width}
                    height={post.snippet.thumbnails.medium.height}
                    videoId={post.id.videoId}
                    title={post.snippet.title}
                    description={post.snippet.description}
                  />
                </a>
              </li>
            );
          })}

          {/* instagram posts */}
          {instaPosts.data.map((post) => (
            <li key={post.id} className="flex flex-col items-center p-4">
              <a href={post.permalink}>
                {post.media_type === "VIDEO" ? (
                  <video
                    className="my-4 gap-4"
                    src={post.media_url}
                    autoPlay
                    loop
                    controls
                    muted
                  />
                ) : (
                  <img
                    className=" my-4 gap-4"
                    src={post.media_url}
                    alt={post.caption}
                  />
                )}
                <div className="flex flex-col">
                  <p className="text-xl">{post.caption}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  //! INSTAGRAM
  // ? настроить обновление токена через заданное время
  const instaToken = process.env.INSTAGRAM_TOKEN;
  const instaUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${instaToken}`;
  const instaRes = await fetch(instaUrl);
  const instaPosts = await instaRes.json();

  // //! FACEBOOK
  // //? GRAPH API
  const facebookPosts = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" },
    { id: 4, title: "Post 4" },
  ];

  // const facebookToken = process.env.FACEBOOK_TOKEN;
  // const facebookUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${facebookToken}`;
  // const facebookRes = await fetch(facebookUrl);
  // const facebookPosts = await facebookRes.json();

  //! YOUTUBE
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const channelID = "UCkw5wAnRVBAkWjCiTcjJjAw"; //dimadem
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?part=id%2Csnippet&channelId=${channelID}&type=video&maxResults=1&key=${youtubeApiKey}`;
  const youtubeRes = await fetch(youtubeUrl);
  const youtubePosts = await youtubeRes.json();

  return {
    revalidate: 86400,
    props: {
      instaPosts,
      facebookPosts,
      youtubePosts,
      // props for your component
    },
  };
}
