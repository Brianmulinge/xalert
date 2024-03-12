// pages/profile.tsx
import { GetServerSideProps} from 'next';
import { checkAuth } from '../utils/auth';

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Use the checkAuth function for server-side authentication check
  return await checkAuth(context);
};

const Profile = () => {
  // Your profile page content
  return <div>Profile content here</div>;
};

export default Profile;
