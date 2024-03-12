import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { ApolloProvider } from "@apollo/client";
import client from "./config";
import { LoginProvider } from "./contexts/LoginContext";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainStack from "./stacks/MainStack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <PaperProvider>
          <MainStack />
        </PaperProvider>
      </LoginProvider>
    </ApolloProvider>
  );
}
