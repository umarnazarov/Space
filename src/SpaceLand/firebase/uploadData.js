const firestoreService = require("firestore-export-import")
const serviceAccount = require("./serviceAccountKey.json")
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const databaseURL = "https://space-72d33-default-rtdb.firebaseio.com"

firestoreService.initializeApp(serviceAccount, databaseURL);

firestoreService.restore("data.json")