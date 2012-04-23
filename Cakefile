#!/usr/bin/env cake
#
# Cakefile for building Coffee and LESS files
# Alex Ray <a@machinaut.com>
#
# TODO: Other file formats, Compression

# infiles
COFFEE_DIR="source/coffee"
LESS_DIR="source/less"
# outfiles
APP_DIR= "extension/app"
THEME_DIR= "extension/theme"

option '-q', '--quiet', 'Only diplay errors'
option '-w', '--watch', 'Watch files for change and automatically recompile'

task 'compile', "Compile all files", (options) ->
  task_coffee(options)
  task_less(options)

task 'compile:coffee', "Compile all coffee files", (options) ->
  task_coffee(options)

task 'compile:less', "Compile all less files", (options) ->
  task_less(options)

fs = require 'fs'
cs = require('coffee-script')
parser = new require('less').Parser paths: [LESS_DIR]

compile_coffee = (options, infile, outfile) ->
  try
    src = fs.readFileSync infile, 'utf8'
    out = cs.compile src
    console.log " + #{outfile} (#{infile})[#{out.length}]" unless options.quiet
    fs.writeFileSync outfile, out
  catch err
    console.log " - #{outfile} (#{infile})"
    console.log "   ^ #{err}"

compile_less = (options, infile, outfile) ->
  try
    src = fs.readFileSync infile, 'utf8'
    out = parser.parse src, (e, tree) -> 
      throw e if e
      out = tree.toCSS()
      console.log " + #{outfile} (#{infile})[#{out.length}]" unless options.quiet
      fs.writeFileSync outfile, out
  catch err
    console.log " - #{outfile} (#{infile})"
    console.log "   ^ #{err.message} (col #{err.column})"
    console.log "     Near: #{err.extract}"

watch_file = (options, infile, outfile, callback) ->
  return unless options.watch
  fs.watchFile infile, (curr, prev) -> callback options, infile, outfile

task_coffee = (options) ->
  for file in fs.readdirSync COFFEE_DIR
    continue unless file.substr(-7) is '.coffee' # check extension
    infile = "#{COFFEE_DIR}/#{file}"
    outfile = "#{APP_DIR}/#{file.slice(0,-7)+'.js'}" # .coffee -> .js
    compile_coffee options, infile, outfile
    watch_file options, infile, outfile, compile_coffee

task_less = (options) ->
  for file in fs.readdirSync LESS_DIR
    continue unless file.substr(-5) is '.less' # check extension
    infile = "#{LESS_DIR}/#{file}"
    outfile = "#{THEME_DIR}/#{file.slice(0,-5)+'.css'}" # .less -> .css
    compile_less options, infile, outfile
    watch_file options, infile, outfile, compile_less
