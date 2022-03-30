import { useModalStore, selectors } from '../stateStores';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import { Button } from './Button';
import { updateUser } from '../API';

export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const closeModal = useModalStore(selectors.closeModal);

  const alert = useAlert();

  async function onSubmit(data) {
    if (!data.password || data.password === '') delete data.password;

    const res = await updateUser(data);
    Object.keys(res).forEach((key) => {
      localStorage.setItem(key, res[key]);
    });

    alert.success('Perfil editado con éxito');
    closeModal();
  }

  async function logOut(ev) {
    ev.preventDefault();
    localStorage.clear();
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <h1 className="w-full md:w-auto text-center md:text-left text-2xl font-bold text-slate-700">
          Hola, {localStorage.name}
        </h1>
        <button onClick={logOut} className="text-red-500 font-bold self-end">
          Cerrar sesión
        </button>
      </div>

      <strong className="text-slate-500 mb-4 block">Tu información</strong>

      <div>
        <label className="text-slate-700">Nombre</label>
        <input
          {...register('name')}
          required
          type="text"
          placeholder="Elliot Alderson"
          className="mb-4 w-full p-2 outline outline-1 outline-slate-400 rounded-md"
          defaultValue={localStorage.getItem('name')}
        />
      </div>

      <div>
        <label className="text-slate-700">Email</label>
        <input
          required
          disabled
          type="email"
          placeholder={localStorage.getItem('email')}
          value={localStorage.getItem('email')}
          className="mb-4 w-full p-2 outline outline-1 outline-slate-400 bg-slate-200 rounded-md"
        />
      </div>

      <span className="my-4 block">
        <hr />
      </span>

      <div>
        <label className="text-slate-700">Nueva contraseña</label>
        <input
          {...register('password', { minLength: 8 })}
          type="password"
          placeholder="tu nueva contraseña"
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
        <Button onClick={() => clearErrors('signUp')}>Editar</Button>
      </div>
    </form>
  );
}
