'use client';
import React from "react";
import { use } from 'react';

export default function CourseDetailsPage({params}) {
  const { course_slug } = use(params);
  console.log("course_slug",course_slug);
  
  return (
    <>
      <main>
        <h1>Course Details Page</h1>
      </main>
      <main>
        <ul>
          <li>Course Slug: <span>{course_slug}</span></li>
          <li>Course Duration:5h</li>
        </ul>
      </main>
    </>
  );
}
