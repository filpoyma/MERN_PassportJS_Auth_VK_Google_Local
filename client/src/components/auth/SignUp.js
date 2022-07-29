import React from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context';
import { Modal } from '@daypilot/modal';

const SignUp = () => {
  const history = useHistory();
  const { setAuth } = React.useContext(Context);
  const [isLoading, setLoading] = React.useState(false);

  const signUpHandler = async () => {
    const form = [
      { name: 'Reg Form' },
      { name: 'name', id: 'name' },
      { name: 'email', id: 'email' },
      { name: 'password', id: 'password' },
    ];
    const data = {
      name: 'Elbrus',
      email: 'elb@elb.ru',
      password: 'dasBoot',
    };
    const modal = await Modal.form(form, data);
    if(modal.canceled) return;

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: modal.result.name,
          email: modal.result.email,
          password: modal.result.password,
        }),
      });
      if (res.status !== 200) {
        console.log('Ошибка регистрации', res.statusText);
        alert(`Ошибка регистрации ${res.statusText}`);
      }
      const isAuth = await res.json();
      setAuth(isAuth?.session);
      console.log('file-SignUp.js isAuth:', isAuth);
      if (isAuth?.err?.code === 11000)
        return alert('Пользователь с таким именем уже зарегестрирован.');
      alert(isAuth?.message);
      setTimeout(() => {
        history.push('/home');
      }, 1000);
    } catch ({ message }) {
      console.log('Err: ', message);
      alert(`signUpHandler error ${message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <span className="component">
        {' '}
        <button onClick={signUpHandler} disabled={isLoading}>
          SignUp Local
        </button>
      </span>
    </div>
  );
};

export default SignUp;
