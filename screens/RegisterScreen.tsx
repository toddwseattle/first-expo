import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

import React, { useState } from "react";
import * as Yup from "yup";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Form from "../components/Form";
import { firebase } from "../utils/firebase";
export type RegisterScreenProps = StackScreenProps<
  RootStackParamList,
  "RegisterScreen"
>;
export interface RegisterScreenParams {
  user?: string;
}
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a valid email")
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Confirmation password must match password"
  ),
});
export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [signInError, setSignInError] = useState("");
  async function loginWithEmail(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  async function registerWithEmail(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  async function handleOnSignUp(values: any) {
    const { name, email, password } = values;
    setSignInError("");
    try {
      const authCredential = await registerWithEmail(email, password);
      const user = authCredential.user;
      await user?.updateProfile({ displayName: name });
      navigation.navigate("ScheduleScreen");
    } catch (error) {
      setSignInError(error.message);
    }
  }
  async function handleOnLogin(values: any) {
    const { email, password } = values;
    setSignInError("");
    try {
      await loginWithEmail(email, password);
      navigation.navigate("ScheduleScreen");
    } catch (error) {
      setSignInError(error.message);
    }
  }
  const handleOnSubmit = (values: any) => {
    return values.confirmPassword
      ? handleOnSignUp(values)
      : handleOnLogin(values);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          <Form.Field
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <Form.Field
            name="password"
            leftIcon="lock"
            placeholder="Enter Password"
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
            autoCorrect={false}
          />
          <Form.Field
            name="confirmPassword"
            leftIcon="lock"
            placeholder="Confirm Password"
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
            autoCorrect={false}
          />
          <Form.Button
            title={(values: any) =>
              values.confirmPassword ? "Register" : "Login"
            }
          />
          {<Form.ErrorMessage error={signInError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});
