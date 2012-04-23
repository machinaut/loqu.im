(function() {
  var explode, render, test;

  test = ['# Title Here', 'text here'];

  render = function(text) {
    var line, out, tag, _i, _len;
    out = '';
    for (_i = 0, _len = text.length; _i < _len; _i++) {
      line = text[_i];
      tag = '';
      if (line[0] === '#') {
        if (line[1] === '#') {
          if (line[2] === '#') {
            if (line[3] === '#') {
              if (line[4] === '#') {
                if (line[5] === '#') {
                  tag = 'h6';
                } else {
                  tag = 'h5';
                }
              } else {
                tag = 'h4';
              }
            } else {
              tag = 'h3';
            }
          } else {
            tag = 'h2';
          }
        } else {
          tag = 'h1';
        }
      } else {
        tag = 'p';
      }
      out += "<" + tag + ">" + line + "</" + tag + ">";
    }
    return out;
  };

  explode = function(thingy) {
    var child, children;
    children = $(thingy).children();
    if (children.length === 0) {
      return $(thingy).text();
    }
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = children.length; _i < _len; _i++) {
        child = children[_i];
        _results.push(explode(child));
      }
      return _results;
    })();
  };

  $(function() {
    $('#app').html(render(test)).attr('contenteditable', 'true').on('focus', function() {
      var $this;
      $this = $(this);
      $this.data('before', $this.html());
      return $this;
    }).on('blur keyup paste', function() {
      var $this;
      $this = $(this);
      if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
      }
      return $this;
    }).on('change', function() {
      var $this;
      $this = $(this);
      $this.html(render(explode(this)));
      return console.log('changing!');
    });
    $('#react').html(render(test));
    return console.log("I'm ready!");
  });

}).call(this);
