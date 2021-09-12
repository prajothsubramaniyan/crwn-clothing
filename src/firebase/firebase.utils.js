import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAyFYEOFtwdneTSYFlbWqr4_INqL0Jx35M",
    authDomain: "crwn-db-1baa1.firebaseapp.com",
    projectId: "crwn-db-1baa1",
    storageBucket: "crwn-db-1baa1.appspot.com",
    messagingSenderId: "734123522257",
    appId: "1:734123522257:web:d52f8bfbc124787ab2edf0",
    measurementId: "G-E02YDJ6Z6W"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {    
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapSnot = await userRef.get();

    if (!snapSnot.exists)
    {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt, 
                ...additionalData
            })
        }
        catch (error)
        {
            console.log("error creating users", error.message);
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    
    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const tranformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();    

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        }
    });

    return tranformedCollections.reduce((accumalator, collection) => {
        accumalator[collection.title.toLowerCase()] = collection;
        return accumalator;   
    },{});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




