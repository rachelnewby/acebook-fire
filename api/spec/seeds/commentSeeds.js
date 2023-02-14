const { ObjectId } = require("mongodb");

const seedComments = [
    {
    user_id: new ObjectId('63ea4c50c5b85f680127153c'),
    post_id: new ObjectId('63e632ba9e570e97c1bbbae9'),
    comment: "i agree with this"
},
{
    user_id: new ObjectId('63ea4c50c5b85f680127153c'),
    post_id: new ObjectId('63e632ba9e570e97c1bbbae9'),
    comment: "i  do not agree with this"
},
{
    user_id: new ObjectId('63ea4c50c5b85f680127153c'),
    post_id: new ObjectId('63e632ba9e570e97c1bbbaea'),
    comment: "i love this"
},
{
    user_id: new ObjectId('63e632ba9e570e97c1bbbae2'),
    post_id: new ObjectId('63e632ba9e570e97c1bbbaea'),
    comment: "i find this helpful"
},
{
    user_id: new ObjectId('63e632ba9e570e97c1bbbae2'),
    post_id: new ObjectId('63e632ba9e570e97c1bbbaec'),
    comment: "i hope youre having a great time"
},
{
    user_id: new ObjectId('63e632ba9e570e97c1bbbae5'),
    post_id: new ObjectId('63e632ba9e570e97c1bbbaec'),
    comment: "hahahahah"
}
]

module.exports = seedComments;