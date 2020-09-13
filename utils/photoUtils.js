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
    return images.map((img) => img.name);
};
// helper function that checks if estate exists and user has permission
const photoChecks = async (req, estate) => {
    if (!estate) {
        return next(
            new ErrorResponse(
                `Estate with the id ${req.params.id} not found`,
                404
            )
        );
    }
    //Make sure user is estate's owner
    if (estate.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User with the ID ${req.params.id} is not authorized to upload or delete photo for this estate`,
                401
            )
        );
    }
};

module.exports = {handlePhotos, photoChecks};
