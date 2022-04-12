import React from 'react';
import { useUploadMapboxFile } from '../hooks/useUploadMapboxFile';


export const Upload = () => {

  useUploadMapboxFile("https://kurodevs.github.io/test-abandoned/traverse-bay.tiff");
  

    const HandleUploadFile = (e) =>{

      

    }
    
  return (
    <input type="file" onChange={HandleUploadFile} />
  )
}
