import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts-json";
import { format } from "date-fns";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
}

export default function Home({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>Posts</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, summary }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              {date && (
                <>
                  <br />
                  <small className={utilStyles.lightText}>
                    <time dateTime={date}>{format(new Date(date), "PPP")}</time>
                  </small>
                </>
              )}
              {summary && <p className={utilStyles.lightText}>{summary}</p>}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}





