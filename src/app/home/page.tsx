"use client";

import { useState } from "react";

import DatePicker from "react-datepicker";
import { Editor, EditorState } from "draft-js";

import "draft-js/dist/Draft.css";
import "react-datepicker/dist/react-datepicker.css";

export default function Login() {
  const [startDate, setStartDate] = useState(new Date());
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Autor</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {"."
                .repeat(20)
                .split("")
                .map((_, i) => (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">Gabriel Vega</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      Nombre noticia
                      <br />
                      {/* <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span> */}
                    </td>
                    <td>Politica</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">Editar</button>
                    </th>
                    <th>
                      <button className="btn btn-ghost btn-xs">Eliminar</button>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button className="btn btn-success mt-4 w-full">Ver más</button>
      </div>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Agregar noticia</h3>
          <p className="py-4">Agrega la información para agregar tu noticia</p>
          <div className="form-add">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Título</span>
              </label>
              <input
                type="text"
                placeholder="Título de la noticia"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Descripción</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Descripción de la noticia"
              ></textarea>
              <label className="label"></label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Autor</span>
              </label>
              <input
                type="text"
                placeholder="Autor de la noticia"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Fecha</span>
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
              />
            </div>

            <input
              type="file"
              className="file-input file-input-bordered w-full my-4 max-w-xs"
            />
            <Editor editorState={editorState} onChange={setEditorState} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
