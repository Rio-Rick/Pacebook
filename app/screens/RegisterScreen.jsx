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
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../queries";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(name);
  // console.log(username);
  // console.log(email);
  // console.log(password);
  const [registerDispatcher, { data, error, loading }] = useMutation(REGISTER, {
    onCompleted: async (data) => {
      // console.log(data);
      navigation.navigate("Login");
    },
  });

  const onRegister = async () => {
    await registerDispatcher({
      variables: {
        payload: {
          name,
          username,
          email,
          password,
        },
      },
    });

  };
  // console.log(data);
  // console.log(error);
  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Text style={styles.title}>Pacebok</Text>

        <SizedBox height={50} />

        <Text style={styles.subtitle}>Sign up to your account</Text>

        <SizedBox height={10} />

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Name</Text>

            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
            />
          </View>
        </Pressable>

        <SizedBox height={10} />

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>

            <TextInput
              style={styles.textInput}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </Pressable>

        <SizedBox height={10} />

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              keyboardType="email-address"
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </Pressable>

        <SizedBox height={10} />

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              secureTextEntry
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
              navigation.navigate("Login");
            }}
          >
            already have account? Login
          </Text>
        </View>

        <SizedBox height={20} />

        <TouchableOpacity>
          <Pressable style={styles.buttonLoginNRegister} onPress={onRegister}>
            <Text style={styles.buttonTitle}>Register</Text>
          </Pressable>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
