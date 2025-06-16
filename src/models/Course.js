import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true },
        duration: { type: String, required: true },
        description: String,
    },
    { timestamps: true, strict: false }
);

// Use mongoose.models.courses to match the model name 'courses'
export const Course = mongoose.models.courses || mongoose.model('courses', CourseSchema);
