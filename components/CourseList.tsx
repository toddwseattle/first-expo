import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Course, iCourse } from "./Course";
import { getCourseTerm, TermSelector } from "./TermSelector";
export type ReactDispatch<A> = (value: A) => void;
export const CourseList = ({
  courses = [],
}: {
  courses: iCourse[];
}): JSX.Element => {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const termCourses = courses.filter(
    (course) => selectedTerm === getCourseTerm(course)
  );
  return (
    <View>
      <TermSelector
        selectedTerm={selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
      <ScrollView>
        <View style={styles.courseList}>
          {termCourses.map((course) => (
            <Course key={course.id} course={course} />
          ))}
        </View>
      </ScrollView>
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
