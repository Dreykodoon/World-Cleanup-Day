import localforage from 'localforage';

export const ADD_PHOTO = 'ADD_PHOTO';
export const LOAD_PHOTOS = 'LOAD_PHOTOS';
export const UNLOAD_PHOTOS = 'UNLOAD_PHOTOS';
export const DELETE_PHOTOS = 'DELETE_PHOTOS';
export const DELETE_SINGLE_PHOTO = 'DELETE_SINGLE_PHOTO';

export function addPhoto({coordinates, screenshot}) {
    return (dispatch, getState) => {
        const photo = {id: getState().photo.photoIdCounter.toString(), coordinates, src: screenshot};
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

export function deleteSinglePhoto(photoId) {
    return (dispatch) => {
        localforage.removeItem(photoId)
            .then(() => dispatch({
                type: DELETE_SINGLE_PHOTO,
                payload: photoId,
            }))
            .catch((err) => {
                // TODO: something needs to be done if trying to remove the photo fails.
                console.log(err);
            });
    };
}

export function unloadPhotos() {
    return {
        type: UNLOAD_PHOTOS,
    };
}
