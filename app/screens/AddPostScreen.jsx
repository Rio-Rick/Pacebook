import { View, Text, Modal, Pressable, Image, Alert } from "react-native";
import { styles } from "../styles/global.css";
import { useState } from "react";
import SizedBox from "../components/SizedBox";
import AddPost from "../components/AddPost";
import { useMutation } from "@apollo/client";
import { ADD_POST, GET_POSTS } from "../queries";
import { Ionicons } from "@expo/vector-icons";

export default function AddPostScreen({ navigation }) {
  // console.log(navigation);
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [postDispatcher, { data, error, loading }] = useMutation(ADD_POST, {
    onCompleted: async (data) => {
      setModalVisible(false);
    },
    refetchQueries: [GET_POSTS, "GetPosts"],
    fetchPolicy: "no-cache",
  });

  // console.log(content);
  async function postHandle() {
    try {
      let tempArr = tags.split(",");
      if (!tempArr) {
        tempArr = tags;
      }
      await postDispatcher({
        variables: {
          payload: {
            content,
            imgUrl: imageUrl,
            tags: tempArr,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
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
              <Pressable
                style={{
                  height: 30,
                  width: 50,
                  marginTop: 12,
                  color: "white",
                  backgroundColor: "#5942EE",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  margin: 10,
                }}
                onPress={postHandle}
              >
                <Text style={styles.textStyle}>Post</Text>
                {/* <Ionicons name="cloud-upload-sharp" size={24} color="black" /> */}
              </Pressable>
            </View>
            <AddPost
              setContent={setContent}
              setImageUrl={setImageUrl}
              setTags={setTags}
              content={content}
              tags={tags}
              imageUrl={imageUrl}
            />
          </View>
        </View>
      </Modal>
      <View style={[styles.button, styles.buttonOpen]}>
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            gap: 5,
            height: 60,
          }}
        >
          <Pressable>
            <Image
              source={{ uri: "https://picsum.photos/700" }}
              style={{ height: 40, width: 40, borderRadius: 20, margin: 10 }}
            />
          </Pressable>
          <Pressable
            style={{ justifyContent: "center" }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                borderWidth: 0.3,
                width: 300,
                height: 30,
                borderRadius: 10,
                padding: 5,
              }}
            >
              What's on your mind?
            </Text>
          </Pressable>
        </View>
      </View>
      <SizedBox height={5} />
    </View>
  );
}
