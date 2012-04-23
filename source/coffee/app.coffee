tst = "# Title Here\ntext here"

render = (text) ->
  out = ''
  for line in text.split('\n')
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
    out += "<#{tag}>#{line}</#{tag}>"
  return out

explode = (thingy) ->
  children = thingy.children
  if children.length is 0 then return "#{thingy.text()}\n"
  joy = ''
  for child in children
    joy += explode child
  return joy

# possibly just reparse the whole document every freakign time.
# that could work
$ ->
  $('#app')
    .html(render tst)
    .attr('contenteditable','true')
    .live 'focus', ->
      $this = $(this)
      $this.data 'before', $this.html()
      return $this
    .live 'blur keyup paste', ->
      $this = $(this)
      if $this.data('before') isnt $this.html()
        $this.data 'before', $this.html()
        $this.trigger('change')
      return $this
    .live 'change', ->
      $this = $(this)
      $this.html render $this.html()
      console.log 'changing!'
  $('#react')
    .html render tst
  console.log "I'm ready!"

