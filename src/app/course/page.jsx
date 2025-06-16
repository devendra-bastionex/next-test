import Link from "next/link";
import React from "react";
export default function CoursePage() {
  return (
    <>
      <main>
        <h1>Course Page</h1>
      </main>
      <main>
        <ul>
          <li><Link href={`/course/course-details/course_1`}>Course 1</Link></li>
          <li><Link href={`/course/course-details/course_2`}>Course 2</Link></li>
          <li><Link href={`/course/course-details/course_3`}>Course 3</Link></li>
          <li><Link href={`/course/course-details/course_4`}>Course 4</Link></li>
          <li><Link href={`/course/course-details/course_5`}>Course 5</Link></li>
        </ul>
      </main>
    </>
  );
}
