import Routes from "./routes/Routes.tsx";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth.ts";
import { useAppDispatch } from "./redux/store.ts";
import Header from "./components/Header/Header.tsx";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
