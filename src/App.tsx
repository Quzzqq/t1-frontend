import Routes from "./routes/Routes.tsx";
import { fetchAuthMe } from "./redux/slices/auth.ts";
import { useAppDispatch } from "./redux/store.ts";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  // console.log(1);
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
