"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiLogin } from "@/api/auth";

export default function Login() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginBody, setLoginBody] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setLoginBody({
      ...loginBody,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoader(true);
    const loginResponse = await apiLogin(loginBody);
    if (loginResponse.status) {
      localStorage.setItem("isLogin", loginResponse.status);
      router.push("/home");
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    setLoader(false);
  };

  return (
    <div className="login flex justify-center items-center h-screen">
      <div className="card w-11/12 sm:w-3/4 lg:w-2/5 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-gray-700">Iniciar sesión</h1>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Usuario</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
              name="username"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full"
              onChange={(e) => handleChange(e)}
              name="password"
            />
          </div>
          <button
            onClick={() => handleLogin()}
            className="btn btn-success mt-4 w-full"
            disabled={loader}
          >
            Ingresar
          </button>
        </div>
      </div>
      {showAlert && (
        <div className="alert alert-error absolute w-11/12 md:w-96 bottom-2 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error al intentar ingresar.</span>
        </div>
      )}
    </div>
  );
}
