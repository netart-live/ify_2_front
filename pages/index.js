import Head from "next/head";
import useFacebook from "../hooks/useFacebook.hook";
import YoutubeFrame from "@/components/YoutubeFrame";
import InstagramFrame from "@/components/instagramFrame";

export default function Home({ instaPosts, facebookPosts, youtubePosts }) {
  useFacebook({ addTrack: true });
  // console.log("facebook:", facebookPosts);
  // console.log("instagram:", instaPosts);
  // console.log("youtube:", youtubePosts);

  return (
    <>
      <Head>
        <title>ify_2_front</title>
        <meta name="description" content="ify_2_front" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-row justify-center">
        {/* youtube post */}
        <ul className="flex flex-col w-96">
          {youtubePosts.items.map((post) => {
            return (
              <li
                key={post.id.videoId}
                className="flex flex-col items-center p-4"
              >
                <YoutubeFrame
                  href={`https://www.youtube.com/watch?v=${post.id.videoId}`}
                  url={post.snippet.thumbnails.medium.url}
                  alt={post.snippet.title}
                  width={post.snippet.thumbnails.medium.width}
                  height={post.snippet.thumbnails.medium.height}
                  videoId={post.id.videoId}
                  title={post.snippet.title}
                  description={post.snippet.description}
                />
              </li>
            );
          })}
          {/* instagram post */}
          <li
            key={instaPosts.data[0].id}
            className="flex flex-col items-center p-4"
          >
            <InstagramFrame
              href={instaPosts.data[0].permalink}
              vsrc={instaPosts.data[0].media_url}
              isrc={instaPosts.data[0].media_url}
              caption={instaPosts.data[0].caption}
              type={instaPosts.data[0].media_type}
            />
          </li>
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
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

  //! INSTAGRAM
  // ? настроить обновление токена через заданное время
  const instaToken = process.env.INSTAGRAM_TOKEN;
  const instaUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${instaToken}`;
  const instaRes = await fetch(instaUrl);
  const instaPosts = await instaRes.json();

  //! YOUTUBE
  const youtubeApiKey = process.env.YOUTUBE_API_KEY;
  const channelID = process.env.YOUTUBE_CHANNEL_ID;
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
