import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { CourseViewFunction } from "../screens/ScheduleScreen";
import { hasConflict } from "../utils/utils";
import { iCourse, Course } from "./Course";

export const CourseSelector = ({
  courses,
  view,
}: {
  courses: iCourse[];
  view: CourseViewFunction;
}) => {
  const [selected, setSelected] = useState<iCourse[]>([]);
  const toggle = (course: iCourse) => {
    //  console.log(`toggle ${course.title}`);
    setSelected((selected) =>
      selected.includes(course)
        ? selected.filter((x) => x !== course)
        : [...selected, course]
    );
  };
  return (
    <View style={styles.courseList}>
      {courses.map((course) => (
        <Course
          key={course.id}
          course={course}
          isSelected={selected.includes(course)}
          select={toggle}
          isDisabled={hasConflict(course, selected)}
          view={view}
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
