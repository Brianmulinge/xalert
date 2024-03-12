// pages/dashboard.tsx
import { GetServerSideProps } from "next";
import { checkAuth } from "../utils/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Use the checkAuth function for server-side authentication check
  return await checkAuth(context);
};

const Dashboard = () => {
  return (
      <div>
        {/* Dashboard content */}
        <h1>Dashboard</h1>
      </div>
  );
};

export default Dashboard;
