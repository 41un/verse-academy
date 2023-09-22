import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from "./pages/Home";
import AllCourses from "./pages/AllCourses";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/courses" element={<AllCourses />} />
        <Route path="/courses/:courseId" element={<Course />} />
        <Route path="/courses/:courseId/lessons/:lessonId" element={<Lesson />} />
      </Routes>
    </Router>
  );
}

export default App;
