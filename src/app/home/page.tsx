"use client";
import Link from "next/link";

// Components
import NewsList from "./components/NewsList/NewsList";

export default function Login() {
  return (
    <div className="home">
      <div className="home__container py-10">
        <div className="heading flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Listado de noticias
          </h1>
          <Link className="btn btn-success" href="/create-new">
            Agregar noticia
          </Link>
        </div>

        <NewsList />
      </div>
    </div>
  );
}
