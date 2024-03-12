const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

const typeDefs = `#graphql
    type Follow {
        _id: ID
        followingId: ID
        followerId: ID
        createdAt: String
        updatedAt: String
    }

    type AddRespon {
        message: String
        data: Follow
    }
    
    type Mutation {
        followed(followerId:ID): AddRespon
    }
`;

const resolvers = {

    Mutation: {
        followed: async(_parent, { followerId }, contextValue) => {
            const db = getDatabase();
            const followCollection = db.collection("followers");
            // console.log(followingId);
            const { userId, username } = await contextValue.auth()
            console.log(username);
            const find = await followCollection.findOne({
                followingId: new ObjectId(userId),
                followerId: new ObjectId(followerId)
            })
            // console.log(find);
            if(find) {
                const del = await followCollection.deleteOne({
                    followingId: new ObjectId(userId),
                    followerId: new ObjectId(followerId)
                })
                // console.log(del);
                return {
                    message: 'You unfollowed',
                    data: find
                }
            } else {
                const date = new Date()
                const newFollower = await followCollection.insertOne({
                    followingId: new ObjectId(userId),
                    followerId: new ObjectId(followerId),
                    createdAt: date,
                    updatedAt: date
                })
                const follow = await followCollection.findOne({
                    _id: newFollower.insertedId
                })
                return {
                    message: 'you success followed',
                    data: follow
                }
            }

        }
    },
};

module.exports = {
    followTypeDefs: typeDefs,
    followResolvers: resolvers,
};

