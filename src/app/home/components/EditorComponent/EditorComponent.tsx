"use client";

import React from "react";
import { Editor } from "react-draft-wysiwyg";

interface Props {
  editorState: any;
  onEditorStateChange: any;
}

const EditorComponent = ({ editorState, onEditorStateChange }: Props) => {
  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default EditorComponent;
