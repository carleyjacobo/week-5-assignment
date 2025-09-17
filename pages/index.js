import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import { format } from "date-fns";

export async function getStaticProps() {
  // Get the list of all posts and sort them by date
  const allPostsData = getSortedPostsData();
  // Pass the list as props to the Home component
  return { props: { allPostsData } };
}

export default function Home({ allPostsData }) {
  // Render the home page layout and content
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={`${utilStyles.headingMd} ${utilStyles.sectionCard}`}>
        <p>Welcome to Pan Academy — view character profiles below.</p>
      </section>

      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
        style={{ marginTop: "1rem" }}
      >
        <h2 className={utilStyles.headingLg}>Characters</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, role, house }) => (
            <li
              className={`${utilStyles.listItem} ${utilStyles.listItemCard}`}
              key={id} // Unique key for each list item
            >
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              {(role || house) && (
                <>
                  <small
                    className={`${utilStyles.lightText} ${utilStyles.metaText}`}
                  >
                    {role || ""} 
                    {role && house ? " · " : ""}
                    {house || ""}
                  </small>
                  <br />
                </>
              )}
              
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}




