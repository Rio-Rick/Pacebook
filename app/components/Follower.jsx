import { Image, Pressable, Text, View } from "react-native";
import SizedBox from "./SizedBox";

export default function Follower({followers}) {
    return(
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
            <Text>{followers?.username}</Text>
          </View>
          <SizedBox height={5}/>
        </View>
    )
}