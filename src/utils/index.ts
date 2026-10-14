export const getBaseURL = () => {
  return process.env.NEXT_PUBLIC_API_URL || '/api/v1';
};
