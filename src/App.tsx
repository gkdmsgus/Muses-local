import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import ProjectListPage from './pages/ProjectListPage';
import MyPage from './pages/MyPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import EventListPage from './pages/EventListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { LoginPage } from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import SignupPage from './pages/SignupPage';
import OnBoardingPage from './pages/OnBoardingPage';
import EventDetailPage from './pages/EventDetailPage';
import CreateProjectPage from './pages/CreateProjectPage';
import EditProfilePage from './components/MyPage/profile/EditProfilePage';
import ProjectResultPage from './components/MyPage/project-result/ProjectResultPage';
import BillingSuccessPage from './pages/BillingSuccessPage';
import BillingFailPage from './pages/BillingFailPage';
import CheckinResultPage from './pages/CheckinResultPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const hideHeaderPrefixes = ['/admin', '/create', '/checkin'];
  const shouldHideHeader = hideHeaderPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  const shouldHideFooter = pathname.startsWith('/checkin');

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnBoardingPage />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/mypage">
          <Route index element={<MyPage />} />
          <Route path="editprofile" element={<EditProfilePage />} />
          <Route
            path="projectresult/:projectId"
            element={<ProjectResultPage />}
          />
        </Route>
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/billing/success" element={<BillingSuccessPage />} />
        <Route path="/billing/fail" element={<BillingFailPage />} />
        <Route path="/checkin/result" element={<CheckinResultPage />} />
        <Route path="/create" element={<CreateProjectPage />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}
