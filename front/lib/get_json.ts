import fs from "fs";
import path from "path";

const jsonsDirectory = path.join(process.cwd(), "utils", "daily");

export function getSortedJsonData(){
  const fileNames = fs.readdirSync(jsonsDirectory).reverse().slice(0, 5);
  const jsonMap: any = {}
  fileNames.forEach((fileName: string)=>{
    const jsonObject = JSON.parse(fs.readFileSync('./utils/daily/'+fileName, 'utf8'));
    jsonMap[fileName] = jsonObject
  })
  return jsonMap
}

const jsonsTotalDirectory = path.join(process.cwd(), "utils", "total");

export function getSortedTotalJsonData(){
  const fileNames = fs.readdirSync(jsonsTotalDirectory).reverse().filter(name => name != "latest.json").slice(0, 10);
  const jsonMap: any = {}
  fileNames.forEach((fileName: string)=>{
    const jsonObject = JSON.parse(fs.readFileSync('./utils/total/'+fileName, 'utf8'));
    jsonMap[fileName.split(".")[0]] = jsonObject
  })
  return jsonMap
}