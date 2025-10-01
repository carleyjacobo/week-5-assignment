// Import Firebase SDK functions for app initialization and Firestore database
import { initializeApp } from "firebase/app"; // initialize the Firebase app
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore"; // Firestore functions

// Firebase configuration from environment variables (.env.local file)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // API key
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, // auth domain
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // project ID
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // storage bucket
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // messaging sender ID
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, // app ID
};

// Initialize the Firebase app with the config
const app = initializeApp(firebaseConfig);

// Get Firestore database instance
const db = getFirestore(app);

// Collection name in Firestore
const COLLECTION = "posts";

// Get all posts from the collection
export async function getSortedPostsData() {
  const snap = await getDocs(collection(db, COLLECTION)); // fetch all docs in "posts"
  const items = snap.docs.map((d) => {
    const data = d.data(); // read fields from each doc
    return {
      id: d.id, // document ID
      title: data.title, // post title
      date:
        typeof data.date === "string" // if date is a string, keep it
          ? data.date
          : data.date // if date is Firestore Timestamp, convert it
          ? data.date.toDate().toISOString().slice(0, 10)
          : null,
    };
  });
  return items; // return all posts
}

// Get all post IDs for Next.js getStaticPaths
export async function getAllPostIds() {
  const snap = await getDocs(collection(db, COLLECTION)); // fetch all docs
  return snap.docs.map((d) => ({ params: { id: d.id } })); // return IDs as params
}

// Get a single post by ID
export async function getPostData(id) {
  const ref = doc(db, COLLECTION, id); // reference to one document
  const snap = await getDoc(ref); // fetch the document
  const data = snap.data(); // get document fields
  return {
    id, // post ID
    title: data.title, // post title
    date:
      typeof data.date === "string" // check date type again
        ? data.date
        : data.date
        ? data.date.toDate().toISOString().slice(0, 10)
        : null,
    contentHtml: data.contentHtml, // post content
  };
}

