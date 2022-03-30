import axios from 'axios';

export async function getLastComments() {
  const res = await axios.get('comments');

  return res.data;
}

export async function getPopularShows() {
  const res = await axios.get('shows?order=popular');

  return res.data;
}

export async function getShow(id) {
  const res = await axios.get('shows/' + id);

  return res.data;
}

export async function getShowComments(id, page = 1, stars = 6) {
  const res = await axios.get(`comments/${id}?page=${page}&stars=${stars}`);

  return res.data;
}

export async function getRandomShows() {
  const res = await axios.get('shows?order=random');

  return res.data;
}

export async function getNewShows() {
  const res = await axios.get('shows');

  return res.data;
}

export async function getAllShows(page = 1) {
  const res = await axios.get(`shows?page=${page}`);

  return res.data;
}

export async function signIn(email, password) {
  const res = await axios.post('auth/signin', { email, password });

  return res.data;
}

export async function me() {
  const res = await axios.get('auth/me', {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  return res.data;
}

export async function signUp(name, email, password) {
  const res = await axios.post('auth/signup', { name, email, password });

  return res.data;
}

export async function updateUser(data) {
  const res = await axios.patch('auth/me', data, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
  return res.data;
}

export async function submitComment(data) {
  const res = await axios.post('comments', data, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });

  return res.data;
}

export async function deleteComment(id) {
  const res = await axios.delete(`comments/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });

  return res.data;
}

export async function updateComment(id, data) {
  const res = await axios.patch(`comments/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });

  return res.data;
}