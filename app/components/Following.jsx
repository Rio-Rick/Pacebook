import { Image, Pressable, Text, View } from "react-native";
import SizedBox from "./SizedBox";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_FRIEND, GET_BY_USERNAME, GET_USER_LOGIN } from "../queries";

export default function Following({ followings }) {
  const [followDispatcher, { data, error, loading }] = useMutation(ADD_FRIEND, {
    onCompleted: async (res) => {
        // console.log(data);
    },
    refetchQueries: [GET_USER_LOGIN, "GetUsers"],
    fetchPolicy: "no-cache",
  });
  // console.log(user.userFollowers);
  async function handleAddFriend() {
    try {
      await followDispatcher({
        variables: {
          followerId: followings._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        flexBasis: "auto",
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        marginHorizontal: 5,
        padding: 10,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image
          source={{ uri: "https://picsum.photos/700" }}
          style={{ height: 40, width: 40, borderRadius: 20 }}
        />
        <Text>{followings?.username}</Text>
      </View>
      <Pressable onPress={handleAddFriend} style={{ alignSelf: "center" }}>
        <View
          style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 5,
            backgroundColor: "blue",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
            Unfollow
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
