import { Button } from '../Common';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { deleteComment, updateComment } from '../API';
import { useCommentsStore, selectors } from '../stateStores';

function EditCommentForm(props) {
  const { register, handleSubmit } = useForm();
  const updateCommentFromList = useCommentsStore(selectors.updateComment);

  async function onSubmit(data) {
    await updateComment(props.id, {
      comment: data.comment,
      stars: Number(data.stars),
    });
    updateCommentFromList(props.index, data);
    props.closeForm();
  }

  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <select
        {...register('stars')}
        className="text-sm mb-2 w-full p-2 outline outline-1 outline-slate-400 rounded-md"
        defaultValue={props.stars}
      >
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
      </select>
      <textarea
        {...register('comment', { required: true })}
        defaultValue={props.comment}
        className="mb-2 w-full p-2 outline outline-1 outline-slate-400 rounded-md"
        required
      />
      <Button>Editar</Button>
    </form>
  );
}

export default function Comment(props) {
  const [isUpdating, setIsUpdating] = useState(false);

  const commentData = isNaN(props.user)
    ? props
    : {
        ...props,
        user: {
          name: localStorage.getItem('name'),
          id: localStorage.getItem('id'),
        },
      };

  const deleteCommentFromList = useCommentsStore(selectors.deleteComment);

  async function deleteCommentHandler() {
    await deleteComment(commentData.id);
    deleteCommentFromList(commentData.index);
  }

  async function updateCommentHandler() {
    setIsUpdating((state) => !state);
  }

  return (
    <article className="my-8">
      <figure className="flex justify-items-center gap-2">
        <img
          className="w-1/12"
          src={`https://ui-avatars.com/api/?name=${commentData.user.name.replaceAll(
            ' ',
            '+',
          )}&background=random&rounded=true`}
          alt={`${commentData.user.name} profile`}
        />
        <div className="w-full flex justify-between">
          <p className="text-slate-700 font-bold">{commentData.user.name}</p>
          {localStorage.token &&
            (localStorage.id == commentData.user.id ||
              localStorage.role == 1) && (
              <div>
                <button className="mr-2" onClick={updateCommentHandler}>
                  <img alt="edit" className="w-5" src="/images/edit.svg" />
                </button>
                <button onClick={deleteCommentHandler}>
                  <img alt="delete" className="w-5" src="/images/delete.svg" />
                </button>
              </div>
            )}
        </div>
      </figure>
      {isUpdating ? (
        <EditCommentForm
          stars={commentData.stars}
          comment={commentData.comment}
          id={commentData.id}
          index={commentData.index}
          closeForm={() => setIsUpdating(false)}
        />
      ) : (
        <>
          <small className="block">{'⭐'.repeat(commentData.stars)}</small>
          <small className="text-slate-700">{commentData.comment}</small>
        </>
      )}
      <br />
    </article>
  );
}
