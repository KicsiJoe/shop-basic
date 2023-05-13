import { app } from "./firebase";
import { getStorage, ref, getDownloadURL , listAll} from "firebase/storage";


export const getOnePicUrlFromFirebase = (picName, path) => {
    console.log(`${path}/${picName}`);
  const storage = getStorage(app);

  let spaceRef = ref(storage, `${path}/${picName}`);
 
 return getDownloadURL(spaceRef)
 

};
