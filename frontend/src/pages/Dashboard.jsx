import { useStateContext } from "../contexts/ContextProvider";

const Dashboard = () => {
  const { user, token } = useStateContext();
  return (
    <>
      <div>{user.name}</div>
    </>
  );
};

export default Dashboard;
