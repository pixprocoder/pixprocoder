export const getBaseURL = () => {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api/v1';
};
