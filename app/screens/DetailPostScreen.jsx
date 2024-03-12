import { useQuery } from "@apollo/client";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { GET_POST_ID } from "../queries";
import CommentPost from "../components/CommentPost";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/global.css";
import * as SecureStore from "expo-secure-store";
import SizedBox from "../components/SizedBox";
import CommentDetail from "../components/CommentDetail";
import uploadTime from "../utils/uploadTime";

export default function DetailPostScreen({ route, navigation }) {
  const { postId } = route.params;
  const usernameNow = SecureStore.getItem("username");
  // console.log(usernamenow);
  const { data, loading, error, refetch } = useQuery(GET_POST_ID, {
    variables: {
      getPostByIdId: postId,
    },
    fetchPolicy: "no-cache",
  });
  // console.log(data?.getPostById.comments);
  const [like, setLikePost] = useState(false);
  console.log(data);
  // async function SetLike() {
  //   const nowUsername = await SecureStore.getItemAsync("username");
  //   for (let item of data?.getPostById.likes) {
  //     // console.log(item.username, post.authorUser[0].username);
  //     if (item.username === nowUsername) {
  //       setLikePost(true);
  //     }
  //   }
  // }
  // if (data) {
  //   async function setUser() {
  //     const nowUsername = await SecureStore.getItemAsync("username");
  //     for (let item of data?.getPostById?.comments) {
  //       // console.log(item);
  //       if (item?.username === nowUsername) {
  //         setUserNow(item?.username);
  //       }
  //     }
  //   }
  // }
  // useEffect(() => {
  //   setUser();
  //   // SetLike();
  // }, []);
  // console.log(data);
  if (data) {
    return (
      <>
        <View style={styles.homeCard}>
          <Pressable
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
          <View style={{ flexDirection: "row", gap: 10, margin: 7 }}>
            <Image
              source={{ uri: "https://picsum.photos/700" }}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
            <View>
              <Text>{data?.getPostById.authorUser[0].username}</Text>
              <Text>{uploadTime(Number(data?.getPostById.createdAt))}</Text>
            </View>
          </View>
          <Text style={{ margin: 5 }}>{data?.getPostById.content}</Text>
          <View style={{ flexDirection: 'row', margin: 5}} >
            <Text>Tags :</Text>
            {data?.getPostById.tags.map((item, idx) => (
              <Text style={{ marginLeft: 5 }} key={idx}>
                #{item}
              </Text>
            ))}
          </View>
          <Image
            source={{ uri: data?.getPostById?.imgUrl }}
            defaultSource={{ uri: "https://picsum.photos/700" }}
            style={styles.imageSize}
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
            <Text>{data?.getPostById.likes?.length}</Text>
            <Ionicons name="chatbubble-outline" size={15} color="black" />
            <Text>{data?.getPostById.comments.length}</Text>
          </View>
          <View
            style={{
              borderTopWidth: 0.2,
              flexDirection: "row",
              justifyContent: "space-evenly",
              height: 30,
            }}
          ></View>
        </View>
        <SizedBox height={10} />
        {/* <ScrollView>
            {data?.getPostById?.comments.map(item => 
              <BoxComment key={comment.createdAt} comment={item} />
              )}
        </ScrollView> */}
        <CommentDetail post={data?.getPostById} refetch={refetch} />
      </>
    );
  }
}
