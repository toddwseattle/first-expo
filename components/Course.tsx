import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
export interface iCourse {
  id: string;
  title: string;
  meets: string;
}
export interface iSchedule {
  title: string;
  courses: iCourse[];
}
const getCourseNumber = (course: iCourse) => course.id.slice(1);

export const Course = ({ course }: { course: iCourse }) => (
  <TouchableOpacity style={styles.courseButton}>
    <Text style={styles.courseText}>{`CS ${getCourseNumber(course)}\n${
      course.meets
    }`}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
