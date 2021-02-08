import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { Course, iCourse, iSchedule } from "../components/Course";
import { CourseList } from "../components/CourseList";
import { CourseDetailScreenProps } from "./CourseDetailScreen";
import { RootStackParamList } from "../App";
import UserContext from "../components/UserContext";
import { firebase } from "../utils/firebase";
import { UserRole } from "../utils/User";

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
const fixCourses = (json: any) => ({
  ...json,
  courses: Object.values(json.courses),
});
export default function ScheduleScreen({ navigation }: ScheduleScreenProps) {
  const user = useContext(UserContext);
  console.log("schedule screen");
  console.log(user);
  const canEdit = user.role == ("admin" as UserRole);
  const [schedule, setSchedule] = useState({ title: "", courses: [] });
  const view: CourseViewFunction = (course: iCourse) => {
    navigation.navigate(canEdit ? "CourseEditScreen" : "CourseDetailScreen", {
      course,
    });
  };
  useEffect(() => {
    const db = firebase.database().ref();
    const handleData = (snap: firebase.database.DataSnapshot) => {
      if (snap.val()) setSchedule(fixCourses(snap.val()));
    };
    db.on("value", handleData);
    return () => {
      db.off("value", handleData);
    };
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
