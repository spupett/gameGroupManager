function hasProp (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

const objMask = {
  name: '',
  bggId: -1,
  thumbnail: '',
  image: '',
  playTime: -1,
  description: '',
  bggLink: '',
  playerCount: {
      min: -1,
      max: -1,
      best: -1
  },
  category: [],
  mechanics: [], 
  display: true
}

module.exports = {
  maskGameDetail: (gameDetails) => {
    const keys = Object.keys(objMask);
    const maskedDetails = keys.reduce((acc, key) => {
      if(hasProp(gameDetails, key)) {
        acc[key] = gameDetails[key];
      } else {
        acc[key] = objMask[key];
      }
      return acc;
    }, {})
    return maskedDetails;
  }
}