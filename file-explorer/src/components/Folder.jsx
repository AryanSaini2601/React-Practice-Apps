import React, { useState } from 'react';
import '../App.css';

const Folder = ({ explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e) => {
    if(e.keyCode === 13 && e.target.value){
        setShowInput({...showInput, visible: false});
    }
  }

  if (explorer.isFolder) {
    return (
      <div style={{ margin: 5 }}>
        <div
          className="folder"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <span>📁 {explorer.name}</span>

          <div>
            <button
              onClick={e => {
                handleNewFolder(e, false);
              }}
            >
              File+
            </button>
            <button
              onClick={e => {
                handleNewFolder(e, true);
              }}
            >
              Folder+
            </button>
          </div>
        </div>

        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? '📁' : '📄'}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                }}
              />
            </div>
          )}

          {explorer.items.map(exp => {
            return <Folder explorer={exp} />;
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
