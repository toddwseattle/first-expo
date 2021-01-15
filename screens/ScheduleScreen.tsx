import { StackNavigationState } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Course, iCourse, iSchedule } from "../components/Course";
import { CourseList } from "../components/CourseList";

const Banner = ({ title }: { title: string }) => (
  <Text style={styles.bannerStyle}>{title || "[loading...]"}</Text>
);

export default function ScheduleScreen({ navigation }: { navigation: any }) {
  const [schedule, setSchedule] = useState({ title: "", courses: [] });
  const view = (course: iCourse) =>
    navigation.navigate("CourseDetailScreen", { course });
  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    };
    fetchSchedule();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} view={view} />
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
  textStyle: { color: "red", fontWeight: "bold" },
  bannerStyle: {
    color: "#888",
    fontSize: 32,
  },
});

const url = "https://courses.cs.northwestern.edu/394/data/cs-courses.php";