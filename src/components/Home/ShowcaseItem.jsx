import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, likePost, savePost } from '../../actions/postAction';
import { likeFill } from '../Header/SvgIcons';
import { commentIcon, emojiIcon, likeIconOutline, moreIcons, saveIconFill, saveIconOutline, shareIcon } from './SvgIcons'
// import { Picker } from 'emoji-mart'
// import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';
// import moment from 'moment';
import ShowcaseModal from './ShowcaseModal';

const ShowcaseItem = ({ _id, caption, likes, comments, image, postedBy, savedBy, createdAt, setUsersDialog, setUsersList }) => {

    const dispatch = useDispatch();
    const commentInput = useRef(null);

    const { user } = useSelector((state) => state.user);
    const { loading, post } = useSelector((state) => state.postDetails);


    const [allLikes, setAllLikes] = useState(likes);
    const [allComments, setAllComments] = useState(comments);
    const [allSavedBy, setAllSavedBy] = useState(savedBy);

    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [comment, setComment] = useState("");
    const [viewComment, setViewComment] = useState(false);
    const [showEmojis, setShowEmojis] = useState(false);

    const [likeEffect, setLikeEffect] = useState(false);

    const handleLike = async () => {
        setLiked(!liked);
        // await dispatch(likePost(_id));
        const { data } = await axios.get(`/api/v1/post/detail/${_id}`)
        setAllLikes(data.post.likes)
    }

    const handleComment = async (e) => {
        e.preventDefault();
        // await dispatch(addComment(_id, comment));
        setComment("");
        const { data } = await axios.get(`/api/v1/post/detail/${_id}`)
        setAllComments(data.post.comments)
    }

    const handleSave = async () => {
        setSaved(!saved);
        // await dispatch(savePost(_id));
        const { data } = await axios.get(`/api/v1/post/detail/${_id}`)
        setAllSavedBy(data.post.savedBy)
    }

    const handleLikeModal = () => {
        setUsersDialog(true);
        setUsersList(allLikes);
    }

    const setLike = () => {
        setLikeEffect(true)
        setTimeout(() => {
            setLikeEffect(false)
        }, 500)
        if (liked) {
            return;
        }
        handleLike();
    }

    useEffect(() => {
        setLiked(allLikes.some((u) => u._id === user._id))
    }, [allLikes]);

    useEffect(() => {
        setSaved(allSavedBy.some((id) => id === user._id))
    }, [allSavedBy]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleImageClick = () => {
        console.log("image clicked");
        setIsModalOpen(true); // Open the modal when the image is clicked
    };
    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };


    return (
        <div className="flex flex-col border rounded bg-white relative">

            {/* <div className="flex justify-between px-3 py-2.5 border-b items-center">
                <div className="flex space-x-3 items-center">
                    <Link to={`/${postedBy.username}`}><img draggable="false" className="w-10 h-10 rounded-full object-cover" src={postedBy.avatar} alt="avatar" /></Link>
                    <Link to={`/${postedBy.username}`} className="text-black text-sm font-semibold">{postedBy.username}</Link>
                </div>
                <span className="cursor-pointer">{moreIcons}</span>
            </div> */}

            {/* post image container */}
            {/* <div className="relative flex items-center justify-center" style={{ width: '100%', height: '0', paddingBottom: '100%' }} onDoubleClick={setLike}> */}
            <div className="relative flex items-center justify-center" style={{ width: '100%', height: '0', paddingBottom: '100%' }} onClick={handleImageClick}>
                <img
                    draggable="false"
                    loading="lazy"
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    src={image}
                    alt="post image" />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 via-transparent to-black/50"></div>

                <span className="absolute text-white text-4xl font-bold" style={{ top: '30px', left: '20px' }}>
                    <Link to={`/${postedBy.username}`} className="text-4xl font-semibold hover:underline">@{postedBy.username}</Link>
                </span>
                <span className="absolute text-white text-2xl font-bold" style={{ bottom: '30px', right: '15px' }}>
                    <span className="text-2xl truncate">{caption}</span>
                </span>

                {likeEffect &&
                    <img draggable="false" height="80px" className="likeEffect" alt="heart" src="https://img.icons8.com/ios-filled/2x/ffffff/like.png" />
                }
            </div>

            <ShowcaseModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={{ _id, caption, likes, comments, image, postedBy, savedBy, createdAt }}
            />

            {/* like comment container */}
            <div className="flex flex-col px-4 space-y-1 border-b pb-2 mt-2">

                {/* icons container */}
                <div className="flex items-center justify-between py-2">
                    <div className="flex space-x-4">
                        <button onClick={handleLike}>{liked ? likeFill : likeIconOutline}</button>
                        <button onClick={() => commentInput.current.focus()}>{commentIcon}</button>
                        {/* {shareIcon} */}
                    </div>
                    <button onClick={handleSave}>{saved ? saveIconFill : saveIconOutline}</button>
                </div>

                {/* likes  */}
                {/* <span onClick={handleLikeModal} className="font-semibold text-sm cursor-pointer">{allLikes.length} likes</span> */}

                {/* comment */}
                {/* <div className="flex flex-auto items-center space-x-1">
                    <Link to={`/${postedBy.username}`} className="text-sm font-semibold hover:underline">{postedBy.username}</Link>
                    <span className="text-sm truncate">{caption}</span>
                </div> */}

                {/* time */}
                {/* {allComments.length > 0 ?

                    <span onClick={() => setViewComment(!viewComment)} className="text-[13px] text-gray-500 cursor-pointer">
                        {viewComment ? "Hide Comments" :
                            allComments.length === 1 ?
                                `View ${allComments.length} Comment` :
                                `View All ${allComments.length} Comments`
                        }
                    </span> :

                    <span className="text-[13px] text-gray-500">No Comments Yet!</span>

                } */}
                {/* <span className="text-xs text-gray-500 cursor-pointer">{moment(createdAt).fromNow()}</span> */}

                {/* {viewComment &&
                    <ScrollToBottom className="w-full h-52 overflow-y-auto py-1">
                        {allComments.map((c) => (
                            <div className="flex items-start mb-2 space-x-2" key={c._id}>
                                <img draggable="false" className="h-7 w-7 rounded-full object-cover mr-0.5" src={c.user.avatar} alt="avatar" />
                                <Link to={`/${c.user}`} className="text-sm font-semibold hover:underline">{c.user.username}</Link>
                                <p className="text-sm">{c.comment}</p>
                            </div>
                        ))}
                    </ScrollToBottom>
                } */}

            </div>

            {/* comment input container */}
            {/* <form onSubmit={handleComment} className="flex items-center justify-between p-3 w-full space-x-3">
                <span onClick={() => setShowEmojis(!showEmojis)} className="cursor-pointer">{emojiIcon}</span>

                {showEmojis && (
                    <div className="absolute bottom-12 -left-2">
                        <Picker
                            set="google"
                            onSelect={(e) => setComment(comment + e.native)}
                            title="Emojis"
                        />
                    </div>
                )}

                <input
                    className="flex-auto text-sm outline-none border-none bg-transparent"
                    type="text"
                    value={comment}
                    ref={commentInput}
                    required
                    onFocus={() => setShowEmojis(false)}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..." />
                <button type="submit" className={`${comment.trim().length < 1 ? 'text-blue-300' : 'text-primary-blue'} text-sm font-semibold`} disabled={comment.trim().length < 1}>Post</button>
            </form> */}

        </div >
    )
}

export default ShowcaseItem