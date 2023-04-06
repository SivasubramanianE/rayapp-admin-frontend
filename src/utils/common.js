export const convertObject = (obj) => {
    const convertedObj = {};
    for (const prop in obj) {
      if (obj[prop] !== null) {
        console.log(prop)
        convertedObj[prop] = Array.isArray(obj[prop]) ? obj[prop][0] : obj[prop];
      } 
    }
    return convertedObj;
  }