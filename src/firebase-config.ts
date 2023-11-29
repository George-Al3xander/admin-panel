import { initializeApp } from "firebase/app";
import {collection} from "firebase/firestore"
import {getFirestore} from "@firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain:  import.meta.env.VITE_AUTH_DOMAIN,
  projectId:  import.meta.env.VITE_PROJECT_ID,
  storageBucket:  import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:  import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const projectsCollectionRef = collection(db, "projects");
export const skillsCollectionRef = collection(db, "skills");
export const linksCollectionRef = collection(db, "links");
export const storage = getStorage(app);
