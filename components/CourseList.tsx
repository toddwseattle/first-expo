import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Course, iCourse } from "./Course";
import { CourseSelector } from "./CourseSelector";
import { getCourseTerm, TermSelector } from "./TermSelector";
export type ReactDispatch<A> = (value: A) => void;
export const CourseList = ({
  courses = [],
  view,
}: {
  courses: iCourse[];
  view: (course: iCourse) => any;
}): JSX.Element => {
  const [selectedTerm, setSelectedTerm] = useState("Fall");
  const termCourses = courses.filter(
    (course) => selectedTerm === getCourseTerm(course)
  );
  return (
    <View>
      <ScrollView>
        <TermSelector
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
        <CourseSelector courses={termCourses} view={view} />
      </ScrollView>
    </View>
  );
};
