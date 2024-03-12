const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const {
  findAllUser,
  findOneUserByUsername,
  findOneUserById,
  addUser,
  validateEmail,
  findOneUserByEmail,
  findOneUsername,
} = require("../model/user");
const { comparePassword } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");

const typeDefs = `#graphql
    type User {
        _id: ID
        name: String
        username: String
        email: String
        password: String
        followers: [Follow]
        userFollowers: [User]
        followings: [Follow]
        userFollowings: [User]
    }

    type Message {
        token: String
    }

    input NewUser {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getUsers: [User]
        getUsername(username:String): [User]
        getUserId(userId: String): User
        getUserNow: User
    }
 
    type Mutation {
        register(payload: NewUser): User
        login(username: String!, password: String!): Message
    }
`;

const resolvers = {
  Query: {
    getUsers: async (_parent, {}, contextValue) => {
      await contextValue.auth();

      const users = await findAllUser();
      return users;
    },
    getUsername: async (_parent, args, contextValue) => {
      await contextValue.auth();

      const user = await findOneUserByUsername(args.username);
      return user;
    },
    getUserId: async (_parent, args, contextValue) => {
      await contextValue.auth();

      const user = await findOneUserById(args.userId);
      return user;
    },
    getUserNow: async(_parent, {}, contextValue) => {
      const { userId } = await contextValue.auth()
      const user = await findOneUserById(userId);
      return user
    }
  },
  Mutation: {
    register: async (_parent, { payload }) => {
      const findUser = await findOneUserByEmail(payload.email);
      if (payload.password.length < 5)
        throw new Error("minimal password lenght is 5");
      if (validateEmail(payload.email) === null)
        throw new Error("must be email format");
      const username = await findOneUsername(payload.username);
      // console.log(username);
      if (username) throw new Error("Username must be unique");
      if (findUser) throw new Error("email must be unique");

      const user = await addUser(payload);
      return user;
    },
    login: async (_parent, args) => {
      // console.log(args);
      const user = await findOneUsername(args.username);
      if (!user) throw new Error("Wrong email / password");
      const isValidPassword = comparePassword(args.password, user.password);
      if (!isValidPassword) throw new Error("Wrong email / password");
      const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
      };
      const token = signToken(payload);
      return { token };
    },
  },
};

module.exports = {
  userTypeDefs: typeDefs,
  userResolvers: resolvers,
};
