// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import crypto from "crypto";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestoreDatabase } from "@/services/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const getComment = async () => {
    if (req.query.slug === "getAllUserComments") {
      const userCommentData = [];
      const querySnapshot = await getDocs(
        collection(firestoreDatabase, "comments")
      );
      querySnapshot.forEach((doc) => {
        Object.entries(doc.data()).forEach(([id, item]) => {
          if (item.userEmail === req.query.mail) {
            const newItem = { ...item, id };
            userCommentData.push(newItem);
          }
        });
      });

      res.status(200).json(userCommentData);
    } else {
      const docRef = doc(
        firestoreDatabase,
        "comments",
        req.query.slug as string
      );
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.status(200).json(docSnap.data());
      } else {
        res.status(500).json({ success: false });
      }
    }
  };

  const addComment = async (body) => {
    try {
      await setDoc(
        doc(firestoreDatabase, "comments", `${body.slug}`),
        {
          [crypto.randomUUID()]: { ...body, timestamp: serverTimestamp() },
        },
        { merge: true }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };

  const updateComment = async (body) => {
    try {
      const commentRef = doc(firestoreDatabase, "comments", body.gameSlug);
      await updateDoc(commentRef, {
        [`${body.commentId}.comment`]: body.comment,
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };

  const deleteComment = async (body) => {
    try {
      const frankDocRef = doc(firestoreDatabase, "comments", body.gameSlug);
      await updateDoc(frankDocRef, {
        [`${body.commentId}`]: deleteField(),
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };

  switch (req.method || "GET") {
    case "GET":
      getComment();
      break;
    case "POST":
      addComment(req.body);
      break;
    case "PUT":
      updateComment(JSON.parse(req.body));
      break;
    case "DELETE":
      deleteComment(JSON.parse(req.body));
      break;
    default:
      res.status(405).end({ success: false });
      break;
  }
}
