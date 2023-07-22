import path from "path";
import admin from "firebase-admin";

const serviceAccount = require(path.join(
    __dirname,
    "..",
    "..",
    "credentials.json"
));

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth(firebaseApp);
export const db = admin.firestore(firebaseApp);

db.settings({ ignoreUndefinedProperties: true });
