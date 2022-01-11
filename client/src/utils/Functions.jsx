export const capitalizeFirstLetter = (sentence) => {
  const words = sentence.split(" "); 
  const caps = words.map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
  const newSentence = caps.join(" ");

  const secondWord = newSentence.split("-");
  const secondCap = secondWord.map(word => word.charAt(0).toUpperCase() + word.substr(1))
  const finalSentence = secondCap.join("-");
  
  return finalSentence
}




