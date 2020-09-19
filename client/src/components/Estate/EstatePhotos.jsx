import React from 'react';
import Picture from '../Picture/Picture';
import UploadPhotosForm from '../EstateForm/UploadPhotosForm';
const EstatePhotos = ({
    pictures,
    otherProps: {estateId, name, user},
    modifyPictures = null,
}) => {
    const updatePhotos = (data, del = false) => {
        //if function call is from deleting photos
        if (del) {
            data = pictures.filter((picture) => picture !== data);
            modifyPictures(data);
        } else {
            // if function call is from uploading photos
            modifyPictures([...data]);
        }
    };
    return (
        <>
            <ul className='estate-photos'>
                {pictures.length > 0 &&
                    pictures.map((photo, index) => {
                        const picProps = {photo, estateId, index, name, user};
                        return (
                            <li key={`${estateId}_${index + 1}`}>
                                <Picture
                                    {...picProps}
                                    updatePhotos={updatePhotos}
                                />
                            </li>
                        );
                    })}
            </ul>
            <UploadPhotosForm id={estateId} updatePhotos={updatePhotos} />
        </>
    );
};

export default EstatePhotos;
