// pages/index.js
import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { format } from "date-fns";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Welcome to Pan Academy — view character profiles below.</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Characters</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, role, house }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              {(role || house) && (
                <small className={utilStyles.lightText}>
                  {role || ""}{role && house ? " · " : ""}{house || ""}
                </small>
              )}
              {(role || house) && <br />}
              <small className={utilStyles.lightText}>
                {format(new Date(date), "LLLL d, yyyy")}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}





