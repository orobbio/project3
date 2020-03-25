$(document).ready(function() {
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  $(document).on("click", "button.view", handlePostView);
  postCategorySelect.on("change", handleCategoryChange);
  var posts;

  function getPosts(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  
  getPosts();
 
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
      var space = $('<hr>');
      postsToAdd.push(space)
    }
    blogContainer.append(postsToAdd);
    }

 
  function createNewRow(post) {
    var newPostCard = $("<div>");
    newPostCard.addClass("card border-warning row row-cols-1 row-cols-md-2");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header card-img-top");
    
    var viewBtn = $("<button>");
    viewBtn.text("View SOP");
    viewBtn.addClass("view btn btn-default");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<p>");
    var newPostCategory = $("<p>");
    newPostCategory.text(post.category);
    newPostCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });

    viewBtn.css({
      float: "left",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    var bodyText = post.body;
    var newPostName = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.html(bodyText.replace(/\r?\n/g, '<br />'));
    newPostName.text(post.userName);
    var formattedDate = new Date(post.createdAt);
    var newDate = moment(formattedDate).fromNow(); ;
    newPostDate.html(newDate + " - " + post.userName);
    
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostDate);
    newPostCardHeading.append('<br>');
    newPostCardHeading.append(newPostCategory);
    newPostCardHeading.append(viewBtn);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }


  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  function handlePostView() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/postData?post_id=" + currentPost.id;
  }


  function displayEmpty() {
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No SOP's yet for this Applications, navigate <a href='/cms'>here</a> in order to create a new SOP.");
    blogContainer.append(messageH2);
  }

  function handleCategoryChange() {
    var newPostCategory = $(this).val();
    getPosts(newPostCategory);
  }

});
