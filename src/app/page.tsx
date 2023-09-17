"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiLogin } from "@/api/auth";
import Alert from "@/components/Alert/Alert";

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
            {loader ? (
              <div className="flex items-center">
                <p>Cargando...</p>
                <span className="loading ml-2 loading-spinner loading-sm"></span>
              </div>
            ) : (
              "Ingresar"
            )}
          </button>
        </div>
      </div>
      {showAlert && <Alert text="Usuario o contraseña incorrectos" />}
    </div>
  );
}
