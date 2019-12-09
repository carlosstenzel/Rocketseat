import React from "react";

function PostItem(post) {
  return (
    <div className="post">

      <div className="post-header">
        <img className="avatar" src={post.author.avatar} />
        <div className="details">
          <span>{post.author.name}</span>
          <span>{post.date}</span>
        </div>
      </div>
  <p className="post-content">{post.content}</p>
    </div>
  );
}

export default PostItem;
