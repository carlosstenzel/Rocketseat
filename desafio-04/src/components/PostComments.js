import React from "react";
import { italic } from "ansi-colors";

export default function PostComments({ comments }) {
  return (
    <div className="post-comments">
      <div className="divider" />
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <img className="avatar" src={comment.author.avatar} />
          <div>
            <p>
              <span>{comment.author.name}: </span>
              {comment.content}
              <br />
              <small>{comment.date}</small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
