import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Config/database.js";

export const fetchBlog = async (id) => {
  const blogRef = doc(db, "blogs", id);
  try {
    const docSnap = await getDoc(blogRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("Blog not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog:", error.message);
    throw error;
  }
};
