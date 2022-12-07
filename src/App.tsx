import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import './App.css';

function App() {

  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();

  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    
    if(e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if(e.target) {
      files = e.target.files;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    
    reader.readAsDataURL(files[0]);
  }

  const getCropData = () => {
    if(typeof cropper !== "undefined"){
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  }

  const defaultImage = () => {
    setImage("./default.jpg")
  } 

  return (
    <div className="App">
      <div style={{ padding: "0 5%" }}>
        <h1 style={{ textAlign: "center"}}>Image Cropper Tool</h1>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <input className="input-button" type="file" onChange={onChange} />
          <button className="default-button" type="submit" onClick={defaultImage}>Default image</button>
        </div>
        <Cropper
                style = {{ margin: "0 auto", maxHeight: "500px", maxWidth: "500px"}}
                initialAspectRatio = {1}
                preview = ".img-preview"
                src = {image}
                viewMode = {1}
                minCropBoxHeight = {10}
                minCanvasWidth = {10}
                background = {false}
                responsive = {true}
                autoCropArea = {1}
                checkOrientation = {false}
                onInitialized = {(instance) => {
                  setCropper(instance);
                }}
                guides = {true}
        />
        <div className="view-div">
          <div className="box">
            <h3>Preview</h3>
            <div className="img-preview" />
            <button className="button-style" type="submit" onClick={getCropData}>Crop Image</button>
          </div>

          <div className="box" style={{ paddingBottom: "7%" }}>
            <h3>Cropped Image</h3>
            <img style={{ width: "300px", height: "" }} src={cropData} alt="cropped" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
