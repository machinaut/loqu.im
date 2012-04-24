(function() {
  var Doc, Line, LineView, doc, explode, lines, render, spanify, test;

  spanify = function(line) {
    var c;
    return ((function() {
      var _i, _len, _ref, _results;
      _ref = line.split('');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        _results.push("<span>" + c + "</span>");
      }
      return _results;
    })()).join('');
  };

  Line = Backbone.Model.extend({
    defaults: {
      tag: 'div',
      text: ''
    }
  });

  LineView = Backbone.View.extend({
    render: function() {
      var html, tag, text;
      text = this.model.get('text');
      tag = this.model.get('tag');
      html = "<" + tag + ">" + (spanify(text)) + "</" + tag + ">";
      return this.$el.html(html);
    }
  });

  Doc = Backbone.Collection.extend({
    model: Line
  });

  doc = new Doc;

  lines = [
    {
      t: '# Title Here'
    }, {
      t: 'text here'
    }, {
      t: '## Subtitle here'
    }, {
      t: 'more text'
    }
  ];

  doc.reset(lines);

  test = ['# Title Here', 'text here', '## Subtitle here', 'more text'];

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
      line = spanify(line);
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
    $('#app').html(render(test));
    return console.log("I'm ready!");
  });

}).call(this);
