import axios from "axios";
import React, { useState } from "react";

export default function ImageUpload() {
  
    const [file,setFile]=useState(null)
    const handleImage = (e) => {
        const image = e.target.files[0]
        setFile(image)
    }

    const handleUpload = async () => {
      const formData = new FormData()
      formData.append("file",file)
      formData.append("upload_preset" , "pcwg7i6n")

      let send = await axios.post(`https://api.cloudinary.com/v1_1/proyectofinalhenry/upload`,formData);
      return console.log(send)
    }

    return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleImage} />
        <button onClick={handleUpload} >Upload</button>
    </div>
  );
}
