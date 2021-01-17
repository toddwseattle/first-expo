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
import { CourseViewFunction } from "../screens/ScheduleScreen";

export interface iHours {
  start: number;
  end: number;
}
export interface iCourse {
  id: string;
  title: string;
  meets: string;
  days?: string[];
  hours?: iHours;
}
export interface iSchedule {
  title: string;
  courses: iCourse[];
}
const getCourseNumber = (course: iCourse) => course.id.slice(1);

export interface CourseProps {
  course: iCourse;
  isSelected: boolean;
  select: (course: iCourse) => void;
  isDisabled: boolean;
  view: CourseViewFunction;
}

export const Course = ({
  course,
  isSelected,
  select,
  isDisabled,
  view,
}: CourseProps) => (
  <TouchableOpacity
    style={
      styles[
        isSelected
          ? "courseButtonSelected"
          : isDisabled
          ? "courseButtonDisabled"
          : "courseButton"
      ]
    }
    onPress={() => {
      if (!isDisabled) select(course);
    }}
    onLongPress={() => view(course)}
  >
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
  courseButtonDisabled: {
    ...courseButtonBase,
    backgroundColor: "#d3d3d3",
  },
  courseText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});
