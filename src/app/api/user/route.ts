export const GET = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {});
  const data = await res.json();

  return Response.json({ data });
};
