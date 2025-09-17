import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { format } from "date-fns";

export async function getStaticPaths() {
  // Get a list of all post file names and turn them into route paths
  const paths = getAllPostIds();
  // Tell Next.js to build only these paths
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Get the content for the selected post using its ID
  const postData = await getPostData(params.id);
  // Pass this post data as props to the Post component
  return { props: { postData } };
}

export default function Post({ postData }) {
  // Pull fields from the post data for easier use below
  const { title, date, role, house, affinity, image } = postData;

  // Render the character/post page layout and content
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <article className={utilStyles.articleCard}>
        {image && (
          <p>
            <img
              src={image}
              alt={title}
              className={utilStyles.portraitImage}
            />
          </p>
        )}

        <h1 className={utilStyles.headingXl}>{title}</h1>

        {(role || house) && (
          <div className={utilStyles.lightText} style={{ marginBottom: "0.5rem" }}>
            {role || ""} 
            {role && house ? " · " : ""}
            {house || ""}
          </div>
        )}

        {affinity && (
          <div className={utilStyles.lightText} style={{ marginBottom: "0.75rem" }}>
            Affinity: {affinity}
          </div>
        )}

  

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}



