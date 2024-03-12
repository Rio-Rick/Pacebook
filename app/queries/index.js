import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      authorUser {
        _id
        email
        name
        username
      }
    }
  }
`;

export const GET_USERS = gql`
  query getUser {
    getUsers {
      _id
      name
      username
      email
      password
      followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowers {
        _id
        name
        username
        email
        password
      }
      followings {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowings {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($payload: NewUser) {
    register(payload: $payload) {
      _id
      name
      username
      email
      password
      followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowers {
        _id
        name
        username
        email
        password
      }
      followings {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowings {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserId($userId: String) {
    getUserId(userId: $userId) {
      _id
      name
      username
      email
      password
      followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowers {
        _id
        name
        username
        email
        password
      }
      followings {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowings {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const ON_LIKE = gql`
  mutation UpsertLike($upsertLikeId: ID) {
    upsertLike(id: $upsertLikeId) {
      message
      data {
        _id
        content
        tags
        imgUrl
        authorId
        authorUser {
          _id
          name
          username
          email
          password
          followers {
            _id
            followingId
            followerId
            createdAt
            updatedAt
          }
          userFollowers {
            _id
            name
            username
            email
            password
          }
          followings {
            _id
            followingId
            followerId
            createdAt
            updatedAt
          }
          userFollowings {
            _id
            name
            username
            email
            password
          }
        }
        comments {
          content
          username
          createdAt
          updatedAt
        }
        likes {
          username
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($payload: NewPost) {
    addPost(payload: $payload) {
      _id
      content
      tags
      imgUrl
      authorId
      createdAt
      updatedAt
      authorUser {
        _id
        name
        username
        email
        password
        followers {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        userFollowers {
          _id
          name
          username
          email
          password
        }
        followings {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        userFollowings {
          _id
          name
          username
          email
          password
        }
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation UpsertComment($upsertCommentId: ID, $payload: CommentInput) {
    upsertComment(id: $upsertCommentId, payload: $payload) {
      _id
      content
      authorId
      authorUser {
        _id
        name
        username
        email
        password
        followers {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        userFollowers {
          _id
          name
          username
          email
          password
        }
        followings {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        userFollowings {
          _id
          name
          username
          email
          password
        }
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
    }
  }
`;

export const GET_BY_USERNAME = gql`
  query GetUsername($username: String) {
    getUsername(username: $username) {
      _id
      name
      username
      email
      password
      followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowers {
        _id
        name
        username
        email
        password
      }
      followings {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowings {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation Followed($followerId: ID) {
    followed(followerId: $followerId) {
      message
      data {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_USER_LOGIN = gql`
  query GetUsers {
    getUserNow {
      _id
      name
      username
      email
      password
      followers {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowers {
        _id
        name
        username
        email
        password
      }
      followings {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      userFollowings {
        _id
        name
        username
        email
        password
      }
    }
  }
`;

export const GET_POST_ID = gql`
  query GetPostById($getPostByIdId: ID) {
    getPostById(id: $getPostByIdId) {
      _id
      content
      tags
      imgUrl
      authorId
      authorUser {
        _id
        name
        username
        email
        password
        followers {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        userFollowers {
          _id
          name
          username
          email
          password
        }
        followings {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        userFollowings {
          _id
          name
          username
          email
          password
        }
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
