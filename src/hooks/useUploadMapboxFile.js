import AWS from 'aws-sdk';
import { useEffect } from 'react';
import useMapboxCredentials from './useMapboxCredentials';

const token = process.env.REACT_APP_PRIVATE_ACCESS_TOKEN;
const gateway = process.env.REACT_APP_MAPBOX_GATEWAY_URL;
const version = process.env.REACT_APP_MAPBOX_GATEWAY_VERSION;
const user = process.env.REACT_APP_MAPBOX_GATEWAY_USER;

export const useUploadMapboxFile = (url) => {

    const credentials = useMapboxCredentials();

    const uploadFileOnS3 = async (credentials) => {
        const s3 = new AWS.S3({
            accessKeyId: credentials.accessKeyId,
            secretAccessKey: credentials.secretAccessKey,
            sessionToken: credentials.sessionToken,
            region: 'us-east-1'
        });
        const data = await s3.putObject({
            Bucket: credentials.bucket,
            Key: credentials.key,
            Body: url
        }).promise();
        
        console.log("DATA -> " + data);
        return data;
    }

    const createMapboxUpload = async () => {
        const data = await uploadFileOnS3(credentials);

        console.log("ETag --> " + data.ETag);

        const fileName = "test";

        fetch(`${gateway}/uploads/${version}/${user}?access_token=${token}`,
            {   
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: credentials.url,
                    tileset: `${user}.${fileName}`,
                    name: fileName
                })

            })

    }
    useEffect(() => {
        credentials != null && createMapboxUpload();
        //uploadFileOnS3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

}
