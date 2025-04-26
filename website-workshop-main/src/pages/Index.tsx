
import { Navigate } from "react-router-dom";

const Index = () => {
  // Simply redirect to the dashboard, which will then either show the dashboard or redirect to login
  return <Navigate to="/dashboard" replace />;
};

export default Index;
