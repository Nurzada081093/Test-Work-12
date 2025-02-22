import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import { UserLogin } from '../../../../types';
import { useAppDispatch } from '../../../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../usersThunk.ts';

const LoginContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (user: UserLogin) => {
    await dispatch(loginUser({...user})).unwrap();
    navigate('/');
  };

  return (
    <>
      <LoginForm login={login}/>
    </>
  );
};

export default LoginContainer;