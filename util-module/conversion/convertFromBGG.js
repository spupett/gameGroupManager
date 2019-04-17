module.exports = {
  convertUser: (bggUserData) => {
    return {
      bggName: bggUserData.user._attributes.name,
      firstName: bggUserData.user.firstname._attributes.value,
      lastName: bggUserData.user.lastname._attributes.value,
      email: '',
      _id: bggUserData.user._attributes.id
    }
  },

  convertGameListData: (bggGameListData) => {
    return gameList = bggGameListData.items.item.map((item) => {
      return {
        name: item.name._text,
        thumbnail: item.thumbnail._text,
        id: item._attributes.objectid
      }
    });
  },

  convertGameDetail: (bggGameData) => {

  }
}