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