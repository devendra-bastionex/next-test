import './course-details.css';
export default function CourseDetailsLayout({ children }) {
  return (
    <div className="course-details-layout">
        <p>This is course details page layout.</p>
        {children}
     </div>
  );
}
