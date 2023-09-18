"use client";

import { deleteNew, getNews } from "@/api/news";
import React, { useEffect, useState } from "react";
import { NewsResponse } from "../types/NewResponse";

const NewsList = () => {
  const [news, setNews] = useState<NewsResponse>();
  const [newIdToDelete, setNewIdToDelete] = useState<number>(0);

  const isNewsEmpty = (): boolean => {
    return news?.result?.length === 0;
  };

  const confirmDeleteNew = async (id: number) => {
    (window as any).my_modal_delete.showModal();
    setNewIdToDelete(id);
  };

  const deleteNewHandler = async () => {
    console.log("deleteNewHandler");
    await deleteNew(newIdToDelete);
    const newsResponse = await getNews();
    setNews(newsResponse);
    (window as any).my_modal_delete.close();
  };

  useEffect(() => {
    const getNewsHandler = async () => {
      const newsResponse = await getNews();
      setNews(newsResponse);
    };
    getNewsHandler();
  }, []);

  return (
    <div className="news-list">
      <div className="news-list__container">
        <div className="news-list__content overflow-x-auto">
          {isNewsEmpty() && <p>No hay noticias</p>}
          {!isNewsEmpty() && (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {news?.result.map((item, i) => (
                  <tr key={i}>
                    <td>{item.news.title}</td>
                    <td>{item.news.description}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">Editar</button>
                    </th>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => confirmDeleteNew(item.news.id)}
                      >
                        Eliminar
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* {showGetMoreButton() && (
          <button className="btn btn-success mt-4 w-full">Ver más</button>
        )} */}
      </div>
      <dialog id="my_modal_delete" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Eliminar noticia</h3>
          <p className="py-4">¿Estás seguro que quieres eliminar la noticia?</p>
          <div className="modal-action">
            <button
              className="btn btn-success"
              onClick={() => deleteNewHandler()}
            >
              Confirmar
            </button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewsList;
