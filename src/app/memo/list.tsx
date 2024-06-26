import { View, StyleSheet, Text, FlatList } from "react-native";
import MemoListItem from "../../components/MemoListItem";
import CircleButton from "../../components/CircleButton";
import { useEffect, useState } from "react";
// import { Feather } from '@expo/vector-icons'
import Icon from "../../components/Icon";
import { router, useNavigation } from "expo-router";
import LogOutButton from "../../components/LogOutButton";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, auth } from "../../config";
import { type Memo } from "../../../types/memo";
const handlePress = (): void => {
  router.push("/memo/create");
};
const List = (): JSX.Element => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogOutButton />;
      },
    });
  }, []);

  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`);
    const q = query(ref, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteMemos: Memo[] = [];
      snapshot.forEach((doc) => {
        const { bodyText, updatedAt } = doc.data();
        remoteMemos.push({
          id: doc.id,
          bodyText,
          updatedAt,
        });
      });
      setMemos(remoteMemos);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={memos}
          renderItem={({ item }) => <MemoListItem memo={item} />}
        />
        {/* {memos.map((memo) => {
          return <MemoListItem memo={memo}></MemoListItem>;
        })} */}
      </View>
      <CircleButton onPress={handlePress}>
        <Icon name="plus" size={40} color="#fff"></Icon>
      </CircleButton>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default List;
