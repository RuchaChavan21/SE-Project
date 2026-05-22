import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Lesson from '../pages/Lesson';
import Quiz from '../pages/Quiz';
import Profile from '../pages/Profile';
import Onboarding from '../pages/Onboarding';
import TopicRealm from '../pages/TopicRealm';
import FocusMode from '../pages/FocusMode';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="topic/:id" element={<TopicRealm />} />
        <Route path="focus" element={<FocusMode />} />
        <Route path="lesson/:id" element={<Lesson />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="profile" element={<Profile />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
