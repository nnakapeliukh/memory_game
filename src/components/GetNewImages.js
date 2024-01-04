async function getData() {
  const tempId = Math.floor(Math.random() * Math.floor(99));
  const rawItems = await fetch(`https://api.magicthegathering.io/v1/cards?page=${tempId}`)
  
  const items = await rawItems.json();
  return await items;
}


const GetNewImages = async (difficulty) => {
  const rawData = await getData();
  const cardArray = rawData.cards;
  let cardIds = [];
  let tempId = 0;
  //pick random card
  //do until id is unique and the card with that id has url
  for (let i = 0; i < difficulty; i++) {
    do {
      tempId = Math.floor(Math.random() * Math.floor(99));
    } while (!(CheckIsUnique(cardIds, tempId) && cardArray[tempId].imageUrl));
    cardIds.push(tempId);
  }

  //update state with new URLs
  let tempDeckImageUrls = [];
  for (let i = 0; i < cardIds.length; i++) {
    tempDeckImageUrls.push(cardArray[cardIds[i]].imageUrl);
  }
  // console.log(tempDeckImageUrls);
  return new Promise((resolve, reject) => {
    resolve(tempDeckImageUrls);
  });
};

const CheckIsUnique = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return false;
    }
  }
  return true;
};

export { GetNewImages, CheckIsUnique };

//////////////////////////////////////////////////////
