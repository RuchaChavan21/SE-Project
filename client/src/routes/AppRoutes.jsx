import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Lesson from '../pages/Lesson';
import Quiz from '../pages/Quiz';
import Profile from '../pages/Profile';
import Onboarding from '../pages/Onboarding';
import { useStudent } from '../context/StudentContext';

const AppRoutes = () => {
  const { student } = useStudent();

  if (!student.isOnboarded) {
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lesson/:id" element={<Lesson />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
