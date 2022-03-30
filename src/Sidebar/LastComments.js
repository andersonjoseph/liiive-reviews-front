import { suspend } from 'suspend-react';
import SidebarComment from './SidebarComment';
import { getLastComments } from '../API';

export function LastCommentsSkeleton() {
  const comments = [...Array(4).keys()];

  return comments.map((i) => (
    <div
      key={i}
      className="animate-skeleton mb-4 h-20 w-full bg-slate-300 rounded-md"
    ></div>
  ));
}

export function LastComments() {
  let lastComments = suspend(
    async () => {
      const comments = await getLastComments();
      return comments;
    },
    ['last', 'comments'],
    { lifespan: 60000 * 10 }, // 10 minutes
  );

  lastComments = lastComments.slice(0, 4);

  return lastComments.map((commentData, i) => (
    <SidebarComment
      key={`${commentData.user.name}-${i}`}
      user={commentData.user}
      stars={commentData.stars}
      comment={commentData.comment}
      show={commentData.show}
    />
  ));
}
