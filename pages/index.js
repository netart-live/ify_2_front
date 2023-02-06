import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>ify_2_front</title>
        <meta name="description" content="ify_2_front" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {/* instagram posts */}
          {posts ? (
            posts.data.map((post) => (
              <div key={post.id}>
                {post.media_type === "VIDEO" ? (
                  <video src={post.media_url} />
                ) : (
                  <img src={post.media_url} alt={post.caption} />
                )}
                <p>{post.caption}</p>
                <p>{post.timestamp}</p>
                <p>{post.media_type}</p>
                <p>{post.permalink}</p>
              </div>
            ))
          ) : (
            <p>no posts</p>
          )}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const id = process.env.INSTAGRAM_USER_ID;
  const instaToken = process.env.INSTAGRAM_TOKEN;
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,media_type,permalink&access_token=${instaToken}`;

  const res = await fetch(url);
  const posts = await res.json();
  console.log(posts);

  return {
    props: {
      posts,
      // props for your component
    },
  };
}
