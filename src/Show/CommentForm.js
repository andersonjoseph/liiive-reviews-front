import { Button } from '../Common';
import { useForm } from 'react-hook-form';
import { submitComment } from '../API';
import { useAlert } from 'react-alert';
import { useModalStore, selectors, useCommentsStore } from '../stateStores';

export default function CommentForm({ show }) {
  const { register, handleSubmit, reset } = useForm();
  const openModal = useModalStore(selectors.openModal);

  const addNewComment = useCommentsStore(selectors.addNewComment);
  const alert = useAlert();

  async function onSubmit(data) {
    if (!localStorage.token) {
      alert.info('Para publicar un comentario debes iniciar sesión');
      openModal();
    }

    data = {
      ...data,
      stars: Number(data.stars),
      show: Number(show),
    };

    const newComment = await submitComment(data);
    addNewComment(newComment);
    reset();

    alert.info('Comentario publicado');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select
        {...register('stars')}
        className="text-sm mb-2 w-full p-2 outline outline-1 outline-slate-400 rounded-md"
      >
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>

      <textarea
        required
        {...register('comment', { required: true })}
        className="mb-2 w-full p-2 outline outline-1 outline-slate-400 rounded-md"
      />

      <Button>Enviar</Button>
    </form>
  );
}
