import RegisterForm from "../../components/RegisterForm/RegisterForm.tsx";
import { UserRegister } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks.ts";
import { registerUser } from "../../usersThunk.ts";

const RegisterContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const register = async (user: UserRegister) => {
    await dispatch(registerUser({ ...user })).unwrap();
    navigate("/");
  };

  return (
    <>
      <RegisterForm register={register} />
    </>
  );
};

export default RegisterContainer;
