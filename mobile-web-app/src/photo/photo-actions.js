import localforage from 'localforage';

export const ADD_PHOTO = 'ADD_PHOTO';
export const LOAD_PHOTOS = 'LOAD_PHOTOS';
export const DELETE_PHOTOS = 'DELETE_PHOTOS';

export function addPhoto(photoSrc) {
    return (dispatch, getState) => {
        const photo = {id: getState().photoIdCounter.toString(), src: photoSrc};
        localforage.setItem(photo.id, photo)
            .then(() => dispatch({
                type: ADD_PHOTO,
                payload: photo,
            }))
            .catch(err => console.log(err));
    };
}

export function loadPhotos() {
    return (dispatch) => {
        let photos = [];
        localforage.iterate((value) => {
            photos.push(value);
        })
            .then(() => dispatch({
                type: LOAD_PHOTOS,
                payload: photos,
            }))
            .catch(err => console.log(err));
    };
}

export function deletePhotos(photos) {
    return (dispatch) => {
        const photoIds = photos.map((photo) => photo.id);
        Promise.all(photoIds.map((photoId) => localforage.removeItem(photoId)))
            .then(() => dispatch({
                type: DELETE_PHOTOS,
            }))
            .catch((err) => {
                // TODO: something needs to be done if removal of all photos was unsuccesfull.
                console.log(err);
            });
    };
}
