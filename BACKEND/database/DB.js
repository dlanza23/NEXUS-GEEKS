import mongoose from "mongoose"; // Import moongose
const MONGO_URL="mongodb://localhost/NEXUSDB"
const db = async() =>{
  await mongoose
    .connect(MONGO_URL)
    .then(()=>console.log("DB funcionando"))
    .catch((error) => console.error(error))
}
export default db;

