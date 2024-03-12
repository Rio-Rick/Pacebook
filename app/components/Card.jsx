import * as React from "react";
import { View, ScrollView, Image, Pressable, Modal } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { styles } from "../styles/global.css";
import SizedBox from "./SizedBox";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS, GET_USER_BY_ID, ON_LIKE } from "../queries";
import uploadTime from "../utils/uploadTime";
import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import DetailPostScreen from "../screens/DetailPostScreen";
import AddPost from "./AddPost";
import AddPostScreen from "../screens/AddPostScreen";
import CommentPost from "./CommentPost";

// const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const HomeCard = ({ post, navigation }) => {
  const [like, setLikePost] = useState(false);

  async function SetLike() {
    const nowUsername = await SecureStore.getItemAsync("username");
    for (let item of post.likes) {
      // console.log(item.username, post.authorUser[0].username);
      if (item.username === nowUsername) {
        setLikePost(true);
      }
    }
  }

  useEffect(() => {
    SetLike();
  }, []);

  const [likeDispatcher, { data, loading, error }] = useMutation(ON_LIKE, {
    onCompleted: async (data) => {
      // console.log(data.upsertLike.message);
      if (data?.upsertLike.message === "you like this post") {
        setLikePost(true);
      } else if (data?.upsertLike.message === "you unlike this post") {
        setLikePost(false);
      }
    },
    refetchQueries: [GET_POSTS, "GetPosts"],
    fetchPolicy: "no-cache",
  });

  async function onLike(id) {
    try {
      await likeDispatcher({
        variables: {
          upsertLikeId: id,
        },
      });
    } catch (error) {
      // console.log(data);
      console.log(error);
    }
  }

  return (
    <>
      <View style={styles.homeCard}>
        <Pressable
          onPress={() => {
            navigation.navigate("DetailPost", {
              postId: post._id,
            });
            // <DetailPostScreen />
          }}
        >
          <View style={{ flexDirection: "row", gap: 10, margin: 7 }}>
            <Image
              source={{ uri: "https://picsum.photos/700" }}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
            <View>
              <Text>{post?.authorUser[0]?.username}</Text>
              <Text>{uploadTime(Number(post?.createdAt))}</Text>
            </View>
          </View>
        </Pressable>
        <Text style={{ margin: 5 }}>{post?.content}</Text>
        <Image
          source={{ uri: post.imgUrl }}
          defaultSource={{ uri: "https://picsum.photos/700" }}
          style={styles.imageSize}
          // // alt="https://picsum.photos/700"
          // onError={({nativeEvent: {error}}) => console.log(error)}
          // onError={()=> setError(true)}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            height: 30,
            marginLeft: 7,
          }}
        >
          <Ionicons name="thumbs-up-outline" size={15} color="black" />
          <Text>{post?.likes?.length}</Text>
        </View>
        <View
          style={{
            borderTopWidth: 0.2,
            flexDirection: "row",
            justifyContent: "space-evenly",
            height: 30,
          }}
        >
          <Pressable onPress={() => onLike(post?._id)}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              {like ? (
                <Ionicons name="thumbs-up" size={24} color="black" />
              ) : (
                <Ionicons name="thumbs-up-outline" size={24} color="black" />
              )}
              <Text>like</Text>
            </View>
          </Pressable>
          <Pressable>
            <CommentPost post={post}/>
            {/* <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text>Comment</Text>
            </View> */}
          </Pressable>
        </View>
      </View>
      <SizedBox height={10} />
    </>
  );
};

export default HomeCard;
