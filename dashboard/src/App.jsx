import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Analyst from "./pages/Analyst";
import Calendar from "./pages/Calendar";
import Athlete from "./pages/Athlete";
import Login from "./pages/Login";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route Component (for login/register pages)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Layout Component
const Layout = ({ children, showAddAthleteModal, setShowAddAthleteModal }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex overflow-y-hidden bg-white font-inter">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={`body h-full overflow-hidden lg:ml-auto max-lg:w-full relative px-4
         ${
           isSidebarOpen
             ? "lg:ml-64 lg:w-[calc(100%-256px)]"
             : "lg:ml-20 lg:w-[calc(100%-80px)]"
         } `}
      >
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          onAddAthlete={() => setShowAddAthleteModal(true)}
        />
        {children}
      </div>
      <ToastContainer />
    </div>
  );
};

function App() {
  const [showAddAthleteModal, setShowAddAthleteModal] = useState(false);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout showAddAthleteModal={showAddAthleteModal} setShowAddAthleteModal={setShowAddAthleteModal}>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analyst"
              element={
                <ProtectedRoute>
                  <Layout showAddAthleteModal={showAddAthleteModal} setShowAddAthleteModal={setShowAddAthleteModal}>
                    <Analyst />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Layout showAddAthleteModal={showAddAthleteModal} setShowAddAthleteModal={setShowAddAthleteModal}>
                    <Calendar />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/athletes"
              element={
                <ProtectedRoute>
                  <Layout showAddAthleteModal={showAddAthleteModal} setShowAddAthleteModal={setShowAddAthleteModal}>
                    <Athlete 
                      showAddAthleteModal={showAddAthleteModal}
                      setShowAddAthleteModal={setShowAddAthleteModal}
                    />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
