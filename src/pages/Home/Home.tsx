import { Link } from "react-router-dom";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <div className={style.btns}>
        <Link to={"/registration"} className={style.btn}>
          <button className={style.btn}>Регистрация</button>
        </Link>
        <Link to={"/login"} className={style.btn}>
          <button className={style.btn}>Вход</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
