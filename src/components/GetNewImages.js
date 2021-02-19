import mtgsdk from "mtgsdk";

const mtg = mtgsdk;

const GetNewImages = async (difficulty) => {
  let getNewCard = await mtg.card.where({ supertypes: "legendary" });
  let cardIds = [];
  let tempId = 0;
  //pick random card
  //do until id is unique and the card with that id has url
  for (let i = 0; i < difficulty; i++) {
    do {
      tempId = Math.floor(Math.random() * Math.floor(99));
    } while (!(CheckIsUnique(cardIds, tempId) && getNewCard[tempId].imageUrl));
    cardIds.push(tempId);
  }
  //update state with new URLs
  let tempDeckImageUrls = [];
  for (let i = 0; i < cardIds.length; i++) {
    tempDeckImageUrls.push(getNewCard[cardIds[i]].imageUrl);
  }
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
