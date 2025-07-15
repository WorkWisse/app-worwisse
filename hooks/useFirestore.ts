import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

import { db } from "@/config/firebase";

export const useFirestore = (collectionName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add document
  const addDocument = async (data: DocumentData) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setLoading(false);

      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error adding document");
      setLoading(false);
      throw err;
    }
  };

  // Get all documents
  const getDocuments = async (constraints: QueryConstraint[] = []) => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLoading(false);

      return documents;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error getting documents");
      setLoading(false);
      throw err;
    }
  };

  // Get single document
  const getDocument = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      setLoading(false);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error getting document");
      setLoading(false);
      throw err;
    }
  };

  // Update document
  const updateDocument = async (id: string, data: Partial<DocumentData>) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);

      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date(),
      });
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error updating document");
      setLoading(false);
      throw err;
    }
  };

  // Delete document
  const deleteDocument = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, id);

      await deleteDoc(docRef);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error deleting document");
      setLoading(false);
      throw err;
    }
  };

  return {
    addDocument,
    getDocuments,
    getDocument,
    updateDocument,
    deleteDocument,
    loading,
    error,
  };
};
