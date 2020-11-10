import React, {useState, Suspense} from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { isAuthenticated } from '../models/auth/api'
import {API} from '../config'
import { Button } from 'react-bootstrap';
// Lazy loading and code splitting -
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div></div>;
const ImageList = React.lazy(()=> import('./ImageList'))

const FileUpload = ({ values, setValues, setLoading, error }) => {
  const {user, token} = isAuthenticated();
  const [uploadLoading, setUploadLoading] = useState(false)
  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  )
  const fileUploadAndResize = (e) => {
    let files = e.target.files; // 3
    let allUploadedFiles = values.pictures;
    if (files && files.length > 0) {
      setUploadLoading(true);
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
                setUploadLoading(false)
                allUploadedFiles.push(res.data);
                setValues({ ...values, pictures: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                setUploadLoading(false)
                console.log("CLOUDINARY UPLOAD ERR", err);
              });
          },
          "base64"
        );
      }
    }
  }

  const handleImageRemove = (public_id) => {
    const {user, token} = isAuthenticated();
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .post(
        `${API}/removeimages/${user._id}`,
        { public_id },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : ""
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { pictures } = values;
        let filteredImages = pictures.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, pictures: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };


  return (
    <>
      <div className="d-flex mb-4">
        <div className="col-auto h-auto bg-light align-self-center">
          <label className={uploadLoading ? "btn btn-primary disabled" : "btn btn-primary"}>
            {uploadLoading && <span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>}
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
        <div className="flex-grow-1 pl-3">
          {values.pictures && values.pictures.length > 0 && (
            <Suspense fallback={loading()}>
              <ImageList values={values.pictures} setValues={change => setValues({...values, pictures: change})} handleImageRemove={(value) => handleImageRemove(value)}/>
            </Suspense>
          )
        }
        </div>
      </div>
      {showError()}
    </>
  )
}
export default FileUpload;
