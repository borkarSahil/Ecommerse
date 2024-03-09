import { useAuth } from "../Context/auth.jsx";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      Home
      {JSON.stringify(auth, null, 4)}
    </div>
  );
};

export default Home;
