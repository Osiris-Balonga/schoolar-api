class PopulateSchoolar {
  /**
   * notDefault
   * @param {} params
   * @returns
   */
  students() {
    return [
      {
        path: "classroom_id",
        select: "",
      },
    ];
  }
  teachers() {
    return [
      {
        path: "course_id",
        select: "",
      },
      {
        path: "classroom_id",
        select: "",
      },
    ];
  }
  enrollments() {
    return [
      {
        path: "student_id",
        select: "",
      },
      {
        path: "academicYear_id",
        select: "",
      },
      {
        path: "classroom_id",
        select: "",
      },
    ];
  }
  grades() {
    return [
      {
        path: "student_id",
        select: "",
      },
      {
        path: "academicYear_id",
        select: "",
      },
      {
        path: "course_id",
        select: "",
      },
    ];
  }
  payments() {
    return [
      {
        path: "student_id",
        select: "",
      },
      {
        path: "academicYear_id",
        select: "",
      },
    ];
  }
  timetables() {
    return [
      {
        path: "student_id",
        select: "",
      },
      {
        path: "academicYear_id",
        select: "",
      },
      {
        path: "classroom_id",
        select: "",
      },
      {
        path: "course_id",
        select: "",
      },
      {
        path: "teacher_id",
        select: "",
      },
    ];
  }
}

module.exports = PopulateSchoolar;
