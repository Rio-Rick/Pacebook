import { Image, Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/global.css";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
export default function SearchBar({ search, setSearch, searchDispatch }) {
    // let n = "";
    const [searching, setSearching] = useState('')
    const handleSearch = async () => {
        try {
            await searchDispatch({
                variables: {
                    username: search
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    // if(search) {
    //     n = search
    // }
  return (
    <View style={[styles.button, styles.buttonOpen]}>
      <View style={{ flexDirection: "row", gap: 10}} >
        <View style={[styles.form, { flex: 5}]}>
          <Text style={styles.label}>Search</Text>

          <TextInput
            style={styles.textInput}
            placeholder={search}
            value={searching}
            placeholderTextColor="white"
            onChangeText={(text) => setSearching(text)}
            onEndEditing={() => setSearch(searching)}
          />
        </View>
        <Pressable style={styles.form} onPress={handleSearch}>
           <Ionicons name="search" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
