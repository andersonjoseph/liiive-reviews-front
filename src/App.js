import Home from './Home';
import Show from './Show';
import { Link, Route } from 'wouter';

import Modal from 'react-modal';
import { Suspense, useState } from 'react';
import { LoginForm, RegisterForm, UserForm } from './Common';

import { useModalStore, selectors } from './stateStores';

function UserModal() {
  const [activeTab, setActiveTab] = useState(
    localStorage.token ? 'user' : 'login',
  );

  const isModalOpen = useModalStore((state) => state.modalIsOpen);
  const closeModal = useModalStore(selectors.closeModal);

  function openRegisterTab() {
    setActiveTab('register');
  }

  function openLoginTab() {
    setActiveTab('login');
  }

  return (
    <Modal
      className="w-11/12 md:w-6/12 m-auto"
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
    >
      <div className="m-auto mt-8 outline outline-1 outline-slate-200 rounded-lg px-8 py-16 drop-shadow-lg bg-white">
        {activeTab === 'login' && (
          <LoginForm openRegisterTab={openRegisterTab} />
        )}
        {activeTab === 'register' && (
          <RegisterForm openLoginTab={openLoginTab} />
        )}
        {activeTab === 'user' && <UserForm />}
      </div>
    </Modal>
  );
}

function App() {
  const isModalOpen = useModalStore((state) => state.modalIsOpen);

  const openModal = useModalStore(selectors.openModal);

  return (
    <div className="App px-8 py-8">
      <UserModal isOpen={isModalOpen} />

      <header className="flex justify-between bg-white drop-shadow-lg outline outline-1 rounded-md outline-slate-200 mb-8 p-4">
        <div>
          <h1 className="w-full md:w-auto text-center md:text-left text-2xl font-bold text-slate-700">
            <Link href="/">Liive-Reviews</Link>
          </h1>
          <small className="hidden md:flex text-slate-500 mt-1">
            Reviews de shows presentados en Goliiive
          </small>
        </div>

        <div className="self-center">
          <button onClick={openModal}>
            <img alt="login button" className="w-8" src="/images/login.svg" />
          </button>
        </div>
      </header>

      <Route path="/">
        <Home />
      </Route>

      <Route path="/show/:id">{(params) => <Show id={params.id} />}</Route>

      <footer className="mt-8">
        <small className="text-slate-700">
          Made with React, Tailwind CSS NestJS & &lt;3 by{' '}
          <a className="font-bold" href="https://github.com/andersonjoseph">
            Anderson J
          </a>
        </small>
      </footer>
    </div>
  );
}

export default App;
