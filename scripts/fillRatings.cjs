#!/usr/bin/env node
// Simple scraper: search Goodreads/Douban via DuckDuckGo, fetch page, extract rating, write back into docs
// Note: Be nice; minimal parallelism

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs', 'shuji');

async function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

async function fetchText(url){
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (RatingsBot/1.0)' }});
  if(!res.ok) throw new Error('HTTP '+res.status+' '+url);
  return await res.text();
}

async function getGoodreadsRating(query){
  try{
    const searchUrl = `https://www.goodreads.com/search?q=${encodeURIComponent(query)}`;
    const searchHtml = await fetchText(searchUrl);
    let $ = cheerio.load(searchHtml);
    // Try new layout
    let href = $('a[href^="/book/show/"]').first().attr('href') || $('a.bookTitle').first().attr('href');
    if(!href) return null;
    const url = href.startsWith('http') ? href : `https://www.goodreads.com${href}`;
    const html = await fetchText(url);
    $ = cheerio.load(html);
    let rating = $('meta[itemprop="ratingValue"]').attr('content')
      || $('span[itemprop="ratingValue"]').first().text()
      || $('div.AggregateRatingButton__RatingScore').first().text();
    rating = (rating||'').trim();
    return rating ? { rating, url } : null;
  }catch(e){ return null; }
}

async function getDoubanRating(query){
  try{
    const searchUrl = `https://book.douban.com/subject_search?search_text=${encodeURIComponent(query)}`;
    const searchHtml = await fetchText(searchUrl);
    let $ = cheerio.load(searchHtml);
    // New douban search results
    let item = $('div.item-root').first();
    let href = item.find('a[href*="/subject/"]').attr('href');
    let rating = item.find('span.rating_nums').text().trim();
    if(!href){
      href = $('a.nbg[href*="/subject/"]').first().attr('href');
    }
    if(href && !rating){
      const html = await fetchText(href);
      $ = cheerio.load(html);
      rating = $('strong.rating_num').first().text().trim() || $('strong[property="v:average"]').text().trim();
    }
    const url = href || searchUrl;
    return rating ? { rating, url } : null;
  }catch(e){ return null; }
}

function listIndexFiles(dir){
  const files = [];
  for(const phase of ['rumen','jinjie','gaoji','xingqu']){
    const p = path.join(dir, phase);
    if(!fs.existsSync(p)) continue;
    for(const slug of fs.readdirSync(p)){
      const fp = path.join(p, slug, 'index.md');
      if(fs.existsSync(fp)) files.push(fp);
    }
  }
  return files;
}

function readTitle(md){
  const m = md.match(/^---[\s\S]*?title:\s*(.+)\n[\s\S]*?---/);
  return m ? m[1].trim() : '';
}

function replaceInfo(md, key, value){
  const re = new RegExp(`(\\- ${key}：)(.*)`);
  if(re.test(md)) return md.replace(re, `$1${value}`);
  // if not present, append under 书籍信息
  return md.replace(/(##\s+书籍信息\n)/, `$1- ${key}：${value}\n`);
}

async function main(){
  const files = listIndexFiles(DOCS);
  console.log('Found', files.length, 'books');
  for(const [i,fp] of files.entries()){
    let md = fs.readFileSync(fp,'utf-8');
    const title = readTitle(md) || path.basename(path.dirname(fp));
    const query = title.replace(/[（(].*?[）)]/g,''); // strip parentheses

    console.log(`[${i+1}/${files.length}]`, query);
    const gr = await getGoodreadsRating(query);
    await sleep(500);
    const db = await getDoubanRating(query);

    if(gr){
      md = replaceInfo(md, 'Goodreads评分', `${gr.rating}（${gr.url}）`);
    }
    if(db){
      md = replaceInfo(md, '豆瓣评分', `${db.rating}（${db.url}）`);
    }
    fs.writeFileSync(fp, md);
    await sleep(800); // be gentle
  }
}

main().catch(e=>{ console.error(e); process.exit(1); });


