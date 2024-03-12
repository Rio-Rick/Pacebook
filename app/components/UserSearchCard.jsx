import { Image, Pressable, Text, View } from "react-native";
import { styles } from "../styles/global.css";
import SizedBox from "./SizedBox";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND, GET_BY_USERNAME, GET_USERS, GET_USER_LOGIN } from "../queries";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";



export default function UserSearchCard({ user, searchDispatch }) {
  const [friend, setFriend] = useState(false);
  const [userNow, setUserNow] = useState("");
  // let holder = undefined;
  (async () => {
    const loginUsername = SecureStore.getItem('username')
    const nowUsername = await SecureStore.getItemAsync("username");
    holder = nowUsername
    if(user?.userFollowers.lenght !== 0) {

      for(let item of user?.userFollowers) {
        // console.log(item);
        if(item?.username === nowUsername || item.username === loginUsername) {
          setFriend(true)
        }
        setUserNow(nowUsername)
      }
      if(!nowUsername) setUserNow(loginUsername)
      // console.log(userNow);
    } 
  })();
  const [followDispatcher, { data, error, loading }] = useMutation(ADD_FRIEND, {
    onCompleted: async (data) => {
      // console.log("sukse");
      // console.log(data);
      await searchDispatch({
        variables: {
          username: "",
        },
      });
    },
    refetchQueries: [GET_USER_LOGIN],
    fetchPolicy: 'no-cache'
  });
  // console.log(user.userFollowers);
  async function handleAddFriend() {
    try {
      await followDispatcher({
        variables: {
          followerId: user._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  // console.log(holder, '>>>>>', user.username);
  if (userNow !== user.username) {
    return (
      <>
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
            <Text>{user?.username}</Text>
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
                {friend ? "Followed" : "Follow"}
              </Text>
            </View>
          </Pressable>
        </View>
        <SizedBox height={5} />
      </>
    );
  }
}
