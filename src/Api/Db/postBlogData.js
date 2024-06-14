import { db } from "../../Config/database.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const saveBlog = async (req, res) => {
  const {
    name,
    image,
    imageText,
    title,
    description,
    tags,
    category,
    content,
  } = req.body;

  try {
    const docRef = await addDoc(collection(db, "blogs"), {
      name: name,
      image: image,
      imageText: imageText,
      title: title,
      description: description,
      tags: tags,
      category: category,
      content: content,
      createdAt: serverTimestamp(),
    });

    res
      .status(200)
      .json({ message: "Blog post added successfully", id: docRef.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding blog post", error: error.message });
  }
};
