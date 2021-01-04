import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Course, iCourse, iSchedule } from "./components/Course";
import { CourseList } from "./components/CourseList";

const schedule: iSchedule = {
  title: "CS Courses for 2018-2019",
  courses: [
    {
      id: "F101",
      title: "Computer Science: Concepts, Philosophy, and Connections",
      meets: "MWF 11:00-11:50",
    },
    {
      id: "F110",
      title: "Intro Programming for non-majors",
      meets: "MWF 10:00-10:50",
    },
    {
      id: "F111",
      title: "Fundamentals of Computer Programming I",
      meets: "MWF 13:00-13:50",
    },
    {
      id: "F211",
      title: "Fundamentals of Computer Programming II",
      meets: "TuTh 12:30-13:50",
    },
  ],
};
const Banner = ({ title = "default" }) => (
  <Text style={styles.bannerStyle}>{title}</Text>
);

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
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
