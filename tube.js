// animate the search bar
//search handler creates var that only makes the document look for
// the items once

const endPointWiki ='https://en.wikipedia.org/w/api.php' 

$(function(){

  var searchfield = $('#query');
  var icon = $('#search-btn');

  // handling the focus of the search, when the bar is clicked this will happen

  $(searchfield).on('focus', function(){
    $(this).animate({
      width:'90%'
    },400);
    $(icon).animate({
      opacity: 1
    //  right:'10px'
    },400);
  });

  // blur event

  $(searchfield).on('blur', function(){
    if (searchfield.val() === ''){
      $(searchfield).animate({
        width:'45%'
      },400, function(){});
      $(icon).animate({
        opacity: 0
   //     right:'360px'
      },400, function(){});
    }
  });

  $('#search-form').submit(function (e) {
    e.preventDefault();
  })
})

// this is to reset/clear the search each time on click //

function search () {
  $('#results').html('');
  $('#buttons').html('');

  // this is information placed in search

  q = $('#query').val();

  // use GET for API information
  /*$.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part:'snippet, id',
      q:q,
      type:'video',
      key:'AIzaSyDJr1oj1Q_dVAAqu-ftjJ-WsRT3huKG9LQ'},
      function (data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;
        console.log(data);
        // looping through each result in the JSON
        $.each(data.items, function (i, item){
          var output = getOutput(item);
          //display results
          $('#results').append(output);
        });
        var buttons = getButtons(prevPageToken,nextPageToken);
        // display buttons for mor results
        $('#buttons').append(buttons);
      }
  );*/
  var url = 'https://newsapi.org/v2/everything?' +
          'sources=ign&' +
          'language=en&' +
          'q=' +q+'&' +
          'apiKey=825aa5625d1346c996c1b5ff68efbba3';
          console.log(url)
  $.get(url, function(data){
    console.log(data)

    $.each(data.articles, function (i, item){
          var output = getOutput(item);

          //display results
          $('#results').append(output);
        })
  })
}

function topHeadlines () {
      var url = 'https://newsapi.org/v2/top-headlines?sources=ign&apiKey=825aa5625d1346c996c1b5ff68efbba3'

    $.get(url, function(data){
    console.log(data)

    $.each(data.articles, function (i, item){
          var output2 = getOutput(item);

          //display results
          $('#topHeadlines').append(output2);
        })
    })
  }
   topHeadlines();
   console.log('alert');

const ignAPI = '825aa5625d1346c996c1b5ff68efbba3';

  
// build the results or output
//var for each piece that will be used in the results

function getOutput(item) {

  var url = item.url;
  var image = item.urlToImage; 
  var title = item.title;
  var description = item.description;


  // building the results page or out put after the seearch
  var output = '<li>' +
  '<div class ="list-left">' + 
  //link the thumbnail and also have new page open in a new window//
  '<a target="_blank" href="'+url+'"><img src="'+image+'"></a>' +
  '</div>' +
  '<div class="list-right">' +
  '<a target="_blank" href="'+url+'"><h3>'+title+'</h3></a>' +
  '<p>' +description+'</p>' +
  '</div>' +
  '</li>' +
  '<div class="clearfix"></div>' +
  '';

  return output;

var output2 = '<li>' +
  '<div class ="list-left">' + 
  //link the thumbnail and also have new page open in a new window//
  '<a target="_blank" href="'+url+'"><img src="'+image+'"></a>' +
  '</div>' +
  '<div class="list-right">' +
  '<a target="_blank" href="'+url+'"><h3>'+title+'</h3></a>' +
  '<p>' +description+'</p>' +
  '</div>' +
  '</li>' +
  '<div class="clearfix"></div>' +
  '';

  return output;
}

//create buttons to go next and before

function  getButtons (prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnoutput = '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query="'+q+'"'+
            'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnoutput = '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'"data-query="'+q+'"'+
            'onclick="prevPage();">Prev Page</button>' +
            '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'"data-query="'+q+'"'+
            'onclick="nextPage();">Next Page</button></div>';
  }

  return btnoutput;

}