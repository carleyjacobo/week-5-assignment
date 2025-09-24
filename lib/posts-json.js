import fs from "fs"; // Import Node's filesystem module to read files
import path from "path"; // Import Node's path module to build file paths

const postsJsonPath = path.join(process.cwd(), "data", "posts.json"); // Absolute path to data/posts.json from the project root

function readAllPosts() { // Helper: load and parse the JSON file into an array of post objects
  const jsonText = fs.readFileSync(postsJsonPath, "utf8"); // Read the JSON file as UTF-8 text
  const posts = JSON.parse(jsonText); // Parse the JSON string into a JavaScript array of posts
  return posts; // Return the parsed posts array
} 

export function getSortedPostsData() { // Return all posts sorted by date (newest first), matching the tutorial API
  const posts = readAllPosts(); // Load all posts from JSON
  posts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending using Date objects
  return posts; // Return the sorted posts
} 

export function getAllPostIds() { // Provide IDs in Next.js getStaticPaths shape
  const posts = readAllPosts(); // Load all posts from JSON
  return posts.map((p) => ({ params: { id: p.id } })); // Map to [{ params: { id } }] for static paths
}

export function getPostData(id) { // Return the full data for a single post by id
  const posts = readAllPosts(); // Load all posts from JSON
  const post = posts.find((p) => String(p.id) === String(id)); // Find the post with a matching id
  if (!post) { // If the post is not found
    throw new Error(`Post not found for id: ${id}`); // Fail clearly during build or request
  }
  return Object.assign({}, post); // Shallow copy without spread (validator-safe), includes contentHtml and extra fields
} 


