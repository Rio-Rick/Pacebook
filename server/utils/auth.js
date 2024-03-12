const { GraphQLError } = require("graphql");
const { verifyToken } = require("./jwt");
const { findOneUserById } = require("../model/user");



const authentication = async(req) => {
    const authorization = req.headers.authorization;
    console.log(authorization);
    if(!authorization) {
        throw new GraphQLError('Invalid Token',{
            extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401},
            },
        });
    }

    const token = authorization.split(" ")[1];

    if(!token) {
        throw new GraphQLError('Invalid Token', {
            extensions: {
                code: "UNAUTHENTICATED",
                http: {status: 401}
            }
        })
    }

    const payload = verifyToken(token);

    const user = await findOneUserById(payload.id);

    if(!user) {
        throw new GraphQLError("Invalid Token", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 }
            }
        });
    }

    return {
        userId: user._id,
        username: user.username,
        userEmail: user.email
    };
}

module.exports = authentication;