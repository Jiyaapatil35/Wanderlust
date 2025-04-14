const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(dbUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    const listingsWithOwner = initData.data.map((obj) => ({...obj, owner: "67fbacfe80ea05d5d0561934"}));
    await Listing.insertMany(listingsWithOwner);
    console.log("data was initialized");
};

initDB();