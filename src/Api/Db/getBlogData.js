import { db } from "../../Config/database.js";
import { collection, getDocs } from "firebase/firestore";

export const fetchBlogPosts = async () => {
  const blogPosts = [];
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((doc) => {
    blogPosts.push({ id: doc.id, ...doc.data() });
  });
  return blogPosts;
};
