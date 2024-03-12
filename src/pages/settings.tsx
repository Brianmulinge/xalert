// pages/settings.tsx
import { GetServerSideProps } from "next";
import { checkAuth } from "../utils/auth";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Use the checkAuth function for server-side authentication check
  return await checkAuth(context);
};
const Settings = () => {
  // Your settings page content
  return <div>Settings content here</div>;
};

export default Settings;
