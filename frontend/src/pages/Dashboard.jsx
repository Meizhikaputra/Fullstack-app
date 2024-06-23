import { useStateContext } from "../contexts/ContextProvider";

const Dashboard = () => {
  const { user } = useStateContext();
  return (
    <>
      <div>{user.name}</div>
    </>
  );
};

export default Dashboard;
