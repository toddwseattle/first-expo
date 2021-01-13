import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { iCourse, Course } from "./Course";

export const CourseSelector = ({ courses }: { courses: iCourse[] }) => {
  const [selected, setSelected] = useState<iCourse[]>([]);
  const toggle = (course: iCourse) =>
    setSelected((selected) =>
      selected.includes(course)
        ? selected.filter((x) => x !== course)
        : [...selected, course]
    );
  return (
    <View style={styles.courseList}>
      {courses.map((course) => (
        <Course
          key={course.id}
          course={course}
          isSelected={selected.includes(course)}
          select={toggle}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
