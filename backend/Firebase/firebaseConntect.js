const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const fbData = require("./firebaseData");

initializeApp({
  credential: cert(fbData),
});

const db = getFirestore();
module.exports = { db };
