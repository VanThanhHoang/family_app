import { doc, setDoc } from "firebase/firestore"; 
import  db  from "../firebaseConfig";
const saveDataToHistory = async (data) => {
    const date_id = new Date().toISOString();
    await setDoc(doc(db, "history", date_id), data);
}
export default saveDataToHistory;