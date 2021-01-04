import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface iCourse {
  id: string;
  title: string;
  meets: string;
}
interface iSchedule {
  title: string;
  courses: iCourse[];
}
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

const CourseList = ({ courses }: { courses: iCourse[] } = []): JSX.Element => (
  <View style={styles.courseList}>
    {courses.map((course) => (
      <Course key={course.id} course={course} />
    ))}
  </View>
);

const getCourseNumber = (course: iCourse) => course.id.slice(1);
const Course = ({ course }: { course: iCourse }) => (
  <TouchableOpacity style={styles.courseButton}>
    <Text style={styles.courseText}>{`CS ${getCourseNumber(course)}\n${
      course.meets
    }`}</Text>
  </TouchableOpacity>
);

export default function App() {
  return (
    <View style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: { color: "red", fontWeight: "bold" },
  bannerStyle: {
    color: "#888",
    fontSize: 32,
  },
  courseList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courseButton: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    height: 60,
    padding: 10,
    minWidth: 90,
    maxWidth: 90,
    backgroundColor: "#66b0ff",
  },
  courseText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});
