// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    doc, getFirestore, setDoc, collection, updateDoc, deleteDoc, getDocs,
    onSnapshot
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 //your firebase config gere 
};
let app: any = null;
let unsubscriber: any;
// Initialize Firebase


export default class FirebaseService {
  

    constructor() {
        if (!app) {

            app = initializeApp(firebaseConfig)

        }
    }

    async addData(collectionName: string, documentData: any) {
        try {
            const db = getFirestore(app);
            const collectionRef = doc(collection(db, collectionName));
            await setDoc(collectionRef, documentData);

        } catch (error) {
            console.log(error);

        }


    }

    async updateData(collectionName: any, documentId: string, fieldsToUpdate: any) {
        try {
            const db = getFirestore(app);
            const collectionRef = doc(db, collectionName, documentId);
            await updateDoc(collectionRef, fieldsToUpdate);

        } catch (error) {
            console.log(error);

        }


    }

    async deleteDocument(collectionName: any, documentId: string) {
        try {
            const db = getFirestore(app);
            await deleteDoc(doc(db, collectionName, documentId));

        } catch (error) {
            console.log(error);

        }
    }

    async readDocuments(collectionName: any) {
        let docs: any = []
        const db = getFirestore(app);
        const querySnapshot = await getDocs(collection(db, collectionName));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let docValue = doc.data()
            docValue["id"] = doc.id
            docs.push(docValue)
        });
        return docs


    }

    listenForChange(callback:any) {
        const db = getFirestore(app);
        const q = collection(db, "notes")
        this.destroySubscriber()
         unsubscriber = onSnapshot(q, (querySnapshot) => {
            const docs: any = [];
            querySnapshot.forEach((doc) => {
                let docValue = doc.data()
                docValue["id"] = doc.id
                docs.push(docValue)
            });
            callback(docs)

        });
    }

    destroySubscriber(){
        if(unsubscriber){
            unsubscriber()
        }

    }



}
