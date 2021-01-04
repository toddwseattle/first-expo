import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Course, iCourse } from "./Course";

export const CourseList = ({
  courses = [],
}: {
  courses: iCourse[];
}): JSX.Element => {
  return (
    <ScrollView>
      <View style={styles.courseList}>
        {courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </View>
    </ScrollView>
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
