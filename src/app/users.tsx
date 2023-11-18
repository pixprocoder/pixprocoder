import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name || user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
