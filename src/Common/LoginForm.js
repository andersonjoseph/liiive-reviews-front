import { useModalStore, selectors } from '../stateStores';
import { useAlert } from 'react-alert';
import { signIn } from '../API';
import { useForm } from 'react-hook-form';
import { Button } from './Button';

export function LoginForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const closeModal = useModalStore(selectors.closeModal);

  const alert = useAlert();

  async function onSubmit(data) {
    try {
      let res = await signIn(data.email, data.password);
      localStorage.setItem('token', res.token);
      localStorage.setItem('id', res.id);
      localStorage.setItem('name', res.name);
      localStorage.setItem('role', res.role);
      localStorage.setItem('email', res.email);

      alert.success('Inicio de sesión correcto');
      window.location.reload();
      closeModal();
    } catch (err) {
      if (err.response.status === 401) {
        setError('login', {
          message: 'Contraseña o email incorrectos',
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 w-full md:w-auto text-center md:text-left text-2xl font-bold text-slate-700">
        Iniciar sesión
      </h1>
      <div className="mb-4">
        <label className="text-slate-700">Email</label>
        <input
          {...register('email')}
          required
          type="email"
          placeholder="tu@email.com"
          className="w-full p-2 outline outline-1 outline-slate-400 rounded-md"
        />
      </div>

      <div>
        <label className="text-slate-700">Contraseña</label>
        <input
          {...register('password', { minLength: 8 })}
          required
          type="password"
          placeholder="tu contraseña"
          className="mb-4 w-full p-2 outline outline-1 outline-slate-400 rounded-md"
        />
        {errors.password && (
          <span className="text-red-500">
            Tu contraseña debe ser de 8 caracteres o más
          </span>
        )}
      </div>

      {errors.login && (
        <span className="text-red-500">{errors.login.message}</span>
      )}

      <div className="mt-4">
        <Button onClick={() => clearErrors('login')}>Iniciar sesión</Button>
      </div>

      <div className="text-center mt-4 text-slate-500">
        ¿No tienes una cuenta?{' '}
        <button onClick={props.openRegisterTab} className="font-bold">
          Regístrate
        </button>
      </div>
    </form>
  );
}
