import UserListDuplicated from "./UserListDuplicated";
import { useListUsersQuery } from "./userApiSlice";

const UserList = () => {
  const { data, isLoading } = useListUsersQuery(null);

  return (
    <>
      <section>
        <h1>List of users active</h1>
        {isLoading ? (
          <p>Loading users</p>
        ) : (
          <ul>
            {data.data.map((user: { name: string; uuid: string }) => (
              <li key={user.uuid}>{user.name}</li>
            ))}
          </ul>
        )}
      </section>
      <UserListDuplicated />
    </>
  );
};

export default UserList;
