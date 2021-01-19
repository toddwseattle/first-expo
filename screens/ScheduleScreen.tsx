import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Course, iCourse, iSchedule } from "../components/Course";
import { CourseList } from "../components/CourseList";
import { CourseDetailScreenProps } from "./CourseDetailScreen";
import { RootStackParamList } from "../App";
import UserContext from "../components/UserContext";

const Banner = ({ title }: { title: string }) => (
  <Text style={styles.bannerStyle}>{title || "[loading...]"}</Text>
);
export type CourseViewFunction = (course: iCourse) => void;
export type CourseDetailNavigationProps = StackNavigationProp<
  RootStackParamList,
  "CourseDetailScreen"
>;
export interface ScheduleScreenProps {
  navigation: CourseDetailNavigationProps;
}
export default function ScheduleScreen({ navigation }: ScheduleScreenProps) {
  const user = useContext(UserContext);
  const canEdit = user?.role;
  const [schedule, setSchedule] = useState({ title: "", courses: [] });
  const view: CourseViewFunction = (course: iCourse) => {
    navigation.navigate(canEdit ? "CourseEditScreen" : "CourseDetailScreen", {
      course,
    });
  };
  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    };
    fetchSchedule();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} view={view} />
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
  textStyle: { color: "red", fontWeight: "bold" },
  bannerStyle: {
    color: "#888",
    fontSize: 32,
  },
});

const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";
