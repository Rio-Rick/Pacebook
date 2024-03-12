 const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");
const { findAllPost, findOnePostById } = require("../model/post");
const { GraphQLError } = require("graphql");
const Redis = require('ioredis');
const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});
const typeDefs = `#graphql
    type Comment {
        content: String
        username: String
        createdAt: String
        updatedAt: String
    }
    input CommentInput {
        content: String
    }

    type Like {
        username: String
        createdAt: String
        updatedAt: String
    }

    type Post {
        _id: ID
        content: String
        tags: [String]
        imgUrl: String
        authorId: ID
        authorUser:[User]
        comments: [Comment]
        likes: [Like]
        createdAt: String
        updatedAt: String
    }


    input NewPost {
        content: String!
        imgUrl: String
        tags: [String]
    }

    type Info {
        message: String
        data: Post
    }


    type Query {
        getPosts: [Post]
        getPostById(id: ID): Post
    }

    type Mutation {
        addPost(payload: NewPost): Post 
        upsertComment(id: ID, payload: CommentInput): Post
        upsertLike(id: ID): Info
    }
`;

const resolvers = {
    Query: {
        getPosts: async (_parent, {}, contextValue) => {
            await contextValue.auth()
            const postCache = await redis.get("data:posts");

            if(postCache) {
                return JSON.parse(postCache)
            }
            const posts = await findAllPost();
            redis.set("data:posts", JSON.stringify(posts))
            return posts;
        },
        getPostById: async (_parent, args, contextValue) => {
            await contextValue.auth()

            const post = await findOnePostById(args.id)
            return post
        }
    },
    Mutation: {
        addPost: async (_parent, {payload}, contextValue) => {
            const db = getDatabase();
            const postCollection = db.collection("posts");

            const { userId } = await contextValue.auth()
            const date = new Date()
            const newPost = await postCollection.insertOne({
                content : payload.content,
                imgUrl : payload.imgUrl,
                tags : payload.tags,
                authorId : new ObjectId(userId),
                comments : [],
                likes : [],
                updatedAt : date,
                createdAt : date
            })
            redis.del("data:posts")
            const post = await postCollection.findOne({
                _id: new ObjectId(newPost.insertedId),
            })
            return post; 
        },
        upsertComment: async(_parent, {id, payload}, contextValue) => {
            const db = getDatabase();
            const postCollection = db.collection("posts");
            const { username } = await contextValue.auth()

            const date = new Date()

            let comment = {
                content : payload.content,
                username : username,
                updatedAt : date,
                createdAt : date
            }
            
            const newComment = await postCollection.updateOne(
                {
                    _id: new ObjectId(id),
                },
                {
                    $addToSet : {
                        comments : comment,
                    },
                }
            );
            redis.del("data:posts")

            const commentPost = await postCollection.findOne({
                _id: new ObjectId(id)
            })

            return commentPost
        },
        upsertLike: async(_parent, {id}, contextValue) => {
            const db = getDatabase();
            // console.log(id);
            const postCollection = db.collection("posts");
            const { username } = await contextValue.auth()

            const find = await postCollection.findOne({
                _id: new ObjectId(id),
                'likes.username' : username
            })
            redis.del("data:posts")

            // console.log(find);
            // console.log(find);
            // console.log(find);
            // find.likes.map((ele) => {
            //     if(ele.username === username) {
            //         // console.log(ele.username);
            //         let del = await postCollection.deleteOne({
            //             likes : {username : ele.username} 
            //         })
            //         console.log(del);
            //         // throw new Error('you are already like this post')
            //         // throw new GraphQLError('You are already like this post',{
            //         //     extensions: {
            //         //     code: "ALREADYLIKE",
            //         //     http: { status: 400},
            //         //     },
            //         // });
            //     }
            // })
            if(find) {
                let del = await postCollection.updateOne({
                        _id : new ObjectId(id)
                    },
                    {
                        $pull: { likes: {username : username}}
                    }
                )
                // if(find.likes.length > 0) {
                //     for(let i = 0; i< find.likes.length; i ++) {
                //         if(find.likes[i].username === username) {

                //         }
                //         // console.log(del);
                //     }
                // }
                // console.log(del);
                const likePost = await postCollection.findOne({
                    _id: new ObjectId(id)
                })
                return {
                    message: "you unlike this post",
                    data: likePost
                }
            } else {
                const date = new Date()
                let like = {
                    username,
                    updatedAt : date,
                    createdAt : date
                }
                const newLike = await postCollection.updateOne(
                    {
                        _id: new ObjectId(id),
                    },
                    {
                        $addToSet : {
                            likes : like,
                        },
                    }
                );
                // console.log(newLike);
                // console.log(newLike, "<<<<<<<<<<<<<<<<<<<<<<,,,");
                const likePost = await postCollection.findOne({
                    _id: new ObjectId(id)
                })
                // console.log(likePost);
    
    
                return {
                    message: "you like this post",
                    data: likePost
                }
            }

        }
    },
};

module.exports = {
    postTypeDefs: typeDefs,
    postResolvers: resolvers,
};

