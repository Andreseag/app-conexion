"use client";

import React, { ChangeEvent, useState } from "react";
import { format, set } from "date-fns";
import DatePicker from "react-datepicker";
import dynamic from "next/dynamic";
// import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

// STYLES
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-datepicker/dist/react-datepicker.css";

import { uploadFile } from "@/firebase/config";

// API
import { createNew } from "@/api/news";

// TYPES
import { CreateNewBody, Media } from "../types";
import Alert from "@/components/Alert/Alert";
const EditorComponent = dynamic(
  () => import("../EditorComponent/EditorComponent"),
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
  },
  media: [],
};

const AddNewModal = () => {
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

  const uploadFiles = () => {
    const files: File[] = [...filesList];
    let results: Media[] = [];
    files.map(async (file) => {
      const result = await uploadFile(file);
      results.push({
        media: result,
        type: "image",
        reference: "news",
      });
      console.log(result);
    });
    console.log(results);
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
      newBody.news.newsbody === ""
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
    const files = await uploadFiles();
    const response = await createNew(newBody);
    console.log(response);
    if (response === 200) {
      setAlertValues({
        text: "Noticia creada correctamente",
        type: "success",
      });
      setShowAlert(true);
      setLoader(false);
      setTimeout(() => {
        setShowAlert(false);
        // window.location.reload
      }, 2000);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-11/12 md:w-4/5">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Agregar noticia</h3>
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
            />
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
            value="Crear noticia"
            className="btn btn-success w-full"
            disabled={loader}
          />
        </form>
      </div>
      {showAlert && <Alert text={alertValues.text} />}
    </dialog>
  );
};

export default AddNewModal;
