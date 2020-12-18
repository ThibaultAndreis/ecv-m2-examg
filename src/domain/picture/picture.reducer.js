import { types } from './picture.actions';

export default function reducer(state, action) {
    switch (action.type) {
        case types.PICTURE_STARTED:
            return {
                ...state,
                pending: true
            }
        case types.PICTURE_DONE:
            return {
                ...state,
                pending: false,
                pictures: action.payload
            }
        case types.PICTURE_LIKED:
            const { pictures } = state;
            const idx = pictures.findIndex(picture => picture.picsum_id === action.payload.picsum_id);
            pictures[idx] = { ...pictures[idx], ...action.payload };
            return {
                ...state,
                pending: false,
                pictures: [...pictures]
            };
        case types.PICTURE_DISLIKED:
            const  picturesliked  = state.pictures;
            const  userdisliking  = state.user._id;
            const idxtormove = picturesliked.findIndex(picture => picture.picsum_id === action.payload.picsum_id);
            const useridxtormove = picturesliked[idxtormove]['likedBy'].indexOf(userdisliking);
            picturesliked[idxtormove]['likedBy'].splice(useridxtormove,1) ;
            return {
                ...state,
                pending: false,
                pictures: [...picturesliked]
            }
        case types.PICTURE_FAILED:
            return {
                ...state,
                pending: false,
                error: action.payload
            }
        default:
            return state;
    }
}
