"use client";

import NewsList from "./components/NewsList/NewsList";
import AddNewModal from "./components/AddNewModal/AddNewModal";

export default function Login() {
  const showAddNewModal = () => {
    // if (!(window as any).my_modal_3) return;
    // (window as any).my_modal_3.showModal();
  };

  return (
    <div className="home">
      <div className="home__container py-10">
        <div className="heading flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Listado de noticias
          </h1>
          <button className="btn btn-success" onClick={showAddNewModal}>
            Agregar noticia
          </button>
        </div>

        <NewsList />
        <AddNewModal />
      </div>
    </div>
  );
}
