import { ADD_PHOTO, LOAD_PHOTOS, DELETE_PHOTOS } from './photo-actions';

const initialState = {photos: [], photoIdCounter: 0};

export function reducers(state = initialState, {type, payload}) {
    switch (type) {
        case ADD_PHOTO: {
            const {photos, photoIdCounter} = state;
            return Object.assign({}, state, {photos: photos.concat([payload]), photoIdCounter: photoIdCounter + 1});
        }
        case LOAD_PHOTOS: {
            return Object.assign({}, state, {photos: payload, photoIdCounter: payload.length});
        }
        case DELETE_PHOTOS: {
            return Object.assign({}, initialState);
        }
        default: {
            return state;
        }
    }
}
