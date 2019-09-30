$.ajax({
    url: 'https://easy-mock.com/mock/5c09f40d3c098813c612cce6/movie/power',
    type: 'POST',
    data: {
      password: '123456',
      username: 'cst'
    }
  })
  .then((res) => {
    console.log(res);
    if (res.data.power == 'root') {
      return $.ajax({
        url: 'https://easy-mock.com/mock/5c09f40d3c098813c612cce6/movie/movieList',
        type: 'GET',
      });
    }
  }, (error) => {
    console.log(error);
  })
  .then((res) => {
    var df = $.deferred();
    var data = res.data;
    var $Wrapper = $('.wrapper');
    $.each(data, function (index, ele) {
      var $MovieDiv = $('.tpl').clone().removeClass('tpl').addClass('movieSection');
      $MovieDiv
        .data({
          id: ele.id
        })
        .on('click', function () {
          df.resolve($(this));
        })
        .children().eq(0)
        .attr('src', ele.poster)
        .next()
        .text(ele.name);

      $Wrapper.append($MovieDiv);
    });
    return df.promise();
  }, (err) => {
    console.log(err);
  })
  .then((self)=>{
    return $.ajax({
      url: 'https://easy-mock.com/mock/5c09f40d3c098813c612cce6/movie/movieInfo',
      type: 'GET',
      data: {
        movieId: self.data('id')
      }
    });
  },(err)=>{
    console.log(err)
  })
  .then((res) => {
    var data = res.data;
    var direct = data.direct;
    var gut = data.gut;
    var actors = data.mainActor;
    var screenWriters = data.screenwriter;
    var htmlStr = '<div class="mask">\
                        <p>导演：' + direct + '</p>\
                        <p>剧情：' + gut + '</p>\
                        <p>主演：' + actors.reduce(function (prevValue, curValue) {
      prevValue += ' ' + curValue;
      return prevValue;
    }, '') + '</p>\
                        <p>编剧：' + screenWriters.reduce(function (prevValue, curValue) {
      prevValue += ' ' + curValue;
      return prevValue;
    }, '') + '</p>\
                    </div>';
    $(htmlStr).appendTo('body')
      .css({
        width: 400,
        height: 200,
        position: 'absolute',
        left: $(window).outerWidth() / 2,
        bottom: 100
      })
      .css({
        marginLeft: -$('.mask').outerWidth() / 2,
        marginTop: -$('.mask').outerHeight() / 2
      });
  }, (err) => {
    console.log(err);
  });