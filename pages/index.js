import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>WORKS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>WORKS</h1>
          <p>Explore our projects and works from the Notion database.</p>
        </header>

        <div className={styles.postsGrid}>
          {posts.map((post) => {
            const title =
              post.properties?.Name?.title?.[0]?.plain_text || "Untitled";
            const thumbnail =
              post.properties?.Thumbnail?.files?.[0]?.file?.url ||
              "/default-thumbnail.jpg";
            const date = new Date(post.last_edited_time).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            );

            return (
              <div key={post.id} className={styles.postCard}>
                <Link href={`/${post.id}`}>
                  <a>
                    <img
                      src={thumbnail}
                      alt={title}
                      className={styles.thumbnail}
                    />
                    <h3 className={styles.postTitle}>{title}</h3>
                    <p className={styles.postDate}>{date}</p>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
