import styles from '../src/channels.css'
import SocialMedia from '../(icons)/SocialMedia'
const channels = () => {
  return (
    <>
  <title>General</title>
  <div id="topBar">
    <a href="intro" className="title">
      General
    </a>
  </div>
  <br />
  <br />
  <a href="dashboard" id="backButton">
    Back to Dashboard
  </a>
  <div>
    <button id="addPostBtn">
      <ion-icon name="chatbox-outline" />
      <span>Write a post</span>
    </button>
  </div>
  <div id="inputBox" className="hidden">
    <form
      id="postForm"
      action="/upload"
      method="post"
      encType="multipart/form-data"
    >
      <button id="closeForm">
        <ion-icon name="close-circle-outline" />
      </button>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" required="" />
      <br />
      <br />
      <label htmlFor="content">Write sth: </label>
      <textarea
        type="text"
        id="content"
        name="content"
        required=""
        defaultValue={""}
      />
      <br />
      <br />
      <label htmlFor="input-files">Pictures:</label>
      <input
        type="file"
        name="files"
        id="input-files"
        className="form-control-file border"
        multiple=""
      />
      <br />
      <input type="hidden" defaultValue="general" name="group" />
      {/* Make sure 'username' is defined and passed to the template */}
      <input type="hidden" defaultValue="<%= username %>" name="username" />
      <div className="switchForm">
        <label className="switch">
          <input type="checkbox" name="postAnonymous" />
          <span className="slider round">
            <h6 className="posta">
              Anonymously?
              <p />
            </h6>
          </span>
        </label>
      </div>
      <div id="uploadPostStatus" />
      <br />
      <br />
      <button className="Btn" style={{ bottom: 30 }} type="submit">
        Post
      </button>
    </form>
    <div className="row">
      <div className="col-sm-12">
        <div className="preview-images" />
      </div>
    </div>
  </div>
  <div className="bg">
    <div id="posts" className="word-box">
      &lt;% reversedPosts.forEach(post =&gt; {"{"} %&gt;
      <br />
      <div className="posts">
        <h3>&lt;%= post.title %&gt;</h3>
        <p>&lt;%= post.content %&gt;</p>
        &lt;% post.pictureUrl.forEach(function(image) {"{"} %&gt;
        <div className="imageContainer">
          <div className="loader" />
          <img
            className="lazyImage"
            data-src="./postspic/<%= image.filename %>"
            alt="Loading..."
            style={{ display: "none" }}
          />
        </div>
        <br />
        <br />
        <br />
        <div>
          <p>posted on &lt;%= post.postingtime %&gt;</p>
        </div>
        <br />
        &lt;% if(post.username === username &amp;&amp; admin == false) {
          "{"
        }{" "}
        %&gt;
        <form action="/generalDeletePost" method="POST" id="deletePost">
          <input type="hidden" name="postId" defaultValue="<%= post.id %>" />{" "}
          {/* Assuming each post has an ID */}
          <button className="Btn">Delete Post</button>
        </form>
        &lt;% {"}"} if(admin == true) {"{"}%&gt;
        <form action="/generalDeletePost" method="POST" id="deletePost">
          <input type="hidden" name="postId" defaultValue="<%= post.id %>" />{" "}
          {/* Assuming each post has an ID */}
          <button className="Btn">Admin Delete</button>
        </form>
        &lt;% {"}"}%&gt;
      </div>
      <form id="likePost<%= post.id %>" className="like-form">
        <input type="hidden" name="postId" defaultValue="<%= post.id %>" />
        <input type="hidden" name="username" defaultValue="<%= username %>" />
        <input type="hidden" name="forum" defaultValue="general" />
        &lt;% var isLiked = false %&gt; &lt;% generalPostsLikes.forEach(like
        =&gt; {"{"} %&gt; &lt;% if(like.username == username &amp;&amp;
        like.postId == post.id) {"{"} %&gt; &lt;% isLiked = true %&gt; &lt;%{" "}
        {"}"} %&gt; &lt;% {"}"}) %&gt; &lt;% if(isLiked) {"{"} %&gt;
        <button className="heart-button">
          <ion-icon name="heart" />
        </button>
        &lt;% {"}"} else {"{"}%&gt;
        <button className="heart-button">
          <ion-icon name="heart-outline" />
        </button>
        &lt;% {"}"} %&gt;
      </form>
      <form
        action="/commentGeneralPost"
        method="POST"
        id="commentPost<%= post.id%>"
        className="comment-form"
      >
        <input type="hidden" name="postId" defaultValue="<%= post.id %>" />
        <input type="text" name="content" />
        <input type="hidden" name="username" defaultValue="<%= username %>" />
        <button>post</button>
      </form>
      <div>
        &lt;%var likes = 0 %&gt; &lt;% generalPostsLikes.forEach(like =&gt;{" "}
        {"{"} %&gt; &lt;% if(like.postId == post.id) {"{"} %&gt; &lt;% ++likes
        %&gt; &lt;% {"}"} %&gt; &lt;% {"}"}) %&gt;
        <h1 className="postLikes">&lt;%= likes %&gt;</h1>
        &lt;% {"}"})%&gt;
      </div>
    </div>
  </div>
  <div id="spacing" />
  <br />
  <SocialMedia />
</>

  )
}

export default channels