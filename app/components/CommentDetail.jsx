import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import SizedBox from "./SizedBox";
import { styles } from "../styles/global.css";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, GET_POSTS } from "../queries";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";


export default function CommentDetail({ post, refetch }) {
//   console.log(post);
  const [comment, setComment] = useState("");
  const usernameNow = SecureStore.getItem("username");
//   console.log(comment);

  const [commentDispatcher, { data, error, loading }] = useMutation(
    ADD_COMMENT,
    {
      refetchQueries: [GET_POSTS, "GetPosts"],
      fetchPolicy: "no-cache",
    }
  );
//   console.log(error);
  function BoxComment({ comment }) {
    // console.log(comment);
    // console.log(comment);
    return (
      <ScrollView
        style={
          usernameNow === comment.username
            ? { flexDirection: "row-reverse" }
            : { flexDirection: "row" }
        }
      >
        <View
          style={{
            borderWidth: 1,
            marginBottom: 5,
            padding: 20,
            marginRight: 10,
            borderRadius: 10,
            width: 250,
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Image
            source={{ uri: "https://picsum.photos/700" }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text>{comment.username}</Text>
            <Text style={{ color: "grey", marginRight: 20, paddingRight: 10 }}>
              {comment.content}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  async function handleComment() {
    try {
      await commentDispatcher({
        variables: {
          upsertCommentId: post?._id,
          payload: {
            content: comment,
          },
        },
      });

      setComment("");
      refetch()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ScrollView>
      {post.comments.map((item) => (
        <BoxComment key={item.createdAt} comment={item} />
      ))}
      <SizedBox height={100}/>
      <View
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 15,
          flex: 1,
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Pressable style={[{ flex: 7 }, styles.form]}>
          <TextInput
            style={{ color: "white" }}
            value={comment}
            onChangeText={setComment}
            placeholder="write a comment"
            placeholderTextColor="white"
          />
        </Pressable>
        <Pressable
          style={{
            alignItems: "center",
            backgroundColor: "rgb(58, 58, 60)",
            borderRadius: 8,
            flexDirection: "row",
            height: 48,
            paddingHorizontal: 16,
          }}
          onPress={handleComment}
        >
          {/* <Text>post</Text> */}
          <Ionicons name="send-outline" size={24} color="white" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
