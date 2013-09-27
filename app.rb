#!/usr/bin/env ruby
#encoding: UTF-8
 
require 'sinatra'

get '/' do
  File.read(File.join('public', 'index.html'))
end