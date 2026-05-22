import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Lesson from '../pages/Lesson';
import Quiz from '../pages/Quiz';
import Profile from '../pages/Profile';
import Onboarding from '../pages/Onboarding';
import TestAI from '../pages/TestAI';
import LandingPage from '../pages/LandingPage';
import EducatorOnboarding from '../pages/EducatorOnboarding';
import EducatorDashboard from '../pages/EducatorDashboard';
import { useStudent } from '../context/StudentContext';
import { useUser } from '../context/UserContext';

const AppRoutes = () => {
  const { student } = useStudent();
  const { role, educatorProfile } = useUser();

  // Route 1: No role selected
  if (!role) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test-ai" element={<TestAI />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Route 2: Educator Flow
  if (role === 'educator') {
    if (!educatorProfile.dashboardReady) {
      return (
        <Routes>
          <Route path="/educator/onboarding" element={<EducatorOnboarding />} />
          <Route path="*" element={<Navigate to="/educator/onboarding" replace />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/educator" element={<EducatorDashboard />} />
        <Route path="*" element={<Navigate to="/educator" replace />} />
      </Routes>
    );
  }

  // Route 3: Student Flow
  if (role === 'student') {
    if (!student.isOnboarded) {
      return (
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/test-ai" element={<TestAI />} />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/test-ai" element={<TestAI />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lesson/:id" element={<Lesson />} />
          <Route path="quiz/:id" element={<Quiz />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    );
  }

  return <Navigate to="/" replace />;
};

export default AppRoutes;
