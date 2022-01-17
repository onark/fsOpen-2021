import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const CommentForm = ({ handleAddComment }) => {
    const [comment, resetComment] = useField('text')

    const handleSaveComment = (event) => {
        event.preventDefault()
        if (!comment.value) return
        handleAddComment(comment.value)
        resetComment()
    }

    return (
        <form onSubmit={handleSaveComment}>
            <input {...comment} />
            <button  type="submit">
          Add Comment
            </button>
        </form>
    )
}

const Comments = ({ comments, handleAddComment }) => (
    <>
        <h3>Comments:</h3>
        <CommentForm handleAddComment={handleAddComment} />
        <div>
            {comments &&
          comments.map((comment, commentId) => <p key={commentId}>{comment}</p>)}
        </div>
    </>
)

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    handleAddComment: PropTypes.func.isRequired,
}

CommentForm.propTypes = {
    handleAddComment: PropTypes.func.isRequired,
}

export default Comments
