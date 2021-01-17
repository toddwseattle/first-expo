import React from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { iCourse } from "../components/Course";

const Field = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.field}>{value}</Text>
    </View>
  );
};
export interface CourseDetailScreenProps {
  course: iCourse;
}

const CourseDetailScreen = ({
  route: {
    params: { course },
  },
}: {
  route: { params: CourseDetailScreenProps };
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Field label="ID" value={course.id} />
        <Field label="Meeting times" value={course.meets} />
        <Field label="Title" value={course.title} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccccb3",
  },
  field: {
    height: 40,
    width: 300,
    padding: 5,
    backgroundColor: "white",
  },
  fieldContainer: {
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  label: {
    fontWeight: "bold",
  },
});

export default CourseDetailScreen;
