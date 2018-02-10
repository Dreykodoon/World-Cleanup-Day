import { ADD_PHOTO, LOAD_PHOTOS, DELETE_PHOTOS, DELETE_SINGLE_PHOTO } from './photo-actions';

const initialState = {photos: [], photoIdCounter: 0};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case ADD_PHOTO: {
            const {photos, photoIdCounter} = state;
            return Object.assign({}, state, {photos: photos.concat([payload]), photoIdCounter: photoIdCounter + 1});
        }
        case LOAD_PHOTOS: {
            const largestId = findLargestPhotoId(payload);
            return Object.assign({}, state, {photos: payload, photoIdCounter: largestId + 1});
        }
        case DELETE_PHOTOS: {
            return Object.assign({}, initialState);
        }
        case DELETE_SINGLE_PHOTO: {
            const remainingPhotos = state.photos.filter((photo) => photo.id !== payload);
            return Object.assign({}, state, {photos: remainingPhotos});
        }
        default: {
            return state;
        }
    }
}

function findLargestPhotoId(photos) {
    return photos.length > 0 ? Number(photos[photos.length - 1].id) : 0;
}
