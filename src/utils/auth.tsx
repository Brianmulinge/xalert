// utils/auth.tsx
import { GetServerSidePropsContext } from 'next';
import { validateToken } from './validateToken'; // Assume this is your token validation logic

export async function checkAuth(context:GetServerSidePropsContext) {
  const token = context.req.cookies['token']; // Adjust this depending on how you store the token

  const isValid = await validateToken(token);
  if (!isValid) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }

  return { props: {} }; // Token is valid, return empty props
}
export { validateToken };

