/**
 * 使用ES6+promise组织异步代码
 */
(function () {
  'user strict';

  /* Utitilty */
  var Util = (function () {
    var prefix = 'html5_reader_';
    var StorageGetter = function (key) {
      return localStorage.getItem(prefix + key);
    }
    var StorageSetter = function (key, val) {
      return localStorage.setItem(prefix + key, val);
    }
    //jsonp请求方法，使用jquery.jsonp.js
    var getBSONP = function (url, callback) {
      return $.jsonp({
        url: url,
        cache: true,
        callback: 'duokan_fiction_chapter',
        success: function (result) {
          var data = $.base64.decode(result);   //jquery.base64.js 解码
          var json = decodeURIComponent(escape(data));
          callback(json);
        }
      })
    }
    return {
      StorageGetter: StorageGetter,
      StorageSetter: StorageSetter,
      getBSONP: getBSONP
    }
  })();

  var Dom = {
    top_nav: $('#top_nav'),
    bottom_nav: $('#bottom_nav'),
    font_container: $('#font_container'),
    font_button: $('.icon-day')
  };

  var Win = $(window);
  var Doc = $(document);
  var readerModel;

  var RootContainer = $('#fiction_container');
  var initFontSize = parseInt(Util.StorageGetter('font-size'));
  if (!initFontSize) initFontSize = 14;
  RootContainer.css('font-size', initFontSize);

  /* 项目的入口函数 */
  function main() {
    readerModel = ReaderModel();
    readerModel.init(function(data){
      ReaderBaseFrame(data, RootContainer);
    });
    EventHandle();
  }

  /* interfaces */
  function ReaderModel() {
    //todo 实现和阅读器相关的是数据交互的方法
    var chapter_id;
    var ChapterTotal;

    var init = function (UICallback) {

      // getFictionInfo(function () {
      //   getCurChapterContent(chapter_id, function (data) {
      //     //console.log(obj);
      //     UICallback && UICallback(data);
      //   });
      // });
      getFictionInfoPromise().then(function(data){
            return getCurChapterContentPromise(chapter_id);
        }).then(function(data){
          UICallback && UICallback(data);
        });

    }

    var getFictionInfo = function (callback) {
      $.get('data/chapter.json', function (data) {
        // todo，获得章节之后的回调
        chapter_id = Util.StorageGetter('last_chapter_id');
        if(chapter_id == null)
          chapter_id = data.chapters[1].chapter_id;
        ChapterTotal = data.chapters.length;
        callback && callback();   //todo
      }, 'json');
    }

    var getFictionInfoPromise = function(){
      return new Promise(function (resolve, reject) {
        $.get('data/chapter.json', function (data) {
          if(data.result == 0){
            chapter_id = Util.StorageGetter('last_chapter_id');
            if(chapter_id == null)
              chapter_id = data.chapters[1].chapter_id;
            ChapterTotal = data.chapters.length;
            resolve();
          }else{
            reject();
          }
        }, 'json');
      });
    }

    var getCurChapterContent = function (chapter_id, callback) {
      $.get('data/data' + chapter_id + '.json', function (data) {
        if (data.result == 0) {
          var url = data.jsonp;    //jsonp请求
          Util.getBSONP(url, function (data) {
            callback && callback(data);
          });
        }
      }, 'json')
    }

    var getCurChapterContentPromise = function(chapter_id){
      return new Promise(function (resolve, reject) {
        $.get('data/data' + chapter_id + '.json', function (data) {
          if (data.result == 0) {
            var url = data.jsonp;    //jsonp请求
            Util.getBSONP(url, function (data) {
              resolve(data);
            });
          }else{
            reject({msg: 'fail'});
          }
        }, 'json')
      });
    }

    var prevChapter = function (UICallback) {
      chapter_id = parseInt(chapter_id, 10);
      if (chapter_id == 0) return;
      chapter_id -= 1;
      getCurChapterContent(chapter_id, UICallback);
      Util.StorageSetter('last_chapter_id', chapter_id);
    }

    var nextChapter = function (UICallback) {
      chapter_id = parseInt(chapter_id, 10);
      if (chapter_id == ChapterTotal) return;
      chapter_id += 1;
      getCurChapterContent(chapter_id, UICallback);
      Util.StorageSetter('last_chapter_id', chapter_id);
    }

    return {
      init: init,
      prevChapter: prevChapter,
      nextChapter: nextChapter
    }
  }

  function ReaderBaseFrame(data, container) {
    //todo 渲染基本的UI结构
    function parseChapterData(jsonData) {
      var jsonObj = JSON.parse(jsonData);
      var html = '<h4>' + jsonObj.t + '</h4>';
      for(var i=0;i < jsonObj.p.length; i++) {
        html += '<p>' + jsonObj.p[i] + '</p>';
      }
      return html;
    }
    container.html(parseChapterData(data));
  }

  function EventHandle() {
    // todo 交互的事件绑定
    // <4.0 click有300ms延迟，但>4.0后，click无延迟
    $('#action_mid').click(function () {
      if (Dom.top_nav.css('display') == 'none') {
        Dom.bottom_nav.show();
        Dom.top_nav.show();
      } else {
        Dom.bottom_nav.hide();
        Dom.top_nav.hide();
        Dom.font_container.hide();
      }
    });
    $('.icon-font').click(function () {
      if (Dom.font_container.css('display') == 'none') {
        Dom.font_container.show();
        $(this).addClass('current');
      } else {
        Dom.font_container.hide();
        $(this).removeClass('current');
      }
    });

    $('#prev_button').click(function () {
      readerModel.prevChapter(function(data){
        ReaderBaseFrame(data, RootContainer);
      })
    });
    $('#next_button').click(function () {
      readerModel.nextChapter(function(data){
        ReaderBaseFrame(data, RootContainer);
      })
    });

    Dom.font_button.click(function () {
      //todo 触发背景切换事件
    });

    $('#large_font').click(function () {
      if (initFontSize > 20) return;
      initFontSize++;
      RootContainer.css('font-size', initFontSize);
      Util.StorageSetter('font-size', initFontSize);
    });
    $('#small_font').click(function () {
      if (initFontSize < 10) return;
      initFontSize--;
      RootContainer.css('font-size', initFontSize);
      Util.StorageSetter('font-size', initFontSize);
    });

    //window滚动事件 --> 滚动的时候，上下边栏不显示
    Win.scroll(function () {
      Dom.bottom_nav.hide();
      Dom.top_nav.hide();
      Dom.font_container.hide();
      Dom.font_container.removeClass('current');
    })
  }

  main();

})();
