import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/Users/Register";
import Login from "./components/Users/Login";
import Dashboard from "./components/Users/Dashboard";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Home from "./components/Home/Home";
import { useAuth } from "./AuthContext/AuthContext";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import Plans from "./components/Plans/Plan";
import FreePlanSignup from "./components/StripePayment/FreePlanSignup";
import CheckoutForm from "./components/StripePayment/CheckoutForm";
import PaymentSuccess from "./components/StripePayment/PaymentSuccess";
import ContentGenerationHistory from "./components/JobAnalysis/ContentHistory";
import AppFeatures from "./components/Features/Features";
import AboutUs from "./components/About/About";
import JobAnalysis from "./components/JobAnalysis/JobAnalysis";
import AiJobSearch from "./components/AiJobSearch/AiJobSearch";
import AiMockInterview from "./components/AiMockInterview/AiMockInterview";
import AiSkillAssessment from "./components/AiSkillAssessment/AiSkillAssessment";

export default function App() {
  //custom auth hook
  const { isAuthenticated } = useAuth();

  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
        {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/analyse-job"
            element={
              <AuthRoute>
                <JobAnalysis />
              </AuthRoute>
            }
          />
          <Route
            path="/ai-job-search"
            element={
              <AuthRoute>
                <AiJobSearch />
              </AuthRoute>
            }
          />
          <Route
            path="/ai-mock-interview"
            element={
              <AuthRoute>
                <AiMockInterview />
              </AuthRoute>
            }
          />
          <Route
            path="/ai-skill-assessment"
            element={
              <AuthRoute>
                <AiSkillAssessment />
              </AuthRoute>
            }
          />
          <Route
            path="/history"
            element={
              <AuthRoute>
                <ContentGenerationHistory />
              </AuthRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route
            path="/free-plan"
            element={
              <AuthRoute>
                <FreePlanSignup />
              </AuthRoute>
            }
          />
          <Route
            path="/checkout/:plan"
            element={
              <AuthRoute>
                <CheckoutForm />
              </AuthRoute>
            }
          />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/features" element={<AppFeatures />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
