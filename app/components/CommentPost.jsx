import {
  View,
  Text,
  Modal,
  Pressable,
  Image,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import { styles } from "../styles/global.css";
import { useEffect, useState } from "react";
import SizedBox from "../components/SizedBox";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT, GET_POSTS } from "../queries";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function CommentPost({ post }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState("");

  const [userNow, setUserNow] = useState("");

  const [commentDispatcher, { data, error, loading }] = useMutation(
    ADD_COMMENT,
    {
      refetchQueries: [GET_POSTS, "GetPosts"],
      fetchPolicy: "no-cache",
    }
  );

  async function setUser() {
    const nowUsername = await SecureStore.getItemAsync("username");
    for (let item of post?.comments) {
      if (item?.username === nowUsername) {
        setUserNow(item?.username);
      }
    }
  }

  useEffect(() => {
    setUser();
  }, [handleComment]);

  async function handleComment() {
    try {
      await commentDispatcher({
        variables: {
          upsertCommentId: post._id,
          payload: {
            content: comment,
          },
        },
      });

      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  function BoxComment({ comment }) {
    // console.log(comment);
    return (
      <View
        style={
          userNow === comment.username
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
          <View style={{flexDirection: 'column'}} >
            <Text>{comment.username}</Text>
            <Text style={{ color: "grey", marginRight: 20, paddingRight: 10}}>{comment.content}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View>
          <View style={{ backgroundColor: "white", height: "100%" }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Pressable
                style={[
                  { height: 30, width: 50, marginLeft: 10, marginTop: 10 },
                ]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                {/* <Text style={styles.textStyle}>Close</Text> */}
                <Ionicons name="chevron-back" size={24} color="black" />
              </Pressable>
            </View>

            <View style={{ marginLeft: 10, marginTop: 5, marginBottom: 120 }}>
              <FlatList
                data={post?.comments}
                renderItem={({ item }) => <BoxComment comment={item} />}
                keyExtractor={(item) => item.createdAt}
              />
            </View>

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
          </View>
        </View>
      </Modal>

      <View>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Pressable
            style={{ justifyContent: "center" }}
            onPress={() => setModalVisible(true)}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text>Comment</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <SizedBox height={5} />
    </View>
  );
}
