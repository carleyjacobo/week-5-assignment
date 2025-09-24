import Head from "next/head"; // Next.js <head> helper
import Layout from "../../components/layout"; // Page layout wrapper
import utilStyles from "../../styles/utils.module.css"; // CSS module classes
import { getAllPostIds, getPostData } from "../../lib/posts-json"; // JSON data functions
import { format } from "date-fns"; // Date formatting utility

export async function getStaticPaths() { // Build-time route generation
  const paths = getAllPostIds(); // Read all IDs from JSON
  return { paths, fallback: false }; // Pre-render only these paths
}

export async function getStaticProps({ params }) { // Build-time data fetch for a route
  const postData = await getPostData(params.id); // Get one post by id
  return { props: { postData } }; // Pass data to the component
}

export default function Post({ postData }) { // Post page component
  const { title, date, role, house, affinity, image } = postData; // Pull fields from data

  return ( // Render UI
    <Layout> {/* Page shell */}
      <Head> {/* Document head */}
        <title>{title}</title> {/* Page title */}
      </Head>

      <article className={utilStyles.articleCard}> {/* Main article container */}
        {image && ( /* Optional portrait image */
          <p> {/* Image wrapper */}
            <img
              src={image} // Image URL
              alt={title} // Accessible alt text
              className={utilStyles.portraitImage} // Styled portrait class
            />
          </p>
        )}

        <h1 className={utilStyles.headingXl}>{title}</h1> {/* Post title */}

        {(role || house) && ( /* Role/house line if present */
          <div className={utilStyles.lightText} style={{ marginBottom: "0.5rem" }}>
            {role || ""} {/* Role text */}
            {role && house ? " · " : ""} {/* Separator if both exist */}
            {house || ""} {/* House text */}
          </div>
        )}

        {affinity && ( /* Affinity line if present */
          <div className={utilStyles.lightText} style={{ marginBottom: "0.75rem" }}>
            Affinity: {affinity} {/* Affinity value */}
          </div>
        )}

        {date && ( /* Date line if present */
          <p className={utilStyles.lightText} style={{ marginBottom: "0.75rem" }}>
            <time dateTime={date}>{format(new Date(date), "PPP")}</time> {/* Formatted date */}
          </p>
        )}

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> {/* Post body HTML */}
      </article>
    </Layout>
  );
}




