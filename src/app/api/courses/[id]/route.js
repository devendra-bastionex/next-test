import { connectToDatabase } from '@/lib/mongoose';
import { Course } from '@/models/Course';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await connectToDatabase();
  const course = await Course.findById(params.id);
  return NextResponse.json(course);
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const data = await req.json();
  const updated = await Course.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  await Course.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Course deleted' });
}
