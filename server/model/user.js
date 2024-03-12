const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { hashPassword } = require("../utils/bcrypt");

const getCollection = () => {
  const db = getDatabase();
  const userCollection = db.collection("users");

  return userCollection;
};

const findAllUser = async () => {
  // const users = await getCollection().find(
  //   {},
  //   {
  //     projection: {
  //       password: 0
  //     }
  //   }
  // ).toArray();
  const agg =[
    {
      $lookup: {
        from: 'followers', 
        localField: '_id', 
        foreignField: 'followingId', 
        as: 'followers'
      },
    },
    {
      $project: {
        password: 0
      }
    }
  ]

  const users = await getCollection().aggregate(agg).toArray();
  return users;
};

const findOneUserById = async (id) => {
  const agg =[
    {
      $match: {
        _id : new ObjectId(id)
      }
    }, 
    {
      '$lookup': {
        'from': 'followers', 
        'localField': '_id', 
        'foreignField': 'followerId', 
        'as': 'followers'
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'followers.followingId', 
        'foreignField': '_id', 
        'as': 'userFollowers'
      }
    }, {
      '$lookup': {
        'from': 'followers', 
        'localField': '_id', 
        'foreignField': 'followingId', 
        'as': 'followings'
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'followings.followerId', 
        'foreignField': '_id', 
        'as': 'userFollowings'
      }
    },
    {
      $project: {
        password: 0,
        'userFollowings.password': 0,
        'userFollowers.password': 0
      }
    }
  ]
  const users = await getCollection().aggregate(agg).toArray();

  const user = await getCollection().findOne({
    _id: new ObjectId(id),
  });
  // console.log(users);
  return users[0] ;
};
const findOneUserByUsername = async (username) => {
  const agg =[
    {
      $match: {
        username: { $regex: `.*${username}.*`}
      }
    }, 
    {
      '$lookup': {
        'from': 'followers', 
        'localField': '_id', 
        'foreignField': 'followerId', 
        'as': 'followers'
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'followers.followingId', 
        'foreignField': '_id', 
        'as': 'userFollowers'
      }
    }, {
      '$lookup': {
        'from': 'followers', 
        'localField': '_id', 
        'foreignField': 'followingId', 
        'as': 'followings'
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'followings.followerId', 
        'foreignField': '_id', 
        'as': 'userFollowings'
      }
    },
    {
      $project: {
        password: 0,
        'userFollowings.password': 0,
        'userFollowers.password': 0
      }
    }
  ]

  const users = await getCollection().aggregate(agg).toArray()
  return users;
};
const findOneUserByEmail = async (email) => {
  const user = await getCollection().findOne({
    email: email,
  }
  );

  return user;
};

const findOneUsername = async (username) => {

  const user = await getCollection().findOne({
    username: username
  })

  return user
}

const addUser = async(payload) => {
  payload.password = hashPassword(payload.password);
  
  const collection = getCollection();
  const newUser = await collection.insertOne(payload);
  const user = await collection.findOne(
    {
      _id: newUser.insertedId,
    },
    {
      projection: {
        password: 0,
      }
    }
  );

  return user;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


module.exports = {
  findAllUser,
  findOneUserById,
  findOneUserByUsername,
  addUser,
  validateEmail,
  findOneUserByEmail,
  findOneUsername
};
