import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainTab from "../navigations/MainTab";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import * as SecureStore from "expo-secure-store";
import DetailPostScreen from "../screens/DetailPostScreen";

const Stack = createNativeStackNavigator();


export default function MainStack() {
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    (async () => {
        const access_token = await SecureStore.getItemAsync("access_token");
        if(access_token) setIsLoggedIn(true)
    })();
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <NavigationContainer>
          <Stack.Navigator>
            {isLoggedIn ? (
              <>
                <Stack.Screen
                  name="Dashboard"
                  component={MainTab}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="DetailPost"  component={DetailPostScreen}                   options={{
                    headerShown: false,
                  }}/>
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
