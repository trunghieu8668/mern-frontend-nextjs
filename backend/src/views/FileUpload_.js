import React, {useState, useEffect} from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { isAuthenticated } from '../models/auth/api'
import {API} from '../config'

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Quote({ quote, index }) {
  return (
    <Draggable direction="horizontal" draggableId={quote.public_id} index={index}>
      {provided => (
        <div className="col text-center" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div className="img-thumbnail h-100 align-self-stretch align-items-center"><img className="img-fluid" src={quote.url} /></div>
        </div>
      )}
    </Draggable>
  );
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes && quotes.length > 0 && quotes.map((quote: QuoteType, index: number) => (
    <Quote quote={quote} index={index} key={quote.public_id} />
  ));
});

const FileUpload = ({ values, setValues, setLoading, formData, error }) => {
  const {user, token} = isAuthenticated();

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )
  const fileUploadAndResize = (e) => {
    let files = e.target.files; // 3
    let allUploadedFiles = values.pictures;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          2048,
          1024,
          "JPEG,PNG,WEBP",
          100,
          0,
          (uri) => {
            //console.log(uri);
            axios
              .post(
                `${API}/uploadimages/${user._id}`,
                { image: uri },
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization: token ? `Bearer ${token}` : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res.data);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, pictures: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      values.pictures,
      result.source.index,
      result.destination.index
    );
    setValues({...values, pictures: quotes})
  }
  return (
    <>
      <div className="d-flex mt-4">
        <div className="col-auto h-auto bg-light align-self-center">
          <label className="btn btn-primary">
            Choose File
            <input
              type="file"
              multiple
              hidden
              accept="image/x-png,image/gif,image/jpeg"
              onChange={fileUploadAndResize}
            />
          </label>
        </div>
        <div className="flex-grow-1">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {provided => (
                <div className="row row-cols-3 row-cols-sm-4 row-cols-md-6 row-cols-lg-6 align-self-stretch" key={provided.innerRef} ref={provided.innerRef} {...provided.droppableProps}>
                  <QuoteList quotes={values.pictures} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      {showError()}
    </>
  )
}
export default FileUpload;
