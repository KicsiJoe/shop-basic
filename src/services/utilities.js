import {
  getOnePicUrlFromFirebase,
  savePicFirebase,
} from "../repositories/pic-repo";

export function checkInputs(inputs) {
  if (
    inputs.price.length == 0 ||
    inputs.title.length == 0 ||
    inputs["item-number"].length == 0
  ) {
    return false;
  } else {
    return true;
  }
}

export const getOnePicUrl = (picName, path) => {
  return getOnePicUrlFromFirebase(picName, path);
};

export const savePic = (userId, itemId, imageData) => {
  return savePicFirebase(userId, itemId, imageData)
};

export const timeFormatter = (date, separator1, tLetter, separator2, hide ) => {
  
    // let dateTime = timeFormatter(new Date(), '', '', '', true);
    // let dateTime1 = timeFormatter(new Date(), '-', 'T', ':', false);
    // let dateTime2 = timeFormatter(new Date(), '', '', '', false);
    
    // 20230522144602
    // 2023-05-22T14:46:02(+2)
    // 20230522144602(+2)


  const tzOffset = -date.getTimezoneOffset()/60;
  const diff = tzOffset >= 0 ? '+' : '-';
  let tz = ""
  if(!hide){
    tz =    '(' + diff +tzOffset+ ')'
  }
  const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear()
    +separator1 + pad(date.getMonth() + 1) +
    separator1 + pad(date.getDate()) +
    tLetter + pad(date.getHours()) +
    separator2 + pad(date.getMinutes()) +
    separator2 + pad(date.getSeconds()) + 
      tz
 
    

};

