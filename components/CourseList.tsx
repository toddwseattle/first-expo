import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { CourseViewFunction } from "../screens/ScheduleScreen";
import { Course, iCourse } from "./Course";
import { CourseSelector } from "./CourseSelector";
import { getCourseTerm, TermSelector } from "./TermSelector";
export type ReactDispatch<A> = (value: A) => void;
export interface CourseListProps {
  courses: iCourse[];
  view: CourseViewFunction;
}

export const CourseList = ({
  courses = [],
  view,
}: CourseListProps): JSX.Element => {
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
