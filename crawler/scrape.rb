require "json"
require 'selenium-webdriver'
require 'mechanize'
require 'net/http'
require 'uri'

def selenium_options
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument("--no-sandbox")
  options.add_argument("--headless")
  options.add_argument("--disable-dev-shm-usage")
  options
end

def selenium_capabilities_chrome
  Selenium::WebDriver::Remote::Capabilities.chrome
end

def scrape(date)
  puts "start scrape"
  caps = [
    selenium_options,
    selenium_capabilities_chrome
  ]
  driver = Selenium::WebDriver.for(:remote, capabilities: caps, url: "http://#{ENV.fetch("SELENIUM_HOST")}/wd/hub")
  driver.manage.timeouts.implicit_wait = 30
  date = date.to_s.gsub("-","")
  driver.navigate.to "https://race.netkeiba.com/top/race_list.html?kaisai_date=#{date}"
  puts driver.title

  elements = driver.find_elements(:xpath, '//dl[@class="RaceList_DataList"]/dd/ul/li/a')
  race_id_list = []
  elements.each do |e|
    race_id_list << e.attribute("href").gsub(/[^\d]/, "").to_i
  end
  race_id_list.uniq!
  puts "finished scrape race_id_list"

  agent = Mechanize.new
  hash = {}
  race_id_list.each do |id|
    sleep 1
    url = "https://race.netkeiba.com/race/result.html?race_id=#{id}&rf=race_list"
    page = agent.get(url)
    table = page.xpath('//div[@class="ResultTableWrap"]/table/tbody/tr')
    table.each_with_index do |tr, index|
      rank = tr.css('td')[0].text.strip
      jockey = tr.css('td')[6].text.strip
      jockey_id = tr.css('td')[6].css('a')[0][:href].split("/")[6]
      odds_rank = tr.css('td')[9].text.strip
      hash[jockey_id]||={name: jockey, result: []}
      hash[jockey_id][:result] << [rank.to_i, odds_rank.to_i]
    end
  end
  puts "finished scrape horse_url_list"
  hash
end

def arrange_data(hash)
  arr = []
  hash.each do |k,v|
    jockey_id = k
    jockey_name = v[:name]
    result = v[:result]
    rank_arr = [0,0,0,0]
    odds_rank_arr = [0,0,0,0]
    win_cnt = 0
    jockey_url = "https://db.netkeiba.com/jockey/#{jockey_id}"
    result.each do |rank, odds_rank|
      if rank==1
        win_cnt += 1
        rank_arr[0]+=1
      elsif rank==2
        rank_arr[1]+=1
      elsif rank==3
        rank_arr[2]+=1
      else
        rank_arr[3]+=1
      end
      if odds_rank==1
        odds_rank_arr[0]+=1
      elsif odds_rank==2
        odds_rank_arr[1]+=1
      elsif odds_rank==3
        odds_rank_arr[2]+=1
      else
        odds_rank_arr[3]+=1
      end
    end
    arr << {
      id: jockey_id,
      name: jockey_name,
      url: jockey_url,
      win_cnt: win_cnt,
      rank_arr: rank_arr.join("-"),
      odds_rank_arr: odds_rank_arr.join("-")
    }
  end
  arr
end

date = Date.today
hash = scrape(date)
arr = arrange_data(hash)
arr = arr.sort_by{|x|x[:win_cnt]*-1}
file_name = date.to_s
File.open("result/daily/#{file_name}.json","w") {|file| 
  file.puts(JSON.generate(arr))
}