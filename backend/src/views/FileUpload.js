import React from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { isAuthenticated } from '../models/auth/api'
import {API} from '../config'

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

  return (
    <>
      {values.pictures && values.pictures.length ? (
        <div className="form-group mt-4">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 d-flex align-items-stretch align-items-center">
            {
              values.pictures.map((image)=> (
                 <div className="col" key={image.public_id}>
                    <img className="img-fluid" height="100px" src={image.url}/>
                  </div>
              ))
            }
          </div>
        </div>
      ) : ''}
      {
        JSON.stringify(values.pictures)
      }
      <div className="row">
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
      {showError()}
    </>
  )
}
export default FileUpload;
