import React, {useState, useEffect} from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { isAuthenticated } from '../models/auth/api'
import {API} from '../config'
import { List, arrayMove, arrayRemove } from "react-movable";
import Bootbox from 'bootbox-react';

const RemovableIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#555"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x-circle"
  >
    <title>Remove</title>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const buttonStyles = {
  border: 'none',
  margin: 0,
  padding: 0,
  width: 'auto',
  overflow: 'visible',
  cursor: 'pointer',
  background: 'transparent'
};

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

  // Drag
  const [showConfirm, setShowConfirm] = useState(false);
  const [remove, setRemove] = useState(0)

  const handleConfirm = (index) => {
    setValues({...values, pictures: typeof index !== 'undefined' ? arrayRemove(values.pictures, index) : values.pictures})
  }

  const handleNo = () => {
    console.log("You clicked No!");
    return setShowConfirm(false);
  }
  // End Drap
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
          <List
            values={values.pictures}
            onChange={({ oldIndex, newIndex }) =>
              setValues({...values, pictures: arrayMove(values.pictures, oldIndex, newIndex)})
            }
            renderList={({ children, props, isDragged }) => (
              <div>
                <div {...props}>{children}</div>
              </div>
            )}
            renderItem={({ value, props, index, isDragged, isSelected }) => {
              const row = (
                <div
                  {...props}
                >
                  <div>{value}</div>
                  <button
                    onClick={() => {setShowConfirm(true); setRemove(index)} }
                    style={buttonStyles}
                  >
                    <RemovableIcon />
                  </button>

                </div>
              );
              return isDragged ? (
                <div style={{ ...props.style, borderSpacing: 0 }}>
                  <div>{row}</div>
                </div>
              ) : (
                row
              );
            }}
          />
          <Bootbox show={showConfirm}
              type={"confirm"}
              message={'xoa'}
              onSuccess={() => {setShowConfirm(false); handleConfirm(remove)}}
              onCancel={handleNo}
              onClose={handleNo}
          />
        </div>
        {JSON.stringify(values.pictures)}
      </div>
      {showError()}
    </>
  )
}
export default FileUpload;
