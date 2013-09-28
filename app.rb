#!/usr/bin/env ruby
#encoding: UTF-8
 
require 'sinatra'

get '/' do
  redirect 'index.html'
end