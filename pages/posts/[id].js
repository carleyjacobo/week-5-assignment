// pages/posts/[id].js
import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { format } from "date-fns";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

export default function Post({ postData }) {
  const { title, date, role, house, affinity, image } = postData;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <article>
        {image && (
          <p>
            <img
              src={image}
              alt={title}
              style={{ width: "160px", height: "160px", borderRadius: "9999px", objectFit: "cover" }}
            />
          </p>
        )}

        <h1 className={utilStyles.headingXl}>{title}</h1>

        {(role || house) && (
          <div className={utilStyles.lightText} style={{ marginBottom: "0.5rem" }}>
            {role || ""}{role && house ? " · " : ""}{house || ""}
          </div>
        )}

        {affinity && (
          <div className={utilStyles.lightText} style={{ marginBottom: "0.75rem" }}>
            Affinity: {affinity}
          </div>
        )}

        <div className={utilStyles.lightText} style={{ marginBottom: "1rem" }}>
          {format(new Date(date), "LLLL d, yyyy")}
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}


