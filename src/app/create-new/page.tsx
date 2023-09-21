"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import dynamic from "next/dynamic";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

// STYLES
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";

import { uploadFile } from "@/firebase/config";

// API
import { createNew } from "@/api/news";

// TYPES
import Alert from "@/components/Alert/Alert";
import { CreateNewBody, Media } from "../home/components/types";

// COMPONENTS
const EditorComponent = dynamic(
  () => import("../home/components/EditorComponent/EditorComponent"),
  {
    ssr: false,
  }
);

const formatDate: string = "yyyy-MM-dd";

// Initial Schema
const initialNewBody: CreateNewBody = {
  news: {
    title: "",
    description: "",
    author: "",
    publicationdate: format(new Date(), formatDate),
    newsbody: "",
    discharges: "",
    category: "",
  },
  media: [],
};

const CreateNew = () => {
  const router = useRouter();
  const [newDate, setNewDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const [alertValues, setAlertValues] = useState({ text: "", type: "" });
  const [loader, setLoader] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [filesUrls, setFileUrls] = useState<Media[]>([]);
  const [filesList, setFilesList] = useState<File[]>([]);
  const [newBody, setNewBody] = useState<CreateNewBody>(initialNewBody);

  const handleChange = (e: any) => {
    setNewBody({
      ...newBody,
      news: {
        ...newBody.news,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files: File[] = e.target.files as any;

    if (files.length) {
      setFilesList(files);
    }
  };

  const uploadFiles = async () => {
    const files: File[] = [...filesList];
    const results = await Promise.all(
      files.map(async (file) => {
        const result = await uploadFile(file);
        return {
          media: result,
          type: "image",
          reference: "news",
        };
      })
    );
    setNewBody({
      ...newBody,
      media: [...results],
    });
    return results;
  };

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const getHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setNewBody({
      ...newBody,
      news: {
        ...newBody.news,
        newsbody: getHtml,
      },
    });
  };

  const pickerHandler = (date: any) => {
    setNewDate(date);
    const formateDate = format(date, formatDate);
    setNewBody({
      ...newBody,
      news: {
        ...newBody.news,
        publicationdate: formateDate,
      },
    });
  };

  const validateForm = () => {
    if (
      newBody.news.title === "" ||
      newBody.news.description === "" ||
      newBody.news.author === "" ||
      newBody.news.publicationdate === "" ||
      newBody.news.newsbody === "" ||
      newBody.news.category === ""
    ) {
      return false;
    }
    return true;
  };

  const handleButtonClick = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      setAlertValues({
        text: "Todos los campos son obligatorios",
        type: "error",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return;
    }
    setLoader(true);
    const images = await uploadFiles();
    const response = await createNew({
      ...newBody,
      media: [...images],
    });
    console.log(response);
    if (response === 200) {
      setAlertValues({
        text: "Noticia creada correctamente",
        type: "success",
      });
      setShowAlert(true);
      setLoader(false);
      setTimeout(() => {
        router.push("/home");
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <div className="create-new flex justify-center mt-12">
      <div className="create-new__container w-11/12 lg:w-8/12">
        <h1 className="font-bold text-3xl">Crear noticia</h1>
        <p className="py-4">Agrega la información para agregar tu noticia</p>
        <form onSubmit={handleButtonClick} className="form-add">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Título</span>
            </label>
            <input
              type="text"
              placeholder="Título de la noticia"
              className="input input-bordered w-full"
              name="title"
              onChange={handleChange}
              required
              value={newBody.news.title}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Descripción</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Descripción de la noticia"
              name="description"
              onChange={handleChange}
              required
              value={newBody.news.description}
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
              className="input input-bordered w-full"
              name="author"
              onChange={handleChange}
              required
              value={newBody.news.author}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Categoría</span>
            </label>
            <select
              className="select select-bordered"
              name="category"
              onChange={handleChange}
              required
            >
              <option disabled selected>
                Seleccionar
              </option>
              <option>Política</option>
              <option>Social</option>
              <option>Deportes</option>
              <option>Actualidad</option>
              <option>Judicial</option>
              <option>Regional</option>
              <option>Nacional</option>
              <option>Emprendimiento</option>
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Fecha</span>
            </label>
            <DatePicker selected={newDate} onChange={pickerHandler} />
          </div>

          <input
            type="file"
            className="file-input file-input-bordered w-full my-4 max-w-xs"
            accept="image/png, image/jpeg"
            multiple
            required
            onChange={handleFileChange}
          />
          <EditorComponent
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Descargos (opcional)</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Descripción de la noticia"
              name="discharges"
              onChange={handleChange}
            ></textarea>
            <label className="label"></label>
          </div>
          <input
            type="submit"
            value={loader ? "Cargando..." : "Crear noticia"}
            className="btn btn-success w-full"
            disabled={loader}
          />
        </form>
        {showAlert && <Alert text={alertValues.text} type={alertValues.type} />}
      </div>
    </div>
  );
};

export default CreateNew;
