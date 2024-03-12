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

export default function AddPost({
  setContent,
  setTags,
  setImageUrl,
  content,
  tags,
  imageUrl,
}) {
  // const [registerDispatcher, { data, error, loading }] = useMutation(REGISTER, {
  //   onCompleted: async (data) => {
  //     console.log(data);
  //     navigation.navigate("Login");
  //   },
  // });

  // const onRegister = async () => {
  //   await registerDispatcher({
  //     variables: {
  //       payload: {
  //         name,
  //         username,
  //         email,
  //         password,
  //       },
  //     },
  //   });

  // };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Content</Text>

            <TextInput
              style={styles.textInput}
              value={content}
              onChangeText={setContent}
            />
          </View>
        </Pressable>

        <SizedBox height={10} />

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Image Url</Text>

            <TextInput
              style={styles.textInput}
              value={imageUrl}
              onChangeText={setImageUrl}
            />
          </View>
        </Pressable>

        <SizedBox height={10} />

        <Pressable>
          <View style={styles.form}>
            <Text style={styles.label}>Tags</Text>

            <TextInput
              keyboardType="email-address"
              style={styles.textInput}
              value={tags}
              onChangeText={setTags}
            />
          </View>
        </Pressable>

        <SizedBox height={10} />
      </KeyboardAvoidingView>
    </View>
  );
}
