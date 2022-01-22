require "json"
require "date"
date = Date.new(2022,1,22)
date = date.to_s
result={}
File.open("result/daily/#{date}.json") do |j|
  result = JSON.load(j)
end
total_hash={}
File.open("result/total/latest.json") do |j|
  total_hash = JSON.load(j)
end

result.each do |hash|
  id = hash["id"].to_s
  name = hash["name"]
  cnt = hash["win_cnt"]
  total_hash[id]||={"name"=> name, "cnt"=> 0}
  total_hash[id]["name"] = name
  total_hash[id]["cnt"]+=cnt
end

File.open("result/total/#{date}.json","w") {|file| 
  file.puts(JSON.generate(total_hash))
}
File.open("result/total/latest.json","w") {|file| 
  file.puts(JSON.generate(total_hash))
}