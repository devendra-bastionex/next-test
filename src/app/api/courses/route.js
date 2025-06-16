import { connectToDatabase } from '@/lib/mongoose';
import { Course } from '@/models/Course';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const courses = await Course.find().sort({ createdAt: -1 });
  return NextResponse.json(courses);
}

export async function POST(req) {
  await connectToDatabase();
  const data = await req.json();
  console.log("data===>>>", data);
  
  // Create a new course with the data
  const newCourse = await Course.create(data);
  
  return NextResponse.json(newCourse, { status: 201 });
}

