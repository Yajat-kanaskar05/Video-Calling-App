import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import NotificationsPage from "./pages/notificationsPage.jsx";
import CallPage from "./pages/callPage.jsx";
import ChatPage from "./pages/chatPage.jsx";
import OnboardingPage from "./pages/onboardingPage.jsx";
import PageLoader from "./components/PageLoader.jsx";

import toast, { Toaster } from "react-hot-toast";
import { useAuthUser } from './hooks/useAuthUser.js';
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {

  const { isLoading, authUser } = useAuthUser()
  const {theme} = useThemeStore()

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />

  return (
    <div className="h-screen" data-theme={theme}>
      {/* <button className="btn btn-secondary" onClick={() => toast.success("Hwllo World")}>Create a Toast</button> */}
      <Routes>

        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />

        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <NotificationsPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
        )} />
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ? <CallPage /> : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>} />
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={false}>
            <ChatPage />
          </Layout>
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="/onboarding" element={isAuthenticated ? (
          !isOnboarded ? (
            <OnboardingPage />
          ) : (
            <Navigate to="/" />
          )
        ) : (
          <Navigate to="/login" />
        )} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;