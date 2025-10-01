// Import Firebase SDK functions for app initialization and Firestore database
import { initializeApp } from "firebase/app"; // used to initialize the Firebase app
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore"; // used to connect and query Firestore

// Firebase configuration object from your Firebase project (Pan Academy)
const firebaseConfig = {
  apiKey: "AIzaSyCsaKNhXgc5CSxxRz5gW_JenNMZB8yTf1Y", // API key for your Firebase project
  authDomain: "pan-academy-95620.firebaseapp.com", // domain used for Firebase Auth
  projectId: "pan-academy-95620", // unique project ID
  storageBucket: "pan-academy-95620.firebasestorage.app", // storage bucket for the project
  messagingSenderId: "181950716285", // sender ID for Firebase messaging
  appId: "1:181950716285:web:da470f9896158cfd991414", // unique app ID
  measurementId: "G-4963MRQ7P4" // optional analytics ID (not needed here)
};

// Initialize the Firebase app with your config
const app = initializeApp(firebaseConfig);

// Get an instance of Firestore connected to your app
const db = getFirestore(app);

// The Firestore collection name we’ll be working with
const COLLECTION = "posts";

// Function: get all posts for the home page
export async function getSortedPostsData() {
  const snap = await getDocs(collection(db, COLLECTION)); // fetch all docs in "posts"
  const items = snap.docs.map((d) => {
    const data = d.data(); // read fields from each doc
    return {
      id: d.id, // document ID becomes the post slug
      title: data.title, // post title string
      // normalize date field: string or Firestore Timestamp
      date:
        typeof data.date === "string"
          ? data.date
          : data.date ? data.date.toDate().toISOString().slice(0, 10) : null,
    };
  });
  return items; // return array of posts
}

// Function: get all post IDs (needed for Next.js getStaticPaths)
export async function getAllPostIds() {
  const snap = await getDocs(collection(db, COLLECTION)); // fetch all docs
  return snap.docs.map((d) => ({ params: { id: d.id } })); // map IDs to { params: { id } }
}

// Function: get data for a single post
export async function getPostData(id) {
  const ref = doc(db, COLLECTION, id); // reference to one document
  const snap = await getDoc(ref); // fetch the document
  const data = snap.data(); // get its fields
  return {
    id, // post ID (slug)
    title: data.title, // post title
    // normalize date again
    date:
      typeof data.date === "string"
        ? data.date
        : data.date ? data.date.toDate().toISOString().slice(0, 10) : null,
    contentHtml: data.contentHtml // main content field
  };
}
