const { initializeApp, cert } = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const fbData = require("./firebaseData.json");

initializeApp({
  credential: cert(fbData),
});

const db = getFirestore();
module.exports = { db };
