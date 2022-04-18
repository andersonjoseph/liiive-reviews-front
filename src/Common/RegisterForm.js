import { useForm } from 'react-hook-form';
import { signUp } from '../API';
import { useAlert } from 'react-alert';
import { Button } from './Button';

export function RegisterForm(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const alert = useAlert();

  async function onSubmit(data) {
    try {
      await signUp(data.name, data.email, data.password);
      alert.success('Cuenta creada correctamente, inicia sesión para continuar');
      window.location.reload();
      props.requestClose();
    } catch (err) {
      if (err.response.status === 400) {
        setError('signUp', {
          message: 'Ya existe un usuario con este email',
        });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 w-full md:w-auto text-center md:text-left text-2xl font-bold text-slate-700">
        Regístrate
      </h1>

      <div>
        <label className="text-slate-700">Nombre</label>
        <input
          {...register('name')}
          required
          type="text"
          placeholder="Elliot Alderson"
          className="mb-4 w-full p-2 outline outline-1 outline-slate-400 rounded-md"
        />
      </div>

      <div>
        <label className="text-slate-700">Email</label>
        <input
          {...register('email')}
          required
          type="email"
          placeholder="tu@email.com"
          className="mb-4 w-full p-2 outline outline-1 outline-slate-400 rounded-md"
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

      {errors.signUp && (
        <span className="text-red-500">{errors.signUp.message}</span>
      )}

      <div className="mt-4">
        <Button onClick={() => clearErrors('signUp')}>Registrarte</Button>
      </div>

      <div className="text-center mt-4 text-slate-500">
        ¿Ya tienes una cuenta?{' '}
        <button onClick={props.openLoginTab} className="font-bold">
          Inicia sesión
        </button>
      </div>
    </form>
  );
}
