"use client";

import { getNews } from "@/api/news";
import React, { useEffect, useState } from "react";

const NewsList = () => {
  const [news, setNews] = useState([]);

  const getNewsHandler = async () => {
    const newsResponse = await getNews();

    if (newsResponse.status) {
      setNews({ ...news, ...newsResponse.data });
    }
  };

  const showGetMoreButton = () => {
    return news.length > 0;
  };

  const isNewsEmpty = () => {
    return news.length === 0;
  };

  useEffect(() => {
    getNewsHandler();
  });

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
                        <button className="btn btn-ghost btn-xs">
                          Eliminar
                        </button>
                      </th>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        {showGetMoreButton() && (
          <button className="btn btn-success mt-4 w-full">Ver más</button>
        )}
      </div>
    </div>
  );
};

export default NewsList;
