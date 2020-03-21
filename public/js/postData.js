$(document).ready(function () {
  var url = window.location.search;
  var postId;


  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }


  var bodyInput = $("#body");
  var titleInput = $("#titlePD");

  var userNameInput = $('#userName');
  var postCategorySelect = $("#category");

  postCategorySelect.val("HR Application");

  function getPostData(id) {
    $.get("/api/posts/" + id, function (data) {
      if (data) {
        console.log(data);
        var test = data.body;

        titleInput.text(data.title);
        bodyInput.html(test.replace(/\n/g, '<br>'));
        postCategorySelect.text(data.category);


        var formattedDate = new Date(data.createdAt);
        formattedDate = moment(formattedDate).fromNow();;
        userNameInput.html(formattedDate + " - " + data.userName);

      }
    });
  }


});