import { Button, FlatList, Text, View } from "react-native";
import { styles } from "../styles/global.css";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_BY_USERNAME, GET_USERS } from "../queries";
import UserSearchCard from "../components/UserSearchCard";
import SearchBar from "../components/SearchBar";
import AddPost from "../components/AddPost";
import AddPostScreen from "./AddPostScreen";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export default function PeopleScreen() {
  const [search, setSearch] = useState("");
  const [userNow, setUserNow] = useState("");
  const [searchDispatch, { data, loading, error }] = useLazyQuery(
    GET_BY_USERNAME,
    {
      onCompleted: async (data) => {
        setSearch("");
      },
      fetchPolicy: "no-cache",
    }
  );
  // console.log(data);
  async function setUser() {
    const nowUsername = await SecureStore.getItemAsync("username");
    if (data) {
      for (let item of data?.getUsername) {
        // console.log(item.username);
        if (item?.username === nowUsername) {
          setUserNow(item?.username);
        }
      }
    }
  }
  const handleSearch = async () => {
    try {
      await searchDispatch({
        variables: {
          username: "",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
    setUser();
  }, []);

  if (loading)
    return (
      <Text style={{ textAlign: "center", justifyContent: "center" }}>
        loading..
      </Text>
    );
  return (
    <FlatList
      ListHeaderComponent={() => (
        <SearchBar
          setSearch={setSearch}
          search={search}
          searchDispatch={searchDispatch}
        />
      )}
      data={data?.getUsername}
      renderItem={({ item }) => (
        <UserSearchCard
          user={item}
          userNow={userNow}
          searchDispatch={searchDispatch}
        />
      )}
      keyExtractor={(item) => item._id}
    />
  );
}
