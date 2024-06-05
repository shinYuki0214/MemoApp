import { View, TextInput, StyleSheet } from "react-native";
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView";
import CircleButton from "../../components/CircleButton";
import Icon from "../../components/Icon";
import { router } from "expo-router";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../../config";
import { useState } from "react";
const handlePress = (bodyText: string): void => {
  if (auth.currentUser === null) {
    return;
  }
  addDoc(collection(db, `users/${auth.currentUser.uid}/memos`), {
    bodyText: bodyText,
    updatedAt: Timestamp.fromDate(new Date()),
  })
    .then((docRef) => {
      console.log("success", docRef.id);
      router.back();
    })
    .catch((error) => {
      console.log(error);
    });
};
const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState("");
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus
          multiline
          style={styles.input}
          value={bodyText}
          onChangeText={(text) => {
            setBodyText(text);
          }}
        />
      </View>
      <CircleButton
        onPress={() => {
          handlePress(bodyText);
        }}
      >
        <Icon name="check" size={40} color="#fff"></Icon>
      </CircleButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: "#fff",
  },
});
export default Create;
