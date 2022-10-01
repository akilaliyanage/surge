// import React , {useState} from 'react';
// import { uploadFile } from 'react-s3';
// import configs from "../assets/configs/config.json"
// window.Buffer = window.Buffer || require("buffer").Buffer;


// const S3_BUCKET =configs.REACT_APP_S3_BUCKET;
// const REGION =configs.REACT_APP_REGION
// const ACCESS_KEY = configs.REACT_APP_ACCESS_KEY
// const SECRET_ACCESS_KEY = configs.REACT_APP_SECRET_ACCESS_KEY

// const config = {
//     bucketName: S3_BUCKET,
//     region: REGION,
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
// }

// const UploadImageToS3 = () => {

//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileInput = (e) => {
//         setSelectedFile(e.target.files[0]);
//     }

//     const handleUpload = async (file) => {

//         console.log(ACCESS_KEY);
//         uploadFile(file, config)
//             .then(data => console.log(data))
//             .catch(err => console.error(err))
//     }

//     return <div>
//         <div>React S3 File Upload</div>
//         <input type="file" onChange={handleFileInput}/>
//         <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
//     </div>
// }

// export default UploadImageToS3;

import React ,{useState} from 'react';
import AWS from 'aws-sdk'
import configs from '../assets/configs/config.json'
import Button from '@mui/material/Button';

const S3_BUCKET =configs.REACT_APP_S3_BUCKET;
const REGION = configs.REACT_APP_REGION;


AWS.config.update({
    accessKeyId: configs.REACT_APP_ACCESS_KEY,
    secretAccessKey: configs.REACT_APP_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3 = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);

        uploadFile(selectedFile)
    }

    const uploadFile = (file) => {

        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        window.localStorage.setItem("filename",file.name)

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            }).on('httpDone', (e) =>{
                console.log(e.request.httpRequest);
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div >
        <div>File Upload Progress is {progress}%</div>
        <input type="file" accept="image/*" onChange={handleFileInput}/>
        <Button variant='contained'  onClick={() => uploadFile(selectedFile)}> Save File</Button>
    </div>
}

export default UploadImageToS3;