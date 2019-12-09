import React, { Component } from "react";

import PostItem from "./PostItem";

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Carlos Stenzel",
          avatar: "https://avatars3.githubusercontent.com/u/3890516?s=460&v=4"
        },
        date: "12 Dez 2019",
        content: "Bora codar em NodeJS ?",
        comments: [
          {
            id: 1,
            author: {
              name: "Carlos Ziegler",
              avatar:
                "https://avatars3.githubusercontent.com/u/38855507?s=400&v=4"
            },
            content: "Bora codar"
          }
        ]
      }
    ]
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="postlist">
        {posts.map(post => (
          <>
          <PostItem key={post.id} post={post} />
          <div>{post.content}</div>
          </>
        ))}
      </div>
    );
  }
}

export default PostList;
