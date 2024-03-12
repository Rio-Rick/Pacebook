const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

const getCollection = () => {
  const db = getDatabase();
  const postCollection = db.collection("posts");

  return postCollection;
};

const findAllPost = async () => {
  const agg = [
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'authorId', 
        'foreignField': '_id', 
        'as': 'authorUser'
      }
    }
  ]

  const posts = await getCollection().aggregate(agg).toArray();
  // const posts = await getCollection().find({},{
  //   sort: {
  //     createdAt: -1
  //   },
  // }).toArray();

  return posts;
};

const findOnePostById = async (id) => {
  const agg = [
    {
      $match: {
        _id: new ObjectId(id)
      }
    },
    {
      $sort: {
        createdAt: -1
      }
    },
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'authorId', 
        'foreignField': '_id', 
        'as': 'authorUser'
      }
    },
    {
      $project: {
        'authorUser.password': 0
      }
    }
  ]

  const post = await getCollection().aggregate(agg).toArray();

  return post[0];
};


module.exports = {
  findAllPost,
  findOnePostById,
};
