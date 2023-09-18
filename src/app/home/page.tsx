"use client";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";
import NewsList from "./components/NewsList/NewsList";
import AddNewModal from "./components/AddNewModal/AddNewModal";

export default function Login() {
  return (
    <div className="home">
      <div className="home__container py-10">
        <div className="heading flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Listado de noticias
          </h1>
          <button
            className="btn btn-success"
            onClick={() => (window as any).my_modal_3.showModal()}
          >
            Agregar noticia
          </button>
        </div>

        <NewsList />
        <AddNewModal />
      </div>
    </div>
  );
}
