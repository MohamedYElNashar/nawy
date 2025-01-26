db = connect("mongodb://nawy:nawypassword@localhost:27017/admin");

db = db.getSiblingDB("core"); // Switch to "core" database

// Create a collection as an example
db.createCollection("testCollection");
db.testCollection.insertOne({ message: "Database initialized!" });
