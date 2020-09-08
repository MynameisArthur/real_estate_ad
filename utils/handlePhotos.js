const path = require('path');
//helper function that renames and moves photos to upload folder, also updates estate.photos array in db
const handlePhotos = async (estate, images, photos) => {
    let photoIndex = photos.length;
    //Create custom file names
    images.forEach((image) => {
        image.name = `photo_${estate._id}_${photoIndex + 1}${
            path.parse(image.name).ext
        }`;
        image.mv(`${process.env.FILE_UPLOAD_PATH}/${image.name}`, (err) => {
            if (err) {
                console.error(err);
                return next(
                    new ErrorResponse(`Problem with image upload`, 500)
                );
            }
        });
        photos.push(image.name);
        photoIndex++;
    });
    await estate.updateOne({
        photos,
    });
};

module.exports = handlePhotos;
