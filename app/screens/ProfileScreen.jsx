import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { styles } from "../styles/global.css";
import { useQuery } from "@apollo/client";
import { GET_BY_USERNAME, GET_USERS, GET_USER_LOGIN } from "../queries";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useEffect, useState } from "react";
import SizedBox from "../components/SizedBox";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Follower from "../components/Follower";
import Following from "../components/Following";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";


export default function ProfileScreen() {
  const [item, setItem] = useState("followers");

  const { setIsLoggedIn } = useContext(LoginContext);
  const { data, error, loading } = useQuery(GET_USER_LOGIN, {
    fetchPolicy: 'no-cache'
  });
  // console.log(data);
  return (
    <View>
      <ImageBackground
        style={{ height: 200 }}
        source={{
          uri: "https://pixabay.com/get/g4c811f69af3eca9e6ed189f16be007f8a224178fc05597dfc2528393427b1ca9d0f5b2d7228c20ddb54eb18b50ffcfa5d9c101364646f6ac9ae32629784535f4_640.jpg",
        }}
      ></ImageBackground>
      <View>
        <Image
          source={{
            uri: "https://picsum.photos/700",
          }}
          style={{
            height: 150,
            borderRadius: 100,
            width: 150,
            bottom: 70,
            marginLeft: 20,
            borderColor: "black",
            borderWidth: 2,
          }}
        />
        <Text
          style={{
            bottom: 60,
            marginLeft: 15,
            fontSize: 25,
            fontWeight: "500",
          }}
        >
          {data?.getUserNow?.username}
        </Text>
        <Text style={{ bottom: 55, marginLeft: 15, fontSize: 15 }}>
          Followers : {data?.getUserNow?.followers?.length}
        </Text>
        <Text style={{ bottom: 55, marginLeft: 15, fontSize: 15 }}>
          Followings : {data?.getUserNow?.followings?.length}
        </Text>
      </View>

      <View style={{ backgroundColor: "grey", height: 10 }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomWidth: 0.5,
          height: 30,
        }}
      >
        <Pressable
          style={{
            borderRightWidth: 0.5,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setItem("followers")}
        >
          {item === 'followers' ? <Text style={{color: 'blue', fontWeight: 'bold'}} >Followers</Text> : <Text>Followers</Text>}

        </Pressable>
        <Pressable
          style={{
            borderRightWidth: 0.5,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setItem("followings")}
        >
          
          {item === 'followings' ? <Text style={{color: 'blue', fontWeight: 'bold'}} >Followings</Text> : <Text>Followings</Text>}
        </Pressable>
      </View>
      <View style={{height: 250}}>
        {item === "followers" && (
          <FlatList
            data={data?.getUserNow?.userFollowers}
            renderItem={({ item }) => <Follower followers={item} />}
            keyExtractor={(item) => item._id}
          />
          
          // <ScrollView>
          //   {data?.getUserNow?.userFollowers.map((follower) => (
          //     <Follower key={follower._id} followers={follower} />
          //   ))}
          // </ScrollView>
        )}
        {item === "followings" && (
          <FlatList
            data={data?.getUserNow?.userFollowings}
            renderItem={({ item }) => <Following followings={item} />}
            keyExtractor={(item) => item._id}
          />
          // <ScrollView>
          //   {data?.getUserNow?.userFollowings.map((following) => (
          //     <Following key={following._id} followings={following} />
          //   ))}
          // </ScrollView>
        )}
      </View>

      <Button
        title="Log out"
        onPress={async () => {
          await SecureStore.deleteItemAsync("access_token");
          setIsLoggedIn(false);
        }}
      />
      {/* <FlatList
        
      /> */}
    </View>
  );
}
