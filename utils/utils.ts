// getCourseTerm(course) => string
//   given a course, returns the term the course is in
//
// getCourseNumber(course) => string
//   given a course, returns its course number
//

import { iCourse, iHours } from "../components/Course";

// terms -- a variable set to the list of academic terms
const termMap = { F: "Fall", W: "Winter", S: "Spring" } as any;
const terms = Object.values(termMap);

const getCourseTerm = (course: iCourse) => termMap[course.id.charAt(0)];

const getCourseNumber = (course: iCourse) => course.id.slice(1);

// addTimes(course) => void
//   given a course with a meeting time, e.g., "MTuWF 9:00-10:30"
//   adds a days value, e.g., ["M", "Tu", "W", "F"]
//     and an hours value, e.g., { start: 540, end: 630 },
//     with start and end in minutes past midnight

const allDays = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
const timesPat = /(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d)/;

const addTimes = (course: iCourse) => {
  course.days = allDays.filter((day) => course.meets.includes(day));

  const [match, hh1, mm1, hh2, mm2]: RegExpExecArray = timesPat.exec(
    course.meets
  ) as RegExpExecArray;
  if (match) {
    course.hours = {
      start: +hh1 * 60 + +mm1 * 1,
      end: +hh2 * 60 + +mm2 * 1,
    };
  }
};

// hasConflict(course, selected) => boolean
//   given a course and list of courses
//   returns true if course conflicts with any item in selected
//
// courseConflict(course1, course1) => boolean
//   given two courses
//   returns if they are not the same course, occur in the
//     same quarter, have at least one day in common, and
//     the start/end times overlap

const daysOverlap = (days1: string[], days2: string[]) =>
  days1 && days2 && days2.some((day) => days1.includes(day));

const hoursOverlap = (hours1: iHours, hours2: iHours) =>
  hours1 &&
  hours2 &&
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end);

const timeConflict = (course1: iCourse, course2: iCourse) =>
  daysOverlap(course1.days as string[], course2.days as string[]) &&
  hoursOverlap(course1.hours as iHours, course2.hours as iHours);

const courseConflict = (course1: iCourse, course2: iCourse) =>
  course1 !== course2 &&
  getCourseTerm(course1) === getCourseTerm(course2) &&
  timeConflict(course1, course2);

// SIDE EFFECT: the first time a course is compared to other courses,
// its meeting times are parsed and added, so that this work
// doesn't need to be done again. Clear the days field if
// changing meeting times.
const hasConflict = (course: iCourse, selected: iCourse[]) => {
  if (!course.days) addTimes(course);
  return selected.some((selection) => courseConflict(course, selection));
};

export { getCourseNumber, getCourseTerm, hasConflict, terms };
