import React from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityComponent,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
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

export const Course = ({
  course,
  isSelected,
  select,
}: {
  course: iCourse;
  isSelected: boolean;
  select: (course: iCourse) => void;
}) => (
  <TouchableOpacity style={styles.courseButton} onPress={() => select(course)}>
    <Text style={styles.courseText}>{`CS ${getCourseNumber(course)}\n${
      course.meets
    }`}</Text>
  </TouchableOpacity>
);

const courseButtonBase: ViewStyle = {
  flex: 1,
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  margin: 10,
  height: 60,
  padding: 10,
  minWidth: 90,
  maxWidth: 90,
};

const styles = StyleSheet.create({
  courseButton: {
    ...courseButtonBase,
    backgroundColor: "#66b0ff",
  },
  courseButtonSelected: {
    ...courseButtonBase,
    backgroundColor: "#004a99",
  },
  courseText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});
