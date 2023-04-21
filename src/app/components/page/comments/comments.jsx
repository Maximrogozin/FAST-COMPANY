import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import CommentsList from "./commentsList";
import AddCommentForm from "./addCommentForm";

const Comments = ({ pageId }) => {
    const [commentsList, setCommentsList] = useState([]);
    const { userId } = useParams();

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setCommentsList([...commentsList, data]));
    };

    const handleDelete = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setCommentsList(
                    commentsList.filter((coment) => coment._id !== id)
                )
            );
    };

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(pageId)
            .then((data) => setCommentsList(data));
    }, []);

    const sortedComments = orderBy(commentsList, ["create_at"], ["desc"]);

    return (
        <div className="col-md-8">
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    <CommentsList
                        onRemove={handleDelete}
                        comments={sortedComments}
                    />
                </div>
            </div>
        </div>
    );
};

Comments.propTypes = {
    pageId: PropTypes.string.isRequired
};

export default Comments;
