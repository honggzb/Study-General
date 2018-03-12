```javascript
//hidden text area that is always set to have some text selected, then cut, copy, and paste events are always fired in any browser
var hiddenInput = $('#hidden-input');  
var focusHiddenArea = function() {
    hiddenInput.val(' ');
	hiddenInput.focus().select();
};
$(document).mouseup(focusHiddenArea);
['cut', 'copy', 'paste'].forEach(function(event) {
    document.addEventListener(event, function(e) {
        console.log(event);
        focusHiddenArea();
        e.preventDefault();
    });
});
```

Get Data in Multiple Formats To and From the Clipboard

```javascript
if(window.clipboardData) {
    // use just 'Text' or 'Url' as a first param otherwise strange exception is thrown
    window.clipboardData.setData('Text', 'Text that will be copied to CB');        
} else if(ev.originalEvent.clipboardData) {
    ev.originalEvent.clipboardData.setData('text/plain', 'Text that will be copied to CB');      
} else {
    alert('Clipboard Data are not supported in this browser. Sorry.');
}
//
window.addEventListener('copy', function (ev) {
    console.log('copy event');
    // you can set clipboard data here, e.g.
    ev.clipboardData.setData('text/plain', 'some text pushed to clipboard');
    // you need to prevent default behaviour here, otherwise browser will overwrite your content with currently selected 
    ev.preventDefault();
});
//
<p><button class="js-textareacutbtn" disable>Cut Textarea</button></p>
<script>
//copy clipboard
var copyEmailBtn = document.querySelector('.js-emailcopybtn');
copyEmailBtn.addEventListener('click', function(event) {
  // Выборка ссылки с электронной почтой
  var emailLink = document.querySelector('.js-emaillink');
  var range = document.createRange();
  range.selectNode(emailLink);
  window.getSelection().addRange(range);
  try {
    // Теперь, когда мы выбрали текст ссылки, выполним команду копирования
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copy email command was ' + msg);
  } catch(err) {
    console.log('Oops, unable to copy');
  }
  // Снятие выделения - ВНИМАНИЕ: вы должны использовать
  // removeRange(range) когда это возможно
  window.getSelection().removeAllRanges();
});
//cut
var cutTextareaBtn = document.querySelector('.js-textareacutbtn');
cutTextareaBtn.addEventListener('click', function(event) {
  var cutTextarea = document.querySelector('.js-cuttextarea');
  cutTextarea.select();
  try {
    var successful = document.execCommand('cut');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Cutting text command was ' + msg);
  } catch(err) {
    console.log('Oops, unable to cut');
  }
});
</script>
//Get Data in Multiple Formats To and From the Clipboard
clipboard.setData('text/plain', selection.getText());
clipboard.setData('application/officeObj’, selection.serialize());
clipboard.setData('image/bmp', draw(selection));
clipboard.setData('text/html', ...);
```

- Chrome and Safari: They support any content type on the clipboardData, including custom types. So, we can call clipboardData.setData('application/lucidObjects', serializedObjects) for pasting, and then call var serialized = clipboardData.getData('application/lucidObjects')
- Firefox: It currently only allows access to the data types described above. You can set custom types on copy, but when pasting, only the white-listed types are passed through.
- Internet Explorer: In true IE fashion, it supports just two data types: Text and URL. Oh, and if you set one, you can’t set the other (it gets nulled out). There is a hack, however, that also allows us to indirectly get and set HTML.

Internet Explorer doesn’t expose text/html via JavaScript. It does, however, support copying and pasting HTML into contenteditable elements. We can leverage this if we let the browser perform its default copy and paste, but ‘hijack’ the events to get/put the HTML data we want. 

```javascript
if (isIe) {
    document.addEventListener('beforepaste', function() {
        if (hiddenInput.is(':focus')) {
            focusIeClipboardDiv();
        }
    }, true);
}

var ieClipboardEvent = function(clipboardEvent) {
    var clipboardData = window.clipboardData;
    if (clipboardEvent == 'cut' || clipboardEvent == 'copy') {
        clipboardData.setData('Text', textToCopy);
        ieClipboardDiv.html(htmlToCopy);
        focusIeClipboardDiv();
        setTimeout(function() {
            focusHiddenArea();
            ieClipboardDiv.empty();
        }, 0);
    }
    if (clipboardEvent == 'paste') {
        var clipboardText = clipboardData.getData('Text');
        ieClipboardDiv.empty();
        setTimeout(function() {
            console.log('Clipboard Plain Text: ' + clipboardText);
            console.log('Clipboard HTML: ' + ieClipboardDiv.html());
            ieClipboardDiv.empty();
            focusHiddenArea();
        }, 0);
    }
};
```

> Reference
- [THE DEFINITIVE GUIDE TO COPYING AND PASTING IN JAVASCRIPT](https://www.lucidchart.com/techblog/2014/12/02/definitive-guide-copying-pasting-javascript/)
- http://jsfiddle.net/fpm1nn85/


