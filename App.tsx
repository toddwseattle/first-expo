import React, { useState } from "react";
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
/**
 * In typescript we need to create a type that contains all top level screens and their params
 */
export type RootStackParamList = {
  ScheduleScreen: undefined;
  CourseDetailScreen: CourseDetailScreenProps; //todo rename to look like edit screen
  CourseEditScreen: CourseEditScreenParams;
};
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [user, setUser] = useState<UserData>(DEFAULT_ADMIN);
  return (
    <UserContext.Provider value={user}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={{ title: "Schedule" }}
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
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
};

export default App;
