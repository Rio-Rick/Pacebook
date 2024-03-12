// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import PeopleScreen from "../screens/PeopleScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { useState } from "react";
import AddPostScreen from "../screens/AddPostScreen";
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
export default function MainTab({ navigation }) {
  // console.log(navigation);
  // const [logo, setLogo] = useState("");
  // console.log(logo);
  return (
    <>
      <View
        style={{
          height: 30,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            color: "#0066ff",
            fontSize: 28,
            fontWeight: "700",
            lineHeight: 34,
            padding: 2,
            marginLeft: 5,
          }}
        >
          Pacebook
        </Text>
      </View>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
              // setLogo(route.name);
            } else if (route.name === "People") {
              iconName = focused ? "people" : "people-outline";
              // setLogo(route.name)
            } else if (route.name === "Profile") {
              iconName = focused ? "list" : "list-outline";
              // setLogo(route.name)
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarShowLabel: false,
          // tabBarLabelStyle: { fontSize: 0 },

          // tabBarItemStyle: { width: 150 },
          headerShown: false,
        })}
      >
        {/* <Tab.Screen name='Login' component={LoginScreen} /> */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="People" component={PeopleScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </>
  );
}
