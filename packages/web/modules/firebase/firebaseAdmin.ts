import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceKey/serviceKey.json';

// Check if the app is already initialized to avoid initializing multiple times
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const firestore = admin.firestore();

export { firestore };
