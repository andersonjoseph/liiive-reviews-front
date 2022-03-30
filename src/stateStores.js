import create from 'zustand';

export const selectors = {
  closeModal: (state) => state.closeModal,
  openModal: (state) => state.openModal,

  comments: (state) => state.comments,
  addComments: (state) => state.addComments,
  addNewComment: (state) => state.addNewComment,
  resetComments: (state) => state.resetComments,
  deleteComment: (state) => state.deleteComment,
  updateComment: (state) => state.updateComment,
};

export const useModalStore = create((set) => ({
  modalIsOpen: false,
  closeModal: () => set({ modalIsOpen: false }),
  openModal: () => set({ modalIsOpen: true }),
}));

export const useCommentsStore = create((set) => ({
  comments: [],
  addComments: (comment) =>
    set((state) => ({ comments: state.comments.concat(comment) })),
  addNewComment: (comment) =>
    set((state) => ({ comments: [comment].concat(state.comments) })),
  resetComments: () => set({ comments: [] }),
  deleteComment: (index) =>
    set((state) => {
      const arr = [...state.comments];
      arr.splice(index, 1);

      return {
        comments: arr,
      };
    }),
  updateComment: (index, data) =>
    set((state) => {
      const arr = [...state.comments];
      arr[index].comment = data.comment;
      arr[index].stars = Number(data.stars);

      return {
        comments: arr,
      };
    }),
}));
