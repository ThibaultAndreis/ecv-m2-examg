import { useContext } from 'react';
import { ApplicationContext } from '../../domain/application.store';
import { LikePictureById, DislikePictureById } from '../../domain/picture/picture.actions';
import { LikeButton, BookmarkButton } from '../buttons';
import './Card.css';


export function Card({ picture }) {
    const { state, dispatch } = useContext(ApplicationContext);

    const onLike = (pictureId) => {
        LikePictureById(dispatch, pictureId)
    }

    const onDislike = (pictureId) => {console.log("test")
        DislikePictureById(dispatch, pictureId)
    }

    if (!state.user) return null
    return (
        <div className="card">
            <div className="card-img">
                <img src={picture.download_url} />
                <LikeButton onClick={() => { (picture.likedBy && picture.likedBy.find(like => like === state.user._id) )? onDislike(picture.picsum_id) : onLike(picture.picsum_id) }} isLiked={picture.likedBy && picture.likedBy.find(like => like._id  === state.user._id)} />
                <span className="likes">Likes : {picture.likedBy ? picture.likedBy.length : 0}</span>
                <BookmarkButton onClick={() => { }} />
            </div>
            <div className="card-body">
                <h3>
                    Author : {picture.author}
                </h3>
                <div className="card-comments">
                    Comments
                    <ul>
                        <li>
                            Sample comment
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )

}