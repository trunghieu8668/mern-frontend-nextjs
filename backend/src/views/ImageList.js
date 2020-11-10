import React, {useState} from "react";
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
  margin: '0 0 0 10px',
  padding: 0,
  width: 'auto',
  overflow: 'visible',
  cursor: 'pointer',
  background: 'transparent',
  position: 'absolute',
};


function ImageList ({values, setValues, handleImageRemove}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [items, setItems] = useState(values);
  const [remove, setRemove] = useState(0)
  const handleConfirm = (index) => {
    setItems(
      typeof index !== 'undefined'
        ? arrayRemove(items, index)
        : items
    );
    handleImageRemove(items[index].public_id)
    setValues(typeof index !== 'undefined' ? arrayRemove(items, index) : items)
  }

  const handleNo = () => {
    return setShowConfirm(false);
  }

  return (
    <>
      <List
        values={items}
        onChange={({ oldIndex, newIndex }) =>
          {
            setItems(arrayMove(items, oldIndex, newIndex));
            setValues(arrayMove(items, oldIndex, newIndex))
          }
        }
        renderList={({ children, props, isDragged }) => (
          <div>
            <div className="shadow" {...props} style={{
              padding: '1em',
              cursor: isDragged ? 'grabbing' : undefined,
              height: 500,
              overflowY: 'scroll',
              overflowX: 'hidden'
            }}>{children}</div>
          </div>
        )}
        renderItem={({ value, props, index, isDragged, isSelected }) => {
          const row = (
            <div className="" {...props} style={{
              ...props.style,
              padding: '1.5em',
              margin: '1.5em 0em',
              listStyleType: 'none',
              cursor: isDragged ? 'grabbing' : 'grab',
              border: '1px solid #ddd',
              boxShadow: '3px 3px #ddd',
              color: '#333',
              borderRadius: '5px',
              fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
              backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
            }}>
              <img className="img-thumbnail" style={{maxHeight: '100px'}} src={value.url_mobile} alt={value.url}/>
              <button onClick={(event) => {event.preventDefault(); setShowConfirm(true); setRemove(index)} } style={buttonStyles}>
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
        message={'Bạn có muốn xoá ảnh này không?'}
        onSuccess={() => {setShowConfirm(false); handleConfirm(remove)}}
        onCancel={handleNo}
        onClose={handleNo}
      />
    </>
  );
}

export default ImageList;
