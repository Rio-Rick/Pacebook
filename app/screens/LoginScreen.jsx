import {
  Button,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/global.css";
import SizedBox from "../components/SizedBox";
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../contexts/LoginContext";

export default function LoginScreen({ navigation }) {
  const { setIsLoggedIn } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginDispatcher, { data, error, loading }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      const access_token = data?.login?.token
      // console.log(access_token);
      // console.log(data);
      await SecureStore.setItemAsync("username", username)
      await SecureStore.setItemAsync("access_token", access_token);

      setIsLoggedIn(true);
    },
  });
  // console.log(data);
  // console.log(email);
  // console.log(password);
  const onLogin = async () => {
    try {
      await loginDispatcher({
        variables: {
          username,
          password,
        },
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(error);
  };
  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Text style={styles.title}>Pacebok</Text>

        <SizedBox height={50} />

        <Text style={styles.subtitle}>Sign in to your account</Text>

        <SizedBox height={5} />
          {error ? <Text>{JSON.stringify(error?.graphQLErrors[0].message)}</Text> : <Text></Text>}
        <SizedBox height={5} />

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>

            <TextInput
              keyboardType="email-address"
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </Pressable>

        <SizedBox height={10} />

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              secureTextEntry={true}
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </Pressable>

        <SizedBox height={10} />

        <View style={styles.forgotPasswordContainer}>
          <Text
            style={styles.textButton}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Don't have account? Register
          </Text>
        </View>

        <SizedBox height={20} />

        <TouchableOpacity>
          <Pressable style={styles.buttonLoginNRegister} onPress={onLogin}>
            <Text style={styles.buttonTitle}>Login</Text>
          </Pressable>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
