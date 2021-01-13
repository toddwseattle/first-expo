import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { iCourse } from "./Course";
import { ReactDispatch } from "./CourseList";
const termMap: any = { F: "Fall", W: "Winter", S: "Spring" };
const terms = Object.values(termMap) as string[];
export const getCourseTerm: any = (course: iCourse) =>
  termMap[course.id.charAt(0)];

const TermButton = ({
  term,
  isActive,
  setSelectedTerm,
}: {
  term: string;
  isActive: boolean;
  setSelectedTerm: ReactDispatch<React.SetStateAction<string>>;
}) => (
  <TouchableOpacity
    style={styles[isActive ? "termButtonActive" : "termButton"]}
    onPress={() => setSelectedTerm(term)}
  >
    <Text style={styles.termText}>{term}</Text>
  </TouchableOpacity>
);

export const TermSelector = ({
  selectedTerm,
  setSelectedTerm,
}: {
  selectedTerm: string;
  setSelectedTerm: ReactDispatch<React.SetStateAction<string>>;
}) => (
  <View style={styles.termSelector}>
    {terms.map((term) => (
      <TermButton
        key={term}
        term={term}
        isActive={term == selectedTerm}
        setSelectedTerm={setSelectedTerm}
      />
    ))}
  </View>
);
const styles = StyleSheet.create({
  termSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
  },
  termButton: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    height: 40,
    padding: 10,
    minWidth: 90,
    maxWidth: 90,
    backgroundColor: "#4f9f64",
  },
  termButtonActive: {
    flex: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    height: 40,
    padding: 10,
    minWidth: 90,
    maxWidth: 90,
    backgroundColor: "#105f25",
  },
  termText: {
    color: "#fff",
    fontSize: 15,
  },
});
