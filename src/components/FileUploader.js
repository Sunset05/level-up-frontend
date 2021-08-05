import React, { useRef } from "react"

export default function FileUploader({onFileSelectError, onFileSelectSuccess}) {
    const fileInput = useRef(null);

    const handleFileInput = (event) => {
        const file = event.target.files[0];
        if (file.size > 10024)
            onFileSelectError(console.log(file));
        else onFileSelectSuccess(file);
    }

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} />
            <button 
                onClick={(event) => {fileInput.current && fileInput.current.click()}} className="btn-primary"
            >
            </button>
        </div>
    )
}