import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import { getAllPostIds, getPostData } from "../../lib/posts-firebase";
import { format } from "date-fns";

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

export default function Post({ postData }) {
  const { title, date, role, house, affinity, image, contentHtml } = postData;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>

      <article className={utilStyles.articleCard}>
        {image ? (
          <p>
            <img src={image} alt={title} className={utilStyles.portraitImage} />
          </p>
        ) : null}

        <h1 className={utilStyles.headingXl}>{title}</h1>

        {role || house ? (
          <div className={utilStyles.lightText} style={{ marginBottom: "0.5rem" }}>
            {role || ""}
            {role && house ? " · " : ""}
            {house || ""}
          </div>
        ) : null}

        {affinity ? (
          <div className={utilStyles.lightText} style={{ marginBottom: "0.75rem" }}>
            Affinity: {affinity}
          </div>
        ) : null}

        {date ? (
          <p className={utilStyles.lightText} style={{ marginBottom: "0.75rem" }}>
            <time dateTime={date}>{format(new Date(date), "PPP")}</time>
          </p>
        ) : null}

        <div dangerouslySetInnerHTML={{ __html: contentHtml || "" }} />
      </article>
    </Layout>
  );
}





