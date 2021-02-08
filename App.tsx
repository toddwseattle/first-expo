import React, { useEffect, useState } from "react";
import ScheduleScreen from "./screens/ScheduleScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CourseDetailScreen, {
  CourseDetailScreenProps,
} from "./screens/CourseDetailScreen";
import { DEFAULT_ADMIN, DEFAULT_USER, UserData } from "./utils/User";
import UserContext from "./components/UserContext";
import {
  CourseEditScreen,
  CourseEditScreenParams,
  CourseEditScreenProps,
} from "./screens/CourseEditScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { RegisterScreenParams } from "./screens/RegisterScreen";
import { Button } from "react-native";
import { firebase } from "./utils/firebase";
/**
 * In typescript we need to create a type that contains all top level screens and their params
 */
export type RootStackParamList = {
  ScheduleScreen: undefined;
  CourseDetailScreen: CourseDetailScreenProps; //todo rename to look like edit screen
  CourseEditScreen: CourseEditScreenParams;
  RegisterScreen: RegisterScreenParams;
};
const Stack = createStackNavigator<RootStackParamList>();

const SignInButton = ({ navigation, user }: { navigation: any; user: any }) =>
  user && user.uid ? (
    <Button
      title="Logout"
      color="#448aff"
      onPress={() => firebase.auth().signOut()}
    />
  ) : (
    <Button
      title="Sign In"
      color="#448aff"
      onPress={() => navigation.navigate("RegisterScreen")}
    />
  );

const App = () => {
  const [user, setUser] = useState<UserData>(DEFAULT_USER);
  const [auth, setAuth] = useState<firebase.User>();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) setAuth(auth);
    });
  }, []);
  useEffect(() => {
    if (auth?.uid) {
      const db = firebase.database().ref("users").child(auth.uid);
      const handleData = (snap: any) => {
        console.log(snap.val());
        const updateUser = { uid: auth.uid, ...snap.val() };
        console.log(updateUser);
        setUser((updateUser as unknown) as UserData);
        console.log(user);
      };
      db.on("value", handleData, (error: any) => alert(error));
      return () => {
        db.off("value", handleData);
      };
    } else {
      setUser(DEFAULT_USER);
    }
  }, [auth]);

  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={({ navigation }) => ({
              title: "Schedule",
              headerRight: () => (
                <SignInButton navigation={navigation} user={user} />
              ),
            })}
          />
          <Stack.Screen
            name="CourseDetailScreen"
            component={CourseDetailScreen}
            options={{ title: "Course Detail" }}
          />
          <Stack.Screen
            name="CourseEditScreen"
            component={CourseEditScreen}
            options={{ title: "Course Editor" }}
          />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
