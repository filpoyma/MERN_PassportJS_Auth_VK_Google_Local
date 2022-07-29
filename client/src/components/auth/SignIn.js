import React from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context';
import { baseUrl } from '../../api/urls';
import { Modal } from '@daypilot/modal';

const SignIn = () => {
  const history = useHistory();
  const { setAuth, setUser } = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);

  const loginHandler = async () => {
    const form = [
      { name: 'SignIn Form' },
      { name: 'email', id: 'email' },
      { name: 'password', id: 'password' },
    ];
    const data = {
      email: 'elb@elb.ru',
      password: 'dasBoot',
    };
    const modal = await Modal.form(form, data);
    if(modal.canceled) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: modal.result.email,
          password: modal.result.password,
        }),
      });
      if (res.status !== 200) {
        setLoading(false);
        return alert(`Ошибка входа - ${res.statusText}`);
      }
      const isAuth = await res.json();
      setUser(isAuth.user);
      setAuth(isAuth?.session);
      alert(`Инфо: ${isAuth?.message}`);
      setTimeout(() => {
        history.push('/home');
      }, 500);
    } catch ({ message }) {
      console.log('Err: ', message);
      alert(`Ошибка авторизации - ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const vkHandler = () => {
    setLoading(true);
    location.href = `${baseUrl}/api/auth/vkontakte`;
  };

  const googleHandler = () => {
    setLoading(true);
    location.href = `${baseUrl}/api/auth/google`;
  };

  return (
    <div>
      <span className="component">
        <button onClick={loginHandler} disabled={loading}>
          Local auth strategy
        </button>
        <button onClick={vkHandler} disabled={loading}>
          VK auth strategy
        </button>
        <button onClick={googleHandler} disabled={loading}>
          Google auth strategy
        </button>
        {/*<a href={`${baseUrl}/api/auth/vkontakte`} >LoginWithVK</a>*/}
        {/*<a href={`${baseUrl}/api/auth/google`} >LoginWithGoogle</a>*/}
      </span>
    </div>
  );
};

export default SignIn;
