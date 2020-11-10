import React, {useState} from 'react'
import CKEditor from "ckeditor4-react";
import { configCkeditor } from './config'

const Ckeditor = ({name, values, setValues, loading}) => {
  const handleChangeCkeditor = (name, evt) => {
    setValues({...values, [name]: evt.editor.getData()});
  }
  return (
    <CKEditor data={values} name={name} onChange={ evt => setValues(evt.editor.getData()) }
      config={
        configCkeditor()
      }
    />
  )
}

export default Ckeditor;
