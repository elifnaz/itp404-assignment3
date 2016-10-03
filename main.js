$('#search-button').click(function() {
  getSubreddits($('#input').val());
 })
 // makes an AJAX call to the Reddit API using the subreddit argument
function getSubreddits(subreddit) {
 var promise = $.ajax({
  url: 'https://www.reddit.com/r/' + subreddit + '.json',
  type: 'get'
 });
 promise.then(function(response) {
  var posts = response.data.children;
  var formattedJSON = posts.map(function(post) {
   var data = post.data;
   var archived = data.archived ? "Archived" : "Not Archived";
   var details = {
    "score": data.score,
    "title": data.title,
    "commentCount": data.num_comments,
    "description": data.selftext,
    "archived": archived,
    "url": data.url,
   }
   return details;
  });
  console.log(formattedJSON);
  var templateSource = $('#subreddit-list-template').html();
  var template = Handlebars.compile(templateSource);
  var html = template({
   post: formattedJSON
  });
  $('#subreddit-list').html(html);

 }, function() {
  var templateSource = $('#subreddit-list-template').html();
  var template = Handlebars.compile(templateSource);
  var html = template({
   post: null
  });
  $('#subreddit-list').html(html);
 });
}
