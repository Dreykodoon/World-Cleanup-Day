import {
    ADD_PHOTO,
    LOAD_PHOTOS,
    UNLOAD_PHOTOS,
    DELETE_PHOTOS,
    DELETE_SINGLE_PHOTO,
} from './trashpoint-actions';

const initialState = {photos: [], photoIdCounter: 0};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case ADD_PHOTO: {
            const {photos, photoIdCounter} = state;

            return Object.assign({}, state, {photos: photos.concat([payload]), photoIdCounter: photoIdCounter + 1});
        }
        case LOAD_PHOTOS: {
            return Object.assign({}, state, {photos: payload, photoIdCounter: calculatePhotoIdCounterValue(payload)});
        }
        case UNLOAD_PHOTOS: {
            return initialState;
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

function calculatePhotoIdCounterValue(photos) {
    if (photos.length > 0) {
        const lastPhotoId = photos[photos.length - 1].id;
        const idPrefixCounter = Number(lastPhotoId.split('_')[0]);

        return idPrefixCounter + 1;
    }

    return 0;
}
