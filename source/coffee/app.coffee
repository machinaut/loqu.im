spanify = (line) -> ("<span>#{c}</span>" for c in line.split '').join ''

# TODO put a method on the model that recalculates the tag
# TODO put an event that fires the tagcalculator on 'change:text'
Line = Backbone.Model.extend
  defaults:
    tag: 'div'
    text: ''


LineView = Backbone.View.extend
  render: ->
    text = this.model.get 'text'
    tag  = this.model.get 'tag'
    html = "<#{tag}>#{spanify text}</#{tag}>"
    this.$el.html html

Doc = Backbone.Collection.extend 
  model: Line

doc = new Doc

lines = [ 
  {t: '# Title Here'}
  {t: 'text here'}
  {t: '## Subtitle here'}
  {t: 'more text'}
]

doc.reset lines

test = [ 
  '# Title Here'
  'text here'
  '## Subtitle here'
  'more text'
]

render = (text) ->
  out = ''
  for line in text
    tag = ''
    # LOOK AT THE PRETTY ARROW! I CAN HAZ GOOD CODEZ
    if line[0] is '#'
      if line[1] is '#'
        if line[2] is '#'
          if line[3] is '#'
            if line[4] is '#'
              if line[5] is '#' then tag = 'h6' else tag = 'h5'
            else tag = 'h4'
          else tag = 'h3'
        else tag = 'h2'
      else tag = 'h1'
    else tag = 'p'
    line = spanify line
    out += "<#{tag}>#{line}</#{tag}>"
  return out

explode = (thingy) ->
  children = $(thingy).children()
  if children.length is 0 then return $(thingy).text()
  return (explode child for child in children)

# possibly just reparse the whole document every freakign time.
# that could work
$ ->
  $('#app')
    .html(render test)
  console.log "I'm ready!"


