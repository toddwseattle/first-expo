import React from "react";
import ScheduleScreen from "./screens/ScheduleScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CourseDetailScreen, {
  CourseDetailScreenProps,
} from "./screens/CourseDetailScreen";
/**
 * In typescript we need to create a type that contains all top level screens and their params
 */
export type RootStackParamList = {
  ScheduleScreen: undefined;
  CourseDetailScreen: CourseDetailScreenProps;
};
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
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
          options={{ title: "Course detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
