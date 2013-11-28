#!/usr/bin/env ruby
#encoding: UTF-8
 
require 'sinatra'
set :public_folder, File.dirname(__FILE__) + '/www'

get '/' do
  redirect 'index.html'
end
