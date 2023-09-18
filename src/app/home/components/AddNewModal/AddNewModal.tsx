"use client";

import React, { ChangeEvent, useState } from "react";
import DatePicker from "react-datepicker";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const AddNewModal = () => {
  const [newDate, setNewDate] = useState(new Date());
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [file, setFile] = useState<File>();
  const [newBody, setNewBody] = useState({
    news: {
      title: "",
      description: "",
      author: "",
      publicationdate: "",
      newsbody: "",
      discharges: "",
    },
    media: [],
  });

  const handleChange = (e: any) => {
    setNewBody({
      ...newBody,
      news: {
        ...newBody.news,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const getHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(getHtml);
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
        <div className="form-add">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Título</span>
            </label>
            <input
              type="text"
              placeholder="Título de la noticia"
              className="input input-bordered input-accent w-full"
              name="title"
              onChange={handleChange}
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
              name="author"
              onChange={handleChange}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Fecha</span>
            </label>
            <DatePicker
              selected={newDate}
              onChange={(date: any) => setNewDate(date)}
            />
          </div>

          <input
            type="file"
            className="file-input file-input-bordered w-full my-4 max-w-xs"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleFileChange}
          />

          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>
      </div>
    </dialog>
  );
};

export default AddNewModal;
