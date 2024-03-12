const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const PORT = process.env.PORT || 3000
const { mongoConnect } = require('./config/mongoConnection');
const { userTypeDefs, userResolvers } = require("./schemas/user");
const { postTypeDefs, postResolvers } = require("./schemas/post");
const authentication = require("./utils/auth");
const { followTypeDefs, followResolvers } = require("./schemas/follow");

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postResolvers, followResolvers],
    introspection: true
});
// const server = new ApolloServer({
//     typeDefs:userTypeDefs,
//     resolvers:userResolvers,
//   });

(async () => {
    try {
        await mongoConnect();
        const { url } = await startStandaloneServer(server, {
            listen : {
                port : PORT,
            },
            context: async({req, res}) => {
                return {
                    auth : async () => {
                        return await authentication(req)
                    },
                };
            },
        });
        console.log(`server ready at: ${url}`);
    } catch (error) {
        console.log(error);
    };
})();

// (async () => {
//     try {
//       await mongoConnect();
//       const { url } = await startStandaloneServer(server, {
//         listen: {
//           port: PORT,
//         },
//         context: async ({ req, res }) => {
//           return {
//             auth: () => {
//               return "Context Auth dijalankan";
//             },
//           };
//         },
//       });
//       console.log(`🚀  Server ready at: ${url}`);
//     } catch (error) {
//       console.log(error);
//     }
// })();
