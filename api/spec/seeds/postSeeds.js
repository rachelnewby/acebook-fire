const { ObjectId } = require("mongodb");

const seedPosts = [
  {
    content: "acebook is great",
    date_created: new Date('<2010-03-12>'),
    user_id: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
  {
    content: "i miss facebook",
    date_created: new Date('<2023-01-17>'),
    user_id: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
  {
    content: "anyone recognise this person robbed newsagents sunday pls dm",
    date_created: new Date('<2023-01-14>'),
    user_id: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
  {
    content: "Josh has no strong views relating to Susan Sarandon",
    date_created: new Date('<2022-05-01>'),
    user_id: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
  {
    content: "i hate my baby daddy",
    date_created: new Date('<2017-06-01>'),
    user_id: new ObjectId('63ea4c50c5b85f680127153c'),
    likes: []
  },
]

module.exports = seedPosts;