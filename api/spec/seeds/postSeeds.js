const { ObjectId } = require("mongodb");

const seedPosts = [
  {
    content: "acebook is great",
    dateCreated: new Date('<2010-03-12>'),
    userID: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
  {
    content: "i miss facebook",
    dateCreated: new Date('<2023-01-17>'),
    userID: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
  {
    content: "anyone recognise this person robbed newsagents sunday pls dm",
    dateCreated: new Date('<2023-01-14>'),
    userID: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
  {
    content: "Josh has no strong views relating to Susan Sarandon",
    dateCreated: new Date('<2022-05-01>'),
    userID: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
  {
    content: "i hate my baby daddy",
    dateCreated: new Date('<2017-06-01>'),
    userID: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
]

module.exports = seedPosts;