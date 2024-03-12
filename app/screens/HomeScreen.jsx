import {
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "../styles/global.css";
import HomeCard from "../components/Card";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";
import SizedBox from "../components/SizedBox";
import AddPostScreen from "./AddPostScreen";

export default function HomeScreen(props) {
  // console.log(props);
  const { data, loading, error } = useQuery(GET_POSTS);

  // console.log(data);
  if (loading)
  return (
    <Text style={{ textAlign: "center", justifyContent: "center" }}>
      loading..
    </Text>
  );
  return (
    <View>
      <FlatList
        ListHeaderComponent={() => (
          // <>
          //   <Pressable>
          //     <View style={{ backgroundColor: "white", flexDirection: "row", gap: 5, height: 60 }}>
          //       <Image
          //         source={{ uri: "https://picsum.photos/700" }}
          //         style={{ height: 40, width: 40, borderRadius: 20, margin: 10 }}
          //       />
          //       <View style={{justifyContent: "center"}} >

          //       <Text style={{ borderWidth: 0.3, width: 300, height: 30, borderRadius: 10, padding: 5 }} >What's on your mind?</Text>
          //       </View>
          //     </View>
          //   </Pressable>
          //   <SizedBox height={5} />
          // </>
          <AddPostScreen navigation={props.navigation} />
        )}
        data={data?.getPosts}
        renderItem={({ item }) => <HomeCard post={item} navigation={props.navigation} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
