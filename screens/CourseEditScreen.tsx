import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { iCourse } from "../components/Course";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Form from "../components/Form";
import * as Yup from "yup";
import { useState } from "react";
import { firebase } from "../utils/firebase";

const validationSchema = Yup.object().shape({
  id: Yup.string()
    .required()
    .matches(/(F|W|S)\d{3,}/, "Must be a term and 3 digit number")
    .label("ID"),
  meets: Yup.string()
    .required()
    .matches(
      /(M|Tu|Th|F)+ +\d\d?:\d\d-\d\d?:\d\d/,
      "Must be weekdays followed by start"
    )
    .label("Meeting Times"),
  title: Yup.string().required().label("Title"),
});

export type CourseEditScreenProps = StackScreenProps<
  RootStackParamList,
  "CourseEditScreen"
>;
export interface CourseEditScreenParams {
  course: iCourse;
}
export function CourseEditScreen({ navigation, route }: CourseEditScreenProps) {
  const course = route.params.course;
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(values: iCourse) {
    const { id, meets, title } = values;
    const course: iCourse = { id, meets, title };
    console.log(`submitting course: ${course.id} ${course.title}`);

    firebase
      .database()
      .ref("courses")
      .child(id)
      .set(course)
      .catch((error) => {
        setSubmitError(error.message);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form
          validationSchema={validationSchema}
          initialValues={{
            id: course.id,
            meets: course.meets,
            title: course.title,
          }}
          onSubmit={(values: iCourse) => handleSubmit(values)}
        >
          <Form.Field
            name="id"
            leftIcon="identifier"
            placeholder="F110"
            autoCapitalize="none"
            autoFocus={true}
          />
          <Form.Field
            name="meets"
            leftIcon="calendar-range"
            placeholder="MThu 12:00-13:50"
            autoCapitalize="none"
          />
          <Form.Field
            name="title"
            leftIcon="format-title"
            placeholder="Introduction to programming"
          />
          <Form.Button title={"Update"} />
          {<Form.ErrorMessage error={submitError} visible={true} />}
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});
