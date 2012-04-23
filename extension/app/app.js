(function() {
  var render, tst;

  tst = "# Title Here\ntext here";

  render = function(text) {
    var line, out, tag, _i, _len, _ref;
    out = '';
    _ref = text.split('\n');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
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

  $(function() {
    $('#app').html(render(tst)).attr('contenteditable', 'true').live('focus', function() {
      var $this;
      $this = $(this);
      $this.data('before', $this.html());
      return $this;
    }).live('blur keyup paste', function() {
      var $this;
      $this = $(this);
      if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $this.trigger('change');
      }
      return $this;
    }).live('change', function() {
      var $this;
      $this = $(this);
      $this.html(render($this.html()));
      return console.log('changing!');
    });
    $('#react').html(render(tst));
    return console.log("I'm ready!");
  });

}).call(this);
