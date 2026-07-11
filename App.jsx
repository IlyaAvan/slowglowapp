import React, { useState, useEffect, useRef } from "react";
import { Home, MapPin, Plus, User, Search, Heart, ChevronDown, ArrowRight, ArrowLeft, X, Send, Clock, Users, Wind, ExternalLink, Play, Download, Sparkles, Check, BookOpen, LayoutGrid } from "lucide-react";
import { LANG_WEEK_EXTRA } from "./lang_weeks.js";
import { C, CHAPTERS, PH, PH_GRAD, DECO_DEFAULT, IMG, QUOTES, MICRO, DIET, SKIN, RHYTHM, PET, CITY_HINTS, TODAY_POOL, PLAYLISTS, PL_BY_CH, STEP_POOL, TODAY_ROMANCE, STEP_ROMANCE, TODAY_COASTAL, STEP_COASTAL, TODAY_SLOW, STEP_SLOW, TODAY_BY_CH, STEP_BY_CH, PLACE_POOL, LEISURE, LEISURE_BY_CH, NICHE_BY_CH, INSPO, DREAM_BY_CH, TRAVEL, TRAVEL_BY_CH, _CITY_GRAD, LANG_STAMP, CITY_TYPE, CITY_GENERIC, EVENTS, PINS_POOL, RUBRICS, RUBRIC_ORDER, RUBRIC_COL, RUBRICS_ROMANCE, RUBRICS_COASTAL, RUBRICS_SLOW, RUBRICS_BY_CH, STYLIST_BY_CH, WORLD, WORLD_ORDER, _wikiCache, RITUAL_STEPS, ENVELOPE_IDEAS, ENVELOPE_QS, SHOP, DAY_BEAUTY, EDITOR_NOTES, NEARBY_CATS, PLACE_Q, MAP_PLACES, MAP_LEISURE, MAP_ROUTES, MAP_TABS, ROUTE_PLANS, MIND, MIND_GRAD, MIND_CAT, MIND_IMG, MIND_CAT_IMG, CAPSULES, RECIPES, LANG_VOCAB, FEED_IDEAS, FEED_BG } from "./appdata.js";


const LINE_ICN = {
  sparkle:"<path d='M60 24 C63 40 66 43 80 45 C66 47 63 50 60 66 C57 50 54 47 40 45 C54 43 57 40 60 24 Z'/>",
  leaf:"<path d='M60 24 C78 30 80 54 60 68 C40 54 42 30 60 24 Z'/><path d='M60 30 L60 62'/>",
  flower:"<circle cx='60' cy='32' r='7'/><circle cx='73' cy='42' r='7'/><circle cx='68' cy='57' r='7'/><circle cx='52' cy='57' r='7'/><circle cx='47' cy='42' r='7'/><circle cx='60' cy='46' r='5'/>",
  sun:"<circle cx='60' cy='45' r='12'/><path d='M60 26 L60 20 M60 70 L60 64 M79 45 L85 45 M35 45 L41 45 M73 32 L78 27 M42 58 L37 63 M73 58 L78 63 M42 32 L37 27'/>",
  wave:"<path d='M40 50 q7 -10 14 0 t14 0 t14 0'/><path d='M40 60 q7 -10 14 0 t14 0 t14 0'/>",
  bloom:"<path d='M60 66 C60 52 50 44 44 40 C50 38 56 42 60 48 C64 42 70 38 76 40 C70 44 60 52 60 66 Z'/>",
  pin:"<path d='M60 24 C50 24 44 32 44 42 C44 56 60 70 60 70 C60 70 76 56 76 42 C76 32 70 24 60 24 Z'/><circle cx='60' cy='41' r='6'/>",
  book:"<path d='M60 32 C54 28 44 28 38 30 L38 62 C44 60 54 60 60 64 C66 60 76 60 82 62 L82 30 C76 28 66 28 60 32 Z'/><path d='M60 32 L60 64'/>",
  palette:"<path d='M60 24 C76 24 86 36 84 48 C83 56 74 54 70 58 C66 62 70 68 62 68 C48 68 36 58 36 46 C36 34 46 24 60 24 Z'/><circle cx='52' cy='40' r='2.5'/><circle cx='64' cy='36' r='2.5'/><circle cx='72' cy='44' r='2.5'/>",
  music:"<path d='M52 60 a6 5 0 1 0 0.1 0 Z'/><path d='M52 60 L52 32 L74 26 L74 54'/><path d='M74 54 a6 5 0 1 0 0.1 0 Z'/><path d='M52 40 L74 34'/>",
  lotus:"<path d='M60 64 C50 56 48 44 60 34 C72 44 70 56 60 64 Z'/><path d='M60 64 C48 64 38 56 38 46 C50 46 56 54 60 64 Z'/><path d='M60 64 C72 64 82 56 82 46 C70 46 64 54 60 64 Z'/>",
  plane:"<path d='M40 50 L80 38 L72 54 L56 56 L48 64 L46 56 L40 50 Z'/>",
  cup:"<path d='M44 40 L72 40 L72 52 Q72 64 58 64 Q44 64 44 52 Z'/><path d='M72 44 Q80 44 80 51 Q80 58 72 58'/><path d='M52 30 Q50 34 52 36 M60 30 Q58 34 60 36'/>",
  heart:"<path d='M60 66 C38 52 38 32 53 34 C58 35 60 40 60 43 C60 40 62 35 67 34 C82 32 82 52 60 66 Z'/>",
  camera:"<path d='M40 40 L48 40 L51 34 L69 34 L72 40 L80 40 L80 64 L40 64 Z'/><circle cx='60' cy='50' r='9'/>",
  mountain:"<path d='M36 64 L52 38 L62 54 L70 42 L84 64 Z'/><circle cx='52' cy='34' r='3'/>",
  star:"<path d='M60 26 L66 44 L84 44 L70 55 L75 72 L60 62 L45 72 L50 55 L36 44 L54 44 Z'/>",
  globe:"<circle cx='60' cy='45' r='18'/><path d='M42 45 H78 M60 27 V63 M48 32 Q60 45 48 58 M72 32 Q60 45 72 58'/>",
  palm:"<path d='M60 66 Q58 50 60 38'/><path d='M60 38 Q48 33 41 40 M60 38 Q72 33 79 40 M60 38 Q52 30 43 31 M60 38 Q68 30 77 31'/>",
};
function decoArt(t=0, key){
  const g = PH_GRAD[((t%6)+6)%6];
  const ic = LINE_ICN[key] || LINE_ICN[DECO_DEFAULT[((t%6)+6)%6]];
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='dg' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='"+g[0]+"'/><stop offset='1' stop-color='"+g[1]+"'/></linearGradient></defs><rect width='120' height='90' fill='url(#dg)'/><circle cx='60' cy='45' r='27' fill='#FFFFFF' opacity='0.16'/><g fill='none' stroke='#FFFFFF' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' opacity='0.95'>"+ic+"</g></svg>";
  return "data:image/svg+xml,"+encodeURIComponent(svg);
}

const head = "'Satoshi','Inter',-apple-system,sans-serif";
const serif = "'Instrument Serif', Georgia, serif";
const body = "'Inter', -apple-system, 'Segoe UI', Roboto, sans-serif";

/* ── Ежедневная ротация: seedToday меняется каждый день; sgRefreshDay() пересчитывает «сегодня» (вызывается при возврате в приложение и в полночь) ── */
const sgDaySeed = () => Math.floor(Date.now()/86400000);
let seedToday = sgDaySeed();
const sgRefreshDay = () => { const d = sgDaySeed(); if (d !== seedToday) { seedToday = d; return true; } return false; };
const pick = (arr, n, salt=0) => { const out=[], L=arr.length; for(let i=0;i<n;i++) out.push(arr[(seedToday+salt+i)%L]); return out; };
const pickOne = (arr, salt=0) => arr[((seedToday+salt)%arr.length+arr.length)%arr.length];
const shuffleDay = (arr, salt=0) => { const a=[...arr], L=a.length; for(let i=L-1;i>0;i--){ const j=(seedToday+salt+i*7)%(i+1); const t=a[i]; a[i]=a[j]; a[j]=t; } return a; };
/* Бережный разбор JSON от ИИ: убирает markdown и вытаскивает {…} даже если модель добавила текст вокруг */
const sgParseJSON = (raw) => {
  if (!raw) return null;
  let s = String(raw).replace(/```json|```/g, "").trim();
  try { return JSON.parse(s); } catch(e){}
  const i = s.indexOf("{"), j = s.lastIndexOf("}");
  if (i >= 0 && j > i) { try { return JSON.parse(s.slice(i, j+1)); } catch(e){} }
  return null;
};
/* Ужимаем фото перед отправкой в ИИ: макс. сторона ~1280px, JPEG ~0.85 — этого
   достаточно, чтобы модель РАЗЛИЧАЛА детали на фото (важно для точного анализа),
   и при этом не упираемся в лимит тела запроса (~4.5 МБ на Vercel).
   При любой осечке возвращаем исходный блок без изменений. */
async function sgShrinkBlock(block){
  try{
    if(!block || block.type!=="image" || !block.source || block.source.type!=="base64" || !block.source.data) return block;
    if(typeof document==="undefined" || typeof Image==="undefined") return block;
    const mt = block.source.media_type || "image/jpeg";
    const img = await new Promise((res,rej)=>{ const im=new Image(); im.onload=()=>res(im); im.onerror=rej; im.src="data:"+mt+";base64,"+block.source.data; });
    const MAX=1100, w=img.naturalWidth||img.width, h=img.naturalHeight||img.height;
    if(!w || !h) return block;
    if(Math.max(w,h)<=MAX && block.source.data.length<400000) return block; // уже небольшое — не трогаем
    const s=Math.min(1, MAX/Math.max(w,h)), cw=Math.max(1,Math.round(w*s)), chh=Math.max(1,Math.round(h*s));
    const cv=document.createElement("canvas"); cv.width=cw; cv.height=chh;
    cv.getContext("2d").drawImage(img,0,0,cw,chh);
    const out=(cv.toDataURL("image/jpeg",0.85).split(",")[1])||"";
    return out ? { type:"image", source:{ type:"base64", media_type:"image/jpeg", data:out } } : block;
  }catch(e){ return block; }
}
/* ── Зрение: универсальная отправка фото в ИИ ────────────────────────────────
   Разные прокси принимают картинки по-разному. Пробуем форматы по очереди:
     1) Anthropic  — content-блоки {type:"image", source:{type:"base64"}}
     2) OpenAI     — {type:"image_url", image_url:{url:"data:image/jpeg;base64,…"}}
   Рабочий формат запоминаем, чтобы в следующий раз начинать сразу с него.
   Возвращаем { txt, via, reason }. txt="" означает, что фото не дошли. ── */
const SG_VIA_KEY = "sg_vision_via";
const sgDataURI = (b)=> "data:"+(b.source.media_type||"image/jpeg")+";base64,"+b.source.data;

async function sgVisionAsk({ sys, shots, task, maxTokens }){
  const bodies = {
    anthropic: ()=>({ model:"claude-sonnet-4-6", max_tokens:maxTokens, system:sys,
      messages:[{ role:"user", content:[
        ...shots.flatMap((b,i)=>[{ type:"text", text:"Фото "+(i+1)+":" }, b]),
        { type:"text", text:task },
      ]}] }),
    openai: ()=>({ model:"claude-sonnet-4-6", max_tokens:maxTokens,
      messages:[{ role:"system", content:sys }, { role:"user", content:[
        ...shots.flatMap((b,i)=>[{ type:"text", text:"Фото "+(i+1)+":" }, { type:"image_url", image_url:{ url:sgDataURI(b) } }]),
        { type:"text", text:task },
      ]}] }),
  };
  const readTxt = (data)=>{
    if (Array.isArray(data.content)) return data.content.filter(b=>b&&b.type==="text").map(b=>b.text).join("").trim();
    const m = data.choices && data.choices[0] && data.choices[0].message;
    if (m) return typeof m.content==="string" ? m.content.trim()
      : (Array.isArray(m.content) ? m.content.map(c=>c.text||"").join("").trim() : "");
    if (typeof data.text==="string") return data.text.trim();
    return "";
  };
  const known = (typeof localStorage!=="undefined" && localStorage.getItem(SG_VIA_KEY)) || "";
  const order = known && bodies[known] ? [known, ...Object.keys(bodies).filter(k=>k!==known)] : Object.keys(bodies);
  let reason = "";
  for (const via of order){
    try{
      const r = await fetch(AI_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(bodies[via]()) });
      if (!r.ok){ reason = via+": сервер ответил "+r.status+" "+(await r.text().catch(()=>"" )).slice(0,110); continue; }
      const data = await r.json();
      const txt = readTxt(data);
      if (!txt){ reason = via+": пустой ответ от модели"; continue; }
      try{ localStorage.setItem(SG_VIA_KEY, via); }catch(e){}
      return { txt, via, reason:"" };
    }catch(e){ reason = via+": "+String((e&&e.message)||e).slice(0,110); }
  }
  return { txt:"", via:"", reason: reason || "ни один формат отправки фото не принят" };
}

/* Быстрая проверка зрения: показываем модели одну картинку и спрашиваем, что на ней.
   Если ответ не содержит ожидаемого слова — фото до модели не доходят. */
async function sgVisionSelfTest(shot){
  const r = await sgVisionAsk({ sys:"Ты отвечаешь одним словом.", shots:[shot],
    task:"Ответь одним словом по-русски: что главное изображено на этом фото?", maxTokens:20 });
  return r;
}

/* Чистим текст от ИИ: убираем markdown-разметку (** __ # > и маркеры списков), чтобы нигде не торчали «звёздочки» */
const stripMd = (raw) => {
  if (raw == null) return raw;
  return String(raw)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/`{1,3}/g, "")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s+/gm, "")
    .replace(/^\s{0,3}[-•]\s+/gm, "— ")
    .replace(/\*\*/g, "")
    .replace(/__/g, "");
};


const playlistsFor = (chId) => PL_BY_CH[chId] || PLAYLISTS;
const todayFor = (chId) => TODAY_BY_CH[chId] || TODAY_POOL;
const stepFor = (chId) => STEP_BY_CH[chId] || STEP_POOL;
const leisureFor = (chId) => LEISURE_BY_CH[chId] || LEISURE;
const nicheFor = (chId) => NICHE_BY_CH[chId] || NICHE_BY_CH.summer;
const inspoFor = () => shuffleDay(INSPO, 4);
const dreamFor = (chId) => DREAM_BY_CH[chId] || DREAM_BY_CH.summer;
const travelFor = (chId) => TRAVEL_BY_CH[chId] || TRAVEL;
const _CITY_ICN = {
  eiffel: "<path d='M60 23 L53 64 M60 23 L67 64'/><line x1='56.5' y1='40' x2='63.5' y2='40'/><line x1='54.5' y1='52' x2='65.5' y2='52'/><path d='M55.5 64 Q60 56 64.5 64'/><line x1='50' y1='64' x2='70' y2='64'/><line x1='59.4' y1='19' x2='60.6' y2='19'/>",
  colosseum: "<path d='M44 62 L44 46 Q44 41 49 41 L71 41 Q76 41 76 46 L76 62'/><line x1='42' y1='62' x2='78' y2='62'/><line x1='50' y1='62' x2='50' y2='48'/><line x1='58' y1='62' x2='58' y2='48'/><line x1='62' y1='62' x2='62' y2='48'/><line x1='70' y1='62' x2='70' y2='48'/><line x1='48' y1='48' x2='72' y2='48'/>",
  mosque: "<rect x='52' y='46' width='16' height='16'/><path d='M52 46 Q60 32 68 46'/><line x1='60' y1='26' x2='60' y2='32'/><circle cx='60' cy='24' r='2'/><line x1='46' y1='44' x2='46' y2='62'/><line x1='74' y1='44' x2='74' y2='62'/><path d='M44 44 L46 39 L48 44 M72 44 L74 39 L76 44'/>",
  domes: "<path d='M42 62 L42 53 M50 62 L50 53'/><path d='M42 53 Q42 44 46 41 Q50 44 50 53'/><path d='M55 62 L55 50 M65 62 L65 50'/><path d='M55 50 Q55 38 60 34 Q65 38 65 50'/><path d='M70 62 L70 54 M78 62 L78 54'/><path d='M70 54 Q70 46 74 43 Q78 46 78 54'/><line x1='46' y1='41' x2='46' y2='37'/><line x1='60' y1='34' x2='60' y2='29'/><line x1='74' y1='43' x2='74' y2='39'/>",
  tram: "<rect x='46' y='38' width='28' height='18' rx='3'/><line x1='46' y1='44' x2='74' y2='44'/><line x1='55' y1='38' x2='55' y2='44'/><line x1='65' y1='38' x2='65' y2='44'/><line x1='51' y1='49' x2='55' y2='49'/><circle cx='53' cy='59' r='2.5'/><circle cx='67' cy='59' r='2.5'/><line x1='60' y1='38' x2='60' y2='32'/>",
  palm: "<path d='M60 62 Q58 48 60 33'/><path d='M60 33 Q48 28 41 35 M60 33 Q72 28 79 35 M60 33 Q52 23 43 24 M60 33 Q68 23 77 24'/><circle cx='60' cy='32' r='1.6'/>",
  sail: "<path d='M60 28 L60 53 L74 53 Z'/><path d='M58 28 L58 53'/><path d='M46 57 Q60 62 74 57'/><line x1='52' y1='53' x2='68' y2='53'/>",
  lavender: "<line x1='60' y1='62' x2='60' y2='40'/><circle cx='60' cy='37' r='2'/><circle cx='56' cy='43' r='2'/><circle cx='64' cy='43' r='2'/><circle cx='57' cy='50' r='2'/><circle cx='63' cy='50' r='2'/><path d='M60 56 Q54 54 52 49 M60 56 Q66 54 68 49'/>",
  tower: "<rect x='53' y='40' width='14' height='22'/><path d='M51 40 L51 36 L53 36 L53 38 L55 38 L55 36 L57 36 L57 38 L59 38 L59 36 L61 36 L61 38 L63 38 L63 36 L65 36 L65 38 L67 38 L67 36 L69 36 L69 40'/><line x1='49' y1='62' x2='71' y2='62'/><rect x='58' y='52' width='4' height='10'/>",
  cathedral: "<rect x='50' y='42' width='20' height='20'/><path d='M53 42 L60 25 L67 42'/><line x1='60' y1='25' x2='60' y2='20'/><path d='M56 62 L56 53 Q58 50 60 53 L60 62 M64 62 L64 53 Q66 50 68 53 L68 62'/><line x1='48' y1='62' x2='72' y2='62'/>",
  skyline: "<path d='M44 60 L44 48 L52 48 L52 40 L60 40 L60 50 L68 50 L68 44 L76 44 L76 60'/><line x1='42' y1='60' x2='78' y2='60'/>",
  duomo: "<path d='M48 60 L48 50 Q60 36 72 50 L72 60'/><line x1='60' y1='36' x2='60' y2='30'/><circle cx='60' cy='29' r='1.8'/><line x1='46' y1='60' x2='74' y2='60'/><line x1='53' y1='60' x2='53' y2='50'/><line x1='60' y1='60' x2='60' y2='47'/><line x1='67' y1='60' x2='67' y2='50'/>",
  bridge: "<path d='M42 55 Q60 38 78 55'/><line x1='42' y1='55' x2='42' y2='62'/><line x1='78' y1='55' x2='78' y2='62'/><line x1='60' y1='44' x2='60' y2='55'/><path d='M40 64 q4 -3 8 0 t8 0 t8 0 t8 0 t8 0'/>",
  sagrada: "<path d='M50 62 L50 41 Q50 33 53 33 Q56 33 56 41 L56 62'/><path d='M60 62 L60 34 Q60 24 63 24 Q66 24 66 34 L66 62'/><path d='M70 62 L70 43 Q70 35 72 35 Q74 35 74 43 L74 62'/><line x1='47' y1='62' x2='76' y2='62'/>",
  parthenon:"<path d='M46 41 L60 31 L74 41'/><line x1='44' y1='44' x2='76' y2='44'/><path d='M49 44 L49 61 M55 44 L55 61 M61 44 L61 61 M67 44 L67 61 M72 44 L72 61'/><line x1='45' y1='61' x2='75' y2='61'/>",
  statue:"<circle cx='59' cy='29' r='3.5'/><path d='M55 31 L51 22'/><circle cx='50.5' cy='20' r='1.8'/><path d='M56 32 L55 51 L64 51 L62 32'/><path d='M59 24.5 L58 20 M60 24 L60 19 M61 24.5 L62 20'/><path d='M54 51 L51 64 L69 64 L66 51'/><line x1='49' y1='64' x2='71' y2='64'/>",
  ferris:"<circle cx='60' cy='39' r='17'/><circle cx='60' cy='39' r='2.4'/><line x1='60' y1='22' x2='60' y2='56'/><line x1='43' y1='39' x2='77' y2='39'/><line x1='48' y1='27' x2='72' y2='51'/><line x1='72' y1='27' x2='48' y2='51'/><path d='M53 55 L60 64 L67 55'/><line x1='50' y1='64' x2='70' y2='64'/>",
  opera:"<path d='M44 60 Q47 41 55 60 M51 60 Q56 35 64 60 M60 60 Q66 43 75 60'/><path d='M42 60 Q60 66 78 60'/>",
  burj:"<path d='M60 19 L56 64 L64 64 Z'/><line x1='60' y1='19' x2='60' y2='13'/><line x1='52.5' y1='52' x2='67.5' y2='52'/><line x1='54.5' y1='43' x2='65.5' y2='43'/><line x1='56.5' y1='34' x2='63.5' y2='34'/><line x1='50' y1='64' x2='70' y2='64'/>",
  houses:"<path d='M44 62 L44 46 L50 40 L56 46 L56 62'/><path d='M56 62 L56 42 L62 36 L68 42 L68 62'/><path d='M68 62 L68 48 L73.5 43 L79 48 L79 62'/><line x1='42' y1='62' x2='81' y2='62'/><rect x='47' y='50' width='4' height='5'/><rect x='59.5' y='46' width='4' height='5'/>",
  tokyo:"<path d='M60 20 L53 64 M60 20 L67 64'/><line x1='55' y1='44' x2='65' y2='44'/><line x1='51.5' y1='58' x2='68.5' y2='58'/><rect x='57' y='30' width='6' height='8'/><line x1='49' y1='64' x2='71' y2='64'/><line x1='60' y1='20' x2='60' y2='15'/>"
};
const cityStock = (name="") => {
  const c = String(name).split(",")[0].trim().toLowerCase();
  const CITY_PHOTO = { "прованс":IMG.lavenderField, "париж":IMG.paris, "ницца":IMG.nice, "амальфи":IMG.amalfi, "санторини":IMG.santorini, "лиссабон":IMG.lisbon, "порту":IMG.porto, "севилья":IMG.seville, "рим":IMG.rome, "венеция":IMG.venice, "афины":IMG.athens, "стамбул":IMG.istanbul, "казань":IMG.kazan, "баку":IMG.marbling, "сочи":IMG.sochi, "дубай":IMG.dubai, "токио":IMG.teapot, "вена":IMG.vienna, "амстердам":IMG.amsterdam, "копенгаген":IMG.copenhagen, "прага":IMG.prague, "барселона":IMG.barcelona, "флоренция":IMG.florence, "неаполь":IMG.naples, "милан":IMG.milan, "гранада":IMG.granada, "мадрид":IMG.madrid, "сан-себастьян":IMG.sanSebastian, "сан себастьян":IMG.sanSebastian, "тбилиси":IMG.tbilisi, "ереван":IMG.yerevan, "батуми":IMG.batumi, "будапешт":IMG.budapest, "лондон":IMG.london, "берлин":IMG.berlin, "санкт-петербург":IMG.saintPetersburg, "москва":IMG.moscow, "калининград":IMG.kaliningrad, "суздаль":IMG.suzdal, "нижний новгород":IMG.nizhnyNovgorod, "выборг":IMG.vyborg, "псков":IMG.pskov, "анталия":IMG.antalya, "анталья":IMG.antalya, "бодрум":IMG.bodrum, "измир":IMG.izmir, "фетхие":IMG.fethiye, "каш":IMG.kas, "алания":IMG.alanya, "аланья":IMG.alanya, "мармарис":IMG.marmaris, "каппадокия":IMG.cappadocia, "памуккале":IMG.pamukkale, "каир":IMG.cairo, "хургада":IMG.hurghada, "шарм-эль-шейх":IMG.sharmElSheikh, "шарм":IMG.sharmElSheikh, "луксор":IMG.luxor, "дахаб":IMG.dahab, "абу-даби":IMG.abuDhabi, "шарджа":IMG.sharjah, "рас-эль-хайма":IMG.rasAlKhaimah, "маскат":IMG.muscat, "бангкок":IMG.bangkok, "пхукет":IMG.phuket, "краби":IMG.krabi, "чиангмай":IMG.chiangMai, "чианг-май":IMG.chiangMai, "самуи":IMG.kohSamui, "паттайя":IMG.pattaya, "ханой":IMG.hanoi, "хошимин":IMG.hoChiMinhCity, "дананг":IMG.daNang, "хойан":IMG.hoiAn, "нячанг":IMG.nhaTrang, "фукуок":IMG.phuQuoc, "пекин":IMG.beijing, "шанхай":IMG.shanghai, "санья":IMG.sanya, "сиань":IMG.xian, "гонконг":IMG.hongKong, "гуанчжоу":IMG.guangzhou, "гоа":IMG.goa, "джайпур":IMG.jaipur, "дели":IMG.delhi, "агра":IMG.agra, "удайпур":IMG.udaipur, "убуд":IMG.ubud, "бали":IMG.ubud, "семиньяк":IMG.seminyak, "джакарта":IMG.jakarta, "коломбо":IMG.colombo, "галле":IMG.galle, "канди":IMG.kandy, "мале":IMG.male, "мальдивы":IMG.male, "брюгге":IMG.bruges, "краков":IMG.krakow, "стокгольм":IMG.stockholm, "осло":IMG.oslo, "берген":IMG.bergen, "хельсинки":IMG.helsinki, "рейкьявик":IMG.reykjavik, "лофотены":IMG.lofoten, "таллин":IMG.tallinn, "рига":IMG.riga, "вильнюс":IMG.vilnius, "дубровник":IMG.dubrovnik, "сплит":IMG.split, "любляна":IMG.ljubljana, "блед":IMG.bled, "котор":IMG.kotor, "торсхавн":IMG.torshavn, "владивосток":IMG.vladivostok, "мурманск":IMG.murmansk, "петропавловск-камчатский":IMG.petropavlovskkamchatsky, "камчатка":IMG.petropavlovskkamchatsky, "байкал":IMG.listvyanka, "листвянка":IMG.listvyanka, "алтай":IMG.gornoaltaysk, "горно-алтайск":IMG.gornoaltaysk, "геленджик":IMG.gelendzhik, "ялта":IMG.yalta, "ярославль":IMG.yaroslavl, "великий новгород":IMG.velikyNovgorod, "петрозаводск":IMG.petrozavodsk, "дербент":IMG.derbent, "владимир":IMG.vladimir };
  if (CITY_PHOTO[c]) return CITY_PHOTO[c];
  return IMG.planeWingSunset;
  const h = [...c].reduce((a,ch)=>a+ch.charCodeAt(0),0);
  const t = CITY_TYPE[c];
  const PHOTO_BY_ICON = { eiffel:IMG.parisChampagne, tower:IMG.parisNook, colosseum:IMG.espressoStone, sagrada:IMG.azulejos, cathedral:IMG.azulejos, houses:IMG.bouquetTable, ferris:IMG.parisCafe, parthenon:IMG.greekTable, statue:IMG.sunsetSky, tokyo:IMG.teapot, mosque:IMG.marbling, burj:IMG.sunsetSky, palm:IMG.beachUmbrella, opera:IMG.sunsetSilhouette, domes:IMG.greekSunset, sail:IMG.boatSunset, tram:IMG.azulejos, lavender:IMG.lavenderField, bridge:IMG.boatSunset, skyline:IMG.sunsetSky };
  if (t && PHOTO_BY_ICON[t]) return PHOTO_BY_ICON[t];
  const TP = [IMG.sunsetSky, IMG.greekSunset, IMG.boatSunset, IMG.parisCafe, IMG.azulejos, IMG.lavenderField, IMG.pebbleBeachSunset, IMG.curtainSea, IMG.brandSkyClouds, IMG.planeWingSunset, IMG.hydrangeaGarden, IMG.forestLightBeam, IMG.mistySunrisePath, IMG.cyclingCoastalSunset, IMG.greekTable, IMG.espressoStone, IMG.bouquetTable, IMG.sunsetSilhouette, IMG.calmSea, IMG.oceanGlass, IMG.parisBalcony, IMG.seaPicnicTable];
  return TP[h % TP.length];
  const g = _CITY_GRAD[h % 6];
  const icon = _CITY_ICN[t] || _CITY_ICN.skyline;
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='"+g[0]+"'/><stop offset='1' stop-color='"+g[1]+"'/></linearGradient></defs><rect width='120' height='90' fill='url(#g)'/><circle cx='60' cy='45' r='29' fill='#FFFFFF' opacity='0.18'/><g fill='none' stroke='#FFFFFF' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' opacity='0.95'>"+icon+"</g></svg>";
  return "data:image/svg+xml," + encodeURIComponent(svg);
};


// ── ROMANCE (Romantic Bloom) — полное наполнение главы ────────────
// ── COASTAL (Coastal Living) — полное наполнение главы ────────────

// ── SLOW (Slow Living) — полное наполнение главы ──────────────────
const rubricsFor = (chId) => ({ ...RUBRICS, ...(RUBRICS_BY_CH[chId] || {}) });

// ── STYLIST per chapter (капсула + луки под каждую эстетику) ──────
const stylistFor = (chId) => STYLIST_BY_CH[chId] || STYLIST_BY_CH.summer;


async function wikiImg(query, lang = "ru") {
  if (!query) return null;
  const key = lang + ":" + query;
  if (_wikiCache[key] !== undefined) return _wikiCache[key];
  try {
    const r = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`, { headers: { Accept: "application/json" } });
    if (!r.ok) { _wikiCache[key] = null; return lang !== "en" ? wikiImg(query, "en") : null; }
    const d = await r.json();
    let src = (d.originalimage && d.originalimage.source) || (d.thumbnail && d.thumbnail.source) || null;
    // отсекаем неэстетичные результаты: страницы-уточнения и SVG-карты/флаги/гербы/логотипы
    const bad = d.type === "disambiguation" || (src && /\.svg($|\?)/i.test(src)) || (src && /(Flag|Coat_of_arms|Logo|Location_map|locator)/i.test(src));
    if (bad) src = null;
    if (!src) { _wikiCache[key] = null; return lang !== "en" ? wikiImg(query, "en") : null; }
    _wikiCache[key] = src;
    return src;
  } catch (e) { _wikiCache[key] = null; return lang !== "en" ? wikiImg(query, "en") : null; }
}
// Уменьшает и сжимает выбранное пользователем фото перед сохранением:
// большие снимки с телефона (3–8 МБ) превращаются в лёгкий JPEG (~100–250 КБ),
// который помещается в хранилище и быстро грузится. Без этого большое фото
// переполняет localStorage и место/момент не сохраняется.
function shrinkImage(file, maxDim, quality){
  return new Promise((resolve)=>{
    const fallback = ()=>{ try{ const fr=new FileReader(); fr.onload=()=>resolve(String(fr.result||"")); fr.onerror=()=>resolve(""); fr.readAsDataURL(file); }catch(_){ resolve(""); } };
    try{
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = ()=>{
        try{
          let w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
          if (!w || !h){ try{ URL.revokeObjectURL(url); }catch(_){} return fallback(); }
          const m = maxDim || 1280;
          if (w > m || h > m){ const s = m/Math.max(w,h); w = Math.round(w*s); h = Math.round(h*s); }
          const c = document.createElement("canvas"); c.width = w; c.height = h;
          c.getContext("2d").drawImage(img, 0, 0, w, h);
          const out = c.toDataURL("image/jpeg", quality || 0.82);
          try{ URL.revokeObjectURL(url); }catch(_){}
          resolve(out && out.length > 24 ? out : ""); 
        }catch(err){ try{ URL.revokeObjectURL(url); }catch(_){} fallback(); }
      };
      img.onerror = ()=>{ try{ URL.revokeObjectURL(url); }catch(_){} fallback(); };
      img.src = url;
    }catch(err){ fallback(); }
  });
}

function Photo({ t = 0, url, q, qlang, h, radius = 14, fb, style, children, icon }) {
  const [src, setSrc] = useState(url || fb || null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    // Показываем назначенное фото (url) или запасное (fb).
    // Если фото нет ИЛИ оно не загрузилось — рисуем фирменную плашку-градиент decoArt.
    // Так нигде не остаётся пустых белых/бежевых рамок.
    setSrc(url || fb || null);
    setFailed(false);
  }, [url, fb]);
  const showDeco = !src || failed;
  return (
    <div style={{ position:"relative", height:h, borderRadius:radius, overflow:"hidden",
      background:PH[((t%PH.length)+PH.length)%PH.length], boxShadow:"0 14px 30px -22px rgba(26,26,26,0.4)", ...style }}>
      {!showDeco ?
        <img src={src} alt="" className="fade" loading="lazy" decoding="async" onError={()=>{ if (fb && src !== fb) { setSrc(fb); } else { setFailed(true); } }} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/> :
        <img src={decoArt(t, icon)} alt="" style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>}
      {children}
    </div>
  );
}
function GlowOrb({ partner = C.coral, size = 120, spark = true, style }) {
  return (
    <div style={{ position:"relative", width:size, height:size, ...style }}>
      <div className="orb" style={{ position:"absolute", inset:0, borderRadius:"50%",
        background:`radial-gradient(circle at 42% 38%, ${C.butter} 0%, ${C.butter} 18%, ${partner} 52%, rgba(246,231,166,0) 76%)`, filter:"blur(3px)" }}/>
      {spark && <div className="spark" style={{ position:"absolute", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
        color:"#fff", fontSize:size*0.26, textShadow:"0 0 12px rgba(255,255,255,0.9)", lineHeight:1 }}>✦</div>}
    </div>
  );
}
function HaloOrb({ partner = C.coral, size = 120, spark = true, strong = false, style }) {
  return (
    <div style={{ position:"relative", width:size, height:size, ...style }}>
      <div className="grad-spin" style={{ position:"absolute", inset:-Math.round(size*0.18), borderRadius:"50%", background:`conic-gradient(from 0deg, ${C.butter}, ${partner}, ${C.pink}, ${partner}, ${C.butter})`, filter:`blur(${Math.round(size*0.13)}px)`, opacity:strong?0.7:0.5 }}/>
      <div className={strong?"load-pulse":""} style={{ position:"absolute", inset:0 }}><GlowOrb partner={partner} size={size} spark={spark}/></div>
    </div>
  );
}
const Label = ({ children, color }) => (
  <div style={{ fontFamily:head, fontSize:11, letterSpacing:"0.22em", textTransform:"uppercase", color:color||"#9A958C", fontWeight:500 }}>{children}</div>
);
function Loader({ partner, text="Slow Glow подбирает для тебя" }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"30px 16px", gap:14 }}>
      <div className="ai-pulse"><GlowOrb partner={partner} size={50}/></div>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span className="sg-shimmer" style={{ fontFamily:serif, fontStyle:"italic", fontSize:15.5 }}>{text}</span>
        <span style={{ display:"inline-flex", gap:3 }}>
          <span className="sg-d1" style={{ width:4, height:4, borderRadius:99, background:partner }}/>
          <span className="sg-d2" style={{ width:4, height:4, borderRadius:99, background:partner }}/>
          <span className="sg-d3" style={{ width:4, height:4, borderRadius:99, background:partner }}/>
        </span>
      </div>
    </div>
  );
}
const Divider = ({ partner, mt=22, mb=22 }) => (
  <div aria-hidden="true" style={{ display:"flex", alignItems:"center", gap:12, margin:`${mt}px 0 ${mb}px` }}>
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg, transparent, ${C.line})` }}/>
    <span style={{ color:partner||"#A39E93", fontSize:11, letterSpacing:"0.3em" }}>✦</span>
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg, ${C.line}, transparent)` }}/>
  </div>
);
// decorative serif pull-quote in brand style
const PullQuote = ({ children }) => (
  <div style={{ position:"relative", padding:"4px 0 4px 18px", margin:"4px 0" }}>
    <div style={{ position:"absolute", left:0, top:2, bottom:2, width:2, borderRadius:99, background:"linear-gradient(180deg, #F6E7A6, #D7DEC9)" }}/>
    <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, lineHeight:1.4, color:C.ink, margin:0 }}>{children}</p>
  </div>
);

// ── branded line icons (soft-luxury, hand-drawn feel) ─────────────
const BrandIcon = ({ name, size=20, color, stroke=1.4 }) => {
  const c = color || C.ink;
  const P = {
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M18.5 5.5L17 7M7 17l-1.5 1.5"/></>,
    flower: <><circle cx="12" cy="12" r="2"/><path d="M12 10c0-2.5-1-4-1.8-4S8 7 9 9M14 12c2.5 0 4-1 4-1.8S17 8 15 9M12 14c0 2.5 1 4 1.8 4s1.2-1.5.2-3.5M10 12c-2.5 0-4 1-4 1.8s1 1.2 3 .2"/></>,
    book: <><path d="M12 6.5C10.5 5.3 8.5 5 6.5 5.2 5.6 5.3 5 6 5 6.9v9.8c0 .6.6 1 1.2.9 1.9-.2 3.8 0 5.3 1.1M12 6.5c1.5-1.2 3.5-1.5 5.5-1.3.9.1 1.5.8 1.5 1.7v9.8c0 .6-.6 1-1.2.9-1.9-.2-3.8 0-5.3 1.1M12 6.5v12.2"/></>,
    wave: <><path d="M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></>,
    pin: <><path d="M12 21c4-4.5 6-7.6 6-10.5A6 6 0 1 0 6 10.5C6 13.4 8 16.5 12 21Z"/><circle cx="12" cy="10.3" r="2.2"/></>,
    leaf: <><path d="M5 19c0-7 5-13 14-14 .5 6-3.5 13-10 13-2 0-4-1-4 1"/><path d="M9 15c2-3 5-5.5 8-7"/></>,
    candle: <><path d="M9 11h6v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"/><path d="M12 11V8M12 8c0-1.4-1.2-2-1.2-3.2C10.8 3.6 11.4 3 12 3s1.2.6 1.2 1.8C13.2 6 12 6.6 12 8z"/></>,
    cup: <><path d="M6 8h11v5a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z"/><path d="M17 9h1.5a2 2 0 0 1 0 4H17"/><path d="M9 3c-.5 1 .5 1.5 0 2.5M12.5 3c-.5 1 .5 1.5 0 2.5"/></>,
    spark: <path d="M12 3l1.4 6.6L20 11l-6.6 1.4L12 19l-1.4-6.6L4 11l6.6-1.4z"/>,
  }[name] || null;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{P}</svg>;
};

// ── puzzle engine: seeded RNG + crossword + word-search ───────────
const sgRng = (seed) => { let a = seed>>>0; return () => { a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; };
const sgStrip = (s) => (s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().replace(/[^A-Z]/g,"");

function buildWordSearch(rawWords, size, seed) {
  const R = sgRng(seed);
  const words = rawWords.map(sgStrip).filter(w=>w.length>=3 && w.length<=size);
  const grid = Array.from({length:size},()=>Array(size).fill(""));
  const dirs = [[0,1],[1,0],[1,1],[1,-1],[0,-1],[-1,0],[-1,-1],[-1,1]];
  const placed = [];
  for (const w of words) {
    let done=false;
    for (let tries=0; tries<240 && !done; tries++) {
      const d = dirs[Math.floor(R()*dirs.length)];
      const r0 = Math.floor(R()*size), c0 = Math.floor(R()*size);
      const rE = r0+d[0]*(w.length-1), cE = c0+d[1]*(w.length-1);
      if (rE<0||rE>=size||cE<0||cE>=size) continue;
      let ok=true;
      for (let k=0;k<w.length;k++){ const cur=grid[r0+d[0]*k][c0+d[1]*k]; if(cur && cur!==w[k]){ ok=false; break; } }
      if(!ok) continue;
      for (let k=0;k<w.length;k++){ grid[r0+d[0]*k][c0+d[1]*k]=w[k]; }
      placed.push(w); done=true;
    }
  }
  const AZ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r=0;r<size;r++) for (let c=0;c<size;c++) if(!grid[r][c]) grid[r][c]=AZ[Math.floor(R()*26)];
  return { grid, words:placed };
}

function buildCrossword(pairs, seed) {
  const items = pairs.map(p=>({ w:sgStrip(p[0]), clue:p[1] })).filter(x=>x.w.length>=3 && x.w.length<=9);
  if (!items.length) return null;
  items.sort((a,b)=>b.w.length-a.w.length);
  const cells = {};
  const entries = [];
  const key=(r,c)=>r+","+c;
  const place=(w,r,c,dir)=>{ for(let k=0;k<w.length;k++){ const rr=r+(dir==="D"?k:0), cc=c+(dir==="A"?k:0); cells[key(rr,cc)]=w[k]; } };
  const fits=(w,r,c,dir)=>{
    const bR=r-(dir==="D"?1:0), bC=c-(dir==="A"?1:0);
    if(cells[key(bR,bC)]) return false;
    const aR=r+(dir==="D"?w.length:0), aC=c+(dir==="A"?w.length:0);
    if(cells[key(aR,aC)]) return false;
    let hit=false;
    for(let k=0;k<w.length;k++){
      const rr=r+(dir==="D"?k:0), cc=c+(dir==="A"?k:0);
      const e=cells[key(rr,cc)];
      if(e){ if(e!==w[k]) return false; hit=true; }
      else {
        if(dir==="A"){ if(cells[key(rr-1,cc)]||cells[key(rr+1,cc)]) return false; }
        else { if(cells[key(rr,cc-1)]||cells[key(rr,cc+1)]) return false; }
      }
    }
    return hit;
  };
  place(items[0].w,0,0,"A"); entries.push({ ...items[0], r:0, c:0, dir:"A" });
  for (let i=1;i<items.length;i++){
    const it=items[i]; let done=false;
    for (const e of entries){
      for (let a=0;a<e.w.length && !done;a++){
        for (let b=0;b<it.w.length && !done;b++){
          if (e.w[a]===it.w[b]){
            const er=e.r+(e.dir==="D"?a:0), ec=e.c+(e.dir==="A"?a:0);
            const dir = e.dir==="A"?"D":"A";
            const r0 = dir==="D"? er-b : er;
            const c0 = dir==="A"? ec-b : ec;
            if (fits(it.w,r0,c0,dir)){ place(it.w,r0,c0,dir); entries.push({ ...it, r:r0, c:c0, dir }); done=true; }
          }
        }
      }
      if(done) break;
    }
  }
  if (entries.length<2) return null;
  const rs=Object.keys(cells).map(k=>+k.split(",")[0]);
  const cs=Object.keys(cells).map(k=>+k.split(",")[1]);
  const minR=Math.min(...rs), minC=Math.min(...cs), maxR=Math.max(...rs), maxC=Math.max(...cs);
  const H=maxR-minR+1, W=maxC-minC+1;
  const grid=Array.from({length:H},()=>Array(W).fill(null));
  for (const k in cells){ const [r,c]=k.split(",").map(Number); grid[r-minR][c-minC]=cells[k]; }
  entries.forEach(e=>{ e.gr=e.r-minR; e.gc=e.c-minC; });
  let num=0; const numAt={};
  [...entries].sort((a,b)=> a.gr-b.gr || a.gc-b.gc).forEach(e=>{ const kk=e.gr+","+e.gc; if(!(kk in numAt)) numAt[kk]=++num; e.num=numAt[kk]; });
  const across=entries.filter(e=>e.dir==="A").sort((a,b)=>a.num-b.num);
  const down=entries.filter(e=>e.dir==="D").sort((a,b)=>a.num-b.num);
  return { grid, H, W, numAt, across, down };
}

function WordSearchPuzzle({ pairs, seed, partner }) {
  const size = 11;
  const words = pairs.map(p=>p[0]);
  const data = React.useMemo(()=>buildWordSearch(words, size, seed), [seed, words.join("|")]);
  const trans = React.useMemo(()=>{ const m={}; pairs.forEach(p=>{ m[sgStrip(p[0])] = { display:p[0], ru:p[1] }; }); return m; }, [pairs.map(p=>p[0]+p[1]).join("|")]);
  const [path, setPath] = useState([]);
  const [foundCells, setFoundCells] = useState({});
  const [foundSet, setFoundSet] = useState({});
  const [pop, setPop] = useState(null);
  const dragging = useRef(false);
  const anchor = useRef(null);
  const pathRef = useRef([]);
  pathRef.current = path;

  const cellAt = (x,y) => { const el = document.elementFromPoint(x,y); if(!el||!el.getAttribute) return null; const r=el.getAttribute("data-r"), c=el.getAttribute("data-c"); if(r==null||c==null) return null; return [parseInt(r,10),parseInt(c,10)]; };
  const lineCells = (a,b) => { const dr=b[0]-a[0], dc=b[1]-a[1], adr=Math.abs(dr), adc=Math.abs(dc); if(!(dr===0||dc===0||adr===adc)) return null; const steps=Math.max(adr,adc), sr=Math.sign(dr), sc=Math.sign(dc), cells=[]; for(let k=0;k<=steps;k++) cells.push([a[0]+sr*k,a[1]+sc*k]); return cells; };
  const begin = (x,y,e) => { const cur=cellAt(x,y); if(!cur) return; if(e&&e.currentTarget&&e.pointerId!=null){ try{ e.currentTarget.setPointerCapture(e.pointerId); }catch(_){} } dragging.current=true; anchor.current=cur; setPath([cur]); };
  const moveTo = (x,y) => { if(!dragging.current||!anchor.current) return; const cur=cellAt(x,y); if(!cur) return; const cells=lineCells(anchor.current,cur); if(cells) setPath(cells); };
  const finish = () => {
    if(!dragging.current) return; dragging.current=false; anchor.current=null;
    const p = pathRef.current;
    if(p.length>1){
      const w = p.map(([r,c])=>data.grid[r][c]).join("");
      const rev = w.split("").reverse().join("");
      const match = data.words.find(x=>(x===w||x===rev)&&!foundSet[x]);
      if(match){
        setFoundCells(fc=>{ const n={...fc}; p.forEach(([r,c])=>n[r+","+c]=true); return n; });
        setFoundSet(s=>({...s,[match]:true}));
        const t = trans[match]||{ display:match, ru:"" };
        setPop({ word:t.display, ru:t.ru });
        setTimeout(()=>setPop(null), 2100);
      }
    }
    setPath([]);
  };
  const inPath = (r,c)=>path.some(([pr,pc])=>pr===r&&pc===c);
  const allFound = data.words.length>0 && data.words.every(w=>foundSet[w]);

  return (
    <div>
      <style>{`@keyframes wsPop{0%{transform:scale(.3);opacity:0}45%{transform:scale(1.12);opacity:1}100%{transform:scale(1);opacity:1}}@keyframes wsRing{0%{transform:scale(.4);opacity:.9}100%{transform:scale(1.5);opacity:0}}`}</style>
      <div
        onPointerDown={(e)=>{ e.preventDefault(); begin(e.clientX,e.clientY,e); }}
        onPointerMove={(e)=>{ if(dragging.current){ e.preventDefault(); moveTo(e.clientX,e.clientY); } }}
        onPointerUp={finish} onPointerCancel={finish}
        style={{ position:"relative", display:"inline-block", padding:10, borderRadius:16, background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, touchAction:"none", userSelect:"none", WebkitUserSelect:"none" }}>
        {data.grid.map((row,r)=>(
          <div key={r} style={{ display:"flex" }}>
            {row.map((ch_,c)=>{ const sel=inPath(r,c); const fnd=foundCells[r+","+c]; return (
              <div key={c} data-r={r} data-c={c} style={{ width:27, height:27, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:8, fontFamily:head, fontSize:13.5, color:C.ink, background: sel?`linear-gradient(135deg, ${C.butter}, ${partner})` : (fnd?`linear-gradient(135deg, ${C.sage}, ${partner})`:"transparent"), opacity: (sel||fnd)?1:0.82, transition:"background 90ms, opacity 90ms" }}>{ch_}</div>
            ); })}
          </div>
        ))}
        {pop && (
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
            <div style={{ position:"absolute", width:120, height:120, borderRadius:"50%", border:`2px solid ${partner}`, animation:"wsRing 700ms ease-out forwards" }}/>
            <div style={{ width:130, height:130, borderRadius:"50%", background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${partner})`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", boxShadow:"0 18px 44px -16px rgba(26,26,26,0.55)", animation:"wsPop 420ms cubic-bezier(.2,.8,.2,1)" }}>
              <div style={{ fontFamily:head, fontSize:16, fontWeight:600, color:C.ink, padding:"0 8px" }}>{pop.word}</div>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.ink, marginTop:3, padding:"0 8px" }}>{pop.ru}</div>
            </div>
          </div>
        )}
      </div>
      <p style={{ fontSize:12, color:C.inkFaint, margin:"10px 0 8px" }}>{allFound?"Все слова найдены — браво ✦":"Проводи пальцем по буквам — по горизонтали, вертикали и диагонали."}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {data.words.map(w=>{ const t=trans[w]||{display:w}; const done=foundSet[w]; return (
          <span key={w} style={{ fontFamily:head, fontSize:11.5, letterSpacing:"0.04em", color:done?C.ink:C.inkSoft, background:done?`linear-gradient(135deg, ${C.sage}, ${partner})`:"rgba(255,255,255,0.5)", border:`1px solid ${C.line}`, padding:"5px 10px", borderRadius:99, textDecoration:done?"none":"none", opacity:done?1:0.85 }}>{done?"✓ ":""}{t.display}</span>
        ); })}
      </div>
    </div>
  );
}

function CrosswordPuzzle({ pairs, seed, partner }) {
  const data = React.useMemo(()=>buildCrossword(pairs, seed), [seed, pairs.map(p=>p[0]).join("|")]);
  const [reveal, setReveal] = useState(false);
  if (!data) return null;
  return (
    <div>
      <div style={{ display:"inline-block", padding:10, borderRadius:14, background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, marginBottom:10 }}>
        {data.grid.map((row,r)=>(
          <div key={r} style={{ display:"flex" }}>
            {row.map((ch_,c)=>{
              if(!ch_) return <div key={c} style={{ width:26, height:26 }}/>;
              const n = data.numAt[r+","+c];
              return (
                <div key={c} style={{ position:"relative", width:26, height:26, border:`1px solid ${C.line}`, background:C.cream, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:head, fontSize:13, color:reveal?C.ink:"transparent" }}>
                  {n && <span style={{ position:"absolute", top:1, left:2, fontSize:7.5, color:C.inkFaint }}>{n}</span>}
                  {ch_}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:18, flexWrap:"wrap" }}>
        <div style={{ flex:"1 1 130px" }}>
          <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.1em", color:partner, marginBottom:6 }}>ПО ГОРИЗОНТАЛИ</div>
          {data.across.map(e=><p key={e.num} style={{ fontSize:12.5, color:C.ink, margin:"0 0 5px" }}><b>{e.num}.</b> {e.clue} <span style={{ color:C.inkFaint }}>({e.w.length})</span></p>)}
        </div>
        <div style={{ flex:"1 1 130px" }}>
          <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.1em", color:partner, marginBottom:6 }}>ПО ВЕРТИКАЛИ</div>
          {data.down.map(e=><p key={e.num} style={{ fontSize:12.5, color:C.ink, margin:"0 0 5px" }}><b>{e.num}.</b> {e.clue} <span style={{ color:C.inkFaint }}>({e.w.length})</span></p>)}
        </div>
      </div>
      <button onClick={()=>setReveal(r=>!r)} style={{ marginTop:8, border:`1px solid ${C.line}`, background:"transparent", borderRadius:99, padding:"7px 14px", fontFamily:head, fontSize:11.5, color:C.inkSoft, cursor:"pointer" }}>{reveal?"Скрыть ответы":"Показать ответы"}</button>
    </div>
  );
}

// ── shared detail sheet ───────────────────────────────────────────
function LinkBtn({ label, url }) {
  const video = /youtube|видео|смотреть/i.test(label);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, textDecoration:"none",
      border:`1px solid ${C.ink}`, borderRadius:99, padding:"12px 18px", fontFamily:head, fontSize:13.5, fontWeight:500, color:C.ink, marginBottom:10 }}>
      {video ? <Play size={15} strokeWidth={2}/> : <ExternalLink size={15} strokeWidth={2}/>}{label}
    </a>
  );
}
function DetailView({ item, partner, onClose }) {
  const d = item.d || { lead:item.why||"", s:[], tip:"" };
  const title = item.title || item.v || item.name;
  const kicker = (item.d && item.d.k) || item.kicker || item.k || "";
  return (
    <div className="sheet" style={{ position:"absolute", inset:0, zIndex:9, background:C.cream, display:"flex", flexDirection:"column" }}>
      <div className="sg-scroll" style={{ flex:1, overflowY:"auto" }}>
        <div style={{ position:"relative" }}>
          <Photo t={item.t||0} url={item.heroUrl||item.url} h={220} radius={0}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(26,26,26,0.12) 0%, transparent 32%, rgba(26,26,26,0.5) 100%)" }}/>
          </Photo>
          <button onClick={onClose} aria-label="Закрыть" style={{ position:"absolute", top:18, right:18, border:"none", background:"rgba(250,248,241,0.9)", borderRadius:99, width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.ink }}><X size={18} strokeWidth={2}/></button>
          <div style={{ position:"absolute", left:24, right:24, bottom:16 }}>
            {kicker && <div style={{ fontFamily:head, fontSize:11, letterSpacing:"0.2em", color:"rgba(255,255,255,0.92)", textTransform:"uppercase" }}>{kicker}</div>}
            <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:29, lineHeight:1.1, margin:"4px 0 0", color:"#fff", textShadow:"0 1px 10px rgba(26,26,26,0.5)" }}>{title}</h1>
          </div>
        </div>
        <div style={{ padding:"20px 24px 32px" }}>
          {d.lead && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, lineHeight:1.5, color:C.inkSoft, margin:"0 0 22px" }}>{d.lead}</p>}
          {(d.s||[]).map((sec,si)=>(
            <div key={si} style={{ marginBottom:22 }}>
              <Label>{sec.t}</Label>
              {sec.n && <div style={{ marginTop:12 }}>{sec.n.map((st,i)=>(
                <div key={i} style={{ display:"flex", gap:13, marginBottom:13 }}>
                  <div style={{ width:26, height:26, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.ink }}>{i+1}</div>
                  <p style={{ fontSize:14.5, lineHeight:1.5, color:C.ink, margin:"2px 0 0" }}>{st}</p>
                </div>
              ))}</div>}
              {sec.b && <div style={{ marginTop:10 }}>{sec.b.map((bt,i)=>(
                <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start", marginBottom:9 }}>
                  <div style={{ width:6, height:6, borderRadius:99, background:partner, flexShrink:0, marginTop:8 }}/>
                  <p style={{ fontSize:14.5, lineHeight:1.5, color:C.ink, margin:0 }}>{bt}</p>
                </div>
              ))}</div>}
              {sec.p && <p style={{ fontSize:14.5, lineHeight:1.6, color:C.ink, margin:"8px 0 0" }}>{sec.p}</p>}
            </div>
          ))}
          {d.links && <div style={{ margin:"4px 0 18px" }}>{d.links.map((l,i)=><LinkBtn key={i} label={l[0]} url={l[1]}/>)}</div>}
          {d.tip && (
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, borderRadius:16, padding:"15px 17px" }}>
              <GlowOrb partner={partner} size={28} spark={false} style={{ marginTop:1, flexShrink:0 }}/>
              <div><Label color={C.inkFaint}>Совет</Label><p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, lineHeight:1.4, margin:"5px 0 0", color:C.ink }}>{d.tip}</p></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Встроенные обновления ядра: ритуал дня + серия, шаринг эстетики ── */
const sgMem = {};
const sgStore = {
  get(k, d){ try{ const v=localStorage.getItem(k); if(v!=null) return JSON.parse(v); }catch(e){} return k in sgMem? sgMem[k]: d; },
  set(k, v){ sgMem[k]=v; try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} },
};
const sgToday = () => new Date().toISOString().slice(0,10);
const sgRefCode = () => { let c = sgStore.get("sg_ref_code",""); if(!c){ c = Math.random().toString(36).slice(2,8); sgStore.set("sg_ref_code", c); } return c; };
function hexA(c, a){ if(typeof c==="string" && c[0]==="#"){ let h=c.slice(1); if(h.length===3) h=h.split("").map(x=>x+x).join(""); const n=parseInt(h,16); return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`; } return c; }
function plural(n, one, few, many){ const a=n%10, b=n%100; if(a===1&&b!==11) return one; if(a>=2&&a<=4&&(b<10||b>=20)) return few; return many; }
const sgDoy = () => { const n=new Date(), s=new Date(n.getFullYear(),0,0); return Math.floor((n-s)/864e5); };
const sgPlural = (n)=>{ const a=n%100,b=n%10; if(a>10&&a<20)return"дней"; if(b===1)return"день"; if(b>1&&b<5)return"дня"; return"дней"; };

/* ── ИИ-движок: адрес прокси к GigaChat. Можно переопределить через window.SG_AI_ENDPOINT ── */
const _SG_AI_EP = (typeof window!=="undefined" && window.SG_AI_ENDPOINT) || ""; const AI_ENDPOINT = (_SG_AI_EP && _SG_AI_EP.indexOf("ВСТАВЬ")===-1) ? _SG_AI_EP : "/api/gigachat";

/* ── Аналитика (Яндекс.Метрика). Номер счётчика впиши и сюда, и в index.html ── */
const METRIKA_ID = (typeof window!=="undefined" && window.SG_METRIKA_ID) || 0; // ← задаётся в index.html: window.SG_METRIKA_ID = 12345678
function sgTrack(goal, params){
  try { if (typeof window!=="undefined" && window.ym && METRIKA_ID) window.ym(METRIKA_ID, "reachGoal", goal, params||{}); } catch(e){}
}
if (typeof window !== "undefined" && !window.__sgInit) {
  window.__sgInit = true;
  try { if (window.ym && METRIKA_ID) window.ym(METRIKA_ID, "setUserID", sgRefCode()); } catch(e){}
  sgTrack("app_open");
  window.addEventListener("appinstalled", ()=> sgTrack("pwa_install"));
}

/* ── «Поток»: залипательная бесконечная лента вдохновения в духе Pinterest.
   Два столбца-мозаика из фото приложения с тёплыми подписями; листается
   бесконечно (карточки генерируются детерминированно от индекса), сердечко
   сохраняет в «Сохранённое». Повод зависнуть — и мягкий путь к анализатору. ── */
/* ── «Поток»: подпись подбирается ПО САМОЙ ФОТОГРАФИИ ──────────────────────
   Раньше картинки и подписи брались из двух независимых списков, поэтому под
   теннисным кортом могло оказаться «расставь книги по цвету». Теперь ключ
   изображения (tennisServe, croissantButter, peonyTrayBalcony…) определяет тему,
   а подпись выбирается только из идей этой темы. Фото, не попавшие ни в одну
   тему (города, обложки), в ленту не идут. ── */
const SG_FEED_TOPICS = [
  { name:"Игра", re:/tennis|padel|racket|court|balls/i, caps:[
    "Выйди на корт даже на полчаса — тело помнит больше, чем кажется",
    "Возьми урок с тренером и попроси поставить один удар",
    "Сыграй сет без счёта — просто ради звука мяча",
    "Белая форма и гетры: оденься для игры красиво, даже если играешь просто",
    "Посмотри чужой матч и замечай не удары, а паузы",
    "Найди партнёршу по игре в своём районе",
    "После игры — холодный лимонад на скамейке, не спеша",
  ]},
  { name:"Бег", re:/run(?!way)|track|pavement/i, caps:[
    "Пробегись до того, как проснётся улица",
    "Смени маршрут и посчитай новые детали по пути",
    "Беги без часов и наушников — только дыхание",
    "Добеги до воды и постой минуту",
    "Медленный бег вечером — способ закончить день",
    "Пробеги мимо красивого дома и рассмотри его на обратном пути",
    "Носки, в которых приятно бегать, — мелочь, которая решает",
  ]},
  { name:"Практика", re:/yoga|pilates|stretch/i, caps:[
    "Расстели коврик там, куда падает утренний свет",
    "Пятнадцать минут растяжки без музыки",
    "Практика на балконе или траве — земля меняет ощущение",
    "Закончи занятие лёжа и не вставай ещё минуту",
    "Одна поза у окна вместо ленты новостей",
    "Дыши, считая до четырёх, — четыре круга",
    "После практики — стакан воды с лимоном, медленно",
  ]},
  { name:"Движение", re:/bike|cycl|surf|paddle|swim|board/i, caps:[
    "Возьми велосипед и доедь туда, куда обычно идёшь пешком",
    "Заплыви чуть дальше — и полежи на воде",
    "Доска, вода, утро: попробуй сап хотя бы раз",
    "Прокатись без цели, просто вдоль домов",
    "Выйди к воде на рассвете, пока никого нет",
    "Час движения без телефона — любой, какой хочется",
    "Новый маршрут выходного дня: колесо, вода или тропа",
  ]},
  { name:"Природа", re:/hik|mountain|trail|forest|bark|mist/i, caps:[
    "Пройди тропу без цели дойти до конца",
    "Подъём на холм ради одного вида",
    "Потрогай кору дерева — вспомнить, какая она",
    "Возьми термос и выйди в лес на час",
    "Смотри на туман, пока он не растает",
    "Собери три красивых камня — натюрморт на полку",
    "Поход одного дня: рюкзак, бутерброды, никаких планов",
  ]},
  { name:"Море", re:/sea|beach|pool|boat|ocean|water|wave|coastal|sand|dune|pebble|calm/i, caps:[
    "Посиди у воды столько, сколько захочется",
    "Заплыв без спешки — до буйка и обратно",
    "Пройди вдоль берега босиком",
    "Собери морские стёклышки или гальку",
    "Посмотри, как лодки возвращаются вечером",
    "Открой окно к воде и просто слушай",
    "День у бассейна: книга, вода, тень",
  ]},
  { name:"Небо", re:/sunset|sunrise|sky|cloud/i, caps:[
    "Выйди смотреть закат, даже если он обычный",
    "Рассвет раз в месяц — как маленький праздник",
    "Полежи на траве и посмотри на облака десять минут",
    "Сфотографируй небо и не выкладывай",
    "Заметь, во сколько сегодня золотой час",
    "Смотри на грозу из окна с чаем",
    "Один вечер без потолка: балкон, крыша или холм",
  ]},
  { name:"Свет", re:/window|curtain|light|wall|plaster/i, caps:[
    "Посмотри, как свет двигается по стене, и не фотографируй",
    "Открой окно в семь утра и послушай улицу",
    "Передвинь кресло к окну на один вечер",
    "Задёрни лёгкую штору и смотри на тени",
    "Вымой окно — свет станет другим",
    "Найди самое светлое место в доме и позавтракай там",
    "Заметь, какого цвета свет в комнате в шесть вечера",
  ]},
  { name:"Кофе", re:/coffee|latte|espresso|freddo|cafe|cappuc/i, caps:[
    "Сходи в кофейню одна и не бери телефон — только смотри",
    "Свари кофе дольше обычного и выпей, пока горячий",
    "Возьми чашку на балкон и не делай больше ничего",
    "Закажи то, что никогда не берёшь",
    "Утренний кофе из той самой красивой чашки",
    "Кофе навынос и длинная дорога домой пешком",
    "Освой один новый способ заваривания",
  ]},
  { name:"Стол", re:/croissant|baguette|breakfast|tart|pasta|burrata|panzanella|salad|fig|yogurt|butter|honey|berry|fruit|lemonade|market|teapot|greekTable|picnic|basket/i, caps:[
    "Съешь завтрак на полу у окна, как в детстве",
    "Сходи на рынок без списка и купи то, что красиво",
    "Приготовь ужин из страны, где ещё не была",
    "Накрой стол красиво, даже если ешь одна",
    "Инжир, сыр и мёд — ужин без готовки",
    "Испеки что-нибудь простое ради запаха в доме",
    "Пикник ближе, чем кажется: плед и ближайший парк",
  ]},
  { name:"Цветы", re:/lemon|peony|hydrangea|flower|blossom|bouquet|lavender|wildflower|jasmine|floral|cones/i, caps:[
    "Купи один стебель и поставь в бутылку",
    "Собери букет из того, что растёт у дома",
    "Поставь цветы туда, где увидишь их утром",
    "Зайди в цветочный без повода и просто постой",
    "Засуши один цветок между страниц",
    "Посади что-нибудь в горшок — пусть растёт медленно",
    "Лаванда у кровати — сон станет мягче",
  ]},
  { name:"Занятия", re:/book|read|library|sudoku|puzzle|chess|vinyl|film|cinema|art|paint|easel|marbling|origami|letter|kintsugi|craft|workshop/i, caps:[
    "Найди в доме вещь старше себя и рассмотри её",
    "Напиши бумажное письмо тому, кто его не ждёт",
    "Читай пятнадцать минут стоя у окна",
    "Расставь книги по цвету — на один вечер",
    "Вечер одного альбома: слушай целиком, без перемотки",
    "Собери пазл на сто деталей за вечер",
    "Сходи в кино одна на утренний сеанс",
  ]},
  { name:"Стиль", re:/dress|suit|shirt|linen|silk|slip|pearl|hanger|capsule|sandal|swimsuit|knit|lbd|mirror|bob|trench|tweed|ballerina|dancing/i, caps:[
    "Надень дома то, что бережёшь для случая",
    "Разбери одну полку и оставь только любимое",
    "Оденься сегодня для себя, а не для встречи",
    "Померь то, что давно висит, и реши честно",
    "Погладь лён — это медитация",
    "Один аксессуар, который меняет всё: примерь",
    "Составь три образа из того, что уже есть",
  ]},
  { name:"Уход", re:/perfume|serum|blush|spf|soap|brush|skincare|cream|hairOil|bath|body|neroli|citrus/i, caps:[
    "Нанеси крем медленно, будто это ритуал",
    "Побрызгай духами подушку, а не себя",
    "Душ без телефона и без спешки",
    "Найди запах, который возвращает в детство",
    "Ванна в среду — не ждать выходных",
    "Расчеши волосы сто раз, как в старых книгах",
    "Маска, свеча и двадцать минут тишины",
  ]},
  { name:"Дом", re:/laundry|home|ceramic|vase|shelf|plate|nook|living|glass|stillLife|azulejos|coin|slowGlow|balcony|terrace/i, caps:[
    "Переставь одну вещь в комнате и живи так неделю",
    "Развесь бельё и посмотри, как оно сохнет",
    "Вымой одну чашку так, будто она любимая",
    "Убери с поверхности всё и оставь один предмет",
    "Составь натюрморт из трёх вещей на полке",
    "Смени наволочки среди недели — просто так",
    "Полей цветы медленно, как разговор",
  ]},
  { name:"Дорога", re:/airport|plane|travel|suitcase|kit/i, caps:[
    "Собери сумку так, будто уезжаешь завтра",
    "Найди на карте город, о котором ничего не знаешь",
    "Съезди на день туда, куда час пути",
    "Достань старые билеты и вспомни ту поездку",
    "Список из пяти мест на эту осень",
    "Выучи десять слов языка страны мечты",
    "Электричка до конечной — маленькое путешествие",
  ]},
  { name:"Вечер", re:/breathe|lotus|moonMilk|candle|evening|moon/i, caps:[
    "Выключи свет и посиди со свечой пятнадцать минут",
    "Ложись на час раньше, ничего не досмотрев",
    "Десять медленных вдохов, считая каждый",
    "Тёплое молоко с мёдом перед сном",
    "Вечер без экранов после десяти",
    "Запиши три вещи, которые сегодня заметила",
    "Постели свежее и ляг в него с книгой",
  ]},
];
/* Города, чьи названия случайно содержат ключевые слова тем (jakARTa, isleOfSKYe и т.п.) */
const SG_FEED_SKIP = /^(jakarta|isleOfSkye|petropavlovskkamchatsky|gelendzhik)$/i;
function sgFeedTopic(key){
  if (SG_FEED_SKIP.test(key)) return null;
  for (const t of SG_FEED_TOPICS) if (t.re.test(key)) return t;
  return null;
}

function InspoFeed({ ch, saved, toggleSave, openPin, onClose }){
  const doyR = sgDoy();
  // Ежедневная ротация: каждый день пул перетасовывается заново — сдвиг + шаг,
  // взаимно простой с длиной, поэтому обходится весь пул без повторов.
  const rotate = React.useCallback((arr, salt)=>{
    const n = arr.length; if(!n) return arr;
    const steps = [7,11,13,17,19,23,29,31,37,41,43,47];
    let step = steps[(doyR + salt) % steps.length];
    while (n % step === 0) step++;
    const off = (doyR * (17 + salt) + salt * 5) % n;
    return Array.from({length:n}, (_,i)=> arr[(off + i*step) % n]);
  }, [doyR]);
  // В ленту берём только фотографии, у которых есть своя тема:
  // так подпись всегда описывает то, что действительно на кадре.
  const [flt, setFlt] = useState("");   // выбранная тема; пустая строка = все
  const POOL = React.useMemo(()=> rotate(
    Object.entries(IMG).filter(([k,u])=>{
      if (typeof u!=="string" || /^mind_/.test(k)) return false;
      const t = sgFeedTopic(k);
      return t && (!flt || t.name===flt);
    }),
    1
  ), [rotate, flt]);
  const TOPIC_NAMES = React.useMemo(()=> {
    const seen = new Set();
    for (const t of SG_FEED_TOPICS) seen.add(t.name);
    return Array.from(seen);
  }, []);
  const QPOOL = React.useMemo(()=> rotate(QUOTES, 3), [rotate]);
  const QSPOOL = React.useMemo(()=> rotate(ENVELOPE_QS, 4), [rotate]);
  const BGPOOL = React.useMemo(()=> rotate(FEED_BG, 5), [rotate]);
  const [count, setCount] = useState(48);
  const [burst, setBurst] = useState(null); // id карточки с всплеском сердца
  const lastTap = React.useRef({});
  const doy = sgDoy();
  useEffect(()=>{ sgTrack("feed_open"); },[]);
  const doSave = (item)=>{ toggleSave(item); sgTrack("feed_save"); };
  const tap = (id, item)=>{ // двойное касание = сохранить, с всплеском сердца
    const now = Date.now();
    if (now - (lastTap.current[id]||0) < 340) {
      if (!saved.some(x=>x.id===id)) doSave(item);
      setBurst(id); setTimeout(()=>setBurst(b=> b===id ? null : b), 780);
    }
    lastTap.current[id] = now;
  };
  const card = (idx)=>{
    const kind = flt ? "photo" : (idx===1 ? "day" : (idx%9===4 ? "quote" : (idx%9===7 ? "q" : "photo")));
    if (!POOL.length) return null;
    if (kind==="quote"){
      const qt = QPOOL[idx % QPOOL.length];
      return (
        <div key={idx} className={"fade st"+((idx%6)+1)} style={{ breakInside:"avoid", marginBottom:10, borderRadius:16, overflow:"hidden", border:`1px solid ${C.line}`, position:"relative" }}>
          <Photo t={idx%6} url={BGPOOL[idx % BGPOOL.length]} h={196} radius={0}>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(160deg, rgba(26,26,26,0.32), rgba(26,26,26,0.62))` }}/>
          </Photo>
          <div style={{ position:"absolute", inset:0, padding:"18px 15px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
            <span style={{ color:"#fff", fontSize:14, opacity:0.85 }}>✦</span>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, lineHeight:1.35, color:"#fff", margin:"6px 0 0", textShadow:"0 1px 10px rgba(26,26,26,0.6)" }}>{qt}</p>
          </div>
        </div>
      );
    }
    if (kind==="q"){
      const qq = QSPOOL[idx % QSPOOL.length];
      return (
        <div key={idx} className={"fade st"+((idx%6)+1)} style={{ breakInside:"avoid", marginBottom:10, borderRadius:16, overflow:"hidden", border:`1px solid ${ch.partner}66`, position:"relative" }}>
          <Photo t={(idx+2)%6} url={BGPOOL[(idx+4) % BGPOOL.length]} h={182} radius={0}>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(160deg, ${ch.partner}66, rgba(26,26,26,0.66))` }}/>
          </Photo>
          <div style={{ position:"absolute", inset:0, padding:"16px 15px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
            <div style={{ fontFamily:head, fontSize:8.5, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.85)" }}>Вопрос себе</div>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15.5, lineHeight:1.35, color:"#fff", margin:"6px 0 0", textShadow:"0 1px 10px rgba(26,26,26,0.6)" }}>{qq}</p>
          </div>
        </div>
      );
    }
    const special = kind==="day";
    const [imgKey, url] = POOL[(special ? 0 : idx) % POOL.length];
    const topic = sgFeedTopic(imgKey);
    const cap = special
      ? "Пин дня · только сегодня"
      : topic.caps[(idx + doy) % topic.caps.length];   // подпись из темы этого фото
    const h = special ? 236 : 168 + ((idx*37) % 132);
    const id = "feed_" + (special ? "day_"+doy : imgKey + "_" + ((idx + doy) % topic.caps.length));
    const item = { id, kind:"поток", title:cap, t:idx%6, url };
    const isSaved = saved.some(x=>x.id===id);
    return (
      <div key={idx} onClick={()=>tap(id, item)} className={"fade st"+((idx%6)+1)} style={{ breakInside:"avoid", marginBottom:10, borderRadius:16, overflow:"hidden", position:"relative", border: special ? `1.5px solid ${ch.partner}` : `1px solid ${C.line}`, background:"#fff", boxShadow: special ? `0 12px 28px -18px ${ch.partner}` : "none" }}>
        <Photo t={idx%6} url={url} h={h} radius={0}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 45%, rgba(26,26,26,0.55) 100%)" }}/>
        </Photo>
        {special && <span className="pulseSoft" style={{ position:"absolute", top:8, left:8, background:"rgba(250,248,241,0.95)", borderRadius:99, padding:"4px 10px", fontFamily:head, fontSize:9, letterSpacing:"0.12em", color:C.ink }}>✦ ПИН ДНЯ</span>}
        <button onClick={(e)=>{ e.stopPropagation(); doSave(item); }} aria-label="Сохранить" className="tapPop" style={{ position:"absolute", top:8, right:8, width:32, height:32, borderRadius:99, border:"none", cursor:"pointer", background:"rgba(250,248,241,0.9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Heart size={15} strokeWidth={1.9} color={isSaved?ch.partner:C.inkSoft} fill={isSaved?ch.partner:"none"}/>
        </button>
        {burst===id && <div className="heartPop" style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}><Heart size={64} strokeWidth={0} color={"#fff"} fill={ch.partner}/></div>}
        <div style={{ position:"absolute", left:10, right:10, bottom:9 }}>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, lineHeight:1.3, color:"#fff", margin:0, textShadow:"0 1px 8px rgba(26,26,26,0.6)" }}>{cap}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="screen" style={{ position:"absolute", inset:0, zIndex:60, background:C.cream, display:"flex", flexDirection:"column" }}>
      <div style={{ display:"flex", alignItems:"center", gap:11, padding:"14px 16px 10px", borderBottom:`1px solid ${C.line}`, background:"rgba(250,248,241,0.92)" }}>
        <button onClick={onClose} aria-label="Назад" style={{ width:34, height:34, borderRadius:99, border:`1px solid ${C.line}`, background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}><ArrowLeft size={17} strokeWidth={1.8} color={C.ink}/></button>
        <div style={{ flex:1 }}>
          <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:21, margin:0, color:C.ink }}>Поток</h1>
          <p style={{ fontSize:11, color:C.inkFaint, margin:0 }}>листай медленно · двойной тап сохраняет</p>
        </div>
        <SGFleur color={ch.partner} size={38}/>
      </div>
      <div style={{ display:"flex", gap:7, overflowX:"auto", padding:"9px 12px 4px", WebkitOverflowScrolling:"touch", scrollbarWidth:"none" }}>
        {["", ...TOPIC_NAMES].map(nm=>(
          <button key={nm||"all"} onClick={()=>{ setFlt(nm); setCount(48); }} className="tapPop" style={{
            flexShrink:0, padding:"6px 13px", borderRadius:99, cursor:"pointer",
            border:`1px solid ${ (flt===nm) ? ch.partner : C.line }`,
            background: (flt===nm) ? `linear-gradient(135deg, ${C.butter}, ${ch.partner}B3)` : "#fff",
            fontFamily:head, fontSize:11.5, color:C.ink, whiteSpace:"nowrap",
          }}>{nm || "Все"}</button>
        ))}
      </div>
      <div className="sg-scroll" onScroll={(e)=>{ const el=e.currentTarget; if(el.scrollTop + el.clientHeight > el.scrollHeight - 800) setCount(c=> c<1200 ? c+48 : c); }} style={{ flex:1, overflowY:"auto", padding:"8px 12px 90px" }}>
        <div style={{ columns:2, columnGap:10 }}>
          {Array.from({length:count}).map((_,i)=>card(i))}
        </div>
      </div>
      <button onClick={openPin} className="sheen" style={{ position:"absolute", left:16, right:16, bottom:16, height:48, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:13.5, fontWeight:500, boxShadow:"0 14px 30px -14px rgba(26,26,26,0.6)" }}>Разобрать мою эстетику ✦</button>
    </div>
  );
}

/* ── Раскрывашка: тяжёлые секции прячутся под иконку-заголовок ── */
function Fold({ ch, icon, title, sub, defaultOpen=false, children }){
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ borderRadius:16, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.5)", marginBottom:12, overflow:"hidden" }}>
      <button onClick={()=>setOpen(o=>!o)} className="tapPop" style={{ width:"100%", display:"flex", alignItems:"center", gap:11, padding:"13px 14px", border:"none", background:"transparent", cursor:"pointer", textAlign:"left" }}>
        <span style={{ width:32, height:32, borderRadius:11, flexShrink:0, background:`linear-gradient(135deg, ${C.butter}, ${ch.partner}B3)`, border:"1px solid rgba(255,255,255,0.6)", display:"flex", alignItems:"center", justifyContent:"center" }}><SGGlyph em={icon} size={17} color="#1A1A1A" sw={1.7}/></span>
        <span style={{ flex:1, minWidth:0 }}>
          <span style={{ display:"block", fontFamily:serif, fontStyle:"italic", fontSize:16.5, color:C.ink, lineHeight:1.12 }}>{title}</span>
          {sub && <span style={{ display:"block", fontSize:11.5, color:C.inkFaint, marginTop:2, lineHeight:1.3 }}>{sub}</span>}
        </span>
        <ChevronDown size={17} strokeWidth={1.8} color={C.inkSoft} style={{ flexShrink:0, transform:open?"rotate(180deg)":"none", transition:"transform .2s" }}/>
      </button>
      {open && <div className="fade" style={{ padding:"2px 14px 14px" }}>{children}</div>}
    </div>
  );
}

/* ── Рисованный орнамент: тонкая веточка со звёздочкой, в цвет главы ────────── */
function SGFleur({ color="#C0895E", size=54, style }){
  return (
    <svg width={size} height={size*0.55} viewBox="0 0 100 55" fill="none" aria-hidden="true" style={style}>
      <path d="M4 44 C 26 40, 44 30, 62 14" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.75"/>
      <path d="M22 41 C 24 35, 29 31, 35 30 C 31 36, 27 40, 22 41 Z" fill={color} opacity="0.55"/>
      <path d="M38 32 C 41 26, 46 22, 52 21 C 49 27, 44 31, 38 32 Z" fill={color} opacity="0.45"/>
      <path d="M30 44 C 34 44, 38 46, 40 50 C 35 50, 31 48, 30 44 Z" fill={color} opacity="0.4"/>
      <path d="M72 10 l2.2 5.4 5.4 2.2 -5.4 2.2 -2.2 5.4 -2.2 -5.4 -5.4 -2.2 5.4 -2.2 Z" fill={color} opacity="0.9"/>
      <circle cx="88" cy="24" r="2" fill={color} opacity="0.5"/>
      <circle cx="63" cy="5" r="1.5" fill={color} opacity="0.4"/>
    </svg>
  );
}

/* ── Рисованное солнце: полукруг с лучами, в цвет главы ─────────────────────── */
function SGSun({ color="#C0895E", size=34, style }){
  return (
    <svg width={size} height={size*0.62} viewBox="0 0 100 62" fill="none" aria-hidden="true" style={style}>
      <path d="M22 54 A 28 28 0 0 1 78 54" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.85"/>
      <line x1="50" y1="6" x2="50" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
      <line x1="22" y1="16" x2="29" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="78" y1="16" x2="71" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="8" y1="38" x2="18" y2="41" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="92" y1="38" x2="82" y2="41" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="10" y1="54" x2="90" y2="54" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

/* ── Фирменные рисованные иконки Slow Glow ───────────────────────────────────
   Вместо эмодзи: тонкая линия, скруглённые концы — в одном стиле с SGFleur.
   SGGlyph — сам значок (по имени name или по эмодзи em через карту SG_EMOJI);
   если эмодзи нет в карте, показываем его как есть, чтобы ничего не пропало.
   SGBadge — «дизайновая плашка»: маленький градиентный квадрат со значком. */
const SG_GLYPH = {
  cup:      "<path d='M5 10h11v4.6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V10Z'/><path d='M16 11h1.6a2.4 2.4 0 0 1 0 4.8H16'/><path d='M8.6 4.6c-.7 1 .7 1.5 0 2.6M12.2 4.6c-.7 1 .7 1.5 0 2.6'/>",
  book:     "<path d='M12 6.6C10.5 5.1 8 4.6 4.6 4.9v13.6C8 18.2 10.5 18.7 12 20c1.5-1.3 4-1.8 7.4-1.5V4.9C16 4.6 13.5 5.1 12 6.6Z'/><path d='M12 6.6V20'/>",
  letter:   "<rect x='4' y='6' width='16' height='12' rx='2.4'/><path d='M4.6 7.6 12 13l7.4-5.4'/>",
  pen:      "<path d='M5 19c.4-2.2.9-3.4 2-4.5L16.2 5.3a1.9 1.9 0 0 1 2.7 2.7L9.7 17.2c-1.1 1.1-2.3 1.6-4.7 1.8Z'/><path d='m14.7 6.9 2.6 2.6'/>",
  flower:   "<path d='M12 20v-9'/><circle cx='12' cy='6.6' r='2.6'/><path d='M12 15.6c-2.2-.2-3.6-1.3-4.2-3.4 2.2.2 3.6 1.3 4.2 3.4Z'/><path d='M12 13.6c2.2-.2 3.6-1.3 4.2-3.4-2.2.2-3.6 1.3-4.2 3.4Z'/>",
  leaf:     "<path d='M6 18c0-8 5-12.5 12.5-12.5C18.5 13 14 18 6 18Z'/><path d='M6 18c2.5-4.5 6-8 9.5-9.8'/>",
  tree:     "<path d='m12 4 4.6 6.6h-2.8l3.8 5.4H6.4l3.8-5.4H7.4L12 4Z'/><path d='M12 16v4'/>",
  candle:   "<rect x='9.2' y='10.5' width='5.6' height='8.5' rx='1.4'/><path d='M12 8.2c1.4-1.1 1.4-2.5 0-3.8-1.4 1.3-1.4 2.7 0 3.8Z'/><path d='M12 8.4v2.1'/>",
  music:    "<path d='M9 17.4V6.8l9-2v10.6'/><circle cx='6.8' cy='17.6' r='2.2'/><circle cx='15.8' cy='15.6' r='2.2'/>",
  sun:      "<circle cx='12' cy='12' r='3.6'/><path d='M12 3.6v2M12 18.4v2M4.6 12h-2M21.4 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M17.7 6.3l1.4-1.4M4.9 19.1l1.4-1.4'/>",
  sunset:   "<path d='M5.2 15.5a6.8 6.8 0 0 1 13.6 0'/><path d='M3 18.4h18M12 4.6v2.4M5.8 8.1l1.6 1.6M18.2 8.1l-1.6 1.6'/>",
  moon:     "<path d='M18.4 14.4A7.2 7.2 0 0 1 9.6 5.6a7.2 7.2 0 1 0 8.8 8.8Z'/><path d='m16.4 4.6.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5.5-1.4Z'/>",
  rain:     "<path d='M7.6 13.4a4.4 4.4 0 1 1 .8-8.7 5 5 0 0 1 9.3 1.6 3.5 3.5 0 0 1-.8 7.1H7.6Z'/><path d='m9 16.4-.9 2.3M13 16.4l-.9 2.3M17 16.4l-.9 2.3'/>",
  wind:     "<path d='M4 9h9.4a2.4 2.4 0 1 0-2.3-3M4 13h13.4a2.6 2.6 0 1 1-2.5 3.2M4 17h6'/>",
  wave:     "<path d='M3 9.5c2 0 2.6-1.6 4.5-1.6S10 9.5 12 9.5s2.6-1.6 4.5-1.6S19 9.5 21 9.5'/><path d='M3 14.5c2 0 2.6-1.6 4.5-1.6s2.5 1.6 4.5 1.6 2.6-1.6 4.5-1.6 2.5 1.6 4.5 1.6'/>",
  bath:     "<path d='M4 12.4h16v2.2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2.2Z'/><path d='M6 12.4V7a2.3 2.3 0 0 1 4.5-.7'/><path d='m7 18.8-.9 1.4M17 18.8l.9 1.4'/>",
  lemon:    "<path d='M6.6 16.6c-2-2-1.7-5.9 1-8.6s6.6-3 8.6-1 1.7 5.9-1 8.6-6.6 3-8.6 1Z'/><path d='M16.4 6.8 18 5.2'/>",
  jar:      "<rect x='8.6' y='4.6' width='6.8' height='2.8' rx='1'/><path d='M9 7.4C7.4 8.8 6.6 10.4 6.6 12.8c0 3.8 2.2 6.2 5.4 6.2s5.4-2.4 5.4-6.2c0-2.4-.8-4-2.4-5.4'/>",
  croissant:"<path d='M9.8 15.8c-1.3-2.6-1.3-5.2 0-7.4 1.3-1.6 3.1-1.6 4.4 0 1.3 2.2 1.3 4.8 0 7.4-1.3 1.5-3.1 1.5-4.4 0Z'/><path d='M8.4 8C6 9.4 4.6 11.7 4.6 14c0 1.6 1 2.6 2.6 2.6.9 0 1.8-.3 2.7-.8M15.6 8C18 9.4 19.4 11.7 19.4 14c0 1.6-1 2.6-2.6 2.6-.9 0-1.8-.3-2.7-.8'/>",
  plate:    "<circle cx='12' cy='12' r='7.4'/><circle cx='12' cy='12' r='3.4'/>",
  film:     "<rect x='4' y='5.6' width='16' height='12.8' rx='2'/><path d='M8 5.6v12.8M16 5.6v12.8M4 9.4h4M4 14.6h4M16 9.4h4M16 14.6h4'/>",
  camera:   "<rect x='4' y='7.6' width='16' height='10.8' rx='2.4'/><path d='M9 7.6 10.4 5.2h3.2L15 7.6'/><circle cx='12' cy='12.8' r='2.9'/>",
  frame:    "<rect x='5' y='4.6' width='14' height='14.8' rx='1.4'/><rect x='7.6' y='7.2' width='8.8' height='9.6' rx='.8'/><path d='m9 14.4 2.2-2.6 1.6 1.7 1.5-1.8 1.7 2.7'/>",
  palette:  "<path d='M12 4a8 8 0 1 0 0 16c1.3 0 1.9-.8 1.6-1.8-.4-1.3.3-2.2 1.7-2.2h1.9c1.7 0 2.8-1.2 2.8-3C20 8 16.4 4 12 4Z'/><circle cx='8.3' cy='9.2' r='1'/><circle cx='12' cy='7.4' r='1'/><circle cx='15.7' cy='9.2' r='1'/>",
  basket:   "<path d='M4.6 10h14.8l-1.5 7.8a2 2 0 0 1-2 1.6H8.1a2 2 0 0 1-2-1.6L4.6 10Z'/><path d='M9 10c0-3 1.2-4.9 3-4.9s3 1.9 3 4.9'/>",
  box:      "<path d='M4.6 8 12 4.6 19.4 8v8L12 19.4 4.6 16V8Z'/><path d='M4.6 8 12 11.4 19.4 8M12 11.4v8'/>",
  heart:    "<path d='M12 19.4c-4.4-3-7.4-5.7-7.4-8.9A4 4 0 0 1 12 8a4 4 0 0 1 7.4 2.5c0 3.2-3 5.9-7.4 8.9Z'/>",
  lotus:    "<path d='M12 18c-1.8-1.4-2.7-3.3-2.7-5.5 0-2 1-4.1 2.7-5.7 1.7 1.6 2.7 3.7 2.7 5.7 0 2.2-.9 4.1-2.7 5.5Z'/><path d='M12 18c-3 .5-5.5-.3-7.4-2.3 2.3-1 4.4-1 6.3 0M12 18c3 .5 5.5-.3 7.4-2.3-2.3-1-4.4-1-6.3 0'/>",
  dress:    "<path d='M9 4.6c.4 1.7 1.4 2.6 3 2.6s2.6-.9 3-2.6'/><path d='M9.8 7.4 9 10.4l-3.1 7c2 1.2 4 1.8 6.1 1.8s4.1-.6 6.1-1.8l-3.1-7-.8-3'/>",
  mirror:   "<ellipse cx='12' cy='9.8' rx='5.2' ry='6.6'/><path d='M12 16.6V20M9.2 20h5.6'/><path d='M9.6 7.4c.6-1.2 1.5-1.9 2.6-2.1'/>",
  broom:    "<path d='m14.6 4.4 5 5'/><path d='M13.8 10.4 4.8 19.4c2.7 1 5 .6 7.1-1.5l2-2'/><path d='m13 9.2 1.8 1.8c1.2-.4 2-1.2 2.4-2.4l-1.8-1.8c-1.2.4-2 1.2-2.4 2.4Z'/>",
  clock:    "<circle cx='12' cy='12' r='7.4'/><path d='M12 7.6V12l3 2'/>",
  bike:     "<circle cx='6.6' cy='15.4' r='3.4'/><circle cx='17.4' cy='15.4' r='3.4'/><path d='M6.6 15.4 10 8.2h5.4M17.4 15.4 14 8.2M10 8.2H8.2'/>",
  gift:     "<rect x='4.6' y='9' width='14.8' height='10' rx='1.4'/><path d='M12 9v10M4.6 12.6h14.8'/><path d='M12 9C9.2 9 7.6 8 7.6 6.6S9.8 4.2 12 6.4c2.2-2.2 4.4-1.3 4.4.2S14.8 9 12 9Z'/>",
  tower:    "<path d='M12 4.4 8.6 19M12 4.4 15.4 19'/><path d='M10 11h4M9.2 15.4h5.6'/><path d='M6.6 19h10.8'/><path d='M9.6 19c.7-2 4.1-2 4.8 0'/>",
  home:     "<path d='M4.6 11 12 4.6 19.4 11'/><path d='M6.6 10v9h10.8v-9'/><path d='M10 19v-4.6h4V19'/>",
  sparkle:  "<path d='M12 3.6c.6 3.6 2.9 5.8 6.4 6.4-3.5.6-5.8 2.9-6.4 6.4-.6-3.5-2.9-5.8-6.4-6.4 3.5-.6 5.8-2.8 6.4-6.4Z'/><circle cx='18.2' cy='17.4' r='1.1'/>",
  walk:     "<path d='M5 19c3.4-1 5.4-3 6.9-6.9S15.6 5.6 19 4.6'/><path d='M16.4 4.6H19v2.6'/>",
  plane:    "<path d='M4 13.4 20 6l-4.4 12.8-3.4-5L4 13.4Z'/><path d='M12.2 13.8 20 6'/>",
  racket:   "<ellipse cx='14.4' cy='8.6' rx='4.6' ry='5.6' transform='rotate(35 14.4 8.6)'/><path d='M11 13 5.6 18.4'/><path d='m12.4 6.6 4 4M15.4 5.6l2.8 2.8M11.2 9.2l4.4 4.4'/><circle cx='6.6' cy='8.2' r='1.5'/>",
  paw:      "<circle cx='8.2' cy='8.2' r='1.5'/><circle cx='12' cy='6.9' r='1.5'/><circle cx='15.8' cy='8.2' r='1.5'/><path d='M12 11.2c2.6 0 4.5 1.7 4.5 3.8 0 1.5-1.1 2.5-2.5 2.5-.8 0-1.4-.3-2-.3s-1.2.3-2 .3c-1.4 0-2.5-1-2.5-2.5 0-2.1 1.9-3.8 4.5-3.8Z'/>",
  hanger:   "<path d='M12 7.6a2 2 0 1 1 2-2'/><path d='M12 7.6 3.9 13.6a1.4 1.4 0 0 0 .8 2.5h14.6a1.4 1.4 0 0 0 .8-2.5L12 7.6Z'/>",
  mappin:   "<path d='M12 20.4c4-4.2 6-7.3 6-9.9a6 6 0 1 0-12 0c0 2.6 2 5.7 6 9.9Z'/><circle cx='12' cy='10.4' r='2.1'/>",
  fire:     "<path d='M12 19.6c-3.2 0-5.4-2-5.4-5 0-2.3 1.3-4.2 2.6-5.6-.1 1.4.4 2.3 1.5 2.7-.4-2.9.7-5.5 3.2-7.5-.3 2.2.5 3.5 1.9 5 1.2 1.3 2.5 2.9 2.5 5.4 0 3-2.1 5-6.3 5Z'/>",
  chart:    "<path d='M4.6 4.6v14.8h14.8'/><path d='m7.6 15 3.4-4 2.4 2.4L18 8.2'/><path d='M15.6 8.2H18v2.4'/>",
  backpack: "<rect x='6' y='8' width='12' height='11.4' rx='3'/><path d='M9 8V6.8a3 3 0 0 1 6 0V8'/><path d='M6 13.4h12'/><path d='M10 13.4V16h4v-2.6'/>",
};
const SG_EMOJI = {
  "\u2615":"cup","\ud83c\udf75":"cup","\ud83e\uded6":"cup",
  "\ud83d\udcd6":"book","\ud83d\udcda":"book",
  "\u2709\ufe0f":"letter","\ud83d\udc8c":"letter",
  "\u270d\ufe0f":"pen","\ud83d\udcdd":"pen","\ud83d\udd8a":"pen",
  "\ud83d\uddd3":"clock","\ud83d\udd70":"clock",
  "\ud83d\udc90":"flower","\ud83c\udf38":"flower","\ud83c\udf3c":"flower",
  "\ud83c\udf3f":"leaf","\ud83e\uded2":"leaf",
  "\ud83c\udf33":"tree","\ud83c\udfde":"tree",
  "\ud83d\udd6f":"candle",
  "\ud83c\udfb6":"music","\ud83c\udfa7":"music","\ud83d\udcbf":"music","\ud83d\udcfb":"music","\ud83c\udfb5":"music","\ud83d\udc83":"music","\ud83e\ude70":"music",
  "\ud83c\udf05":"sunset","\ud83c\udf07":"sunset",
  "\ud83c\udf19":"moon","\ud83c\udf03":"moon",
  "\ud83c\udf27":"rain","\ud83c\udf2c":"wind","\ud83c\udf0a":"wave",
  "\ud83d\udec1":"bath","\ud83e\udee7":"bath","\ud83e\uddf4":"bath",
  "\ud83c\udf4b":"lemon","\ud83c\udf4a":"lemon","\ud83c\udf53":"lemon",
  "\ud83c\udf6f":"jar",
  "\ud83e\udd50":"croissant","\ud83c\udf5e":"croissant","\ud83c\udf70":"croissant","\ud83c\udf6b":"croissant",
  "\ud83c\udf5c":"plate","\ud83e\udd57":"plate","\ud83c\udf7d":"plate",
  "\ud83c\udf9e":"film","\ud83d\udcf7":"camera","\ud83d\udcf8":"camera",
  "\ud83d\uddbc":"frame","\ud83c\udfdb":"frame","\ud83c\udfa8":"palette",
  "\ud83e\uddfa":"basket","\ud83e\uddf5":"basket","\ud83d\uded2":"basket",
  "\ud83d\udce6":"box",
  "\ud83e\udd0d":"heart","\ud83e\udde1":"heart","\ud83d\udc75":"heart",
  "\ud83e\uddd8\u200d\u2640\ufe0f":"lotus","\ud83e\uddd8":"lotus","\ud83e\ude77":"lotus",
  "\ud83d\udc57":"dress","\ud83e\udde3":"dress","\ud83e\udde6":"dress",
  "\ud83d\udc84":"mirror","\ud83e\ude9e":"mirror",
  "\ud83e\uddf9":"broom",
  "\ud83d\udeb2":"bike","\ud83d\udeb4\u200d\u2640\ufe0f":"bike","\ud83d\udeb4":"bike",
  "\ud83c\udf81":"gift","\ud83d\uddfc":"tower",
  "\ud83c\udfe0":"home","\ud83d\udeaa":"home",
  "\ud83e\uddca":"sparkle","\u2728":"sparkle","\u2726":"sparkle",
  "\ud83d\udeb6\u200d\u2640\ufe0f":"walk","\ud83d\udeb6":"walk","\ud83d\udc5f":"walk","\ud83c\udfc3\u200d\u2640\ufe0f":"walk","\ud83c\udfc3":"walk","\ud83e\udd7e":"walk",
  "\ud83c\udfbe":"racket","\ud83c\udff8":"racket","\ud83c\udfd3":"racket",
  "\ud83c\udfca\u200d\u2640\ufe0f":"wave","\ud83c\udfca":"wave","\ud83c\udfc4\u200d\u2640\ufe0f":"wave","\ud83c\udfc4":"wave",
  "\ud83c\udfcb\ufe0f\u200d\u2640\ufe0f":"fire","\ud83e\udd4a":"fire","\ud83d\udd25":"fire","\ud83e\uddd7\u200d\u2640\ufe0f":"fire",
  "\ud83d\udcc8":"chart","\ud83c\udf92":"backpack",
};
function SGGlyph({ name, em, size=20, color="#1A1A1A", sw=1.6, style }){
  const raw = em ? String(em).trim() : "";
  const key = name || SG_EMOJI[raw] || SG_EMOJI[raw.replace(/\uFE0F/g,"")] || SG_EMOJI[raw+"\uFE0F"] || null;
  const d = key ? SG_GLYPH[key] : null;
  if (!d) return em ? <span style={{ fontSize:Math.round(size*0.9), lineHeight:1, ...style }}>{em}</span> : null;
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style} dangerouslySetInnerHTML={{ __html: d }}/>;
}
function SGBadge({ em, name, partner=C.coral, size=32, style }){
  return (
    <span style={{ width:size, height:size, borderRadius:Math.round(size*0.32), flexShrink:0, display:"inline-flex", alignItems:"center", justifyContent:"center", background:`linear-gradient(135deg, ${C.butter}, ${partner}B3 88%)`, border:"1px solid rgba(255,255,255,0.6)", boxShadow:`0 8px 16px -10px ${partner}`, ...style }}>
      <SGGlyph em={em} name={name} size={Math.round(size*0.58)} color="#1A1A1A" sw={1.7}/>
    </span>
  );
}

/* ── «Конверт дня»: ежедневный повод вернуться. Запечатанное письмо, внутри —
   шаг из ТВОЕГО разбора пинов (если он был), красивая идея и вопрос себе.
   Открывается раз в день, открытие продлевает серию красивых дней. ── */
/* ── Синхронизация между устройствами по коду (лёгкие «аккаунты» без пароля).
   Все данные (sg_*) сохраняются на твоём сервере под коротким кодом; на другом
   устройстве вводишь код — и профиль, разборы и прогресс переезжают. ── */
async function sgSyncPush(){
  try{
    const data={};
    for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k && k.indexOf("sg_")===0) data[k]=localStorage.getItem(k); }
    const r=await fetch("/api/sync/save",{ method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ code: sgStore.get("sg_sync_code", null), data }) });
    if(!r.ok) return null;
    const d=await r.json();
    if(d && d.code){ sgStore.set("sg_sync_code", d.code); sgTrack("sync_push"); return d.code; }
    return null;
  }catch(e){ return null; }
}
async function sgSyncPull(code){
  try{
    const r=await fetch("/api/sync/load?code="+encodeURIComponent(code));
    if(!r.ok) return false;
    const d=await r.json();
    if(!d || !d.data) return false;
    Object.entries(d.data).forEach(([k,v])=>{ try{ localStorage.setItem(k, v); }catch(e){} });
    try{ localStorage.setItem("sg_sync_code", JSON.stringify(String(code).toUpperCase())); }catch(e){}
    sgTrack("sync_pull");
    return true;
  }catch(e){ return false; }
}
function SyncCard({ ch }){
  const [can,setCan]=useState(false);
  const [code,setCode]=useState(()=> sgStore.get("sg_sync_code", null));
  const [inp,setInp]=useState("");
  const [busy,setBusy]=useState(false);
  const [msg,setMsg]=useState("");
  useEffect(()=>{ fetch("/api/sync/ping").then(r=>setCan(r.ok)).catch(()=>{}); },[]);
  if(!can) return null;
  const push=async()=>{ setBusy(true); setMsg(""); const c=await sgSyncPush(); setBusy(false); if(c){ setCode(c); setMsg("Копия обновлена в облаке ✦"); } else setMsg("Не получилось — попробуй ещё раз"); };
  const pull=async()=>{ const v=inp.trim().toUpperCase(); if(!v) return; setBusy(true); setMsg(""); const ok=await sgSyncPull(v); setBusy(false); if(ok){ setMsg("Готово! Перезагружаю…"); setTimeout(()=>{ try{ location.reload(); }catch(e){} }, 800); } else setMsg("Код не найден — проверь буквы"); };
  return (
    <div style={{ borderRadius:20, padding:"18px 20px", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, marginBottom:24 }}>
      <Label>Синхронизация между устройствами</Label>
      <p style={{ fontSize:13, color:C.inkSoft, lineHeight:1.5, margin:"8px 0 12px" }}>Сохрани копию в облако и открой её на другом телефоне или компьютере по короткому коду. Без пароля и почты.</p>
      {code && (
        <div style={{ borderRadius:14, border:`1.5px dashed ${ch.partner}`, background:`${ch.partner}12`, padding:"12px 14px", marginBottom:10, textAlign:"center" }}>
          <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.14em", color:C.inkSoft, textTransform:"uppercase" }}>Твой код</div>
          <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:30, letterSpacing:"0.18em", color:C.ink, marginTop:2 }}>{code}</div>
        </div>
      )}
      <button onClick={push} disabled={busy} className="tapPop" style={{ width:"100%", height:44, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:13.5, marginBottom:10 }}>{busy?"Секунду…":(code?"Обновить копию в облаке":"Создать код и сохранить копию")}</button>
      <div style={{ display:"flex", gap:8 }}>
        <input value={inp} onChange={e=>setInp(e.target.value)} placeholder="Код с другого устройства" maxLength={6} style={{ flex:1, height:42, borderRadius:99, border:`1px solid ${C.line}`, background:"#fff", padding:"0 15px", fontFamily:head, fontSize:13, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink, outline:"none" }}/>
        <button onClick={pull} disabled={busy || !inp.trim()} className="tapPop" style={{ height:42, borderRadius:99, border:`1px solid ${ch.partner}`, background:"transparent", cursor:"pointer", color:C.ink, fontFamily:head, fontSize:12.5, padding:"0 16px" }}>Загрузить</button>
      </div>
      {msg && <p style={{ fontSize:12, color:ch.partner, textAlign:"center", margin:"10px 0 0", fontFamily:head }}>{msg}</p>}
    </div>
  );
}

async function sgEnablePush(){
  try{
    if(!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) return false;
    const r = await fetch("/api/push/pubkey"); if(!r.ok) return false;
    const d = await r.json(); if(!d || !d.key) return false;
    const perm = await Notification.requestPermission(); if(perm!=="granted") return false;
    const reg = await navigator.serviceWorker.ready;
    const conv=(b64)=>{ const p="=".repeat((4-b64.length%4)%4); const s=(b64+p).replace(/-/g,"+").replace(/_/g,"/"); const raw=atob(s); return Uint8Array.from([...raw].map(c=>c.charCodeAt(0))); };
    const sub = await reg.pushManager.subscribe({ userVisibleOnly:true, applicationServerKey:conv(d.key) });
    const ok = await fetch("/api/push/subscribe", { method:"POST", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(sub) });
    if(!ok.ok) return false;
    sgStore.set("sg_push", true); sgTrack("push_on");
    return true;
  }catch(e){ return false; }
}
function DailyEnvelope({ ch, bump }){
  const [pushOn, setPushOn] = useState(()=> !!sgStore.get("sg_push", false));
  const [canPush, setCanPush] = useState(false);
  const [pushBusy, setPushBusy] = useState(false);
  useEffect(()=>{ if(pushOn) return; if(!("PushManager" in window)) return; fetch("/api/push/pubkey").then(r=>r.ok?r.json():null).then(d=>setCanPush(!!(d&&d.key))).catch(()=>{}); },[pushOn]);
  const today = sgToday();
  const [open, setOpen] = useState(()=> !!sgStore.get("sg_env_"+today, false));
  const doy = sgDoy();
  const dream = sgStore.get("sg_dream_last", null);
  const step = (dream && dream.actions && dream.actions.length)
    ? { tag:"Шаг из твоего разбора", text: dream.actions[doy % dream.actions.length], mine:true }
    : { tag:"Красивый шаг", text: RITUAL_STEPS[(doy*3+5) % RITUAL_STEPS.length], mine:false };
  const idea = ENVELOPE_IDEAS[doy % ENVELOPE_IDEAS.length];
  const q = ENVELOPE_QS[(doy*7+2) % ENVELOPE_QS.length];
  const dstr = new Date().toLocaleDateString("ru-RU",{ day:"numeric", month:"long" });
  const openIt = ()=>{ if(open) return; setOpen(true); sgStore.set("sg_env_"+today, true); bump && bump(); sgTrack("envelope_open"); };
  if(!open) return (
    <button onClick={openIt} className="pop" style={{ width:"100%", border:"none", cursor:"pointer", padding:0, marginBottom:18, textAlign:"left" }}>
      <div className="sheen" style={{ position:"relative", borderRadius:20, border:`1px solid ${C.line}`, overflow:"hidden", background:`linear-gradient(150deg, #FDFBF4, ${C.oat} 55%, ${C.sand})`, padding:"20px 18px 18px", boxShadow:`0 18px 40px -30px ${ch.partner}` }}>
        <div aria-hidden="true" style={{ position:"absolute", top:0, left:0, right:0, height:0, borderLeft:"50vw solid transparent", borderRight:"50vw solid transparent", borderTop:`54px solid ${ch.partner}22` }}/>
        <div style={{ position:"relative", display:"flex", alignItems:"center", gap:14 }}>
          <div className="floaty" style={{ width:52, height:52, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 38% 32%, ${C.butter}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 8px 18px -8px ${ch.partner}`, border:"2px solid rgba(255,255,255,0.7)" }}>
            <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:22, color:"#1A1A1A" }}>✦</span>
          </div>
          <div style={{ flex:1 }}>
            <Label color={ch.partner}>Письмо на сегодня · {dstr}</Label>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:20, color:C.ink, lineHeight:1.15, marginTop:3 }}>Тебе конверт от Slow Glow</div>
            <div style={{ fontSize:12, color:C.inkSoft, marginTop:3 }}>Внутри — шаг, идея и вопрос. Открой ✦</div>
          </div>
          <ArrowRight size={18} strokeWidth={1.8} color={C.inkSoft}/>
        </div>
      </div>
    </button>
  );
  return (
    <div className="fade" style={{ borderRadius:20, border:`1px solid ${C.line}`, overflow:"hidden", marginBottom:18, background:"rgba(255,255,255,0.6)" }}>
      <div style={{ padding:"13px 16px 11px", background:`linear-gradient(110deg, ${C.oat}, ${ch.partner}30)`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Label color={C.ink}>Письмо на сегодня · {dstr}</Label>
        <span style={{ display:"flex", alignItems:"center", gap:7 }}><SGSun color={ch.partner} size={28}/><span style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:ch.partner }}>открыто ✦</span></span>
      </div>
      <div style={{ padding:"12px 16px 15px" }}>
        <div style={{ display:"flex", gap:11, alignItems:"flex-start", marginBottom:11 }}>
          <div style={{ width:26, height:26, borderRadius:99, flexShrink:0, background:step.mine?`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`:`${ch.partner}30`, display:"flex", alignItems:"center", justifyContent:"center" }}><Sparkles size={13} strokeWidth={1.9} color={step.mine?"#1A1A1A":ch.partner}/></div>
          <div><Label color={ch.partner}>{step.tag}</Label><p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:"3px 0 0" }}>{step.text}</p></div>
        </div>
        <div style={{ display:"flex", gap:11, alignItems:"flex-start", marginBottom:11 }}>
          <div style={{ width:26, height:26, borderRadius:99, flexShrink:0, background:`${C.sage}`, display:"flex", alignItems:"center", justifyContent:"center" }}><Wind size={13} strokeWidth={1.9} color="#3f5136"/></div>
          <div><Label color="#7a8a6d">Красивая идея</Label><p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:"3px 0 0" }}>{idea}</p></div>
        </div>
        <div style={{ borderRadius:12, background:`${ch.partner}14`, padding:"11px 13px" }}>
          <Label color={ch.partner}>Вопрос себе</Label>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15.5, lineHeight:1.4, color:C.ink, margin:"4px 0 0" }}>{q}</p>
        </div>
        <p style={{ fontSize:11, color:C.inkFaint, textAlign:"center", margin:"11px 0 0" }}>Новое письмо — завтра утром ✦ открытие продлевает твою серию</p>
        {pushOn ? (
          <p style={{ fontSize:11.5, color:ch.partner, textAlign:"center", margin:"9px 0 0", fontFamily:head, letterSpacing:"0.03em" }}>Утреннее напоминание включено ✦</p>
        ) : canPush ? (
          <button onClick={async()=>{ setPushBusy(true); const ok=await sgEnablePush(); setPushOn(ok); setPushBusy(false); }} disabled={pushBusy} style={{ width:"100%", marginTop:10, height:40, borderRadius:99, border:`1px solid ${ch.partner}`, background:"transparent", cursor:"pointer", color:C.ink, fontFamily:head, fontSize:12.5, display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>{pushBusy?"Включаю…":"🔔 Напоминать о письме по утрам"}</button>
        ) : null}
      </div>
    </div>
  );
}

/* ── Вкладка «Инструменты»: все возможности приложения в одном месте ────────── */
function Tools_({ ch, premium, onPlaces, onCollections, openStylist, openTravel, openLang, openSport, openPets, openMind, openScan, openPin }){
  const tint = [ `${C.sage}66`, `${C.butter}55`, `${C.seaMist}66`, `${C.sand}88` ];
  const T = [
    { k:"Карта и досуг", d:"Эстетичные места рядом", go:onPlaces, g:"mappin" },
    { k:"Коллекции", d:"Капсулы красивой жизни", go:onCollections, g:"box" },
    { k:"Стилист", d:"Образы из твоих вещей", go:openStylist, g:"hanger", plus:true },
    { k:"Путешествия", d:"Куда поехать под эстетику", go:openTravel, g:"plane", plus:true },
    { k:"Языки", d:"Красивые уроки каждый день", go:openLang, g:"letter" },
    { k:"Спорт", d:"Мягкое движение и корты", go:openSport, g:"racket" },
    { k:"Рецепты", d:"Ужин из того, что есть", go:openScan, g:"plate", plus:true },
    { k:"Идеи для ума", d:"Обогащение · тема дня", go:openMind, g:"book" },
    { k:"Питомцы", d:"Забота и прогулки", go:openPets, g:"paw" },
  ];
  return (
    <div>
      <div style={{ padding:"4px 2px 14px" }}>
        <div style={{ display:"flex", alignItems:"flex-end", gap:10 }}><h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:28, margin:0, color:C.ink }}>Инструменты</h1><SGFleur color={ch.partner} size={46} style={{ marginBottom:4 }}/></div>
        <p style={{ fontSize:13, color:C.inkSoft, margin:"5px 0 0", lineHeight:1.45 }}>Всё для медленной красивой жизни — в одном месте.</p>
      </div>
      <button onClick={openPin} className="sheen anim-grad" style={{ width:"100%", textAlign:"left", border:`1px solid ${C.line}`, cursor:"pointer", borderRadius:18, padding:"14px 16px", marginBottom:14, background:`linear-gradient(120deg, ${C.butter}, ${ch.partner} 80%)`, display:"flex", alignItems:"center", gap:12 }}>
        <GlowOrb partner={ch.partner} size={40}/>
        <div style={{ flex:1 }}>
          <Label color="rgba(26,26,26,0.55)">Анализатор пинов</Label>
          <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, marginTop:2 }}>Анализатор пинов</div>
        </div>
        <ArrowRight size={18} strokeWidth={1.8} color="#1A1A1A"/>
      </button>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, paddingBottom:8 }}>
        {T.map((t,i)=>(
          <button key={t.k} onClick={t.go} className={"fade st"+((i%6)+1)} style={{ position:"relative", textAlign:"left", border:`1px solid ${C.line}`, cursor:"pointer", borderRadius:18, overflow:"hidden", padding:0, minHeight:118, background:`linear-gradient(150deg, ${tint[i%tint.length]}, rgba(255,255,255,0.8) 58%, ${ch.partner}26)` }}>
            <div aria-hidden="true" style={{ position:"absolute", right:-22, top:-24, width:84, height:84, borderRadius:99, background:"rgba(255,255,255,0.45)" }}/>
            <div style={{ position:"absolute", left:12, top:11 }}><SGBadge name={t.g} partner={ch.partner} size={34}/></div>
            {t.plus && !premium && <span style={{ position:"absolute", top:9, right:9, fontFamily:head, fontSize:8.5, letterSpacing:"0.12em", background:"rgba(255,255,255,0.85)", border:`1px solid ${C.line}`, borderRadius:99, padding:"3px 7px", color:C.ink }}>✦ PLUS</span>}
            <div style={{ position:"absolute", left:12, right:12, bottom:10 }}>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, lineHeight:1.1 }}>{t.k}</div>
              <div style={{ fontSize:11, color:C.inkSoft, marginTop:2.5, lineHeight:1.3 }}>{t.d}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Партнёрские (affiliate) ссылки для списка покупок ─────────────────────────
   Нажатие на пункт списка покупок открывает, где это купить. Подставь свои данные
   партнёрской программы — и клики станут партнёрскими (доход + повод возвращаться).
   • market   — маркетплейс по умолчанию: "ozon" | "wildberries" | "market"
   • deeplink — шаблон партнёрской ссылки твоей сети (Admitad/ePN/…), где {url} — конечный адрес.
                Пример Admitad: "https://ad.admitad.com/g/ТВОЙ_КОД/?ulp={url}"
   • *Sub / marketClid — субтег/clid, если работаешь без сети, напрямую с маркетплейсом.
   Пока всё пусто — открывается обычный поиск маркетплейса (тоже полезно). */
function shopUrl(q){
  const s = encodeURIComponent(q);
  let base;
  if (SHOP.market==="wildberries") base = "https://www.wildberries.ru/catalog/0/search.aspx?search="+s + (SHOP.wbSub?("&utm_content="+encodeURIComponent(SHOP.wbSub)):"");
  else if (SHOP.market==="market") base = "https://market.yandex.ru/search?text="+s + (SHOP.marketClid?("&clid="+encodeURIComponent(SHOP.marketClid)):"");
  else base = "https://www.ozon.ru/search/?text="+s + (SHOP.ozonSub?("&utm_content="+encodeURIComponent(SHOP.ozonSub)):"");
  return SHOP.deeplink ? SHOP.deeplink.replace("{url}", encodeURIComponent(base)) : base;
}

function DailyRitual({ ch, onLive }){
  const stepText = RITUAL_STEPS[sgDoy() % RITUAL_STEPS.length];
  const [st, setSt] = useState(()=> sgStore.get("sg_ritual", { last:null, streak:0 }));
  const done = st.last === sgToday();
  const complete = ()=>{
    if(done) return;
    const y = new Date(Date.now()-864e5).toISOString().slice(0,10);
    const streak = st.last===y ? st.streak+1 : 1;
    const next = { last:sgToday(), streak };
    setSt(next); sgStore.set("sg_ritual", next);
    sgTrack("ritual_done", { streak });
    onLive && onLive(stepText);
  };
  const ringDeg = Math.min(st.streak,7)/7*360;
  return (
    <div style={{ borderRadius:20, overflow:"hidden", border:`1px solid ${C.line}`, marginBottom:18, boxShadow:`0 16px 36px -30px ${ch.partner}` }}>
      <div style={{ position:"relative" }}>
        <div style={{ height:82, position:"relative", overflow:"hidden", background:`linear-gradient(110deg, ${C.butter}, ${ch.partner}D9 78%)` }}>
          <div aria-hidden="true" style={{ position:"absolute", right:-26, top:-32, width:120, height:120, borderRadius:99, background:"rgba(255,255,255,0.3)" }}/>
          <div aria-hidden="true" style={{ position:"absolute", right:14, bottom:4, opacity:0.8 }}><SGSun color="#1A1A1A" size={40}/></div>
        </div>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", gap:13, padding:"14px 16px" }}>
        <div style={{ width:50, height:50, borderRadius:99, flexShrink:0, background:`conic-gradient(#1A1A1A ${ringDeg}deg, rgba(255,255,255,0.5) 0)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:40, height:40, borderRadius:99, background:C.cream, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:20 }}>{st.streak}</div>
        </div>
        <div>
          <div style={{ fontFamily:head, fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(26,26,26,0.55)" }}>{st.streak===0?"Твой тёплый ритм":`Ты с собой · ${st.streak} ${sgPlural(st.streak)} подряд`}</div>
          <div style={{ fontSize:13, color:C.ink, marginTop:2 }}>{st.streak===0?"один тёплый шаг — и он начнётся, без спешки":"возвращайся завтра, когда захочется ✦"}</div>
        </div>
      </div>
      </div>
      <div style={{ padding:"15px 16px 16px", background:"rgba(255,255,255,0.65)" }}>
        <Label color={C.inkFaint}>Красивый шаг дня</Label>
        <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, lineHeight:1.3, color:C.ink, margin:"6px 0 13px" }}>{stepText}</p>
        <button onClick={complete} disabled={done} style={{ width:"100%", height:46, borderRadius:99, border:"none", cursor:done?"default":"pointer", background:done?C.sage:C.ink, color:done?C.ink:C.cream, fontFamily:head, fontSize:14, fontWeight:500 }}>{done?"Прожито сегодня · ты молодец":"Я прожила этот шаг"}</button>
        {done && <p style={{ textAlign:"center", fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkSoft, margin:"9px 0 0" }}>ты прожила ещё один кусочек мечты</p>}
      </div>
    </div>
  );
}

function sgWrap(x,t,cx,cy,maxW,lh){ const w=String(t).split(" "); let line="",L=[]; w.forEach(o=>{const tt=line?line+" "+o:o; if(x.measureText(tt).width>maxW&&line){L.push(line);line=o;}else line=tt;}); L.push(line); const s=cy-(L.length-1)*lh/2; L.forEach((l,i)=>x.fillText(l,cx,s+i*lh)); }
function sgRound(x,rx,ry,w,h,r){ x.beginPath(); x.moveTo(rx+r,ry); x.arcTo(rx+w,ry,rx+w,ry+h,r); x.arcTo(rx+w,ry+h,rx,ry+h,r); x.arcTo(rx,ry+h,rx,ry,r); x.arcTo(rx,ry,rx+w,ry,r); x.closePath(); }

/* ── Издательский «журнальный» слой для шер-карточек 9:16 (Kinfolk):
   бумажный фон, тонкая рамка, мастхед, кикер, подпись — единый язык на все карточки.
   Дорого и сдержанно: много воздуха, serif-заголовки, тихий знак, один акцент. ── */
function sgSpaced(s){ return String(s).split("").join("\u2009"); }
function sgHair(x,x1,y,x2,col,lw){ x.save(); x.strokeStyle=col||"rgba(26,26,26,0.16)"; x.lineWidth=lw||2; x.beginPath(); x.moveTo(x1,y); x.lineTo(x2,y); x.stroke(); x.restore(); }
function sgPaper(x,W,H){ x.fillStyle=C.cream; x.fillRect(0,0,W,H); const v=x.createRadialGradient(W/2,H*0.42,H*0.18,W/2,H*0.5,H*0.78); v.addColorStop(0,"rgba(255,255,255,0)"); v.addColorStop(1,"rgba(214,205,182,0.32)"); x.fillStyle=v; x.fillRect(0,0,W,H); }
function sgFrame(x,W,H,m){ x.save(); x.strokeStyle="rgba(26,26,26,0.15)"; x.lineWidth=2; x.strokeRect(m,m,W-2*m,H-2*m); x.restore(); }
function sgMasthead(x,W,y){ x.save(); x.textAlign="center"; x.globalAlpha=0.5; x.fillStyle=C.ink; x.font="500 26px Inter, sans-serif"; x.fillText(sgSpaced("SLOW GLOW"),W/2,y); x.globalAlpha=1; x.restore(); }
function sgKicker(x,W,text,y,accent){ x.save(); x.textAlign="center"; x.fillStyle=accent||C.ink; x.globalAlpha=accent?0.95:0.6; x.font="600 27px Inter, sans-serif"; x.fillText(sgSpaced(String(text).toUpperCase()),W/2,y); x.globalAlpha=1; sgHair(x,W/2-38,y+22,W/2+38,accent||"rgba(26,26,26,0.3)",2); x.restore(); }
function sgFooter(x,W,H,m){ const y=H-m-92; sgHair(x,m+30,y,W-m-30,"rgba(26,26,26,0.16)",2); x.save(); x.textAlign="center"; x.fillStyle=C.ink; x.globalAlpha=0.5; x.font="500 30px Inter, sans-serif"; x.fillText(sgSpaced("slow-glow.app"),W/2,y+52); x.globalAlpha=0.42; x.font="italic 400 33px 'Instrument Serif', Georgia, serif"; x.fillText("заметь, что красиво",W/2,y+96); x.globalAlpha=1; x.restore(); }
function sgFit(x,t,maxW){ t=String(t); if(x.measureText(t).width<=maxW) return t; while(t.length>1 && x.measureText(t+"\u2026").width>maxW) t=t.slice(0,-1); return t.replace(/\s+$/,"")+"\u2026"; }
function sgLoadImg(url){ return new Promise(res=>{ if(!url){res(null);return;} const im=new Image(); try{ if(!/^data:/.test(url)) im.crossOrigin="anonymous"; }catch(e){} im.onload=()=>res(im); im.onerror=()=>res(null); try{ im.src=url; }catch(e){ res(null); } }); }
function sgCoverImg(x,img,dx,dy,dw,dh,r){ x.save(); sgRound(x,dx,dy,dw,dh,r||0); x.clip(); if(img){ const ir=img.width/img.height, dr=dw/dh; let sw,sh,sx,sy; if(ir>dr){ sh=img.height; sw=sh*dr; sx=(img.width-sw)/2; sy=0; } else { sw=img.width; sh=sw/dr; sx=0; sy=(img.height-sh)/2; } try{ x.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh); }catch(e){} } else { const g=x.createLinearGradient(dx,dy,dx+dw,dy+dh); g.addColorStop(0,C.oat); g.addColorStop(1,C.sage); x.fillStyle=g; x.fillRect(dx,dy,dw,dh); } x.restore(); }
function sgPills(x,W,items,y,maxW){ if(!items||!items.length) return y; x.save(); x.textAlign="center"; x.font="500 36px Inter, sans-serif"; const gap=22,padX=38,h=80; const ws=items.map(t=>Math.min(maxW||520,x.measureText(t).width)+padX*2); const tot=ws.reduce((a,b)=>a+b,0)+gap*(ws.length-1); let cx=W/2-tot/2; items.forEach((t,i)=>{ const w=ws[i]; x.strokeStyle="rgba(26,26,26,0.26)"; x.lineWidth=2; sgRound(x,cx,y,w,h,h/2); x.stroke(); x.fillStyle=C.ink; x.fillText(sgFit(x,t,(maxW||520)),cx+w/2,y+h/2+12); cx+=w+gap; }); x.restore(); return y+h; }

function ShareReality({ ch, D }){
  const ref = useRef(null);
  const [busy,setBusy]=useState(false);
  const keys = (D.patterns||[]).slice(0,3);
  const shareText = `Моя эстетика по версии Slow Glow — «${ch.aes}»: ${keys.join(" · ")}. Узнай свою → slow-glow.app`;
  async function paint(){
    const cv=ref.current, W=1080, H=1920; cv.width=W; cv.height=H; const x=cv.getContext("2d");
    try{ await document.fonts.load("400 140px 'Instrument Serif'"); await document.fonts.load("500 27px Inter"); await document.fonts.ready; }catch(e){}
    sgPaper(x,W,H); sgFrame(x,W,H,46); x.textAlign="center";
    sgMasthead(x,W,150);
    sgKicker(x,W,"моя эстетика",470,ch.partner);
    x.fillStyle=C.ink; x.font="400 138px 'Instrument Serif', Georgia, serif"; sgWrap(x, ch.aes, W/2, 700, W-260, 138);
    if(keys.length) sgPills(x, W, keys, 990, 440);
    x.globalAlpha=0.68; x.fillStyle=C.ink; x.font="italic 400 50px 'Instrument Serif', Georgia, serif";
    sgWrap(x, (D.seeking&&D.seeking[0])?("ты ищешь "+String(D.seeking[0]).toLowerCase()):"ты ближе, чем кажется", W/2, 1280, W-300, 68); x.globalAlpha=1;
    sgFooter(x,W,H,46);
  }
  async function blob(){ await paint(); return await new Promise(r=>ref.current.toBlob(r,"image/png",0.95)); }
  function dl(b){ const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download="slow-glow-эстетика.png"; a.click(); setTimeout(()=>URL.revokeObjectURL(u),1500); }
  async function share(){ setBusy(true); sgTrack("share_aesthetic"); try{ const b=await blob(); const f=new File([b],"slow-glow.png",{type:"image/png"}); if(navigator.canShare&&navigator.canShare({files:[f]})) await navigator.share({files:[f],text:shareText}); else dl(b); }catch(e){} setBusy(false); }
  async function down(){ setBusy(true); try{ dl(await blob()); }catch(e){} setBusy(false); }
  return (
    <div style={{ borderRadius:18, padding:"15px 16px 16px", marginBottom:22, background:`linear-gradient(125deg, ${C.butter}33, ${ch.partner}22 60%, rgba(255,255,255,0.45))`, border:`1px solid ${C.line}` }}>
      <Label color={ch.partner}>Поделиться своей эстетикой</Label>
      <p style={{ fontSize:13, color:C.inkSoft, margin:"5px 0 12px", lineHeight:1.45 }}>Готовая карточка 9:16 для Stories. Каждый, кто поделится, приводит новых.</p>
      <button onClick={share} disabled={busy} style={{ width:"100%", height:46, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:14, fontWeight:500, marginBottom:8 }}>{busy?"Готовлю картинку…":"Поделиться в сторис"}</button>
      <button onClick={down} disabled={busy} style={{ width:"100%", height:42, borderRadius:99, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", cursor:"pointer", color:C.ink, fontFamily:body, fontSize:13.5 }}>Скачать картинку</button>
      <canvas ref={ref} style={{ display:"none" }}/>
    </div>
  );
}

/* #1 Доска мечты → коллаж-открытка 9:16 (фото пользовательницы + её эстетика) */
function ShareBoard({ ch, imgs, D }){
  const ref = useRef(null);
  const [busy,setBusy]=useState(false);
  const pics = (imgs||[]).map(o=>o&&o.url).filter(u=>u && /^data:image/.test(u)).slice(0,4);
  const themes = (D&&D.patterns?D.patterns:[]).slice(0,3);
  const shareText = `Моя доска мечты по версии Slow Glow — «${ch.aes}». Собери свою → slow-glow.app`;
  async function paint(){
    const cv=ref.current, W=1080, H=1920; cv.width=W; cv.height=H; const x=cv.getContext("2d");
    try{ await document.fonts.load("400 96px 'Instrument Serif'"); await document.fonts.load("500 27px Inter"); await document.fonts.ready; }catch(e){}
    const loaded = await Promise.all(pics.map(sgLoadImg));
    sgPaper(x,W,H); sgFrame(x,W,H,46); x.textAlign="center";
    sgMasthead(x,W,150);
    sgKicker(x,W,"доска мечты",300,ch.partner);
    x.fillStyle=C.ink; x.font="italic 400 92px 'Instrument Serif', Georgia, serif"; sgWrap(x, ch.aes||"моя эстетика", W/2, 430, W-280, 92);
    const p=80, gap=26, tile=(W-2*p-gap)/2, gy=560;
    const fbk=[[C.oat,C.sage],[C.butter,C.coral],[C.seaMist,C.lilac],[C.sand,C.camel]];
    for(let i=0;i<4;i++){ const r=Math.floor(i/2), c=i%2, dx=p+c*(tile+gap), dy=gy+r*(tile+gap), im=loaded[i]||null;
      if(im) sgCoverImg(x,im,dx,dy,tile,tile,26);
      else { x.save(); sgRound(x,dx,dy,tile,tile,26); x.clip(); const g=x.createLinearGradient(dx,dy,dx+tile,dy+tile); const fb=fbk[i%4]; g.addColorStop(0,fb[0]); g.addColorStop(1,fb[1]); x.fillStyle=g; x.fillRect(dx,dy,tile,tile); x.restore(); }
      x.save(); x.strokeStyle="rgba(26,26,26,0.10)"; x.lineWidth=2; sgRound(x,dx,dy,tile,tile,26); x.stroke(); x.restore();
    }
    if(themes.length){ x.globalAlpha=0.62; x.fillStyle=C.ink; x.textAlign="center"; x.font="italic 400 40px 'Instrument Serif', Georgia, serif"; sgWrap(x, themes.join("   ·   "), W/2, gy+2*tile+gap+92, W-220, 52); x.globalAlpha=1; }
    sgFooter(x,W,H,46);
  }
  async function blob(){ await paint(); return await new Promise(r=>ref.current.toBlob(r,"image/png",0.95)); }
  function dl(b){ const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download="slow-glow-доска.png"; a.click(); setTimeout(()=>URL.revokeObjectURL(u),1500); }
  async function share(){ setBusy(true); sgTrack("share_board"); try{ const b=await blob(); const f=new File([b],"slow-glow.png",{type:"image/png"}); if(navigator.canShare&&navigator.canShare({files:[f]})) await navigator.share({files:[f],text:shareText}); else dl(b); }catch(e){} setBusy(false); }
  async function down(){ setBusy(true); try{ dl(await blob()); }catch(e){} setBusy(false); }
  return (
    <div style={{ borderRadius:18, padding:"15px 16px 16px", marginBottom:22, background:C.cream, border:`1px solid ${C.line}` }}>
      <Label color={ch.partner}>Поделиться доской мечты</Label>
      <p style={{ fontSize:13, color:C.inkSoft, margin:"5px 0 12px", lineHeight:1.45 }}>Твои образы коллажем 9:16 — как разворот журнала. Друзья спросят «откуда это?».</p>
      <button onClick={share} disabled={busy} style={{ width:"100%", height:46, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:14, fontWeight:500, marginBottom:8 }}>{busy?"Готовлю картинку…":"Поделиться в сторис"}</button>
      <button onClick={down} disabled={busy} style={{ width:"100%", height:42, borderRadius:99, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", cursor:"pointer", color:C.ink, fontFamily:body, fontSize:13.5 }}>Скачать картинку</button>
      <canvas ref={ref} style={{ display:"none" }}/>
    </div>
  );
}

/* #4 Тихий список / коллекция → постер-список 9:16 */
function ShareList({ ch, data }){
  const ref = useRef(null);
  const [busy,setBusy]=useState(false);
  const acc = data.accent || ch.partner;
  const rows = (data.blocks||[]).filter(b=>b && b.items && b.items.length && b.k && !b.kind).slice(0,5).map(b=>[b.k, b.items[0].v]);
  const title = data.ru || data.title || "Коллекция";
  const shareText = `«${title}» — коллекция-сценарий из Slow Glow. Ещё больше → slow-glow.app`;
  async function paint(){
    const cv=ref.current, W=1080, H=1920; cv.width=W; cv.height=H; const x=cv.getContext("2d");
    try{ await document.fonts.load("400 96px 'Instrument Serif'"); await document.fonts.load("500 25px Inter"); await document.fonts.ready; }catch(e){}
    sgPaper(x,W,H); sgFrame(x,W,H,46);
    x.textAlign="center"; sgMasthead(x,W,150); sgKicker(x,W,"коллекция",300,acc);
    x.fillStyle=C.ink; x.font="italic 400 94px 'Instrument Serif', Georgia, serif"; sgWrap(x, title, W/2, 430, W-260, 94);
    if(data.sub){ x.globalAlpha=0.6; x.fillStyle=C.ink; x.font="400 32px Inter, sans-serif"; sgWrap(x, data.sub, W/2, 580, W-300, 44); x.globalAlpha=1; }
    const p=110; let y=770; x.textAlign="left";
    rows.forEach((r,i)=>{ x.fillStyle=acc; x.font="400 70px 'Instrument Serif', Georgia, serif"; x.fillText(String(i+1), p, y+6);
      x.globalAlpha=0.5; x.fillStyle=C.ink; x.font="500 25px Inter, sans-serif"; x.fillText(sgSpaced(String(r[0]).toUpperCase()), p+96, y-26); x.globalAlpha=1;
      x.fillStyle=C.ink; x.font="400 42px 'Instrument Serif', Georgia, serif"; x.fillText(sgFit(x, r[1], W-(p+96)-70), p+96, y+32);
      y+=176; });
    x.textAlign="center"; sgFooter(x,W,H,46);
  }
  async function blob(){ await paint(); return await new Promise(r=>ref.current.toBlob(r,"image/png",0.95)); }
  function dl(b){ const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download="slow-glow-коллекция.png"; a.click(); setTimeout(()=>URL.revokeObjectURL(u),1500); }
  async function share(){ setBusy(true); sgTrack("share_list"); try{ const b=await blob(); const f=new File([b],"slow-glow.png",{type:"image/png"}); if(navigator.canShare&&navigator.canShare({files:[f]})) await navigator.share({files:[f],text:shareText}); else dl(b); }catch(e){} setBusy(false); }
  async function down(){ setBusy(true); try{ dl(await blob()); }catch(e){} setBusy(false); }
  return (
    <div style={{ borderRadius:18, padding:"15px 16px 16px", margin:"6px 0 18px", background:C.cream, border:`1px solid ${C.line}` }}>
      <Label color={acc}>Поделиться коллекцией</Label>
      <p style={{ fontSize:13, color:C.inkSoft, margin:"5px 0 12px", lineHeight:1.45 }}>Красивый постер-список 9:16 — такие сохраняют и репостят чаще всего.</p>
      <button onClick={share} disabled={busy} style={{ width:"100%", height:46, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:14, fontWeight:500, marginBottom:8 }}>{busy?"Готовлю картинку…":"Поделиться в сторис"}</button>
      <button onClick={down} disabled={busy} style={{ width:"100%", height:42, borderRadius:99, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", cursor:"pointer", color:C.ink, fontFamily:body, fontSize:13.5 }}>Скачать картинку</button>
      <canvas ref={ref} style={{ display:"none" }}/>
    </div>
  );
}

/* #6 Carnet → «страница дня»: фраза + перевод открыткой 9:16 */
function ShareCarnetPage({ ch, th, rd, lang, words }){
  const ref = useRef(null);
  const [busy,setBusy]=useState(false);
  const pairs = (rd||[]).filter(r=>Array.isArray(r)&&r[0]&&r[1]);
  const hero = pairs.find(r=>String(r[0]).length>=24 && String(r[0]).length<=110) || pairs[0] || ["",""];
  const ws = (words||[]).filter(w=>w&&w[0]).slice(0,3).map(w=>w[0]);
  const shareText = `Учу ${String(lang).toLowerCase()} красиво — по фразе в день в Slow Glow.${(th&&th.theme)?(" Тема: «"+th.theme+"»."):""} slow-glow.app`;
  async function paint(){
    const cv=ref.current, W=1080, H=1920; cv.width=W; cv.height=H; const x=cv.getContext("2d");
    try{ await document.fonts.load("400 92px 'Instrument Serif'"); await document.fonts.load("500 27px Inter"); await document.fonts.ready; }catch(e){}
    sgPaper(x,W,H); sgFrame(x,W,H,46); x.textAlign="center";
    sgMasthead(x,W,150);
    sgKicker(x,W,"carnet · "+lang,320,ch.partner);
    x.fillStyle=C.ink; x.font="italic 400 90px 'Instrument Serif', Georgia, serif"; sgWrap(x, (th&&th.theme)||"страница дня", W/2, 470, W-280, 90);
    sgHair(x, W/2-60, 660, W/2+60, "rgba(26,26,26,0.2)", 2);
    x.fillStyle=C.ink; x.font="400 58px 'Instrument Serif', Georgia, serif"; sgWrap(x, hero[0], W/2, 880, W-240, 72);
    x.globalAlpha=0.62; x.font="italic 400 42px 'Instrument Serif', Georgia, serif"; sgWrap(x, hero[1], W/2, 1140, W-280, 54); x.globalAlpha=1;
    if(ws.length) sgPills(x, W, ws, 1360, 380);
    sgFooter(x,W,H,46);
  }
  async function blob(){ await paint(); return await new Promise(r=>ref.current.toBlob(r,"image/png",0.95)); }
  function dl(b){ const u=URL.createObjectURL(b); const a=document.createElement("a"); a.href=u; a.download="slow-glow-carnet.png"; a.click(); setTimeout(()=>URL.revokeObjectURL(u),1500); }
  async function share(){ setBusy(true); sgTrack("share_carnet"); try{ const b=await blob(); const f=new File([b],"slow-glow.png",{type:"image/png"}); if(navigator.canShare&&navigator.canShare({files:[f]})) await navigator.share({files:[f],text:shareText}); else dl(b); }catch(e){} setBusy(false); }
  async function down(){ setBusy(true); try{ dl(await blob()); }catch(e){} setBusy(false); }
  return (
    <div style={{ borderRadius:18, padding:"15px 16px 16px", margin:"0 0 18px", background:C.cream, border:`1px solid ${C.line}` }}>
      <Label color={ch.partner}>Поделиться страницей дня</Label>
      <p style={{ fontSize:13, color:C.inkSoft, margin:"5px 0 12px", lineHeight:1.45 }}>Фраза дня открыткой 9:16 — тихое «учу язык красиво».</p>
      <button onClick={share} disabled={busy} style={{ width:"100%", height:46, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:14, fontWeight:500, marginBottom:8 }}>{busy?"Готовлю картинку…":"Поделиться в сторис"}</button>
      <button onClick={down} disabled={busy} style={{ width:"100%", height:42, borderRadius:99, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", cursor:"pointer", color:C.ink, fontFamily:body, fontSize:13.5 }}>Скачать картинку</button>
      <canvas ref={ref} style={{ display:"none" }}/>
    </div>
  );
}

/* Фирменная заставка на вход: тёплый живой градиент (butter→coral→pink→sage) на весь экран,
   мягко «дышит» и растворяется в приложении. Тап — пропустить. Уважает prefers-reduced-motion. */
let sgIntroSeen = false;
function SGSplash(){
  const [gone, setGone] = useState(false);
  const [out, setOut] = useState(false);
  const [entered, setEntered] = useState(false);
  useEffect(()=>{
    let reduce=false; try{ reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}
    const raf = requestAnimationFrame(()=>setEntered(true));
    const t1 = setTimeout(()=>setOut(true), reduce?600:1650);
    const t2 = setTimeout(()=>setGone(true), reduce?1000:2380);
    return ()=>{ cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
  },[]);
  if (gone) return null;
  const skip = ()=>{ setOut(true); setTimeout(()=>setGone(true), 460); };
  return (
    <div onClick={skip} style={{ position:"fixed", inset:0, zIndex:9999, overflow:"hidden", cursor:"pointer",
      background:"linear-gradient(165deg,#F7EFD8 0%,#F4ECDE 42%,#EBE5DA 100%)",
      opacity: out?0:1, transition:"opacity 720ms ease", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div className="amb" style={{ position:"absolute", width:"92vw", height:"92vw", left:"-18vw", top:"-12vh", borderRadius:"50%",
        background:`radial-gradient(circle at 42% 40%, ${C.butter}, ${C.coral} 54%, rgba(246,231,166,0) 76%)`, filter:"blur(44px)", opacity:0.92 }}/>
      <div className="amb-b" style={{ position:"absolute", width:"86vw", height:"86vw", right:"-22vw", bottom:"-14vh", borderRadius:"50%",
        background:`radial-gradient(circle at 50% 50%, ${C.pink}, ${C.lilac} 50%, rgba(242,182,198,0) 75%)`, filter:"blur(50px)", opacity:0.85 }}/>
      <div className="amb" style={{ position:"absolute", width:"74vw", height:"74vw", left:"18vw", bottom:"-10vh", borderRadius:"50%",
        background:`radial-gradient(circle at 50% 50%, ${C.seaMist}, ${C.sage} 55%, rgba(203,214,222,0) 74%)`, filter:"blur(54px)", opacity:0.7 }}/>
      <div style={{ position:"relative", textAlign:"center", padding:"0 24px", opacity: out?0:(entered?1:0), transform: out?"translateY(-16px)":(entered?"translateY(0)":"translateY(14px)"), transition:"opacity 720ms ease, transform 920ms cubic-bezier(0.16,1,0.3,1)" }}>
        <div className="floaty" style={{ fontSize:34, color:"#fff", textShadow:"0 0 24px rgba(255,255,255,0.7)", marginBottom:8, lineHeight:1 }}>✦</div>
        <div style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:"clamp(42px,13vw,66px)", color:C.ink, lineHeight:1 }}>Slow Glow</div>
        <div style={{ fontFamily:head, fontSize:11, letterSpacing:"0.34em", textTransform:"uppercase", color:C.inkSoft, marginTop:14 }}>заметь, что красиво</div>
      </div>
    </div>
  );
}

/* Короткая инструкция после регистрации: 3 слайда — что где смотреть. Показывается один раз. */
function IntroTour({ partner, onDone }){
  const [i, setI] = useState(0);
  const slides = [
    { kicker:"Шаг 1 · Сегодня", title:"Твой день начинается здесь", body:"Место дня, ритуалы, колонка редактора и твой спокойный путь к жизни мечты — всё на вкладке «Сегодня»." },
    { kicker:"Шаг 2 · Досуг и карта", title:"Куда пойти под твою эстетику", body:"Карта красивых мест рядом, спорт и языки, коллекции-сценарии на вечер — на вкладке «Досуг»." },
    { kicker:"Шаг 3 · Твоя эстетика", title:"Не понимаешь, что тебя цепляет?", body:"В разделе «Я» открой Анализатор пинов: загрузи любимые сохранения — и ИИ соберёт твою эстетику и доску мечты. Возвращайся сюда, когда меняется настроение." },
  ];
  const last = i === slides.length-1;
  const s = slides[i];
  return (
    <div style={{ position:"fixed", inset:0, zIndex:9000, background:"linear-gradient(165deg,#F7EFD8 0%,#F4ECDE 45%,#EBE5DA 100%)", display:"flex", flexDirection:"column", padding:"0 26px", boxSizing:"border-box" }}>
      <div style={{ display:"flex", justifyContent:"flex-end", paddingTop:"calc(env(safe-area-inset-top, 0px) + 18px)" }}>
        <button onClick={onDone} style={{ border:"none", background:"transparent", cursor:"pointer", fontFamily:head, fontSize:13, color:C.inkSoft }}>Пропустить</button>
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
        <div key={i} className="fade">
          <GlowOrb partner={partner} size={92} spark={true} style={{ margin:"0 auto 28px" }}/>
          <div style={{ fontFamily:head, fontSize:11, letterSpacing:"0.24em", textTransform:"uppercase", color:partner, fontWeight:600, marginBottom:14 }}>{s.kicker}</div>
          <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:32, lineHeight:1.16, color:C.ink, margin:"0 0 15px", maxWidth:340 }}>{s.title}</h2>
          <p style={{ fontSize:15.5, lineHeight:1.6, color:C.inkSoft, margin:"0 auto", maxWidth:332 }}>{s.body}</p>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:18 }}>
        {slides.map((_,k)=>(<div key={k} style={{ width:k===i?22:7, height:7, borderRadius:99, background:k===i?partner:"rgba(26,26,26,0.15)", transition:"width 240ms ease" }}/>))}
      </div>
      <button onClick={()=>{ last?onDone():setI(i+1); }} style={{ width:"100%", height:54, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:16, fontWeight:500, marginBottom:"calc(env(safe-area-inset-bottom, 0px) + 26px)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>{last?"Понятно, начать ✦":"Далее"}{!last && <ArrowRight size={18} strokeWidth={2}/>}</button>
    </div>
  );
}

function InstallPrompt({ partner }) {
  const [deferred, setDeferred] = useState(null);
  const [show, setShow] = useState(false);
  const [iosHelp, setIosHelp] = useState(false);
  const isStandalone = typeof window !== "undefined" && (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true);
  const isIOS = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  useEffect(() => {
    if (isStandalone) return;
    try { if (localStorage.getItem("sg_install_dismissed") === "1") return; } catch (e) {}
    const onBIP = (e) => { e.preventDefault(); setDeferred(e); setShow(true); };
    window.addEventListener("beforeinstallprompt", onBIP);
    let t;
    if (isIOS) t = setTimeout(() => setShow(true), 1600); // iOS Safari не шлёт beforeinstallprompt
    return () => { window.removeEventListener("beforeinstallprompt", onBIP); if (t) clearTimeout(t); };
  }, []);
  if (isStandalone || !show) return null;
  const dismiss = () => { setShow(false); setIosHelp(false); try { localStorage.setItem("sg_install_dismissed", "1"); } catch (e) {} };
  const install = async () => {
    sgTrack("install_click");
    if (deferred) { deferred.prompt(); await deferred.userChoice; setDeferred(null); setShow(false); }
    else if (isIOS) { setIosHelp(true); }
  };
  return (
    <div className="fade" style={{ position:"absolute", left:14, right:14, bottom:96, zIndex:7 }}>
      {!iosHelp ? (
        <div style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 13px", borderRadius:18, background:"rgba(250,248,241,0.96)", backdropFilter:"blur(14px)", boxShadow:"0 18px 40px -18px rgba(26,26,26,0.45), 0 0 0 1px rgba(26,26,26,0.05)" }}>
          <div style={{ flexShrink:0 }}><GlowOrb partner={partner} size={36} spark={true}/></div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.ink, lineHeight:1.25 }}>Slow Glow на экран «Домой»</div>
            <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.01em", color:C.inkSoft, marginTop:2 }}>Открывается как приложение, без браузера</div>
          </div>
          <button onClick={install} style={{ flexShrink:0, border:"none", cursor:"pointer", borderRadius:99, padding:"8px 13px", background:`radial-gradient(circle at 40% 35%, ${C.butter} 0%, ${partner} 78%)`, color:"#fff", fontFamily:head, fontSize:11, fontWeight:600, boxShadow:`0 8px 18px -8px ${partner}` }}>Установить</button>
          <button onClick={dismiss} aria-label="Закрыть" style={{ flexShrink:0, border:"none", background:"transparent", cursor:"pointer", color:C.inkFaint, padding:3, display:"flex" }}><X size={16} strokeWidth={2}/></button>
        </div>
      ) : (
        <div style={{ padding:"14px 16px", borderRadius:18, background:"rgba(250,248,241,0.98)", backdropFilter:"blur(14px)", boxShadow:"0 18px 40px -18px rgba(26,26,26,0.45), 0 0 0 1px rgba(26,26,26,0.05)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.ink }}>Добавить на экран «Домой»</div>
            <button onClick={dismiss} aria-label="Закрыть" style={{ border:"none", background:"transparent", cursor:"pointer", color:C.inkFaint, padding:2, display:"flex" }}><X size={16} strokeWidth={2}/></button>
          </div>
          <div style={{ fontFamily:head, fontSize:12, color:C.inkSoft, lineHeight:1.7 }}>
            1. Нажми <b style={{color:C.ink}}>Поделиться</b> ↑ внизу Safari<br/>
            2. Выбери <b style={{color:C.ink}}>«На экран „Домой"»</b><br/>
            3. Нажми <b style={{color:C.ink}}>«Добавить»</b>
          </div>
        </div>
      )}
    </div>
  );
}
function Referral({ partner, grantTrial, trialActive, trialDaysLeft }) {
  const [code] = useState(() => sgRefCode());
  const [done, setDone] = useState(false);
  const link = (typeof window !== "undefined" ? window.location.origin : "https://slowglow.app") + "/?ref=" + code;
  const share = async () => {
    grantTrial(7, "referral_share");
    setDone(true); sgTrack("referral_share");
    const text = "Я живу красиво со Slow Glow ✦ Дарю тебе 7 дней Plus — заходи:";
    try {
      if (navigator.share) await navigator.share({ title: "Slow Glow", text, url: link });
      else await navigator.clipboard.writeText(link);
    } catch (e) {}
  };
  const copy = async () => { try { await navigator.clipboard.writeText(link); setDone(true); } catch (e) {} };
  return (
    <div style={{ borderRadius:20, padding:"16px 18px", marginBottom:14, background:`linear-gradient(125deg, rgba(247,235,176,0.45), ${hexA(partner,0.20)})`, border:`1px solid ${C.line}` }}>
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
        <GlowOrb partner={partner} size={38} spark={true}/>
        <div style={{ flex:1, minWidth:0 }}>
          <Label color={C.inkSoft}>Приведи подругу</Label>
          <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, marginTop:2, lineHeight:1.2 }}>7 дней Plus — вам обеим</div>
        </div>
      </div>
      <p style={{ fontFamily:head, fontSize:11.5, color:C.inkSoft, lineHeight:1.5, margin:"0 0 12px" }}>
        Поделись ссылкой — подруга получит 7 дней Slow Glow Plus, и тебе тоже подарим 7 дней ✦
      </p>
      {trialActive && (
        <div style={{ fontFamily:head, fontSize:11, color:C.ink, background:"rgba(255,255,255,0.6)", borderRadius:10, padding:"7px 11px", marginBottom:10, display:"inline-block" }}>
          Твой Plus активен ещё {trialDaysLeft} {plural(trialDaysLeft,"день","дня","дней")} ✦
        </div>
      )}
      <button onClick={share} className="pop" style={{ width:"100%", border:"none", cursor:"pointer", borderRadius:99, padding:"12px 16px", background:`radial-gradient(circle at 38% 30%, ${C.butter} 0%, ${partner} 78%)`, color:"#fff", fontFamily:head, fontSize:12.5, fontWeight:600, letterSpacing:"0.03em", boxShadow:`0 10px 22px -10px ${partner}`, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
        <Send size={15} strokeWidth={2}/> {done ? "7 дней Plus активированы ✦" : "Поделиться ссылкой"}
      </button>
      {done && (
        <button onClick={copy} style={{ width:"100%", marginTop:8, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", cursor:"pointer", borderRadius:12, padding:"9px 12px", fontFamily:head, fontSize:10.5, color:C.inkSoft, letterSpacing:"0.02em", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
          {link} · нажми, чтобы скопировать
        </button>
      )}
    </div>
  );
}
const SG_ICON_192 = "data:image/png;base64,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";
const SG_ICON_512 = "data:image/png;base64,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";
function sgSetupPWA(){
  if (typeof document === "undefined") return;
  try {
    const head = document.head || document.getElementsByTagName("head")[0];
    const ensureMeta = (name, content, attr) => { attr = attr || "name"; let m = document.querySelector(`meta[${attr}="${name}"]`); if (!m){ m=document.createElement("meta"); m.setAttribute(attr,name); head.appendChild(m); } m.setAttribute("content", content); };
    const ensureLink = (rel, href, extra) => { extra = extra || {}; let sel = `link[rel="${rel}"]`; let l = document.querySelector(sel); if (!l){ l=document.createElement("link"); l.setAttribute("rel",rel); Object.keys(extra).forEach(k=>l.setAttribute(k,extra[k])); head.appendChild(l); } l.setAttribute("href",href); };
    if (!document.title) document.title = "Slow Glow";
    ensureMeta("theme-color", "#FAF8F1");
    ensureMeta("apple-mobile-web-app-capable", "yes");
    ensureMeta("mobile-web-app-capable", "yes");
    ensureMeta("apple-mobile-web-app-status-bar-style", "default");
    ensureMeta("apple-mobile-web-app-title", "Slow Glow");
    let vp = document.querySelector('meta[name="viewport"]'); if (!vp){ vp=document.createElement("meta"); vp.setAttribute("name","viewport"); head.appendChild(vp); } vp.setAttribute("content","width=device-width, initial-scale=1, viewport-fit=cover");
    ensureLink("apple-touch-icon", SG_ICON_192);
    ensureLink("icon", SG_ICON_192, { type:"image/png" });
    if (!document.querySelector('link[rel="manifest"]')) {
      const manifest = { name:"Slow Glow — живи красиво", short_name:"Slow Glow", description:"Эстетика медленной красивой жизни: ритуалы, рубрики, путешествия и вдохновение.", start_url:".", scope:".", display:"standalone", orientation:"portrait", background_color:"#FAF8F1", theme_color:"#FAF8F1", lang:"ru", icons:[ { src:SG_ICON_192, sizes:"192x192", type:"image/png", purpose:"any" }, { src:SG_ICON_512, sizes:"512x512", type:"image/png", purpose:"any" }, { src:SG_ICON_512, sizes:"512x512", type:"image/png", purpose:"maskable" } ] };
      const mUrl = URL.createObjectURL(new Blob([JSON.stringify(manifest)], { type:"application/manifest+json" }));
      const ml = document.createElement("link"); ml.setAttribute("rel","manifest"); ml.setAttribute("href",mUrl); head.appendChild(ml);
    }
  } catch(e){}
}

class SGErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError:false }; }
  static getDerivedStateFromError(){ return { hasError:true }; }
  componentDidCatch(err){
    try{ console.error("SlowGlow error:", err); }catch(e){}
    // Одноразовое авто-восстановление: чаще всего экран падает из-за устаревшего кэша после
    // обновления. Пробуем сбросить кэш+SW и перезагрузиться автоматически — но только один раз
    // за сессию, чтобы не зациклиться, если ошибка настоящая.
    try{
      if(!sessionStorage.getItem("sg_autoheal")){
        sessionStorage.setItem("sg_autoheal","1");
        this.hardReset();
      }
    }catch(e){}
  }
  async hardReset(){
    // Безопасный сброс: дожидаемся реального удаления кэша и service worker (обычная причина
    // залипшего белого экрана), но НЕ трогаем localStorage — профиль и прогресс остаются.
    try {
      if (window.caches && caches.keys) { const ks = await caches.keys(); await Promise.all(ks.map(k=>caches.delete(k))); }
    } catch(e){}
    try {
      if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) { const rs = await navigator.serviceWorker.getRegistrations(); await Promise.all(rs.map(r=>r.unregister())); }
    } catch(e){}
    try{ location.reload(); }catch(e){ try{ window.location.href = window.location.pathname + "?fresh=" + Date.now(); }catch(_){} }
  }
  render(){
    if (!this.state.hasError) return this.props.children;
    const wrap = { minHeight:"100dvh", display:"flex", alignItems:"center", justifyContent:"center", padding:24, background:C.cream, fontFamily:body };
    const card = { maxWidth:360, textAlign:"center" };
    const btn = { width:"100%", height:48, borderRadius:99, border:"none", cursor:"pointer", fontFamily:head, fontSize:15, fontWeight:500 };
    return (
      <div style={wrap}>
        <div style={card}>
          <div style={{ fontSize:34, marginBottom:8 }}>✦</div>
          <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:24, color:C.ink, margin:"0 0 8px" }}>Минутка тишины</h2>
          <p style={{ fontSize:14.5, lineHeight:1.6, color:C.inkSoft, margin:"0 0 20px" }}>Что-то на этом экране сбилось — так бывает после обновления. Обнови страницу, и красота вернётся. Твой профиль и прогресс бережно сохранены.</p>
          <button onClick={()=>{ try{ location.reload(); }catch(e){} }} style={{ ...btn, background:C.ink, color:C.cream, marginBottom:10 }}>Перезагрузить</button>
          <button onClick={()=>this.hardReset()} style={{ ...btn, background:"transparent", color:C.inkSoft, border:`1px solid ${C.line}` }}>Очистить кэш и перезагрузить</button>
        </div>
      </div>
    );
  }
}

export default function SlowGlowApp(){
  return <SGErrorBoundary><SlowGlowAppMain/></SGErrorBoundary>;
}

function SlowGlowAppMain() {
  const [onboarded, setOnboarded] = useState(()=> sgStore.get("sg_onboarded", false));
  const [tutorialSeen, setTutorialSeen] = useState(()=> sgStore.get("sg_tutorial", false));
  const [boards, setBoards] = useState(()=> sgStore.get("sg_boards", []));
  const [dna, setDna] = useState(null);
  useEffect(() => {
    if (dna || !boards || !boards.length) return;
    const imgs = boards.filter(b=>b && b.url && /^data:image/.test(b.url)).slice(0,5);
    if (!imgs.length) return;
    let cancelled = false;
    (async () => {
      try {
        const content = imgs.map(b=>{ const m=(b.url.match(/^data:(.*?);base64,/)||[])[1]||"image/jpeg"; return { type:"image", source:{ type:"base64", media_type:m, data:b.url.split(",")[1] } }; });
        for(let _i=0;_i<content.length;_i++){ content[_i]=await sgShrinkBlock(content[_i]); }
        content.push({ type:"text", text:'Это мудборд мечты пользовательницы — фото эстетики жизни, к которой она стремится. ВАЖНО: опирайся только на то, что РЕАЛЬНО видно на этих фото; не добавляй типовых «красивых» деталей (свечи, книги, цветы, кофе), если их нет на снимках. Разбери фото вместе и верни ТОЛЬКО JSON без markdown по-русски: {"themes":[3-5 коротких повторяющихся тем или паттернов её эстетики, например «свежие цветы», «медленные завтраки у окна», «лён и нейтральная палитра»],"steps":[16 разных маленьких конкретных шагов на каждый день, которые приближают её реальную жизнь к этим образам — по одному тёплому действию, начинай с глагола, без токсичной продуктивности и без нумерации]}.' });
        const r = await fetch(AI_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, system:"Ты — Slow Glow. Разбираешь визуальную эстетику по фото и превращаешь её в маленькие тёплые шаги для реальной жизни. Ты никогда не приписываешь фото того, чего на них нет: сначала внимательно смотришь, что реально изображено, и строишь ответ только на этом.", messages:[{ role:"user", content }] }) });
        const d = await r.json();
        const raw = (d.content||[]).filter(x=>x.type==="text").map(x=>x.text).join("");
        const obj = sgParseJSON(raw);
        if (!cancelled && obj && obj.steps && obj.steps.length) setDna(obj);
      } catch(e) {}
    })();
    return () => { cancelled = true; };
  }, [boards, dna]);
  const [userPlaces, setUserPlaces] = useState([]);
  const [addPlace, setAddPlace] = useState(false);
  const [mind, setMind] = useState(false);
  const [collection, setCollection] = useState(null);
  const [wardrobe, setWardrobe] = useState([]);
  const [profile, setProfile] = useState(()=> sgStore.get("sg_profile", { name:"", age:"", city:"Москва", diet:[], skin:"", rhythm:"", pet:"" }));
  const [tab, setTab] = useState("home");
  const [chapterId, setChapterId] = useState(()=> sgStore.get("sg_chapter", "summer"));
  const [moments, setMoments] = useState(()=> sgStore.get("sg_moments", [
    { t:4, cap:"Букет на столе", date:"вчера" },{ t:3, cap:"Лимоны с рынка", date:"3 дня назад" },
    { t:1, cap:"Книга у моря", date:"на неделе" },{ t:5, cap:"Кофе у окна", date:"на неделе" },
  ]));
  useEffect(()=>{ /* дневник сохраняется между сессиями; при приближении к лимиту localStorage жертвуем фото самых старых записей, подписи остаются */
    try{
      let list = moments.slice(0, 60);
      let raw = JSON.stringify(list); let guard = 0;
      while(raw.length > 3500000 && guard < 70){
        const ridx = [...list].reverse().findIndex(m=>m && m.url);
        if(ridx < 0) break;
        const real = list.length - 1 - ridx;
        list = list.map((m,i)=> i===real ? { ...m, url:"", t:(typeof m.t==="number" ? m.t : (m.id||i)%6) } : m);
        raw = JSON.stringify(list); guard++;
      }
      sgStore.set("sg_moments", list);
    }catch(e){}
  }, [moments]);
  const [celebrate, setCelebrate] = useState(false);
  const [ask, setAsk] = useState(false);
  const [rubric, setRubric] = useState(null);
  const [pinOpen, setPinOpen] = useState(false);
  const [feed, setFeed] = useState(false);
  const [world, setWorld] = useState(null);
  const [detail, setDetail] = useState(null);
  const [saved, setSaved] = useState(()=> sgStore.get("sg_saved", []));
  const [savedOpen, setSavedOpen] = useState(false);
  const isSaved = (id) => saved.some(s=>s.id===id);
  const toggleSave = (item) => setSaved(arr => { const next = arr.some(s=>s.id===item.id) ? arr.filter(s=>s.id!==item.id) : [item, ...arr]; sgStore.set("sg_saved", next); return next; });
  const [streak, setStreak] = useState(()=> sgStore.get("sg_streak", { n:0, last:"" }));
  const bumpStreak = () => setStreak(s=>{ const t=new Date().toISOString().slice(0,10); if(s.last===t) return s; const y=new Date(Date.now()-864e5).toISOString().slice(0,10); const next={ n: s.last===y ? (s.n||0)+1 : 1, last:t }; sgStore.set("sg_streak", next); sgTrack("streak",{n:next.n}); return next; });
  const [premium, setPremium] = useState(true);        // ранний доступ: всё открыто бесплатно
  const [earlyAccess, setEarlyAccess] = useState(true); // true = бесплатный премиум новичка (для плашки)
  const [trialUntil, setTrialUntil] = useState(()=> sgStore.get("sg_trial_until", 0));
  const trialActive = trialUntil > Date.now();
  const trialDaysLeft = Math.max(0, Math.ceil((trialUntil - Date.now())/864e5));
  const grantTrial = (days=7, why="trial") => {
    sgTrack("trial_start", { days, why });
    const next = Math.max(Date.now(), trialUntil) + days*864e5;
    setTrialUntil(next); sgStore.set("sg_trial_until", next);
    setPremium(true); sgTrack(why, { days });
  };
  useEffect(()=>{ // переход по реферальной ссылке ?ref= → 7 дней Plus новому пользователю
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref) {
        if (ref !== sgRefCode() && !sgStore.get("sg_ref_redeemed", false)) {
          sgStore.set("sg_ref_redeemed", true); sgStore.set("sg_ref_from", ref);
          grantTrial(7, "referral_redeem");
        }
        window.history.replaceState({}, "", window.location.pathname); // убираем ?ref= из адреса
      }
    } catch(e){}
  }, []);
  useEffect(()=>{ sgSetupPWA(); }, []); // делает приложение устанавливаемым на домашний экран (PWA)
  useEffect(()=>{ try{ sgStore.set("sg_profile", profile); }catch(e){} }, [profile]); // помним анкету
  useEffect(()=>{ try{ sgStore.set("sg_chapter", chapterId); }catch(e){} }, [chapterId]); // помним выбранную главу
  const [paywall, setPaywall] = useState(null);
  const [travel, setTravel] = useState(false);
  const [stylist, setStylist] = useState(false);
  const [scan, setScan] = useState(false);
  const [sport, setSport] = useState(false);
  const [lang, setLang] = useState(false);
  const [pets, setPets] = useState(false);
  const [art, setArt] = useState(false);

  const fileRef = useRef(null);
  const scrollRef = useRef(null);
  const ch = CHAPTERS[chapterId] || CHAPTERS.summer; // защита: невалидный сохранённый id больше не роняет приложение

  useEffect(() => {
    // Шрифты подключены локально через @font-face в index.html (public/fonts/).
    // Никаких загрузок с Google Fonts / Fontshare — приложение открывается в РФ без VPN.
  }, []);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [tab]);

  // ── Живая ежедневная ротация: обновляем контент при возврате в приложение и в полночь ──
  const [, setDayTick] = useState(0);
  useEffect(() => {
    const refresh = () => { if (sgRefreshDay()) setDayTick(t=>t+1); };
    const onVis = () => { if (!document.hidden) refresh(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("focus", refresh);
    const iv = setInterval(refresh, 60000); // ловим смену суток в течение минуты
    return () => { document.removeEventListener("visibilitychange", onVis); window.removeEventListener("focus", refresh); clearInterval(iv); };
  }, []);

  const capture = (e) => {
    const f = (e.target.files||[])[0]; if (!f) return;
    const id = Date.now();
    const h = new Date().getHours();
    const pool = h<11 ? ["Тёплое утро","Медленное утро","Свет нового дня","Утренний кадр"]
              : h<17 ? ["Момент среди дня","Маленькая пауза","Красивый день","Кадр для себя"]
              : h<22 ? ["Тёплый вечер","Уютный вечер","Мягкий свет вечера","Вечерний момент"]
              :        ["Тихая ночь","Поздний кадр","Спокойствие ночи","Момент перед сном"];
    const cap = pool[id % pool.length];
    shrinkImage(f, 1280, 0.82)
      .then(url=>{ setMoments(m=>[{ id, url, cap, date:"только что" }, ...m]); })
      .catch(()=>{ setMoments(m=>[{ id, url:"", cap, date:"только что" }, ...m]); });
    setCelebrate(true); setTimeout(()=>setCelebrate(false), 2200); setTab("journal");
  };

  const NAV = [
    { id:"home", icon:Home, label:"Сегодня" }, { id:"pin", icon:Sparkles, label:"Анализ" },
    { id:"add", icon:Plus, label:"" }, { id:"tools", icon:LayoutGrid, label:"Инструменты" }, { id:"me", icon:User, label:"Я" },
  ];

  return (
    <div className="page-grad" style={{ minHeight:"100dvh", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", padding:"12px",
      background:"linear-gradient(165deg,#F7EFD8 0%,#F1ECE0 45%,#DCE6EA 100%)", fontFamily:body, color:C.ink, boxSizing:"border-box" }}>
      <SGSplash/>
      {onboarded && !tutorialSeen && <IntroTour partner={ch.partner} onDone={()=>{ setTutorialSeen(true); sgStore.set("sg_tutorial", true); }}/>}
      <style>{`
        @keyframes orbBreath{0%,100%{transform:scale(1);opacity:0.9}50%{transform:scale(1.07);opacity:1}}
        .orb{animation:orbBreath 5s ease-in-out infinite}
        @keyframes sparkT{0%,100%{opacity:0.7;transform:translate(-50%,-50%) scale(0.92)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}
        .spark{animation:sparkT 3.4s ease-in-out infinite}
        @keyframes ambDrift{0%{transform:translate(-6%,-3%) scale(1)}50%{transform:translate(7%,5%) scale(1.18)}100%{transform:translate(-6%,-3%) scale(1)}}
        .amb{animation:ambDrift 22s ease-in-out infinite}
        @keyframes amb2{0%{transform:translate(5%,3%) scale(1.1)}50%{transform:translate(-7%,-5%) scale(1)}100%{transform:translate(5%,3%) scale(1.1)}}
        .amb-b{animation:amb2 28s ease-in-out infinite}
        @keyframes fadeUp{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeUp 500ms cubic-bezier(0.16,1,0.3,1) both}
        @keyframes screenIn{0%{opacity:0;transform:translateY(14px) scale(0.99)}100%{opacity:1;transform:translateY(0) scale(1)}}
        .screen{animation:screenIn 440ms cubic-bezier(0.16,1,0.3,1) both}
        @keyframes pop{0%{transform:scale(0.9);opacity:0}60%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}
        @keyframes stampIn{0%{opacity:0;transform:scale(1.7) rotate(-16deg)}60%{opacity:1;transform:scale(0.94) rotate(-3deg)}100%{opacity:1;transform:scale(1) rotate(-5deg)}}
        .pop{animation:pop 360ms cubic-bezier(0.16,1,0.3,1) both}
        @keyframes colIn{0%{opacity:0;transform:translateY(18px) scale(0.94)}100%{opacity:1;transform:translateY(0) scale(1)}}
        .col-in{animation:colIn 620ms cubic-bezier(0.16,1,0.3,1) both}
        @keyframes mqUp{0%{transform:translateY(0)}100%{transform:translateY(-50%)}}
        .mq-up{animation:mqUp 30s linear infinite}
        @keyframes mqDown{0%{transform:translateY(-50%)}100%{transform:translateY(0)}}
        .mq-down{animation:mqDown 30s linear infinite}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .floaty{animation:floatY 4.6s ease-in-out infinite}
        @keyframes celeb{0%{opacity:0}14%{opacity:1}80%{opacity:1}100%{opacity:0}}
        .celeb{animation:celeb 2200ms ease both}
        @keyframes sheetUp{0%{transform:translateY(100%)}100%{transform:translateY(0)}}
        .sheet{animation:sheetUp 360ms cubic-bezier(0.16,1,0.3,1) both}
        .sg-scroll::-webkit-scrollbar{width:0}.sg-scroll{scrollbar-width:none}
        .row::-webkit-scrollbar{height:0}.row{scrollbar-width:none}
        @keyframes aiPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
        .ai-pulse{animation:aiPulse 1.8s ease-in-out infinite}
        @keyframes aiRing{0%{transform:scale(0.6);opacity:0.6}70%{opacity:0}100%{transform:scale(1.9);opacity:0}}
        .ai-ring{animation:aiRing 1.8s ease-out infinite}
        @keyframes sgShimmer{0%{background-position:-180px 0}100%{background-position:180px 0}}
        .sg-shimmer{background:linear-gradient(90deg,#A39E93 25%,#1A1A1A 50%,#A39E93 75%);background-size:180px 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:sgShimmer 1.6s linear infinite}
        @keyframes sgDot{0%,80%,100%{opacity:0.25}40%{opacity:1}}
        .sg-d1{animation:sgDot 1.2s ease-in-out infinite}.sg-d2{animation:sgDot 1.2s ease-in-out 0.2s infinite}.sg-d3{animation:sgDot 1.2s ease-in-out 0.4s infinite}
        button{-webkit-tap-highlight-color:transparent;transition:transform 150ms cubic-bezier(0.2,0.8,0.2,1)}
        button:active{transform:scale(0.98)}
        .tap{transition:transform 160ms cubic-bezier(0.2,0.8,0.2,1)}
        .tap:active{transform:scale(0.96)}
        .navbtn{transition:transform 200ms cubic-bezier(0.2,0.8,0.2,1)}
        .navbtn:active{transform:scale(0.88)}
        .navpill{transition:width 280ms cubic-bezier(0.2,0.8,0.2,1),background 280ms ease,opacity 220ms ease}
        @keyframes navDot{0%{transform:scale(0) translateY(2px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}
        .nav-dot{animation:navDot 300ms cubic-bezier(0.2,0.8,0.2,1) both}
        .hdr-fade{animation:fadeUp 700ms cubic-bezier(0.16,1,0.3,1) both}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .anim-grad{background-size:240% 240%;animation:gradShift 10s ease infinite}
        @keyframes gradShiftFast{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .anim-grad-f{background-size:200% 200%;animation:gradShiftFast 6s ease infinite}
        @keyframes sheenSweep{0%{transform:translateX(-140%) skewX(-18deg)}55%,100%{transform:translateX(260%) skewX(-18deg)}}
        .sheen{position:relative;overflow:hidden}
        .sheen::after{content:"";position:absolute;top:0;bottom:0;left:0;width:42%;background:linear-gradient(105deg,transparent,rgba(255,255,255,0.45),transparent);transform:translateX(-140%) skewX(-18deg);animation:sheenSweep 4.6s ease-in-out infinite;pointer-events:none}
        .st1{animation:fadeUp 480ms cubic-bezier(0.16,1,0.3,1) 40ms both}.st2{animation:fadeUp 480ms cubic-bezier(0.16,1,0.3,1) 110ms both}.st3{animation:fadeUp 480ms cubic-bezier(0.16,1,0.3,1) 180ms both}.st4{animation:fadeUp 480ms cubic-bezier(0.16,1,0.3,1) 250ms both}.st5{animation:fadeUp 480ms cubic-bezier(0.16,1,0.3,1) 320ms both}.st6{animation:fadeUp 480ms cubic-bezier(0.16,1,0.3,1) 390ms both}
        @keyframes heartBeat{0%,100%{transform:scale(1)}12%{transform:scale(1.22)}24%{transform:scale(1)}36%{transform:scale(1.12)}48%{transform:scale(1)}}
        .beat{display:inline-flex;animation:heartBeat 2.8s ease-in-out infinite}
        .page-grad{background-size:200% 200% !important;animation:gradShift 26s ease infinite}
        @keyframes pulseSoft{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.06);opacity:0.85}}
        .pulseSoft{animation:pulseSoft 2.4s ease-in-out infinite}
        .tapPop{transition:transform .12s ease}
        .tapPop:active{transform:scale(0.97)}
        @keyframes heartPop{0%{transform:scale(0.3);opacity:0}30%{transform:scale(1.25);opacity:1}55%{transform:scale(1);opacity:1}100%{transform:scale(1);opacity:0}}
        .heartPop{animation:heartPop 750ms cubic-bezier(0.16,1,0.3,1) both;pointer-events:none}
        @keyframes dustFloat{0%,100%{transform:translate(0,0) scale(1);opacity:0}14%{opacity:0.85}50%{transform:translate(10px,-18px) scale(1.18);opacity:0.95}86%{opacity:0}}
        .dust{position:absolute;border-radius:99px;pointer-events:none;animation:dustFloat 7s ease-in-out infinite}
        @keyframes petalFall{0%{transform:translateY(-10px) translateX(0) rotate(0deg);opacity:0}8%{opacity:0.95}55%{transform:translateY(200px) translateX(12px) rotate(150deg);opacity:0.9}100%{transform:translateY(390px) translateX(-8px) rotate(280deg);opacity:0}}
        .petal{position:absolute;top:-16px;width:10px;height:14px;border-radius:60% 40% 55% 45%/60% 50% 50% 40%;opacity:0;animation:petalFall linear both;pointer-events:none}
        @keyframes gradSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .grad-spin{animation:gradSpin 14s linear infinite}
        @keyframes sgWordIn{0%{opacity:0;transform:translateY(12px) scale(0.985);filter:blur(7px)}100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
        @keyframes greetRise{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
        .greet-in{animation:greetRise 1000ms cubic-bezier(0.16,1,0.3,1) both;animation-delay:1.25s}
        @keyframes sproutGrow{0%{transform:scaleY(0) translateY(8px);opacity:0}60%{transform:scaleY(1.05) translateY(0);opacity:1}100%{transform:scaleY(1) translateY(0);opacity:1}}
        .sprout{transform-origin:bottom center;animation:sproutGrow 1100ms cubic-bezier(0.16,1,0.3,1) both}
        @keyframes leafPop{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
        .leaf{animation:leafPop 500ms cubic-bezier(0.16,1,0.3,1) both}
        @keyframes gradShift{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        .grad-text{background:linear-gradient(90deg,#1A1A1A,#C9885F,#E0A6B8,#9FB4D0,#1A1A1A);background-size:200% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:gradShift 5s linear infinite}
        @keyframes ctaRise{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}
        .cta-rise{animation:ctaRise 700ms cubic-bezier(0.16,1,0.3,1) both}
        @keyframes loadPulse{0%,100%{transform:scale(0.94)}50%{transform:scale(1.12)}}
        .load-pulse{animation:loadPulse 1.5s ease-in-out infinite}
        @keyframes petalDraw{0%{stroke-dashoffset:64;opacity:0}50%{opacity:1}100%{stroke-dashoffset:0;opacity:1}}
        .petal{stroke-dashoffset:64;animation:petalDraw 800ms ease forwards}
        @keyframes writeReveal{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0 0 0)}}
        .hello-write{clip-path:inset(0 100% 0 0);animation:writeReveal 1300ms cubic-bezier(0.4,0,0.2,1) forwards}
        @keyframes corePop{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
        .core{transform-box:fill-box;transform-origin:center;animation:corePop 400ms cubic-bezier(0.16,1,0.3,1) forwards}
        @keyframes glowReveal{0%{opacity:0}100%{opacity:1}}
        .glow-wrap{animation:glowReveal 1700ms ease both;animation-delay:0.2s}
        @keyframes glowMorph{0%{border-radius:58% 42% 55% 45% / 52% 56% 44% 48%;transform:scale(0.96);opacity:0.78}50%{border-radius:46% 54% 47% 53% / 58% 45% 55% 42%;transform:scale(1.12);opacity:1}100%{border-radius:58% 42% 55% 45% / 52% 56% 44% 48%;transform:scale(0.96);opacity:0.78}}
        .glow-morph{animation:glowMorph 7s ease-in-out infinite}
        .glow-morph2{animation:glowMorph 9.5s ease-in-out infinite reverse}
        @keyframes haloPulse{0%{transform:scale(0.55);opacity:0.5}70%{opacity:0}100%{transform:scale(2);opacity:0}}
        .halo{animation:haloPulse 3.2s ease-out infinite}
        @keyframes sparkIn{0%{opacity:0;transform:scale(0.55)}100%{opacity:1;transform:scale(1)}}
        .spark-in{animation:sparkIn 1500ms cubic-bezier(0.16,1,0.3,1) both;animation-delay:0.7s}
        @keyframes sparkBreath{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
        .spark-breath{animation:sparkBreath 3.4s ease-in-out infinite;animation-delay:2s}
        @keyframes partFloat{0%{opacity:0;transform:translateY(8px) scale(0.5)}45%{opacity:0.9;transform:translateY(-4px) scale(1)}100%{opacity:0;transform:translateY(-16px) scale(0.5)}}
        .particle{animation-name:partFloat;animation-timing-function:ease-in-out;animation-iteration-count:infinite;opacity:0}
        @keyframes fadeBlur{0%{opacity:0;filter:blur(13px);transform:translateY(12px)}100%{opacity:1;filter:blur(0);transform:translateY(0)}}
        .fade-blur{animation:fadeBlur 1300ms cubic-bezier(0.22,1,0.36,1) both}
        @keyframes springUp{0%{opacity:0;transform:translateY(54px)}55%{opacity:1;transform:translateY(-7px)}78%{transform:translateY(2px)}100%{opacity:1;transform:translateY(0)}}
        .spring-up{animation:springUp 1000ms cubic-bezier(0.34,1.56,0.64,1) both}
        @keyframes orbZoom{0%{transform:translate(-50%,-50%) scale(0.08);opacity:0}55%{opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        .orb-zoom{animation:orbZoom 2600ms cubic-bezier(0.2,0.8,0.2,1) both;animation-delay:0.15s}
        @keyframes orbBreathe2{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
        .orb-breathe{animation:orbBreathe2 6s ease-in-out infinite;animation-delay:2.8s}
        @media (prefers-reduced-motion: reduce){.petal,.hello-write,.core,.glow-wrap,.glow-morph,.glow-morph2,.halo,.spark-in,.spark-breath,.particle,.fade-blur,.spring-up,.orb-zoom,.orb-breathe{animation:none;stroke-dashoffset:0;clip-path:none;opacity:1;transform:none;filter:none}.orb-zoom{transform:translate(-50%,-50%)}}
      `}</style>

      <div style={{ width:"100%", maxWidth:390, height:810, maxHeight:"calc(100dvh - 24px)", borderRadius:46, overflow:"hidden", position:"relative",
        display:"flex", flexDirection:"column", background:C.cream,
        boxShadow:"0 50px 90px -36px rgba(26,26,26,0.4), 0 0 0 1px rgba(26,26,26,0.04)" }}>

        <div aria-hidden="true" style={{ position:"absolute", inset:0, zIndex:0, overflow:"hidden" }}>
          <div className="amb" style={{ position:"absolute", left:"-10%", top:"-6%", width:"90%", height:"50%", background:`radial-gradient(circle, ${C.butter} 0%, ${ch.partner} 42%, transparent 70%)`, filter:"blur(54px)", opacity:0.5 }}/>
          {[[8,4,5,0],[22,11,3,1.6],[38,6,4,3.1],[57,13,3,0.8],[72,5,5,2.3],[86,10,3,4]].map((d,k)=>(<span key={k} className="dust" style={{ left:d[0]+"%", top:d[1]+"%", width:d[2], height:d[2], background:`radial-gradient(circle, rgba(255,255,255,0.95), ${ch.partner})`, animationDelay:d[3]+"s", animationDuration:(6+k%3)+"s" }}/>))}
          <div className="amb-b" style={{ position:"absolute", right:"-16%", top:"40%", width:"80%", height:"46%", background:`radial-gradient(circle, ${ch.partner} 0%, transparent 66%)`, filter:"blur(60px)", opacity:0.35 }}/>
          <div className="amb" style={{ position:"absolute", left:"-6%", bottom:"4%", width:"70%", height:"38%", background:`radial-gradient(circle, ${C.butter} 0%, transparent 66%)`, filter:"blur(56px)", opacity:0.3 }}/>
        </div>

        <div aria-hidden="true" style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none", opacity:0.05, mixBlendMode:"multiply", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")` }}/>

        {!onboarded ? (
          <Onboarding profile={profile} setProfile={setProfile} onDone={(cid,imgs)=>{ setChapterId(cid); sgStore.set("sg_chapter", cid); if(imgs&&imgs.length){ setBoards(imgs); sgStore.set("sg_boards", imgs); } sgStore.set("sg_profile", profile); setOnboarded(true); sgStore.set("sg_onboarded", true); sgTrack("onboarding_done"); setTimeout(()=>setPinOpen(true), 450); }} />
        ) : (
          <>
            <div style={{ position:"relative", zIndex:3, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"20px 24px 8px", flexShrink:0 }}>
              <div>
                <div style={{ fontFamily:head, fontSize:13, letterSpacing:"0.36em", fontWeight:500, color:C.ink }}>SLOW GLOW</div>
                <div style={{ fontFamily:head, fontSize:8.5, letterSpacing:"0.34em", color:C.inkFaint, marginTop:3 }}>LIVE BEAUTIFULLY</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:2 }}>
                <button onClick={()=>setTab("journal")} aria-label="Журнал" style={{ border:"none", background:"transparent", cursor:"pointer", padding:6, display:"flex", alignItems:"center" }}>
                  <Clock size={20} strokeWidth={1.7} color={tab==="journal"?ch.partner:C.inkFaint}/>
                </button>
                <button onClick={()=>setSavedOpen(true)} aria-label="Сохранённое" style={{ position:"relative", border:"none", background:"transparent", cursor:"pointer", padding:6, display:"flex", alignItems:"center" }}>
                  <span className={saved.length?"beat":""}><Heart size={20} strokeWidth={1.7} color={saved.length?ch.partner:C.inkFaint} fill={saved.length?ch.partner:"none"}/></span>
                  {saved.length>0 && <span style={{ position:"absolute", top:-1, right:-1, minWidth:15, height:15, padding:"0 3px", borderRadius:99, background:C.ink, color:C.cream, fontFamily:head, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center" }}>{saved.length}</span>}
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="sg-scroll" style={{ position:"relative", zIndex:2, flex:1, overflowY:"auto", padding:"6px 24px 100px" }}>
              <div key={tab} className="screen">
                {tab==="home" && <Home_ ch={ch} profile={profile} dna={dna} earlyAccess={earlyAccess} setRubric={setRubric} setPin={setPinOpen} setDetail={setDetail} premium={premium} openTravel={()=>premium?setTravel(true):setPaywall("travel")} openMind={()=>setMind(true)} openCollection={()=>setCollection(capsuleOfWeek())} openLibrary={()=>setTab("collections")} streak={streak.n} bump={bumpStreak} openFeed={()=>setFeed(true)} onLive={(label)=>{ bumpStreak(); setMoments(m=>[{ id:Date.now(), t:(Date.now()%6), cap:label, date:"сегодня" }, ...m]); setCelebrate(true); setTimeout(()=>setCelebrate(false),2000); }} />}
                {tab==="places" && <Places_ profile={profile} partner={ch.partner} chId={ch.id} userPlaces={userPlaces} openAddPlace={()=>setAddPlace(true)} onEditPlace={(p)=>setAddPlace(p)} onDeletePlace={(id)=>setUserPlaces(prev=>prev.filter(x=>x.id!==id))} setDetail={setDetail} premium={premium} openScan={()=>premium?setScan(true):setPaywall("scan")} openSport={()=>setSport(true)} openLang={()=>setLang(true)} openPets={()=>setPets(true)} openMind={()=>setMind(true)} toggleSave={toggleSave} isSaved={isSaved} />}
                {tab==="journal" && <Journal_ moments={moments} />}
                {tab==="me" && <Me_ ch={ch} chapterId={chapterId} boards={boards} earlyAccess={earlyAccess} setChapterId={setChapterId} setPin={setPinOpen} setWorld={setWorld} premium={premium} grantTrial={grantTrial} trialActive={trialActive} trialDaysLeft={trialDaysLeft} openPlus={()=>setPaywall("plus")} openTravel={()=>premium?setTravel(true):setPaywall("travel")} openStylist={()=>premium?setStylist(true):setPaywall("stylist")} openScan={()=>premium?setScan(true):setPaywall("scan")} />}
                {tab==="collections" && <Collections_ ch={ch} onOpen={(c)=>setCollection(c)} />}
                {tab==="tools" && <Tools_ ch={ch} premium={premium} onPlaces={()=>setTab("places")} onCollections={()=>setTab("collections")} openStylist={()=>premium?setStylist(true):setPaywall("stylist")} openTravel={()=>premium?setTravel(true):setPaywall("travel")} openLang={()=>setLang(true)} openSport={()=>setSport(true)} openPets={()=>setPets(true)} openMind={()=>setMind(true)} openScan={()=>premium?setScan(true):setPaywall("scan")} openPin={()=>setPinOpen(true)} />}
              </div>
            </div>

            <button onClick={()=>setAsk(true)} aria-label="Спросить Slow Glow" style={{ position:"absolute", right:18, bottom:104, zIndex:6, border:"none", background:"transparent", cursor:"pointer", padding:0, width:58, height:58 }}>
              <div className="ai-ring" style={{ position:"absolute", inset:0, borderRadius:"50%", border:`2px solid ${ch.partner}`, pointerEvents:"none" }}/>
              <div className="ai-pulse" style={{ position:"absolute", inset:0 }}><GlowOrb partner={ch.partner} size={58}/></div>
            </button>

            <input ref={fileRef} type="file" accept="image/*" onChange={capture} style={{ display:"none" }}/>
            <div style={{ position:"relative", zIndex:4, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-around", padding:"10px 14px 16px", background:"rgba(250,248,241,0.88)", backdropFilter:"blur(14px)", borderTop:`1px solid ${C.line}` }}>
              {NAV.map(n=>{
                const Icon = n.icon;
                if (n.id==="add") return (
                  <button key="add" onClick={()=>fileRef.current && fileRef.current.click()} aria-label="Запечатлеть момент" style={{ width:54, height:54, borderRadius:"50%", border:"none", cursor:"pointer", background:`radial-gradient(circle at 40% 35%, ${C.butter} 0%, ${ch.partner} 70%)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", boxShadow:`0 10px 22px -8px ${ch.partner}, 0 0 0 5px rgba(250,248,241,0.9)`, marginTop:-22 }}>
                    <Plus size={24} strokeWidth={2}/>
                  </button>
                );
                const active = n.id==="tools" ? (tab==="tools"||tab==="places"||tab==="collections") : tab===n.id;
                return (
                  <button key={n.id} onClick={()=>{ if(n.id==="pin"){ setPinOpen(true); sgTrack("analyzer_open_nav"); } else { setTab(n.id); sgTrack("tab",{tab:n.id}); } }} className="navbtn" style={{ position:"relative", border:"none", background:"transparent", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, width:58, padding:"4px 0 0" }}>
                    <div className={active?"anim-grad":""} style={{ position:"relative", width:40, height:30, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:99, background:active?`linear-gradient(135deg, ${C.butter}, ${ch.partner}, ${C.oat})`:"transparent", boxShadow:active?`0 8px 18px -10px ${ch.partner}`:"none", transition:"background 260ms cubic-bezier(0.16,1,0.3,1), box-shadow 260ms" }}>
                      <Icon size={20} strokeWidth={active?2:1.6} color={active?C.ink:C.inkFaint} fill={active&&n.id==="journal"?C.ink:"none"}/>
                    </div>
                    <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.02em", color:active?C.ink:C.inkFaint, fontWeight:active?600:400, transition:"color 200ms" }}>{n.label}</span>
                    {active && <div className="nav-dot" style={{ width:4, height:4, borderRadius:99, background:ch.partner, marginTop:1 }}/>}
                  </button>
                );
              })}
            </div>
            <InstallPrompt partner={ch.partner} />
          </>
        )}

        {rubric && <RubricView data={rubricsFor(chapterId)[rubric]} onClose={()=>setRubric(null)} setDetail={setDetail} />}
        {pinOpen && <PinReality ch={ch} dna={dna} onClose={()=>setPinOpen(false)} />}
        {feed && <InspoFeed ch={ch} saved={saved} toggleSave={toggleSave} openPin={()=>{ setFeed(false); setPinOpen(true); }} onClose={()=>setFeed(false)} />}
        {addPlace && <AddPlace ch={ch} city={profile.city} editing={addPlace===true?null:addPlace} onClose={()=>setAddPlace(false)} onSave={(p)=>{ setUserPlaces(prev=> prev.some(x=>x.id===p.id) ? prev.map(x=>x.id===p.id?p:x) : [p,...prev]); setAddPlace(false); }} />}
        {mind && <MindView ch={ch} onClose={()=>setMind(false)} toggleSave={toggleSave} isSaved={isSaved} />}
        {collection && <CollectionView ch={ch} data={collection} city={profile.city} onClose={()=>setCollection(null)} />}
        {savedOpen && <SavedView saved={saved} ch={ch} toggleSave={toggleSave} onClose={()=>setSavedOpen(false)} />}
        {world && <WorldDetail name={world} onClose={()=>setWorld(null)} />}
        {detail && (detail.recipe
          ? <RecipeDetail item={detail.item} partner={detail.partner} onClose={()=>setDetail(null)} />
          : <DetailView item={detail.item} partner={detail.partner} onClose={()=>setDetail(null)} />)}
        {travel && <TravelView ch={ch} setDetail={setDetail} onClose={()=>setTravel(false)} />}
        {stylist && <StylistView ch={ch} profile={profile} wardrobe={wardrobe} setWardrobe={setWardrobe} onClose={()=>setStylist(false)} />}
        {scan && <PlaceFinderView ch={ch} setDetail={setDetail} onClose={()=>setScan(false)} />}
        {sport && <SportView ch={ch} setDetail={setDetail} onClose={()=>setSport(false)} />}
        {lang && <LangView ch={ch} premium={premium} onClose={()=>setLang(false)} openPlus={()=>setPaywall("lang")} toggleSave={toggleSave} isSaved={isSaved} />}
        {pets && <PetsView ch={ch} pet={profile.pet} onClose={()=>setPets(false)} />}
        {art && <ArtView ch={ch} onClose={()=>setArt(false)} />}
        {ask && <AskSlowGlow ch={ch} profile={profile} premium={premium} openPlus={()=>{ setAsk(false); setPaywall("ai"); }} onClose={()=>setAsk(false)} />}
        {paywall && <Paywall ch={ch} feature={paywall} onClose={()=>setPaywall(null)} onSubscribe={()=>{ sgTrack("subscribe"); sgTrack("purchase_success", { feature: paywall }); setPremium(true); setEarlyAccess(false); setPaywall(null); }} />}

        {celebrate && (
          <div className="celeb" style={{ position:"absolute", inset:0, zIndex:11, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(26,26,26,0.28)", backdropFilter:"blur(3px)", padding:"0 40px", textAlign:"center" }}>
            <GlowOrb partner={ch.partner} size={92} style={{ marginBottom:20 }}/>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:24, lineHeight:1.35, color:"#fff", textShadow:"0 2px 16px rgba(26,26,26,0.5)" }}>Ты только что прожила<br/>кусочек своей мечты</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Pills({ options, value, multi, onChange }) {
  const isOn = (o) => multi ? value.includes(o) : value===o;
  const toggle = (o) => { if (multi) onChange(value.includes(o)?value.filter(x=>x!==o):[...value,o]); else onChange(o); };
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:9 }}>
      {options.map(o=>{ const on=isOn(o); return (
        <button key={o} onClick={()=>toggle(o)} style={{ border:on?`1.5px solid ${C.ink}`:`1px solid ${C.line}`, background:on?C.ink:"rgba(255,255,255,0.5)", color:on?C.cream:C.ink, borderRadius:99, padding:"9px 15px", fontSize:13.5, fontFamily:body, cursor:"pointer", transition:"all 160ms" }}>{o}</button>
      ); })}
    </div>
  );
}

// ── WELCOME (soft-luxury intro) ───────────────────────────────────
function Welcome({ onStart }) {
  const G = [
    { a:"#F6E7A6", b:"#F2C0CC" }, // butter yellow + blush pink
    { a:"#F4E3A0", b:"#E0B3B1" }, // butter yellow + dusty rose
    { a:"#F6E7A6", b:"#F7CFB6" }, // butter yellow + very soft peach
  ][seedToday % 3];
  const grain = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`;
  return (
    <div style={{ position:"absolute", inset:0, zIndex:5, background:"#F8F5F1", overflow:"hidden", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"0 34px", boxSizing:"border-box" }}>
      <div className="orb-zoom" style={{ position:"absolute", left:"50%", top:"50%", width:920, height:920, pointerEvents:"none" }}>
        <div className="orb-breathe" style={{ position:"absolute", inset:0, borderRadius:"50%", background:`radial-gradient(circle at 44% 40%, ${G.a} 0%, ${G.a} 15%, ${G.b} 46%, rgba(248,245,241,0) 74%)`, filter:"blur(8px)" }}/>
      </div>

      <div className="fade-blur" style={{ animationDelay:"2.0s", fontFamily:head, fontSize:21, letterSpacing:"0.54em", fontWeight:500, color:C.ink, marginLeft:"0.54em" }}>SLOW GLOW</div>
      <div className="fade-blur" style={{ animationDelay:"2.4s", fontFamily:head, fontSize:10.5, letterSpacing:"0.46em", color:C.ink, marginTop:15, marginLeft:"0.46em" }}>LIVE BEAUTIFULLY</div>
      <p className="fade-blur" style={{ animationDelay:"2.8s", fontFamily:serif, fontStyle:"italic", fontSize:20, lineHeight:1.45, color:C.ink, margin:"26px 0 0", maxWidth:280, textAlign:"center" }}>Вдохновение, которое становится реальностью</p>

      <button onClick={onStart} className="spring-up" style={{ animationDelay:"3.3s", position:"absolute", left:34, right:34, bottom:42, height:56, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:16, fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", gap:9 }}>Начать сейчас <ArrowRight size={18} strokeWidth={2}/></button>

      <div style={{ position:"absolute", inset:0, pointerEvents:"none", opacity:0.4, mixBlendMode:"overlay", backgroundImage:grain, backgroundSize:"160px 160px" }}/>
    </div>
  );
}

function Onboarding({ profile, setProfile, onDone }) {
  const [step, setStep] = useState(0);
  const [pins, setPins] = useState([]);
  const [examples, setExamples] = useState(false);
  const [pickId, setPickId] = useState("summer");
  const [aIdx, setAIdx] = useState(0);
  const fileRef = useRef(null);
  const ANA = ["Читаю твою эстетику","Собираю палитру","Слышу настроение","Создаю твой мир"];
  const up = (k,v)=>setProfile(p=>({ ...p, [k]:v }));
  useEffect(() => {
    if (step !== 6) return;
    setAIdx(0);
    const iv = setInterval(()=>setAIdx(i=>Math.min(i+1,ANA.length-1)), 620);
    const to = setTimeout(()=>setStep(7), 2900);
    return ()=>{ clearInterval(iv); clearTimeout(to); };
  }, [step]);
  const onFiles = (e) => { const fs = Array.from(e.target.files||[]); fs.forEach(f=>{ shrinkImage(f,1280,0.82).then(url=>{ if(url){ setPins(p=>[...p,{ url }]); setExamples(false); } }); }); };
  const partner = CHAPTERS[pickId].partner;
  const collage = pins.length>0 ? pins : [3,1,4,2,0,5].map(t=>({ t }));
  const canNext =
    step===0 || step===1 || step===2 ||
    (step===3 && profile.age.trim() && profile.city.trim()) ||
    (step===4 && profile.skin && profile.rhythm && profile.pet);
  const input = { width:"100%", border:`1px solid ${C.line}`, outline:"none", background:"rgba(255,255,255,0.6)", borderRadius:14, padding:"13px 15px", fontSize:15, fontFamily:body, color:C.ink, boxSizing:"border-box" };
  const fieldLabel = { fontFamily:head, fontSize:12, letterSpacing:"0.04em", color:C.inkSoft, margin:"0 0 8px", fontWeight:500 };
  return (
    <div style={{ position:"relative", zIndex:3, flex:1, minHeight:0, display:"flex", flexDirection:"column" }}>
      <div aria-hidden="true" style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", background:`radial-gradient(140% 100% at 50% -14%, ${partner}80 0%, transparent 62%), radial-gradient(115% 70% at 50% 114%, ${partner}59 0%, transparent 62%), linear-gradient(180deg, ${partner}2e 0%, transparent 38%, ${partner}2e 100%)`, transition:"background 0.7s ease" }}/>
      <div className="sg-scroll" style={{ position:"relative", zIndex:1, flex:1, minHeight:0, overflowY:"auto", padding:"22px 26px 28px" }}>
        {step>0 && step<6 && (
          <button onClick={()=>setStep(s=>s-1)} style={{ border:"none", background:"transparent", cursor:"pointer", color:C.inkSoft, padding:"0 0 12px", marginLeft:-4, display:"block" }}><ArrowLeft size={22} strokeWidth={1.5}/></button>
        )}
        {step===0 && <Welcome onStart={()=>setStep(1)} />}
        {step===1 && (
          <div key="s1" className="screen">
            <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:28, lineHeight:1.15, margin:"2px 0 6px", color:C.ink }}>Покажи, о чём ты мечтаешь</h2>
            <p style={{ fontSize:13.5, lineHeight:1.55, color:C.inkSoft, margin:"0 0 14px" }}>Загрузи скрины сохранений — Slow Glow построит на них твой мир. Это необязательно сейчас.</p>
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={onFiles} style={{ display:"none" }}/>
            <button onClick={()=>fileRef.current&&fileRef.current.click()} style={{ width:"100%", height:84, borderRadius:16, border:`1px dashed ${C.line}`, background:"rgba(255,255,255,0.4)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:9, color:C.inkSoft, marginBottom:12 }}>
              <Plus size={20} strokeWidth={1.6}/><span style={{ fontFamily:serif, fontSize:14.5, fontStyle:"italic" }}>{pins.length>0?`Добавить ещё · ${pins.length} загружено`:"Добавить сохранения"}</span>
            </button>
            <button onClick={()=>setStep(2)} style={{ width:"100%", height:54, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:16, fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:8 }}>
              Продолжить <ArrowRight size={18} strokeWidth={2}/>
            </button>
            {pins.length===0 && !examples && <button onClick={()=>setExamples(true)} style={{ display:"block", margin:"0 auto 8px", border:"none", background:"transparent", color:C.inkSoft, fontSize:13, textDecoration:"underline", cursor:"pointer", fontFamily:body }}>Показать на примере</button>}
            <div style={{ columnCount:2, columnGap:10, marginTop:10 }}>
              {!examples && pins.map((p,i)=><div key={i} className="col-in" style={{ width:"100%", marginBottom:10, breakInside:"avoid", borderRadius:16, overflow:"hidden", boxShadow:"0 14px 30px -20px rgba(26,26,26,0.4)", animationDelay:`${i*0.08}s` }}><img src={p.url} alt="" loading="lazy" decoding="async" style={{ width:"100%", display:"block" }}/></div>)}
              {examples && [3,1,4,2,0,5].map((t,i)=><div key={i} className="col-in" style={{ width:"100%", marginBottom:10, breakInside:"avoid", height:[140,110,126,140,112,132][i], borderRadius:16, background:PH[t], boxShadow:"0 14px 30px -20px rgba(26,26,26,0.4)", animationDelay:`${i*0.08}s` }}/>)}
            </div>
          </div>
        )}
        {step===2 && (
          <div key="s2" className="screen">
            <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:30, lineHeight:1.15, margin:"4px 0 6px", color:C.ink }}>Какая глава тебе ближе?</h2>
            <p style={{ fontSize:14, color:C.inkSoft, margin:"0 0 20px" }}>Можно сменить в любой момент</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {Object.values(CHAPTERS).map(c=>{ const on=c.id===pickId; return (
                <button key={c.id} onClick={()=>setPickId(c.id)} style={{ border:on?`1.5px solid ${C.ink}`:`1px solid ${C.line}`, background:"rgba(255,255,255,0.5)", borderRadius:20, padding:"20px 14px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:12, transition:"border-color 200ms" }}>
                  <HaloOrb partner={c.partner} size={72} spark={false}/>
                  <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, lineHeight:1.1, textAlign:"center" }}>{c.name}</div>
                </button>
              ); })}
            </div>
          </div>
        )}
        {step===3 && (
          <div key="s3" className="screen">
            <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:30, lineHeight:1.15, margin:"4px 0 6px", color:C.ink }}>Давай познакомимся</h2>
            <p style={{ fontSize:14, color:C.inkSoft, margin:"0 0 22px" }}>Чтобы советы были про тебя, а не вообще</p>
            <div style={{ marginBottom:18 }}><div style={fieldLabel}>Как тебя зовут</div><input value={profile.name} onChange={e=>up("name",e.target.value)} placeholder="Имя" style={input}/></div>
            <div style={{ marginBottom:18 }}><div style={fieldLabel}>Возраст</div><input value={profile.age} onChange={e=>up("age",e.target.value.replace(/[^0-9]/g,""))} placeholder="Например, 29" inputMode="numeric" style={input}/></div>
            <div><div style={fieldLabel}>Город</div><input value={profile.city} onChange={e=>up("city",e.target.value)} placeholder="Где ты живёшь" style={input}/>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:10 }}>
                {CITY_HINTS.map(c=><button key={c} onClick={()=>up("city",c)} style={{ border:`1px solid ${C.line}`, background:profile.city===c?C.ink:"rgba(255,255,255,0.5)", color:profile.city===c?C.cream:C.inkSoft, borderRadius:99, padding:"7px 13px", fontSize:13, fontFamily:body, cursor:"pointer" }}>{c}</button>)}
              </div>
            </div>
          </div>
        )}
        {step===4 && (
          <div key="s4" className="screen">
            <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:30, lineHeight:1.15, margin:"4px 0 6px", color:C.ink }}>Пара деталей о тебе</h2>
            <p style={{ fontSize:14, color:C.inkSoft, margin:"0 0 14px" }}>Это настроит рецепты, уход и ритм под тебя</p>
            <div style={{ marginBottom:14 }}><div style={fieldLabel}>Аллергии и питание</div><Pills options={DIET} value={profile.diet} multi onChange={v=>up("diet",v)}/></div>
            <div style={{ marginBottom:14 }}><div style={fieldLabel}>Тип кожи</div><Pills options={SKIN} value={profile.skin} onChange={v=>up("skin",v)}/></div>
            <div><div style={fieldLabel}>Твой ритм</div><Pills options={RHYTHM} value={profile.rhythm} onChange={v=>up("rhythm",v)}/></div>
            <div style={{ marginTop:14 }}><div style={fieldLabel}>Есть ли у тебя питомец?</div><Pills options={PET} value={profile.pet} onChange={v=>up("pet",v)}/></div>
          </div>
        )}
        {step===5 && (
          <div key="s5n" className="screen" style={{ paddingTop:14 }}>
            <div style={{ textAlign:"center", marginBottom:18 }}>
              <HaloOrb partner={partner} size={96} style={{ margin:"6px auto 18px" }}/>
              <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:30, lineHeight:1.15, margin:"0 0 8px", color:C.ink }}>Тёплые напоминания</h2>
              <p style={{ fontSize:14.5, lineHeight:1.6, color:C.inkSoft, margin:"0 auto", maxWidth:300 }}>Slow Glow может мягко напоминать о красивом шаге и медленном утре. Без спама — только то, что радует.</p>
            </div>
            <div style={{ background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, borderRadius:18, padding:"16px 18px", marginBottom:22 }}>
              {["«Твой красивый шаг на сегодня готов»","«Время медленного утра ☕»","«Новая подборка под твою эстетику»"].map((t,i)=>(
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:i<2?10:0 }}>
                  <span style={{ color:partner, marginTop:1 }}>✦</span>
                  <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:15.5, color:C.ink, lineHeight:1.35 }}>{t}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>setStep(6)} style={{ width:"100%", height:54, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:15.5, fontWeight:500, marginBottom:10 }}>Разрешить напоминания</button>
            <button onClick={()=>setStep(6)} style={{ width:"100%", height:48, borderRadius:99, border:"none", background:"transparent", cursor:"pointer", color:C.inkSoft, fontFamily:body, fontSize:14 }}>Позже</button>
          </div>
        )}
        {step===6 && (
          <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", paddingBottom:80 }}>
            <HaloOrb partner={partner} size={130} strong style={{ marginBottom:34 }}/>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:23, color:C.ink }}>{ANA[aIdx]}…</div>
          </div>
        )}
        {step===7 && (
          <div key="s6" style={{ paddingTop:10 }}>
            <div style={{ textAlign:"center", marginBottom:14 }}>
              <Label color={C.inkFaint}>{CHAPTERS[pickId].name}</Label>
              <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:28, lineHeight:1.15, margin:"8px 0 0", color:C.ink }}>
                {profile.name ? `${profile.name}, твой мир готов` : "Твой мир готов"}
              </h2>
            </div>
            <button onClick={()=>onDone(pickId, pins)} className="anim-grad" style={{ width:"100%", height:54, borderRadius:99, border:"none", cursor:"pointer", background:`linear-gradient(120deg, ${C.butter}, ${partner})`, color:C.ink, fontFamily:head, fontSize:16, fontWeight:400, display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:10, boxShadow:`0 12px 26px -18px ${partner}` }}>
              Разобрать мои сохранения ✦
            </button>
            <p style={{ textAlign:"center", fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:C.inkSoft, margin:"0 0 16px" }}>{pins.length>0 ? "Твой мир — собран из твоих образов" : "Загрузи свои фото — и мир соберётся из них"}</p>
            <div style={{ display:"flex", gap:10, height:340, overflow:"hidden", WebkitMaskImage:"linear-gradient(180deg, transparent, #000 11%, #000 89%, transparent)", maskImage:"linear-gradient(180deg, transparent, #000 11%, #000 89%, transparent)" }}>
              {[0,1].map(col=>{
                const ci = collage.filter((_,i)=>i%2===col);
                let base = ci;
                while (base.length && base.length < 4) base = base.concat(ci);
                const loop = base.length ? base.concat(base) : [];
                return (
                  <div key={col} style={{ flex:1, overflow:"hidden" }}>
                    <div className={col===0?"mq-up":"mq-down"} style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      {loop.map((p,i)=>(
                        <div key={i} style={{ width:"100%", borderRadius:16, overflow:"hidden", boxShadow:"0 16px 34px -22px rgba(26,26,26,0.45)" }}>
                          {p.url ? <img src={p.url} alt="" loading="lazy" decoding="async" style={{ width:"100%", display:"block" }}/> : <div style={{ height:[150,112,134,150,116,138][i%6], background:PH[p.t] }}/>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {step>=2 && step<=4 && (
          <div style={{ margin:"8px 0 14px" }}>
            <button onClick={()=>setStep(s=>s+1)} disabled={!canNext} style={{ width:"100%", height:54, borderRadius:99, border:"none", cursor:canNext?"pointer":"default", background:canNext?C.ink:"rgba(26,26,26,0.15)", color:canNext?C.cream:C.inkFaint, fontFamily:head, fontSize:16, fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              Продолжить <ArrowRight size={18} strokeWidth={2}/>
            </button>
          </div>
        )}
      </div>
      {step===7 && (
        <div style={{ padding:"0 26px 18px", flexShrink:0 }} />
      )}
    </div>
  );
}

// ── SCREENS ───────────────────────────────────────────────────────
function BeautifulDay({ ch }) {
  const today = sgToday();
  const items = React.useMemo(()=> shuffleDay(DAY_BEAUTY, 13).slice(0,5), [today]);
  const [done, setDone] = React.useState(()=> sgStore.get("sg_day_"+today, {}));
  const [burst, setBurst] = React.useState(false);
  React.useEffect(()=>{ setDone(sgStore.get("sg_day_"+today, {})); }, [today]);
  const toggle = (i)=>{ const n={ ...done, [i]:!done[i] }; setDone(n); sgStore.set("sg_day_"+today, n); const c=items.filter((_,ix)=>n[ix]).length; if(c===items.length){ setBurst(true); sgTrack("day_complete"); setTimeout(()=>setBurst(false), 3600); } };
  const count = items.filter((_,i)=>done[i]).length;
  const all = count===items.length;
  const dstr = new Date().toLocaleDateString("ru-RU",{ day:"numeric", month:"long" });
  return (
    <div style={{ position:"relative", margin:"0 0 22px", borderRadius:22, overflow:"hidden", border:`1px solid ${ch.partner}`, background:`linear-gradient(165deg, ${ch.partner}26, rgba(255,255,255,0.65) 62%)` }}>
      <div aria-hidden="true" style={{ position:"absolute", right:-36, top:-36, width:150, height:150, borderRadius:99, background:`radial-gradient(circle at 35% 35%, ${C.butter}, ${ch.partner}59 58%, transparent 74%)`, filter:"blur(2px)" }}/>
      <div aria-hidden="true" style={{ position:"absolute", right:12, top:38, opacity:0.55 }}><SGFleur color={ch.partner} size={50}/></div>
      {burst && <div aria-hidden="true" style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:3 }}>{Array.from({length:12}).map((_,k)=>{ const cols=[ch.partner, C.sage, C.butter, "#F2B6C6"]; return <span key={k} className="petal" style={{ left:((6+k*8)%92)+"%", background:cols[k%4], animationDelay:(k*0.15)+"s", animationDuration:(2.3+(k%5)*0.32)+"s" }}/>; })}</div>}
      <div style={{ padding:"17px 18px 4px" }}>
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:8 }}>
          <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:ch.partner }}>Красивый день · {dstr}</div>
          <div style={{ fontFamily:head, fontSize:11, color:C.inkFaint }}>{count}/{items.length}</div>
        </div>
        <h2 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:23, lineHeight:1.15, color:C.ink, margin:"6px 0 4px" }}>Сегодняшний красивый день</h2>
        <p style={{ fontSize:12.5, lineHeight:1.5, color:C.inkSoft, margin:"0 0 8px" }}>Пять маленьких поводов прожить сегодня красивее. Завтра — новая подборка.</p>
      </div>
      <div style={{ padding:"2px 10px 8px" }}>
        {items.map((it,i)=>{
          const on = !!done[i];
          return (
            <button key={i} onClick={()=>toggle(i)} className={"tapPop fade st"+((i%6)+1)} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"11px 10px", border:"none", borderBottom:i<items.length-1?`1px solid ${C.line}`:"none", background:"transparent", cursor:"pointer", textAlign:"left" }}>
              <span style={{ flexShrink:0, width:26, height:26, borderRadius:99, display:"flex", alignItems:"center", justifyContent:"center", border:on?"none":`1.6px solid ${ch.partner}`, background:on?ch.partner:"transparent", transition:"all .15s" }}>{on && <Check size={15} strokeWidth={2.6} color={C.cream}/>}</span>
              <span style={{ flexShrink:0, opacity:on?0.45:1, transition:"opacity .15s" }}><SGBadge em={it.e} partner={ch.partner} size={34}/></span>
              <span style={{ flex:1, fontSize:14.5, lineHeight:1.4, color:on?C.inkFaint:C.ink, textDecoration:on?"line-through":"none" }}>{it.v}</span>
            </button>
          );
        })}
      </div>
      <div style={{ padding:"0 18px 16px" }}>
        {all ? (
          <div>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:ch.partner, textAlign:"center", margin:"6px 0 10px" }}>День прожит красиво ✦ ты молодец</p>
            <button onClick={()=>shareStreakCard(ch, items.length, "красивых пунктов прожито сегодня")} style={{ width:"100%", height:42, borderRadius:99, border:`1px solid ${ch.partner}`, background:"transparent", cursor:"pointer", color:C.ink, fontFamily:head, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}><Send size={14} strokeWidth={1.8}/>Поделиться этим днём</button>
          </div>
        ) : (
          <div style={{ height:6, borderRadius:99, background:"rgba(26,26,26,0.07)", overflow:"hidden" }}><div className="anim-grad-f" style={{ width:(count/items.length*100)+"%", height:"100%", borderRadius:99, background:`linear-gradient(90deg, ${C.sage}, ${ch.partner}, ${C.butter})`, transition:"width .25s" }}/></div>
        )}
      </div>
    </div>
  );
}
/* ── КОЛОНКА РЕДАКТОРА ─────────────────────────────────────────────
   Короткая еженедельная рубрика от Дарьи. Показывается самый первый объект.
   Чтобы обновить на новую неделю: добавь НОВЫЙ объект В НАЧАЛО массива.
   Поля: date — короткая метка недели/дата; title — одна мысль (курсив);
   body — 2–4 коротких предложения; sign — подпись. Держи текст коротким. */
function EditorColumn({ partner }){
  const note = (typeof EDITOR_NOTES!=="undefined" && EDITOR_NOTES.length) ? EDITOR_NOTES[0] : null;
  if (!note) return null;
  const blocks = note.blocks || [];
  const lead = note.intro || note.body;
  return (
    <div style={{ borderRadius:20, padding:"18px 20px 20px", marginBottom:26, background:C.cream, border:`1px solid ${C.line}` }}>
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:11 }}>
        <span style={{ fontFamily:head, fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:partner, fontWeight:600 }}>Колонка редактора</span>
        {note.date && <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.12em", textTransform:"uppercase", color:C.inkFaint }}>{note.date}</span>}
      </div>
      <div style={{ height:1, background:C.line, margin:"0 0 14px" }}/>
      {lead && (
        <div>
          <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.2em", textTransform:"uppercase", color:C.inkFaint, marginBottom:8 }}>От редактора</div>
          {note.title && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:21, lineHeight:1.3, color:C.ink, margin:"0 0 8px" }}>{note.title}</p>}
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, lineHeight:1.55, color:C.ink, margin:0 }}>{lead}</p>
        </div>
      )}
      {blocks.map((b,i)=>(
        <div key={i}>
          <div style={{ height:1, background:C.line, margin:"16px 0 13px" }}/>
          {b.k && <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.2em", textTransform:"uppercase", color:partner, marginBottom:6 }}>{b.k}</div>}
          {b.title && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, lineHeight:1.25, color:C.ink, margin:"0 0 6px" }}>{b.title}</p>}
          {b.body && <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:0 }}>{b.body}</p>}
          {b.addr && (
            <a href={"https://yandex.ru/maps/?text="+encodeURIComponent(b.map||b.addr)} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:9, fontFamily:head, fontSize:12, color:partner, textDecoration:"none" }}>
              <MapPin size={13} strokeWidth={1.8}/> {b.addr}
            </a>
          )}
          {b.link && (
            <a href={b.link[1]} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:9, fontFamily:head, fontSize:12, color:partner, textDecoration:"none" }}>
              {b.link[0]} <ArrowRight size={13} strokeWidth={2}/>
            </a>
          )}
        </div>
      ))}
      <div style={{ display:"flex", alignItems:"center", gap:7, marginTop:16 }}>
        <span style={{ color:partner }}>✦</span>
        <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkFaint }}>{note.sign || "Дарья, куратор Slow Glow"}</span>
      </div>
    </div>
  );
}

function Home_({ ch, profile, dna, earlyAccess, setRubric, setPin, setDetail, premium, openTravel, openLive, openMind, openCollection, openLibrary, onLive, streak, bump, openFeed }) {
  const introNow = useState(()=>{ if (sgIntroSeen) return false; sgIntroSeen = true; return true; })[0];
  const items = pick(todayFor(ch.id), 4, 0);
  const dnaSteps = dna && dna.steps && dna.steps.length ? dna.steps : null;
  const step = dnaSteps ? pick(dnaSteps, 1, 2)[0] : pick(stepFor(ch.id), 1, 2)[0];
  const identity = ({ summer:"спокойной, светлой и уверенной женщины в эстетике French Summer", romance:"нежной, романтичной и уверенной женщины в эстетике Romantic Bloom", coastal:"свободной, лёгкой и спокойной женщины в эстетике Coastal Living", slow:"спокойной, тёплой и наполненной женщины в эстетике Slow Living" })[ch.id] || "спокойной и уверенной женщины в своей эстетике";
  return (
    <div>
      <div className={introNow?"greet-in":""}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Label>Твой сезон</Label>
        <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.18em", textTransform:"uppercase", color:C.inkFaint }}>{new Date().toLocaleDateString("ru-RU",{day:"numeric",month:"long"})}</span>
      </div>
      <div style={{ position:"relative", marginTop:10, marginBottom:10, minHeight:96 }}>
        <GlowOrb partner={ch.partner} size={96} style={{ position:"absolute", right:0, top:-2, zIndex:0 }}/>
        <h1 style={{ position:"relative", zIndex:1, fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:40, lineHeight:1.05, margin:0, color:C.ink, maxWidth:"66%" }}>
          {ch.name.split(" ")[0]}<br/>{ch.name.split(" ")[1]}
        </h1>
      </div>
      <p style={{ fontSize:15, lineHeight:1.6, color:C.inkSoft, margin:"6px 0 28px" }}>Доброе утро{profile.name?`, ${profile.name}`:""}. Несколько способов сегодня прожить твою эстетику.</p>
      </div>
      <EditorColumn partner={ch.partner}/>
      {(()=>{ const fresh = !sgStore.get("sg_dream_last", null); return (
      <button onClick={()=>setPin(true)} className="sheen anim-grad" style={{ position:"relative", width:"100%", textAlign:"left", border:`1px solid ${C.line}`, cursor:"pointer", borderRadius:20, overflow:"hidden", padding:0, marginTop:4, marginBottom:14, background:`linear-gradient(120deg, ${C.butter}, ${ch.partner} 78%)`, boxShadow:`0 16px 36px -28px ${ch.partner}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:13, padding:"16px 18px" }}>
          <GlowOrb partner={ch.partner} size={52} />
          <div style={{ flex:1 }}>
            <Label color="rgba(26,26,26,0.55)">Твоя эстетика → реальные шаги</Label>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:21, color:C.ink, marginTop:3, lineHeight:1.12 }}>Разобрать мои сохранения</div>
            <div style={{ fontSize:12.5, color:C.inkSoft, marginTop:3, lineHeight:1.4 }}>Загрузи мудборд — покажу темы твоей эстетики и тёплые шаги на каждый день</div>
          </div>
          <ArrowRight size={20} strokeWidth={1.8} color="#1A1A1A"/>
        </div>
        {fresh && <span className="pulseSoft" style={{ position:"absolute", top:10, right:12, background:"#1A1A1A", color:C.cream, borderRadius:99, padding:"4px 11px", fontFamily:head, fontSize:9.5, letterSpacing:"0.12em" }}>НАЧНИ ОТСЮДА ✦</span>}
      </button>
      ); })()}
      <DailyEnvelope ch={ch} bump={bump}/>

      <button onClick={openFeed} className="tapPop" style={{ width:"100%", textAlign:"left", border:`1px solid ${C.line}`, cursor:"pointer", borderRadius:18, overflow:"hidden", padding:0, marginBottom:14, position:"relative", background:`linear-gradient(115deg, ${C.seaMist}66, ${ch.partner}4D 55%, ${C.butter})` }}>
        <div aria-hidden="true" style={{ position:"absolute", right:-22, top:-26, width:100, height:100, borderRadius:99, background:"rgba(255,255,255,0.32)" }}/>
        <div style={{ position:"relative", display:"flex", alignItems:"center", padding:"13px 15px", gap:12 }}>
          <SGBadge name="wave" partner={ch.partner} size={40}/>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(26,26,26,0.55)" }}>Поток вдохновения</div>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, marginTop:2 }}>Полистать красивое ✦</div>
          </div>
          <ArrowRight size={17} strokeWidth={1.8} color="#1A1A1A"/>
        </div>
      </button>
      {earlyAccess && (
        <div style={{ position:"relative", overflow:"hidden", borderRadius:18, padding:"14px 16px", marginBottom:16, background:`linear-gradient(120deg, ${C.butter}, ${ch.partner} 70%, ${C.oat})`, boxShadow:`0 16px 34px -24px ${ch.partner}`, border:"1px solid rgba(255,255,255,0.5)" }}>
          <div style={{ position:"absolute", right:-18, top:-18, width:96, height:96, borderRadius:99, background:"rgba(255,255,255,0.22)" }}/>
          <div style={{ position:"relative", display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
            <Sparkles size={14} strokeWidth={2} color="#1A1A1A"/>
            <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.16em", textTransform:"uppercase", color:"#1A1A1A", fontWeight:600 }}>Ранний доступ · Slow Glow Plus</span>
          </div>
          <p style={{ position:"relative", fontFamily:serif, fontStyle:"italic", fontSize:18, lineHeight:1.32, color:"#1A1A1A", margin:0 }}>Весь премиум открыт тебе бесплатно — пока для первых.</p>
          <p style={{ position:"relative", fontSize:12.5, lineHeight:1.45, color:"rgba(26,26,26,0.72)", margin:"5px 0 0" }}>Обычно это Plus. Сейчас — твой подарок как одной из первых ✦</p>
        </div>
      )}
      {(streak||0)>0 && (<button onClick={()=>shareStreakCard(ch, streak, "дней красивой жизни подряд")} style={{ display:"flex", alignItems:"center", gap:8, margin:"0 0 10px", padding:"9px 13px", borderRadius:99, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", width:"fit-content", cursor:"pointer" }}><Sparkles size={14} strokeWidth={1.8} color={ch.partner}/><span style={{ fontFamily:head, fontSize:11.5, letterSpacing:"0.04em", color:C.ink }}>Серия красивых дней · {streak}</span><Send size={12} strokeWidth={1.8} color={C.inkFaint}/></button>)}
      <DailyRitual ch={ch} onLive={onLive}/>

      <BeautifulDay ch={ch} />
      {(()=>{ const m=pickOne(MICRO,3); return (
        <div style={{ display:"flex", alignItems:"center", gap:12, borderRadius:16, padding:"13px 15px", marginBottom:18, background:`linear-gradient(110deg, ${m.ac}26, rgba(255,255,255,0.55) 70%)`, border:`1px solid ${C.line}` }}>
          <div style={{ width:8, height:8, borderRadius:99, flexShrink:0, background:m.ac, boxShadow:`0 0 0 4px ${m.ac}33` }}/>
          <div>
            <div style={{ fontFamily:head, fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase", color:C.inkFaint, marginBottom:3 }}>Идея дня</div>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15.5, lineHeight:1.3, color:C.ink, margin:0 }}>{m.v}</p>
          </div>
        </div>
      ); })()}

      <PullQuote>{pickOne(QUOTES, 5)}</PullQuote>

      <div className="anim-grad" style={{ position:"relative", borderRadius:20, overflow:"hidden", marginBottom:22, background:`linear-gradient(125deg, ${C.butter}, ${ch.partner} 65%, ${C.oat})`, boxShadow:`0 16px 36px -28px ${ch.partner}` }}>
        <div aria-hidden="true" style={{ position:"absolute", right:-28, top:-32, width:130, height:130, borderRadius:99, background:"rgba(255,255,255,0.3)" }}/>
        <div aria-hidden="true" style={{ position:"absolute", right:12, bottom:8, opacity:0.5 }}><SGFleur color="#1A1A1A" size={50}/></div>
        <div style={{ position:"relative", padding:"18px 20px" }}>
          <Label color="rgba(26,26,26,0.5)">Кем ты становишься</Label>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:20, lineHeight:1.35, color:C.ink, margin:"8px 0 0" }}>Ты создаёшь жизнь {identity}.</p>
        </div>
      </div>

      <div style={{ borderRadius:20, padding:"18px 20px", marginBottom:22, background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}` }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
          <Label color={C.inkFaint}>Твой путь к жизни мечты</Label>
          <span style={{ fontFamily:head, fontSize:9, letterSpacing:"0.12em", color:C.inkFaint }}>БЕЗ ГОНКИ</span>
        </div>
        <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, lineHeight:1.35, color:C.ink, margin:"6px 0 14px" }}>Ты уже ближе, чем кажется.</p>
        {[
          { l:"Ритуалы дня", v:0.62, h:"маленькие шаги входят в привычку", ic:"sun" },
          { l:"Красота вокруг", v:0.54, h:"дом, образы, детали", ic:"flower" },
          { l:"Знание и насмотренность", v:0.47, h:"искусство, культура, языки", ic:"book" },
          { l:"Движение и забота", v:0.4, h:"тело в спокойном ритме", ic:"wave" },
          { l:"Любимые места", v:0.33, h:"твоя карта вдохновения", ic:"pin" },
        ].map((a,i)=>(
          <div key={i} style={{ marginBottom:i<4?12:0 }}>
            <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:13.5, color:C.ink, display:"inline-flex", alignItems:"center", gap:7 }}><BrandIcon name={a.ic} size={16} color={ch.partner} stroke={1.5}/>{a.l}</span>
              <span style={{ fontSize:11, color:C.inkFaint }}>{a.h}</span>
            </div>
            <div style={{ height:7, borderRadius:99, background:"rgba(26,26,26,0.06)", overflow:"hidden" }}>
              <div className="anim-grad" style={{ width:`${a.v*100}%`, height:"100%", borderRadius:99, background:`linear-gradient(90deg, ${C.butter}, ${ch.partner}, ${C.sage})` }}/>
            </div>
          </div>
        ))}
        <p style={{ fontSize:12, color:C.inkFaint, margin:"14px 0 0" }}>Это не гонка и не стрики. Полоски растут сами, когда ты живёшь свою эстетику — в своём темпе.</p>
      </div>

      {openLibrary && (
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", margin:"2px 0 10px" }}>
          <Label>Коллекции</Label>
          <button onClick={openLibrary} style={{ border:"none", background:"transparent", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:11, letterSpacing:"0.06em", color:ch.partner }}>Смотреть все <ArrowRight size={14} strokeWidth={2}/></button>
        </div>
      )}
      {openCollection && (()=>{ const cap=capsuleOfWeek(); return (
        <button onClick={openCollection} className="pop" style={{ position:"relative", width:"100%", textAlign:"left", border:"none", padding:0, borderRadius:20, overflow:"hidden", cursor:"pointer", marginBottom:26, boxShadow:`0 18px 40px -26px ${ch.partner}` }}>
          <Photo t={0} url={cap.cover} h={196} radius={0}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(26,26,26,0.10) 0%, transparent 34%, rgba(26,26,26,0.64) 100%)" }}/>
          </Photo>
          <span style={{ position:"absolute", top:12, left:12, background:`linear-gradient(135deg, ${C.butter}, ${ch.partner})`, borderRadius:99, padding:"5px 12px", fontFamily:head, fontSize:9.5, letterSpacing:"0.12em", color:C.ink }}>КОЛЛЕКЦИЯ НЕДЕЛИ</span>
          <div style={{ position:"absolute", left:16, right:16, bottom:14 }}>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:27, color:"#fff", lineHeight:1.08, textShadow:"0 2px 12px rgba(26,26,26,0.5)" }}>{cap.title}</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginTop:5 }}>
              <span style={{ fontSize:12.5, color:"rgba(255,255,255,0.92)", lineHeight:1.3 }}>{cap.sub}</span>
              <ArrowRight size={18} strokeWidth={2} color="#fff" style={{ flexShrink:0 }}/>
            </div>
          </div>
        </button>
      ); })()}
      <Divider partner={ch.partner} mt={4} mb={20}/>
      <div style={{ marginTop:12, marginBottom:26 }}>
        {items.map((it,i)=>(
          <button key={i} onClick={()=>setDetail({ item:it, partner:ch.partner })} style={{ width:"100%", textAlign:"left", border:"none", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:`1px solid ${C.line}` }}>
            <div style={{ width:54, flexShrink:0 }}><Photo t={it.t} url={it.url||it.heroUrl} h={54} radius={12}/></div>
            <div style={{ flex:1 }}><Label>{it.k}</Label><div style={{ fontFamily:serif, fontSize:18, color:C.ink, marginTop:1, lineHeight:1.2 }}>{it.v}</div></div>
            <ArrowRight size={17} strokeWidth={1.6} color={C.inkFaint}/>
          </button>
        ))}
      </div>

      <Label>Плейлисты для тебя</Label>
      <div className="row" style={{ display:"flex", gap:12, overflowX:"auto", margin:"12px -24px 26px", padding:"0 24px 4px" }}>
        {playlistsFor(ch.id).map((pl,i)=>(
          <button key={i} onClick={()=>setDetail({ item:pl, partner:ch.partner })} style={{ flexShrink:0, width:150, textAlign:"left", border:"none", background:"transparent", borderRadius:18, overflow:"hidden", cursor:"pointer", padding:0, boxShadow:"0 16px 32px -24px rgba(26,26,26,0.45)" }}>
            <div style={{ position:"relative" }}>
              <Photo t={pl.t} url={pl.url} h={172} radius={18}/>
              <div style={{ position:"absolute", inset:0, borderRadius:18, background:"linear-gradient(180deg, rgba(26,26,26,0) 38%, rgba(26,26,26,0.72) 100%)" }}/>
              <div style={{ position:"absolute", right:10, top:10, width:30, height:30, borderRadius:99, background:"rgba(250,248,241,0.92)", display:"flex", alignItems:"center", justifyContent:"center", color:C.ink }}><Play size={14} strokeWidth={2} fill={C.ink}/></div>
              <div style={{ position:"absolute", left:12, right:12, bottom:11 }}>
                <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.cream, lineHeight:1.15 }}>{pl.v}</div>
                <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.06em", textTransform:"uppercase", color:"rgba(250,248,241,0.85)", marginTop:3 }}>{pl.mood}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Label>Рубрики для тебя</Label>
      <div className="row" style={{ display:"flex", gap:12, overflowX:"auto", margin:"12px -24px 26px", padding:"0 24px 4px" }}>
        {RUBRIC_ORDER.map(id=>{ const r=RUBRICS[id]; return (
          <button key={id} onClick={()=>setRubric(id)} style={{ flexShrink:0, width:92, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", borderRadius:18, padding:"16px 8px 13px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:9 }}>
            <GlowOrb partner={RUBRIC_COL[id]} size={48} spark={false}/>
            <div style={{ fontFamily:head, fontSize:11, letterSpacing:"0.05em", color:C.ink, fontWeight:500 }}>{r.label}</div>
          </button>
        ); })}
      </div>

      <div style={{ borderRadius:20, overflow:"hidden", background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}`, padding:"18px 20px 20px" }}>
        <Label color={C.inkFaint}>{dnaSteps ? "Из твоих образов · следующий шаг" : "Следующий красивый шаг"}</Label>
        <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:21, lineHeight:1.3, margin:"8px 0 0", color:C.ink }}>{step}</p>
        {dnaSteps && <p style={{ fontSize:11.5, color:C.inkFaint, margin:"10px 0 0", display:"flex", alignItems:"center", gap:6 }}><Heart size={12} strokeWidth={1.7} color={ch.partner} fill={ch.partner}/> собрано из фото, что ты загрузила в начале пути</p>}
      </div>
    </div>
  );
}

function ScoreRing({ score, partner }) {
  const r = 20, circ = 2*Math.PI*r, off = circ*(1-score/100);
  return (
    <div style={{ position:"relative", width:50, height:50, flexShrink:0 }}>
      <svg width="50" height="50" style={{ transform:"rotate(-90deg)" }}>
        <circle cx="25" cy="25" r={r} fill="none" stroke="rgba(26,26,26,0.1)" strokeWidth="3.5"/>
        <circle cx="25" cy="25" r={r} fill="none" stroke={partner} strokeWidth="3.5" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}/>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontSize:17, color:C.ink }}>{score}</div>
    </div>
  );
}
function NearbyMap({ city, partner }) {
  const c = city || "Москва";
  const url = (term)=> "https://yandex.ru/maps/?text=" + encodeURIComponent(term + " " + c);
  return (
    <div style={{ margin:"0 0 24px" }}>
      <Label>Красивые места рядом</Label>
      <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"4px 0 12px" }}>Превращай идеи в места. Тапни категорию — откроется в Яндекс.Картах рядом с {c}.</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        {NEARBY_CATS.map(cat=>(
          <a key={cat.label} href={url(cat.term)} target="_blank" rel="noopener noreferrer" className="pop" style={{ display:"flex", alignItems:"center", gap:11, padding:"14px 14px", borderRadius:16, border:`1px solid ${C.line}`, background:`linear-gradient(150deg, ${partner}1f, rgba(255,255,255,0.72))`, textDecoration:"none", color:C.ink }}>
            <SGBadge em={cat.e} partner={partner} size={34}/>
            <span style={{ fontFamily:head, fontSize:14, fontWeight:500, lineHeight:1.2 }}>{cat.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
/* Поисковые запросы для «Отобранных мест» — чтобы карта открывала
   похожее место рядом с городом пользователя, а не один адрес в Москве. */
function elevPath(arr, w, h, pad){
  const max=Math.max.apply(null,arr), min=Math.min.apply(null,arr), span=(max-min)||1, n=arr.length;
  const X=i=> pad + (w-2*pad)*(i/(n-1));
  const Y=v=> (h-pad) - (h-2*pad)*((v-min)/span);
  let line=`M ${X(0).toFixed(1)} ${Y(arr[0]).toFixed(1)}`;
  for(let i=1;i<n;i++) line+=` L ${X(i).toFixed(1)} ${Y(arr[i]).toFixed(1)}`;
  const area=line+` L ${X(n-1).toFixed(1)} ${(h-pad).toFixed(1)} L ${X(0).toFixed(1)} ${(h-pad).toFixed(1)} Z`;
  return { line, area };
}
// Вставь сюда бесплатный API-ключ OpenRouteService — и маршруты станут настоящими
// (реальная нитка по карте + точная дистанция и набор высоты, построенные от твоего местоположения).
const ORS_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjBmZGQ2ZGRhM2FmNDQ5N2U5ZmRjMjc5ZDJiYWUwOWZkIiwiaCI6Im11cm11cjY0In0=";
// Нормализует полилинию маршрута (массив [lng,lat]) в SVG-путь внутри рамки w×h.
function linePath(coords, w, h, pad){
  const xs=coords.map(c=>c[0]), ys=coords.map(c=>c[1]);
  const minx=Math.min.apply(null,xs), maxx=Math.max.apply(null,xs);
  const miny=Math.min.apply(null,ys), maxy=Math.max.apply(null,ys);
  const sx=(maxx-minx)||1, sy=(maxy-miny)||1;
  const s=Math.min((w-2*pad)/sx,(h-2*pad)/sy);
  const offx=(w-sx*s)/2, offy=(h-sy*s)/2;
  const X=x=> offx+(x-minx)*s, Y=y=> h-(offy+(y-miny)*s);
  let d=`M ${X(coords[0][0]).toFixed(1)} ${Y(coords[0][1]).toFixed(1)}`;
  for(let i=1;i<coords.length;i++) d+=` L ${X(coords[i][0]).toFixed(1)} ${Y(coords[i][1]).toFixed(1)}`;
  return d;
}
function sampleArr(arr, n){
  if(!arr || arr.length<=n) return arr||[];
  const step=(arr.length-1)/(n-1), out=[];
  for(let i=0;i<n;i++) out.push(arr[Math.round(i*step)]);
  return out;
}
function Places_({ profile, partner, chId, userPlaces, openAddPlace, onEditPlace, onDeletePlace, setDetail, premium, openScan, openSport, openLang, openMind, openPets, toggleSave, isSaved }) {
  const city = profile.city || "Москва";
  const ymaps = (term) => "https://yandex.ru/maps/?text=" + encodeURIComponent(term + " " + city);
  const [mapTab, setMapTab] = useState(0);
  const [mapPick, setMapPick] = useState(0);
  const picks = [MAP_PLACES, MAP_LEISURE, MAP_ROUTES][mapTab];
  const mq = picks[mapPick] || picks[0];
  const mapSrc = "https://yandex.ru/map-widget/v1/?mode=search&text=" + encodeURIComponent(mq.q + " " + city) + "&z=12";
  const [liveRoute, setLiveRoute] = useState(null);   // { key, dist, ascent, elArr, mapD }
  const [routeBusy, setRouteBusy] = useState("");
  const [routeErr, setRouteErr] = useState("");
  function buildRoute(r){
    if (!ORS_KEY) return;
    if (!navigator.geolocation) { setRouteErr("Геолокация недоступна на этом устройстве"); return; }
    setRouteBusy(r.k); setRouteErr("");
    navigator.geolocation.getCurrentPosition((pos)=>{
      const { latitude:lat, longitude:lng } = pos.coords;
      const body = { coordinates:[[lng,lat]], elevation:true, instructions:false,
        options:{ round_trip:{ length:Math.round(r.dist*1000), points:5, seed:1 } } };
      fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", {
        method:"POST",
        headers:{ "Authorization":ORS_KEY, "Content-Type":"application/json" },
        body:JSON.stringify(body)
      }).then(res=>res.json()).then(d=>{
        const f = d && d.features && d.features[0];
        if (!f || !f.geometry || !f.geometry.coordinates) throw new Error("no route");
        const coords = f.geometry.coordinates;
        const dist = (f.properties && f.properties.summary ? f.properties.summary.distance : 0)/1000;
        const ascent = f.properties ? f.properties.ascent : null;
        const eles = coords.map(c=>c[2]).filter(v=>typeof v==="number");
        setLiveRoute({ key:r.k, dist, ascent, elArr:sampleArr(eles,16), mapD:linePath(sampleArr(coords,120),260,150,10) });
        setRouteBusy("");
      }).catch(()=>{ setRouteErr("Не удалось построить маршрут — попробуй ещё раз"); setRouteBusy(""); });
    }, ()=>{ setRouteErr("Разреши доступ к геолокации, чтобы построить маршрут рядом"); setRouteBusy(""); }, { enableHighAccuracy:false, timeout:9000, maximumAge:60000 });
  }
  const hobbies = pick(leisureFor(chId), 3, 9);   // три занятия на сегодня
  const ideas = shuffleDay(nicheFor(chId), 2);    // вечерние сценарии под эстетику
  return (
    <div>
      <Label>Досуг</Label>
      <div style={{ display:"flex", alignItems:"center", gap:6, margin:"6px 0 4px" }}>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:34, margin:0, color:C.ink }}>{city}</h1>
      </div>
      <p style={{ fontSize:13.5, color:C.inkSoft, margin:"0 0 18px", lineHeight:1.5 }}>Не нужно ничего искать в общем списке — мы уже отобрали самые красивые места и занятия под твою эстетику.</p>

      {/* Быстрые входы наверху — спорт, языки, забота (чтобы не листать до низа) */}
      <div style={{ margin:"2px 0 10px" }}><Label color={C.inkFaint}>Под твою эстетику</Label></div>
      <div style={{ display:"flex", gap:8 }}>
        <button onClick={openSport} className="pop" style={{ flex:1, textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", borderRadius:16, padding:"13px 13px", cursor:"pointer" }}>
          <Label color={C.inkFaint}>Каждый день</Label>
          <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, margin:"3px 0 2px", display:"flex", alignItems:"center", gap:7 }}><BrandIcon name="wave" size={17} color={partner}/>Спорт</div>
          <p style={{ fontSize:11.5, color:C.inkSoft, margin:0, lineHeight:1.3 }}>бег, пилатес, видео</p>
        </button>
        <button onClick={openLang} className="pop" style={{ flex:1, textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", borderRadius:16, padding:"13px 13px", cursor:"pointer" }}>
          <Label color={C.inkFaint}>Красиво</Label>
          <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, margin:"3px 0 2px", display:"flex", alignItems:"center", gap:7 }}><BrandIcon name="book" size={17} color={partner}/>Языки</div>
          <p style={{ fontSize:11.5, color:C.inkSoft, margin:0, lineHeight:1.3 }}>уроки по неделям</p>
        </button>
      </div>
      {profile.pet && profile.pet!=="Нет" && (<button onClick={openPets} className="pop" style={{ width:"100%", textAlign:"left", display:"flex", alignItems:"center", gap:13, marginTop:12, borderRadius:18, background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, padding:"14px 16px", cursor:"pointer" }}>
        <GlowOrb partner={partner} size={36} spark={false}/>
        <div style={{ flex:1 }}><Label color={C.inkFaint}>Для тех, у кого есть питомец</Label><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, marginTop:2 }}>Питомцы — забота и радость</div><p style={{ fontSize:11.5, color:C.inkSoft, margin:"2px 0 0", lineHeight:1.3 }}>маршруты · мероприятия · психология · игрушки</p></div>
        <ArrowRight size={19} strokeWidth={1.7} color={C.ink}/>
      </button>)}
      <div style={{ height:1, background:C.line, margin:"20px 0 24px" }}/>

      {/* Карта Slow Glow — точные эстетичные места рядом */}
      <div style={{ marginBottom:26 }}>
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:10, margin:"0 0 4px" }}>
          <Label>Карта Slow Glow</Label>
          <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", color:C.inkFaint }}>ТОЧНО ПОД ЭСТЕТИКУ</span>
        </div>
        <div style={{ display:"flex", gap:6, background:"rgba(255,255,255,0.5)", border:`1px solid ${C.line}`, borderRadius:99, padding:4, margin:"0 0 10px" }}>
          {MAP_TABS.map(t=>{
            const on=mapTab===t.id;
            return (
              <button key={t.id} onClick={()=>{ setMapTab(t.id); setMapPick(0); sgTrack("map_tab",{tab:t.label}); }} style={{ flex:1, border:"none", cursor:"pointer", borderRadius:99, padding:"8px 0", background:on?`linear-gradient(120deg, ${C.butter}, ${partner})`:"transparent", fontFamily:head, fontSize:12, letterSpacing:"0.03em", color:C.ink, fontWeight:on?600:400 }}>{t.label}</button>
            );
          })}
        </div>
        <p style={{ fontSize:12.5, color:C.inkFaint, margin:"0 0 12px", lineHeight:1.5 }}>{MAP_TABS[mapTab].note}</p>

        {mapTab!==2 ? (
        <>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:10, margin:"0 0 12px" }}>
          {picks.map((m,i)=>{
            const on = i===mapPick;
            return (
              <button key={m.k} onClick={()=>{ setMapPick(i); sgTrack("map_pick",{q:m.q}); }} style={{ flexShrink:0, display:"inline-flex", alignItems:"center", gap:7, border:on?"none":`1px solid ${C.line}`, background:on?`linear-gradient(120deg, ${C.butter}, ${partner})`:"rgba(255,255,255,0.6)", borderRadius:99, padding:"8px 13px", cursor:"pointer" }}>
                <BrandIcon name={m.icon} size={15} color={C.ink}/>
                <span style={{ fontFamily:head, fontSize:11.5, letterSpacing:"0.02em", color:C.ink, fontWeight:on?600:400, whiteSpace:"nowrap" }}>{m.k}</span>
              </button>
            );
          })}
        </div>

        <div style={{ position:"relative", borderRadius:20, overflow:"hidden", border:`1px solid ${C.line}`, boxShadow:`0 22px 46px -34px ${partner}`, background:`linear-gradient(135deg, ${C.sand}, ${C.oat})` }}>
          <iframe title="Карта Slow Glow" src={mapSrc} loading="lazy" style={{ display:"block", width:"100%", height:282, border:"none" }} allowFullScreen></iframe>
          <span style={{ position:"absolute", top:12, left:12, display:"inline-flex", alignItems:"center", gap:6, background:"rgba(250,248,241,0.94)", borderRadius:99, padding:"6px 12px", fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink, pointerEvents:"none", boxShadow:"0 6px 16px -8px rgba(26,26,26,0.35)" }}><span style={{ color:partner }}>✦</span> {MAP_TABS[mapTab].badge}</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, marginTop:10 }}>
          <span style={{ fontSize:12, color:C.inkSoft }}>{mq.k}{mq.d?" · "+mq.d:""} · {city}</span>
          <a href={ymaps(mq.q)} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:11, letterSpacing:"0.04em", color:partner, textDecoration:"none" }}>Открыть на Картах <ArrowRight size={14} strokeWidth={2}/></a>
        </div>
        </>
        ) : (
        <>
        <div style={{ display:"inline-flex", alignItems:"center", gap:7, marginBottom:12, padding:"6px 12px", borderRadius:99, background:`${partner}1f`, border:`1px solid ${C.line}` }}>
          <span style={{ color:partner }}>✦</span><span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink }}>Маршруты от Slow Glow</span>
        </div>
        {ROUTE_PLANS.map((r)=>{
          const live = (liveRoute && liveRoute.key===r.k) ? liveRoute : null;
          const distV = live ? live.dist.toFixed(1) : r.dist;
          const hasElev = live ? !!(live.elArr && live.elArr.length) : true;
          const gainTxt = live ? (live.ascent!=null ? Math.round(live.ascent)+" м" : "—") : (r.gain+" м");
          const elArr = hasElev && live && live.elArr && live.elArr.length ? live.elArr : r.elev;
          const ep = elevPath(elArr, 260, 56, 6);
          const busy = routeBusy===r.k;
          return (
            <div key={r.k} style={{ border:`1px solid ${live?partner:C.line}`, background:"rgba(255,255,255,0.6)", borderRadius:18, padding:"14px 15px 15px", marginBottom:12 }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:9 }}>
                <span style={{ width:32, height:32, flexShrink:0, borderRadius:10, background:`${partner}1f`, display:"flex", alignItems:"center", justifyContent:"center" }}><BrandIcon name={r.icon} size={17} color={partner}/></span>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                    <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, lineHeight:1.15 }}>{r.k}</span>
                    {live && <span style={{ fontFamily:head, fontSize:8, letterSpacing:"0.1em", textTransform:"uppercase", color:"#fff", background:partner, borderRadius:99, padding:"2px 7px" }}>По тебе</span>}
                  </div>
                  <p style={{ fontSize:12, color:C.inkSoft, margin:"3px 0 0", lineHeight:1.45 }}>{r.vibe}</p>
                </div>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, margin:"11px 0 9px" }}>
                {[["Дистанция", distV+" км"], ["Набор высоты", gainTxt], ["Время", "~"+r.mins+" мин"], ["Покрытие", r.surface]].map(p=>(
                  <span key={p[0]} style={{ display:"inline-flex", alignItems:"baseline", gap:5, background:"rgba(255,255,255,0.7)", border:`1px solid ${C.line}`, borderRadius:99, padding:"5px 10px" }}>
                    <span style={{ fontFamily:head, fontSize:8.5, letterSpacing:"0.08em", textTransform:"uppercase", color:C.inkFaint }}>{p[0]}</span>
                    <span style={{ fontSize:12, color:C.ink, fontWeight:500 }}>{p[1]}</span>
                  </span>
                ))}
              </div>
              {live && live.mapD && (
                <div style={{ position:"relative", borderRadius:12, overflow:"hidden", background:`linear-gradient(135deg, ${C.sand}, ${C.oat})`, border:`1px solid ${C.line}`, marginBottom:9 }}>
                  <svg viewBox="0 0 260 150" width="100%" height="150" style={{ display:"block" }}>
                    <path d={live.mapD} fill="none" stroke={partner} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
                  </svg>
                  <span style={{ position:"absolute", top:6, left:8, fontFamily:head, fontSize:8, letterSpacing:"0.1em", textTransform:"uppercase", color:C.inkFaint }}>Нитка маршрута · от тебя</span>
                </div>
              )}
              {hasElev && (
              <div style={{ position:"relative", borderRadius:12, overflow:"hidden", background:`linear-gradient(180deg, ${C.oat}, rgba(255,255,255,0.4))`, border:`1px solid ${C.line}`, marginBottom:11 }}>
                <svg viewBox="0 0 260 56" width="100%" height="56" preserveAspectRatio="none" style={{ display:"block" }}>
                  <path d={ep.area} fill={`${partner}33`}/>
                  <path d={ep.line} fill="none" stroke={partner} strokeWidth="2" strokeLinejoin="round"/>
                </svg>
                <span style={{ position:"absolute", top:6, left:8, fontFamily:head, fontSize:8, letterSpacing:"0.1em", textTransform:"uppercase", color:C.inkFaint }}>{live?"Профиль высоты · по тебе":"Профиль высоты"}</span>
              </div>
              )}
              <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                {ORS_KEY && <button onClick={()=>buildRoute(r)} disabled={busy} style={{ border:"none", background:"transparent", padding:0, cursor:busy?"default":"pointer", display:"inline-flex", alignItems:"center", gap:6, fontFamily:head, fontSize:11, letterSpacing:"0.05em", color:partner }}>{busy?"Строю…":(live?"Обновить по мне":"Построить точно по мне")} <ArrowRight size={14} strokeWidth={2}/></button>}
                <a href={ymaps(r.q)} target="_blank" rel="noopener noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:6, fontFamily:head, fontSize:11, letterSpacing:"0.05em", color:ORS_KEY?C.inkSoft:partner, textDecoration:"none" }}>На Картах <ArrowRight size={14} strokeWidth={2}/></a>
              </div>
            </div>
          );
        })}
        {routeErr && <p style={{ fontSize:11.5, color:C.coral, lineHeight:1.5, margin:"0 0 6px" }}>{routeErr}</p>}
        <p style={{ fontSize:11.5, color:C.inkFaint, lineHeight:1.5, margin:"2px 0 0" }}>{ORS_KEY ? "«Построить точно по мне» строит реальную нитку от твоего местоположения с точной дистанцией и набором высоты." : "Дистанция и набор высоты — ориентир эталонного маршрута этого типа. Точную нитку под себя построй на Картах."}</p>
        </>
        )}
      </div>

      {/* Опиши настроение — подберём место (вместо ручного поиска) */}
      <button onClick={openScan} className="pop" style={{ width:"100%", textAlign:"left", display:"flex", alignItems:"center", gap:13, marginBottom:24, borderRadius:18, background:premium?`linear-gradient(120deg, ${C.butter}, ${partner})`:"rgba(255,255,255,0.6)", border:premium?"none":`1px solid ${C.line}`, padding:"14px 16px", cursor:"pointer" }}>
        <GlowOrb partner={partner} size={36} spark={false}/>
        <div style={{ flex:1 }}><Label color={premium?"rgba(26,26,26,0.55)":C.inkFaint}>Подбор места{premium?"":" · Plus"}</Label><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, marginTop:2 }}>Опиши настроение — найду место</div></div>
        <ArrowRight size={19} strokeWidth={1.7} color={C.ink}/>
      </button>

      {/* Отобранные места — ручная подборка под эстетику */}
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap:10, margin:"0 0 4px" }}>
        <Label>Отобранные места</Label>
        <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", color:C.inkFaint }}>РУЧНАЯ ПОДБОРКА</span>
      </div>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"0 0 14px", lineHeight:1.5 }}>Атмосфера, свет и тишина — а не всё подряд. Тапни карточку, чтобы открыть похожее место рядом с тобой.</p>
      <div style={{ marginBottom:4 }}>
        {PLACE_POOL.map((p,i)=>{
          const q = PLACE_Q[p.sc] || p.name;
          return (
            <a key={i} href={ymaps(q)} target="_blank" rel="noopener noreferrer" className="pop" style={{ display:"block", textDecoration:"none", marginBottom:14, borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}` }}>
              <div style={{ position:"relative" }}>
                <Photo t={p.t} url={p.url} h={150} radius={0}>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 55%, rgba(26,26,26,0.42) 100%)" }}/>
                </Photo>
                <span style={{ position:"absolute", top:11, left:11, background:"rgba(250,248,241,0.92)", borderRadius:99, padding:"4px 11px", fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink }}>{p.sc}</span>
              </div>
              <div style={{ padding:"13px 15px 15px" }}>
                <div style={{ fontFamily:serif, fontSize:18, color:C.ink, lineHeight:1.2 }}>{p.name}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:10 }}>
                  {p.why.map(w=><span key={w} style={{ fontSize:12, color:C.ink, background:C.sage, padding:"4px 10px", borderRadius:99 }}>✓ {w}</span>)}
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:13 }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12.5, color:C.inkSoft }}><MapPin size={13} strokeWidth={1.9} color={partner}/> Похожее рядом · {city}</span>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:11, letterSpacing:"0.04em", color:C.ink }}>На карте <ArrowRight size={15} strokeWidth={1.8}/></span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Мои места */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", margin:"24px 0 10px" }}>
        <Label color={C.inkFaint}>Мои места{userPlaces && userPlaces.length?` · ${userPlaces.length}`:""}</Label>
        <button onClick={openAddPlace} style={{ display:"inline-flex", alignItems:"center", gap:5, border:"none", background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${partner})`, color:C.ink, borderRadius:99, padding:"7px 13px", fontFamily:head, fontSize:11.5, letterSpacing:"0.04em", cursor:"pointer" }}><Plus size={14} strokeWidth={2.2}/> Добавить</button>
      </div>
      {(!userPlaces || userPlaces.length===0) ? (
        <button onClick={openAddPlace} style={{ width:"100%", textAlign:"left", border:`1px dashed ${C.line}`, background:"rgba(255,255,255,0.4)", borderRadius:16, padding:"16px 16px", cursor:"pointer", marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
          <GlowOrb partner={partner} size={34} spark={false}/>
          <div><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.ink }}>Сохрани любимое место</div><p style={{ fontSize:12.5, color:C.inkSoft, margin:"2px 0 0", lineHeight:1.35 }}>Нашёл своё кафе, ресторан или уголок города? Добавь его с фото и описанием — будет под рукой.</p></div>
        </button>
      ) : (
        <div style={{ marginBottom:8 }}>
          {userPlaces.map(p=>(
            <div key={p.id} className="fade" style={{ marginBottom:14, borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}` }}>
              {p.photo
                ? <img src={p.photo} alt={p.name} style={{ width:"100%", height:160, objectFit:"cover", display:"block" }}/>
                : <Photo t={(p.id||0)%6} icon="pin" h={120} radius={0}/>}
              <div style={{ padding:"13px 15px 15px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink, background:C.sage, padding:"3px 9px", borderRadius:99 }}>{p.type}</span>
                  <span style={{ fontSize:11.5, color:C.inkFaint }}>добавлено {p.date}</span>
                </div>
                <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, color:C.ink, lineHeight:1.15 }}>{p.name}</div>
                {p.addr && <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:12.5, color:C.inkSoft, margin:"5px 0 0" }}><MapPin size={13} strokeWidth={1.8} color={partner}/> {p.addr}</div>}
                {p.desc && <p style={{ fontSize:13.5, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 0" }}>{p.desc}</p>}
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:12 }}>
                  <a href={`https://yandex.ru/maps/?text=${encodeURIComponent([p.name,p.addr,p.city].filter(Boolean).join(" "))}`} target="_blank" rel="noreferrer" style={{ flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6, textDecoration:"none", border:"none", background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${partner})`, color:C.ink, borderRadius:99, padding:"9px 12px", fontFamily:head, fontSize:11.5, letterSpacing:"0.04em", cursor:"pointer" }}><MapPin size={14} strokeWidth={2}/> На карте</a>
                  <button onClick={()=>onEditPlace(p)} aria-label="Редактировать" style={{ width:38, height:38, borderRadius:99, border:`1px solid ${C.line}`, background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:C.inkSoft, flexShrink:0 }}>✎</button>
                  <button onClick={()=>{ if(window.confirm(`Удалить «${p.name}» из коллекции?`)) onDeletePlace(p.id); }} aria-label="Удалить" style={{ width:38, height:38, borderRadius:99, border:`1px solid ${C.line}`, background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:C.inkSoft, flexShrink:0 }}><X size={16} strokeWidth={2}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Занятия под настроение — три на сегодня */}
      <div style={{ margin:"24px 0 4px" }}><Label>Занятия под настроение</Label></div>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"0 0 12px", lineHeight:1.5 }}>Три красивых занятия на сегодня — каждое открывается с правилами и пользой. Обновляются ежедневно.</p>
      {hobbies.map((l,i)=>(
        <button key={l.v} onClick={()=>setDetail({ item:l, partner })} className="pop" style={{ width:"100%", textAlign:"left", display:"flex", gap:14, marginBottom:12, borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, padding:12, cursor:"pointer" }}>
          <div style={{ width:78, flexShrink:0 }}><Photo t={l.t} url={l.url} h={78} radius={12}/></div>
          <div style={{ flex:1 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", color:l.air?"#6E8E5E":C.inkFaint, background:l.air?"rgba(194,211,172,0.4)":"rgba(26,26,26,0.05)", padding:"3px 9px", borderRadius:99 }}>
              {l.air && <Wind size={11} strokeWidth={2}/>}{l.air?"На воздухе":"Дома"}
            </span>
            <div style={{ fontFamily:serif, fontSize:17, color:C.ink, margin:"6px 0 3px", lineHeight:1.2 }}>{l.v}</div>
            <p style={{ fontSize:12.5, lineHeight:1.45, color:C.inkSoft, margin:0 }}>{l.note}</p>
          </div>
          <ArrowRight size={17} strokeWidth={1.6} color={C.inkFaint} style={{ alignSelf:"center", flexShrink:0 }}/>
        </button>
      ))}

      {/* Идеи и вечера под эстетику */}
      <div style={{ margin:"24px 0 4px" }}><Label>Идеи и вечера под эстетику</Label></div>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"0 0 12px", lineHeight:1.5 }}>Маленькие сценарии красивых вечеров — вдохновляйся и устраивай. Сохраняй ♡ любимое.</p>
      <div className="sg-scroll" style={{ display:"flex", gap:12, overflowX:"auto", margin:"0 -22px 8px", padding:"0 22px 6px", scrollSnapType:"x mandatory" }}>
        {ideas.map((n,i)=>{
          const item={ id:"niche:"+chId+":"+n.v, kind:"Досуг", t:n.t, q:n.q, ql:n.ql, title:n.v, sub:null, note:n.note };
          const on=isSaved&&isSaved(item.id);
          return (
            <div key={i} style={{ flex:"0 0 auto", width:230, scrollSnapAlign:"start", borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}` }}>
              <div style={{ position:"relative" }}>
                <Photo t={n.t} url={n.url} q={n.q} qlang={n.ql} h={130} radius={0}/>
                {toggleSave && <button onClick={()=>toggleSave(item)} aria-label="Сохранить" style={{ position:"absolute", top:9, right:9, width:32, height:32, borderRadius:99, border:"none", cursor:"pointer", background:"rgba(250,248,241,0.9)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 6px 16px -8px rgba(26,26,26,0.5)" }}><Heart size={16} strokeWidth={1.7} color={on?partner:C.inkSoft} fill={on?partner:"none"}/></button>}
              </div>
              <div style={{ padding:"12px 14px 14px" }}>
                <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, lineHeight:1.18 }}>{n.v}</div>
                <p style={{ fontSize:12.5, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 0" }}>{n.note}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Journal_({ moments }) {
  const [seg, setSeg] = useState("Неделя");
  return (
    <div>
      <Label>Мой журнал</Label>
      <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:34, margin:"6px 0 14px", color:C.ink }}>Мои моменты</h1>
      <div style={{ display:"flex", gap:22, borderBottom:`1px solid ${C.line}`, marginBottom:18 }}>
        {["Неделя","Месяц","Сезон"].map(s=>(
          <button key={s} onClick={()=>setSeg(s)} style={{ border:"none", background:"transparent", cursor:"pointer", padding:"0 0 10px", fontFamily:head, fontSize:14, color:seg===s?C.ink:C.inkFaint, fontWeight:seg===s?500:400, borderBottom:seg===s?`2px solid ${C.ink}`:"2px solid transparent", marginBottom:-1 }}>{s}</button>
        ))}
      </div>
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, lineHeight:1.45, color:C.inkSoft, margin:"0 0 18px" }}>Ты уже живёшь этой жизнью — по кусочку каждый день.</p>
      <div style={{ borderRadius:18, background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, padding:"15px 17px", marginBottom:20 }}>
        <Label color={C.inkFaint}>Что запечатлеть сегодня</Label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginTop:10 }}>
          {["☕ Утренний кофе","🌸 Цветы у окна","📖 Страница книги","🍅 Красивый стол","🌅 Закат","👗 Сегодняшний образ","🕯 Тёплый вечер","🌊 Прогулка"].map(t=>(
            <span key={t} style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:C.ink, background:C.sage, padding:"6px 12px", borderRadius:99 }}>{t}</span>
          ))}
        </div>
        <p style={{ fontSize:12.5, lineHeight:1.45, color:C.inkSoft, margin:"12px 0 0" }}>Нажми «+» внизу и сфотографируй любой красивый момент дня — он станет частью твоего журнала.</p>
      </div>
      <div style={{ columnCount:2, columnGap:12 }}>
        {moments.map((m,i)=>(
          <div key={i} className={m.date==="только что"?"pop":""} style={{ breakInside:"avoid", marginBottom:12 }}>
            <Photo t={m.t ?? 0} url={m.url} h={m.url?undefined:[150,116,134,148,120,140][i%6]} radius={14} style={m.url?{height:"auto"}:undefined}/>
            <div style={{ fontFamily:serif, fontSize:15, color:C.ink, marginTop:7, lineHeight:1.2 }}>{m.cap}</div>
            <div style={{ fontSize:11.5, color:C.inkFaint, marginTop:1 }}>{m.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
function Me_({ ch, chapterId, setChapterId, setPin, setWorld, premium, earlyAccess, openPlus, openTravel, openStylist, openScan, boards, grantTrial, trialActive, trialDaysLeft }) {
  return (
    <div>
      <Label>Your world, curated</Label>
      <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:32, margin:"6px 0 16px", color:C.ink }}>Твой мир</h1>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:22 }}>
        {WORLD_ORDER.map((k,idx)=>(
          <button key={k} onClick={()=>setWorld(k)} style={{ border:"none", background:"transparent", padding:0, cursor:"pointer", textAlign:"center" }}>
            {boards && boards[idx] && boards[idx].url
              ? <img src={boards[idx].url} alt={k} style={{ width:"100%", height:86, objectFit:"cover", borderRadius:10, display:"block" }}/>
              : <Photo t={WORLD[k].items[0].url?0:WORLD[k].items[0].t} url={WORLD[k].items[0].url} h={86} radius={10}/>}
            <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.inkFaint, marginTop:5 }}>{k}</div>
          </button>
        ))}
      </div>
      <div style={{ margin:"2px 0 10px" }}><Label color={C.inkFaint}>ИИ Slow Glow</Label></div>
      <button onClick={()=>setPin(true)} className="pop" style={{ position:"relative", width:"100%", textAlign:"left", border:"none", cursor:"pointer", borderRadius:20, overflow:"hidden", padding:"18px 20px", marginBottom:22, background:`linear-gradient(125deg, ${C.butter}, ${ch.partner} 72%, ${C.oat})`, boxShadow:`0 18px 38px -24px ${ch.partner}` }}>
        <div style={{ position:"absolute", right:-14, top:-14, width:88, height:88, borderRadius:99, background:"rgba(255,255,255,0.22)" }}/>
        <div style={{ position:"relative", display:"flex", alignItems:"center", gap:13 }}>
          <GlowOrb partner={ch.partner} size={44}/>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(26,26,26,0.6)", fontWeight:600, marginBottom:3 }}>Анализатор пинов</div>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, color:C.ink, lineHeight:1.15 }}>Не понимаешь, что тебя цепляет?</div>
            <p style={{ fontSize:12.5, lineHeight:1.42, color:"rgba(26,26,26,0.72)", margin:"5px 0 0" }}>Загрузи любимые сохранения — ИИ соберёт твою эстетику и доску мечты заново. Возвращайся, когда меняется настроение.</p>
          </div>
        </div>
      </button>
      <button onClick={openPlus} style={{ width:"100%", textAlign:"left", border:"none", cursor:"pointer", borderRadius:20, overflow:"hidden", padding:0, marginBottom:14, background:premium?`linear-gradient(120deg, ${C.butter}, ${ch.partner})`:"rgba(255,255,255,0.55)", boxShadow:premium?"0 16px 34px -22px rgba(26,26,26,0.5)":"none", borderWidth:premium?0:1, borderStyle:"solid", borderColor:C.line }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 18px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:13 }}>
            <GlowOrb partner={ch.partner} size={40} spark={false}/>
            <div>
              <Label color={premium?"rgba(26,26,26,0.55)":C.inkFaint}>{premium?(earlyAccess?"Slow Glow Plus · ранний доступ":"Slow Glow Plus"):"Бесплатный план"}</Label>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, marginTop:2 }}>{premium?(earlyAccess?"Открыт бесплатно — для первых ✦":"Активна — спасибо ✦"):"Открыть Plus"}</div>
            </div>
          </div>
          <ArrowRight size={20} strokeWidth={1.7} color={C.ink}/>
        </div>
      </button>

      <Referral partner={ch.partner} grantTrial={grantTrial} trialActive={trialActive} trialDaysLeft={trialDaysLeft}/>

      <button onClick={openTravel} style={{ width:"100%", textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.5)", borderRadius:18, padding:"15px 18px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <div><Label>Путешествия{premium?"":" · Plus"}</Label><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, marginTop:3 }}>Куда поехать под твою эстетику</div></div>
        <ArrowRight size={20} strokeWidth={1.7} color={C.inkSoft}/>
      </button>

      <button onClick={openStylist} style={{ width:"100%", textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.5)", borderRadius:18, padding:"15px 18px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
        <div><Label>Личный стилист{premium?"":" · Plus"}</Label><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, marginTop:3 }}>Гардероб и идеи образов</div></div>
        <ArrowRight size={20} strokeWidth={1.7} color={C.inkSoft}/>
      </button>

      <button onClick={openScan} style={{ width:"100%", textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.5)", borderRadius:18, padding:"15px 18px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22 }}>
        <div><Label>Подбор места{premium?"":" · Plus"}</Label><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, marginTop:3 }}>Опиши настроение — найду место</div></div>
        <ArrowRight size={20} strokeWidth={1.7} color={C.inkSoft}/>
      </button>

      <div style={{ borderRadius:20, padding:"18px 20px", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, marginBottom:24 }}>
        <Label>Почему меня тянет к этому</Label>
        <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, lineHeight:1.4, margin:"10px 0 0", color:C.ink }}>{({ summer:"Тебя притягивает не роскошь, а покой. Не громкость, а свет.", romance:"Тебя притягивает нежность. Цветы, мягкий свет и право чувствовать глубоко.", coastal:"Тебя притягивает простор. Море, воздух и лёгкость, где легко дышать.", slow:"Тебя притягивает тишина. Тёплое дерево, чай и ритм без спешки." })[chapterId] || "Тебя притягивает не роскошь, а покой. Не громкость, а свет."}</p>
      </div>
      <SyncCard ch={ch}/>

      <Label>Твои главы</Label>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginTop:14 }}>
        {Object.values(CHAPTERS).map(c=>{ const on=c.id===chapterId; return (
          <button key={c.id} onClick={()=>{ setChapterId(c.id); sgStore.set("sg_chapter", c.id); sgTrack("chapter",{id:c.id}); }} style={{ border:on?`1.5px solid ${C.ink}`:`1px solid ${C.line}`, background:"rgba(255,255,255,0.5)", borderRadius:18, padding:"16px 14px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:10, transition:"border-color 200ms" }}>
            <GlowOrb partner={c.partner} size={64} spark={false}/>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.ink, lineHeight:1.1, textAlign:"center" }}>{c.name}</div>
            {on && <div style={{ fontFamily:head, fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", color:C.inkFaint }}>сейчас</div>}
          </button>
        ); })}
      </div>
      <div style={{ textAlign:"center", padding:"28px 0 6px", fontFamily:head, fontSize:11, letterSpacing:"0.3em", color:C.inkFaint }}>LIVE BEAUTIFULLY</div>
    </div>
  );
}

// ── OVERLAYS ──────────────────────────────────────────────────────
function SavedView({ saved, ch, toggleSave, onClose }) {
  const [open, setOpen] = useState(null);
  if (open) {
    return (
      <OverlayShell partner={ch.partner} label={"СОХРАНЁНО · "+((open.sub||"").toUpperCase())} onClose={()=>setOpen(null)}>
        {open.t!=null && <Photo t={open.t} url={open.url} q={open.q} qlang={open.ql} h={180} radius={18}/>}
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:27, lineHeight:1.15, margin:"16px 0 12px", color:C.ink }}>{open.title}</h1>
        {open.note && <p style={{ fontSize:14.5, lineHeight:1.6, color:C.inkSoft, margin:"0 0 10px" }}>{open.note}</p>}
        {open.body && <p style={{ fontSize:15, lineHeight:1.7, color:C.ink, margin:0, whiteSpace:"pre-line" }}>{open.body}</p>}
        <button onClick={()=>setOpen(null)} style={{ marginTop:22, display:"inline-flex", alignItems:"center", gap:7, border:"none", background:"transparent", cursor:"pointer", fontFamily:head, fontSize:12, letterSpacing:"0.06em", color:ch.partner }}><ArrowLeft size={15} strokeWidth={2}/> ко всему сохранённому</button>
      </OverlayShell>
    );
  }
  return (
    <OverlayShell partner={ch.partner} label="СОХРАНЁННОЕ" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
        <GlowOrb partner={ch.partner} size={54}/>
        <div>
          <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:25, lineHeight:1.1, margin:0, color:C.ink }}>Твоё сохранённое</h1>
          <p style={{ fontSize:12.5, color:C.inkFaint, margin:"3px 0 0" }}>{saved.length>0?`${saved.length} ${saved.length===1?"материал":"материала+"} в коллекции`:"коллекция любимого"}</p>
        </div>
      </div>
      {saved.length===0 ? (
        <div style={{ textAlign:"center", padding:"38px 18px", border:`1px dashed ${C.line}`, borderRadius:18, marginTop:14 }}>
          <Heart size={26} strokeWidth={1.4} color={C.inkFaint}/>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.inkSoft, margin:"10px 0 4px" }}>Здесь будет то, что ты полюбишь</p>
          <p style={{ fontSize:13, color:C.inkFaint, margin:0, lineHeight:1.5 }}>Двойной тап в «Потоке», ♡ на статьях и идеях — и всё любимое соберётся сюда красивой доской.</p>
        </div>
      ) : (
        <div style={{ columns:2, columnGap:10, marginTop:6 }}>
          {saved.map((it,i)=>{ const hh = 116 + ((String(it.id).length*29 + i*41) % 96); return (
            <div key={it.id} className={"fade st"+((i%6)+1)} style={{ breakInside:"avoid", marginBottom:10, borderRadius:16, overflow:"hidden", position:"relative", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.7)" }}>
              <button onClick={()=>setOpen(it)} style={{ width:"100%", textAlign:"left", border:"none", background:"transparent", cursor:"pointer", padding:0, display:"block" }}>
                {it.t!=null ? (
                  <div style={{ position:"relative" }}>
                    <Photo t={it.t} url={it.url} q={it.q} qlang={it.ql} h={hh} radius={0}>
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, rgba(26,26,26,0.55) 100%)" }}/>
                    </Photo>
                    <div style={{ position:"absolute", left:10, right:10, bottom:8 }}>
                      <div style={{ fontFamily:head, fontSize:8, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.8)" }}>{it.kind}</div>
                      <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:"#fff", lineHeight:1.2, marginTop:1, textShadow:"0 1px 6px rgba(26,26,26,0.6)" }}>{it.title}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding:"16px 13px 13px" }}>
                    <div style={{ fontFamily:head, fontSize:8, letterSpacing:"0.12em", textTransform:"uppercase", color:ch.partner }}>{it.kind}</div>
                    <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:14.5, color:C.ink, lineHeight:1.25, marginTop:3 }}>{it.title}</div>
                    {it.sub && <div style={{ fontSize:10.5, color:C.inkFaint, marginTop:3 }}>{it.sub}</div>}
                  </div>
                )}
              </button>
              <button onClick={()=>toggleSave(it)} aria-label="Убрать" className="tapPop" style={{ position:"absolute", top:7, right:7, width:28, height:28, borderRadius:99, border:"none", cursor:"pointer", background:"rgba(250,248,241,0.9)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Heart size={13} strokeWidth={1.8} color={ch.partner} fill={ch.partner}/>
              </button>
            </div>
          ); })}
        </div>
      )}
    </OverlayShell>
  );
}

// ── MIND ART (фирменный градиент + иконка) ────────────────────────
const MIND_ICN = {
  book:"<path d='M60 31 C54 27 46 27 42 30 L42 58 C46 55 54 55 60 59 C66 55 74 55 78 58 L78 30 C74 27 66 27 60 31 Z'/><line x1='60' y1='31' x2='60' y2='59'/>",
  racket:"<circle cx='60' cy='37' r='13'/><path d='M53 28 L67 46 M53 46 L67 28 M60 24 L60 50'/><path d='M55 49 L52 66 M65 49 L68 66'/>",
  heart:"<path d='M60 66 C38 52 38 32 53 34 C58 35 60 40 60 43 C60 40 62 35 67 34 C82 32 82 52 60 66 Z'/>",
  note:"<line x1='56' y1='30' x2='56' y2='55'/><ellipse cx='51' cy='55' rx='6' ry='4.5'/><path d='M56 30 L70 26 L70 35'/><ellipse cx='65' cy='55' rx='6' ry='4.5'/><line x1='70' y1='35' x2='70' y2='55'/>",
  frame:"<rect x='44' y='27' width='32' height='35' rx='2'/><path d='M44 55 L53 45 L61 53 L69 43 L76 51'/><circle cx='66' cy='35' r='3'/>",
  dress:"<path d='M53 29 L60 33 L67 29 L72 41 L66 44 L66 62 L54 62 L54 44 L48 41 Z'/>",
  spiral:"<path d='M60 45 m0 -16 a16 16 0 1 1 -11 27 a10 10 0 1 1 16 -7 a5 5 0 1 1 -7 4'/>",
  sun:"<circle cx='60' cy='45' r='12'/><path d='M60 26 L60 20 M60 70 L60 64 M79 45 L85 45 M35 45 L41 45 M73 32 L78 27 M42 58 L37 63 M73 58 L78 63 M42 32 L37 27'/>",
  glass:"<path d='M52 27 L68 27 L64 43 L60 47 L56 43 Z'/><line x1='60' y1='47' x2='60' y2='61'/><line x1='53' y1='61' x2='67' y2='61'/>",
  cup:"<path d='M44 40 L72 40 L72 52 Q72 64 58 64 Q44 64 44 52 Z'/><path d='M72 44 Q80 44 80 51 Q80 58 72 58'/><path d='M52 30 Q50 34 52 36 M60 30 Q58 34 60 36'/>",
  leaf:"<path d='M60 24 C78 30 80 54 60 68 C40 54 42 30 60 24 Z'/><path d='M60 30 L60 62'/>",
  mountains:"<path d='M42 59 L54 39 L62 51 L70 37 L80 59 Z'/><circle cx='69' cy='33' r='3'/>",
  quill:"<path d='M47 63 C56 53 64 40 75 29 C71 44 60 55 51 61 Z'/><line x1='47' y1='63' x2='53' y2='57'/>",
  hourglass:"<path d='M50 29 L70 29 L60 45 Z'/><path d='M50 61 L70 61 L60 45 Z'/><line x1='47' y1='29' x2='73' y2='29'/><line x1='47' y1='61' x2='73' y2='61'/>",
  portrait:"<circle cx='60' cy='39' r='8'/><path d='M46 62 C46 52 54 50 60 50 C66 50 74 52 74 62'/>",
  house:"<path d='M44 46 L60 31 L76 46'/><path d='M48 46 L48 62 L72 62 L72 46'/>",
  enso:"<path d='M70 32 A16 16 0 1 0 73 53'/>",
  flower:"<circle cx='60' cy='32' r='7'/><circle cx='73' cy='42' r='7'/><circle cx='68' cy='57' r='7'/><circle cx='52' cy='57' r='7'/><circle cx='47' cy='42' r='7'/><circle cx='60' cy='46' r='5'/>",
  bulb:"<circle cx='60' cy='40' r='11'/><line x1='55' y1='53' x2='65' y2='53'/><line x1='56' y1='57' x2='64' y2='57'/><line x1='57' y1='61' x2='63' y2='61'/>",
};
const mindIcon = (v="",k="") => {
  const t=String(v).toLowerCase();
  if(/сердц/.test(t)) return "heart";
  if(/музык|мурашк/.test(t)) return "note";
  if(/сечени|фибонач/.test(t)) return "spiral";
  if(/небо|закат/.test(t)) return "sun";
  if(/шампан|пузырьк/.test(t)) return "glass";
  if(/кофе/.test(t)) return "cup";
  if(/теннис|гаррос/.test(t)) return "racket";
  if(/цвет/.test(t)) return "flower";
  if(/балет/.test(t)) return "portrait";
  if(/письм|каллигр/.test(t)) return "quill";
  return MIND_CAT[k] || "enso";
};
const mindArt = (a) => {
  const g = MIND_GRAD[(a.t||0)%6];
  const icon = MIND_ICN[mindIcon(a.v,a.k)] || MIND_ICN.enso;
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='"+g[0]+"'/><stop offset='1' stop-color='"+g[1]+"'/></linearGradient></defs><rect width='120' height='90' fill='url(#g)'/><circle cx='60' cy='45' r='29' fill='#FFFFFF' opacity='0.18'/><g fill='none' stroke='#FFFFFF' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' opacity='0.95'>"+icon+"</g></svg>";
  return "data:image/svg+xml," + encodeURIComponent(svg);
};

/* Картинки для «Идеи для ума».
   Вставь сюда свои изображения по ТОЧНОМУ заголовку темы:
   "Заголовок темы": "https://...  или  data:image/jpeg;base64,...",
   Пока строки нет — карточка показывает фирменный градиент (всё работает без картинки).
   Один пример для образца ниже — замени и дополни своими. */
const strSalt = s => { let h=0; const t=String(s); for(let i=0;i<t.length;i++){ h=(h*31 + t.charCodeAt(i))>>>0; } return h%997; };
const mindPic = (a) => MIND_IMG[a.v] || pickOne(MIND_CAT_IMG[a.k]||[], strSalt(a.v)) || mindArt(a);

/* Раскладывает карточки так, чтобы соседние не были одной категории
   (значит, и картинки рядом не повторяются). */
function sgSpread(arr, keyOf){
  const out=[], rest=[...arr];
  while(rest.length){
    let i=0;
    if(out.length){ const last=keyOf(out[out.length-1]); const j=rest.findIndex(x=>keyOf(x)!==last); i=j>=0?j:0; }
    out.push(rest.splice(i,1)[0]);
  }
  return out;
}

/* ── Карточка-факт для Stories ───────────────────────────────
   Берёт содержательный факт из статьи (a.v + a.body) и рисует
   красивую карточку 9:16: настоящее фото-фон + текст поверх,
   как открытка, но со смыслом. Если фото нельзя нарисовать на
   canvas (CORS) — мягкий градиент-фолбэк, картинка всегда выходит. */
function sgCover(x, img, W, H){ const ir=img.width/img.height, cr=W/H; let w,h; if(ir>cr){ h=H; w=H*ir; } else { w=W; h=W/ir; } x.drawImage(img,(W-w)/2,(H-h)/2,w,h); }
function sgLines(x, t, maxW){ const words=String(t).split(" "); let line="",L=[]; words.forEach(o=>{ const tt=line?line+" "+o:o; if(x.measureText(tt).width>maxW && line){ L.push(line); line=o; } else line=tt; }); if(line) L.push(line); return L; }
function sgFactExcerpt(body, max=212){ const p=(String(body||"").split("\n").map(s=>s.trim()).filter(Boolean)[0])||""; if(p.length<=max) return p; const cut=p.slice(0,max+1); const b=Math.max(cut.lastIndexOf(". "),cut.lastIndexOf("! "),cut.lastIndexOf("? ")); if(b>=120) return p.slice(0,b+1); return cut.slice(0,cut.lastIndexOf(" ")).replace(/[\s.,;:!?—-]+$/,"")+"…"; }
function ShareFact({ a, ch }){
  const ref=useRef(null);
  const [busy,setBusy]=useState(false);
  const pic=mindPic(a);
  const grad=MIND_GRAD[((a.t%MIND_GRAD.length)+MIND_GRAD.length)%MIND_GRAD.length];
  const excerpt=sgFactExcerpt(a.body);
  const shareText=`${a.v} — красивый факт из Slow Glow. Узнай больше → slow-glow.app`;
  function loadImg(src){ return new Promise((res,rej)=>{ const im=new Image(); im.crossOrigin="anonymous"; im.onload=()=>res(im); im.onerror=()=>rej(new Error("x")); im.src=src; }); }
  async function paint(){
    const cv=ref.current, W=1080, H=1920; cv.width=W; cv.height=H; const x=cv.getContext("2d");
    try{ await document.fonts.load("400 90px 'Instrument Serif'"); await document.fonts.load("500 30px Inter"); await document.fonts.ready; }catch(e){}
    let img=null; try{ img=await loadImg(pic); }catch(e){ img=null; }
    if(img && img.width>1 && img.height>1){ sgCover(x,img,W,H); x.fillStyle="rgba(20,16,14,0.20)"; x.fillRect(0,0,W,H); }
    else { const g=x.createLinearGradient(0,0,W,H); g.addColorStop(0,grad[0]); g.addColorStop(1,grad[1]); x.fillStyle=g; x.fillRect(0,0,W,H); x.fillStyle="rgba(255,255,255,0.14)"; x.beginPath(); x.arc(W*0.8,H*0.18,300,0,7); x.fill(); }
    // верхний и нижний скримы для читаемости
    const tg=x.createLinearGradient(0,0,0,430); tg.addColorStop(0,"rgba(18,14,12,0.46)"); tg.addColorStop(1,"rgba(18,14,12,0)"); x.fillStyle=tg; x.fillRect(0,0,W,430);
    const bgs=x.createLinearGradient(0,H*0.30,0,H); bgs.addColorStop(0,"rgba(16,13,11,0)"); bgs.addColorStop(0.5,"rgba(16,13,11,0.58)"); bgs.addColorStop(1,"rgba(13,10,9,0.92)"); x.fillStyle=bgs; x.fillRect(0,H*0.30,W,H*0.70);
    const M=96;
    // вордмарк
    x.textAlign="left"; x.font="500 30px Inter, sans-serif"; x.fillStyle="rgba(255,255,255,0.92)";
    x.fillText("S L O W   G L O W", M, 122);
    // футер
    x.font="500 29px Inter, sans-serif"; x.fillStyle="rgba(255,255,255,0.74)"; x.fillText("slow-glow.app", M, H-92);
    x.textAlign="right"; x.fillText("красивые факты каждый день", W-M, H-92); x.textAlign="left";
    // экстракт (снизу вверх)
    x.font="400 38px Inter, sans-serif"; let exLines=sgLines(x, excerpt, W-M*2);
    if(exLines.length>4){ exLines=exLines.slice(0,4); exLines[3]=exLines[3].replace(/[\s.,;:!?—-]+$/,"")+"…"; }
    const exLH=56, exLast=H-202, exFirst=exLast-(exLines.length-1)*exLH;
    // заголовок
    x.font="400 90px 'Instrument Serif', Georgia, serif"; const tLines=sgLines(x, a.v, W-M*2);
    const tLH=96, tLast=exFirst-66, tFirst=tLast-(tLines.length-1)*tLH;
    // акцент-черта + рубрика над заголовком
    const cat=tFirst-116;
    x.fillStyle=ch.partner; sgRound(x, M, cat-60, 58, 6, 3); x.fill();
    x.font="500 25px Inter, sans-serif"; x.fillStyle="rgba(255,255,255,0.85)";
    x.fillText(String(a.k).toUpperCase()+"   ·   ФАКТ", M, cat);
    // заголовок
    x.fillStyle="#FFFFFF"; x.font="400 90px 'Instrument Serif', Georgia, serif";
    tLines.forEach((l,i)=>x.fillText(l, M, tFirst+i*tLH));
    // экстракт
    x.fillStyle="rgba(255,255,255,0.9)"; x.font="400 38px Inter, sans-serif";
    exLines.forEach((l,i)=>x.fillText(l, M, exFirst+i*exLH));
  }
  async function blob(){ await paint(); return await new Promise(r=>ref.current.toBlob(r,"image/png",0.95)); }
  function dl(b){ const u=URL.createObjectURL(b); const el=document.createElement("a"); el.href=u; el.download="slow-glow-факт.png"; el.click(); setTimeout(()=>URL.revokeObjectURL(u),1500); }
  async function share(){ setBusy(true); sgTrack("share_fact"); try{ const b=await blob(); const f=new File([b],"slow-glow-факт.png",{type:"image/png"}); if(navigator.canShare&&navigator.canShare({files:[f]})) await navigator.share({files:[f],text:shareText}); else dl(b); }catch(e){} setBusy(false); }
  async function down(){ setBusy(true); try{ dl(await blob()); }catch(e){} setBusy(false); }
  return (
    <div style={{ borderRadius:18, padding:"15px 16px 16px", margin:"22px 0 4px", background:`linear-gradient(125deg, ${C.butter}33, ${ch.partner}22 60%, rgba(255,255,255,0.45))`, border:`1px solid ${C.line}` }}>
      <Label color={ch.partner}>Поделиться фактом</Label>
      <p style={{ fontSize:13, color:C.inkSoft, margin:"5px 0 12px", lineHeight:1.45 }}>Красивая карточка 9:16 с этим фактом — текст прямо на фото, как открытка. Готова для Stories.</p>
      <button onClick={share} disabled={busy} style={{ width:"100%", height:46, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:14, fontWeight:500, marginBottom:8 }}>{busy?"Готовлю карточку…":"Поделиться в сторис"}</button>
      <button onClick={down} disabled={busy} style={{ width:"100%", height:42, borderRadius:99, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", cursor:"pointer", color:C.ink, fontFamily:body, fontSize:13.5 }}>Скачать картинку</button>
      <canvas ref={ref} style={{ display:"none" }}/>
    </div>
  );
}
/* ── Коллекции-капсулы ────────────────────────────────────────
   Прообраз будущей модели: один объект = целый «мир» под состояние.
   Не категории, а сценарий красивого дня. Прототип — French Summer. */
const capsuleById = (id) => CAPSULES.find(c=>c.id===id) || CAPSULES[0];
/* Капсула недели: ротация по номеру недели — каждый понедельник промо на главной меняется само */
const capsuleOfWeek = () => CAPSULES[Math.floor(Date.now()/6048e5) % CAPSULES.length];

function CollectionView({ ch, data, city, onClose }){
  const acc = data.accent || ch.partner;
  const ymaps = (term)=>"https://yandex.ru/maps/?text="+encodeURIComponent(term+" "+(city||"Москва"));
  return (
    <OverlayShell partner={acc} label={"КОЛЛЕКЦИЯ · "+String(data.title).toUpperCase()} onClose={onClose}>
      <div style={{ position:"relative", borderRadius:20, overflow:"hidden", marginBottom:16 }}>
        <Photo t={0} url={data.cover} h={220} radius={0}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(26,26,26,0.12) 0%, transparent 32%, rgba(26,26,26,0.66) 100%)" }}/>
        </Photo>
        <span style={{ position:"absolute", top:12, left:12, background:`linear-gradient(135deg, ${C.butter}, ${acc})`, borderRadius:99, padding:"5px 12px", fontFamily:head, fontSize:9.5, letterSpacing:"0.12em", color:C.ink }}>КОЛЛЕКЦИЯ НЕДЕЛИ</span>
        <div style={{ position:"absolute", left:16, right:16, bottom:14 }}>
          <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:34, color:"#fff", lineHeight:1.05, textShadow:"0 2px 14px rgba(26,26,26,0.5)" }}>{data.title}</div>
          <div style={{ fontFamily:head, fontSize:11, letterSpacing:"0.08em", color:"rgba(255,255,255,0.9)", marginTop:5 }}>{data.ru}</div>
        </div>
      </div>
      <p style={{ fontSize:14.5, lineHeight:1.7, color:C.ink, margin:"0 0 8px" }}>{data.intro}</p>
      <div style={{ height:1, background:C.line, margin:"18px 0 4px" }}/>

      {data.blocks.map((b,i)=>{
        if(b.kind==="quote"){
          return (
            <div key={i} style={{ position:"relative", borderRadius:18, padding:"20px 20px 20px 26px", margin:"18px 0", background:`linear-gradient(125deg, ${C.butter}2e, ${acc}1f 60%, rgba(255,255,255,0.4))`, border:`1px solid ${C.line}` }}>
              <div style={{ position:"absolute", left:0, top:14, bottom:14, width:4, borderRadius:99, background:acc }}/>
              <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, lineHeight:1.4, color:C.ink, margin:0 }}>{b.text}</p>
            </div>
          );
        }
        if(b.kind==="challenge"){
          return (
            <div key={i} style={{ borderRadius:18, padding:"16px 18px", margin:"18px 0 6px", background:`linear-gradient(120deg, ${C.butter}, ${acc} 78%)`, boxShadow:`0 16px 34px -26px ${acc}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}><Sparkles size={14} strokeWidth={2} color="#1A1A1A"/><span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.14em", textTransform:"uppercase", color:"#1A1A1A", fontWeight:600 }}>Мини-задание</span></div>
              <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:17.5, lineHeight:1.4, color:"#1A1A1A", margin:0 }}>{b.text}</p>
            </div>
          );
        }
        return (
          <div key={i} style={{ margin:"20px 0 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:b.note?3:9 }}>
              <span style={{ width:34, height:34, flexShrink:0, borderRadius:11, background:`${acc}1f`, display:"flex", alignItems:"center", justifyContent:"center" }}><BrandIcon name={b.icon} size={18} color={acc} stroke={1.6}/></span>
              <span style={{ fontFamily:head, fontSize:11, letterSpacing:"0.12em", textTransform:"uppercase", color:C.ink }}>{b.k}</span>
            </div>
            {b.note && <p style={{ fontSize:12.5, color:C.inkFaint, margin:"0 0 10px 43px", lineHeight:1.45 }}>{b.note}</p>}
            {b.img && <div style={{ margin:"4px 0 12px" }}><Photo t={i%6} url={b.img} h={150} radius={14}/></div>}
            <div>
              {b.items.map((it,j)=>{
                const inner=(
                  <div style={{ borderLeft:`2px solid ${acc}55`, paddingLeft:13, margin:"0 0 12px" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10 }}>
                      <div style={{ fontFamily:serif, fontSize:17, color:C.ink, lineHeight:1.25 }}>{it.v}</div>
                      {b.placeQ && <span style={{ flexShrink:0, display:"inline-flex", alignItems:"center", gap:4, fontFamily:head, fontSize:10.5, letterSpacing:"0.04em", color:acc }}><MapPin size={13} strokeWidth={1.9}/> рядом</span>}
                    </div>
                    {it.why && <p style={{ fontSize:13, color:C.inkSoft, margin:"4px 0 0", lineHeight:1.5 }}>{it.why}</p>}
                  </div>
                );
                return b.placeQ
                  ? <a key={j} href={ymaps(b.placeQ)} target="_blank" rel="noopener noreferrer" style={{ display:"block", textDecoration:"none" }}>{inner}</a>
                  : <div key={j}>{inner}</div>;
              })}
            </div>
          </div>
        );
      })}

      <ShareList ch={ch} data={data}/>
      <div style={{ height:1, background:C.line, margin:"22px 0 14px" }}/>
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkFaint, textAlign:"center", margin:0 }}>Slow Glow · твой куратор красивой жизни ✦</p>
    </OverlayShell>
  );
}
function Collections_({ ch, onOpen }){
  return (
    <div>
      <Label>Коллекции</Label>
      <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:34, lineHeight:1.06, margin:"6px 0 8px", color:C.ink }}>Сценарии<br/>красивой жизни</h1>
      <p style={{ fontSize:14, lineHeight:1.7, color:C.inkSoft, margin:"0 0 12px" }}>Здесь не бывает случайных рекомендаций. Каждая коллекция — выверенный сценарий целого дня: фильм, музыка, книга, аромат, место и ритуал. Только то, что точно ложится в твою эстетику.</p>
      <div style={{ display:"inline-flex", alignItems:"center", gap:7, marginBottom:24, padding:"6px 13px", borderRadius:99, background:`${ch.partner}1f`, border:`1px solid ${C.line}` }}>
        <span style={{ fontSize:12, color:ch.partner }}>✦</span>
        <span style={{ fontFamily:head, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink }}>Отобрано вручную · ничего случайного</span>
      </div>

      {CAPSULES.map((c,i)=>{
        const acc = c.accent || ch.partner;
        return (
          <button key={c.id} onClick={()=>onOpen(c)} className="pop" style={{ display:"block", width:"100%", textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", padding:0, borderRadius:20, overflow:"hidden", cursor:"pointer", marginBottom:i<CAPSULES.length-1?26:8, boxShadow:`0 22px 46px -32px ${acc}` }}>
            <div style={{ position:"relative" }}>
              <Photo t={i%6} url={c.cover} h={194} radius={0}>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(26,26,26,0.06) 0%, transparent 45%, rgba(26,26,26,0.30) 100%)" }}/>
              </Photo>
              <span style={{ position:"absolute", top:12, left:12, display:"inline-flex", alignItems:"center", gap:6, background:"rgba(250,248,241,0.92)", borderRadius:99, padding:"5px 12px", fontFamily:head, fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:C.ink }}><span style={{ width:6, height:6, borderRadius:99, background:acc }}/>{c.ru}</span>
            </div>
            <div style={{ padding:"16px 18px 18px" }}>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:26, color:C.ink, lineHeight:1.12 }}>{c.title}</div>
              <p style={{ fontSize:13, lineHeight:1.55, color:C.inkSoft, margin:"7px 0 0" }}>{c.sub}</p>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:13, fontFamily:head, fontSize:11, letterSpacing:"0.06em", color:acc }}>Открыть коллекцию <ArrowRight size={14} strokeWidth={2}/></div>
            </div>
          </button>
        );
      })}

      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkFaint, textAlign:"center", margin:"18px 0 4px" }}>Собрано редакцией Slow Glow ✦ Новые коллекции каждую неделю</p>
    </div>
  );
}
function MindView({ ch, onClose, toggleSave, isSaved }) {
  const [sel, setSel] = useState(null);
  const order = sgSpread(pick(MIND.map((_,i)=>i), MIND.length, 3), (i)=>MIND[i].k);
  if (sel !== null) {
    const a = MIND[sel];
    return (
      <OverlayShell partner={ch.partner} label={"ОБОГАЩЕНИЕ · "+a.k.toUpperCase()} onClose={()=>setSel(null)}>
        <Photo t={a.t} url={mindPic(a)} h={180} radius={18}/>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, margin:"16px 0 12px" }}>
          <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:27, lineHeight:1.15, margin:0, color:C.ink }}>{a.v}</h1>
          {toggleSave && (()=>{ const item={ id:"mind:"+sel, kind:"Обогащение", t:a.t, q:a.q, ql:a.qlang, title:a.v, sub:a.k, body:a.body }; const on=isSaved&&isSaved(item.id); return (
            <button onClick={()=>toggleSave(item)} aria-label="Сохранить" style={{ flexShrink:0, marginTop:4, border:`1px solid ${on?ch.partner:C.line}`, background:on?ch.partner:"transparent", borderRadius:99, width:38, height:38, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <Heart size={18} strokeWidth={1.7} color={on?C.ink:C.inkSoft} fill={on?C.ink:"none"}/>
            </button>
          ); })()}
        </div>
        <p style={{ fontSize:15, lineHeight:1.7, color:C.ink, margin:0, whiteSpace:"pre-line" }}>{a.body}</p>
        <ShareFact a={a} ch={ch} />
        <button onClick={()=>setSel(null)} style={{ marginTop:22, display:"inline-flex", alignItems:"center", gap:7, border:"none", background:"transparent", cursor:"pointer", fontFamily:head, fontSize:12, letterSpacing:"0.06em", color:ch.partner }}><ArrowLeft size={15} strokeWidth={2}/> ко всем темам</button>
      </OverlayShell>
    );
  }
  return (
    <OverlayShell partner={ch.partner} label="ОБОГАЩЕНИЕ МОЗГА" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={56}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Идеи для ума</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 18px" }}>Статьи об искусстве, картинах, культуре и медленной жизни. Одна в день — и насмотренность растёт. Нажми карточку, чтобы открыть.</p>
      {(()=>{ const fi=order[0]; const fa=MIND[fi]; return (
        <button onClick={()=>setSel(fi)} className="pop" style={{ display:"block", width:"100%", textAlign:"left", border:`1px solid ${C.line}`, borderRadius:18, overflow:"hidden", padding:0, cursor:"pointer", background:"rgba(255,255,255,0.6)", marginBottom:12 }}>
          <div style={{ position:"relative" }}>
            <Photo t={fa.t} url={mindPic(fa)} h={170} radius={0}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 30%, rgba(26,26,26,0.6) 100%)" }}/>
            </Photo>
            <span style={{ position:"absolute", top:10, left:10, background:`linear-gradient(135deg, ${C.butter}, ${ch.partner})`, borderRadius:99, padding:"4px 11px", fontFamily:head, fontSize:9, letterSpacing:"0.12em", color:C.ink }}>ТЕМА ДНЯ</span>
            <div style={{ position:"absolute", left:14, right:14, bottom:13 }}>
              <div style={{ fontFamily:head, fontSize:9, letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(250,248,241,0.85)" }}>{fa.k}</div>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:21, color:C.cream, lineHeight:1.12, marginTop:3 }}>{fa.v}</div>
            </div>
          </div>
        </button>
      ); })()}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
        {order.slice(1).map((idx,gi)=>{
          const a = MIND[idx];
          return (
            <button key={idx} onClick={()=>setSel(idx)} className="pop" style={{ textAlign:"left", border:`1px solid ${C.line}`, borderRadius:16, overflow:"hidden", padding:0, cursor:"pointer", background:"rgba(255,255,255,0.6)", animationDelay:`${gi*0.05}s` }}>
              <div style={{ position:"relative" }}>
                <Photo t={a.t} url={mindPic(a)} h={96} radius={0}>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, rgba(26,26,26,0.45) 100%)" }}/>
                </Photo>
              </div>
              <div style={{ padding:"9px 11px 12px" }}>
                <div style={{ fontFamily:head, fontSize:8.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.inkFaint }}>{a.k}</div>
                <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.ink, lineHeight:1.2, marginTop:3 }}>{a.v}</div>
              </div>
            </button>
          );
        })}
      </div>
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkFaint, textAlign:"center", margin:"18px 0 0" }}>Обновляется каждый день ✦</p>
    </OverlayShell>
  );
}
function AddPlace({ ch, city, editing, onClose, onSave }) {
  const [name, setName] = useState(editing?.name || "");
  const [type, setType] = useState(editing?.type || "Кафе");
  const [desc, setDesc] = useState(editing?.desc || "");
  const [addr, setAddr] = useState(editing?.addr || "");
  const [photo, setPhoto] = useState(editing?.photo || null);
  const fileRef = useRef(null);
  const TYPES = ["Кафе","Ресторан","Бар","Кофейня","Парк","Магазин","Другое"];
  const onFile = (e) => { const f = e.target.files && e.target.files[0]; if(!f) return; shrinkImage(f,1280,0.82).then(url=>setPhoto(url)).catch(()=>{}); };
  const canSave = name.trim().length > 0;
  const save = () => { if(!canSave) return; onSave({ id:editing?.id || Date.now(), name:name.trim(), type, desc:desc.trim(), addr:addr.trim(), photo, city:city||editing?.city||"", date:editing?.date || new Date().toLocaleDateString("ru-RU",{day:"numeric",month:"long"}) }); };
  const inputStyle = { width:"100%", boxSizing:"border-box", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.7)", borderRadius:13, padding:"12px 14px", fontSize:14.5, fontFamily:body, color:C.ink, outline:"none" };
  return (
    <OverlayShell partner={ch.partner} label={editing?"МОИ МЕСТА · РЕДАКТИРОВАТЬ":"МОИ МЕСТА · ДОБАВИТЬ"} onClose={onClose}>
      <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:27, lineHeight:1.1, margin:"2px 0 6px", color:C.ink }}>{editing?"Редактировать место":"Добавить своё место"}</h1>
      <p style={{ fontSize:14, lineHeight:1.5, color:C.inkSoft, margin:"0 0 18px" }}>{editing?"Измени детали — фото, описание или адрес.":"Понравилось место, которого не было в приложении? Сохрани его в свою коллекцию — с фото, описанием и адресом."}</p>

      <button onClick={()=>fileRef.current && fileRef.current.click()} style={{ width:"100%", height:photo?200:120, borderRadius:16, border:`1px dashed ${C.line}`, background:photo?"transparent":"rgba(255,255,255,0.5)", cursor:"pointer", overflow:"hidden", padding:0, marginBottom:18, position:"relative" }}>
        {photo
          ? <img src={photo} alt="место" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
          : <span style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:7, color:C.inkSoft, fontFamily:body, fontSize:14 }}><Plus size={26} strokeWidth={1.6}/> Добавить фото</span>}
        {photo && <span style={{ position:"absolute", right:10, bottom:10, background:"rgba(250,248,241,0.92)", borderRadius:99, padding:"5px 12px", fontFamily:head, fontSize:11, color:C.ink }}>заменить фото</span>}
      </button>
      <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display:"none" }}/>

      <Label>Название</Label>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Например, кофейня «Тихо»" style={{ ...inputStyle, margin:"8px 0 18px" }}/>

      <Label>Тип места</Label>
      <div style={{ display:"flex", flexWrap:"wrap", gap:7, margin:"10px 0 18px" }}>
        {TYPES.map(t=>(
          <button key={t} onClick={()=>setType(t)} style={{ border:type===t?"none":`1px solid ${C.line}`, background:type===t?`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`:"rgba(255,255,255,0.6)", color:C.ink, borderRadius:99, padding:"8px 15px", fontSize:13, fontFamily:body, cursor:"pointer" }}>{t}</button>
        ))}
      </div>

      <Label>Адрес или район <span style={{ color:C.inkFaint, textTransform:"none", letterSpacing:0 }}>— для отметки на карте</span></Label>
      <input value={addr} onChange={e=>setAddr(e.target.value)} placeholder="Например, ул. Рубинштейна, 5" style={{ ...inputStyle, margin:"8px 0 18px" }}/>

      <Label>Описание</Label>
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Чем понравилось, что заказать, атмосфера…" rows={4} style={{ ...inputStyle, margin:"8px 0 22px", resize:"vertical", lineHeight:1.5 }}/>

      <button onClick={save} disabled={!canSave} style={{ width:"100%", height:54, borderRadius:99, border:"none", cursor:canSave?"pointer":"default", opacity:canSave?1:0.5, background:C.ink, color:C.cream, fontFamily:head, fontSize:16, fontWeight:500 }}>{editing?"Сохранить изменения":"Сохранить в мою коллекцию"}</button>
    </OverlayShell>
  );
}
function OverlayShell({ partner, label, children, onClose }) {
  return (
    <div className="sheet" style={{ position:"absolute", inset:0, zIndex:7, background:C.cream, display:"flex", flexDirection:"column" }}>
      <div style={{ position:"absolute", inset:0, overflow:"hidden", zIndex:0 }}>
        <div className="amb" style={{ position:"absolute", left:"-10%", top:"-8%", width:"90%", height:"44%", background:`radial-gradient(circle, ${C.butter} 0%, ${partner} 44%, transparent 70%)`, filter:"blur(54px)", opacity:0.55 }}/>
      </div>
      <div style={{ position:"relative", zIndex:2, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"22px 24px 6px" }}>
        <div style={{ fontFamily:head, fontSize:12, letterSpacing:"0.3em", color:C.inkFaint }}>{label}</div>
        <button onClick={onClose} aria-label="Закрыть" style={{ border:"none", background:"rgba(255,255,255,0.7)", borderRadius:99, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.inkSoft }}><X size={18} strokeWidth={2}/></button>
      </div>
      <div className="sg-scroll" style={{ position:"relative", zIndex:2, flex:1, overflowY:"auto", padding:"4px 24px 28px" }}>{children}</div>
    </div>
  );
}
function WorldDetail({ name, onClose }) {
  const w = WORLD[name];
  return (
    <OverlayShell partner={w.partner} label="ТВОЙ МИР" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
        <GlowOrb partner={w.partner} size={64}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:30, lineHeight:1.05, margin:0, color:C.ink }}>{name}</h1>
      </div>
      <p style={{ fontSize:15, lineHeight:1.6, color:C.inkSoft, margin:"0 0 22px" }}>{w.blurb}</p>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:24 }}>
        {w.items.map((it,i)=>(
          <div key={i} className="fade" style={{ animationDelay:`${i*0.08}s` }}>
            <Photo t={it.t} url={it.url} h={104} radius={12}/>
            <div style={{ fontFamily:serif, fontSize:12.5, fontStyle:"italic", color:C.inkSoft, marginTop:6, lineHeight:1.2, textAlign:"center" }}>{it.cap}</div>
          </div>
        ))}
      </div>
      <Label color={C.inkFaint}>Забота о себе — как</Label>
      <div style={{ margin:"12px 0 22px" }}>
        {w.care.map((st,i)=>(
          <div key={i} style={{ display:"flex", gap:13, marginBottom:12 }}>
            <div style={{ width:26, height:26, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${w.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.ink }}>{i+1}</div>
            <p style={{ fontSize:14.5, lineHeight:1.5, color:C.ink, margin:"2px 0 0" }}>{st}</p>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:12, alignItems:"flex-start", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, borderRadius:16, padding:"15px 17px" }}>
        <GlowOrb partner={w.partner} size={28} spark={false} style={{ marginTop:1, flexShrink:0 }}/>
        <div><Label color={C.inkFaint}>Запомни</Label><p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, lineHeight:1.4, margin:"5px 0 0", color:C.ink }}>{w.note}</p></div>
      </div>
    </OverlayShell>
  );
}
function RecipeDetail({ item, partner, onClose }) {
  return (
    <div className="sheet" style={{ position:"absolute", inset:0, zIndex:9, background:C.cream, display:"flex", flexDirection:"column" }}>
      <div className="sg-scroll" style={{ flex:1, overflowY:"auto" }}>
        <div style={{ position:"relative" }}>
          <Photo t={item.t} url={item.heroUrl||item.url} h={230} radius={0}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, rgba(26,26,26,0.15) 0%, transparent 30%, rgba(26,26,26,0.45) 100%)" }}/>
          </Photo>
          <button onClick={onClose} aria-label="Закрыть" style={{ position:"absolute", top:18, right:18, border:"none", background:"rgba(250,248,241,0.9)", borderRadius:99, width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.ink }}><X size={18} strokeWidth={2}/></button>
          <div style={{ position:"absolute", left:24, right:24, bottom:16 }}>
            <div style={{ fontFamily:head, fontSize:11, letterSpacing:"0.2em", color:"rgba(255,255,255,0.9)", textTransform:"uppercase" }}>{item.k}</div>
            <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:30, lineHeight:1.1, margin:"4px 0 0", color:"#fff", textShadow:"0 1px 10px rgba(26,26,26,0.5)" }}>{item.v}</h1>
          </div>
        </div>
        <div style={{ padding:"18px 24px 30px" }}>
          <div style={{ display:"flex", gap:22, marginBottom:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:7, color:C.inkSoft }}><Clock size={16} strokeWidth={1.7}/><span style={{ fontSize:13.5 }}>{item.time}</span></div>
            <div style={{ display:"flex", alignItems:"center", gap:7, color:C.inkSoft }}><Users size={16} strokeWidth={1.7}/><span style={{ fontSize:13.5 }}>{item.serves}</span></div>
          </div>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, lineHeight:1.45, color:C.inkSoft, margin:"0 0 22px" }}>{item.why}</p>
          <Label>Ингредиенты</Label>
          <div style={{ margin:"12px 0 24px" }}>
            {item.ingredients.map((ing,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 0", borderBottom:`1px solid ${C.line}` }}>
                <div style={{ width:6, height:6, borderRadius:99, background:partner, flexShrink:0 }}/>
                <span style={{ fontSize:14.5, color:C.ink }}>{ing}</span>
              </div>
            ))}
          </div>
          {item.market && (
            <div style={{ display:"flex", gap:11, alignItems:"flex-start", background:"rgba(194,211,172,0.3)", borderRadius:14, padding:"13px 15px", margin:"0 0 24px" }}>
              <span style={{ fontSize:16, marginTop:1 }}>🧺</span>
              <div><Label color="#6E8E5E">Как выбрать на рынке</Label><p style={{ fontSize:13.5, lineHeight:1.5, color:C.ink, margin:"5px 0 0" }}>{item.market}</p></div>
            </div>
          )}
          <Label>Приготовление</Label>
          <div style={{ marginTop:14 }}>
            {item.steps.map((st,i)=>(
              <div key={i} style={{ display:"flex", gap:14, marginBottom:16 }}>
                <div style={{ width:28, height:28, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.ink }}>{i+1}</div>
                <p style={{ fontSize:15, lineHeight:1.5, color:C.ink, margin:"2px 0 0" }}>{st}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeView({ data, onClose, setDetail }) {
  const partner = data.partner;
  const [fridge, setFridge] = useState(()=> sgStore.get("sg_fridge", []));
  const [val, setVal] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState("");
  const addItem = (raw) => { const x = String(raw).trim().toLowerCase(); if(!x) return; setVal(""); setFridge(prev=>{ if(prev.includes(x)) return prev; const next=[...prev,x]; sgStore.set("sg_fridge", next); return next; }); };
  const removeItem = (x) => setFridge(prev=>{ const next=prev.filter(i=>i!==x); sgStore.set("sg_fridge", next); return next; });
  const CHIPS = ["яйца","авокадо","хлеб","помидоры","огурец","сыр","фета","йогурт","творог","овсянка","банан","ягоды","лимон","паста","рис","курица","тунец","нут","шпинат","мёд"];
  const score = (r) => r.key.filter(k => fridge.some(f => k.includes(f)||f.includes(k))).length;
  const matched = fridge.length ? RECIPES.map(r=>({ r, n:score(r) })).filter(x=>x.n>0).sort((a,b)=> b.n-a.n || b.r.key.length-a.r.key.length).slice(0,6) : [];
  const aiCook = async () => {
    if(!fridge.length || aiBusy) return; setAiBusy(true); setAiErr("");
    try {
      const sys = "Ты — опытный шеф-повар Slow Glow с насмотренностью в средиземноморской и домашней кухне. По списку продуктов придумай ОДИН реальный, вкусный и выполнимый рецепт, максимально используя именно то, что есть (можно добавить базовые соль, перец, масло, лук, чеснок, специи, муку). Дай аппетитное красивое название; точные количества в граммах/штуках/ложках; понятные пошаговые действия с приёмами (как и сколько готовить, на каком огне); в поле why — одно тёплое предложение с подсказкой по подаче. Рецепт должен реально получиться из этих продуктов, без экзотики. Верни ТОЛЬКО JSON без markdown: {\"v\":\"название\",\"k\":\"тип: Завтрак/Обед/Ужин/Десерт/Напиток\",\"time\":\"время\",\"serves\":\"порции\",\"why\":\"тёплое предложение с подсказкой по подаче\",\"ingredients\":[\"ингредиент — точное количество\"],\"steps\":[\"конкретный шаг с приёмом\"]}.";
      const prompt = "В холодильнике есть: " + fridge.join(", ") + ". Придумай вкусный рецепт в основном из этого.";
      const r = await fetch(AI_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, system:sys, messages:[{ role:"user", content:prompt }] }) });
      const j = await r.json();
      const txt = (j.content||[]).map(b=>b.text||"").join("").trim();
      const obj = sgParseJSON(txt);   // вырезает JSON даже из ответа с преамбулой или markdown
      if(!obj || !Array.isArray(obj.ingredients) || !Array.isArray(obj.steps)) throw new Error("bad json");
      obj.t = 4; obj.url = RECIPES[fridge.join(",").length % RECIPES.length].url; obj.market = "";
      setDetail({ item:obj, partner, recipe:true });
    } catch(e){
      // Честность: показываем близкий рецепт из подборки и говорим об этом прямо,
      // а не выдаём его за придуманный ИИ.
      const best = fridge.length ? RECIPES.map(r=>({r,n:score(r)})).sort((a,b)=>b.n-a.n)[0].r : pick(RECIPES,1,seedToday)[0];
      setAiErr("Не получилось придумать рецепт из твоих продуктов — показала близкий из подборки. Попробуй ещё раз.");
      setDetail({ item:best, partner, recipe:true });
    }
    setAiBusy(false);
  };
  const Card = (r,i,suffix) => (
    <button key={suffix+i} onClick={()=>setDetail({ item:r, partner, recipe:true })} className="fade" style={{ width:"100%", textAlign:"left", border:"none", background:"transparent", cursor:"pointer", display:"flex", gap:14, padding:"14px 0", borderBottom:`1px solid ${C.line}` }}>
      <div style={{ width:74, flexShrink:0, position:"relative" }}>
        <Photo t={r.t} url={r.url} h={74} radius={12}/>
        {suffix==="m" && <div style={{ position:"absolute", top:6, left:6, fontFamily:head, fontSize:9, letterSpacing:"0.04em", color:"#fff", background:partner, borderRadius:99, padding:"2px 7px" }}>✓ {score(r)}</div>}
      </div>
      <div style={{ flex:1 }}>
        <Label>{r.k} · {r.time}</Label>
        <div style={{ fontFamily:serif, fontSize:18, color:C.ink, margin:"2px 0 4px", lineHeight:1.2 }}>{r.v}</div>
        <p style={{ fontSize:13, lineHeight:1.45, color:C.inkSoft, margin:0 }}>{r.why}</p>
        <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", marginTop:6, color:"#B5826A" }}>Открыть рецепт →</div>
      </div>
    </button>
  );
  return (
    <OverlayShell partner={partner} label={data.label.toUpperCase()} onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
        <GlowOrb partner={partner} size={64}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:30, lineHeight:1.1, margin:0, color:C.ink }}>{data.title}</h1>
      </div>
      <div style={{ borderRadius:18, border:`1px solid ${C.line}`, background:`linear-gradient(168deg, ${partner}1f, rgba(255,255,255,0.7) 60%)`, padding:"16px 16px 18px", marginBottom:22 }}>
        <Label color={partner}>Что у тебя в холодильнике?</Label>
        <p style={{ fontSize:12.5, color:C.inkSoft, margin:"5px 0 12px", lineHeight:1.4 }}>Добавь продукты — подберу рецепты из того, что есть. Или нажми «придумать», и я сочиню рецепт под твои продукты.</p>
        <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.9)", border:`1px solid ${C.line}`, borderRadius:99, padding:"4px 6px 4px 16px", marginBottom:12 }}>
          <input value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addItem(val)} placeholder="Например: яйца, помидоры…" style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:14, fontFamily:body, color:C.ink, padding:"8px 0" }}/>
          <button onClick={()=>addItem(val)} style={{ border:"none", background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${partner})`, borderRadius:99, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.ink, flexShrink:0 }}><Plus size={17} strokeWidth={2}/></button>
        </div>
        {fridge.length>0 && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:12 }}>
            {fridge.map(x=>(
              <button key={x} onClick={()=>removeItem(x)} style={{ display:"inline-flex", alignItems:"center", gap:5, border:`1px solid ${partner}`, background:partner+"22", color:C.ink, borderRadius:99, padding:"5px 10px", fontSize:13, cursor:"pointer" }}>{x}<X size={12} strokeWidth={2.4}/></button>
            ))}
          </div>
        )}
        <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:14 }}>
          {CHIPS.filter(c=>!fridge.includes(c)).slice(0,12).map(c=>(
            <button key={c} onClick={()=>addItem(c)} style={{ border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", color:C.inkSoft, borderRadius:99, padding:"5px 10px", fontSize:13, cursor:"pointer" }}>+ {c}</button>
          ))}
        </div>
        <button onClick={aiCook} disabled={!fridge.length||aiBusy} style={{ width:"100%", border:"none", borderRadius:14, padding:"13px", cursor:fridge.length?"pointer":"default", fontFamily:head, fontSize:12, letterSpacing:"0.08em", textTransform:"uppercase", color:fridge.length?"#fff":C.inkFaint, background:fridge.length?`radial-gradient(circle at 30% 30%, ${C.butter}, ${partner})`:"rgba(26,26,26,0.06)" }}>{aiBusy?"Придумываю рецепт…":"✦ Придумать рецепт из этого"}</button>
        {aiErr && <p style={{ fontSize:12.5, color:"#B5826A", margin:"10px 0 0", lineHeight:1.4 }}>{aiErr}</p>}
      </div>
      {(() => { const td = pick(RECIPES, 10, seedToday); return (
        <div style={{ marginBottom:8 }}>
          <Label>Сегодня готовим</Label>
          <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 4px" }}>10 рецептов под твою эстетику — обновляются каждый день ✦</p>
          {td.map((r,i)=>Card(r,i,"t"))}
        </div>
      ); })()}
      {matched.length>0 && (
        <div style={{ marginBottom:8 }}>
          <Label>Подходит под твой холодильник</Label>
          <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 4px" }}>Чем больше галочка ✓, тем больше совпадений с твоими продуктами.</p>
          {matched.map((x,i)=>Card(x.r,i,"m"))}
        </div>
      )}
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkFaint, textAlign:"center", margin:"24px 0 0" }}>Готовь медленно и с удовольствием ✦</p>
    </OverlayShell>
  );
}

function RubricView({ data, onClose, setDetail }) {
  if (data.recipe) return <RecipeView data={data} onClose={onClose} setDetail={setDetail} />;
  const items = pick(data.items, 4, data.salt);
  return (
    <OverlayShell partner={data.partner} label={data.label.toUpperCase()} onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22 }}>
        <GlowOrb partner={data.partner} size={64}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:30, lineHeight:1.1, margin:0, color:C.ink }}>{data.title}</h1>
      </div>
      {items.map((it,i)=>(
        <button key={i} onClick={()=>setDetail({ item:it, partner:data.partner, recipe:!!data.recipe })} className="fade" style={{ width:"100%", textAlign:"left", border:"none", background:"transparent", cursor:"pointer", display:"flex", gap:14, padding:"14px 0", borderBottom: i<items.length-1?`1px solid ${C.line}`:"none" }}>
          <div style={{ width:74, flexShrink:0 }}><Photo t={it.t} url={it.url||it.heroUrl} h={74} radius={12}/></div>
          <div style={{ flex:1 }}>
            <Label>{it.k}</Label>
            <div style={{ fontFamily:serif, fontSize:18, color:C.ink, margin:"2px 0 4px", lineHeight:1.2 }}>{it.v}</div>
            <p style={{ fontSize:13, lineHeight:1.45, color:C.inkSoft, margin:0 }}>{it.why}</p>
            <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", marginTop:6, color:"#B5826A" }}>{data.recipe?"Открыть рецепт →":"Подробнее →"}</div>
          </div>
        </button>
      ))}
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkFaint, textAlign:"center", margin:"24px 0 0" }}>Подборка обновляется каждый день под твою эстетику ✦</p>
    </OverlayShell>
  );
}
/* ── Шеринг серии/дня: быстрая карточка 9:16 с большим числом ────────────────── */
/* ── «Полный разбор»: красивый печатный документ (Сохранить как PDF).
   Открывает новое окно с версткой разбора в фирменной эстетике и вызывает
   печать — пользователь сохраняет PDF или печатает. Бесплатно (с вотермарком):
   такой документ сохраняют и показывают → он продвигает приложение сам. ── */
function _esc(x){ return String(x==null?"":x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function buildFullAnalysisHTML(ch, D){
  const P = ch.partner || "#C0895E";
  const li = (arr, cls="") => (Array.isArray(arr)?arr:[]).map(x=>`<li class="${cls}">${_esc(x)}</li>`).join("");
  const date = new Date().toLocaleDateString("ru-RU",{ day:"numeric", month:"long", year:"numeric" });
  const pal = (D.palette&&D.palette.length?D.palette:["#F5EEDC","#E8D5B5","#D9B98C","#B98A5E","#7A5A3E"]);
  const sec = (title, inner) => inner ? `<section><h2>${_esc(title)}</h2>${inner}</section>` : "";
  const habits = (D.identity&&D.identity.habits)||[];
  const mindset = (D.identity&&D.identity.mindset)||[];
  return `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Мой разбор эстетики · Slow Glow</title>
<style>
  @page { margin: 20mm 16mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, "Times New Roman", serif; color:#2A2622; background:#FAF8F1; margin:0; padding:0 4mm; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .wm { font-family: Georgia, serif; letter-spacing:.28em; font-size:11px; color:#9A9186; text-transform:uppercase; }
  .cover { padding:26px 0 18px; border-bottom:1px solid #E7E0D5; margin-bottom:22px; }
  .cover .k { font-style:italic; font-size:15px; color:${P}; margin:14px 0 4px; }
  h1 { font-style:italic; font-weight:normal; font-size:38px; line-height:1.06; margin:2px 0 0; }
  .date { font-size:12px; color:#9A9186; margin-top:10px; }
  .twin { border:1px solid ${P}55; border-radius:14px; padding:16px 18px; margin:18px 0; background:linear-gradient(135deg,#F5EAD9,#FAF8F1); }
  .twin .k { font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:${P}; }
  .twin .n { font-style:italic; font-size:28px; margin:4px 0 6px; }
  .twin p { margin:0; font-size:13.5px; color:#4a443d; }
  .pal { display:flex; height:26px; border-radius:7px; overflow:hidden; border:1px solid #E7E0D5; margin:6px 0 2px; }
  .pal span { flex:1; }
  .palcap { font-size:10.5px; color:#9A9186; margin:0 0 4px; }
  section { margin:20px 0; page-break-inside:avoid; }
  h2 { font-style:italic; font-weight:normal; font-size:20px; color:#2A2622; margin:0 0 10px; padding-bottom:6px; border-bottom:1px solid #ECE5DA; }
  p.lead { font-style:italic; font-size:15px; line-height:1.55; margin:0 0 6px; }
  ul { margin:0; padding-left:0; list-style:none; }
  li { font-size:13.5px; line-height:1.5; margin:0 0 7px; padding-left:20px; position:relative; }
  li:before { content:"✦"; position:absolute; left:0; color:${P}; font-size:11px; top:2px; }
  li.num { counter-increment:c; }
  ol { counter-reset:c; margin:0; padding:0; list-style:none; }
  ol li:before { content:counter(c); color:#fff; background:${P}; width:18px; height:18px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:11px; font-style:italic; }
  .chips { font-size:13px; color:#4a443d; line-height:1.7; }
  .chips b { font-style:italic; font-weight:normal; color:${P}; }
  .foot { margin-top:26px; padding-top:12px; border-top:1px solid #E7E0D5; display:flex; justify-content:space-between; font-size:11px; color:#9A9186; }
  @media print { .noprint { display:none !important; } body { padding:0; } }
  .bar { position:sticky; top:0; background:#FAF8F1; padding:12px 0; text-align:center; }
  .bar button { font-family:Georgia,serif; font-size:14px; padding:11px 26px; border-radius:99px; border:none; background:#2A2622; color:#FAF8F1; cursor:pointer; }
</style></head><body>
  <div class="bar noprint"><button onclick="window.print()">Сохранить как PDF / Печать</button></div>
  <div class="cover">
    <div class="wm">S L O W &nbsp; G L O W</div>
    <div class="k">Полный разбор твоей эстетики</div>
    <h1>${_esc((D.twin&&D.twin.name)|| (D.seeking&&D.seeking[0]) || "Твоя эстетика")}</h1>
    <div class="date">${_esc(date)}</div>
  </div>
  ${D.twin&&D.twin.name?`<div class="twin"><div class="k">Твой эстетический двойник</div><div class="n">${_esc(D.twin.name)}</div><p>${_esc(D.twin.essence||"")}</p></div>`:""}
  <div class="pal">${pal.map(c=>`<span style="background:${_esc(c)}"></span>`).join("")}</div>
  <div class="palcap">Палитра твоей эстетики — прямо с твоих пинов</div>
  ${sec("Что говорят твои пины", D.read?`<p class="lead">${_esc(D.read)}</p>`:"")}
  ${sec("Что тебя притягивает", D.patterns&&D.patterns.length?`<ul>${li(D.patterns)}</ul>`:"")}
  ${sec("Точные шаги под твою эстетику", D.actions&&D.actions.length?`<ol>${(D.actions||[]).map(a=>`<li class="num">${_esc(a)}</li>`).join("")}</ol>`:"")}
  ${sec("Как стать этой женщиной", (D.identity&&D.identity.who)?`<p class="lead">${_esc(D.identity.who)}</p>${habits.length?`<p style="font-size:12px;color:#9A9186;margin:8px 0 6px">Ежедневные привычки по 10–15 минут:</p><ul>${li(habits)}</ul>`:""}${mindset.length?`<p class="chips" style="margin-top:8px">${mindset.map(m=>`<b>${_esc(m)}</b>`).join(" &nbsp;·&nbsp; ")}</p>`:""}`:"")}
  ${sec("Образы под твою эстетику", D.outfits&&D.outfits.length?`<ul>${li(D.outfits)}</ul><p style="font-size:11px;color:#9A9186;margin-top:4px">Собирай из своего гардероба — стиль не про покупки.</p>`:"")}
  ${sec("Список покупок для дома", D.shopping&&D.shopping.length?`<ul>${li(D.shopping)}</ul>`:"")}
  ${sec("Ритуалы, которые это закрепят", D.rituals&&D.rituals.length?`<ul>${li(D.rituals)}</ul>`:"")}
  ${(D.today||D.week||D.month)?sec("Твой мягкий план", `${D.today?`<p class="lead">Сегодня: ${_esc(Array.isArray(D.today)?D.today[0]:D.today)}</p>`:""}${D.week&&D.week.length?`<p style="font-size:12px;color:#9A9186;margin:8px 0 4px">На неделю:</p><ul>${li(D.week)}</ul>`:""}${D.month&&D.month.length?`<p style="font-size:12px;color:#9A9186;margin:8px 0 4px">На месяц:</p><ul>${li(D.month)}</ul>`:""}`):""}
  <div class="foot"><span>slow-glow.app</span><span>Твоя эстетика → реальная жизнь ✦</span></div>
</body></html>`;
}
function openFullAnalysis(ch, D){
  try{
    sgTrack("pdf_open");
    const w = window.open("", "_blank");
    if(!w){ alert("Разреши всплывающие окна, чтобы сохранить разбор в PDF ✦"); return; }
    w.document.open(); w.document.write(buildFullAnalysisHTML(ch, D)); w.document.close(); w.focus();
    setTimeout(()=>{ try{ w.print(); }catch(e){} }, 600);
  }catch(e){}
}

async function shareTwinCard(ch, twin, palette){
  try{
    sgTrack("share_twin", { name: twin && twin.name });
    const cv=document.createElement("canvas"); const W=1080, H=1920; cv.width=W; cv.height=H; const x=cv.getContext("2d");
    try{ await document.fonts.load("400 150px 'Instrument Serif'"); await document.fonts.load("italic 400 150px 'Instrument Serif'"); await document.fonts.load("500 30px Inter"); await document.fonts.ready; }catch(e){}
    const g=x.createLinearGradient(0,0,W,H); g.addColorStop(0,"#F7EFD8"); g.addColorStop(0.5,C.butter); g.addColorStop(1,ch.partner); x.fillStyle=g; x.fillRect(0,0,W,H);
    x.fillStyle="rgba(255,255,255,0.30)"; x.beginPath(); x.arc(W*0.84,H*0.16,300,0,7); x.fill();
    x.fillStyle="rgba(255,255,255,0.18)"; x.beginPath(); x.arc(W*0.10,H*0.88,340,0,7); x.fill();
    const INK="#241f1a", M=100;
    x.textAlign="left"; x.font="500 30px Inter, sans-serif"; x.fillStyle=INK; x.fillText("S L O W   G L O W", M, 132);
    x.textAlign="center";
    x.font="italic 400 48px 'Instrument Serif', Georgia, serif"; x.fillStyle="rgba(36,31,26,0.78)"; x.fillText("мой эстетический двойник", W/2, 600);
    x.fillStyle=INK; x.font="italic 400 128px 'Instrument Serif', Georgia, serif";
    const name=String((twin&&twin.name)||"Моя эстетика"); const nl=sgLines(x, name, W-M*2).slice(0,3);
    let ny=780; nl.forEach((l,i)=>{ x.fillText(l, W/2, ny+i*136); }); let y=ny+nl.length*136+20;
    // палитра-полоса
    const pal=(palette&&palette.length?palette:["#F5EEDC","#E8D5B5","#D9B98C","#B98A5E","#7A5A3E"]).slice(0,5);
    const sw=Math.min(560, W-M*2), sx=(W-sw)/2, sh=26; pal.forEach((c,i)=>{ x.fillStyle=c; x.fillRect(sx+i*(sw/pal.length), y, sw/pal.length+1, sh); }); y+=sh+54;
    x.fillStyle="rgba(36,31,26,0.86)"; x.font="italic 400 46px 'Instrument Serif', Georgia, serif";
    sgLines(x, String((twin&&twin.essence)||""), W-M*2).slice(0,3).forEach((l,i)=>x.fillText(l, W/2, y+i*60));
    x.textAlign="left"; x.font="500 29px Inter, sans-serif"; x.fillStyle=INK; x.fillText("slow-glow.app", M, H-96);
    x.textAlign="right"; x.fillStyle="rgba(36,31,26,0.7)"; x.fillText("а кто твой двойник?", W-M, H-96);
    const b=await new Promise(r=>cv.toBlob(r,"image/png",0.95));
    const f=new File([b],"slow-glow-двойник.png",{type:"image/png"});
    if(navigator.canShare && navigator.canShare({files:[f]})) await navigator.share({ files:[f], text:"Мой эстетический двойник по версии Slow Glow ✦ узнай свой → slow-glow.app" });
    else { const u=URL.createObjectURL(b); const el=document.createElement("a"); el.href=u; el.download="slow-glow-двойник.png"; el.click(); setTimeout(()=>URL.revokeObjectURL(u),1500); }
  }catch(e){}
}

async function shareStreakCard(ch, n, capt){
  try{
    sgTrack("share_streak", { n });
    const cv=document.createElement("canvas"); const W=1080, H=1920; cv.width=W; cv.height=H; const x=cv.getContext("2d");
    try{ await document.fonts.load("400 300px 'Instrument Serif'"); await document.fonts.load("500 30px Inter"); await document.fonts.ready; }catch(e){}
    const g=x.createLinearGradient(0,0,W,H); g.addColorStop(0,"#F7EFD8"); g.addColorStop(0.55,C.butter); g.addColorStop(1,ch.partner); x.fillStyle=g; x.fillRect(0,0,W,H);
    x.fillStyle="rgba(255,255,255,0.32)"; x.beginPath(); x.arc(W*0.85,H*0.13,280,0,7); x.fill();
    x.fillStyle="rgba(255,255,255,0.2)"; x.beginPath(); x.arc(W*0.12,H*0.9,330,0,7); x.fill();
    const INK="#241f1a", M=96;
    x.textAlign="left"; x.font="500 30px Inter, sans-serif"; x.fillStyle=INK; x.fillText("S L O W   G L O W", M, 128);
    x.textAlign="center"; x.font="italic 400 46px 'Instrument Serif', Georgia, serif"; x.fillStyle="rgba(36,31,26,0.8)";
    x.fillText("моя серия красивых дней", W/2, 560);
    x.font="400 380px 'Instrument Serif', Georgia, serif"; x.fillStyle=INK; x.fillText(String(n), W/2, 1010);
    x.fillStyle=ch.partner; x.beginPath(); x.arc(W/2, 1120, 9, 0, 7); x.fill();
    x.font="italic 400 52px 'Instrument Serif', Georgia, serif"; x.fillStyle=INK;
    sgLines(x, capt, W-M*2).slice(0,2).forEach((l,i)=>x.fillText(l, W/2, 1260+i*66));
    x.font="500 29px Inter, sans-serif"; x.textAlign="left"; x.fillText("slow-glow.app", M, H-92);
    x.textAlign="right"; x.fillStyle="rgba(36,31,26,0.7)"; x.fillText("живи свою эстетику", W-M, H-92);
    const b = await new Promise(r=>cv.toBlob(r,"image/png",0.95));
    const f = new File([b], "slow-glow-серия.png", { type:"image/png" });
    if(navigator.canShare && navigator.canShare({ files:[f] })) await navigator.share({ files:[f], text:"Моя серия красивых дней в Slow Glow ✦ slow-glow.app" });
    else { const u=URL.createObjectURL(b); const el=document.createElement("a"); el.href=u; el.download="slow-glow-серия.png"; el.click(); setTimeout(()=>URL.revokeObjectURL(u),1500); }
  }catch(e){}
}

/* ── Шеринг разбора пинов: карточка 9:16 для Stories с вотермарком ──────────── */
function ShareDream({ ch, D }){
  const ref = useRef(null);
  const [busy,setBusy]=useState(false);
  const shareText = "Разобрала свои сохранения в Slow Glow — вот моя эстетика и шаги к ней → slow-glow.app";
  async function paint(){
    const cv=ref.current, W=1080, H=1920; cv.width=W; cv.height=H; const x=cv.getContext("2d");
    try{ await document.fonts.load("400 92px 'Instrument Serif'"); await document.fonts.load("500 30px Inter"); await document.fonts.ready; }catch(e){}
    const g=x.createLinearGradient(0,0,W,H); g.addColorStop(0,"#F7EFD8"); g.addColorStop(0.55,C.butter); g.addColorStop(1,ch.partner); x.fillStyle=g; x.fillRect(0,0,W,H);
    x.fillStyle="rgba(255,255,255,0.35)"; x.beginPath(); x.arc(W*0.86,H*0.10,260,0,7); x.fill();
    x.fillStyle="rgba(255,255,255,0.22)"; x.beginPath(); x.arc(W*0.10,H*0.92,320,0,7); x.fill();
    const M=96, INK="#241f1a";
    x.textAlign="left"; x.font="500 30px Inter, sans-serif"; x.fillStyle=INK;
    x.fillText("S L O W   G L O W", M, 128);
    x.font="500 25px Inter, sans-serif"; x.fillStyle="rgba(36,31,26,0.62)";
    x.fillText("РАЗБОР МОИХ ПИНОВ", M, 178);
    x.fillStyle=ch.partner; sgRound(x, M, 218, 64, 7, 3.5); x.fill();
    const title=(D.seeking&&D.seeking[0])?String(D.seeking[0]):"Моя эстетика";
    x.fillStyle=INK; x.font="400 96px 'Instrument Serif', Georgia, serif";
    const tL=sgLines(x, title, W-M*2); let ty=340;
    tL.slice(0,2).forEach((l,i)=>x.fillText(l, M, ty+i*104));
    let y=ty+tL.slice(0,2).length*104+36;
    x.font="italic 400 44px 'Instrument Serif', Georgia, serif"; x.fillStyle="rgba(36,31,26,0.85)";
    (D.patterns||[]).slice(0,4).forEach(p=>{ const ls=sgLines(x,"· "+p,W-M*2); ls.slice(0,1).forEach(l=>{ x.fillText(l, M, y); y+=62; }); });
    y+=44;
    x.font="500 27px Inter, sans-serif"; x.fillStyle="rgba(36,31,26,0.6)"; x.fillText("ТРИ ШАГА К ЭТОЙ ЖИЗНИ", M, y); y+=58;
    x.font="400 36px Inter, sans-serif";
    (D.actions||[]).slice(0,3).forEach((a,i)=>{
      x.fillStyle=ch.partner; x.beginPath(); x.arc(M+20, y-12, 22, 0, 7); x.fill();
      x.fillStyle="#fff"; x.font="italic 400 30px 'Instrument Serif', Georgia, serif"; x.textAlign="center"; x.fillText(String(i+1), M+20, y-2); x.textAlign="left";
      x.fillStyle=INK; x.font="400 36px Inter, sans-serif";
      let ls=sgLines(x, a, W-M*2-70); if(ls.length>2){ ls=ls.slice(0,2); ls[1]=ls[1].replace(/[\s.,;:!?—-]+$/,"")+"…"; }
      ls.forEach((l,j)=>x.fillText(l, M+64, y+j*48)); y+=ls.length*48+34;
    });
    x.font="500 29px Inter, sans-serif"; x.fillStyle=INK; x.fillText("slow-glow.app", M, H-92);
    x.textAlign="right"; x.fillStyle="rgba(36,31,26,0.7)"; x.fillText("разбери свои сохранения", W-M, H-92); x.textAlign="left";
  }
  async function blob(){ await paint(); return await new Promise(r=>ref.current.toBlob(r,"image/png",0.95)); }
  function dl(b){ const u=URL.createObjectURL(b); const el=document.createElement("a"); el.href=u; el.download="slow-glow-разбор.png"; el.click(); setTimeout(()=>URL.revokeObjectURL(u),1500); }
  async function share(){ setBusy(true); sgTrack("share_dream"); try{ const b=await blob(); const f=new File([b],"slow-glow-разбор.png",{type:"image/png"}); if(navigator.canShare&&navigator.canShare({files:[f]})) await navigator.share({files:[f],text:shareText}); else dl(b); }catch(e){} setBusy(false); }
  async function down(){ setBusy(true); try{ dl(await blob()); }catch(e){} setBusy(false); }
  return (
    <div style={{ borderRadius:18, padding:"15px 16px 16px", margin:"4px 0 22px", background:`linear-gradient(125deg, ${C.butter}44, ${ch.partner}2E 60%, rgba(255,255,255,0.5))`, border:`1px solid ${C.line}` }}>
      <Label color={ch.partner}>Поделиться разбором</Label>
      <p style={{ fontSize:13, color:C.inkSoft, margin:"5px 0 12px", lineHeight:1.45 }}>Красивая карточка 9:16 с твоей эстетикой и шагами — готова для Stories.</p>
      <button onClick={share} disabled={busy} style={{ width:"100%", height:46, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:14, fontWeight:500, marginBottom:8 }}>{busy?"Готовлю карточку…":"Поделиться в сторис"}</button>
      <button onClick={down} disabled={busy} style={{ width:"100%", height:42, borderRadius:99, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", cursor:"pointer", color:C.ink, fontFamily:body, fontSize:13.5 }}>Скачать картинку</button>
      <canvas ref={ref} style={{ display:"none" }}/>
    </div>
  );
}

function PinReality({ ch, dna, onClose }) {
  const pins = pick(PINS_POOL, 4, 4);
  const [imgs, setImgs] = useState([]);
  const [ai, setAi] = useState(()=> sgStore.get("sg_dream_full", null)); // прошлый разбор живёт между сессиями
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null); // честная ошибка вместо «выдуманного» разбора
  // Лимит: не больше трёх разборов в день. Каждый разбор стоит реальных денег,
  // и без потолка один человек может опустошить баланс за вечер.
  const AN_LIMIT = 3;
  const todayKey = ()=> "sg_an_" + new Date().toISOString().slice(0,10);
  const anUsed = ()=> Number(sgStore.get(todayKey(), 0)) || 0;
  const [quotaLeft, setQuotaLeft] = useState(()=> Math.max(0, AN_LIMIT - anUsed()));
  const BUSY_STEPS = ["Рассматриваю каждое фото по отдельности…","Записываю, что буквально на кадрах…","Собираю палитру и настроение…","Ищу твоего эстетического двойника…","Подбираю точные шаги и ритуалы…","Дописываю тёплое письмо тебе…"];
  const [bstep, setBstep] = useState(0);
  useEffect(()=>{ if(!busy) return; setBstep(0); const t=setInterval(()=>setBstep(b=>(b+1)%BUSY_STEPS.length), 2200); return ()=>clearInterval(t); },[busy]);
  const [bought, setBought] = useState(()=> sgStore.get("sg_bought", {}));
  const buyKey = (s)=> String(s).slice(0,60);
  const toggleBought = (s)=>{ setBought(b=>{ const k=buyKey(s); const n={ ...b, [k]:!b[k] }; sgStore.set("sg_bought", n); sgTrack("shop_bought",{ on:!!n[k] }); return n; }); };
  useEffect(()=>{ sgTrack("analyzer_open"); },[]);
  const _base = dreamFor(ch.id);
  const _fbRich = {
    read: `Твоя эстетика — «${ch.aes}»: спокойствие, красота в мелочах и медленный ритм. Ты не гонишься за идеалом — ты обживаешь жизнь, которая уже началась.`,
    actions: [ "Поставь свежие цветы или веточку зелени на видное место.", "Сервируй завтрак красиво: тарелка, льняная салфетка, свет из окна.", "Убери телефон на первый час после пробуждения.", "Вечером зажги свечу вместо верхнего света.", "Пей воду из красивого стакана, не спеша.", "Оставь на виду 3 любимые вещи, лишнее убери.", "Проведи 10 минут в тишине у окна с чаем.", "Приготовь простое блюдо из сезонных продуктов." ],
    shopping: [ "Льняная скатерть или салфетки нейтрального тона", "Стеклянный графин и стакан для воды", "Ароматическая свеча со спокойным запахом", "Небольшая ваза для сезонных цветов", "Льняные наволочки в тон спальне", "Красивая керамическая кружка", "Плетёная корзина для мелочей", "Книга о медленной жизни (Kinfolk, Flow)" ],
    rituals: [ "Медленное утро — кофе у окна без телефона", "Пятничные цветы — букет себе раз в неделю", "Вечер при свече — 20 минут книги или тишины", "Воскресный сброс — уют, порядок и план недели", "Прогулка без наушников — слушать город и себя" ],
    palette: ["#F5EEDC","#E8D5B5","#D9B98C","#B98A5E","#7A5A3E"],
    outfits: [ "Льняное платье молочного оттенка, плетёная сумка и кожаные сандалии — образ медленного лета.", "Прямые светлые джинсы, белая рубашка свободного кроя и балетки — тихая классика на каждый день.", "Трикотажный костюм овсяного цвета и длинное пальто без подкладки — мягкая многослойность на прохладный вечер." ],
    twin: { name:"Тосканский полдень", essence:"Ты — тёплый, неспешный свет, льняная простота и красота в обычном дне. Твоя эстетика дышит спокойствием и заботой о себе.", traits:["тёплая","неспешная","уютная"] },
    identity: { who:"Ты — женщина, которая выбирает медленный ритм и красоту в обычном дне. Ты бережно относишься к себе, дому и времени, а твоя жизнь складывается из маленьких осознанных ритуалов — и это уже видно по твоим сохранениям.", habits:[ "10 минут иностранного языка за утренним кофе", "Растяжка 10 минут перед душем", "Страница дневника перед сном — 5 минут", "15 минут бумажной книги днём вместо ленты", "5 минут заботы о растениях и воде в вазах", "Вечерняя прогулка 15 минут без наушников" ], mindset:[ "Красота — это внимание, а не бюджет", "Медленно — значит осознанно", "Мой дом — продолжение меня", "Маленький шаг каждый день сильнее рывка" ] },
  };
  const D = { ..._base, ..._fbRich, ...(ai||{}) };
  const onPick = async (e) => {
    const files = Array.from(e.target.files||[]).slice(0,8); if (!files.length) return;
    const read = (f)=>new Promise((res)=>{ const r=new FileReader(); r.onload=()=>res({ url:URL.createObjectURL(f), b64:String(r.result).split(",")[1], media:/png|webp|gif/.test(f.type)?f.type:"image/jpeg" }); r.readAsDataURL(f); });
    const arr = await Promise.all(files.map(read));
    setImgs(p=>[...p,...arr].slice(0,8));
  };
  /* ── Разбор пинов с «заземлением»: каждое фото подписано номером, модель
     ОБЯЗАНА сначала буквально описать каждый кадр (поле "seen") и строить весь
     разбор только на этом. Если ИИ недоступен или ответ невалиден — честно
     показываем ошибку и НИКОГДА не выдаём шаблонный разбор за настоящий. ── */
  const analyze = async () => {
    if (!imgs.length || busy) return; setBusy(true); setErr(null);
    const sys = "Ты — Slow Glow: тёплый голос о медленной красивой жизни и предельно внимательный визуальный аналитик. ЖЕЛЕЗНОЕ ПРАВИЛО №1: ты описываешь и анализируешь ТОЛЬКО то, что реально изображено на присланных фото. Сначала рассматриваешь каждый кадр по отдельности и честно фиксируешь его буквальное содержимое: место, предметы, людей, действие, свет, цвета. Ты НИКОГДА не додумываешь типовые «эстетичные» детали — свечи, книги, цветы, кофе, лён, дерево — если их нет на фото. Если на фото спорт (теннис, корт, ракетки), путешествия, город, еда, животные или что-то неожиданное — весь разбор строится именно вокруг этого, а не вокруг абстрактной «медленной жизни». По фото-эстетике ты видишь не «что не так», а кто эта женщина и к чему она тянется — и даёшь ПРЕДМЕТНЫЙ, конкретный разбор: точные действия, реальные вещи и ритуалы, без воды и абстракций. Покупки советуешь только для дома и интерьера; одежду покупать не советуешь никогда — только собирать образы из её гардероба. Никогда не называешь бренды, марки и магазины — вещи описываешь по типу, цвету и материалу; на актуальные тренды ссылаться можно, но без имён брендов. Пиши во втором лице, тепло и лично, как письмо подруге, которая давно её поняла. Никогда не оцениваешь и не говоришь «стань лучше»; говоришь «ты уже ближе, чем кажется». Без токсичной продуктивности и без слова «должна».";
    const task = 'Это мои сохранённые картинки (пины) желаемой эстетики жизни, каждая подписана номером. ШАГ 1 — рассмотри КАЖДОЕ фото по отдельности и для каждого честно зафиксируй, что на нём буквально изображено (место, предметы, люди, действие, цвета). ШАГ 2 — построй разбор СТРОГО на этих наблюдениях: каждый вывод должен опираться на конкретные фото, ничего не выдумывай. Если фото разнородные (например, спорт + интерьер + путешествия) — отрази ВСЕ темы, не сводя всё к одной. Верни ТОЛЬКО валидный JSON без markdown, по-русски: {"seen":[по одной строке на КАЖДОЕ фото в исходном порядке, формат «Фото N: что буквально изображено», коротко и без домыслов],"read":"3-4 предложения: кто эта женщина по её пинам и какую именно жизнь она себе собирает — конкретно, узнаваемо и тепло, во втором лице; упомяни минимум три детали ПРЯМО с картинок (то, что ты записала в seen)","palette":[5 цветов её эстетики в HEX, от светлого к насыщенному, взятые прямо с картинок],"twin":{"name":"короткое образное название её эстетического двойника, отражающее именно ЕЁ фото (если на фото спорт — двойник спортивный, если море — морской), максимум 3-4 слова: например «Уимблдонское утро», «Тосканский полдень», «Парижское утро 70-х»","essence":"1-2 тёплых предложения во втором лице, почему именно это её двойник — по настроению её пинов","traits":[3 коротких определяющих черты этого образа, каждая 1-2 слова]},"patterns":[до 6 конкретных повторяющихся образов, объектов или цветов; КАЖДЫЙ обязан реально присутствовать хотя бы на одном фото из seen — не добавляй ни одного, которого нет на кадрах; если фото мало, верни меньше пунктов],"seeking":[5 чувств или ценностей за этими картинками],"actions":[8 ТОЧНЫХ конкретных действий, выведенных ИЗ ЭТИХ фото — каждое начинается с глагола и ОБЯЗАТЕЛЬНО содержит деталь исполнения: где именно, когда или сколько минут, что понадобится (например, если на фото теннис: «Забронируй корт на час в субботу утром и возьми с собой воду и полотенце»); никаких общих фраз и ничего, что не связано с фото],"identity":{"who":"3-4 предложения — какая это личность по её фото: её характер, ритм, отношение к себе; тепло и конкретно, во втором лице","habits":[6 ежедневных привычек по 10–15 минут, подобранных под темы ЕЁ фото, каждая с указанием времени],"mindset":[4 короткие установки мышления этой женщины, каждая одной фразой]},"outfits":[3 готовых образа под её эстетику С ФОТО, собранных из базовых вещей её вероятного гардероба — каждый одним предложением: типы вещей, цвета, материалы; БЕЗ единого названия бренда],"shopping":[8 конкретных вещей ТОЛЬКО ДЛЯ ДОМА И ИНТЕРЬЕРА под эстетику её фото (если на фото спорт — например, красивое хранение инвентаря, корзина для формы); каждая с материалом или цветом; НИКОГДА не одежда, не обувь и не косметика],"rituals":[5 повторяемых ритуалов под темы её фото, каждый одной строкой в формате «Название — суть»],"have":[5 вещей, которые у меня скорее всего уже есть для этой жизни, судя по фото],"missing":[4 мягкие точки роста без давления],"today":"1 маленький конкретный шаг на сегодня, связанный с тем, что на фото","week":[3 конкретных внедрения на неделю],"month":[5 конкретных изменений на месяц],"echo":'+(dna&&dna.themes&&dna.themes.length ? ('"если на этих новых картинках РЕАЛЬНО видно что-то из тем её самого первого мудборда мечты ('+dna.themes.join(", ")+') — напиши тёплое личное напоминание в 1-2 предложения, что она уже мечтала об этом в самом начале пути; если совпадений нет — строго null, не притягивай"') : "null")+'}. САМОПРОВЕРКА перед ответом: пройдись по каждому пункту patterns и read — если чего-то нет в seen, убери или замени. Пиши предметно. Тон тёплый и личный, во втором лице. Без оценок, без слова «должна». Никогда не советуй покупать одежду, обувь или косметику. Никогда не называй бренды. Верни строго один JSON-объект.';
    let ok = false;
    let reason = "";   // ← настоящая причина отказа, чтобы её было видно
    try {
      // Каждое фото получает подпись «Фото N:» — так модель не смешивает кадры
      if (anUsed() >= AN_LIMIT) {
        setErr("На сегодня разборы закончились — их " + AN_LIMIT + " в день. Возвращайся завтра: сохранения никуда не денутся, а свежий взгляд иногда точнее.");
        setBusy(false); return;
      }
      const list = imgs.slice(0,6);   // лимит тела запроса на Vercel — около 4,5 МБ
      const blocks = [];
      for (let i=0;i<list.length;i++){
        blocks.push(await sgShrinkBlock({ type:"image", source:{ type:"base64", media_type:list[i].media, data:list[i].b64 } }));
      }
      // Отдельная «проверка зрения» убрана: она удваивала время запроса.
      // Что модель действительно смотрела на кадры, проверяем ниже по полю seen.
      for (let attempt=0; attempt<2 && !ok; attempt++){
        try{
          const res = await sgVisionAsk({ sys, shots: blocks, maxTokens:3400,
            task: task + (attempt>0 ? " ВАЖНО: прошлый ответ не был валидным JSON — верни СТРОГО один JSON-объект без текста вокруг и без markdown." : "") });
          if (!res.txt) { reason = res.reason; continue; }
          const txt = res.txt;
          const obj = sgParseJSON(txt);
          if (obj && (!Array.isArray(obj.seen) || obj.seen.length===0)) { reason = "модель не описала ни одного фото — похоже, картинки до неё не дошли"; continue; }
          if (obj && (Array.isArray(obj.patterns) || obj.read)) {
            const _a=(x)=>Array.isArray(x)?x:[];
            const clean={ ...obj, seen:_a(obj.seen).map(s=>String(s)).slice(0,8), patterns:_a(obj.patterns), seeking:_a(obj.seeking), actions:_a(obj.actions), shopping:_a(obj.shopping), rituals:_a(obj.rituals), have:_a(obj.have), missing:_a(obj.missing), week:_a(obj.week), month:_a(obj.month), outfits:_a(obj.outfits), palette:_a(obj.palette).filter(x=>/^#[0-9a-fA-F]{3,8}$/.test(String(x))).slice(0,6) };
            if(obj.identity && typeof obj.identity==="object"){ clean.identity={ who:String(obj.identity.who||""), habits:_a(obj.identity.habits), mindset:_a(obj.identity.mindset) }; } else { delete clean.identity; }
            if(obj.twin && typeof obj.twin==="object" && obj.twin.name){ clean.twin={ name:String(obj.twin.name).slice(0,42), essence:String(obj.twin.essence||""), traits:_a(obj.twin.traits).slice(0,3) }; } else { delete clean.twin; }
            setAi(clean);
            sgStore.set("sg_dream_last", { t:Date.now(), seeking:clean.seeking.slice(0,3), actions:clean.actions.slice(0,8), rituals:clean.rituals.slice(0,5) });
            try{ clean._at = Date.now(); sgStore.set("sg_dream_full", clean); sgStore.set(todayKey(), anUsed()+1); setQuotaLeft(Math.max(0, AN_LIMIT - anUsed())); }catch(e){}
            try{ const h=sgStore.get("sg_dream_history", []); h.unshift({ t:Date.now(), seeking:clean.seeking.slice(0,3), patterns:clean.patterns.slice(0,6) }); sgStore.set("sg_dream_history", h.slice(0,12)); }catch(e){}
            sgTrack("analyzer_done", { imgs: list.length });
            ok = true;
          }
        }catch(e){ reason = String((e&&e.message)||e).slice(0,140); }
      }
    } catch(e) { reason = String((e&&e.message)||e).slice(0,140); }
    if (!ok) {
      setErr("Не получилось рассмотреть фото. Я не покажу шаблонный разбор вместо настоящего." + (reason ? " Причина: " + reason : ""));
      try{ console.error("[SlowGlow] анализ не удался:", reason, "| endpoint:", AI_ENDPOINT, "| формат:", (typeof localStorage!=="undefined" && localStorage.getItem(SG_VIA_KEY))||"не определён"); }catch(_e){}
      sgTrack("analyzer_fail", { reason: reason.slice(0,60) });
    }
    setBusy(false);
  };
  const chip = (txt,bg)=>(<span style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.ink, background:bg, padding:"6px 12px", borderRadius:99 }}>{txt}</span>);
  return (
    <OverlayShell partner={ch.partner} label="СОХРАНЕНИЯ → РЕАЛЬНОСТЬ" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={64}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:28, lineHeight:1.1, margin:0, color:C.ink }}>Как повторить твои образы</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 18px" }}>Покажи мне свою папку «хочу так жить». Я расшифрую, что ты на самом деле ищешь за этими картинками — и с чего начать уже сегодня. Без идеала, без спешки.</p>

      <Label>Загрузи свои сохранения</Label>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 10px" }}>Скриншоты Pinterest, коллажи или любимые фото — до 8 штук.</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:12 }}>
        {imgs.map((im,i)=><img key={i} src={im.url} alt="" style={{ width:64, height:64, objectFit:"cover", borderRadius:10, border:`1px solid ${C.line}` }}/>)}
        <label style={{ width:64, height:64, borderRadius:10, border:`1px dashed ${C.line}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.inkFaint, background:"rgba(255,255,255,0.4)" }}>
          <Plus size={20} strokeWidth={1.8}/>
          <input type="file" accept="image/*" multiple onChange={onPick} style={{ display:"none" }}/>
        </label>
      </div>
      {imgs.length>0 && (<>
        <button onClick={analyze} disabled={busy} style={{ width:"100%", height:48, borderRadius:99, border:"none", cursor:busy?"default":"pointer", background:busy?C.line:`radial-gradient(circle at 30% 30%, ${C.butter}, ${ch.partner})`, color:C.ink, fontFamily:head, fontSize:14.5, fontWeight:500, marginBottom:2, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          {busy ? BUSY_STEPS[bstep] : (ai ? "Обновить мой разбор" : "Проанализировать мои сохранения")}
        </button>
        {!busy && (
          <p style={{ fontSize:11, color:C.inkFaint, textAlign:"center", margin:"5px 0 10px" }}>
            {ai && ai._at ? "Разбор от " + new Date(ai._at).toLocaleDateString("ru-RU", { day:"numeric", month:"long" }) + " · " : ""}
            {quotaLeft > 0 ? ("осталось " + quotaLeft + " " + (quotaLeft===1?"разбор":"разбора") + " сегодня") : "лимит на сегодня исчерпан"}
          </p>
        )}
      </>)}
      {err && !busy && (
        <div className="fade" style={{ borderRadius:14, padding:"12px 14px", margin:"0 0 16px", background:"#F6E3DC", border:"1px solid #E4B7A6" }}>
          <p style={{ fontSize:13, lineHeight:1.45, color:"#7A3B22", margin:0 }}>{err}</p>
        </div>
      )}
      {ai && !err && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:"#6E8E5E", margin:"0 0 18px", textAlign:"center" }}>✦ Анализ построен по твоим фото</p>}
      {!ai && !err && <div style={{ height:18 }}/>}

      {ai && ai.echo && (
        <div className="fade" style={{ position:"relative", borderRadius:18, padding:"16px 18px 16px 20px", marginBottom:20, background:`linear-gradient(125deg, ${C.butter}33, ${ch.partner}22 60%, rgba(255,255,255,0.4))`, border:`1px solid ${C.line}`, overflow:"hidden" }}>
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:`linear-gradient(180deg, ${C.butter}, ${ch.partner})` }}/>
          <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
            <Heart size={14} strokeWidth={1.7} color={ch.partner} fill={ch.partner}/>
            <Label color={ch.partner}>Ты ведь помнишь</Label>
          </div>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16.5, lineHeight:1.42, color:C.ink, margin:0 }}>{ai.echo}</p>
        </div>
      )}

      {ai && ai.seen && ai.seen.length>0 && (
        <div className="fade" style={{ marginBottom:18, borderRadius:16, padding:"13px 15px", background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}` }}>
          <Label color={ch.partner}>Что буквально на твоих фото</Label>
          <p style={{ fontSize:11.5, color:C.inkFaint, margin:"3px 0 9px" }}>Проверь меня — весь разбор ниже построен только на этом.</p>
          {ai.seen.map((s,i)=>(
            <div key={i} style={{ display:"flex", gap:9, marginBottom:6 }}>
              <span style={{ flexShrink:0, width:20, height:20, borderRadius:99, background:`linear-gradient(135deg, ${C.butter}, ${ch.partner}B3)`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:11, color:C.ink }}>{i+1}</span>
              <p style={{ fontSize:13, lineHeight:1.45, color:C.ink, margin:0 }}>{String(s).replace(/^Фото\s*\d+\s*[:—-]\s*/i,"")}</p>
            </div>
          ))}
        </div>
      )}

      {D.twin && D.twin.name && (
        <div className="fade sheen" style={{ position:"relative", borderRadius:20, overflow:"hidden", marginBottom:18, border:`1px solid ${C.line}`, background:`linear-gradient(135deg, ${C.butter}, ${ch.partner} 72%, ${C.oat})`, boxShadow:`0 18px 40px -26px ${ch.partner}` }}>
          <div style={{ position:"absolute", right:-20, top:-24, opacity:0.5 }}><GlowOrb partner="#ffffff" size={130}/></div>
          <div style={{ position:"relative", padding:"18px 18px 16px" }}>
            <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(26,26,26,0.55)" }}>Твой эстетический двойник</div>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:30, lineHeight:1.05, color:C.ink, margin:"6px 0 0" }}>{D.twin.name}</div>
            {D.twin.essence && <p style={{ fontSize:13.5, lineHeight:1.5, color:"rgba(26,26,26,0.78)", margin:"9px 0 0" }}>{D.twin.essence}</p>}
            {D.twin.traits && D.twin.traits.length>0 && <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:11 }}>{D.twin.traits.map(t=><span key={t} style={{ fontFamily:head, fontSize:10.5, letterSpacing:"0.04em", background:"rgba(255,255,255,0.55)", borderRadius:99, padding:"5px 11px", color:C.ink }}>{t}</span>)}</div>}
            <button onClick={()=>shareTwinCard(ch, D.twin, D.palette)} className="tapPop" style={{ marginTop:14, width:"100%", height:44, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:13.5, fontWeight:500, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}><Send size={15} strokeWidth={1.9}/>Поделиться своим двойником</button>
          </div>
        </div>
      )}

      {D.read && (
        <div className="fade" style={{ marginBottom:20, borderRadius:16, padding:"14px 16px", background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}` }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}><Label color={ch.partner}>Что говорят твои пины</Label><SGFleur color={ch.partner} size={40}/></div>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, lineHeight:1.45, color:C.ink, margin:"6px 0 0" }}>{D.read}</p>
          {D.palette && D.palette.length>0 && (
            <div style={{ display:"flex", alignItems:"center", gap:0, marginTop:12, borderRadius:10, overflow:"hidden", height:26, border:`1px solid ${C.line}` }}>
              {D.palette.map((c,i)=><span key={i} title={c} style={{ flex:1, background:c }}/>)}
            </div>
          )}
          {D.palette && D.palette.length>0 && <p style={{ fontSize:10.5, color:C.inkFaint, margin:"5px 0 0" }}>Палитра твоей эстетики — прямо с твоих пинов</p>}
        </div>
      )}

      {!ai && (
        <div style={{ borderRadius:14, padding:"10px 13px", margin:"0 0 14px", background:`${ch.partner}1A`, border:`1px dashed ${ch.partner}66` }}>
          <p style={{ fontSize:12.5, lineHeight:1.45, color:C.inkSoft, margin:0 }}>Ниже — пример разбора под эстетику «{ch.aes}». Загрузи свои фото и нажми «Проанализировать» — и всё пересоберётся именно по твоим кадрам.</p>
        </div>
      )}
      <Label>Что я вижу в твоих сохранениях</Label>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 9px" }}>{ai ? "Это повторяется на твоих фото — так выглядит твоя эстетика." : `Это повторяется в том, что тебя цепляет — так выглядит твоя эстетика «${ch.aes}».`}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:20 }}>{D.patterns.map(p=><span key={p}>{chip(p, C.sage)}</span>)}</div>

      <Label>Что ты на самом деле ищешь</Label>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 9px" }}>Тебя притягивают не сами картинки, а чувства за ними.</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:20 }}>{D.seeking.map(p=><span key={p}>{chip(p, `${ch.partner}33`)}</span>)}</div>

      {D.actions && D.actions.length>0 && (<>
        <Label>Точные действия под твои пины</Label>
        <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 10px" }}>Конкретные шаги, чтобы прожить эту эстетику уже на этой неделе.</p>
        <div style={{ marginBottom:22 }}>{D.actions.map((a,i)=>(
          <div key={i} className={"fade st"+((i%6)+1)} style={{ display:"flex", gap:12, marginBottom:10 }}>
            <div style={{ width:24, height:24, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.ink }}>{i+1}</div>
            <p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:"2px 0 0" }}>{a}</p>
          </div>
        ))}</div>
      </>)}

      {D.identity && (D.identity.who || (D.identity.habits && D.identity.habits.length>0)) && (
      <Fold ch={ch} icon="✨" title="Как стать этой женщиной" sub="портрет, привычки по 10–15 минут и установки">
        {D.identity.who && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15.5, lineHeight:1.5, color:C.ink, margin:"6px 0 12px" }}>{D.identity.who}</p>}
        {D.identity.habits && D.identity.habits.length>0 && (<div style={{ marginBottom:12 }}>
          <p style={{ fontSize:12.5, color:C.inkFaint, margin:"0 0 9px" }}>Ежедневные привычки по 10–15 минут — из них и вырастает эта личность:</p>
          {D.identity.habits.map((h,i)=>(
            <div key={i} className={"fade st"+((i%6)+1)} style={{ display:"flex", gap:11, alignItems:"flex-start", marginBottom:9, background:"rgba(255,255,255,0.5)", border:`1px solid ${C.line}`, borderRadius:12, padding:"10px 12px" }}>
              <GlowOrb partner={ch.partner} size={20} spark={false} style={{ flexShrink:0, marginTop:1 }}/>
              <p style={{ fontSize:14, lineHeight:1.42, color:C.ink, margin:0 }}>{h}</p>
            </div>
          ))}
        </div>)}
        {D.identity.mindset && D.identity.mindset.length>0 && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>{D.identity.mindset.map(m=><span key={m}>{chip(m, `${ch.partner}26`)}</span>)}</div>
        )}
      </Fold>)}

      {D.outfits && D.outfits.length>0 && (
      <Fold ch={ch} icon="👗" title="Образы под твою эстетику" sub="из твоего гардероба · по трендам, без брендов">
        {D.outfits.map((o,i)=>(
          <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start", marginBottom:9, background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}`, borderRadius:12, padding:"10px 12px" }}>
            <span style={{ flexShrink:0, marginTop:1, fontFamily:serif, fontStyle:"italic", fontSize:13, color:ch.partner }}>0{i+1}</span>
            <p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:0 }}>{o}</p>
          </div>
        ))}
        <p style={{ fontSize:11, color:C.inkFaint, margin:"4px 0 0", textAlign:"center" }}>Собирай из того, что уже есть — стиль не про покупки ✦</p>
      </Fold>)}

      {D.shopping && D.shopping.length>0 && (
      <Fold ch={ch} icon="🛒" title="Список покупок для дома" sub="детали интерьера под твои пины · отметь купленное">
        <div style={{ marginBottom:10, borderRadius:16, overflow:"hidden", border:`1px solid ${C.line}` }}>{D.shopping.map((s,i)=>{ const got=!!bought[buyKey(s)]; return (
          <div key={i} style={{ display:"flex", gap:11, alignItems:"center", padding:"12px 14px", background:got?`${ch.partner}14`:(i%2?"rgba(255,255,255,0.5)":"rgba(226,201,164,0.16)"), borderTop:i?`1px solid ${C.line}`:"none" }}>
            <button onClick={()=>toggleBought(s)} aria-label={got?"Убрать отметку":"Отметить купленным"} style={{ width:22, height:22, borderRadius:7, flexShrink:0, cursor:"pointer", border:got?"none":`1.5px solid ${ch.partner}`, background:got?ch.partner:"transparent", display:"flex", alignItems:"center", justifyContent:"center", padding:0 }}>{got && <Check size={13} strokeWidth={2.8} color="#fff"/>}</button>
            <span style={{ flex:1, fontSize:14, lineHeight:1.4, color:got?C.inkFaint:C.ink, textDecoration:got?"line-through":"none" }}>{s}</span>
            <a href={shopUrl(s)} target="_blank" rel="noopener noreferrer" onClick={()=>sgTrack("shop_click",{ market:SHOP.market })} style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:4, flexShrink:0, fontFamily:head, fontSize:11.5, letterSpacing:"0.02em", color:ch.partner }}>Купить <ExternalLink size={13} strokeWidth={1.9}/></a>
          </div>
        ); })}</div>
        {(()=>{ const got=D.shopping.filter(s=>bought[buyKey(s)]).length; return got>0 ? (
          <div style={{ margin:"0 0 10px" }}>
            <div style={{ height:6, borderRadius:99, background:"rgba(26,26,26,0.07)", overflow:"hidden" }}><div className="anim-grad-f" style={{ width:(got/D.shopping.length*100)+"%", height:"100%", borderRadius:99, background:`linear-gradient(90deg, ${C.sage}, ${ch.partner}, ${C.butter})`, transition:"width .3s" }}/></div>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:ch.partner, textAlign:"center", margin:"7px 0 0" }}>Собрано {got} из {D.shopping.length} — жизнь мечты складывается по деталям ✦</p>
          </div>
        ) : null; })()}
        <p style={{ fontSize:11, color:C.inkFaint, margin:"0 0 4px", textAlign:"center" }}>Партнёрские ссылки — покупая по ним, ты поддерживаешь Slow Glow ✦</p>
      </Fold>)}

      {D.rituals && D.rituals.length>0 && (
      <Fold ch={ch} icon="🕯" title="Ритуалы, которые это закрепят" sub="повторяемые мелочи — из них складывается жизнь">
        <div style={{ marginBottom:24 }}>{D.rituals.map((rt,i)=>(
          <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start", background:`${ch.partner}18`, borderRadius:12, padding:"11px 13px", marginBottom:9 }}>
            <GlowOrb partner={ch.partner} size={22} spark={false} style={{ flexShrink:0, marginTop:1 }}/>
            <p style={{ fontSize:14, lineHeight:1.42, color:C.ink, margin:0 }}>{rt}</p>
          </div>
        ))}</div>
      </Fold>)}

      <ShareDream ch={ch} D={D}/>

      <button onClick={()=>openFullAnalysis(ch, D)} className="tapPop" style={{ width:"100%", height:48, borderRadius:99, border:`1px solid ${ch.partner}`, background:`${ch.partner}12`, cursor:"pointer", color:C.ink, fontFamily:head, fontSize:13.5, display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:22 }}>
        <Download size={16} strokeWidth={1.9} color={ch.partner}/>Скачать полный разбор (PDF)
      </button>

      <ShareReality ch={ch} D={D}/>
      <ShareBoard ch={ch} imgs={imgs} D={D}/>

      <Fold ch={ch} icon="🌿" title="Что уже есть и куда расти" sub="ты ближе, чем кажется · мягкие точки роста">
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 9px" }}>Это уже с тобой:</p>
      <div style={{ marginBottom:20 }}>{D.have.map(h=>(
        <div key={h} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:7 }}>
          <span style={{ width:20, height:20, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${C.green})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:C.ink }}>✓</span>
          <span style={{ fontSize:14, color:C.ink }}>{h}</span>
        </div>
      ))}</div>

      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 9px" }}>Куда можно мягко расти — когда сама захочешь:</p>
      <div style={{ marginBottom:8 }}>{D.missing.map(m=>(
        <div key={m} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:7 }}>
          <span style={{ width:6, height:6, borderRadius:99, flexShrink:0, background:ch.partner }}/>
          <span style={{ fontSize:14, color:C.inkSoft }}>{m}</span>
        </div>
      ))}</div>
      </Fold>

      <div style={{ borderRadius:20, overflow:"hidden", border:`1px solid ${C.line}`, marginBottom:26 }}>
        <div style={{ padding:"16px 18px", background:`radial-gradient(circle at 20% 0%, ${ch.partner}33, transparent 70%)` }}>
          <Label color={C.inkFaint}>Из Pinterest в реальность</Label>
          <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:20, color:C.ink, marginTop:3 }}>Твой мягкий план</div>
        </div>
        <div style={{ padding:"4px 18px 18px" }}>
          <div style={{ marginTop:14 }}><Label color={C.inkSoft}>Сегодня · 1 маленький шаг</Label>
            <p style={{ fontSize:14.5, color:C.ink, margin:"6px 0 0", lineHeight:1.45 }}>{D.today}</p></div>
          <div style={{ marginTop:16 }}><Label color={C.inkSoft}>Эта неделя · 3 внедрения</Label>
            {D.week.map((w,i)=>(<div key={i} style={{ display:"flex", gap:10, marginTop:7 }}><span style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.inkFaint, flexShrink:0 }}>0{i+1}</span><span style={{ fontSize:14, color:C.ink, lineHeight:1.4 }}>{w}</span></div>))}</div>
          <div style={{ marginTop:16 }}><Label color={C.inkSoft}>Этот месяц · 5 изменений</Label>
            {D.month.map((m,i)=>(<div key={i} style={{ display:"flex", gap:10, marginTop:7 }}><span style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.inkFaint, flexShrink:0 }}>0{i+1}</span><span style={{ fontSize:14, color:C.ink, lineHeight:1.4 }}>{m}</span></div>))}</div>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkSoft, margin:"18px 0 0", textAlign:"center" }}>Ты уже ближе к этой жизни, чем тебе кажется. Просто ещё один маленький шаг.</p>
        </div>
      </div>

      <Fold ch={ch} icon="🖼" title="Как повторить твои образы" sub="разбор образов: что цепляет и как прожить">
      {pins.map((p,i)=>(
        <div key={i} className="fade" style={{ marginBottom:18, borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}` }}>
          <Photo t={p.t} url={p.url} h={150} radius={0}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 55%, rgba(26,26,26,0.34) 100%)" }}/>
            <div style={{ position:"absolute", left:14, right:14, bottom:11, color:"#fff", fontFamily:serif, fontStyle:"italic", fontSize:16, textShadow:"0 1px 8px rgba(26,26,26,0.5)" }}>{p.pin}</div>
          </Photo>
          <div style={{ padding:"14px 16px 16px" }}>
            <Label color={C.inkFaint}>В этом образе</Label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, margin:"8px 0 14px" }}>
              {p.el.map(e=><span key={e} style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.ink, background:C.sage, padding:"5px 11px", borderRadius:99 }}>{e}</span>)}
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"flex-start", background:`${ch.partner}22`, borderRadius:12, padding:"11px 13px", marginBottom:14 }}>
              <GlowOrb partner={ch.partner} size={24} spark={false} style={{ flexShrink:0, marginTop:1 }}/>
              <div><Label color={C.inkSoft}>Что тебя здесь цепляет</Label><p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14.5, lineHeight:1.4, color:C.ink, margin:"4px 0 0" }}>{p.hook}</p></div>
            </div>
            <Label color={C.inkFaint}>Как повторить — шаг за шагом</Label>
            <div style={{ margin:"10px 0 14px" }}>
              {p.steps.map((st,si)=>(
                <div key={si} style={{ display:"flex", gap:12, marginBottom:10 }}>
                  <div style={{ width:24, height:24, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.ink }}>{si+1}</div>
                  <p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:"2px 0 0" }}>{st}</p>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"flex-start", background:"rgba(226,201,164,0.25)", borderRadius:12, padding:"10px 12px" }}>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:"#9A7A4E", flexShrink:0 }}>Где взять</div>
              <p style={{ fontSize:13, lineHeight:1.45, color:C.inkSoft, margin:0 }}>{p.shop}</p>
            </div>
          </div>
        </div>
      ))}
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkFaint, textAlign:"center", margin:"6px 0 0" }}>Образы обновляются каждый день ✦</p>
      </Fold>
    </OverlayShell>
  );
}

// ── TRAVEL (Plus) ─────────────────────────────────────────────────
function TravelView({ ch, setDetail, onClose }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const [days, setDays] = useState(3);
  const [aiPlan, setAiPlan] = useState(null);
  const [aiBusy, setAiBusy] = useState(false);
  useEffect(() => {
    if (!sel) { setAiPlan(null); setAiBusy(false); return; }
    let cancelled = false; setAiPlan(null); setAiBusy(true);
    (async () => {
      try {
        const sys = "Ты — Slow Glow travel-консьерж по медленной красивой жизни. Подбираешь точные эстетичные маршруты с реальными характерными местами (не сетевыми), под климат и культуру конкретного города. Пиши тепло и конкретно, только настоящие места.";
        const prompt = `Город: ${sel.name}. Дней: ${days}. Эстетика пользователя: ${ch.aes}. Верни ТОЛЬКО JSON без markdown по-русски: {"about":"1-2 предложения чем город популярен и притягателен","history":"2-3 предложения краткой истории города","district":"лучший район для проживания под эту эстетику с коротким пояснением","stay":"1 предложение-совет где остановиться","packing":[6-8 пунктов что взять именно под ЭТОТ город, его страну, климат и текущий сезон — конкретно, без общих фраз],"days":[на каждый из ${days} дней объект {"title":"тема дня","morning":"утро с конкретным НАЗВАННЫМ местом и улицей/районом","day":"день с конкретным НАЗВАННЫМ местом и улицей/районом","evening":"вечер с конкретным НАЗВАННЫМ местом и улицей/районом"}],"spots":[[реальное название места + улица или район, поисковый запрос для Яндекс Карт] 6 настоящих характерных мест под эстетику: авторские кофейни, музеи, парки, рестораны, смотровые, книжные]}. Пиши кратко: каждое поле — одно ёмкое предложение, без воды, чтобы маршрут собирался быстро. КРИТИЧЕСКИ ВАЖНО: для ЛЮБОГО города, даже маленького или редкого, давай ТОЛЬКО реальные существующие места с настоящими названиями и конкретным адресом/улицей/районом. ЗАПРЕЩЕНЫ общие описания вроде «авторская кофейня в центре», «локальный ресторан» без названия. Никаких сетевых брендов. Если не уверена в точном названии — выбери самое известное реальное характерное место города и укажи его адрес.`;
        const r = await fetch(AI_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1700, system:sys, messages:[{ role:"user", content:prompt }] }) });
        const data = await r.json();
        let txt = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").trim().replace(/```json|```/g,"").trim();
        const a = txt.indexOf("{"), b = txt.lastIndexOf("}"); if (a>=0 && b>a) txt = txt.slice(a, b+1);
        txt = txt.replace(/\*\*/g,"");
        const obj = JSON.parse(txt);
        if (!cancelled && obj && obj.days) setAiPlan(obj);
      } catch (e) {}
      if (!cancelled) setAiBusy(false);
    })();
    return () => { cancelled = true; };
  }, [sel, days, ch.aes]);
  const EXTRA = [
    // Россия
    "Санкт-Петербург","Москва","Сочи","Казань","Калининград","Суздаль","Владимир","Кострома","Ярославль","Углич","Плёс","Нижний Новгород","Городец","Екатеринбург","Пермь","Тюмень","Тула","Калуга","Коломна","Сергиев Посад","Рязань","Тверь","Смоленск","Псков","Великий Новгород","Выборг","Вологда","Архангельск","Мурманск","Петрозаводск","Сортавала","Кижи","Иркутск","Листвянка","Улан-Удэ","Красноярск","Новосибирск","Томск","Владивосток","Хабаровск","Южно-Сахалинск","Петропавловск-Камчатский","Горно-Алтайск","Кисловодск","Пятигорск","Ессентуки","Железноводск","Красная Поляна","Адлер","Геленджик","Анапа","Ялта","Севастополь","Дербент","Грозный","Махачкала","Ростов-на-Дону","Краснодар","Самара","Волгоград","Воронеж","Уфа","Калязин",
    // Популярные направления из России (Aviasales)
    "Стамбул","Анталья","Бодрум","Измир","Каппадокия","Дубай","Абу-Даби","Шарм-эль-Шейх","Хургада","Каир","Пхукет","Бангкок","Бали","Денпасар","Гоа","Коломбо","Мале","Куала-Лумпур","Сингапур","Доха","Ереван","Тбилиси","Батуми","Кутаиси","Баку","Минск","Алматы","Астана","Ташкент","Самарканд","Бухара","Бишкек","Тель-Авив","Ларнака","Пафос",
    // Европа
    "Париж","Ницца","Канны","Ментона","Прованс","Авиньон","Бордо","Лион","Страсбург","Марсель","Рим","Венеция","Флоренция","Милан","Неаполь","Верона","Болонья","Турин","Генуя","Палермо","Амальфи","Позитано","Капри","Сорренто","Барселона","Мадрид","Севилья","Гранада","Валенсия","Малага","Сан-Себастьян","Бильбао","Лиссабон","Порту","Афины","Санторини","Миконос","Крит","Лондон","Эдинбург","Дублин","Амстердам","Брюссель","Брюгге","Прага","Вена","Зальцбург","Будапешт","Берлин","Мюнхен","Гамбург","Дрезден","Цюрих","Женева","Люцерн","Копенгаген","Стокгольм","Хельсинки","Осло","Рейкьявик","Краков","Варшава","Гданьск","Дубровник","Сплит","Котор","Любляна",
  ];
  const norm = s => s.toLowerCase().replace(/ё/g,"е");
  const ql = norm(q.trim());
  const knownMatch = travelFor(ch.id).filter(d=>norm(d.name).includes(ql));
  const extraMatch = EXTRA.filter(c=>norm(c).includes(ql));
  const coastalOf = (name,tag) => /амальф|себастьян|ницц|позитано|санторини|капри|майорк|чефалу|котор|сочи|coastal|побереж|море/i.test(name+" "+(tag||""));
  const CITY_DATA = {
    "санкт-петербург":{ type:"north", district:"Центральный / Адмиралтейский — рядом с Невским и набережными", spots:[["Кофейня «Больше кофе!»","Больше кофе Санкт-Петербург"],["Государственный Русский музей","Русский музей Санкт-Петербург"],["Эрмитаж","Эрмитаж Санкт-Петербург"],["Книжный «Подписные издания»","Подписные издания Санкт-Петербург"]], hotels:["«Гельвеция», Центральный — бутик-отель","Апартаменты у Невского, тихий двор"], acts:["Утро: завтрак и фильтр-кофе в «Больше кофе!» на Гороховой","Прогулка по набережной Фонтанки и Летнему саду","Эрмитаж без спешки — билет купи онлайн заранее","Обед в Duo Gastrobar или «Северянине»","Кофе и десерт в «Подписных изданиях» на Литейном","Русский музей и Михайловский сад","Вечер: коктейль-бар на улице Рубинштейна","Закат у Новой Голландии"] },
    "москва":{ type:"city", district:"Патриаршие / Китай-город — атмосферно и пешком", spots:[["Кофейня «Кооператив Чёрный»","Кооператив Чёрный Москва"],["Новая Третьяковка","Новая Третьяковка Москва"],["Парк Горького","Парк Горького Москва"],["Книжный в «Гараже»","книжный магазин Гараж Москва"]], hotels:["Бутик-отель на Патриарших","Квартира в районе Китай-город"], acts:["Утро: спешелти-кофе в «Кооператив Чёрный» на Покровке","Прогулка по парку Горького и Музеону","Новая Третьяковка — искусство XX века","Обед на Даниловском или Усачёвском рынке","Книжный в «Гараже» и кофе","Закат на смотровой в парке «Зарядье»","Вечер: вино в баре на Патриарших"] },
    "сочи":{ type:"beach", district:"Центр / Ривьера — у моря и набережной", spots:[["Спешелти-кофейня у моря","спешелти кофе Сочи"],["Сочинский дендрарий","Сочинский дендрарий"],["Набережная","набережная Сочи"]], hotels:["Бутик-отель у моря, Центральный район","Апартаменты с видом на море"], acts:["Утро: завтрак с видом на море в кофейне у набережной","Прогулка по Сочинскому дендрарию","Пляж и купание, книга под зонтом","Обед: местная рыба в кафе у моря","Поездка на Красную Поляну — горный воздух","Вечер: закат на набережной"] },
    "казань":{ type:"city", district:"Старо-Татарская слобода — колорит и кофейни", spots:[["Кофейня в Старо-Татарской слободе","кофейня Старо-Татарская слобода Казань"],["Казанский кремль","Казанский кремль"],["Улица Баумана","улица Баумана Казань"]], hotels:["Бутик-отель в центре Казани","Квартира в Старо-Татарской слободе"], acts:["Утро: кофе в Старо-Татарской слободе","Прогулка по набережной Казанки и Кремлёвской","Казанский кремль и мечеть Кул-Шариф","Обед: эчпочмак и казылык в татарском кафе","Прогулка по пешеходной улице Баумана","Вечер: чак-чак и травяной чай"] },
    "калининград":{ type:"north", district:"Амалиенау — тихие зелёные улицы", spots:[["Кофейня в Амалиенау","кофейня Амалиенау Калининград"],["Музей янтаря","Музей янтаря Калининград"],["Рыбная деревня","Рыбная деревня Калининград"]], hotels:["Бутик-отель в Амалиенау","Квартира у Рыбной деревни"], acts:["Утро: кофе в зелёном районе Амалиенау","Прогулка вокруг Верхнего озера","Музей янтаря и Рыбная деревня","Обед: местная рыба или строганина","Поездка на Куршскую косу — дюны и сосны","Вечер: прогулка у Кафедрального собора"] },
    "ницца":{ type:"beach", district:"Vieux Nice (Старый город) — узкие улицы у моря", spots:[["Кофейня в Старом городе","cafe Vieux Nice"],["Музей Матисса","Musée Matisse Nice"],["Promenade des Anglais","Promenade des Anglais Nice"]], hotels:["Бутик-отель в Старом городе","Квартира у Promenade des Anglais"], acts:["Утро: кофе и socca в Старом городе (Vieux Nice)","Прогулка по Promenade des Anglais у моря","Музей Матисса и сад Симье","Обед: рыба и овощи на рынке Cours Saleya","Пляж и купание","Вечер: бокал розе на закате у моря"] },
    "париж":{ type:"city", district:"Le Marais или Saint-Germain — кафе и галереи", spots:[["Кофейня в Marais","cafe Le Marais Paris"],["Музей Орсе","Musée d'Orsay Paris"],["Сад Тюильри","Jardin des Tuileries Paris"]], hotels:["Бутик-отель в Marais","Квартира в Saint-Germain"], acts:["Утро: круассан и кофе в кофейне в Marais","Прогулка по саду Тюильри и набережной Сены","Музей Орсе — импрессионисты","Обед: бистро в Saint-Germain","Книжный Shakespeare and Company","Вечер: вино в винном баре в 11-м округе"] },
    "рим":{ type:"hot", district:"Трастевере — медленные улочки и траттории", spots:[["Кофейня в Трастевере","caffe Trastevere Roma"],["Галерея Боргезе","Galleria Borghese Roma"],["Пантеон","Pantheon Roma"]], hotels:["Бутик-отель в Трастевере","Квартира у Пантеона"], acts:["Утро: cornetto и caffè в баре в Трастевере","Прогулка по Трастевере и via Giulia","Галерея Боргезе — бронируй заранее","Обед: cacio e pepe в семейной траттории","Пантеон и площади исторического центра","Вечер: aperitivo с бокалом на пьяцце"] },
    "тбилиси":{ type:"city", district:"Сололаки — балконы и кофейни", spots:[["Кофейня в Сололаки","specialty coffee Sololaki Tbilisi"],["Бани Абанотубани","Abanotubani Tbilisi"],["Парк Рике","Rike Park Tbilisi"]], hotels:["Бутик-отель в Сололаки","Квартира в Старом городе"], acts:["Утро: кофе в районе Сололаки","Серные бани Абанотубани","Прогулка по Старому городу и мосту Мира","Обед: хинкали и хачапури в местном кафе","Вечер: грузинское вино (квеври) в винном баре","Канатка на Нарикалу — вид на город"] },
    "прованс":{ type:"hot", district:"Сен-Реми или Горд — деревенский шарм", spots:[["Café de la Place, Сен-Реми","cafe de la Place Saint-Rémy"],["Рынок Сен-Реми (среда)","marché Saint-Rémy-de-Provence"],["Музей Эстрин — про Ван Гога","Musée Estrine Saint-Rémy"]], hotels:["La Maison du Village, Сен-Реми","Maison d'hôtes в Горде"], acts:["Утро: кофе на площади в Сен-Реми","Лавандовые поля Валансоль (июнь–июль)","Рынок в Сен-Реми по средам","Обед: розе и местные сыры на террасе","Музей Эстрин — про Ван Гога","Прогулка по деревне Горд на закат"] },
    "амальфи":{ type:"beach", district:"Равелло — тише и выше Позитано", spots:[["Bar Francese, Амальфи","Bar Francese Amalfi"],["Marina Grande","Marina Grande Amalfi"],["Собор Святого Андрея","Duomo di Amalfi"]], hotels:["Hotel Villa San Michele, Равелло","Casa Angelina, Прайано"], acts:["Утро: эспрессо и сфольятелла в Bar Francese","Лодка вдоль побережья, купание в бухтах","Прогулка по Равелло и садам виллы Руфоло","Обед: паста с лимоном у Marina Grande","Собор Святого Андрея в Амальфи","Вечер: лимончелло на закате"] },
    "сан-себастьян":{ type:"beach", district:"Gros — у сёрф-пляжа", spots:[["La Viña — баскский чизкейк","La Viña San Sebastian"],["Музей Сан-Тельмо","San Telmo Museoa Donostia"],["Пляж Ла-Конча","Playa de la Concha San Sebastian"]], hotels:["Hotel Arbaso, центр","Lasala Plaza Hotel"], acts:["Утро: кофе и прогулка по набережной Ла-Конча","Пинчос-крол по Старому городу (La Viña — чизкейк)","Пляж Сурриола в сёрф-районе Gros","Музей Сан-Тельмо","Подъём на гору Игельдо — вид на залив","Вечер: txakoli (баскское вино) в баре"] },
    "лиссабон":{ type:"hot", district:"Príncipe Real — зелёный и тихий", spots:[["Manteigaria — пастел-де-ната","Manteigaria Lisboa"],["Miradouro Santa Catarina","Miradouro Santa Catarina Lisboa"],["Музей азулежу","Museu Nacional do Azulejo"]], hotels:["The Lumiares, Bairro Alto","Memmo Príncipe Real"], acts:["Утро: пастел-де-ната в Manteigaria","Трамвай 28 и прогулка по Алфаме","Смотровая Miradouro de Santa Catarina на закат","Обед: bacalhau в местной таверне","Музей азулежу","Вечер: фаду в Байру-Алту"] },
    "стамбул":{ type:"hot", district:"Каракёй и Галата — кофейни, виды и Босфор", spots:[["Kronotrop Coffee","Kronotrop Coffee Istanbul"],["Музей Перы","Pera Museum Istanbul"],["Галатская башня","Galata Tower Istanbul"],["Гранд-базар","Grand Bazaar Istanbul"]], hotels:["The Galata Istanbul, Каракёй","Бутик-отель в районе Галата"], acts:["Утро: фильтр-кофе в Kronotrop в Каракёй","Прогулка по Галате и набережной Босфора","Айя-София и Голубая мечеть в Султанахмете","Обед: мезе и рыба в балык-локанте у воды","Гранд-базар и специи на Египетском базаре","Вечер: чай с видом на Босфор, паром на закате"] },
    "барселона":{ type:"city", district:"Готический квартал и Эль-Борн — узкие улицы и площади", spots:[["Nømad Coffee","Nomad Coffee Barcelona"],["Музей Пикассо","Museu Picasso Barcelona"],["Саграда Фамилия","Sagrada Familia Barcelona"],["Парк Гуэля","Park Guell Barcelona"]], hotels:["Hotel Neri, Готический квартал","Yurbban Trafalgar Hotel"], acts:["Утро: эспрессо в Nømad Coffee в Эль-Борн","Прогулка по Готическому кварталу","Саграда Фамилия — бронируй слот заранее","Обед: тапас на рынке Бокерия","Музей Пикассо в Эль-Борн","Вечер: закат и мозаики в парке Гуэля"] },
    "мадрид":{ type:"hot", district:"Маласанья и Чуэка — кофейни и бутики", spots:[["HanSo Café","HanSo Cafe Madrid"],["Музей Прадо","Museo del Prado Madrid"],["Парк Ретиро","Parque del Retiro Madrid"],["Меркадо-де-Сан-Мигель","Mercado de San Miguel Madrid"]], hotels:["Only YOU Boutique, Чуэка","7 Islas Hotel, Маласанья"], acts:["Утро: кофе в HanSo Café в Маласанье","Прогулка по парку Ретиро","Музей Прадо — приходи к открытию","Обед: тапас на Mercado de San Miguel","Закатный бокал на руфтопе в центре","Вечер: тапас-крол по Ла-Латине"] },
    "севилья":{ type:"hot", district:"Санта-Крус — апельсиновые дворики и азулежу", spots:[["Кофейня в Санта-Крус","specialty coffee Sevilla"],["Алькасар","Real Alcazar Sevilla"],["Кафедральный собор и Хиральда","Catedral de Sevilla"],["Площадь Испании","Plaza de Espana Sevilla"]], hotels:["Hotel Casa 1800, Санта-Крус","Бутик-отель у Алькасара"], acts:["Утро: кофе и тосты в Санта-Крус","Дворец Алькасар и его сады","Кафедральный собор и подъём на Хиральду","Обед: тапас в баре старого города","Площадь Испании на мягком свете","Вечер: фламенко в Триане"] },
    "гранада":{ type:"hot", district:"Альбайсин — белые улочки над городом", spots:[["Кофейня в Альбайсине","specialty coffee Granada"],["Альгамбра","Alhambra Granada"],["Смотровая Сан-Николас","Mirador San Nicolas Granada"]], hotels:["Hotel Casa 1800 Granada","Гостевой дом-риад в Альбайсине"], acts:["Утро: кофе в Альбайсине","Альгамбра и сады Хенералифе — билет заранее","Прогулка по белым улочкам Альбайсина","Обед: тапас (в Гранаде они бесплатны к напитку)","Смотровая Сан-Николас на закат с видом на Альгамбру","Вечер: чайная в арабском квартале"] },
    "венеция":{ type:"city", district:"Каннареджо и Дорсодуро — без толп", spots:[["Torrefazione Cannaregio","Torrefazione Cannaregio Venezia"],["Галерея Академии","Gallerie Accademia Venezia"],["Площадь Сан-Марко","Piazza San Marco Venezia"],["Мост Риальто","Ponte di Rialto Venezia"]], hotels:["Ca Maria Adele, Дорсодуро","Бутик-палаццо в Каннареджо"], acts:["Утро: эспрессо у канала в Каннареджо","Площадь Сан-Марко до наплыва туристов","Галерея Академии в Дорсодуро","Обед: чикетти и вино в баккаро","Прогулка по мостам и тихим каналам","Вечер: гондола или вапоретто на закат"] },
    "флоренция":{ type:"hot", district:"Ольтрарно — ремесленники и тишина", spots:[["Ditta Artigianale","Ditta Artigianale Firenze"],["Галерея Уффици","Uffizi Firenze"],["Площадь Микеланджело","Piazzale Michelangelo Firenze"],["Сад Боболи","Giardino Boboli Firenze"]], hotels:["Hotel Lungarno, у Понте-Веккьо","Бутик-отель в Ольтрарно"], acts:["Утро: капучино в Ditta Artigianale","Галерея Уффици — бронируй заранее","Прогулка через Понте-Веккьо в Ольтрарно","Обед: панини в семейной остерии","Сад Боболи и тихие дворики","Вечер: закат с площади Микеланджело"] },
    "милан":{ type:"city", district:"Брера — галереи, бутики и кафе", spots:[["Pavé","Pave Milano"],["Пинакотека Брера","Pinacoteca Brera Milano"],["Дуомо","Duomo Milano"],["Галерея Виктора Эммануила II","Galleria Vittorio Emanuele Milano"]], hotels:["Bulgari Hotel, Брера","Бутик-отель в районе Брера"], acts:["Утро: завтрак и выпечка в Pavé","Дуомо и подъём на крышу собора","Пинакотека Брера и улочки района","Обед: ризотто по-милански в траттории","Aperitivo в районе Навильи у каналов","Вечер: бокал в винном баре"] },
    "неаполь":{ type:"hot", district:"Кьяйя и исторический центр", spots:[["Gran Caffè Gambrinus","Gran Caffe Gambrinus Napoli"],["Музей Каподимонте","Museo Capodimonte Napoli"],["Набережная Лунгомаре","Lungomare Napoli"]], hotels:["Grand Hotel Vesuvio","Бутик-отель в Кьяйя"], acts:["Утро: эспрессо и сфольятелла в Gran Caffè Gambrinus","Прогулка по набережной Лунгомаре","Музей Каподимонте","Обед: настоящая пицца в Da Michele или Sorbillo","Спаккуа-Наполи — улочки старого центра","Вечер: вид на залив и Везувий на закате"] },
    "порту":{ type:"hot", district:"Рибейра и Бомбарда — у реки и в богемном квартале", spots:[["Combi Coffee Roasters","Combi Coffee Porto"],["Livraria Lello","Livraria Lello Porto"],["Винные погреба Вила-Нова-ди-Гайя","Vila Nova de Gaia port cellars"],["Набережная Рибейра","Ribeira Porto"]], hotels:["The Yeatman, Гайя — вид на город","Бутик-отель в Рибейре"], acts:["Утро: кофе в Combi Coffee","Книжный Livraria Lello к открытию","Прогулка по набережной Рибейра и мосту Дона Луиша","Обед: франсезинья или свежая рыба","Дегустация портвейна в погребах Гайи","Вечер: закат с террасы над рекой Дору"] },
    "афины":{ type:"hot", district:"Плака и Колонаки — у подножия Акрополя", spots:[["Taf Coffee","Taf Coffee Athens"],["Музей Акрополя","Acropolis Museum Athens"],["Акрополь и Парфенон","Acropolis Athens"],["Холм Ликавит","Lycabettus Hill Athens"]], hotels:["Coco-Mat Athens BC","Бутик-отель в Плаке"], acts:["Утро: кофе в Taf Coffee","Акрополь и Парфенон — приходи к открытию","Музей Акрополя","Обед: мезе в таверне в Плаке","Прогулка по району Монастираки и блошиному рынку","Вечер: закат с холма Ликавит"] },
    "санторини":{ type:"beach", district:"Ия (Oia) — белые домики и закаты", spots:[["Кофейня с видом на кальдеру","cafe Oia Santorini"],["Музей доисторической Тиры","Museum Prehistoric Thera Santorini"],["Закат в Ие","Oia sunset Santorini"]], hotels:["Кейв-сьют с видом на кальдеру, Ия","Бутик-отель в Имеровигли"], acts:["Утро: кофе с видом на кальдеру в Ие","Прогулка по белым улочкам Ии и Фиры","Пляж с чёрным песком в Камари или Периссе","Обед: свежая рыба и ассыртико у моря","Музей доисторической Тиры","Вечер: знаменитый закат в Ие"] },
    "прага":{ type:"city", district:"Мала Страна и Винограды — крыши и кофейни", spots:[["EMA Espresso Bar","EMA Espresso Bar Prague"],["Галерея Кампа","Museum Kampa Prague"],["Карлов мост","Charles Bridge Prague"],["Пражский Град","Prague Castle"]], hotels:["Augustine Hotel, Мала Страна","Бутик-отель в районе Винограды"], acts:["Утро: кофе в EMA Espresso Bar","Карлов мост до толп и Пражский Град","Галерея Кампа на острове","Обед: чешская кухня в семейной господе","Прогулка по зелёным Виноградам","Вечер: бокал чешского вина и виды на крыши"] },
    "вена":{ type:"city", district:"Старый город и 7-й район (Нойбау)", spots:[["Café Central","Cafe Central Wien"],["Музей Альбертина","Albertina Wien"],["Дворец Бельведер","Belvedere Wien"],["Колесо обозрения в Пратере","Riesenrad Prater Wien"]], hotels:["Hotel Sacher, центр","Бутик-отель в 7-м районе"], acts:["Утро: меланж и штрудель в Café Central","Музей Альбертина","Дворец Бельведер и сады (Климт)","Обед: венский шницель в классической ресторации","Прогулка по 7-му району с бутиками","Вечер: бокал на колесе обозрения в Пратере"] },
    "будапешт":{ type:"city", district:"7-й район и Буда — руин-бары и купальни", spots:[["My Little Melbourne Coffee","My Little Melbourne Budapest"],["Купальни Сечени","Szechenyi Baths Budapest"],["Рыбацкий бастион","Fishermans Bastion Budapest"],["Здание Парламента","Hungarian Parliament Budapest"]], hotels:["Aria Hotel Budapest","Бутик-отель в 7-м районе"], acts:["Утро: кофе в My Little Melbourne","Купальни Сечени — термальные ванны","Прогулка по Буде и Рыбацкому бастиону","Обед: гуляш в семейном ресторане","Вид на Парламент с набережной Дуная","Вечер: руин-бар в 7-м районе"] },
    "амстердам":{ type:"north", district:"Йордан (Jordaan) — каналы и кофейни", spots:[["Lot Sixty One Coffee","Lot Sixty One Amsterdam"],["Музей Ван Гога","Van Gogh Museum Amsterdam"],["Рейксмюсеум","Rijksmuseum Amsterdam"],["Каналы Йордана","Jordaan canals Amsterdam"]], hotels:["The Hoxton, Herengracht","Бутик-отель в Йордане"], acts:["Утро: кофе в Lot Sixty One","Музей Ван Гога — слот заранее","Прогулка по каналам Йордана","Обед: сэндвич и сыр на рынке","Рейксмюсеум и парк Вонделпарк","Вечер: бокал у канала на закате"] },
    "лондон":{ type:"city", district:"Ноттинг-Хилл, Мэрилебон и Сохо", spots:[["Monmouth Coffee","Monmouth Coffee London"],["Тейт Модерн","Tate Modern London"],["Гайд-парк","Hyde Park London"],["Daunt Books, Мэрилебон","Daunt Books Marylebone London"]], hotels:["The Laslett, Ноттинг-Хилл","Бутик-отель в Мэрилебоне"], acts:["Утро: флэт-уайт в Monmouth Coffee","Тейт Модерн и прогулка по Саут-Банк","Книжный Daunt Books в Мэрилебоне","Обед: рынок Боро-маркет","Прогулка по Гайд-парку и Ноттинг-Хиллу","Вечер: спектакль в Вест-Энде или паб"] },
    "берлин":{ type:"city", district:"Митте и Кройцберг — галереи и кофе", spots:[["The Barn","The Barn Coffee Berlin"],["Музейный остров","Museum Island Berlin"],["Парк Тиргартен","Tiergarten Berlin"],["East Side Gallery","East Side Gallery Berlin"]], hotels:["Hotel Zoo Berlin","Бутик-отель в Митте"], acts:["Утро: фильтр-кофе в The Barn","Музейный остров (Пергамон, Нойес)","Прогулка по Тиргартену","Обед: стрит-фуд на рынке в Кройцберге","East Side Gallery вдоль Стены","Вечер: вино в баре в Кройцберге"] },
    "копенгаген":{ type:"north", district:"Нюхавн и Вестербро — гавань и хюгге", spots:[["Coffee Collective","Coffee Collective Copenhagen"],["Глиптотека Карлсберга","Ny Carlsberg Glyptotek Copenhagen"],["Сады Тиволи","Tivoli Gardens Copenhagen"],["Набережная Нюхавн","Nyhavn Copenhagen"]], hotels:["Hotel Sanders, центр","Бутик-отель в Вестербро"], acts:["Утро: кофе в Coffee Collective","Прогулка по разноцветной набережной Нюхавн","Глиптотека Карлсберга","Обед: смёрребрёд в кафе","Велопрогулка по городу","Вечер: огни садов Тиволи"] },
    "ереван":{ type:"city", district:"Кентрон — центр у Каскада", spots:[["Спешелти-кофейня в центре","specialty coffee Yerevan"],["Каскад и центр Кафесчяна","Cascade Cafesjian Yerevan"],["Матенадаран","Matenadaran Yerevan"],["Площадь Республики","Republic Square Yerevan"]], hotels:["The Alexander, Kentron","Бутик-отель в центре Еревана"], acts:["Утро: кофе по-армянски в центре","Каскад и музей Кафесчяна","Матенадаран — древние рукописи","Обед: долма и хаш в местном ресторане","Площадь Республики и поющие фонтаны вечером","Вечер: армянское вино и коньяк в баре"] },
    "батуми":{ type:"beach", district:"Старый город у Чёрного моря", spots:[["Кофейня в Старом Батуми","specialty coffee Batumi"],["Приморский бульвар","Batumi Boulevard"],["Площадь Пьяцца","Piazza Square Batumi"]], hotels:["Бутик-отель в Старом городе","Апартаменты с видом на море"], acts:["Утро: кофе в Старом городе","Прогулка по Приморскому бульвару","Пляж и купание в Чёрном море","Обед: аджарский хачапури у моря","Площадь Пьяцца и старые улочки","Вечер: закат на набережной и вино Аджарии"] },
    "баку":{ type:"hot", district:"Ичери-шехер (Старый город) и Бульвар", spots:[["Кофейня в Ичери-шехер","specialty coffee Baku"],["Девичья башня","Maiden Tower Baku"],["Центр Гейдара Алиева","Heydar Aliyev Center Baku"],["Приморский бульвар","Baku Boulevard"]], hotels:["Бутик-отель в Старом городе","Отель у Приморского бульвара"], acts:["Утро: кофе в Ичери-шехер","Девичья башня и дворец Ширваншахов","Центр Гейдара Алиева — архитектура Захи Хадид","Обед: плов и кутабы в национальном ресторане","Прогулка по Приморскому бульвару","Вечер: огни Пламенных башен на закате"] },
    "дубай":{ type:"hot", district:"Аль-Фахиди (Old Dubai) и Дубай-Марина", spots:[["Спешелти-кофейня в Dubai Marina","specialty coffee Dubai Marina"],["Бурдж-Халифа и фонтаны","Burj Khalifa Dubai"],["Квартал Аль-Фахиди","Al Fahidi Dubai"],["Золотой сук в Дейре","Gold Souk Dubai"]], hotels:["Бутик-отель в Аль-Фахиди","Отель в Dubai Marina"], acts:["Утро: кофе с видом на марину","Старый квартал Аль-Фахиди и абра через бухту","Золотой и пряный сук в Дейре","Обед: эмиратская кухня в Al Fahidi","Бурдж-Халифа и смотровая At the Top","Вечер: шоу фонтанов Дубай и закат в пустыне"] },
    "суздаль":{ type:"north", district:"Центр у Кремля и Торговых рядов", spots:[["Кофейня у Торговых рядов","кофейня Суздаль"],["Суздальский кремль","Суздальский кремль"],["Музей деревянного зодчества","Музей деревянного зодчества Суздаль"]], hotels:["Бутик-отель в центре Суздаля","Гостевой дом с видом на луга"], acts:["Утро: кофе и медовуха у Торговых рядов","Суздальский кремль и Рождественский собор","Музей деревянного зодчества","Обед: русская кухня и солёные грузди","Прогулка вдоль реки Каменки","Вечер: закат над лугами и куполами"] },
    "нижний новгород":{ type:"city", district:"Большая Покровская и Започаинье", spots:[["Кофейня на Покровке","спешелти кофе Нижний Новгород"],["Нижегородский кремль","Нижегородский кремль"],["Чкаловская лестница","Чкаловская лестница Нижний Новгород"],["Стрелка","Стрелка Нижний Новгород"]], hotels:["Бутик-отель в центре","Апартаменты с видом на Волгу"], acts:["Утро: кофе на Большой Покровской","Нижегородский кремль и виды на Волгу","Чкаловская лестница к набережной","Обед: волжская рыба в местном ресторане","Стрелка и собор Александра Невского","Вечер: закат на Верхневолжской набережной"] },
    "выборг":{ type:"north", district:"Старый город — средневековые улочки", spots:[["Кофейня в Старом городе","кофейня Выборг"],["Выборгский замок","Выборгский замок"],["Парк Монрепо","парк Монрепо Выборг"]], hotels:["Отель в Старом городе","Гостевой дом у замка"], acts:["Утро: кофе и крендель в Старом городе","Выборгский замок и подъём на башню Олафа","Прогулка по средневековым улочкам","Обед: финская и карельская кухня","Скальный парк Монрепо","Вечер: закат у залива"] },
    "псков":{ type:"north", district:"Центр у Крома (Кремля)", spots:[["Кофейня у Крома","кофейня Псков"],["Псковский Кром","Псковский кром"],["Мирожский монастырь","Мирожский монастырь Псков"]], hotels:["Бутик-отель в центре Пскова","Гостевой дом у реки Великой"], acts:["Утро: кофе у стен Крома","Псковский Кром и Троицкий собор","Мирожский монастырь с фресками XII века","Обед: псковский снеток и местная кухня","Прогулка вдоль реки Великой","Вечер: тихий закат у крепостных стен"] },
  };
  const cityKey = (name) => { let n = norm(String(name).split(",")[0].trim()); if(/питер|спб|санкт/.test(n)) n="санкт-петербург"; return n; };
  const CITY_ACTS = {
    "санкт-петербург":{ m:["завтрак в «Больше кофе!» на Гороховой","кофе и сырники в кофейне на Рубинштейна","утро в «Civil» на Жуковского"], d:["прогулка по Михайловскому саду","Эрмитаж без спешки","набережная Фонтанки и Новая Голландия"], e:["ужин на улице Рубинштейна","винный бар с европейскими винами на Некрасова","закат на крыше «Лофт Проджект Этажи»"] },
    "москва":{ m:["завтрак в «Кооператив Чёрный» на Покровке","кофе в «Человек и Пароход»","утро в кофейне на Патриарших"], d:["прогулка по парку Горького и Музеону","Новая Третьяковка","улочки Китай-города пешком"], e:["ужин на Патриарших","винный бар «Большое Вино» на Сретенке","вид с крыши на Красный Октябрь"] },
    "сочи":{ m:["завтрак с видом на море на набережной","кофе в спешелти у Ривьеры"], d:["прогулка по Сочинскому дендрарию","пляж и купание","канатка на Ахун за панорамой"], e:["рыбный ужин у моря","закат на набережной","терраса с видом на порт"] },
    "казань":{ m:["завтрак в кофейне Старо-Татарской слободы","эчпочмак и чай по-татарски"], d:["прогулка по Казанскому кремлю","улица Баумана","озеро Кабан и набережная"], e:["ужин с татарской кухней","вечерняя Баумана","чак-чак и чай на десерт"] },
    "калининград":{ m:["завтрак в кофейне в Амалиенау","кофе и штрудель в центре"], d:["прогулка по тихим улицам Амалиенау","Музей янтаря","Рыбная деревня у реки"], e:["ужин с балтийской рыбой","вечер у Рыбной деревни","местный сидр или европейское вино"] },
    "ницца":{ m:["завтрак в кофейне Vieux Nice","кофе и сокка на рынке Cours Saleya"], d:["прогулка по Promenade des Anglais","Музей Матисса","старый город и рынок"], e:["ужин с провансальской кухней","бокал розе на закате","набережная вечером"] },
    "париж":{ m:["завтрак с круассаном в кафе Le Marais","кофе в Saint-Germain"], d:["прогулка по саду Тюильри","Музей Орсе","набережные Сены и мостики"], e:["ужин в бистро Marais","бокал вина на террасе","вид на огни с моста"] },
    "рим":{ m:["эспрессо и корнетто в баре Трастевере","завтрак на тихой площади"], d:["прогулка по Трастевере","Галерея Боргезе и парк виллы","Пантеон и узкие улочки"], e:["ужин в семейной траттории","бокал местного вина","джелато на вечерней прогулке"] },
    "тбилиси":{ m:["завтрак в кофейне Сололаки","кофе с хачапури"], d:["прогулка по Старому городу и Сололаки","серные бани Абанотубани","канатка к крепости Нарикала"], e:["ужин с грузинской кухней и киндзмараули","вечер в винном баре (грузинские вина)","вид на ночной город с Нарикала"] },
    "прованс":{ m:["кофе и инжир на рынке Сен-Реми","завтрак на террасе maison d'hôtes"], d:["лавандовые поля Валансоль на мягком свете","прогулка по Горду","Музей Эстрин про Ван Гога"], e:["ужин на террасе с местным розе","закат среди оливковых рощ","деревенский вечер без плана"] },
    "амальфи":{ m:["эспрессо и сфольятелла в Bar Francese","завтрак с видом на море"], d:["лодка вдоль побережья и бухты","прогулка по Равелло","Marina Grande и собор"], e:["паста с лимоном на закате","бокал лимончелло","ужин у воды"] },
    "сан-себастьян":{ m:["кофе и тортилья в старом городе","завтрак у пляжа Гросс"], d:["пляж Ла-Конча и набережная","пинчос-крол по старому городу","Музей Сан-Тельмо"], e:["баскский чизкейк в La Viña","бокал txakoli (баскское вино)","закат на Монте-Ургуль"] },
    "лиссабон":{ m:["пастел-де-ната в Manteigaria","кофе в Принсипи-Реал"], d:["трамвай 28 и смотровые miradouros","прогулка по Алфаме","музей азулежу"], e:["фаду и ужин в Байру-Алту","бокал вина на Miradouro Santa Catarina","вечер на холмах"] },
    "стамбул":{ m:["фильтр-кофе в Kronotrop в Каракёй","симит и чай с видом на Босфор"], d:["Айя-София и Голубая мечеть в Султанахмете","прогулка по Галате и набережной","Гранд-базар и Египетский базар"], e:["мезе и рыба в балык-локанте у воды","паром через Босфор на закате","чай с пахлавой вечером"] },
    "барселона":{ m:["эспрессо в Nømad Coffee в Эль-Борн","завтрак с тостами на рынке Бокерия"], d:["Саграда Фамилия (слот заранее)","Готический квартал пешком","Музей Пикассо и парк Гуэля"], e:["тапас-крол по Эль-Борн","бокал кавы на руфтопе","закат на пляже Барселонета"] },
    "мадрид":{ m:["кофе в HanSo Café в Маласанье","чуррос с шоколадом в Сан-Хинес"], d:["Музей Прадо к открытию","парк Ретиро и стеклянный дворец","Mercado de San Miguel"], e:["тапас-крол по Ла-Латине","бокал на руфтопе в центре","вечерняя Гран-Виа"] },
    "севилья":{ m:["кофе и тосты в Санта-Крус","завтрак во дворике старого города"], d:["дворец Алькасар и сады","собор и подъём на Хиральду","площадь Испании на мягком свете"], e:["фламенко в Триане","тапас и фино в баре","прогулка вдоль Гвадалквивира"] },
    "гранада":{ m:["кофе в Альбайсине","завтрак с видом на Альгамбру"], d:["Альгамбра и сады Хенералифе (билет заранее)","белые улочки Альбайсина","бесплатные тапас к напитку"], e:["закат со смотровой Сан-Николас","чайная в арабском квартале","фламенко в пещерах Сакромонте"] },
    "венеция":{ m:["эспрессо у канала в Каннареджо","завтрак с видом на воду"], d:["Сан-Марко до толп","Галерея Академии в Дорсодуро","тихие мосты и каналы"], e:["чикетти и вино в баккаро","закат на вапоретто","вечерняя площадь без туристов"] },
    "флоренция":{ m:["капучино в Ditta Artigianale","завтрак в Ольтрарно"], d:["Галерея Уффици (заранее)","Понте-Веккьо и сад Боболи","ремесленные мастерские Ольтрарно"], e:["закат с площади Микеланджело","бокал тосканского в энотеке","ужин в семейной остерии"] },
    "милан":{ m:["завтрак и выпечка в Pavé","кофе в районе Брера"], d:["Дуомо и крыша собора","Пинакотека Брера","бутики и галереи центра"], e:["aperitivo на каналах Навильи","бокал в винном баре","вечерняя Галерея Виктора Эммануила"] },
    "неаполь":{ m:["эспрессо и сфольятелла в Gambrinus","завтрак с видом на залив"], d:["набережная Лунгомаре","музей Каподимонте","улочки Спаккуа-Наполи"], e:["настоящая пицца у Da Michele","закат с видом на Везувий","джелато на вечерней прогулке"] },
    "порту":{ m:["кофе в Combi Coffee","завтрак у реки Дору"], d:["Livraria Lello к открытию","набережная Рибейра и мост Дона Луиша","дегустация портвейна в Гайе"], e:["франсезинья в местном кафе","закат с террасы над рекой","фаду в старом квартале"] },
    "афины":{ m:["кофе в Taf Coffee","завтрак в Плаке"], d:["Акрополь и Парфенон к открытию","Музей Акрополя","Монастираки и блошиный рынок"], e:["мезе в таверне в Плаке","закат с холма Ликавит","узо на крыше с видом на Акрополь"] },
    "санторини":{ m:["кофе с видом на кальдеру в Ие","завтрак с греческим йогуртом"], d:["белые улочки Ии и Фиры","пляж в Камари или Периссе","музей доисторической Тиры"], e:["знаменитый закат в Ие","свежая рыба и ассыртико у моря","вино на террасе над кальдерой"] },
    "прага":{ m:["кофе в EMA Espresso Bar","завтрак в Виноградах"], d:["Карлов мост и Пражский Град до толп","Галерея Кампа","зелёные Винограды"], e:["чешская кухня в господе","бокал вина с видом на крыши","вечерний Старый город"] },
    "вена":{ m:["меланж и штрудель в Café Central","завтрак в венской кофейне"], d:["Музей Альбертина","дворец Бельведер и Климт","7-й район с бутиками"], e:["венский шницель в ресторации","бокал на колесе обозрения в Пратере","концерт классической музыки"] },
    "будапешт":{ m:["кофе в My Little Melbourne","завтрак в 7-м районе"], d:["купальни Сечени","Буда и Рыбацкий бастион","набережная с видом на Парламент"], e:["гуляш в семейном ресторане","руин-бар в 7-м районе","ночные виды на Дунай"] },
    "амстердам":{ m:["кофе в Lot Sixty One","завтрак у канала в Йордане"], d:["Музей Ван Гога (слот заранее)","каналы Йордана пешком","Рейксмюсеум и Вонделпарк"], e:["сыр и вино у канала","закат с моста","вечерняя прогулка по центру"] },
    "лондон":{ m:["флэт-уайт в Monmouth Coffee","завтрак на Боро-маркет"], d:["Тейт Модерн и Саут-Банк","книжный Daunt Books в Мэрилебоне","Гайд-парк и Ноттинг-Хилл"], e:["спектакль в Вест-Энде","ужин в гастропабе","вечерние огни Темзы"] },
    "берлин":{ m:["фильтр-кофе в The Barn","завтрак в Митте"], d:["Музейный остров","парк Тиргартен","East Side Gallery"], e:["стрит-фуд в Кройцберге","вино в баре района","вечерняя прогулка у Шпрее"] },
    "копенгаген":{ m:["кофе в Coffee Collective","завтрак с выпечкой"], d:["набережная Нюхавн","Глиптотека Карлсберга","велопрогулка по городу"], e:["смёрребрёд в кафе","огни садов Тиволи","бокал natural wine в Вестербро"] },
    "ереван":{ m:["кофе по-армянски в центре","завтрак с гатой"], d:["Каскад и музей Кафесчяна","Матенадаран","площадь Республики"], e:["долма и хаш в ресторане","поющие фонтаны вечером","армянский коньяк в баре"] },
    "батуми":{ m:["кофе в Старом городе","завтрак у моря"], d:["Приморский бульвар","пляж и купание","площадь Пьяцца"], e:["аджарский хачапури у моря","закат на набережной","вино Аджарии вечером"] },
    "баку":{ m:["кофе в Ичери-шехер","завтрак в Старом городе"], d:["Девичья башня и дворец Ширваншахов","центр Гейдара Алиева","Приморский бульвар"], e:["плов и кутабы в ресторане","огни Пламенных башен","чай с вареньем в чайхане"] },
    "дубай":{ m:["кофе с видом на марину","завтрак в Аль-Фахиди"], d:["старый квартал Аль-Фахиди и абра","золотой и пряный сук","Бурдж-Халифа и смотровая"], e:["шоу фонтанов Дубай","ужин с видом на залив","закат в пустыне"] },
    "суздаль":{ m:["кофе и медовуха у Торговых рядов","завтрак с блинами"], d:["Суздальский кремль","Музей деревянного зодчества","прогулка вдоль Каменки"], e:["русская кухня и грузди","закат над лугами и куполами","травяной чай у печи"] },
    "нижний новгород":{ m:["кофе на Большой Покровской","завтрак с видом на Волгу"], d:["Нижегородский кремль","Чкаловская лестница","Стрелка и собор"], e:["волжская рыба в ресторане","закат на Верхневолжской набережной","вечерняя Покровская"] },
    "выборг":{ m:["кофе и крендель в Старом городе","завтрак у залива"], d:["Выборгский замок и башня Олафа","средневековые улочки","парк Монрепо"], e:["финская и карельская кухня","закат у залива","тихий вечер в старом городе"] },
    "псков":{ m:["кофе у стен Крома","завтрак в центре"], d:["Псковский Кром и Троицкий собор","Мирожский монастырь с фресками","прогулка вдоль реки Великой"], e:["псковский снеток и местная кухня","закат у крепостных стен","тихий вечер в центре"] },
  };
  const genericActs = (city, type) => ({
    m:[`утро: спешелти-кофе и свежая выпечка в кофейне старого центра ${city}`,`неспешный завтрак у окна — без телефона и спешки`],
    d: type==="beach"?[`утро на тихом пляже: SPF, книга, купание`,`прогулка по набережной босиком у воды`,`обед: свежая рыба и местное вино с видом на море`]:type==="north"?[`прогулка по главному парку и тихим улицам ${city}`,`главный художественный музей города — приходи к открытию`,`кофе с десертом в уютной кофейне у воды`]:[`прогулка по историческому центру и площадям ${city}`,`главный музей или галерея — приходи к открытию`,`смотровая площадка на закат`],
    e: type==="beach"?[`ужин с морепродуктами у воды на закате`,`вечерняя набережная и мороженое`]:[`ужин в семейном ресторане с сезонным меню`,`бокал местного вина на террасе`,`вечерняя прогулка и десерт`],
  });
  const cityProfile = (name,tag) => {
    const key = cityKey(name);
    const base = CITY_DATA[key] || { type: coastalOf(name,tag) ? "beach" : "city" };
    return { ...base, acts: CITY_ACTS[key] || genericActs(String(name).split(",")[0], base.type) };
  };
  const packing = (d, type) => {
    const tops = Math.max(3, Math.ceil(d*0.8));
    const base = [
      "Паспорт/билеты, страховка, немного налички",
      `Одежда по погоде: ${tops} верхов, 2–3 низа`,
      "Удобная обувь для долгих прогулок",
      "Мини-уход: крем, бальзам для губ, аромат-трэвел",
      "Зарядки, повербанк, переходник",
      "Мини-аптечка: обезболивающее, пластыри, своё",
      "Многоразовая бутылка для воды",
      "Книга и плёночная камера для кадров",
    ];
    const extra = ({
      beach:["SPF 50 для лица и тела + SPF-бальзам для губ","Купальник, парео и пляжная сумка","Соломенная шляпа и солнечные очки","Нарядные сандалии на вечер"],
      hot:["SPF 50 и SPF-бальзам — солнце активное","Соломенная шляпа и очки","Льняная свободная одежда","Один нарядный образ на вечер"],
      north:["Компактный зонт и непромокаемая обувь","Тёплый слой и ветровка или тренч","Шарф — вечером прохладно даже летом","Лёгкий SPF днём (даже в облачность)"],
      city:["Удобная обувь для брусчатки","Компактный зонт на всякий случай","Один нарядный образ на вечер","Лёгкий SPF на день"],
      mountain:["Тёплые слои и флис","Трекинговая обувь","Дождевик или ветровка","Термос и перекус"],
    })[type] || [];
    const tail = [ d>=5?"Мешок для грязного белья":null, d>=7?"Мини-средство для стирки":null ].filter(Boolean);
    return [base[0], ...extra, ...base.slice(1), ...tail];
  };
  const pick3 = (obj) => setSel(obj);
  // selected view
  if (sel) {
    const prof = cityProfile(sel.name, sel.tag);
    const cityName = sel.name.split(",")[0];
    const P = aiPlan;
    const waitingAI = !!(sel.custom && aiBusy && !aiPlan);
    const A = (prof.acts && prof.acts.m) ? prof.acts : { m:["завтрак в авторской кофейне в центре","кофе и выпечка на главной улице"], d: prof.type==="beach"?["пляж и купание","прогулка по набережной"]:["прогулка по историческому центру","главный музей города"], e: prof.type==="beach"?["ужин у воды","закат на набережной"]:["ужин в локальном ресторане","вечерняя прогулка и десерт"] };
    const dayTitles = ["Знакомство с городом","Медленный день","Гастрономия и рынки","Культура и виды","Свой ритм","Любимое ещё раз"];
    const curItin = Array.from({length:days}, (_,i)=>({
      th: dayTitles[i % dayTitles.length],
      acts: [ "Утро: "+A.m[i % A.m.length], "День: "+A.d[i % A.d.length], "Вечер: "+A.e[i % A.e.length] ],
    }));
    const itinerary = (P && P.days && P.days.length) ? P.days.map(d=>({ th:d.title||"", acts:[ d.morning?("Утро: "+d.morning):null, d.day?("День: "+d.day):null, d.evening?("Вечер: "+d.evening):null ].filter(Boolean) })) : curItin;
    const district = (P && P.district) || prof.district || "тихий центральный район — ближе к жизни города и подальше от туристических улиц";
    const stay = (P && P.stay) || `Лучший район для тебя — ${district}. Выбирай маленькие бутик-отели или квартиры: атмосферы будет больше, чем в сетевом отеле.`;
    const hotels = prof.hotels || ["Маленький бутик-отель или гестхаус в тихом районе","Квартира с характером вместо сетевого отеля"];
    const spots = (P && P.spots && P.spots.length) ? P.spots : (prof.spots || [["Авторская кофейня в центре","спешелти кофейня "+cityName],["Локальный ресторан с сезонным меню","ресторан "+cityName],["Главный музей города","музей "+cityName]]);
    const rentUrl = "https://www.airbnb.ru/s/"+encodeURIComponent(cityName)+"/homes";
    const pl = (P && P.packing && P.packing.length) ? P.packing : packing(days, prof.type);
    const about = P && P.about; const history = P && P.history;
    return (
      <OverlayShell partner={ch.partner} label="ПУТЕШЕСТВИЯ · PLUS" onClose={onClose}>
        <button onClick={()=>setSel(null)} style={{ border:"none", background:"transparent", cursor:"pointer", color:C.inkSoft, padding:"0 0 10px", marginLeft:-4, display:"flex", alignItems:"center", gap:6, fontFamily:body, fontSize:14 }}><ArrowLeft size={18} strokeWidth={1.6}/> ко всем направлениям</button>
        <div style={{ position:"relative", borderRadius:18, overflow:"hidden", marginBottom:16 }}>
          <Photo t={sel.t ?? 1} url={cityStock(sel.name)} h={150} radius={0}>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 40%, rgba(26,26,26,0.5) 100%)" }}/>
            <div style={{ position:"absolute", left:16, bottom:13, right:16 }}>
              {sel.tag && <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.14em", color:"rgba(255,255,255,0.9)", textTransform:"uppercase" }}>{sel.tag}</div>}
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:24, color:"#fff", lineHeight:1.1, textShadow:"0 1px 8px rgba(26,26,26,0.5)" }}>{sel.name}</div>
            </div>
          </Photo>
        </div>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, borderRadius:16, padding:"12px 16px", marginBottom:18 }}>
          <div><Label color={C.inkFaint}>Сколько дней</Label><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, marginTop:2 }}>{days} {days===1?"день":days<5?"дня":"дней"}</div></div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <button onClick={()=>setDays(d=>Math.max(1,d-1))} aria-label="меньше" style={{ width:38, height:38, borderRadius:99, border:`1px solid ${C.line}`, background:"#fff", cursor:"pointer", fontSize:22, color:C.ink, lineHeight:1 }}>−</button>
            <button onClick={()=>setDays(d=>Math.min(14,d+1))} aria-label="больше" style={{ width:38, height:38, borderRadius:99, border:"none", background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, cursor:"pointer", fontSize:22, color:C.ink, lineHeight:1 }}>+</button>
          </div>
        </div>

        {(aiBusy || about || history) && (
          <div style={{ marginBottom:18, borderRadius:16, overflow:"hidden", border:`1px solid ${C.line}`, background:`radial-gradient(circle at 18% 0%, ${ch.partner}22, transparent 70%)` }}>
            <div style={{ padding:"14px 16px" }}>
              <Label color={C.inkFaint}>{aiBusy && !about ? "Собираю маршрут" : "О городе"}</Label>
              {aiBusy && !about ? (
                <Loader partner={ch.partner} text="собираю маршрут по городу"/>
              ) : (
                <>
                  {about && <p style={{ fontSize:14, lineHeight:1.55, color:C.ink, margin:"8px 0 0" }}>{about}</p>}
                  {history && <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"8px 0 0" }}>{history}</p>}
                </>
              )}
            </div>
          </div>
        )}

        <Label>Маршрут по дням</Label>
        {waitingAI ? <Loader partner={ch.partner} text="подбираю точные места по городу"/> : (
        <div style={{ margin:"10px 0 20px" }}>
          {itinerary.map((d,di)=>(
            <div key={di} style={{ marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:8 }}>
                <span style={{ fontFamily:head, fontSize:11, letterSpacing:"0.12em", color:ch.partner }}>ДЕНЬ {di+1}</span>
                <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.ink }}>{d.th}</span>
              </div>
              {d.acts.map((st,i)=>(
                <div key={i} style={{ display:"flex", gap:11, marginBottom:8 }}>
                  <div style={{ width:6, height:6, borderRadius:99, background:ch.partner, flexShrink:0, marginTop:8 }}/>
                  <p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:0 }}>{st}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        )}

        <Label>Что взять — на {days} {days===1?"день":days<5?"дня":"дней"}</Label>
        <div style={{ margin:"10px 0 20px", background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}`, borderRadius:16, padding:"14px 16px" }}>
          {pl.map((it,i)=>(
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:i<pl.length-1?9:0 }}>
              <span style={{ color:ch.partner, marginTop:1, flexShrink:0 }}>✦</span>
              <span style={{ fontSize:13.5, lineHeight:1.4, color:C.ink }}>{it}</span>
            </div>
          ))}
        </div>

        <Label>Куда сходить — под эстетику</Label>
        {waitingAI ? <div style={{ margin:"10px 0 22px" }}><Loader partner={ch.partner} text="ищу места с названиями"/></div> : (
        <div style={{ margin:"10px 0 22px" }}>
          {spots.map((sp,i)=>(
            <a key={i} href={`https://yandex.ru/maps/?text=${encodeURIComponent(sp[1])}`} target="_blank" rel="noreferrer" style={{ textDecoration:"none", display:"flex", gap:11, alignItems:"center", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", borderRadius:14, padding:"9px 12px 9px 9px", marginBottom:9 }}>
              <div style={{ width:54, height:54, borderRadius:11, overflow:"hidden", flexShrink:0 }}><Photo t={(sel.t??0)+i} url={cityStock(sp[0])} h={54} radius={0}/></div>
              <span style={{ fontSize:13.5, lineHeight:1.35, color:C.ink, flex:1 }}>{sp[0]}</span>
              <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontFamily:head, fontSize:9.5, letterSpacing:"0.06em", color:ch.partner, flexShrink:0 }}><MapPin size={12} strokeWidth={2}/>КАРТА</span>
            </a>
          ))}
        </div>
        )}

        <Label>Где остановиться</Label>
        <p style={{ fontSize:14, lineHeight:1.6, color:C.ink, margin:"10px 0 10px" }}>{stay}</p>
        <div style={{ background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}`, borderRadius:16, padding:"14px 16px", marginBottom:10 }}>
          <Label color={C.inkFaint}>Под твою эстетику</Label>
          {hotels.map((h,i)=>(
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginTop:9 }}>
              <span style={{ color:ch.partner, marginTop:1 }}>✦</span><span style={{ fontSize:13.5, lineHeight:1.4, color:C.ink }}>{h}</span>
            </div>
          ))}
        </div>
        <LinkBtn label="Снять квартиру под эстетику" url={rentUrl}/>
      </OverlayShell>
    );
  }
  // list view
  return (
    <OverlayShell partner={ch.partner} label="ПУТЕШЕСТВИЯ · PLUS" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={60}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Куда ты едешь?</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 16px" }}>Напиши любой город — соберу маршрут, список вещей и где остановиться под эстетику {ch.aes}.</p>

      <div style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.85)", border:`1px solid ${C.line}`, borderRadius:99, padding:"4px 8px 4px 16px", marginBottom:10 }}>
        <Search size={17} strokeWidth={1.7} color={C.inkSoft}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Например: Ницца, Рим, Тбилиси…" style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:14, fontFamily:body, color:C.ink, padding:"8px 0" }}/>
        {q && <button onClick={()=>setQ("")} aria-label="Очистить" style={{ border:"none", background:"rgba(26,26,26,0.06)", borderRadius:99, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.inkSoft, flexShrink:0 }}><X size={15} strokeWidth={2}/></button>}
      </div>

      {ql && (
        <div style={{ marginBottom:18 }}>
          {knownMatch.map((d,i)=>(
            <button key={"k"+i} onClick={()=>pick3(d)} className="fade" style={{ width:"100%", textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"10px 12px", cursor:"pointer", marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:48, height:48, flexShrink:0 }}><Photo t={d.t||1} url={cityStock(d.name)} h={48} radius={10}/></div>
              <span style={{ flex:1, fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.ink }}>{d.name}</span><ArrowRight size={17} strokeWidth={1.6} color={C.inkFaint}/>
            </button>
          ))}
          {extraMatch.map((c,i)=>(
            <button key={"e"+i} onClick={()=>pick3({ name:c, custom:true, t:1 })} className="fade" style={{ width:"100%", textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.7)", borderRadius:14, padding:"10px 12px", cursor:"pointer", marginBottom:8, display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:48, height:48, flexShrink:0 }}><Photo t={1} url={cityStock(c)} h={48} radius={10}/></div>
              <span style={{ flex:1, fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.ink }}>{c}</span><ArrowRight size={17} strokeWidth={1.6} color={C.inkFaint}/>
            </button>
          ))}
          {knownMatch.length===0 && (
            <button onClick={()=>pick3({ name:q.trim(), custom:true, t:1 })} style={{ width:"100%", textAlign:"left", border:"none", background:`radial-gradient(circle at 12% 50%, ${C.butter}, rgba(255,255,255,0.7) 60%)`, borderRadius:14, padding:"13px 15px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.ink }}>Собрать поездку в «{q.trim()}» ✦</span><ArrowRight size={17} strokeWidth={1.6} color={C.ink}/>
            </button>
          )}
        </div>
      )}

      {!ql && <>
        <Label color={C.inkFaint}>Под твою эстетику</Label>
        <div style={{ marginTop:12 }}>
        {travelFor(ch.id).map((d,i)=>(
          <button key={i} onClick={()=>pick3(d)} className="fade" style={{ width:"100%", textAlign:"left", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", borderRadius:18, overflow:"hidden", cursor:"pointer", padding:0, marginBottom:14 }}>
            <Photo t={d.t} url={cityStock(d.name)} h={140} radius={0}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 45%, rgba(26,26,26,0.45) 100%)" }}/>
              <div style={{ position:"absolute", left:14, bottom:12, right:14, display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.14em", color:"rgba(255,255,255,0.9)", textTransform:"uppercase" }}>{d.tag}</div>
                  <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:20, color:"#fff", lineHeight:1.1, textShadow:"0 1px 8px rgba(26,26,26,0.5)" }}>{d.name}</div>
                </div>
                <div style={{ textAlign:"center" }}><ScoreRing score={d.score} partner={C.cream}/><div style={{ fontFamily:head, fontSize:8, letterSpacing:"0.08em", color:"rgba(255,255,255,0.85)", marginTop:1 }}>GLOW MATCH</div></div>
              </div>
            </Photo>
          </button>
        ))}
        </div>
      </>}
    </OverlayShell>
  );
}

// ── STYLIST (Plus) ────────────────────────────────────────────────
function StylistView({ ch, profile, wardrobe, setWardrobe, onClose }) {
  const SC = stylistFor(ch.id);
  const CAPSULE = SC.capsule;
  const [have, setHave] = useState(SC.have);
  const [val, setVal] = useState("");
  const missing = CAPSULE.filter(c=>!have.includes(c));
  const looks = SC.looks;
  const add = () => { const v = val.trim(); if (v && !have.includes(v)) setHave(h=>[...h,v]); setVal(""); };
  const wRef = useRef(null);
  const [aiLooks, setAiLooks] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const onWardrobeFiles = (e) => {
    const fs = Array.from(e.target.files||[]);
    fs.forEach(f=>{ shrinkImage(f,1024,0.82).then(url=>setWardrobe(prev=>[...prev,{ id:Date.now()+Math.random(), photo:url }])).catch(()=>{}); });
  };
  const buildLooks = async () => {
    if (!wardrobe.length || aiBusy) return;
    setAiBusy(true); setAiLooks("");
    try {
      const imgs = wardrobe.slice(0,10).map(w=>{ const m=(w.photo.match(/^data:(.*?);base64,/)||[])[1]||"image/jpeg"; return { type:"image", source:{ type:"base64", media_type:m, data:w.photo.split(",")[1] } }; });
      for(let _i=0;_i<imgs.length;_i++){ imgs[_i]=await sgShrinkBlock(imgs[_i]); }
      const sys = `Ты — личный стилист Slow Glow в эстетике ${ch.aes}. Тебе показывают фото вещей из гардероба женщины. Собери из ИМЕННО этих вещей 2–3 готовых образа (лука) под её эстетику. Для каждого: название образа, что с чем надеть из показанного, повод, и один совет по аксессуарам или обуви, чтобы дополнить. Если чего-то не хватает — мягко предложи одну вещь докупить. Тёплый живой русский, без markdown и звёздочек.`;
      const r = await fetch(AI_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1100, system:sys, messages:[{ role:"user", content:[...imgs, { type:"text", text:"Собери образы из этих вещей под мою эстетику. Не называй бренды и марки — описывай вещи по типу, цвету и материалу; на тренды ссылаться можно, без имён брендов." }] }] }) });
      const data = await r.json();
      const txt = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").trim();
      setAiLooks(stripMd(txt) || "Не получилось собрать образ — попробуй ещё раз или добавь больше вещей.");
    } catch (e) { setAiLooks("Не получилось собрать образ — попробуй ещё раз."); }
    setAiBusy(false);
  };
  return (
    <OverlayShell partner={ch.partner} label="ЛИЧНЫЙ СТИЛИСТ · PLUS" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={60}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Твой гардероб под {ch.aes}</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 20px" }}>Сфотографируй свои вещи — и я соберу из них образы. Или отметь, что есть, текстом ниже.</p>

      <Label>Мой гардероб — по фото</Label>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 10px" }}>Загрузи фото своих вещей — стилист соберёт из них луки.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8, marginBottom:12 }}>
        {wardrobe.map(w=>(
          <div key={w.id} style={{ position:"relative", borderRadius:12, overflow:"hidden", aspectRatio:"3/4", border:`1px solid ${C.line}` }}>
            <img src={w.photo} alt="вещь" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
            <button onClick={()=>setWardrobe(prev=>prev.filter(x=>x.id!==w.id))} style={{ position:"absolute", top:4, right:4, width:22, height:22, borderRadius:99, border:"none", background:"rgba(250,248,241,0.92)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:C.ink }}><X size={13} strokeWidth={2.2}/></button>
          </div>
        ))}
        <button onClick={()=>wRef.current&&wRef.current.click()} style={{ aspectRatio:"3/4", borderRadius:12, border:`1px dashed ${C.line}`, background:"rgba(255,255,255,0.5)", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4, color:C.inkSoft }}><Plus size={20} strokeWidth={1.7}/><span style={{ fontSize:10, fontFamily:body }}>фото</span></button>
      </div>
      <input ref={wRef} type="file" accept="image/*" multiple onChange={onWardrobeFiles} style={{ display:"none" }}/>
      <button onClick={buildLooks} disabled={!wardrobe.length||aiBusy} style={{ width:"100%", height:50, borderRadius:99, border:"none", cursor:wardrobe.length&&!aiBusy?"pointer":"default", opacity:wardrobe.length&&!aiBusy?1:0.5, background:C.ink, color:C.cream, fontFamily:head, fontSize:14.5, fontWeight:500, marginBottom:aiLooks?12:22, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>{aiBusy?"Собираю образы…":"Собрать образы из моих вещей"} {!aiBusy && <span style={{ color:ch.partner }}>✦</span>}</button>
      {aiLooks && <div style={{ borderRadius:16, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", padding:"15px 16px", marginBottom:22 }}><Label color={C.inkFaint}>Твои образы</Label><p style={{ fontSize:14, lineHeight:1.65, color:C.ink, margin:"8px 0 0", whiteSpace:"pre-line" }}>{aiLooks}</p></div>}

      <Label>Мой гардероб — списком</Label>
      <div style={{ display:"flex", flexWrap:"wrap", gap:7, margin:"10px 0 10px" }}>
        {have.map(c=>(
          <button key={c} onClick={()=>setHave(h=>h.filter(x=>x!==c))} style={{ display:"inline-flex", alignItems:"center", gap:6, border:"none", background:C.sage, borderRadius:99, padding:"7px 12px", cursor:"pointer", fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:C.ink }}>{c} <X size={13} strokeWidth={2}/></button>
        ))}
        {have.length===0 && <span style={{ fontSize:13, color:C.inkFaint }}>Пока пусто — добавь вещи ниже.</span>}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.85)", border:`1px solid ${C.line}`, borderRadius:99, padding:"4px 6px 4px 16px", marginBottom:22 }}>
        <input value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&add()} placeholder="Добавить свою вещь…" style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:14, fontFamily:body, color:C.ink, padding:"8px 0" }}/>
        <button onClick={add} style={{ border:"none", background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, borderRadius:99, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.ink, flexShrink:0 }}><Plus size={17} strokeWidth={2}/></button>
      </div>

      <Label>Капсула под твою эстетику</Label>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 10px" }}>База капсулы, которой не хватает. Нажми — переедет в гардероб.</p>
      <div style={{ marginBottom:22 }}>
        {missing.length===0 && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkSoft }}>Капсула собрана — у тебя есть всё базовое ✦</p>}
        {missing.map(c=>(
          <button key={c} onClick={()=>setHave(h=>[...h,c])} style={{ width:"100%", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", borderRadius:14, padding:"12px 14px", cursor:"pointer", marginBottom:8 }}>
            <span style={{ fontSize:14, color:C.ink }}>{c}</span>
            <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:10, letterSpacing:"0.08em", color:ch.partner }}><Plus size={13} strokeWidth={2.4}/>В ГАРДЕРОБ</span>
          </button>
        ))}
      </div>

      <Label>Идеи для образов</Label>
      <p style={{ fontSize:12.5, color:C.inkFaint, margin:"4px 0 12px" }}>Готовые аутфиты под {ch.aes} — листай вбок ✦</p>
      <div className="sg-scroll" style={{ display:"flex", gap:12, overflowX:"auto", margin:"0 -22px 8px", padding:"0 22px 6px", scrollSnapType:"x mandatory" }}>
        {looks.map((lk,i)=>{ const got=lk.items.filter(it=>have.includes(it)).length; return (
          <div key={i} style={{ flex:"0 0 auto", width:212, scrollSnapAlign:"start", borderRadius:20, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}` }}>
            <div style={{ position:"relative" }}>
              <Photo url={SC.lookImgs[i % SC.lookImgs.length]} t={[3,1,2,0,4,5][i%6]} h={290} radius={0}/>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 55%, rgba(26,26,26,0.5) 100%)" }}/>
              <div style={{ position:"absolute", left:14, right:14, bottom:12 }}>
                <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, color:"#fff", lineHeight:1.1, textShadow:"0 1px 8px rgba(26,26,26,0.5)" }}>{lk.n}</div>
                <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.08em", color:"rgba(255,255,255,0.92)", marginTop:4 }}>{lk.items.length} ВЕЩИ · ✓ {got} ЕСТЬ</div>
              </div>
            </div>
          </div>
        ); })}
      </div>
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkFaint, textAlign:"center", margin:"10px 0 0" }}>Образы под твою эстетику ✦</p>
    </OverlayShell>
  );
}

// ── PHOTO SCAN (Plus) — разбор места по фото ──────────────────────
function PlaceFinderView({ ch, setDetail, onClose }) {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const city = ch.city || "Москве";
  const chips = ["кофе на террасе с лимонами","тихое место для чтения","пикник в парке","вечер с бокалом вина","медленный завтрак","купить себе цветы"];
  const rich = (txt) => {
    const clean = String(txt).replace(/\*\*/g, "").replace(/^[\-\*]\s+/gm, "");
    const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;
    const out = []; let last = 0, m, k = 0;
    while ((m = re.exec(clean))) {
      if (m.index > last) out.push(clean.slice(last, m.index));
      const url = m[2] || m[3];
      out.push(<a key={k++} href={url} target="_blank" rel="noreferrer" style={{ color:ch.partner, textDecoration:"underline" }}>{m[1] || "на карте"}</a>);
      last = re.lastIndex;
    }
    if (last < clean.length) out.push(clean.slice(last));
    return out;
  };
  const placeArt = (seed, i) => {
    const t = String(seed).toLowerCase();
    let icon = "pin";
    if (/парк|сад|сквер|лужай|зелен|ботан/.test(t)) icon="leaf";
    else if (/кофе|кофейн|спешелти|веранд|завтрак|бранч|кафе/.test(t)) icon="cup";
    else if (/вин|бокал|\bбар|энотек/.test(t)) icon="glass";
    else if (/музе|галер|\bарт|выставк|искусств/.test(t)) icon="frame";
    else if (/смотров|закат|панорам|крыш|\bвид/.test(t)) icon="sun";
    else if (/набереж|\bвод|море|пляж|озер|пруд/.test(t)) icon="map";
    else if (/книж|чита|книг/.test(t)) icon="book";
    const PIN = "<path d='M60 25 C50 25 43 32 43 42 C43 55 60 65 60 65 C60 65 77 55 77 42 C77 32 70 25 60 25 Z'/><circle cx='60' cy='42' r='6.5'/>";
    const MAP = "<path d='M46 36 L54 33 L66 36 L74 33 L74 56 L66 59 L54 56 L46 59 Z'/><line x1='54' y1='33' x2='54' y2='56'/><line x1='66' y1='36' x2='66' y2='59'/>";
    const lib = { pin:PIN, map:MAP, leaf:MIND_ICN.leaf, cup:MIND_ICN.cup, glass:MIND_ICN.glass, frame:MIND_ICN.frame, sun:MIND_ICN.sun, book:MIND_ICN.book };
    const g = MIND_GRAD[i % 6];
    const ic = lib[icon] || PIN;
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='"+g[0]+"'/><stop offset='1' stop-color='"+g[1]+"'/></linearGradient></defs><rect width='120' height='90' fill='url(#g)'/><circle cx='60' cy='45' r='29' fill='#FFFFFF' opacity='0.18'/><g fill='none' stroke='#FFFFFF' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' opacity='0.95'>"+ic+"</g></svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  };
  const parsePlaces = (txt) => {
    const clean = String(txt).replace(/\*\*/g,"").replace(/^[\-\*\u2022]\s+/gm,"").trim();
    const blocks = clean.split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean);
    let intro = ""; const places = [];
    blocks.forEach(b=>{
      const urlM = b.match(/(https?:\/\/[^\s)]+)/);
      const url = urlM ? urlM[0] : null;
      let body = b.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,"$1").replace(/\(?https?:\/\/[^\s)]+\)?/g,"").trim();
      if (!url && !places.length && body){ intro = body.replace(/\n/g," "); return; }
      const lines = body.split("\n").map(x=>x.trim()).filter(Boolean);
      const head0 = lines[0] || ""; const rest = lines.slice(1).join(" ");
      let name = head0, why = "";
      const d = head0.search(/\s[\u2014\u2013-]\s/);
      if (d>-1){ name = head0.slice(0,d).trim(); why = head0.slice(d).replace(/^\s*[\u2014\u2013-]\s*/,"").trim(); }
      if (rest) why = (why? why+" ":"")+rest;
      name = name.replace(/^[\u00ab\u00bb"']+|[\u00ab\u00bb"']+$/g,"").trim();
      why = why.replace(/\s*\.\s*$/,"");
      if (name) places.push({ name, why, url });
    });
    return { intro, places };
  };
  const fallback = (text) => {
    const ql = String(text).toLowerCase().replace(/ё/g,"е");
    const has = (...ws) => ws.some(w=>ql.includes(w));
    const yl = name => `https://yandex.ru/maps/?text=${encodeURIComponent(name+" "+city)}`;
    let picks, intro = `Под «${text}» в ${city} тебе подойдёт:`;
    if (has("пикник","на траве","плед","парк","сквер","лужай"))
      picks = [["Большой парк с лужайками","тень, газон, тихо до полудня — бери плед и термос","парки "+city],["Ботанический сад","зелень и дорожки, спокойно и красиво","ботанический сад "+city],["Набережная с газоном","вид на воду, можно расстелить плед на закат","набережная "+city]];
    else if (has("чита","книг","почитать","книж"))
      picks = [["Тихий зелёный дворик","тень и медленный ритм, почти нет людей","тихий двор кафе "+city],["Кофейня с большими окнами","свет и тишина до 11 — идеально для книги","спешелти кофейня "+city],["Независимый книжный с кофе","книги и уголок для чтения","книжный магазин кофе "+city]];
    else if (has("вино","бокал","вечер","винотек"))
      picks = [["Винный бар с местным вином","тёплый свет, негромко, бокалы по списку","винный бар "+city],["Энотека у площади","авторская подача и сомелье","энотека "+city],["Бар на крыше","вино и вид на закат","бар на крыше "+city]];
    else if (has("цвет","букет"))
      picks = [["Цветочный с полевыми букетами","сезонное, без пафоса и наценок","цветочный магазин "+city],["Рынок с фермерскими цветами","живые охапки под настроение","цветочный рынок "+city]];
    else if (has("обед","поесть","ресторан","ужин","завтрак","еда","бранч"))
      picks = [["Локальная траттория","сезонные продукты, по-домашнему","траттория "+city],["Бистро с сезонным меню","негромко, честная кухня","бистро "+city],["Кафе с верандой для завтрака","свет и медленное утро","кафе веранда завтрак "+city]];
    else if (has("вид","закат","смотров","панорам"))
      picks = [["Смотровая площадка","город на ладони, лучше на закат","смотровая площадка "+city],["Бар или кафе на крыше","тёплый свет и панорама","ресторан на крыше "+city],["Набережная на закат","мягкий свет у воды","набережная "+city]];
    else if (has("выставк","искусств","музе","галер"))
      picks = [["Современная галерея","тихие залы, без толпы","галерея современного искусства "+city],["Арт-пространство","выставки и кофе рядом","арт пространство "+city],["Музей с садом","искусство и зелёный двор","музей "+city]];
    else if (has("кофе","кафе","террас","спешелти"))
      picks = [["Кофейня с террасой и светом","большие окна, тихо до 11","спешелти кофейня терраса "+city],["Авторская обжарка","фильтр и негромкая музыка","спешелти кофе "+city],["Веранда с зеленью","ощущение отпуска в городе","кафе веранда "+city]];
    else if (has("прогул","гуля","воздух","пройти","ходить"))
      picks = [["Старый город пешком","узкие улицы и детали","исторический центр "+city],["Набережная","вода и простор","набережная "+city],["Большой парк","тень и медленный ритм","парк "+city]];
    else
      picks = PLACE_POOL.slice(0,3).map(p=>[p.name, p.why.join(", "), p.name+" "+city]);
    return intro+"\n\n"+picks.map(p=>`${p[0]} — ${p[1]}.\n${yl(p[2])}`).join("\n\n");
  };
  const submit = async (text) => {
    const query = (text ?? q).trim(); if (!query || loading) return;
    setQ(query); setLoading(true); setAnswer("");
    const sys = `Ты — умный и насмотренный консьерж Slow Glow по городу ${city}. На ЛЮБОЙ запрос (кафе, теннисные корты, бассейн, студия, парк, магазин, что угодно) верни ровно 3 РЕАЛЬНЫХ конкретных места с названиями и районом или улицей, точно под запрос, бюджет и эстетику. СТРОГО соблюдай тип места: если просят теннисные корты — только настоящие теннисные корты и клубы (не детские центры, не фитнес без кортов, не другое); если бассейн — только бассейны. Каждое место обязано буквально соответствовать запросу — перепроверь это. Если просят бюджетно — выбирай доступные варианты и прямо упомяни цену/доступность. Для каждого с новой строки: «Название (район или улица) — почему подходит, с заметкой о бюджете» и ссылка вида https://yandex.ru/maps/?text=Название+${city}. Для парков и зелёных зон предлагай только известные, ухоженные и атмосферные парки, сады или набережные (не случайный сквер у дороги и не пустырь); для кофеен и кафе — только эстетичные авторские места в духе Slow Glow (спокойный свет, характер, спешелти), без сетей и фастфуда. Ориентир вкуса и уровня: в Москве это места вроде YCP, DNA, Rebellion, «Пешки», винного бара «Лолита», кинотеатра «Художественный» — авторские, красивые, с характером; в любом другом городе подбирай места ровно такого же духа и планки, никогда не предлагай сетевые, туристические или случайные варианты. Только настоящие места с характером, тёплый живой русский без опечаток, без markdown, звёздочек и маркеров. Никогда не отказывай, не извиняйся и не проси уточнений — всегда давай 3 лучших конкретных варианта.`;
    try {
      const r = await fetch(AI_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, system:sys, messages:[{ role:"user", content:`Хочу: ${query}` }] }) });
      const data = await r.json();
      const txt = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").trim();
      setAnswer(txt || fallback(query));
    } catch (e) { setAnswer(fallback(query)); }
    setLoading(false);
  };
  return (
    <OverlayShell partner={ch.partner} label="ПОДБОР МЕСТА · PLUS" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={60}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Чего тебе сейчас хочется?</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 16px" }}>Опиши настроение — «пикник в парке», «кофе на террасе с лимонами» — подберу реальные места в {city}.</p>

      <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.85)", border:`1px solid ${C.line}`, borderRadius:99, padding:"4px 6px 4px 16px", marginBottom:12 }}>
        <Search size={17} strokeWidth={1.7} color={C.inkSoft}/>
        <input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="Например: пикник в парке…" style={{ flex:1, border:"none", outline:"none", background:"transparent", fontSize:14, fontFamily:body, color:C.ink, padding:"8px 0" }}/>
        <button onClick={()=>submit()} aria-label="Найти" style={{ border:"none", background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, borderRadius:99, width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.ink, flexShrink:0 }}><ArrowRight size={17} strokeWidth={2}/></button>
      </div>

      {!answer && !loading && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {chips.map(c=><button key={c} onClick={()=>submit(c)} style={{ border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", borderRadius:99, padding:"9px 14px", fontSize:13.5, fontFamily:serif, fontStyle:"italic", color:C.ink, cursor:"pointer" }}>{c}</button>)}
        </div>
      )}

      {loading && <Loader partner={ch.partner} text="подбираю места для тебя"/>}

      {answer && !loading && (()=>{ const { intro, places } = parsePlaces(answer); return (
        <div className="fade" style={{ marginTop:8 }}>
          {intro && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15.5, lineHeight:1.5, color:C.ink, margin:"0 0 14px" }}>{intro}</p>}
          {places.map((p,i)=>(
            <div key={i} style={{ display:"flex", gap:13, alignItems:"stretch", background:"rgba(255,255,255,0.62)", border:`1px solid ${C.line}`, borderRadius:18, overflow:"hidden", marginBottom:12, boxShadow:"0 14px 34px -28px rgba(26,26,26,0.45)" }}>
              <div style={{ width:78, flexShrink:0 }}><img src={placeArt(p.name+" "+p.why,i)} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/></div>
              <div style={{ flex:1, padding:"12px 15px 13px 3px", minWidth:0 }}>
                <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.13em", color:ch.partner, marginBottom:3 }}>МЕСТО {String(i+1).padStart(2,"0")}</div>
                <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, lineHeight:1.16, color:C.ink }}>{p.name}</div>
                {p.why && <p style={{ fontSize:12.5, lineHeight:1.5, color:C.inkSoft, margin:"5px 0 9px" }}>{p.why}</p>}
                {p.url && <a href={p.url} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:10.5, letterSpacing:"0.07em", color:ch.partner, textDecoration:"none" }}>НА КАРТЕ <ArrowRight size={13} strokeWidth={2}/></a>}
              </div>
            </div>
          ))}
        </div>
      ); })()}
      {answer && !loading && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:C.inkFaint, textAlign:"center", margin:"12px 0 0" }}>Нажми на ссылку — откроется в Яндекс Картах ✦</p>}
    </OverlayShell>
  );
}

// ── SPORT (обновляется каждый день) ───────────────────────────────
function SportSec({ icon, title, items, num }){
  if(!items || !items.length) return null;
  return (
    <div style={{ margin:"4px 0 14px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:6, fontFamily:head, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:C.inkFaint, margin:"0 0 8px" }}><SGGlyph em={icon} size={13} color={C.inkFaint} sw={2}/>{title}</div>
      {items.map((it,i)=>(
        <div key={i} style={{ display:"flex", gap:9, marginBottom:7 }}>
          <span style={{ flexShrink:0, color:C.inkFaint, fontFamily:head, fontSize:11.5, marginTop:1.5, minWidth:14 }}>{num?(i+1)+".":"·"}</span>
          <span style={{ fontSize:13.5, lineHeight:1.45, color:C.ink }}>{it}</span>
        </div>
      ))}
    </div>
  );
}
function SportView({ ch, setDetail, onClose }) {
  const [sportStatus, setSportStatus] = useState(()=> sgStore.get("sg_sport_status", {}));
  const [openSport, setOpenSport] = useState(false);
  const [picked, setPicked] = useState(()=> sgStore.get("sg_sport_pick", null));
  const pick = (name) => { setPicked(name); sgStore.set("sg_sport_pick", name); setOpenSport(false); };
  const setStatus = (name, st) => setSportStatus(prev => { const next={...prev}; if(next[name]===st) delete next[name]; else next[name]=st; sgStore.set("sg_sport_status", next); return next; });
  const yt = q => "https://www.youtube.com/results?search_query="+encodeURIComponent(q);
  const runSets = [
    ["Лёгкий бег 25–30 минут в спокойном темпе — можешь говорить на бегу.","Заминка шагом 5 минут."],
    ["Интервалы: 1 минута быстро / 2 минуты трусцой — повтори 5 раз.","Разминка и заминка по 5 минут."],
    ["Темповый бег 20 минут на комфортном пульсе.","В конце — 4 лёгких ускорения по 20 секунд."],
    ["Бег + ходьба: 3 минуты бег / 1 минута шаг ×6.","Подходит, если возвращаешься после паузы."],
    ["Долгий медленный бег 35–40 минут — строим выносливость.","Темп, при котором дышишь носом."],
  ];
  const pilSets = [
    ["The Hundred — 100 пульсаций руками, пресс включён.","Roll Up — медленный подъём корпуса из положения лёжа ×6.","Single Leg Stretch — поочерёдно подтягивай колено ×10.","Saw — наклоны к носкам сидя ×6.","Plank 30–40 секунд."],
    ["Bridge — подъём таза лёжа ×12.","Leg Circles — круги ногой лёжа ×8 в каждую сторону.","Swimming — лёжа на животе, мах рук и ног 30 сек.","Side Kick — махи ногой лёжа на боку ×12.","Child's Pose — растяжка 1 минута."],
    ["Roll Like a Ball — перекаты на спине ×8.","Spine Stretch — наклон вперёд сидя ×6.","Teaser (облегчённый) ×6.","Mermaid — боковая растяжка ×4.","Глубокое дыхание 5 циклов."],
    ["Plank ×3 по 30 сек.","Side Plank ×20 сек на сторону.","Bird Dog — рука+нога крест-накрест ×10.","Dead Bug ×10.","Растяжка спины 1 минута."],
    ["Приседания у стены 40 сек.","Подъёмы таза (мост) ×15.","Ножницы лёжа ×20.","Супермен ×12.","Растяжка бёдер 1 минута."],
  ];
  const run = { t:1, v:"Бег", k:"СЕГОДНЯ · КАЖДЫЙ ДЕНЬ", air:true, d:{ k:"Бег · сегодня", lead:"Мягкий бег очищает голову и дарит лёгкость на весь день. Сегодняшний вариант — ниже.", s:[
    { t:"Техника", n:["Корпус прямой, взгляд вперёд, плечи расслаблены.","Приземляйся под центр тяжести, шаг короткий и частый.","Дыши ровно: вдох на 2 шага, выдох на 2."] },
    { t:"Сегодня", b: runSets[seedToday%runSets.length] },
    { t:"Растяжка после", b:["Растяни икры у стены 30 сек.","Квадрицепс — притяни пятку к ягодице.","Заднюю поверхность бедра — наклон к прямой ноге."] },
  ], tip:"Лучшее время — утро или закат, когда нежарко.", links:[["Смотреть технику бега", yt("техника бега для начинающих")]] }};
  const pilates = { t:0, v:"Пилатес", k:"СЕГОДНЯ · КАЖДЫЙ ДЕНЬ", air:false, d:{ k:"Пилатес · комплекс дня", lead:"Пилатес — мягкая сила: ровная спина, крепкий центр, спокойное дыхание. Сегодняшний комплекс на коврике.", s:[
    { t:"Комплекс на сегодня", n: pilSets[seedToday%pilSets.length] },
    { t:"Советы", b:["Двигайся медленно и тянись, не рви.","Держи живот подтянутым, дыши размеренно.","Коврик и 15 минут — этого достаточно."] },
  ], tip:"Делай под спокойную музыку, окна открой.", links:[["Видео-комплекс пилатес", yt("пилатес дома 15 минут для начинающих")]] }};
  const EXTRAS = {
    summer:[
      { t:4, v:"Велосипед", k:"НА ВОЗДУХЕ", air:true, d:{ k:"Велосипед", lead:"Неспешная велопрогулка — кардио без нагрузки на суставы и чистое удовольствие от движения.", s:[{t:"Чем полезно", b:["Бережно для коленей, в отличие от бега.","Тренирует ноги и выносливость.","Поднимает настроение и даёт ощущение свободы."]},{t:"Как сегодня", b:["40–60 минут в спокойном темпе по набережной или парку.","Возьми воду и солнцезащиту."]}], tip:"Выбирай маршрут вдоль воды или зелени.", links:[["Маршруты для велопрогулок", yt("спокойная велопрогулка")]] }},
      { t:2, v:"Прогулка", k:"НА ВОЗДУХЕ", air:true, d:{ k:"Долгая прогулка", lead:"Самый недооценённый «спорт»: 8–10 тысяч шагов меняют и тело, и голову.", s:[{t:"Чем полезно", b:["Снижает стресс и тревогу.","Мягко тренирует сердце.","Помогает мыслям улечься."]},{t:"Как сегодня", b:["45–60 минут без телефона, в удобной обуви.","Идеально — утром на свету."]}], tip:"Слушай подкаст или просто тишину.", links:[["Зачем ходить пешком", yt("польза ходьбы 10000 шагов")]] }},
      { t:3, v:"Йога на солнце", k:"НА ВОЗДУХЕ", air:true, d:{ k:"Мягкая йога", lead:"Утренняя йога у открытого окна или на траве — тянемся к свету.", s:[{t:"Сегодня", b:["Приветствие солнцу ×5 кругов.","Поза кошки-коровы ×8.","Наклон вперёд, скрутки сидя.","Шавасана 3 минуты."]}], tip:"Дыши глубоко, не торопись.", links:[["Йога утром 15 минут", yt("йога утром 15 минут мягкая")]] }},
      { t:5, v:"Плавание", k:"ВОДА", air:false, d:{ k:"Плавание", lead:"Невесомость воды разгружает тело и успокаивает нервную систему.", s:[{t:"Сегодня", b:["20–30 минут в спокойном темпе, чередуй стили.","Не гонись за скоростью — наслаждайся."]}], tip:"После — лёгкая растяжка плеч.", links:[["Техника плавания", yt("техника плавания кроль для начинающих")]] }},
    ],
    romance:[
      { t:3, v:"Барре", k:"ГРАЦИЯ", air:false, d:{ k:"Барре", lead:"Барре — изящная смесь балета, пилатеса и йоги: вытягивает, укрепляет и дарит осанку балерины.", s:[{t:"Сегодня", b:["Плие и релеве у опоры ×12.","Махи ногой назад и в сторону ×10.","Подъёмы на полупальцы ×15.","Растяжка у опоры 2 минуты."]},{t:"Чем полезно", b:["Тонкая проработка мышц без «накачки».","Грация и прямая спина.","Гибкость и баланс."]}], tip:"Опора — спинка стула. Двигайся плавно и тянись.", links:[["Барре дома для начинающих", yt("барре тренировка дома для начинающих")]] }},
      { t:0, v:"Балетная растяжка", k:"ГИБКОСТЬ", air:false, d:{ k:"Балетная растяжка", lead:"Мягкая балетная растяжка вытягивает тело, раскрывает бёдра и формирует красивую линию.", s:[{t:"Сегодня", b:["Складка к ногам сидя ×6.","Бабочка для бёдер 1 минута.","Port de bras — плавные руки ×8.","Вытяжение спины у стены."]}], tip:"Тянись на выдохе, без рывков.", links:[["Балетная растяжка", yt("балетная растяжка для гибкости")]] }},
      { t:5, v:"Мягкая йога", k:"НЕЖНОСТЬ", air:false, d:{ k:"Мягкая йога", lead:"Спокойная йога для нежного тела и ясной головы — идеально под свечи вечером.", s:[{t:"Сегодня", b:["Кошка-корова ×8.","Поза ребёнка 1 минута.","Наклон вперёд стоя.","Шавасана 3 минуты."]}], tip:"Свечи и тихая музыка усилят эффект.", links:[["Мягкая йога вечером", yt("мягкая йога вечером 15 минут")]] }},
      { t:4, v:"Танец дома", k:"РАДОСТЬ", air:false, d:{ k:"Танец", lead:"Потанцуй под любимую музыку — лёгкое кардио и чистая радость без правил.", s:[{t:"Как сегодня", b:["15 минут под романтичный плейлист.","Двигайся как хочется, для себя."]}], tip:"Это считается и за тренировку, и за терапию.", links:[["Танцевальная разминка", yt("танцевальная разминка дома")]] }},
    ],
    coastal:[
      { t:5, v:"Плавание", k:"ВОДА", air:false, d:{ k:"Плавание", lead:"Невесомость воды разгружает тело и успокаивает — главный спорт у моря.", s:[{t:"Сегодня", b:["20–30 минут в спокойном темпе, чередуй стили.","Не гонись за скоростью — наслаждайся."]}], tip:"После — растяжка плеч и спины.", links:[["Техника плавания", yt("техника плавания кроль для начинающих")]] }},
      { t:3, v:"Йога у воды", k:"НА ВОЗДУХЕ", air:true, d:{ k:"Йога у воды", lead:"Йога на берегу или у открытого окна с морским бризом — баланс и спокойствие.", s:[{t:"Сегодня", b:["Приветствие солнцу ×5.","Поза дерева для баланса.","Наклоны и мягкие скрутки.","Шавасана под шум волн."]}], tip:"Босиком на песке — заземляет.", links:[["Йога у моря", yt("йога на пляже для начинающих")]] }},
      { t:1, v:"Сап-сёрфинг", k:"ВОДА", air:true, d:{ k:"SUP", lead:"Сап — баланс, крепкий кор и медитативное скольжение по воде.", s:[{t:"Сегодня", b:["30–40 минут спокойной гребли.","Держи кор включённым, смотри вперёд."]}], tip:"Начни в тихой бухте без волн.", links:[["Сап для начинающих", yt("сап сёрфинг для начинающих")]] }},
      { t:2, v:"Бег по пляжу", k:"НА ВОЗДУХЕ", air:true, d:{ k:"Бег у воды", lead:"Бег по кромке воды мягче для суставов и особенно бодрит на рассвете.", s:[{t:"Сегодня", b:["20–25 минут по влажному песку.","Темп, при котором можешь говорить."]}], tip:"Утро у воды — лучшее время.", links:[["Бег для начинающих", yt("бег для начинающих техника")]] }},
    ],
    slow:[
      { t:2, v:"Лесная прогулка", k:"НА ВОЗДУХЕ", air:true, d:{ k:"Хайкинг", lead:"Долгая прогулка по лесу или холмам — медитация в движении и тишина для головы.", s:[{t:"Сегодня", b:["60–90 минут в спокойном темпе.","Слушай звуки леса, не музыку.","Удобная обувь и вода."]}], tip:"Лес снижает стресс лучше зала.", links:[["Польза прогулок в лесу", yt("польза прогулок в лесу")]] }},
      { t:3, v:"Мягкая йога", k:"ТИШИНА", air:false, d:{ k:"Мягкая йога", lead:"Спокойная восстановительная йога для тела и нервной системы.", s:[{t:"Сегодня", b:["Кошка-корова ×8.","Поза ребёнка и голубя.","Скрутки лёжа.","Шавасана 5 минут."]}], tip:"Тёплый свет и тишина усилят покой.", links:[["Восстановительная йога", yt("восстановительная йога для расслабления")]] }},
      { t:4, v:"Неспешный велосипед", k:"НА ВОЗДУХЕ", air:true, d:{ k:"Велосипед", lead:"Медленная велопрогулка по тихим тропам — движение в удовольствие.", s:[{t:"Сегодня", b:["40–60 минут по парку или лесу.","Без гонки — ради воздуха и вида."]}], tip:"Выбирай зелёный маршрут.", links:[["Спокойная велопрогулка", yt("спокойная велопрогулка")]] }},
      { t:0, v:"Дыхательная практика", k:"ПОКОЙ", air:false, d:{ k:"Дыхание", lead:"Медленное осознанное дыхание — тоже движение: оно успокаивает тело за минуты.", s:[{t:"Сегодня", b:["Дыхание по квадрату: вдох-задержка-выдох-задержка по 4.","5–10 циклов сидя с прямой спиной."]}], tip:"Делай у окна или со свечой.", links:[["Дыхательные практики", yt("дыхательная практика для успокоения")]] }},
    ],
  };
  const extras = EXTRAS[ch.id] || EXTRAS.summer;
  const WEEK = {
    summer:[{d:"ПН",f:"Лёгкий бег 25–30 мин",n:"Спокойный темп, дыши ровно."},{d:"ВТ",f:"Пилатес 20 мин",n:"Центр, спина, дыхание."},{d:"СР",f:"Прогулка 8–10к шагов",n:"Без телефона, на свету."},{d:"ЧТ",f:"Йога на солнце 20 мин",n:"Тянемся к свету у окна."},{d:"ПТ",f:"Интервалы 20 мин",n:"1 мин быстро / 2 трусцой ×5."},{d:"СБ",f:"Плавание или велосипед",n:"40 мин в удовольствие."},{d:"ВС",f:"Отдых + растяжка 15 мин",n:"Восстановление — часть плана."}],
    romance:[{d:"ПН",f:"Барре 20 мин",n:"Изящная сила и осанка."},{d:"ВТ",f:"Мягкая йога 20 мин",n:"Под спокойную музыку."},{d:"СР",f:"Прогулка 8к шагов",n:"Не спеша, для себя."},{d:"ЧТ",f:"Балетная растяжка 15 мин",n:"Гибкость и красивая линия."},{d:"ПТ",f:"Барре 20 мин",n:"Плие, релеве, полупальцы."},{d:"СБ",f:"Танец дома 15 мин",n:"Радость и лёгкое кардио."},{d:"ВС",f:"Отдых + дыхание",n:"Тишина и нежность к себе."}],
    coastal:[{d:"ПН",f:"Плавание 25–30 мин",n:"Чередуй стили, без гонки."},{d:"ВТ",f:"Йога у воды 20 мин",n:"Баланс и спокойствие."},{d:"СР",f:"Бег по пляжу 20 мин",n:"По влажному песку утром."},{d:"ЧТ",f:"Сап-сёрфинг 40 мин",n:"Кор и медитативное скольжение."},{d:"ПТ",f:"Плавание 30 мин",n:"Длинные спокойные серии."},{d:"СБ",f:"Прогулка у воды",n:"Долгая, ради простора."},{d:"ВС",f:"Отдых + растяжка",n:"Плечи, спина, дыхание."}],
    slow:[{d:"ПН",f:"Лесная прогулка 60 мин",n:"Медитация в движении."},{d:"ВТ",f:"Мягкая йога 20 мин",n:"Восстановительная, тёплый свет."},{d:"СР",f:"Неспешный велосипед",n:"40–60 мин по зелени."},{d:"ЧТ",f:"Растяжка 20 мин",n:"Спокойно, без рывков."},{d:"ПТ",f:"Прогулка + дыхание",n:"Шаги и дыхание по квадрату."},{d:"СБ",f:"Йога или плавание",n:"Что просит тело."},{d:"ВС",f:"Полный отдых",n:"Тишина — тоже практика."}],
  };
  const week = WEEK[ch.id] || WEEK.summer;
  const COACH = ["Регулярность важнее интенсивности: три спокойные тренировки в неделю лучше шести через силу.","Прогресс рождается в дни отдыха — не пропускай восстановление.","Слушай тело: лёгкая усталость — норма, резкая боль — стоп.","Сон и вода влияют на форму сильнее любой добавки.","Разминка в 5 минут экономит недели восстановления.","Сравнивай себя только с собой вчерашней, а не с лентой.","Маленькая тренировка, которую ты сделала, лучше идеальной, которую отложила."];
  const coach = COACH[seedToday % COACH.length];
  const extraToday = [extras[seedToday%extras.length], extras[(seedToday+2)%extras.length]];
  const today = [run, pilates, ...extraToday];

  const POPULAR = [
    { t:1, v:"Теннис", k:"РАКЕТКА · КОРТ", air:true, url:IMG.tennisServe, heroUrl:IMG.tennisPlay, d:{ k:"Теннис · с нуля", lead:"Теннис учит концентрации и работает на всё тело. Главное на старте — не сила, а точность и работа ног.", s:[
      { t:"Техника · стойка и хват", n:["Восточный хват для форхенда (как «рукопожатие» с ракеткой), континентальный — для подачи и игры с лёта.","Ноги на ширине плеч, вес на носках, колени мягкие — ты в постоянной готовности двигаться.","После каждого удара возвращайся в центр задней линии — это половина успеха."] },
      { t:"Базовые удары", b:["Форхенд: разворот плеч, удар по мячу перед собой, проводка ракетки вверх-вперёд через плечо.","Бэкхенд двумя руками — стабильнее и проще для новичка, чем одной.","Подача: ровный подброс чуть перед собой, рука хлёстко выпрямляется вверх к мячу."] },
      { t:"Тренировка на сегодня", n:["Разминка 5 минут: лёгкий бег на месте, вращения плеч и кистей.","Удары о стенку: 30 форхендов и 30 бэкхендов — следи за точностью, а не силой.","10 подач на точность в один и тот же квадрат.","Игра с лёта у сетки: 20 коротких контролируемых ударов."] },
      { t:"Частые ошибки", b:["Бьёшь одной рукой вместо разворота корпуса — теряешь и силу, и контроль.","Стоишь на пятках — опаздываешь к мячу.","Слишком широкий замах: короче и раньше — значит точнее."] },
      { t:"Лайфхаки", b:["Смотри на мяч до самого момента удара, а не на соперника.","Делай выдох на ударе — рука расслабляется, удар чище.","Хорошие кроссовки для корта важнее дорогой ракетки.","Корт-тайм в будни утром заметно дешевле — начни со стенки или группы."] },
    ], tip:"Бери ракетку со средним балансом и мягкими струнами — бережнее для локтя.", links:[["Теннис с нуля: форхенд", yt("теннис для начинающих техника форхенд")],["Подача в теннисе", yt("теннисная подача для начинающих")]] }},
    { t:3, v:"Падел", k:"РАКЕТКА · В ПАРЕ", air:true, url:IMG.padelClub, heroUrl:IMG.padelPlay, d:{ k:"Падел · с нуля", lead:"Падел — самый быстрорастущий спорт в мире: микс тенниса и сквоша на маленьком корте со стеклянными стенами, всегда в паре. Лёгкий вход и много радости.", s:[
      { t:"Техника · основа", n:["Хват континентальный, как держишь молоток; ракетка цельная, без струн, с дырочками.","Колени согнуты, центр тяжести низкий, двигайся мелкими частыми шагами.","Играй просто: твоя задача — вернуть мяч и дать сопернику ошибиться."] },
      { t:"Как работают стены", b:["Мяч можно брать после отскока от своей задней стеклянной стены — дай ему отскочить и спокойно верни.","Не убегай от стены: отступи на шаг и поймай удобный отскок.","Стекло — твой союзник, оно даёт лишнюю секунду на удар."] },
      { t:"Тренировка на сегодня", n:["Разминка 5 минут + кисти и плечи.","Возвраты после отскока от задней стены: 20 спокойных мячей.","Удары с лёта у сетки в паре: 20 коротких контролируемых.","Bandeja — фирменный удар сверху на отходе назад: 10 раз на технику."] },
      { t:"Частые ошибки", b:["Бьёшь со всей силы — мяч улетает; в паделе решает контроль.","Бьёшь сразу, игнорируя стены — дай мячу отскочить.","В паре стоите далеко друг от друга — двигайтесь синхронно, как один."] },
      { t:"Лайфхаки", b:["Найди партнёра близкого уровня — падел прежде всего про общение и удовольствие.","Будни днём — корты дешевле и свободнее.","Нескользящие кроссовки и очки от солнца — обязательны.","90% очков выигрывается терпением, а не силой."] },
    ], tip:"Сначала арендуй ракетку в клубе — поймёшь, какой вес тебе удобен, прежде чем покупать.", links:[["Падел для начинающих", yt("падел для начинающих правила техника")],["Удар bandeja", yt("padel bandeja для начинающих")]] }},
    { t:4, v:"Сквош", k:"РАКЕТКА · ЗАЛ", air:false, d:{ k:"Сквош · с нуля", lead:"Сквош — взрывное кардио в четырёх стенах: за час сжигается больше, чем за бег. Идеальный спорт, когда времени мало, а выложиться хочется.", s:[
      { t:"Техника · основа", n:["Центр корта — Т-зона: после каждого удара возвращайся туда.","Ракетку держи поднятой, колени согнуты, будь готова к рывку в любой угол.","Бей по мячу сбоку от себя, с проводкой, а не перед грудью."] },
      { t:"Базовые удары", b:["Straight drive — вдоль боковой стены в задний угол: основа всей игры.","Boast — удар в боковую стену под углом, мяч уходит по диагонали.","Drop — мягкий укороченный мяч у передней стены."] },
      { t:"Тренировка на сегодня", n:["Разминка 5–7 минут, обязательно голеностоп и колени — много рывков.","Соло-драйвы вдоль стены: 30 справа, 30 слева.","Работа ног: спринт в угол и возврат в Т-зону ×10.","Игровые розыгрыши до 11 очков."] },
      { t:"Частые ошибки", b:["Залипаешь у задней стены — теряешь центр и инициативу.","Слишком широкий замах: в тесном корте нужна компактность.","Пропускаешь разминку голеностопа — главная причина травм новичков."] },
      { t:"Лайфхаки", b:["Защитные очки обязательны — мяч и ракетки летают очень быстро.","Подошва без чёрных следов — требование большинства кортов.","2–3 занятия с тренером в начале окупятся: замах важно поставить сразу.","Пей воду — нагрузка серьёзная, легко перегреться."] },
    ], tip:"Мячи различают по точкам: две жёлтые — для опытных, синяя или красная — для старта (дольше отскок).", links:[["Сквош для начинающих", yt("сквош для начинающих техника")],["Работа ног в сквоше", yt("сквош работа ног т-зона")]] }},
    { t:0, v:"Барре", k:"ГРАЦИЯ · ОСАНКА", air:false, d:{ k:"Барре · комплекс", lead:"Барре — изящная смесь балета, пилатеса и йоги у опоры: маленькие пульсирующие движения, которые мягко лепят тело и дарят осанку балерины.", s:[
      { t:"Техника · основа", n:["Опора — спинка стула или столешница: держись легко, для баланса, не повисай на ней.","Тяни макушку вверх, плечи опусти, живот мягко подтянут — это «балетная ось».","Движения маленькие и пульсирующие (1–2 см); мышца мягко горит — это нормально."] },
      { t:"Комплекс на сегодня", n:["Разминка: плие и релеве у опоры ×12.","Бёдра: махи ногой назад и в сторону ×15 на каждую.","Стопы и икры: подъёмы на полупальцы ×20, затем пульс ×15.","Пресс: «сотня» лёжа ×100 счётов.","Ягодицы: пульс прямой ногой назад у опоры ×20.","Растяжка у опоры 2–3 минуты."] },
      { t:"Чем полезно", b:["Тонкая проработка глубоких мышц без «накачки» объёма.","Прямая спина и красивая линия рук и ног.","Гибкость, баланс и контроль над телом."] },
      { t:"Частые ошибки", b:["Повисаешь на опоре — теряется весь смысл; держи свой центр.","Делаешь движения большими — в барре сила именно в маленькой амплитуде.","Задерживаешь дыхание; дыши ровно, особенно на пульсирующих повторах."] },
      { t:"Лайфхаки", b:["Носки с протектором или босиком — чтобы не скользить.","У зеркала и под спокойную музыку — легче следить за осанкой.","15–20 минут через день дают видимый результат за пару недель."] },
    ], tip:"Опора — спинка стула; тянись вверх, а не вниз, и двигайся плавно.", links:[["Барре дома для начинающих", yt("барре тренировка дома для начинающих")],["Барре для осанки", yt("барре упражнения осанка")]] }},
  ];
  // ── ТОП-30 видов спорта · вдохновение, а не дисциплина ──
  const SP = (s)=>"https://music.yandex.ru/search?text="+encodeURIComponent(s);
  const SPORTS30 = [
    { v:"Теннис", e:"🎾", cat:"Корт", insp:"Шахматы на бегу: здесь решает не сила, а точность и характер.", event:"Сейчас — травяной сезон: на легендарных кортах Уимблдона играют в безупречно белом.", facts:["Уимблдон — единственный «Большой шлем» на траве и с дресс-кодом в белом.","Подача профи разгоняется за 200 км/ч.","Работа ног решает до 70% удара — корт «выигрывают» ногами."], watch:["Классику Федерер — Надаль","Финалы Уимблдона"], improve:["Сними свою подачу на телефон — увидишь замах со стороны.","30 ударов о стенку в день ставят технику быстрее редких тренировок.","После каждого удара возвращайся в центр задней линии."], gear:["Ракетка по руке: баланс «в голову» — для силы, «в ручку» — для контроля.","Нескользящие кроссовки под покрытие.","Виброгаситель и запасные струны."], look:["Белое поло или платье-теннис, плиссе-юбка.","Козырёк и собранные волосы.","Носки с лёгкой компрессией."], plan:["Разминка 5 мин: суставы, бег на месте.","30 форхендов и 30 бэкхендов о стенку.","10 подач на точность в один квадрат.","20 ударов с лёта у сетки."] },
    { v:"Бег", e:"🏃‍♀️", cat:"Кардио", insp:"Самый честный спорт: только ты, дыхание и дорога под рассвет.", facts:["«Эйфория бегуна» — реальный выброс эндорфинов и эндоканнабиноидов.","Медленный долгий бег строит выносливость лучше быстрого.","Правильный шаг — короткий и частый, приземление под центр тяжести."], watch:["Марафон Нью-Йорка","Рекорды Элиуда Кипчоге"], improve:["Беги в темпе, при котором можешь говорить — это база.","Добавляй не больше 10% км в неделю.","Раз в неделю — лёгкие ускорения по 20 сек."], gear:["Кроссовки с правильной амортизацией под твою стопу.","Бесшовная дышащая футболка.","Лёгкие наушники и пояс для телефона."], look:["Леггинсы 7/8 и спортивный топ в тон.","Кепка и тонкие очки на солнце.","Носки без швов."], plan:["Разминка шагом 5 мин.","Бег 25–30 мин в спокойном темпе.","4 лёгких ускорения по 20 сек.","Заминка и растяжка икр и бёдер."] },
    { v:"Пилатес", e:"🧘‍♀️", cat:"Тело", insp:"Тихая сила: ровная спина, крепкий центр и контроль над каждым движением.", facts:["Джозеф Пилатес назвал метод «контрологией».","Сила идёт из центра — мышц кора и таза.","10 осознанных повторов ценнее 50 на автомате."], improve:["Дыши в ритме движения, не задерживай дыхание.","Качество и медленность важнее количества.","Держи живот мягко подтянутым весь комплекс."], gear:["Нескользящий коврик потолще.","Лента-эспандер и мягкий мяч.","Носки с протектором."], look:["Бесшовный комплект в нейтральной палитре.","Топ с поддержкой, лосины с высокой посадкой.","Минимум украшений."], plan:["The Hundred — 100 пульсаций.","Roll Up ×6 медленно.","Bridge ×12.","Plank 30–40 сек.","Растяжка спины 1 мин."] },
    { v:"Йога", e:"🪷", cat:"Тело", insp:"Встреча с собой на коврике: дыхание, баланс и тишина в голове.", facts:["Слову «йога» больше 2000 лет, корень — «союз».","Дыхание (пранаяма) успокаивает нервную систему за минуты.","Регулярная практика заметно повышает гибкость за месяц."], improve:["Не тянись через боль — тянись через дыхание.","Удерживай позы чуть дольше, чем хочется бросить.","Утром — бодрящие связки, вечером — мягкие."], gear:["Коврик с хорошим сцеплением.","Два блока и ремень для растяжки.","Плед для шавасаны."], look:["Мягкий топ и лосины, в которых удобно складываться.","Тёплые носки на финал.","Волосы убраны, ничего не давит."], plan:["Приветствие солнцу ×5.","Поза дерева — баланс по 30 сек.","Кошка-корова ×8.","Голубь для бёдер 1 мин.","Шавасана 4 мин."] },
    { v:"Плавание", e:"🏊‍♀️", cat:"Вода", insp:"Невесомость и тишина под водой — спорт, который разгружает и тело, и мысли.", facts:["Вода даёт нагрузку на всё тело и бережёт суставы.","20 минут плавания заметно снижают уровень стресса.","Кроль — самый эффективный стиль по скорости."], watch:["Олимпийские заплывы","Заплывы на открытой воде"], improve:["Дыши в сторону на каждый 3-й гребок — ровнее держишь корпус.","Тянись рукой вперёд дольше — длиннее гребок.","Считай гребки на бассейн и сокращай их число."], gear:["Очки по форме лица и шапочка.","Слитный купальник для дорожек.","Колобашка и доска для техники."], look:["Спортивный слитный купальник.","Шапочка в тон.","Сланцы и быстросохнущее полотенце."], plan:["Разминка 200 м спокойно.","4×50 м кроль с отдыхом.","2×50 м на ногах с доской.","Заминка 100 м и растяжка плеч."] },
    { v:"Барре", e:"🩰", cat:"Грация", insp:"Балет, пилатес и йога в одном: лепит тело и дарит осанку балерины.", facts:["Метод придумала балерина Лотте Берк в 1959-м.","Сила — в маленьких пульсирующих движениях.","Работают глубокие мышцы без «накачки» объёма."], improve:["Не повисай на опоре — держи свой центр.","Амплитуда маленькая, 1–2 см — в этом смысл.","Тяни макушку вверх весь комплекс."], gear:["Спинка стула как опора.","Носки с протектором.","Мягкий мяч и лёгкие утяжелители."], look:["Лёгкий топ, лосины, балетные носочки.","Собранные волосы, чистая линия шеи.","Минимализм пастельных тонов."], plan:["Плие и релеве у опоры ×12.","Махи ногой назад и в сторону ×15.","Полупальцы ×20 + пульс ×15.","«Сотня» лёжа ×100.","Растяжка у опоры 2 мин."] },
    { v:"Силовая", e:"🏋️‍♀️", cat:"Сила", insp:"Сильное тело — это свобода: лёгкость в спине, осанка и уверенность.", facts:["Мышцы сжигают энергию даже в покое.","Силовые укрепляют кости и осанку.","Прогресс — это +1 повтор или +1 кг к прошлому разу."], improve:["Следи за техникой, потом за весом.","Веди дневник — прогрессируй по чуть-чуть.","2–3 силовые в неделю с днём отдыха между."], gear:["Набор разборных гантелей.","Резиновые ленты разной жёсткости.","Перчатки или мел для хвата."], look:["Плотный бесшовный комплект.","Кроссовки с плоской устойчивой подошвой.","Топ с хорошей поддержкой."], plan:["Приседания ×15.","Отжимания ×10.","Тяга гантели в наклоне ×12.","Ягодичный мост ×15.","Планка 45 сек."] },
    { v:"Велоспорт", e:"🚴‍♀️", cat:"Кардио", insp:"Свобода скорости и ветер в лицо — кардио без удара по суставам.", event:"Летом весь мир следит за «Тур де Франс» — три недели и горные перевалы.", facts:["«Тур де Франс» длится ~3500 км.","Велосипед бережёт колени в отличие от бега.","Аэропосадка экономит до 30% усилий."], watch:["Этапы «Тур де Франс»","Горные финиши"], improve:["Крути педали чаще, а не тяжелее (каденс 80–90).","Чередуй спокойные и интервальные выезды.","Подбери высоту седла — нога чуть согнута внизу."], gear:["Шлем по размеру — обязателен.","Перчатки и велоформа с памперсом.","Фляга и фонари."], look:["Велоформа в спокойной палитре.","Очки от ветра и солнца.","Бафф на шею."], plan:["Разминка 10 мин спокойно.","30–50 мин в ровном темпе.","5 ускорений по 1 мин в горку.","Заминка и растяжка бёдер."] },
    { v:"Сквош", e:"🎾", cat:"Корт", insp:"Самый интенсивный корт в мире: реакция, взрыв и работа ног до пота.", facts:["Час сквоша сжигает до 700–900 ккал.","Журналы признавали его одним из самых здоровых видов спорта.","Главное правило — держать «Т-зону» в центре корта."], improve:["Возвращайся в центр после каждого удара.","Целься мячом вдоль стены — труднее отбить.","Разминай голеностоп — частая травма новичков."], gear:["Лёгкая ракетка и защитные очки.","Нескользящая обувь для зала.","Мяч по уровню (точки на мяче)."], look:["Дышащая футболка и шорты.","Напульсник и кепка.","Носки с поддержкой стопы."], plan:["Разминка и голеностоп 6 мин.","Удары о стену: 30 справа, 30 слева.","Свечи в угол ×20.","Спринты по Т-зоне ×10."] },
    { v:"Бокс", e:"🥊", cat:"Сила", insp:"Сила и грация удара: уверенность, реакция и характер в каждом раунде.", facts:["Бокс — это ноги и корпус, а не только руки.","Работа на мешке — мощное кардио и антистресс.","«Бой с тенью» оттачивает технику без партнёра."], watch:["Классические бои","Современные титульные поединки"], improve:["Возвращай руку к лицу сразу после удара.","Сила идёт из вращения бёдер, а не плеча.","Дыши на каждом ударе — короткий выдох."], gear:["Перчатки по весу и бинты.","Груша или лапы.","Скакалка для разминки."], look:["Топ и лосины, в которых легко двигаться.","Бинты под цвет.","Волосы плотно убраны."], plan:["Скакалка 3 мин.","Бой с тенью 3 раунда по 2 мин.","Комбинации на мешке 4 раунда.","Пресс и планка на финал."] },
    { v:"Сёрфинг", e:"🏄‍♀️", cat:"Вода", insp:"Поймать волну — значит поймать момент: баланс, океан и полная свобода.", facts:["Главный навык — терпеливо читать волны.","Гребля развивает спину и плечи.","Вставать на доску учатся на песке, до воды."], watch:["Соревнования WSL","Биг-вейв сёрфинг"], improve:["Тренируй вставание на берегу до автоматизма.","Смотри вперёд, не под ноги.","Греби активнее — большинство волн упускают из-за слабой гребли."], gear:["Доска по уровню (для старта — побольше).","Гидрокостюм по воде.","Лиш и воск на деку."], look:["Гидрокостюм или спортивный купальник.","Защита от солнца SPF.","Волосы в косу."], plan:["Разминка плеч и спины 5 мин.","Отработка вставания на песке ×15.","Гребля и баланс в воде.","Растяжка после."] },
    { v:"Скалолазание", e:"🧗‍♀️", cat:"Сила", insp:"Вертикальная головоломка: тело и ум решают маршрут вместе.", facts:["Скалолазание вошло в олимпийскую программу.","Здесь думают не меньше, чем лезут — это «шахматы на стене».","Сила хвата растёт удивительно быстро."], improve:["Дави ногами, не виси на руках.","Планируй маршрут с земли.","Двигайся плавно, держи бёдра ближе к стене."], gear:["Скальники по размеру.","Магнезия и мешочек.","Страховочная система в зале."], look:["Эластичные лосины или шорты.","Топ, не стесняющий плечи.","Короткие ногти, волосы убраны."], plan:["Разминка пальцев и плеч 8 мин.","Лёгкие трассы на технику ×4.","Трасса чуть сложнее ×2.","Растяжка предплечий."] },
    { v:"Скандинавская ходьба", e:"🥾", cat:"Воздух", insp:"Прогулка, которая работает как тренировка: спина, плечи и лёгкость.", facts:["Палки включают до 90% мышц тела.","Снимает нагрузку с коленей.","Подходит для любого возраста и уровня."], improve:["Отталкивайся палками назад, а не просто переставляй.","Держи ровную осанку и широкий шаг.","Дыши в ритме шагов."], gear:["Телескопические палки по росту.","Удобные кроссовки.","Лёгкий рюкзак и вода."], look:["Многослойный спокойный аутдор-комплект.","Бафф и кепка.","Дышащие носки."], plan:["Разминка плеч 5 мин.","40–60 мин в бодром темпе с палками.","Пара подъёмов в горку.","Растяжка спины и икр."] },
    { v:"Танцы", e:"💃", cat:"Радость", insp:"Музыка ведёт тело — самый радостный способ двигаться и отпускать.", facts:["Танец улучшает координацию и настроение разом.","15 минут танца — полноценное кардио.","Тело запоминает ритм быстрее, чем кажется."], improve:["Сначала почувствуй ритм, потом движения.","Танцуй у зеркала — следи за линией.","Разучивай по 8 счётов за раз."], gear:["Удобная обувь по стилю танца.","Свободная одежда для движения.","Колонка погромче."], look:["То, в чём чувствуешь себя красиво и свободно.","Волосы как нравится.","Каблук — по желанию и стилю."], plan:["Разминка под медленный трек 5 мин.","Базовые шаги ×8 счётов.","Связка под любимую песню.","Импровизация для себя 5 мин."] },
    { v:"Гольф", e:"⛳", cat:"Поле", insp:"Медленная элегантность: зелёные поля, тишина и точность удара.", facts:["За раунд проходят 6–8 км пешком.","Главное — не сила, а ритм и техника замаха.","Гандикап честно уравнивает игроков разного уровня."], watch:["Мейджоры PGA","Турниры на классических полях"], improve:["Замах одинаковой скоростью назад и вперёд.","Смотри на мяч до контакта.","Тренируй короткие удары — они снижают счёт."], gear:["Набор клюшек для старта.","Перчатка и мячи.","Удобная обувь для поля."], look:["Поло и брюки/юбка пастельных тонов.","Кепка или козырёк.","Лёгкий трикотаж на плечи."], plan:["Разминка корпуса 5 мин.","Патты на точность ×20.","Чипы к флажку ×15.","Полный замах на драйвинг-рейндже."] },
    { v:"Верховая езда", e:"🐎", cat:"Грация", insp:"Диалог с лошадью без слов: осанка, баланс и доверие.", facts:["Всадник работает корпусом и ногами постоянно.","Посадка укрепляет спину и пресс.","Лошадь чувствует малейшее напряжение."], improve:["Держи пятки вниз, спину прямой.","Расслабь руки — мягкий контакт с поводом.","Дыши спокойно: лошадь считывает твоё состояние."], gear:["Шлем и сапоги/краги — обязательны.","Бриджи с усилением.","Перчатки."], look:["Бриджи, белая рубашка-поло.","Высокие сапоги.","Волосы под шлем в сетку."], plan:["Разминка в седле шагом.","Работа на рыси по кругу.","Смена направлений и остановки.","Шаг и благодарность лошади."] },
    { v:"Гребля", e:"🚣‍♀️", cat:"Вода", insp:"Ритм вёсел и гладь воды на рассвете — медитация в движении.", facts:["Гребля задействует ~85% мышц тела.","Сила идёт от ног, а не от рук.","Один из лучших видов для спины при правильной технике."], improve:["Толкай ногами, тяни корпусом, потом руками.","Держи спину прямой, не сутулься.","Лови ровный длинный ритм."], gear:["Тренажёр-концепт или лодка.","Перчатки от мозолей.","Дышащая форма."], look:["Облегающий верх, чтобы не цеплять весло.","Шорты или тайтсы.","Кепка от солнца на воде."], plan:["Разминка 5 мин лёгко.","10 мин ровного темпа.","4×1 мин ускорения.","Заминка и растяжка спины."] },
    { v:"Бадминтон", e:"🏸", cat:"Корт", insp:"Лёгкий и быстрый: реакция, прыжки и азарт на каждой подаче.", facts:["Волан летит со скоростью свыше 400 км/ч (рекорд).","Отличная кардио-нагрузка и реакция.","Кистевой удар — секрет резких ударов."], improve:["Работай кистью, а не всей рукой.","Возвращайся в центр после удара.","Тренируй короткие шаги и прыжок."], gear:["Лёгкая ракетка и воланы.","Зальная нескользящая обувь.","Напульсник."], look:["Лёгкие шорты и футболка.","Кепка по желанию.","Носки с поддержкой."], plan:["Разминка и кисти 5 мин.","Подачи на точность ×20.","Удары сверху и сетка ×20.","Игра/обмен ударами 10 мин."] },
    { v:"Лыжи", e:"⛷️", cat:"Зима", insp:"Снег, скорость и горный воздух — зимняя свобода в чистом виде.", facts:["Горные лыжи тренируют ноги и баланс.","Беговые — одно из лучших кардио зимой.","Правильная стойка — колени мягкие, вес вперёд."], watch:["Кубок мира по горным лыжам","Скоростной спуск"], improve:["Держи вес на передней части ботинка.","Веди дугу плавно, не «скобли» склон.","Смотри туда, куда едешь, а не под ноги."], gear:["Лыжи и ботинки по уровню.","Шлем и маска.","Тёплая мембранная экипировка."], look:["Стильный лыжный комбинезон.","Маска в тон.","Термобельё под низ."], plan:["Разминка ног 5 мин.","Пологий склон на технику.","Дуги среднего радиуса.","Спокойный спуск на расслабление."] },
    { v:"Коньки", e:"⛸️", cat:"Зима", insp:"Скольжение как полёт: грация, баланс и лёгкость на льду.", facts:["Коньки развивают баланс и внутреннюю поверхность бедра.","Падать тоже учат — это часть техники.","Лёд требует мягких коленей и прямой спины."], improve:["Держи колени мягкими, корпус чуть вперёд.","Отталкивайся ребром конька, а не носком.","Смотри вперёд, а не под ноги."], gear:["Коньки по размеру с хорошим голеностопом.","Защита для старта.","Тёплые перчатки."], look:["Лосины, тёплый свитер, юбка по желанию.","Перчатки в тон.","Волосы убраны."], plan:["Разминка вне льда 5 мин.","Скольжение и равновесие.","Повороты и торможение.","Спокойные круги под музыку."] },
    { v:"Хайкинг", e:"🏔️", cat:"Воздух", insp:"Тропа, лес и вершина: медитация в движении и тишина для головы.", facts:["Лес снижает кортизол лучше зала.","Подъёмы укрепляют ноги и сердце.","Главное снаряжение — удобная обувь."], improve:["Иди ровным темпом, на подъёме — короче шаг.","Пей воду до того, как захотелось.","Слой одежды снимай заранее, до пота."], gear:["Треккинговые ботинки.","Рюкзак с водой и перекусом.","Палки на длинные маршруты."], look:["Многослойный аутдор в спокойных тонах.","Кепка и бафф.","Носки треккинговые."], plan:["Разминка 5 мин.","60–90 мин по маршруту в ровном темпе.","Привал с видом и водой.","Растяжка ног после."] },
    { v:"Стретчинг", e:"🤸‍♀️", cat:"Гибкость", insp:"Тело, которое тянется, — лёгкое и свободное. Шпагат как цель и медитация.", facts:["Гибкость растёт при регулярности, а не силе.","Тянуться лучше на тёплое тело.","Дыхание помогает мышце отпустить."], improve:["Никогда не тянись рывками.","Удерживай растяжку 30–60 сек.","Тянись каждый день по чуть-чуть — это ключ."], gear:["Коврик и ремень.","Два блока для опоры.","Тёплая одежда, чтобы не остыть."], look:["Бесшовный мягкий комплект.","Тёплые гетры.","Волосы убраны."], plan:["Разогрев 5 мин (лёгкое кардио).","Складка и наклоны ×6.","Бабочка и раскрытие бёдер 2 мин.","Подводка к шпагату у опоры."] },
    { v:"Кроссфит", e:"🏋️", cat:"Сила", insp:"Функциональная мощь: разнообразие, азарт и быстрый видимый результат.", facts:["Тренировки (WOD) меняются каждый день.","Сочетает силу, кардио и гимнастику.","Главное — техника, потом скорость и вес."], improve:["Ставь технику до скорости — всегда.","Масштабируй упражнения под себя.","Восстановление так же важно, как нагрузка."], gear:["Кроссовки с плоской подошвой.","Скакалка и перчатки.","Гантели/гиря для дома."], look:["Плотный бесшовный комплект.","Топ с сильной поддержкой.","Гетры по желанию."], plan:["Разминка-суставы 7 мин.","3 круга: 10 приседаний, 10 отжиманий, 10 берпи.","Скакалка 3×1 мин.","Растяжка и дыхание."] },
    { v:"Аэройога", e:"🧘", cat:"Грация", insp:"Йога в полёте: гамак, перевёрнутые позы и невесомость.", facts:["Гамак снимает нагрузку с позвоночника.","Перевёрнутые позы освежают и бодрят.","Развивает доверие к телу и смелость."], improve:["Начинай под присмотром инструктора.","Расслабляйся в гамаке, не зажимайся.","Дыши ровно в перевёрнутых позах."], gear:["Прочный сертифицированный гамак.","Облегающая одежда без молний.","Коврик под низ."], look:["Закрытый верх и лосины (без молний и крючков).","Волосы убраны.","Без украшений."], plan:["Разминка на полу 5 мин.","Мягкие позы в гамаке.","Первая перевёрнутая поза.","Расслабление в коконе."] },
    { v:"Каякинг", e:"🛶", cat:"Вода", insp:"Тишина воды и ритм весла — приключение и спокойствие в одном.", facts:["Гребля развивает спину, плечи и кор.","Каяк устойчивее, чем кажется.","Главное — техника поворота корпуса."], improve:["Греби корпусом, а не только руками.","Держи локти невысоко.","Смотри, куда хочешь повернуть."], gear:["Каяк и весло по росту.","Спасжилет — обязателен.","Гермомешок для вещей."], look:["Быстросохнущая одежда.","Кепка и очки на резинке.","Обувь, которую не жалко мочить."], plan:["Разминка плеч 5 мин.","Техника гребка у берега.","Спокойный заплыв 30 мин.","Повороты и растяжка после."] },
    { v:"Бег по тропам", e:"🌲", cat:"Воздух", insp:"Трейл: лес, корни, подъёмы — бег как приключение, а не по часам.", facts:["Мягкий грунт бережёт суставы.","Подъёмы и спуски качают всё тело.","Темп здесь меряют усилием, а не скоростью."], improve:["На подъёме — короткий шаг, можно перейти на быстрый шаг.","Смотри на 3–4 метра вперёд.","Спускайся расслабленно, не тормозя жёстко."], gear:["Трейловые кроссовки с цепким протектором.","Рюкзак-жилет с водой.","Ветровка на случай погоды."], look:["Технологичные шорты/тайтсы.","Кепка и бафф.","Гетры от грязи."], plan:["Разминка 7 мин.","40–60 мин по тропе по усилию.","Силовые подъёмы пешком.","Растяжка ног и спины."] },
    { v:"Сап-сёрфинг", e:"🏄", cat:"Вода", insp:"Скольжение стоя по глади воды: баланс, кор и полный покой вокруг.", facts:["Сап качает кор и баланс незаметно.","Грести можно сидя, на коленях и стоя.","Идеален для рассветной медитации на воде."], improve:["Смотри на горизонт, а не под ноги.","Греби, опуская весло вертикально.","Держи кор включённым для баланса."], gear:["Надувной сап и весло по росту.","Лиш на ногу.","Гермочехол для телефона."], look:["Купальник или гидро-топ.","Кепка и SPF.","Очки на резинке."], plan:["Разминка 5 мин.","Старт с колен, затем встать.","Спокойная гребля 30–40 мин.","Растяжка спины после."] },
    { v:"Фигурное катание", e:"⛸️", cat:"Грация", insp:"Музыка, лёд и линия тела: спорт-искусство, где красота — это техника.", facts:["Базовые навыки — рёбра конька и контроль скольжения.","Вращения тренируют вестибулярку.","Артистизм оценивают наравне с прыжками."], watch:["Чемпионаты мира","Произвольные программы"], improve:["Учись ездить на рёбрах, а не на всём лезвии.","Держи спину прямой, руки — линией.","Сначала уверенное скольжение, потом элементы."], gear:["Фигурные коньки с поддержкой голеностопа.","Чехлы и тёплые перчатки.","Защита для старта."], look:["Платье или лосины с юбкой.","Тёплый верх на разминку.","Волосы в пучок."], plan:["Разминка вне льда 7 мин.","Скольжение и рёбра.","Базовые вращения.","Прокат под музыку на эмоции."] },
    { v:"Гимнастика", e:"🤸", cat:"Гибкость", insp:"Гибкость, сила и контроль тела на грани искусства.", facts:["Развивает силу, гибкость и координацию разом.","Базу учат медленно и тщательно.","Растяжка и кор — фундамент всего."], improve:["Укрепляй кор — он держит все элементы.","Тянись каждый день понемногу.","Новые элементы — только со страховкой."], gear:["Мягкий мат.","Резинки для растяжки.","Удобный купальник/комплект."], look:["Облегающий купальник или топ с лосинами.","Волосы плотно убраны.","Без украшений."], plan:["Разминка и суставы 8 мин.","Кор: планки и лодочка.","Мостик и берёзка.","Растяжка на шпагат у опоры."] },
  ];
  const SPORT = picked ? SPORTS30.find(s=>s.v===picked) : null;
  return (
    <OverlayShell partner={ch.partner} label="СПОРТ · СЕГОДНЯ" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={60}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Движение на сегодня</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 18px" }}>Спорт как вдохновение, а не обязанность. Выбери своё из тридцати направлений — и найди, чем зажечься, как стать лучше и под что двигаться сегодня.</p>
      <div style={{ borderRadius:18, marginBottom:18, position:"relative", overflow:"hidden", height:118, border:`1px solid ${C.line}`, background:`linear-gradient(120deg, ${C.sage}59, ${ch.partner}40 55%, ${C.butter})` }}>
        <div aria-hidden="true" style={{ position:"absolute", right:-26, top:-30, width:120, height:120, borderRadius:99, background:"rgba(255,255,255,0.32)" }}/>
        <div style={{ position:"absolute", left:15, right:15, bottom:13, display:"flex", alignItems:"flex-end", gap:12 }}>
          <SGBadge name="racket" partner={ch.partner} size={40}/>
          <div>
            <div style={{ fontFamily:head, fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase", color:"rgba(26,26,26,0.55)" }}>Сила в спокойствии</div>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, color:C.ink, lineHeight:1.15, marginTop:2 }}>Тело любит мягкую регулярность</div>
          </div>
        </div>
      </div>
      <div style={{ marginBottom:24 }}>
        <Label>Вдохновляйся и пробуй</Label>
        <p style={{ fontSize:13.5, lineHeight:1.55, color:C.inkSoft, margin:"6px 0 12px" }}>Выбери вид спорта — и я соберу вдохновение: за чем следить, как стать лучше, плейлист, инвентарь, образ и комплекс на сегодня.</p>
        <div style={{ position:"relative" }}>
          <button onClick={()=>setOpenSport(o=>!o)} className="pop" style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10, height:52, padding:"0 16px", borderRadius:16, border:`1px solid ${picked?ch.partner:C.line}`, background:"rgba(255,255,255,0.7)", cursor:"pointer" }}>
            <span style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:20 }}>{SPORT?SPORT.e:"✦"}</span>
              <span style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:picked?C.ink:C.inkSoft }}>{picked||"Выбери вид спорта"}</span>
            </span>
            <ChevronDown size={20} strokeWidth={1.7} color={C.inkSoft} style={{ transform:openSport?"rotate(180deg)":"none", transition:"transform .2s" }}/>
          </button>
          {openSport && (
            <div className="row" style={{ position:"absolute", top:"calc(100% + 6px)", left:0, right:0, zIndex:30, maxHeight:330, overflowY:"auto", borderRadius:16, border:`1px solid ${C.line}`, background:C.cream, boxShadow:"0 24px 50px -24px rgba(26,26,26,0.45)", padding:6 }}>
              {SPORTS30.map(s=>(
                <button key={s.v} onClick={()=>pick(s.v)} className="pop" style={{ width:"100%", textAlign:"left", display:"flex", alignItems:"center", gap:11, padding:"11px 12px", borderRadius:11, border:"none", background:picked===s.v?`${ch.partner}22`:"transparent", cursor:"pointer" }}>
                  <span style={{ width:24, display:"flex", justifyContent:"center" }}><SGGlyph em={s.e} size={18} color={C.ink} sw={1.6}/></span>
                  <span style={{ flex:1, display:"flex", alignItems:"baseline", gap:8 }}><span style={{ fontFamily:head, fontSize:14, color:C.ink }}>{s.v}</span><span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.06em", textTransform:"uppercase", color:C.inkFaint }}>{s.cat}</span></span>
                </button>
              ))}
            </div>
          )}
        </div>
        {SPORT && (
          <div style={{ marginTop:14, borderRadius:20, overflow:"hidden", border:`1px solid ${ch.partner}`, background:`linear-gradient(168deg, ${ch.partner}1f, rgba(255,255,255,0.7) 60%)` }}>
            <div style={{ padding:"18px 18px 6px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, fontFamily:serif, fontStyle:"italic", fontSize:24, color:C.ink, lineHeight:1.15 }}><SGBadge em={SPORT.e} partner={ch.partner} size={36}/>{SPORT.v}</div>
              <p style={{ fontSize:14.5, lineHeight:1.5, color:C.ink, margin:"8px 0 0", fontFamily:serif, fontStyle:"italic" }}>{SPORT.insp}</p>
            </div>
            {SPORT.event && (
              <div style={{ margin:"12px 18px 0", padding:"12px 14px", borderRadius:14, background:`${ch.partner}26`, border:`1px solid ${ch.partner}55` }}>
                <div style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.12em", textTransform:"uppercase", color:ch.partner, marginBottom:4 }}>Событие сейчас</div>
                <p style={{ fontSize:13.5, lineHeight:1.5, color:C.ink, margin:0 }}>{SPORT.event}</p>
              </div>
            )}
            <div style={{ padding:"10px 18px 18px" }}>
              <SportSec icon="✨" title="Интересные факты" items={SPORT.facts}/>
              {SPORT.watch && <div style={{ margin:"0 0 14px", display:"flex", flexWrap:"wrap", gap:8 }}>{SPORT.watch.map((w,i)=><a key={i} href={yt(SPORT.v+" "+w)} target="_blank" rel="noreferrer" style={{ fontFamily:head, fontSize:12, color:ch.partner, textDecoration:"none", border:`1px solid ${ch.partner}`, borderRadius:99, padding:"6px 12px", display:"inline-flex", alignItems:"center", gap:5 }}><Play size={12} strokeWidth={2}/>{w}</a>)}</div>}
              <SportSec icon="📈" title="Как улучшить показатели" items={SPORT.improve}/>
              <SportSec icon="🎒" title="Инвентарь" items={SPORT.gear}/>
              <SportSec icon="✦" title="Образ на тренировку" items={SPORT.look}/>
              <SportSec icon="🔥" title="Комплекс на сегодня" items={SPORT.plan} num/>
              <a href={SP(SPORT.v+" workout")} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, height:48, marginTop:4, borderRadius:99, background:C.ink, color:C.cream, fontFamily:head, fontSize:14, fontWeight:500, textDecoration:"none" }}>♫ Плейлист для тренировки</a>
            </div>
          </div>
        )}
      </div>
      {(() => {
        const mine = POPULAR.filter(s=>sportStatus[s.v]).sort((a,b)=> (sportStatus[a.v]==="doing"?0:1)-(sportStatus[b.v]==="doing"?0:1));
        if(!mine.length) return null;
        return (
          <div style={{ margin:"0 0 20px" }}>
            <Label>Твои виды спорта</Label>
            <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 12px" }}>Закреплены здесь, чтобы всегда были под рукой. Нажми — внутри полное обучение: техника, термины, ошибки и видео.</p>
            {mine.map((s,i)=>(
              <button key={"mine"+i} onClick={()=>setDetail({ item:s, partner:ch.partner })} className="pop" style={{ width:"100%", textAlign:"left", display:"flex", alignItems:"center", gap:14, marginBottom:10, borderRadius:18, overflow:"hidden", background:`linear-gradient(168deg, ${ch.partner}22, rgba(255,255,255,0.7) 70%)`, border:`1px solid ${ch.partner}`, padding:12, cursor:"pointer" }}>
                <div style={{ width:64, flexShrink:0 }}><Photo t={s.t} url={s.url} h={64} radius={12}/></div>
                <div style={{ flex:1 }}>
                  <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.08em", textTransform:"uppercase", color:ch.partner }}>{sportStatus[s.v]==="doing"?"Занимаешься":"Хочешь начать"}</span>
                  <div style={{ fontFamily:serif, fontSize:18, color:C.ink, margin:"3px 0 0", lineHeight:1.2 }}>{s.v}</div>
                </div>
                <ArrowRight size={17} strokeWidth={1.6} color={ch.partner} style={{ flexShrink:0 }}/>
              </button>
            ))}
          </div>
        );
      })()}
      {today.map((s,i)=>(
        <button key={i} onClick={()=>setDetail({ item:s, partner:ch.partner })} className="pop" style={{ width:"100%", textAlign:"left", display:"flex", gap:14, marginBottom:12, borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, padding:12, cursor:"pointer" }}>
          <div style={{ width:80, flexShrink:0 }}><Photo t={s.t} url={s.url} h={80} radius={12}/></div>
          <div style={{ flex:1 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:9.5, letterSpacing:"0.08em", textTransform:"uppercase", color:s.air?"#6E8E5E":C.inkFaint, background:s.air?"rgba(194,211,172,0.4)":"rgba(26,26,26,0.05)", padding:"3px 9px", borderRadius:99 }}>{s.air && <Wind size={11} strokeWidth={2}/>}{s.k}</span>
            <div style={{ fontFamily:serif, fontSize:18, color:C.ink, margin:"6px 0 3px", lineHeight:1.2 }}>{s.v}</div>
            <p style={{ fontSize:12.5, lineHeight:1.45, color:C.inkSoft, margin:0 }}>{s.d.lead}</p>
          </div>
          <ArrowRight size={17} strokeWidth={1.6} color={C.inkFaint} style={{ alignSelf:"center", flexShrink:0 }}/>
        </button>
      ))}
      <div style={{ margin:"22px 0 6px" }}>
        <Label>Популярные виды спорта</Label>
        <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 12px" }}>Зашла — и сразу знаешь, что делать: техника, готовый комплекс на сегодня, частые ошибки и лайфхаки. Как с личным тренером.</p>
        {POPULAR.map((s,i)=>{
          const st = sportStatus[s.v];
          return (
          <div key={"pop"+i} style={{ marginBottom:12, borderRadius:18, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${st?ch.partner:C.line}` }}>
            <div role="button" tabIndex={0} onClick={()=>setDetail({ item:s, partner:ch.partner })} className="pop" style={{ textAlign:"left", display:"flex", gap:14, padding:12, cursor:"pointer" }}>
              <div style={{ width:80, flexShrink:0 }}><Photo t={s.t} url={s.url} h={80} radius={12}/></div>
              <div style={{ flex:1 }}>
                <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:9.5, letterSpacing:"0.08em", textTransform:"uppercase", color:s.air?"#6E8E5E":C.inkFaint, background:s.air?"rgba(194,211,172,0.4)":"rgba(26,26,26,0.05)", padding:"3px 9px", borderRadius:99 }}>{s.air && <Wind size={11} strokeWidth={2}/>}{s.k}</span>
                <div style={{ fontFamily:serif, fontSize:18, color:C.ink, margin:"6px 0 3px", lineHeight:1.2 }}>{s.v}</div>
                <p style={{ fontSize:12.5, lineHeight:1.45, color:C.inkSoft, margin:0 }}>{s.d.lead}</p>
              </div>
              <ArrowRight size={17} strokeWidth={1.6} color={C.inkFaint} style={{ alignSelf:"center", flexShrink:0 }}/>
            </div>
            <div style={{ display:"flex", gap:8, padding:"0 12px 12px" }}>
              <button onClick={()=>{ setStatus(s.v,"want"); setDetail({ item:s, partner:ch.partner }); }} className="pop" style={{ flex:1, padding:"9px 10px", borderRadius:12, cursor:"pointer", fontFamily:head, fontSize:11, letterSpacing:"0.04em", textTransform:"uppercase", border:`1px solid ${st==="want"?ch.partner:C.line}`, background:st==="want"?ch.partner:"rgba(255,255,255,0.7)", color:st==="want"?"#fff":C.ink }}>Хочу начать</button>
              <button onClick={()=>setStatus(s.v,"doing")} className="pop" style={{ flex:1, padding:"9px 10px", borderRadius:12, cursor:"pointer", fontFamily:head, fontSize:11, letterSpacing:"0.04em", textTransform:"uppercase", border:`1px solid ${st==="doing"?ch.partner:C.line}`, background:st==="doing"?ch.partner:"rgba(255,255,255,0.7)", color:st==="doing"?"#fff":C.ink }}>Уже занимаюсь</button>
            </div>
          </div>
          );
        })}
      </div>
      <div style={{ margin:"22px 0 6px" }}>
        <Label>Программа недели</Label>
        <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 12px" }}>Сбалансированный план тренера: движение, сила и отдых. Пропустила день — просто продолжай со следующего.</p>
        <div style={{ borderRadius:16, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", overflow:"hidden", marginBottom:12 }}>
          {week.map((d,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"11px 15px", borderBottom:i<week.length-1?`1px solid ${C.line}`:"none" }}>
              <div style={{ width:30, flexShrink:0, fontFamily:head, fontSize:10.5, letterSpacing:"0.05em", color:ch.partner }}>{d.d}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:serif, fontSize:15.5, color:C.ink, lineHeight:1.2 }}>{d.f}</div>
                <p style={{ fontSize:12, lineHeight:1.4, color:C.inkSoft, margin:"2px 0 0" }}>{d.n}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderRadius:16, border:`1px solid ${C.line}`, background:`linear-gradient(168deg, ${ch.partner}22, rgba(255,255,255,0.65) 60%)`, padding:"14px 16px" }}>
          <Label color={C.inkFaint}>Совет тренера</Label>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16.5, color:C.ink, lineHeight:1.35, margin:"7px 0 0" }}>{coach}</p>
        </div>
      </div>
      {(() => {
        const before = ["Выпей стакан воды за 20–30 минут до старта.","Лёгкая разминка 5 минут: шея, плечи, суставы, наклоны.","Удобная одежда и проветренная комната.","Поставь плейлист под настроение и настройся."];
        const AFTER = {
          summer:["Контрастный душ — взбодрит тело и тонизирует кожу.","Цитрусовый скраб для тела — гладкость и свежесть.","Лёгкое масло или крем на влажную кожу.","Смузи с фруктами и зеленью — восстановиться.","Растяжка 5 минут и ещё стакан воды."],
          coastal:["Контрастный или прохладный душ — заряд бодрости.","Цитрусовый или морской скраб для тела.","Увлажняющий крем на влажную кожу.","Смузи с цитрусом и мятой — освежить.","Растяжка у окна и стакан воды."],
          romance:["Тёплый душ и пара минут тишины.","Скраб и масло с розой или ванилью.","Питательный крем на кожу.","Ягодный смузи или тёплое какао.","Мягкая растяжка под спокойную музыку."],
          slow:["Тёплый душ или ванна — расслабить мышцы.","Сухая щётка и питательное масло для тела.","Крем на кожу, не спеша.","Тёплый травяной чай или мягкий смузи.","Медленная растяжка и глубокое дыхание."],
        };
        const after = AFTER[ch.id] || AFTER.summer;
        const Block = ({ tag, title, items, accent }) => (
          <div style={{ marginBottom:12, borderRadius:16, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", overflow:"hidden" }}>
            <div style={{ padding:"12px 15px 4px" }}>
              <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink, background:accent, padding:"3px 10px", borderRadius:99 }}>{tag}</span>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, margin:"8px 0 2px" }}>{title}</div>
            </div>
            <div style={{ padding:"4px 15px 14px" }}>
              {items.map((it,i)=>(
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:i<items.length-1?8:0 }}>
                  <div style={{ width:6, height:6, borderRadius:99, background:ch.partner, flexShrink:0, marginTop:7 }}/>
                  <p style={{ fontSize:13.5, lineHeight:1.45, color:C.ink, margin:0 }}>{it}</p>
                </div>
              ))}
            </div>
          </div>
        );
        return (
          <div style={{ margin:"22px 0 6px" }}>
            <Label>Полный комплекс — до и после</Label>
            <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 12px" }}>Тренировка — это не только движение. Подготовься до и позаботься о себе после — тогда спорт станет ритуалом, а не задачей.</p>
            <Block tag="До" title="Подготовься" items={before} accent={C.sage}/>
            <Block tag="Движение" title="Выбери тренировку выше" items={["Любая карточка сверху — бег, пилатес или вариант под настроение.","Слушай тело: темп комфортный, без надрыва."]} accent={`${ch.partner}55`}/>
            <Block tag="После" title="Восстановись красиво" items={after} accent={C.butter}/>
          </div>
        );
      })()}
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkFaint, textAlign:"center", margin:"8px 0 0" }}>Обновляется каждый день ✦</p>
    </OverlayShell>
  );
}

// ── PETS ──────────────────────────────────────────────────────────
function PetsView({ ch, onClose, pet }) {
  const yt = q => "https://www.youtube.com/results?search_query="+encodeURIComponent(q);
  const kind = pet==="Кошка" ? "Кошка" : pet==="Собака" ? "Собака" : null;
  const DATA = {
    "Собака": {
      lead: "Счастливый питомец — это режим, движение и внимание. Ниже — забота на каждый день: куда сходить, как понять характер и что купить.",
      today: ["Утро: прогулка 30–40 минут с обнюхиванием — для собаки это «новости дня».","День: свежая вода, отдых и пара минут дрессировки за лакомство.","Вечер: спокойная прогулка и время вместе — игра или ласка."],
      routes: [["Нюхательная прогулка по парку","30–40 минут в спокойном темпе. Дай собаке вынюхивать — это утомляет лучше бега."],["Маршрут вдоль воды","Новые запахи и виды, по утрам меньше людей и собак."],["Длинная прогулка в лес или за город","1–1.5 часа на выходных — счастливая уставшая собака весь вечер спокойна."]],
      events: [["Дог-френдли кофейни","Ищи на картах пометку «можно с питомцем» — кофе тебе, вода и лежанка ему."],["Площадки для выгула и дог-парки","Свободный бег и социализация в безопасном огороженном месте."],["Фестивали и забеги с собаками","Поищи в своём городе «фестиваль для собак» или «dog-friendly маркет»."],["Совместные пикники и поездки за город","Бери воду, складную миску и любимую игрушку — собаки обожают новые места и запахи."],["Зоомагазины с дог-зоной","Многие крупные магазины пускают с собакой — заодно подберёшь корм, лежанку и амуницию."],["Групповые тренировки с кинологом","Занятия на послушание и аджилити — социализация, новые команды и выплеск энергии."],["Дог-френдли веранды и парки у воды","Тёплый вечер, прогулка и спокойный отдых вместе — ищи открытые террасы летом."]],
      psy: ["Хвали и давай лакомство В МОМЕНТ нужного действия, а не после — так формируется связь.","Короткие тренировки по 5–10 минут эффективнее долгих и не утомляют.","Уставшая на прогулке собака спокойна дома — выгул решает половину «проблем поведения».","Не ругай постфактум: собака не свяжет наказание с тем, что было раньше."],
      toys: [["Каучуковая игрушка с лакомством (типа Kong)","Занимает надолго, спасает от скуки — набей кормом или пастой.","игрушка kong для собаки как выбрать"],["Канат для перетягивания","Игра вместе и чистка зубов одновременно.","канат игрушка для собаки"],["Головоломка-кормушка","Нагружает ум и замедляет еду — меньше переедания.","интерактивная головоломка для собаки"],["Мяч на верёвке","Апортировка и активная прогулка — выплеск энергии.","мяч на верёвке для собаки"]],
      care: ["Свежая вода всегда в доступе, миску мой ежедневно.","Расчёсывай шерсть пару раз в неделю — меньше колтунов и линьки.","Проверяй и мой лапы после прогулки, особенно зимой и в реагентах.","Когти и уши — раз в пару недель, аккуратно и спокойно.","Чисти зубы или давай дентальные лакомства — здоровье дёсен.","Раз в год — осмотр у ветеринара и прививки по графику.","Обработка от блох и клещей по сезону, особенно весной и летом.","Своя лежанка в тихом тёплом углу, без сквозняка.","Корм по возрасту и размеру, без лишних подкормок со стола."],
      vid: ["Как выбрать игрушку для собаки", "игрушки для собаки как выбрать обзор"],
    },
    "Кошка": {
      lead: "Кошке нужны охота, вертикаль и свой укромный угол. Ниже — забота на каждый день: зоны дома, куда сходить, как понять характер и что купить.",
      today: ["Утро: игра-охота с удочкой 10 минут — кошке важна «добыча».","День: тихий уход и доступ к окну — «кошачье ТВ».","Вечер: активная игра перед едой — крепче сон ночью."],
      routes: [["Вертикаль: полки и когтеточки","Кошке важно забираться вверх — это безопасность и её территория."],["Полоса препятствий из коробок","Туннели и коробки — бесплатное приключение на полчаса."],["Подоконник с видом","Лежанка у окна — часами наблюдать за птицами и улицей."]],
      events: [["Котокафе","Спокойная атмосфера и общение с кошками — про отдых, своих туда обычно не берут."],["Выставки кошек","Поищи «выставка кошек» в своём городе — красиво и познавательно."],["Дни груминга в зоосалонах","Иногда устраивают консультации и уход — следи за афишей салонов."],["Зоомагазины и груминг-салоны","Подбери когтеточку, корм и лакомства, иногда есть бесплатные консультации."],["Кото-маркеты и благотворительные ярмарки","Красивые вещицы для кошки и тёплая атмосфера — следи за афишей в городе."],["Онлайн-сообщества владельцев","Группы по породе и интересам — советы по уходу, фото и поддержка."],["Фотосессия с питомцем","Спокойная съёмка дома или в студии — красивые кадры вашей пары."]],
      psy: ["Кошке нужна вертикаль: полки и высокие места снижают стресс и конфликты.","Игра-охота перед едой уменьшает ночную беготню.","Никогда не играй рукой — только игрушкой, иначе руки станут «добычей».","Свой укромный угол и стабильный режим = спокойная кошка."],
      toys: [["Удочка-дразнилка с перьями","Имитация охоты — главная и любимая игра кошки.","удочка дразнилка для кошки"],["Мячики с погремушкой","Самостоятельная игра, когда тебя нет дома.","игрушки мячики для кошки"],["Интерактивная игрушка с моторчиком","Двигается сама и увлекает надолго.","интерактивная игрушка для кошки"],["Когтеточка-комплекс с домиком","Спасает мебель и даёт желанную вертикаль.","когтеточка комплекс для кошки как выбрать"]],
      care: ["Свежая вода и чистый лоток — основа здоровья и спокойствия.","Вычёсывай шерсть, особенно в линьку — меньше комков шерсти в желудке.","Подстригай когти раз в 2–3 недели, только прозрачный кончик.","Следи за весом — кошки склонны к лени и перееданию.","Чисти зубы или давай дентальные снеки — налёт частая проблема.","Раз в год — ветеринар, прививки и обработка от паразитов.","Меняй наполнитель и мой лоток — кошки очень чистоплотны.","Своё тихое укрытие, где её никто не трогает и не пугает.","Фонтанчик с водой помогает пить больше — здоровье почек."],
      vid: ["Как выбрать игрушку для кошки", "игрушки для кошки как выбрать обзор"],
    },
  };
  const d = DATA[kind];
  if (!d) {
    return (
      <OverlayShell partner={ch.partner} label="ПИТОМЦЫ · ЗАБОТА" onClose={onClose}>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
          <GlowOrb partner={ch.partner} size={60}/>
          <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Питомцы</h1>
        </div>
        <div style={{ textAlign:"center", padding:"34px 18px", border:`1px dashed ${C.line}`, borderRadius:18, marginTop:14 }}>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.inkSoft, margin:"0 0 6px" }}>
            {pet==="Другой питомец" ? "Для твоего питомца у нас пока нет отдельного гида" : "Ты не отметила питомца"}
          </p>
          <p style={{ fontSize:13.5, color:C.inkFaint, margin:0, lineHeight:1.55 }}>
            {pet==="Другой питомец"
              ? "Подробная забота сейчас есть для кошки и собаки. Универсальное правило — свежая вода, режим, внимание и тихое место для отдыха ✦"
              : "Отметь кошку или собаку в профиле — и здесь появится забота на каждый день: ритуалы, маршруты, психология и что купить."}
          </p>
        </div>
        <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkFaint, textAlign:"center", margin:"18px 0 0" }}>Питомец чувствует заботу каждый день ✦</p>
      </OverlayShell>
    );
  }
  const Block = ({ tag, title, lead, items, accent }) => (
    <div style={{ marginBottom:12, borderRadius:16, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", overflow:"hidden" }}>
      <div style={{ padding:"12px 15px 4px" }}>
        <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink, background:accent, padding:"3px 10px", borderRadius:99 }}>{tag}</span>
        <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, margin:"8px 0 2px" }}>{title}</div>
        {lead && <p style={{ fontSize:12.5, color:C.inkSoft, margin:"0 0 2px", lineHeight:1.4 }}>{lead}</p>}
      </div>
      <div style={{ padding:"6px 15px 14px" }}>
        {items.map((it,i)=>{
          const two = Array.isArray(it);
          return (
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:i<items.length-1?9:0 }}>
              <div style={{ width:6, height:6, borderRadius:99, background:ch.partner, flexShrink:0, marginTop:7 }}/>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13.5, lineHeight:1.45, color:C.ink, margin:0, fontWeight:two?600:400 }}>{two?it[0]:it}</p>
                {two && <p style={{ fontSize:12.5, lineHeight:1.45, color:C.inkSoft, margin:"2px 0 0" }}>{it[1]}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  return (
    <OverlayShell partner={ch.partner} label="ПИТОМЦЫ · ЗАБОТА" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={60}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Питомцы</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 18px" }}>{d.lead}</p>
      <Block tag="Сегодня" title="Ритуал дня" lead="Маленький распорядок — спокойный и счастливый питомец." items={d.today} accent={C.sage}/>
      <div style={{ margin:"20px 0 6px" }}><Label>{kind==="Собака"?"Маршруты для прогулок":"Зоны и маршруты дома"}</Label>
        <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 10px" }}>{kind==="Собака"?"Прогулка — главное событие дня. Меняй маршруты, чтобы было интересно.":"Кошке нужен «маршрут» дома: вертикаль, укрытия и наблюдательный пост."}</p>
      </div>
      <Block tag={kind==="Собака"?"Прогулки":"Дома"} title={kind==="Собака"?"Куда пойти гулять":"Обустрой пространство"} items={d.routes} accent={`${ch.partner}55`}/>
      <div style={{ margin:"20px 0 6px" }}><Label>Куда сходить вместе</Label>
        <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 10px" }}>Мероприятия и места, где питомцу рады. Конкретные адреса ищи на картах по подсказкам ниже.</p>
      </div>
      <Block tag="Мероприятия" title="Места и события" items={d.events} accent={C.butter}/>
      <div style={{ margin:"20px 0 6px" }}><Label>Психология питомца</Label>
        <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 10px" }}>Понять — значит подружиться. Несколько принципов, которые меняют поведение мягко и без стресса.</p>
      </div>
      <Block tag="Характер" title="Как понять и поладить" items={d.psy} accent={C.sage}/>
      <div style={{ margin:"20px 0 6px" }}><Label>Какую игрушку купить</Label>
        <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:"6px 0 12px" }}>Подобрала под характер питомца — и зачем каждая нужна.</p>
        {d.toys.map((t,i)=>(
          <a key={i} href={yt(t[2])} target="_blank" rel="noreferrer" className="pop" style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none", marginBottom:10, borderRadius:16, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", padding:"12px 14px" }}>
            <div style={{ width:34, height:34, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.ink }}>{i+1}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:serif, fontSize:15.5, color:C.ink, lineHeight:1.2 }}>{t[0]}</div>
              <p style={{ fontSize:12.5, lineHeight:1.4, color:C.inkSoft, margin:"2px 0 0" }}>{t[1]}</p>
            </div>
            <ExternalLink size={15} strokeWidth={1.7} color={C.inkFaint} style={{ flexShrink:0 }}/>
          </a>
        ))}
        <a href={yt(d.vid[1])} target="_blank" rel="noreferrer" style={{ display:"inline-flex", alignItems:"center", gap:7, fontFamily:head, fontSize:12.5, color:ch.partner, textDecoration:"none", margin:"2px 0 4px" }}><Play size={13}/> {d.vid[0]}</a>
      </div>
      <div style={{ margin:"20px 0 6px" }}><Label>Уход и мелочи</Label></div>
      <Block tag="Забота" title="Чтобы был здоров и счастлив" items={d.care} accent={C.oat}/>
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkFaint, textAlign:"center", margin:"10px 0 0" }}>Питомец чувствует заботу каждый день ✦</p>
    </OverlayShell>
  );
}

// ── LANGUAGES ─────────────────────────────────────────────────────
// Банки лексики по уровням на каждый язык (статически, не зависят от ИИ).
// mid — изысканная лексика уровня B2–C1 (Средний); adv — редкая/книжная/идиоматичная C1–C2 (Продвинутый).
// Тематически в духе медленной красивой жизни, чтобы подходить к любой теме урока.
function _dedupWords(arr){ const seen=new Set(); const out=[]; for(const w of arr){ if(!w||!w[0]||!w[1]) continue; const k=String(w[0]).toLowerCase().trim(); if(seen.has(k)) continue; seen.add(k); out.push(w); } return out; }
// Полная неделя тем на язык: день 1 — флагманская тема (themed), дни 2–7 — из LANG_WEEK_EXTRA.
// Темы сменяются по дням (ротация по seedToday), на всех языках, и весь контент уже на месте.
function langWeekPool(s){
  if (!s) return null;
  if (s.journeys) return s.journeys;
  if (s.week) return s.week;
  const extra = LANG_WEEK_EXTRA[s.n] || [];
  return s.themed ? [s.themed].concat(extra) : (extra.length ? extra : null);
}

function wordsFor(th, lvl, lang){
  if (th && th.wl && th.wl[lvl]) return th.wl[lvl];
  const ws = ((th&&th.words)||[]).filter(w=>w&&w[0]&&w[1]);
  const bank = LANG_VOCAB[lang] || { mid:[], adv:[] };
  if (lvl==="Начальный"){
    if (ws.length < 5) return ws;
    const byLen = [...ws].sort((a,b)=> String(a[0]).length - String(b[0]).length);
    return byLen.slice(0,5); // самые простые слова темы
  }
  if (lvl==="Продвинутый"){
    const adv = (th && th.wlAdv && th.wlAdv.length) ? th.wlAdv : [];
    return _dedupWords(ws.concat(adv).concat(bank.adv||[])).slice(0,16); // тема + продвинутая лексика
  }
  // Средний — слова темы + изысканная лексика уровня
  return _dedupWords(ws.concat(bank.mid||[])).slice(0,14);
}
// Чтение по уровню: Начальный — короче и проще, Средний — полный текст,
// Продвинутый — полный текст + продвинутый абзац (readAdv) с изысканной лексикой.
function readFor(th, lvl){
  const base = (th && th.read) ? th.read : [];
  if (!base.length) return base;
  if (lvl==="Начальный"){ const n = Math.max(8, Math.ceil(base.length*0.6)); return base.slice(0, n); }
  if (lvl==="Продвинутый") return (th && th.readAdv && th.readAdv.length) ? base.concat(th.readAdv) : base;
  return base;
}
function taskFor(th, lvl){
  const t = (th && th.task) ? th.task : "";
  if (lvl==="Начальный") return "Прочитай текст вслух и выпиши 5 новых слов в дневник.";
  if (lvl==="Продвинутый") return (t? t+" " : "") + "Затем перескажи историю своими словами на изучаемом языке, не подглядывая в перевод, и используй продвинутые слова дня.";
  return t;
}
function WordTest({ words, partner, stamp }) {
  const pool = (words||[]).filter(w=>w&&w[0]&&w[1]);
  const key = pool.map(w=>w[0]).join("|");
  const qs = React.useMemo(()=>{
    const pick = pool.slice(0, Math.min(4, pool.length));
    return pick.map((w)=>{
      const others = pool.filter(x=>x[1]!==w[1]).sort(()=>Math.random()-0.5);
      const distract = [];
      for(const o of others){ if(distract.length<2 && !distract.includes(o[1])) distract.push(o[1]); }
      const opts = [w[1], ...distract].sort(()=>Math.random()-0.5);
      return { word:w[0], answer:w[1], opts };
    });
  }, [key]);
  const [ans, setAns] = React.useState({});
  if (pool.length < 3) return null;
  const allAnswered = qs.length>0 && qs.every((_,i)=>ans[i]!=null);
  const allRight = allAnswered && qs.every((q,i)=>ans[i]===q.answer);
  const g = (_CITY_GRAD[stamp&&stamp.g||0]) || _CITY_GRAD[0];
  const ic = (_CITY_ICN[stamp&&stamp.icon]) || _CITY_ICN.skyline;
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='js' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='"+g[0]+"'/><stop offset='1' stop-color='"+g[1]+"'/></linearGradient></defs><rect width='120' height='90' fill='url(#js)'/><circle cx='60' cy='45' r='29' fill='#FFFFFF' opacity='0.18'/><g fill='none' stroke='#FFFFFF' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round' opacity='0.95'>"+ic+"</g></svg>";
  const uri = "data:image/svg+xml,"+encodeURIComponent(svg);
  const date = new Date().toLocaleDateString("ru-RU",{day:"numeric",month:"long"});
  return (
    <>
      <Label>Проверка слов · собери штамп</Label>
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkSoft, margin:"4px 0 12px" }}>Выбери перевод. Ответь верно на все — и город ляжет штампом в твой Carnet.</p>
      <div style={{ margin:"0 0 4px" }}>
        {qs.map((q,i)=>{
          const chosen = ans[i]; const locked = chosen!=null;
          return (
            <div key={i} style={{ marginBottom:12, background:"rgba(255,255,255,0.55)", border:"1px solid "+C.line, borderRadius:14, padding:"12px 14px" }}>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17, color:C.ink, marginBottom:9 }}>{q.word}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {q.opts.map((o,oi)=>{
                  const picked = chosen===o; const correct = o===q.answer;
                  let bg="rgba(255,255,255,0.7)", bd=C.line;
                  if(locked && correct){ bg="#DCE7D0"; bd="#C2D2B0"; }
                  else if(picked && !correct){ bg="#F2D9DC"; bd="#E4B8BE"; }
                  return (
                    <button key={oi} disabled={locked} onClick={()=>setAns(a=>({...a,[i]:o}))} style={{ border:"1px solid "+bd, background:bg, color:C.ink, borderRadius:99, padding:"8px 13px", fontSize:13.5, fontFamily:body, cursor:locked?"default":"pointer" }}>{o}</button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {!allAnswered && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", margin:"4px 0 16px" }}>
          <div style={{ border:"2px dashed "+C.line, borderRadius:18, padding:"15px 22px 13px", textAlign:"center", background:"rgba(255,255,255,0.35)", opacity:0.6 }}>
            <img src={uri} alt="" style={{ width:78, height:58, borderRadius:11, display:"block", margin:"0 auto 8px", filter:"grayscale(0.35)" }}/>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:21, color:C.inkFaint, lineHeight:1 }}>{(stamp&&stamp.ru)||"Город"}</div>
            <div style={{ fontFamily:head, fontSize:9, letterSpacing:"0.18em", color:C.inkFaint, marginTop:6 }}>ЕЩЁ НЕ ПОЛУЧЕН</div>
          </div>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, color:C.inkFaint, margin:"10px 0 0", textAlign:"center" }}>Ответь верно на все — и штамп ляжет с анимацией ✦</p>
        </div>
      )}
      {allAnswered && !allRight && (
        <div style={{ textAlign:"center", margin:"8px 0 18px" }}>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkSoft, margin:"0 0 10px" }}>Почти! Сверься с переводом и попробуй ещё.</p>
          <button onClick={()=>setAns({})} style={{ border:"1px solid "+C.line, background:"transparent", borderRadius:99, padding:"9px 18px", fontFamily:head, fontSize:12, color:C.inkSoft, cursor:"pointer" }}>Пройти заново</button>
        </div>
      )}
      {allRight && (
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", margin:"10px 0 22px" }}>
          <div style={{ animation:"stampIn 0.7s cubic-bezier(.2,.8,.3,1.2) both", transformOrigin:"center", border:"2px dashed "+partner, borderRadius:18, padding:"15px 22px 13px", textAlign:"center", background:"rgba(255,255,255,0.5)" }}>
            <img src={uri} alt="" style={{ width:78, height:58, borderRadius:11, display:"block", margin:"0 auto 8px" }}/>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:21, color:C.ink, lineHeight:1 }}>{(stamp&&stamp.ru)||"Город"}</div>
            <div style={{ fontFamily:head, fontSize:9, letterSpacing:"0.18em", color:C.inkSoft, marginTop:6 }}>ПУТЕШЕСТВИЕ ПРОЙДЕНО</div>
            <div style={{ fontFamily:head, fontSize:8.5, letterSpacing:"0.14em", color:C.inkFaint, marginTop:3 }}>✦ {date}</div>
          </div>
          <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkSoft, margin:"12px 0 0", textAlign:"center" }}>Штамп лёг в твой Carnet. Сцена прожита ✦</p>
        </div>
      )}
    </>
  );
}

function LangView({ ch, premium, onClose, openPlus, toggleSave, isSaved }) {
  const [sel, setSel] = useState(null);
  const [lesson, setLesson] = useState(false);
  const [lessonDay, setLessonDay] = useState(1);
  const [lvl, setLvl] = useState(()=> sgStore.get("sg_lang_lvl", "Средний"));
  const [longText, setLongText] = useState(null);
  const [ltBusy, setLtBusy] = useState(false);
  const [ltShowRu, setLtShowRu] = useState(false);
  useEffect(() => {
    if (!lesson || !sel) { setLongText(null); return; }
    const _pool = langWeekPool(sel); const day = _pool ? _pool[(((seedToday+lessonDay-1)%_pool.length)+_pool.length)%_pool.length] : sel.themed;
    if (!day) return;
    let cancelled = false; setLongText(null); setLtBusy(true); setLtShowRu(false);
    (async () => {
      try {
        const sys = `Ты — преподаватель ${sel.n.toLowerCase()} языка и автор эстетичных познавательных текстов в духе медленной красивой жизни (lifestyle Kinfolk, искусство, культура, ритуалы).`;
        const lvlDesc = {"Начальный":"A2–B1 (живые, не примитивные предложения, постепенно усложняющиеся)","Средний":"B2–C1 (богатая, изысканная и небанальная лексика, идиомы, сложные конструкции)","Продвинутый":"C1–C2 (виртуозная литературная лексика, редкие слова, идиомы, тонкие оттенки смысла и сложный синтаксис)"}[lvl] || lvl.toLowerCase();
        const lenByLvl = {"Начальный":"не меньше 2500 знаков (примерно 400–500 слов), 8–10 полных абзацев","Средний":"не меньше 3200 знаков (примерно 550–650 слов), 10–13 полных абзацев","Продвинутый":"не меньше 4200 знаков (примерно 750–900 слов), 13–16 полных абзацев"}[lvl] || "не меньше 3200 знаков, 10–13 полных абзацев";
        const prompt = `Напиши связный, насыщенный познавательный текст на ${sel.n.toLowerCase()} языке на тему «${day.theme}», уровень ${lvlDesc}. ОБЪЁМ ОБЯЗАТЕЛЬНО ${lenByLvl}; не сокращай и не обрывай текст, доведи каждую мысль до конца. Сложность лексики и синтаксиса должна СТРОГО соответствовать уровню: чем выше уровень, тем реже, изысканнее и точнее слова и тем сложнее конструкции. Пиши на уровне образованного носителя — со сложным синтаксисом, развёрнутыми периодами, причастными и деепричастными оборотами и редкой книжной лексикой. Тёплый, образный и эрудированный: с конкретными деталями, фактами, культурными и историческими отсылками и живой атмосферой. Сознательно используй богатую, изысканную и небанальную лексику, точные синонимы, идиомы и устойчивые выражения; варьируй конструкции и длину предложений — чтобы читатель встречал интересные и сложные новые слова, но текст всё же оставался по силам его уровню. Не упрощай: там, где уместно, вводи более редкую, книжную и точную лексику, профессиональные и культурные термины, поясняя их через контекст. Избегай примитива, канцелярита, штампов и повторов. Затем дай полный, точный и литературный перевод на русский (тоже целиком, без сокращений). Также подбери 10–12 ключевых слов и выражений ИЗ САМОГО ТЕКСТА — самых небанальных и полезных, со сложностью СТРОГО по уровню (на Начальном — простые, но живые; на Среднем — изысканная лексика B2–C1; на Продвинутом — редкие, книжные и идиоматические выражения C1–C2), каждое с точным переводом на русский. Верни ТОЛЬКО JSON без markdown, без обрезанных строк: {"text":"текст на ${sel.n.toLowerCase()} языке с абзацами через \\n\\n","translation":"перевод на русский с абзацами через \\n\\n","words":[["слово или выражение на ${sel.n.toLowerCase()} языке","перевод на русский"]]}.`;
        const r = await fetch(AI_ENDPOINT, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:8000, system:sys, messages:[{ role:"user", content:prompt }] }) });
        const d = await r.json();
        let raw = (d.content||[]).filter(x=>x.type==="text").map(x=>x.text).join("").trim();
        const obj = sgParseJSON(raw);
        if (obj) { if (obj.text) obj.text = stripMd(obj.text); if (obj.translation) obj.translation = stripMd(obj.translation); obj.words = Array.isArray(obj.words) ? obj.words.filter(wd=>Array.isArray(wd)&&wd[0]&&wd[1]).map(wd=>[stripMd(String(wd[0])).trim(), stripMd(String(wd[1])).trim()]).filter(wd=>wd[0]&&wd[1]).slice(0,14) : null; }
        if (!cancelled && obj && obj.text) setLongText(obj);
      } catch(e) { if(!cancelled) setLongText(null); }
      if (!cancelled) setLtBusy(false);
    })();
    return () => { cancelled = true; };
  }, [lesson, sel, lessonDay, lvl]);
  const LANGS = [
    { n:"Французский", city:"институт français", ideas:["Запишись в Institut français в Москве (Воронцово Поле, 16) — атмосфера и носители.","Читай по главе на французском в кафе с круассаном — начни с детских книг.","Слушай подкаст «Inner French» на утренней прогулке.","Смотри французское кино с субтитрами вечером."], wk1:{ greet:[["Bonjour","Здравствуйте","бонжур"],["Merci beaucoup","Спасибо большое","мерси боку"],["S'il vous plaît","Пожалуйста","силь ву пле"],["Au revoir","До свидания","о-ревуар"]], words:[["le café","кофе"],["le croissant","круассан"],["la terrasse","терраса"],["doucement","медленно"]] }, themed:{ theme:"Клод Моне и свет", read:[["Claude Monet est né à Paris en 1840, mais il a grandi au bord de la mer, en Normandie.","Клод Моне родился в Париже в 1840 году, но вырос на берегу моря, в Нормандии."],["Enfant, il n'aimait pas beaucoup l'école : il préférait dessiner des caricatures dans la marge de ses cahiers.","В детстве он не очень любил школу — он предпочитал рисовать карикатуры на полях тетрадей."],["Un jour, le peintre Eugène Boudin lui a montré comment travailler dehors, en plein air, face à la lumière vivante.","Однажды художник Эжен Буден показал ему, как работать на улице, на пленэре, перед живым светом."],["Cette leçon a changé toute sa vie : Monet a compris qu'il voulait peindre non pas les choses, mais la lumière sur les choses.","Этот урок изменил всю его жизнь: Моне понял, что хочет писать не вещи, а свет на вещах."],["En 1872, dans le port du Havre, il a peint un petit tableau brumeux : un soleil orange au-dessus de l'eau grise.","В 1872 году в порту Гавра он написал маленькую туманную картину: оранжевое солнце над серой водой."],["Il l'a appelé « Impression, soleil levant », sans imaginer que ce mot allait donner son nom à tout un mouvement.","Он назвал её «Впечатление. Восход солнца», не подозревая, что это слово даст имя целому течению."],["Quand le tableau a été exposé en 1874, un critique s'est moqué : il a écrit que ce n'était qu'une « impression », pas une vraie peinture.","Когда картину выставили в 1874 году, один критик насмехался: он написал, что это лишь «впечатление», а не настоящая живопись."],["Le mot était une insulte, mais les jeunes peintres l'ont accepté avec fierté : ils sont devenus « les impressionnistes ».","Слово было оскорблением, но молодые художники приняли его с гордостью — они стали «импрессионистами»."],["Pour eux, la lumière n'était jamais la même : elle changeait à chaque heure, à chaque saison, à chaque nuage.","Для них свет никогда не был одинаковым: он менялся каждый час, в каждое время года, с каждым облаком."],["Monet travaillait vite, par petites touches de couleur, pour saisir l'instant avant qu'il ne disparaisse.","Моне работал быстро, мелкими цветными мазками, чтобы поймать мгновение, прежде чем оно исчезнет."],["Il répétait souvent que le motif n'avait aucune importance : ce qui comptait, c'était l'air et la lumière entre lui et le motif.","Он часто повторял, что сам предмет не важен: важны воздух и свет между ним и предметом."],["Pour le prouver, il a peint la même cathédrale de Rouen plus de trente fois, à différents moments de la journée.","Чтобы это доказать, он написал один и тот же Руанский собор больше тридцати раз — в разное время дня."],["Le matin, la pierre semblait bleue et froide ; au coucher du soleil, elle devenait dorée, presque en feu.","Утром камень казался синим и холодным; на закате он становился золотым, почти охваченным огнём."],["En 1883, Monet s'est installé dans un village tranquille qui s'appelle Giverny, à une heure de Paris.","В 1883 году Моне поселился в тихой деревне под названием Живерни, в часе езды от Парижа."],["Là, il a créé un immense jardin, comme une œuvre d'art vivante, avec des milliers de fleurs de toutes les couleurs.","Там он создал огромный сад — как живое произведение искусства, с тысячами цветов всех оттенков."],["Il a fait creuser un bassin et l'a rempli de nénuphars, puis il a construit un petit pont japonais au-dessus de l'eau.","Он велел выкопать пруд и наполнил его кувшинками, а потом построил над водой маленький японский мостик."],["Pendant les trente dernières années de sa vie, il a peint ce bassin encore et encore, comme une obsession douce.","Последние тридцать лет своей жизни он писал этот пруд снова и снова — как нежную одержимость."],["Sur ses toiles, on ne voit presque plus le ciel ni l'horizon : seulement l'eau, les reflets et les fleurs qui flottent.","На его холстах почти не видно ни неба, ни горизонта — только вода, отражения и плывущие цветы."],["Vers la fin, sa vue a beaucoup baissé à cause d'une maladie des yeux, et les couleurs lui paraissaient troubles.","К концу жизни его зрение сильно ослабло из-за болезни глаз, и цвета казались ему мутными."],["Pourtant, il a continué à peindre, de mémoire et presque au toucher, des tableaux de plus en plus grands et libres.","И всё же он продолжал писать — по памяти и почти на ощупь — всё более крупные и свободные картины."],["Ces grandes toiles de nymphéas sont aujourd'hui au musée de l'Orangerie, à Paris, dans deux salles ovales et calmes.","Эти большие полотна с кувшинками сегодня хранятся в музее Оранжери в Париже, в двух овальных тихих залах."],["Quand on entre dans ces salles, on a l'impression d'être entouré d'eau et de lumière, hors du temps.","Когда входишь в эти залы, кажется, будто ты окружён водой и светом, вне времени."],["Monet est mort à Giverny en 1926, à quatre-vingt-six ans, entouré de son jardin et de ses fleurs.","Моне умер в Живерни в 1926 году, в восемьдесят шесть лет, в окружении своего сада и цветов."],["Toute sa vie, il a cherché une seule chose : montrer comment la lumière transforme le monde à chaque seconde.","Всю жизнь он искал одно: показать, как свет преображает мир каждую секунду."],["C'est peut-être pour cela que ses tableaux nous touchent encore : ils nous rappellent de regarder vraiment.","Возможно, именно поэтому его картины до сих пор трогают нас: они напоминают по-настоящему смотреть."],["La prochaine fois que le soleil entre par la fenêtre, arrête-toi un instant et observe la lumière, comme Monet.","В следующий раз, когда солнце заглянет в окно, остановись на миг и понаблюдай за светом, как Моне."]], words:[["le peintre","художник"],["la lumière","свет"],["fugace","мимолётный"],["la touche","мазок"],["le jardin","сад"],["le bassin","пруд"],["le nénuphar","кувшинка"],["ralentir","замедляться"]], grammar:"Passé composé — прошедшее «что сделал» (завершённое действие).\n\nФормула: подлежащее + avoir/être в наст. времени + причастие (participe passé).\n  il a peint — он написал · il a créé — он создал.\n\n1. Большинство глаголов берут avoir: j'ai, tu as, il a, nous avons.\n2. Причастие: глаголы на -er → -é (créer → créé); peindre → peint (неправильное, учим наизусть).\n3. Фон, описание «каким было» — это imparfait: il était, il y avait.\n\nКоротко: avoir + причастие = что сделал; était = каким было.", readAdv:[["On raconte qu'à la fin de sa vie, presque aveugle, Monet peignait davantage avec sa mémoire qu'avec ses yeux.","Рассказывают, что в конце жизни, почти ослепший, Моне писал больше памятью, чем глазами."],["Ses dernières toiles, longtemps jugées confuses, annonçaient pourtant l'abstraction qui naîtrait des décennies plus tard.","Его последние холсты, долго считавшиеся сумбурными, на деле предвещали абстракцию, которая родится десятилетия спустя."],["Le critique qui s'était moqué de lui ignorait qu'il venait, sans le vouloir, de baptiser une révolution.","Критик, насмехавшийся над ним, не подозревал, что только что невольно дал имя целой революции."],["Car l'impressionnisme ne fut pas seulement une manière de peindre, mais une façon nouvelle de regarder le monde.","Ведь импрессионизм был не только манерой письма, но и новым способом смотреть на мир."],["Saisir l'éphémère et célébrer l'instant : voilà l'héritage que Monet nous a laissé, plus actuel que jamais.","Поймать мимолётное и воспеть мгновение — вот наследие, которое оставил нам Моне, как никогда современное."]], wlAdv:[["éphémère","мимолётный, эфемерный"],["l'héritage","наследие"],["aveugle","слепой"],["annoncer","предвещать"]], task:"Напиши 3–4 предложения о любимом художнике или картине в passé composé." } },
    { n:"Английский", city:"разговорный клуб", ideas:["Ходи в speaking club в уютном кафе раз в неделю — уровень любой.","Читай по главе на английском каждый день — начни с коротких рассказов.","Смени язык телефона на английский — мягкое погружение.","Слушай аудиокниги во время уборки и прогулок."], wk1:{ greet:[["Hello","Привет","хэллоу"],["Thank you","Спасибо","сэнк ю"],["Please","Пожалуйста","плиз"],["Goodbye","До свидания","гудбай"]], words:[["coffee","кофе"],["book","книга"],["morning","утро"],["slowly","медленно"]] }, themed:{ theme:"Ритуал английского чая", read:[["Tea did not begin in England at all; it travelled a long way from the misty hills of China and India.","Чай вовсе не зародился в Англии — он проделал долгий путь от туманных холмов Китая и Индии."],["When the first tea arrived in London in the 1650s, it was rare and expensive, and only rich people could drink it.","Когда в 1650-х первый чай прибыл в Лондон, он был редким и дорогим, и пить его могли лишь богатые."],["Merchants kept the precious leaves in locked wooden boxes, and the lady of the house carried the only key.","Торговцы хранили драгоценные листья в запертых деревянных шкатулках, и единственный ключ носила хозяйка дома."],["Slowly, over many years, the price fell, and tea became the favourite drink of the whole country.","Постепенно, за многие годы, цена упала, и чай стал любимым напитком всей страны."],["But the gentle ritual we know today — afternoon tea — was born much later, around the year 1840.","Но мягкий ритуал, который мы знаем сегодня, — послеполуденный чай — родился гораздо позже, около 1840 года."],["In those days, people ate only two large meals: a small breakfast and a very late dinner at eight o'clock.","В те дни люди ели всего два больших раза: лёгкий завтрак и очень поздний ужин в восемь вечера."],["Anna, the Duchess of Bedford, often felt weak and hungry in the long, empty hours of the afternoon.","Анна, герцогиня Бедфорд, часто чувствовала слабость и голод в долгие пустые послеполуденные часы."],["So she asked her servants to bring her a pot of tea, some bread and butter, and a little cake to her room.","И она просила слуг приносить ей в комнату чайник чая, хлеб с маслом и небольшое пирожное."],["The small habit pleased her so much that she soon began to invite her friends to share it.","Эта маленькая привычка так ей понравилась, что вскоре она стала приглашать подруг разделить её."],["Before long, the ladies of London were meeting every afternoon, in beautiful dresses, around tables full of delicate food.","Вскоре дамы Лондона стали собираться каждый день, в красивых платьях, вокруг столов с изысканными лакомствами."],["A proper afternoon tea followed a quiet order, almost like a slow dance with three steps.","Настоящий послеполуденный чай следовал тихому порядку — почти как медленный танец в три па."],["First came thin sandwiches with cucumber, egg, or smoked salmon, cut into small, neat shapes.","Сначала подавали тонкие сэндвичи с огурцом, яйцом или копчёным лососем, нарезанные аккуратными кусочками."],["Then came warm scones, served with thick clotted cream and sweet strawberry jam.","Затем шли тёплые сконы с густыми сливками и сладким клубничным джемом."],["The English still argue, very politely, about one serious question: cream first, or jam first?","Англичане до сих пор очень вежливо спорят об одном серьёзном вопросе: сначала сливки или сначала джем?"],["Last of all came the cakes and pastries, small and pretty, to end the meal on a sweet note.","В самом конце подавали пирожные и выпечку — маленькие и красивые, чтобы закончить трапезу на сладкой ноте."],["The tea itself was poured from fine porcelain, never in a hurry, while quiet conversation filled the room.","Сам чай разливали из тонкого фарфора, никогда не спеша, пока комнату наполнял тихий разговор."],["Over time, the cup of tea became much more than a drink; it became a way to meet every part of life.","Со временем чашка чая стала намного больше, чем напитком, — она стала способом встречать любую часть жизни."],["The English drink tea to celebrate good news and to soften bad news, to welcome guests and to say goodbye.","Англичане пьют чай, чтобы отпраздновать хорошие вести и смягчить плохие, чтобы встретить гостей и попрощаться."],["During the hard years of war, a hot cup of tea gave people comfort and a feeling of ordinary life.","В тяжёлые годы войны горячая чашка чая дарила людям утешение и ощущение обычной жизни."],["Today, the grand hotels of London — the Ritz, the Savoy, Claridge's — still serve afternoon tea with great care.","Сегодня роскошные отели Лондона — «Ритц», «Савой», «Клариджес» — всё ещё подают послеполуденный чай с большим вниманием."],["Guests book their table weeks in advance and dress beautifully for the occasion.","Гости бронируют столик за недели вперёд и нарядно одеваются ради этого случая."],["Yet the real spirit of tea does not need a grand hotel or expensive porcelain at all.","И всё же истинный дух чая вовсе не нуждается в роскошном отеле или дорогом фарфоре."],["It only needs a warm pot, a few quiet minutes, and the simple wish to slow down for a while.","Ему нужны лишь тёплый чайник, несколько тихих минут и простое желание ненадолго замедлиться."],["To make a good cup, the English warm the pot first, then add the leaves and freshly boiling water.","Чтобы заварить хорошую чашку, англичане сначала прогревают чайник, затем добавляют листья и только что вскипевшую воду."],["They let it rest for a few minutes, because good tea, like good rest, cannot be rushed.","Они дают ему настояться несколько минут, ведь хороший чай, как и хороший отдых, нельзя торопить."],["So this afternoon, make yourself a cup, sit by the window, and let the busy world wait a little.","Так что сегодня днём завари себе чашку, сядь у окна и пусть суетливый мир немного подождёт."]], words:[["afternoon tea","послеполуденный чай"],["ritual","ритуал"],["scone","скон, булочка"],["clotted cream","густые сливки"],["porcelain","фарфор"],["to pause","остановиться"],["fashionable","модный"],["gentle","мягкий, нежный"]], grammar:"Past Simple — время рассказа о прошлом: биография, история, что уже случилось.\n\n1. Правильные глаголы: глагол + -ed.\n  paint → painted · want → wanted · love → loved.\n2. Неправильные учим наизусть (своя форма):\n  be → was/were · build → built · give → gave · teach → taught.\n3. Отрицание: did not (didn't) + НАЧАЛЬНАЯ форма глагола.\n  He did not want (не «did not wanted»).\n4. Вопрос: Did + кто + начальная форма? — Did he paint?\n\nПример: In 1872 he painted «Impression» and it gave the movement its name.", readAdv:[["Curiously, the very ritual that feels so quintessentially English was, at its root, an act of borrowing from distant cultures.","Любопытно, что сам ритуал, кажущийся типично английским, по сути был заимствованием у далёких культур."],["The empire's thirst for tea reshaped global trade, fuelled vast plantations, and left consequences still felt today.","Жажда чая в империи перекроила мировую торговлю, питала огромные плантации и оставила последствия, ощутимые и сегодня."],["Yet stripped of its imperial history, the ceremony endures as something quieter: a deliberate pause carved out of a hurried day.","И всё же, лишённая имперской истории, церемония сохраняется как нечто более тихое — намеренная пауза, вырезанная из суетливого дня."],["To brew tea well is, in a sense, to rehearse patience, to accept that some pleasures simply refuse to be rushed.","Хорошо заварить чай — значит, в каком-то смысле, упражняться в терпении, признать, что иные удовольствия попросту нельзя торопить."],["Perhaps that is its lasting lesson: elegance lies less in extravagance than in the unhurried attention we give to small things.","Возможно, в этом его непреходящий урок: изящество не в роскоши, а в неспешном внимании, которое мы дарим мелочам."]], wlAdv:[["quintessentially","в высшей степени типично"],["to endure","сохраняться, длиться"],["deliberate","намеренный, неспешный"],["extravagance","расточительность, роскошь"]], task:"Напиши 3–4 предложения о любимом ритуале или традиции в Past Simple." } },
    { n:"Итальянский", city:"за чашкой кофе", ideas:["Учи по 5 слов в день за утренним эспрессо.","Смотри итальянские фильмы Соррентино с субтитрами.","Готовь по рецептам на итальянском — вкусно и полезно.","Слушай итальянскую музыку и разбирай тексты."], wk1:{ greet:[["Buongiorno","Добрый день","буонджорно"],["Grazie","Спасибо","грацие"],["Per favore","Пожалуйста","пер фаворе"],["Arrivederci","До свидания","арриведерчи"]], words:[["il caffè","кофе"],["il libro","книга"],["il sole","солнце"],["piano","медленно"]] }, themed:{ theme:"La dolce vita", read:[["« La dolce vita » è forse l'espressione italiana più famosa del mondo, ma il suo senso è più profondo di quanto sembri.","«La dolce vita» — пожалуй, самое известное в мире итальянское выражение, но его смысл глубже, чем кажется."],["Alla lettera significa « la vita dolce », eppure non parla né di ricchezza né di lusso.","Буквально оно означает «сладкая жизнь», и всё же речь не о богатстве и не о роскоши."],["Parla piuttosto dell'arte di godere del tempo, della bellezza e dei piccoli piaceri di ogni giorno.","Скорее оно об искусстве наслаждаться временем, красотой и маленькими радостями каждого дня."],["L'espressione è diventata celebre nel 1960, grazie a un film del grande regista Federico Fellini.","Выражение стало знаменитым в 1960 году благодаря фильму великого режиссёра Федерико Феллини."],["Il film racconta alcuni giorni e alcune notti di un giornalista che gira per la Roma elegante e un po' triste.","Фильм рассказывает о нескольких днях и ночах журналиста, который бродит по элегантному и немного грустному Риму."],["La scena più famosa mostra una donna che entra di notte nella Fontana di Trevi, sotto le stelle.","Самая знаменитая сцена показывает женщину, которая ночью входит в фонтан Треви, под звёздами."],["Quell'immagine è diventata un simbolo della ricerca della felicità, della bellezza e della meraviglia.","Этот образ стал символом поиска счастья, красоты и чуда."],["Eppure il film non è soltanto allegro: dietro la festa, Fellini mostrò anche la solitudine e il vuoto.","И всё же фильм не только весёлый: за праздником Феллини показал и одиночество, и пустоту."],["Forse è proprio questo il vero messaggio: la dolce vita non è correre da una festa all'altra.","Возможно, в этом и есть настоящий смысл: dolce vita — это не бежать с одного праздника на другой."],["La vera dolcezza si trova nelle cose semplici, quelle che spesso dimentichiamo per la fretta.","Истинная сладость — в простых вещах, тех, о которых мы часто забываем из-за спешки."],["Per molti italiani, la dolce vita comincia la mattina, con il primo caffè preso con calma.","Для многих итальянцев dolce vita начинается утром, с первого кофе, выпитого не спеша."],["Continua a mezzogiorno, con un pranzo lungo, fatto di chiacchiere e di risate intorno alla tavola.","Она продолжается в полдень, за долгим обедом, полным разговоров и смеха за столом."],["E finisce la sera con la passeggiata, quella che gli italiani fanno lentamente, senza alcuna fretta.","А заканчивается вечером прогулкой — той, что итальянцы совершают медленно, безо всякой спешки."],["C'è anche un'altra espressione, ancora più bella: « il dolce far niente », la dolcezza di non fare nulla.","Есть и другое выражение, ещё прекраснее: «il dolce far niente» — сладость ничегонеделания."],["Non significa essere pigri, ma saper fermarsi e stare bene nel momento presente.","Это не значит быть ленивым — это значит уметь остановиться и хорошо чувствовать себя в настоящем мгновении."],["Sedersi al sole, guardare la gente che passa, ascoltare il rumore leggero della piazza: anche questo è vivere.","Сидеть на солнце, смотреть на проходящих людей, слушать лёгкий шум площади — это тоже жить."],["Nelle piazze di Roma, di Napoli o di Palermo, la vita si svolge lentamente, all'aria aperta.","На площадях Рима, Неаполя или Палермо жизнь течёт медленно, под открытым небом."],["La gente si saluta, si ferma a parlare, beve un bicchiere di vino e guarda il tramonto.","Люди здороваются, останавливаются поговорить, выпивают бокал вина и смотрят на закат."],["Il cibo, in Italia, non è mai solo nutrimento: è un momento da condividere con le persone care.","Еда в Италии — никогда не просто питание: это момент, чтобы разделить его с близкими."],["Si mangia piano, si parla a lungo, e soltanto dopo il pasto arriva il caffè, mai prima.","Едят медленно, говорят долго, и лишь после трапезы приходит кофе — никогда не раньше."],["Anche il riposo ha il suo posto: nel pomeriggio, in molti paesi, i negozi chiudono per qualche ora.","И отдых имеет своё место: после полудня во многих городках магазины закрываются на несколько часов."],["Questa abitudine non è pigrizia, ma rispetto per il corpo e per il ritmo naturale della giornata.","Эта привычка — не лень, а уважение к телу и к естественному ритму дня."],["La dolce vita, in fondo, è una filosofia: mettere la qualità del tempo prima della quantità delle cose.","Dolce vita, в сущности, — это философия: ставить качество времени выше количества вещей."],["È scegliere un buon caffè invece di mille cose veloci, una vera conversazione invece di mille messaggi.","Это выбрать хороший кофе вместо тысячи быстрых дел, настоящий разговор вместо тысячи сообщений."],["Non serve vivere in Italia per imparare quest'arte: basta rallentare e assaporare ciò che già abbiamo.","Не нужно жить в Италии, чтобы научиться этому искусству: достаточно замедлиться и смаковать то, что у нас уже есть."],["Allora, oggi, prenditi un momento solo per te: un caffè, una finestra e il dolce far niente.","Так что сегодня подари себе момент только для себя: кофе, окно и dolce far niente."]], words:[["la dolce vita","сладкая жизнь"],["godersi","наслаждаться"],["la bellezza","красота"],["la passeggiata","прогулка"],["il tramonto","закат"],["lentamente","медленно"],["assaporare","смаковать"],["la piazza","площадь"]], grammar:"В книгах и истории используется passato remoto — литературное прошедшее.\n  dipinse — написал · creò — создал · diede — дал.\n\nВ обычной речи чаще говорят passato prossimo: ha dipinto, ha creato (avere + причастие).\n\nФон, «каким было» — imperfetto: era, c'era.\n\nКоротко: dipinse/creò = что сделал (в рассказе); era = каким было.", readAdv:[["Eppure sarebbe ingenuo ridurre la dolce vita a una semplice pigrizia mediterranea o a un cliché da cartolina.","И всё же было бы наивно сводить dolce vita к простой средиземноморской лени или к открыточному клише."],["Si tratta piuttosto di una raffinata disciplina del piacere, che richiede attenzione, presenza ed eleganza interiore.","Речь скорее об утончённой дисциплине удовольствия, требующей внимания, присутствия и внутреннего изящества."],["Gli antichi romani la chiamavano « otium »: non l'ozio sterile, ma il tempo libero dedicato alla mente e alla bellezza.","Древние римляне называли это «otium» — не бесплодная праздность, а свободное время, посвящённое уму и красоте."],["In un'epoca ossessionata dalla produttività, questa filosofia appare quasi una forma silenziosa di ribellione.","В эпоху, одержимую продуктивностью, эта философия выглядит почти как тихая форма бунта."],["Vivere lentamente, oggi, è forse l'atto più sovversivo e insieme più dolce che ci rimanga.","Жить медленно сегодня — пожалуй, самый дерзкий и одновременно самый сладкий поступок, что нам остался."]], wlAdv:[["ingenuo","наивный"],["la pigrizia","лень"],["l'ozio","праздность, досуг"],["sovversivo","подрывной, бунтарский"]], task:"Напиши 3 предложения о том, что для тебя «сладкая жизнь»." } },
    { n:"Испанский", city:"тепло и музыкально", ideas:["Слушай подкаст «Español con Juan» на прогулке.","Танцуй и разбирай тексты любимых песен.","Читай по абзацу новостей на испанском утром.","Найди языкового партнёра для 15 минут в день."], wk1:{ greet:[["Hola","Привет","ола"],["Gracias","Спасибо","грасиас"],["Por favor","Пожалуйста","пор фавор"],["Adiós","До свидания","адьос"]], words:[["el café","кофе"],["el libro","книга"],["el sol","солнце"],["despacio","медленно"]] }, themed:{ theme:"Севилья · фламенко и апельсины", read:[["Sevilla es la capital de Andalucía, en el sur de España, una tierra de sol, de luz dorada y de calor.","Севилья — столица Андалусии, на юге Испании, земля солнца, золотого света и зноя."],["Es una ciudad muy antigua: los romanos, los árabes y los cristianos vivieron aquí y dejaron su huella.","Это очень древний город: римляне, арабы и христиане жили здесь и оставили свой след."],["Durante casi ochocientos años, una gran parte de España estuvo bajo el dominio árabe.","Почти восемьсот лет большая часть Испании была под арабским владычеством."],["Por eso, en Sevilla todavía se ven patios con fuentes, azulejos de colores y jardines tranquilos.","Поэтому в Севилье до сих пор видны дворики с фонтанами, цветная плитка и тихие сады."],["La Giralda, la torre más famosa de la ciudad, fue primero un minarete árabe y después un campanario cristiano.","Хиральда, самая знаменитая башня города, была сначала арабским минаретом, а затем христианской колокольней."],["Pero si hay un arte que nació en esta tierra y la representa, ese arte es el flamenco.","Но если есть искусство, которое родилось на этой земле и олицетворяет её, то это фламенко."],["El flamenco nació del encuentro de muchos pueblos: gitanos, árabes, judíos y andaluces.","Фламенко родилось из встречи многих народов: цыган, арабов, евреев и андалусцев."],["No es solo un baile: es la unión de tres artes, el cante, la guitarra y el baile.","Это не просто танец: это союз трёх искусств — пения, гитары и танца."],["El cante, es decir el canto, es el corazón del flamenco, y a menudo es triste y profundo.","Cante, то есть пение, — сердце фламенко, и часто оно печально и глубоко."],["El cantante canta el dolor, el amor perdido y la pobreza, pero también la alegría de vivir.","Певец поёт о боли, об утраченной любви и о бедности — но и о радости жизни."],["Hay un sentimiento especial que los andaluces llaman « duende », difícil de explicar con palabras.","Есть особое чувство, которое андалусцы называют «дуэнде», его трудно объяснить словами."],["El duende es ese momento mágico en que el artista olvida la técnica y toca el alma del público.","Дуэнде — это тот волшебный миг, когда артист забывает о технике и касается души зрителей."],["El poeta García Lorca decía que el duende no está en la garganta, sino que sube desde los pies.","Поэт Гарсиа Лорка говорил, что дуэнде не в горле — оно поднимается от самых ступней."],["Para sentirlo, hay que estar presente, en silencio, sin prisa, abierto a la emoción.","Чтобы его почувствовать, нужно быть здесь, в тишине, без спешки, открытым чувству."],["Junto a la música, Sevilla es también la ciudad de los naranjos, que llenan las calles y las plazas.","Наряду с музыкой Севилья — ещё и город апельсиновых деревьев, которые наполняют улицы и площади."],["Hay más de treinta mil naranjos en la ciudad, y en primavera sus flores perfuman todo el aire.","В городе больше тридцати тысяч апельсиновых деревьев, и весной их цветы наполняют ароматом весь воздух."],["Esa flor blanca y delicada se llama « azahar », una palabra que viene del árabe.","Этот белый и нежный цветок называется «асаар» — слово, пришедшее из арабского."],["El olor del azahar es tan dulce que, para muchos sevillanos, es el olor mismo de la primavera.","Запах асаара так сладок, что для многих севильцев это сам запах весны."],["Curiosamente, las naranjas de Sevilla son amargas y no se pueden comer como una fruta normal.","Любопытно, что севильские апельсины горькие, и их нельзя есть как обычный фрукт."],["Sin embargo, son perfectas para hacer mermelada, y por eso viajan cada año hasta Inglaterra.","Зато они идеальны для джема, и поэтому каждый год отправляются в Англию."],["Así, el desayuno inglés y las calles de Sevilla quedan unidos por una pequeña naranja amarga.","Так английский завтрак и улицы Севильи оказываются связаны одним маленьким горьким апельсином."],["En verano, el calor de Sevilla es muy fuerte, y la gente aprende a vivir con calma y a la sombra.","Летом зной в Севилье очень силён, и люди учатся жить спокойно и в тени."],["Por la tarde, cuando baja un poco el sol, las familias salen a pasear y a sentarse en las terrazas.","Под вечер, когда солнце чуть спадает, семьи выходят гулять и сидеть на террасах."],["Se habla, se ríe, se toma algo fresco, y nadie mira el reloj con impaciencia.","Болтают, смеются, пьют что-нибудь прохладное, и никто нетерпеливо не смотрит на часы."],["Cuando por fin cae la noche, en algún rincón suena una guitarra y alguien empieza a cantar.","Когда наконец наступает ночь, где-то в уголке звучит гитара, и кто-то начинает петь."],["Sevilla nos enseña algo sencillo y valioso: vivir con calor en el corazón, con calma y con alegría.","Севилья учит нас простому и ценному: жить с теплом в сердце, со спокойствием и радостью."]], words:[["el flamenco","фламенко"],["el naranjo","апельсиновое дерево"],["el azahar","цветок апельсина"],["la guitarra","гитара"],["el baile","танец"],["la pasión","страсть"],["despacio","медленно"],["la alegría","радость"]], grammar:"Pretérito indefinido — завершённое действие в прошлом (что сделал).\n  pintó — написал · creó — создал · dio — дал.\n\n1. Правильные -ar → -ó в он/она: pintar → pintó.\n2. Правильные -er/-ir → -ió: crear → creó.\n3. Неправильные учим: dar → dio · hacer → hizo · ir/ser → fue.\n\nФон, «каким было» — imperfecto: era, había.\n\nКоротко: pintó/creó = что сделал; era = каким было.", readAdv:[["Conviene recordar, sin embargo, que esta convivencia de culturas no siempre fue pacífica ni sencilla.","Стоит, однако, помнить, что это сосуществование культур не всегда было мирным и простым."],["Durante siglos, Sevilla fue frontera, encrucijada y campo de batalla entre religiones, lenguas y reinos enteros.","Веками Севилья была границей, перекрёстком и полем битвы между религиями, языками и целыми королевствами."],["De aquella mezcla turbulenta nacieron, paradójicamente, su música, su arquitectura y su carácter inconfundible.","Из той бурной смеси, как ни парадоксально, родились её музыка, архитектура и ни с чем не сравнимый характер."],["El duende del flamenco, esa emoción que estremece, brota precisamente de esa herida histórica nunca del todo cerrada.","Дуэнде фламенко, та эмоция, что бросает в трепет, рождается именно из этой исторической раны, никогда до конца не зажившей."],["Quizá por eso Sevilla conmueve tanto: en su alegría late siempre, discreta, una antigua melancolía.","Возможно, поэтому Севилья так трогает: в её радости всегда бьётся, незаметно, древняя меланхолия."]], wlAdv:[["la convivencia","сосуществование"],["la encrucijada","перекрёсток, развилка"],["estremecer","потрясать, вызывать трепет"],["la melancolía","меланхолия"]], task:"Напиши 3 предложения о городе или ритуале, который тебе нравится." } },
  ];
    const WEEK_THEMES = ["История дня","Новый город — скоро","Новый город — скоро","Новый город — скоро","Новый город — скоро","Новый город — скоро","Новый город — скоро"];
  const engL = LANGS.find(l=>l.n==="Английский");
  const WEEK_EN = engL ? [
    { theme:engL.themed.theme, read:engL.themed.read, words:engL.themed.words, grammar:engL.themed.grammar, formula:[["Subject",C.sage],["verb + ed / irregular",C.butter],["= Past Simple","#F2C0CC"]], task:engL.themed.task },
    { theme:"Уимблдон · история тенниса", read:[["Wimbledon, founded in 1877, is the oldest tennis tournament in the world.","Уимблдон, основанный в 1877 году, — старейший теннисный турнир в мире."],["It is the only Grand Slam still played on natural grass courts.","Это единственный турнир Большого шлема, который всё ещё играют на натуральных травяных кортах."],["Players must wear almost entirely white, a tradition kept for over a century.","Игроки обязаны быть почти полностью в белом — традиции больше века."],["Every summer, spectators eat strawberries and cream by the tonne.","Каждое лето зрители съедают клубнику со сливками тоннами."]], words:[["tournament","турнир"],["grass court","травяной корт"],["tradition","традиция"],["century","век"],["spectator","зритель"],["strawberry","клубника"]], grammar:"Present Simple — привычки, распорядок, факты (то, что обычно или всегда).\n\n1. I / you / we / they + глагол без изменений: I make, we drink.\n2. He / she / it + глагол + -s: she makes, he drinks.\n  (после o, s, sh, ch → -es: she goes, he watches.)\n3. Отрицание: don't / doesn't + начальная форма: she doesn't hurry.\n4. Наречия частоты (always, usually, often, never) — ПЕРЕД глаголом: she never hurries.\n\nПример: Every morning she makes coffee and never hurries.", formula:[["I / You / We",C.sage],["verb",C.butter],["+s → he / she / it","#F2C0CC"]], task:"Опиши своё утро в 4 предложениях в Present Simple." },
    { theme:"Тёрнер и свет", read:[["Joseph Turner was a British painter obsessed with light, mist and the restless sea.","Джозеф Тёрнер был британским художником, одержимым светом, туманом и беспокойным морем."],["He dissolved ships and storms into glowing, almost abstract veils of colour.","Он растворял корабли и бури в светящихся, почти абстрактных завесах цвета."],["Legend says he was once tied to a mast to feel a real storm.","По легенде, однажды его привязали к мачте, чтобы он пережил настоящий шторм."],["His dramatic, atmospheric paintings made him a forerunner of the Impressionists.","Его драматичные, атмосферные картины сделали его предтечей импрессионистов."]], words:[["painter","художник"],["mist","туман"],["glowing","светящийся"],["dramatic","драматичный"],["atmospheric","атмосферный"],["forerunner","предтеча"]], grammar:"Прилагательные в английском НЕ меняются по роду и числу и стоят ПЕРЕД существительным.\n  a soft light — soft lights (форма та же).\n\nЕсли прилагательных несколько, порядок такой:\n  оценка → размер → возраст → цвет → материал.\n  a beautiful small golden frame.\n\nПример: bright warm colours · a calm blue sea.", formula:[["adjective",C.butter],["+ noun",C.sage],["a soft light","#F2C0CC"]], task:"Опиши любимую картину 3 предложениями, по 2 прилагательных в каждом." },
    { theme:"Дом Burberry · модная икона", read:[["Thomas Burberry founded his house in 1856 and invented gabardine, a tough water-resistant cloth.","Томас Бёрберри основал свой дом в 1856 году и изобрёл габардин — прочную водоотталкивающую ткань."],["During the First World War he designed the trench coat for British officers.","В Первую мировую он создал тренчкот для британских офицеров."],["Its beige check became one of the most recognisable patterns in fashion.","Его бежевая клетка стала одним из самых узнаваемых узоров в моде."],["Today the brand is still reinventing that humble raincoat season after season.","Сегодня бренд всё ещё переосмысливает этот скромный плащ сезон за сезоном."]], words:[["fashion house","модный дом"],["cloth","ткань"],["trench coat","тренчкот"],["pattern","узор"],["recognisable","узнаваемый"],["to reinvent","переосмыслять"]], grammar:"Present Continuous — действие прямо сейчас, в момент речи.\n\nФормула: am / is / are + глагол + -ing.\n  I am reading · she is dancing · they are playing.\nОтрицание: am/is/are + not: she is not smiling.\nСигналы: now, right now, at the moment, look!\n\nОтличие: Present Simple = обычно (she dances every day); Continuous = сейчас (she is dancing now).", formula:[["am / is / are",C.sage],["verb + ing",C.butter],["= now","#F2C0CC"]], task:"Опиши, что происходит вокруг тебя сейчас, в 4 предложениях." },
    { theme:"Английский пейзажный сад", read:[["In the 18th century, England invented a garden that looked wild and natural.","В XVIII веке Англия придумала сад, выглядевший диким и естественным."],["There is usually a calm lake, and there are clumps of ancient trees.","Обычно там есть спокойное озеро и купы старинных деревьев."],["The designer «Capability» Brown shaped hills, water and open views.","Дизайнер «Капабилити» Браун лепил холмы, воду и открытые виды."],["Unlike strict French gardens, it imitated untouched, effortless nature.","В отличие от строгих французских садов, он подражал нетронутой, естественной природе."]], words:[["landscape","пейзаж"],["lake","озеро"],["clump","купа деревьев"],["to imitate","подражать"],["untouched","нетронутый"],["effortless","непринуждённый"]], grammar:"There is / There are — «есть, имеется, находится».\n\n1. There is + один предмет (ед. число): There is a boat.\n2. There are + много (мн. число): There are clouds.\n3. Отрицание: There isn't / There aren't.\n\nПредлоги места: on (на) · in (в) · near (у, рядом) · above (над) · under (под) · between (между).\n\nПример: There is a lighthouse on the rocks near the water.", formula:[["There is",C.sage],["+ one",C.oat],["There are",C.butter],["+ many",C.oat]], task:"Опиши морской пейзаж: 4 предложения с there is/are и предлогами места." },
    { theme:"Сэвил-Роу · искусство костюма", read:[["Savile Row in London is the birthplace of the bespoke men's suit.","Сэвил-Роу в Лондоне — родина мужского костюма, сшитого на заказ."],["A single suit needs a little genius and many hours of patient handwork.","Один костюм требует немного гения и многих часов терпеливой ручной работы."],["The word «bespoke» comes from cloth being «spoken for» by a customer.","Слово «bespoke» происходит от ткани, «обещанной» заказчику."],["Here tailoring is treated not as fashion, but as a quiet, exacting craft.","Здесь портновство считают не модой, а тихим, взыскательным ремеслом."]], words:[["bespoke","сшитый на заказ"],["suit","костюм"],["tailoring","портновство"],["handwork","ручная работа"],["craft","ремесло"],["exacting","взыскательный"]], grammar:"Исчисляемые предметы можно посчитать (apple, berry); неисчисляемые — нет (milk, bread, sugar).\n\n1. Много: many + исчисляемые (many berries) · much + неисчисляемые (much sugar).\n2. Немного: a few + исчисляемые (a few apples) · a little + неисчисляемые (a little milk).\n3. some — в утверждениях (some bread); any — в вопросах и отрицаниях (any sugar?).\n\nПример: There is a little honey and a few berries.", formula:[["a few / many",C.sage],["countable",C.oat],["a little / much",C.butter],["uncountable",C.oat]], task:"Опиши свой завтрак, используя some, a few и a little." },
    { theme:"Вечер в Вест-Энде", read:[["Tonight we are going to see a play in London's West End.","Сегодня вечером мы пойдём на спектакль в лондонском Вест-Энде."],["The theatres there have staged drama for over four hundred years.","Тамошние театры ставят драму уже более четырёхсот лет."],["I think the performance will be elegant, witty and quietly moving.","Думаю, спектакль будет элегантным, остроумным и тихо трогательным."],["Afterwards we will walk along the river and talk about the story.","Потом мы пройдёмся вдоль реки и обсудим сюжет."]], words:[["play","спектакль"],["theatre","театр"],["performance","представление"],["witty","остроумный"],["to stage","ставить (пьесу)"],["moving","трогательный"]], grammar:"Будущее: be going to + глагол — для планов (I'm going to read). will + глагол — для спонтанных решений и предсказаний (I think it will rain).", formula:[["going to",C.butter],["= plan",C.oat],["will",C.sage],["= decision now",C.oat]], task:"Опиши свой идеальный вечер: 4 предложения с will и going to." },
    { theme:"Блумсбери · Вирджиния Вулф", read:[["In early 20th-century London, a circle of writers met in Bloomsbury.","В Лондоне начала XX века кружок писателей собирался в Блумсбери."],["Virginia Woolf wrote in a freer, more inward style than earlier novelists.","Вирджиния Вулф писала в более свободной и внутренней манере, чем прежние романисты."],["She argued that a woman needs «a room of one's own» to create.","Она утверждала, что женщине нужна «своя комната», чтобы творить."],["The group valued friendship and beauty more than convention.","Кружок ценил дружбу и красоту больше условностей."]], words:[["circle","кружок"],["novelist","романист"],["inward","внутренний"],["freedom","свобода"],["to argue","утверждать"],["convention","условность"]], grammar:"Сравнительная степень (comparative) — «больше, старше, красивее».\n\n1. Короткие прилагательные + -er: old → older; big → bigger (удвоение согласной); nice → nicer.\n2. Длинные (2+ слога) → more: beautiful → more beautiful.\n3. «Чем» = than: Edinburgh is older than London.\n4. Исключения: good → better, bad → worse.", formula:[["short + -er",C.sage],["more + long",C.butter],["... than","#F2C0CC"]], task:"Сравни два города или две вещи в 4 предложениях (comparative)." },
  ] : null;
  if (engL && WEEK_EN) engL.week = WEEK_EN;
  const JOURNEYS_EXTRA = { "Французский":[{ city:"Прованс", lat:"PROVENCE", icon:"lavender", g:2, theme:"Прованс · лаванда и свет", read:[["La Provence est une région du sud de la France, pleine de lumière et de couleurs.","Прованс — регион на юге Франции, полный света и красок."],["En été, les champs de lavande deviennent violets et sentent très bon.","Летом лавандовые поля становятся фиолетовыми и чудесно пахнут."],["Sur les marchés, on trouve des olives, du miel et du fromage de chèvre.","На рынках есть оливки, мёд и козий сыр."],["Le peintre Paul Cézanne a beaucoup peint la montagne Sainte-Victoire.","Художник Поль Сезанн много писал гору Сент-Виктуар."],["Ici, la vie est lente, douce et baignée de soleil.","Здесь жизнь медленная, мягкая и залитая солнцем."]], words:[["la lavande","лаванда"],["le champ","поле"],["le marché","рынок"],["le miel","мёд"],["le soleil","солнце"],["lent","медленный"]], task:"Опиши любимое место на природе." }, { city:"Ницца", lat:"NICE", icon:"palm", g:1, theme:"Ницца · Лазурный берег", read:[["Nice se trouve au bord de la mer Méditerranée, sur la Côte d'Azur.","Ницца находится на берегу Средиземного моря, на Лазурном берегу."],["La Promenade des Anglais longe la plage et la mer bleue.","Английская набережная тянется вдоль пляжа и синего моря."],["Le matin, les gens prennent un café et regardent les bateaux.","Утром люди пьют кофе и смотрят на лодки."],["La vieille ville est pleine de petites rues et de marchés aux fleurs.","Старый город полон узких улочек и цветочных рынков."],["Le soir, le ciel devient rose au-dessus de l'eau calme.","Вечером небо становится розовым над спокойной водой."]], words:[["la mer","море"],["la plage","пляж"],["le bateau","лодка"],["la rue","улица"],["la fleur","цветок"],["calme","спокойный"]], task:"Опиши приморский город или вечер у моря." }, { city:"Париж", lat:"PARIS", icon:"eiffel", g:0, theme:"Французское кино · новая волна", read:[["À la fin des années 1950, de jeunes cinéastes ont inventé la Nouvelle Vague.","В конце 1950-х молодые режиссёры придумали «новую волну»."],["En 1959, Jean-Luc Godard a tourné «À bout de souffle» dans les rues de Paris.","В 1959 году Жан-Люк Годар снял «На последнем дыхании» на улицах Парижа."],["Ils filmaient dehors, avec peu d'argent et beaucoup de liberté.","Они снимали на улице, с малыми деньгами и большой свободой."],["Ce cinéma léger et moderne a changé le regard du monde entier.","Это лёгкое современное кино изменило взгляд всего мира."]], words:[["le cinéaste","режиссёр"],["le film","фильм"],["la rue","улица"],["la liberté","свобода"],["tourner","снимать (кино)"],["moderne","современный"]], task:"Опиши любимый фильм в passé composé." }, { city:"Париж", lat:"PARIS", icon:"eiffel", g:3, theme:"Шанель и маленькое чёрное платье", read:[["Coco Chanel a libéré les femmes des vêtements trop serrés.","Коко Шанель освободила женщин от слишком тесной одежды."],["En 1926, le magazine Vogue a appelé sa petite robe noire «la Ford de la mode».","В 1926 году Vogue назвал её маленькое чёрное платье «Фордом моды»."],["Elle aimait les lignes simples, le confort et l'élégance discrète.","Она любила простые линии, удобство и скромную элегантность."],["Aujourd'hui encore, la petite robe noire reste un classique.","И сегодня маленькое чёрное платье остаётся классикой."]], words:[["la mode","мода"],["la robe","платье"],["simple","простой"],["l'élégance","элегантность"],["le confort","удобство"],["noir","чёрный"]], task:"Опиши любимую вещь в гардеробе и почему." }, { city:"Париж", lat:"PARIS", icon:"eiffel", g:4, theme:"Букинисты на Сене", read:[["Le long de la Seine, les bouquinistes vendent de vieux livres depuis des siècles.","Вдоль Сены букинисты веками продают старые книги."],["Leurs boîtes vertes font partie du paysage de Paris.","Их зелёные ящики — часть пейзажа Парижа."],["On y trouve des romans, des cartes anciennes et de belles affiches.","Там находят романы, старинные карты и красивые афиши."],["Flâner et lire au bord de l'eau est un vrai plaisir parisien.","Гулять и читать у воды — настоящее парижское удовольствие."]], words:[["le livre","книга"],["le roman","роман"],["vieux","старый"],["le fleuve","река"],["flâner","прогуливаться"],["le plaisir","удовольствие"]], task:"Опиши книгу, которую любишь перечитывать." }, { city:"Париж", lat:"PARIS", icon:"eiffel", g:5, theme:"Эдит Пиаф и шансон", read:[["Édith Piaf est une grande chanteuse française du XXe siècle.","Эдит Пиаф — великая французская певица XX века."],["Sa chanson «La Vie en rose» parle d'un amour qui rend la vie belle.","Её песня «La Vie en rose» — о любви, которая делает жизнь прекрасной."],["Sa voix était forte, émouvante et pleine de vie.","Её голос был сильным, трогательным и полным жизни."],["La chanson française aime les mots simples et les émotions vraies.","Французская песня любит простые слова и настоящие чувства."]], words:[["la chanteuse","певица"],["la chanson","песня"],["la voix","голос"],["l'amour","любовь"],["la vie","жизнь"],["beau","прекрасный"]], task:"Опиши песню, которая тебя трогает." }, { city:"Грасс", lat:"GRASSE", icon:"lavender", g:5, theme:"Грасс · столица парфюма", read:[["Grasse, en Provence, est la capitale mondiale du parfum.","Грасс в Провансе — мировая столица парфюма."],["Depuis le XVIIe siècle, on y cultive le jasmin et la rose.","С XVII века здесь выращивают жасмин и розу."],["Les nez, ces artistes du parfum, mélangent des centaines d'odeurs.","«Носы» — мастера парфюма — смешивают сотни запахов."],["Un beau parfum garde le souvenir d'un lieu et d'un moment.","Хороший аромат хранит память о месте и мгновении."]], words:[["le parfum","духи, аромат"],["la rose","роза"],["le jasmin","жасмин"],["l'odeur","запах"],["mélanger","смешивать"],["le souvenir","память"]], task:"Опиши запах, который тебе дорог." }], "Итальянский":[{ city:"Флоренция", lat:"FIRENZE", icon:"duomo", g:4, theme:"Флоренция · колыбель Возрождения", read:[["Firenze è la culla del Rinascimento, in Toscana.","Флоренция — колыбель Возрождения, в Тоскане."],["Il grande Duomo di Brunelleschi domina il centro della città.","Великий Дуомо Брунеллески возвышается над центром города."],["Nella Galleria degli Uffizi si trovano opere di Botticelli e Leonardo.","В галерее Уффици есть работы Боттичелли и Леонардо."],["Al tramonto, il Ponte Vecchio si riflette nel fiume Arno.","На закате Понте Веккьо отражается в реке Арно."],["Firenze invita a camminare piano e a guardare la bellezza.","Флоренция приглашает идти медленно и смотреть на красоту."]], words:[["il Rinascimento","Возрождение"],["la città","город"],["l'opera","произведение"],["il ponte","мост"],["il fiume","река"],["la bellezza","красота"]], task:"Опиши красивый город или музей." }, { city:"Венеция", lat:"VENEZIA", icon:"bridge", g:5, theme:"Венеция · каналы и тишина", read:[["Venezia è una città costruita sull'acqua, con molti canali.","Венеция — город, построенный на воде, со множеством каналов."],["Non ci sono macchine: si va a piedi o in gondola.","Там нет машин: ходят пешком или плывут на гондоле."],["La mattina presto, la nebbia copre i ponti e le case antiche.","Рано утром туман укрывает мосты и старинные дома."],["In Piazza San Marco volano i piccioni e suona la musica.","На площади Сан-Марко летают голуби и звучит музыка."],["Venezia è silenziosa, lenta e un po' malinconica.","Венеция тихая, медленная и немного меланхоличная."]], words:[["il canale","канал"],["la gondola","гондола"],["il ponte","мост"],["la nebbia","туман"],["la casa","дом"],["silenzioso","тихий"]], task:"Опиши тихое место, которое тебе нравится." }, { city:"Милан", lat:"MILANO", icon:"duomo", g:3, theme:"Милан · мода и дизайн", read:[["Milano è la capitale italiana della moda e del design.","Милан — итальянская столица моды и дизайна."],["Due volte all'anno, la città ospita sfilate famose in tutto il mondo.","Дважды в год город принимает показы, знаменитые на весь мир."],["Gli stilisti italiani amano i tessuti belli e le linee eleganti.","Итальянские дизайнеры любят красивые ткани и элегантные линии."],["Dopo le sfilate, la gente prende un aperitivo nei Navigli.","После показов люди берут аперитив в районе Навильи."]], words:[["la moda","мода"],["lo stilista","дизайнер"],["la sfilata","показ"],["il tessuto","ткань"],["elegante","элегантный"],["l'aperitivo","аперитив"]], task:"Опиши свой стиль в одежде." }, { city:"Милан", lat:"MILANO", icon:"duomo", g:1, theme:"Верди и опера", read:[["Giuseppe Verdi è uno dei più grandi compositori d'opera italiani.","Джузеппе Верди — один из величайших итальянских оперных композиторов."],["Le sue opere, come «La traviata», si cantano ancora oggi.","Его оперы, как «Травиата», поют и сегодня."],["Il teatro La Scala di Milano è famoso in tutto il mondo.","Театр Ла Скала в Милане знаменит на весь мир."],["La musica di Verdi è piena di passione e di sentimento.","Музыка Верди полна страсти и чувства."]], words:[["il compositore","композитор"],["l'opera","опера"],["il teatro","театр"],["cantare","петь"],["la passione","страсть"],["la musica","музыка"]], task:"Опиши музыку, которая тебя вдохновляет." }, { city:"Неаполь", lat:"NAPOLI", icon:"sail", g:5, theme:"Искусство эспрессо", read:[["Per gli italiani, il caffè è un piccolo rito quotidiano.","Для итальянцев кофе — маленький ежедневный ритуал."],["Nel 1933, Alfonso Bialetti inventò la famosa caffettiera moka.","В 1933 году Альфонсо Бьялетти изобрёл знаменитую кофеварку мока."],["A Napoli, l'espresso è corto, forte e si beve in piedi al bar.","В Неаполе эспрессо короткий, крепкий, и его пьют стоя у стойки."],["Un buon caffè è un momento di pausa e di piacere.","Хороший кофе — момент паузы и удовольствия."]], words:[["il caffè","кофе"],["la caffettiera","кофеварка"],["l'espresso","эспрессо"],["il rito","ритуал"],["la pausa","пауза"],["forte","крепкий"]], task:"Опиши свой утренний ритуал." }, { city:"Рим", lat:"ROMA", icon:"colosseum", g:1, theme:"Соррентино · великая красота", read:[["Paolo Sorrentino è un regista italiano famoso per le sue immagini bellissime.","Паоло Соррентино — итальянский режиссёр, известный красивыми кадрами."],["Il suo film «La grande bellezza» mostra Roma di notte, elegante e malinconica.","Его фильм «Великая красота» показывает ночной Рим — элегантный и меланхоличный."],["Le sue storie parlano di tempo, di bellezza e di nostalgia.","Его истории — о времени, красоте и ностальгии."],["Il cinema italiano ama la luce, l'arte e le emozioni.","Итальянское кино любит свет, искусство и эмоции."]], words:[["il regista","режиссёр"],["il film","фильм"],["l'immagine","кадр, образ"],["la bellezza","красота"],["la storia","история"],["la notte","ночь"]], task:"Опиши вечер в красивом городе." }, { city:"Амальфи", lat:"AMALFI", icon:"sail", g:2, theme:"Амальфи · побережье и лимоны", read:[["La costiera amalfitana è famosa per il mare blu e i limoni gialli.","Амальфитанское побережье знаменито синим морем и жёлтыми лимонами."],["I paesi colorati si aggrappano alle scogliere sopra l'acqua.","Цветные городки лепятся к скалам над водой."],["Con i limoni si fa il limoncello, un liquore dolce e profumato.","Из лимонов делают лимончелло — сладкий ароматный ликёр."],["Qui si vive piano, tra sole, mare e lunghe cene.","Здесь живут не спеша — среди солнца, моря и долгих ужинов."]], words:[["la costiera","побережье"],["il limone","лимон"],["il mare","море"],["la scogliera","скала"],["colorato","разноцветный"],["il sole","солнце"]], task:"Опиши море или место у воды." }], "Испанский":[{ city:"Гранада", lat:"GRANADA", icon:"mosque", g:2, theme:"Гранада · Альгамбра", read:[["Granada está en Andalucía, al pie de las montañas de Sierra Nevada.","Гранада — в Андалусии, у подножия гор Сьерра-Невада."],["La Alhambra es un antiguo palacio árabe de gran belleza.","Альгамбра — древний арабский дворец огромной красоты."],["Sus patios tienen fuentes, agua tranquila y flores.","В его двориках — фонтаны, тихая вода и цветы."],["Por la noche, la ciudad huele a jazmín y suena una guitarra.","Ночью город пахнет жасмином, и звучит гитара."],["En Granada, el tiempo pasa despacio y con calma.","В Гранаде время идёт медленно и спокойно."]], words:[["el palacio","дворец"],["el patio","дворик"],["la fuente","фонтан"],["la flor","цветок"],["la montaña","гора"],["despacio","медленно"]], task:"Опиши красивое здание или сад." }, { city:"Барселона", lat:"BARCELONA", icon:"sagrada", g:3, theme:"Барселона · Гауди и море", read:[["Barcelona está junto al mar, en la región de Cataluña.","Барселона стоит у моря, в области Каталония."],["Antoni Gaudí creó la famosa iglesia de la Sagrada Familia.","Антони Гауди создал знаменитую церковь Саграда Фамилия."],["Sus formas son curvas, naturales y llenas de color.","Его формы — изогнутые, природные и полные цвета."],["Por las Ramblas pasea mucha gente entre flores y cafés.","По Рамблас гуляет много людей среди цветов и кафе."],["Al final del día, la playa se llena de luz dorada.","В конце дня пляж наполняется золотым светом."]], words:[["el mar","море"],["la iglesia","церковь"],["la forma","форма"],["el color","цвет"],["la playa","пляж"],["dorado","золотой"]], task:"Опиши город у моря или здание, которое впечатлило." }, { city:"Мадрид", lat:"MADRID", icon:"skyline", g:3, theme:"Альмодовар · испанское кино", read:[["Pedro Almodóvar es un famoso director de cine español.","Педро Альмодовар — знаменитый испанский кинорежиссёр."],["Sus películas tienen colores fuertes, mujeres valientes y mucho corazón.","В его фильмах яркие цвета, смелые женщины и много сердца."],["La película «Volver» habla de la familia, la memoria y el sur de España.","Фильм «Возвращение» — о семье, памяти и юге Испании."],["El cine español es apasionado, colorido y muy humano.","Испанское кино страстное, яркое и очень человечное."]], words:[["el cine","кино"],["la película","фильм"],["el director","режиссёр"],["el color","цвет"],["la mujer","женщина"],["el corazón","сердце"]], task:"Опиши фильм, который тебя тронул." }, { city:"Мадрид", lat:"MADRID", icon:"skyline", g:1, theme:"Тапас и собремеса", read:[["En España, las tapas son pequeños platos para compartir con amigos.","В Испании тапас — маленькие блюда, чтобы делиться с друзьями."],["Después de comer, llega la sobremesa: la charla tranquila en la mesa.","После еды наступает собремеса — спокойный разговор за столом."],["No hay prisa: la gente habla, ríe y se queda mucho tiempo.","Спешки нет: люди говорят, смеются и долго остаются."],["Comer juntos, despacio, es una forma de querer a los demás.","Есть вместе, не спеша, — способ любить близких."]], words:[["la tapa","тапас"],["la mesa","стол"],["compartir","делиться"],["la charla","разговор"],["despacio","медленно"],["el amigo","друг"]], task:"Опиши любимый ужин с близкими." }, { city:"Мадрид", lat:"MADRID", icon:"skyline", g:4, theme:"Веласкес и музей Прадо", read:[["Diego Velázquez fue un gran pintor español del siglo XVII.","Диего Веласкес был великим испанским художником XVII века."],["Su cuadro «Las meninas» es uno de los más famosos del mundo.","Его картина «Менины» — одна из самых знаменитых в мире."],["Hoy se puede ver en el Museo del Prado, en Madrid.","Сегодня её можно увидеть в музее Прадо, в Мадриде."],["Velázquez pintó la luz, las miradas y los pequeños detalles.","Веласкес писал свет, взгляды и маленькие детали."]], words:[["el pintor","художник"],["el cuadro","картина"],["el museo","музей"],["la luz","свет"],["la mirada","взгляд"],["el siglo","век"]], task:"Опиши картину или художника, который нравится." }, { city:"Валенсия", lat:"VALENCIA", icon:"palm", g:2, theme:"Сиеста и вечерний paseo", read:[["En España, muchas tiendas cierran un rato para la siesta.","В Испании многие магазины ненадолго закрываются на сиесту."],["Es un descanso corto, sobre todo en los días de calor.","Это короткий отдых, особенно в жаркие дни."],["Por la tarde, la gente sale a dar un paseo tranquilo.","Под вечер люди выходят на спокойную прогулку — paseo."],["Vivir despacio es parte del arte de vivir español.","Жить медленно — часть испанского искусства жить."]], words:[["la siesta","сиеста"],["el descanso","отдых"],["el paseo","прогулка"],["el calor","жара"],["tranquilo","спокойный"],["la tarde","вечер"]], task:"Опиши, как ты отдыхаешь и замедляешься." }, { city:"Сан-Себастьян", lat:"DONOSTIA", icon:"sail", g:1, theme:"Сан-Себастьян · пинчос у моря", read:[["San Sebastián está en el País Vasco, junto a una playa preciosa.","Сан-Себастьян — в Стране Басков, у прекрасного пляжа."],["En los bares se sirven pintxos: pequeños bocados sobre pan.","В барах подают пинчос — маленькие закуски на хлебе."],["La gente va de bar en bar, prueba uno o dos y sigue.","Люди ходят из бара в бар, пробуют один-два и идут дальше."],["Comer así, despacio y en compañía, es pura alegría.","Есть так, не спеша и в компании, — чистая радость."]], words:[["el pintxo","пинчо"],["el bar","бар"],["la playa","пляж"],["probar","пробовать"],["el bocado","закуска, кусочек"],["la alegría","радость"]], task:"Опиши любимое блюдо или место, где его едят." }] };
  LANGS.forEach(l=>{ const ls=LANG_STAMP[l.n]; const ex=JOURNEYS_EXTRA[l.n]; if(ls && ex && ex.length){ const flag={ city:ls.ru, lat:ls.lat, icon:ls.icon, g:ls.g, theme:l.themed.theme, read:l.themed.read, words:l.themed.words, grammar:l.themed.grammar, task:l.themed.task }; l.journeys=[flag, ...ex.map(e=>({ ...e, grammar:l.themed.grammar }))]; } });
  const frL = LANGS.find(l=>l.n==="Французский");
  const WEEK_FR = frL ? [
    { theme:frL.themed.theme, read:frL.themed.read, words:frL.themed.words, grammar:frL.themed.grammar, formula:[["Sujet",C.sage],["avoir / être",C.butter],["+ participe passé","#F2C0CC"]], task:frL.themed.task },
    { theme:"Ритуал кофе по-парижски", read:[["Chaque matin elle prépare un café et s'assoit près de la fenêtre.","Каждое утро она готовит кофе и садится у окна."],["À Paris on boit le café à une petite table en terrasse.","В Париже пьют кофе за маленьким столиком на террасе."],["Une belle matinée commence sans téléphone, avec de la lumière.","Хорошее утро начинается без телефона, со света."],["Elle ajoute toujours un peu de lait et ne se presse jamais.","Она всегда добавляет немного молока и никогда не торопится."]], words:[["le matin","утро"],["la terrasse","терраса"],["la lumière","свет"],["ajouter","добавлять"],["toujours","всегда"],["jamais","никогда"]], grammar:"Présent — для привычек. Глаголы на -er: je prépare, tu prépares, elle prépare, nous préparons, vous préparez, ils préparent. Наречия (toujours, jamais) обычно ставят после глагола.", formula:[["Sujet",C.sage],["verbe -er",C.butter],["-e / -es / -ons","#F2C0CC"]], task:"Опиши своё утро в 4 предложениях в présent." },
    { theme:"Импрессионизм и свет", read:[["La lumière douce et dorée tombe sur la rivière calme.","Мягкий золотистый свет падает на спокойную реку."],["Les impressionnistes aimaient les couleurs claires et chaudes.","Импрессионисты любили светлые и тёплые цвета."],["En français l'adjectif s'accorde: une robe blanche, des robes blanches.","Во французском прилагательное согласуется: une robe blanche."],["Le tableau semble calme, léger et plein d'air.","Картина кажется спокойной, лёгкой и полной воздуха."]], words:[["la lumière","свет"],["doux / douce","мягкий"],["clair","светлый"],["chaud","тёплый"],["la couleur","цвет"],["léger","лёгкий"]], grammar:"Прилагательные во французском СОГЛАСУЮТСЯ в роде и числе: petit/petite, petits/petites. Большинство стоят ПОСЛЕ существительного: une fleur rouge. Женский род обычно +e, множественное +s.", formula:[["nom",C.sage],["adjectif",C.butter],["+e / +s → accord","#F2C0CC"]], task:"Опиши картину 3 предложениями, согласуя прилагательные по роду." },
    { theme:"Балет и сцена", read:[["En ce moment la danseuse est en train de bouger sur la scène.","Прямо сейчас танцовщица движется по сцене."],["Les musiciens jouent et la lumière devient plus douce.","Музыканты играют, и свет становится мягче."],["Pour une action maintenant on dit: être en train de + infinitif.","Для действия сейчас говорят: être en train de + инфинитив."],["Elle porte une longue robe blanche et elle sourit.","На ней длинное белое платье, и она улыбается."]], words:[["la scène","сцена"],["la danseuse","танцовщица"],["bouger","двигаться"],["porter","носить"],["sourire","улыбаться"],["maintenant","сейчас"]], grammar:"Во французском нет отдельного длительного времени — обычно используют présent. Чтобы подчеркнуть «прямо сейчас», говорят être en train de + инфинитив: je suis en train de lire.", formula:[["être en train de",C.sage],["+ infinitif",C.butter],["= maintenant","#F2C0CC"]], task:"Опиши, что происходит вокруг, используя être en train de." },
    { theme:"Море глазами художников", read:[["Il y a un petit bateau sur la mer bleue et calme.","На спокойном синем море есть маленькая лодка."],["Il y a des nuages blancs au-dessus de l'horizon.","Над горизонтом есть белые облака."],["Un phare se trouve sur les rochers près de l'eau.","Маяк находится на скалах у воды."],["On dit il y a pour exprimer la présence de quelque chose.","Говорят il y a, чтобы выразить наличие чего-то."]], words:[["la mer","море"],["le bateau","лодка"],["le nuage","облако"],["près de","у / рядом"],["au-dessus de","над"],["le phare","маяк"]], grammar:"Il y a — «есть, имеется» (и для одного, и для многих): il y a un bateau, il y a des nuages. Предлоги места: sur (на), dans (в), près de (у), au-dessus de (над), entre (между).", formula:[["Il y a",C.sage],["un / une / des",C.butter],["+ lieu","#F2C0CC"]], task:"Опиши морской пейзаж: 4 предложения с il y a и предлогами." },
    { theme:"Французская кухня", read:[["Au petit-déjeuner elle prend du pain, du beurre et un peu de miel.","На завтрак она берёт хлеб, масло и немного мёда."],["Il n'y a pas beaucoup de sucre, mais il y a des fruits.","Сахара немного, но есть фрукты."],["On dit du pain, de la confiture, des fruits.","Говорят du pain, de la confiture, des fruits."],["La bonne cuisine est simple, fraîche et partagée.","Хорошая кухня — простая, свежая и разделённая."]], words:[["le pain","хлеб"],["le miel","мёд"],["un peu de","немного"],["beaucoup de","много"],["frais / fraîche","свежий"],["partager","делиться"]], grammar:"Партитивные артикли — для «некоторого количества»: du (м.р.), de la (ж.р.), des (мн.ч.): du café, de la confiture, des fruits. После отрицания и «un peu de / beaucoup de» — только de: pas de sucre, un peu de lait.", formula:[["du / de la / des",C.butter],["= количество",C.oat],["pas / un peu →",C.sage],["de","#F2C0CC"]], task:"Опиши завтрак, используя du, de la, des и un peu de." },
    { theme:"Вечерние ритуалы", read:[["Ce soir je vais allumer une bougie et lire un livre.","Сегодня вечером я зажгу свечу и почитаю книгу."],["Demain elle va prendre un long bain chaud.","Завтра она примет долгую тёплую ванну."],["Le futur proche se forme avec aller + infinitif.","Ближайшее будущее образуется с aller + инфинитив."],["Ce sera une soirée calme et lente.","Это будет спокойный и медленный вечер."]], words:[["ce soir","сегодня вечером"],["la bougie","свеча"],["le soir","вечер"],["allumer","зажигать"],["le bain","ванна"],["demain","завтра"]], grammar:"Futur proche (ближайшее будущее) — для планов: aller в présent + инфинитив. je vais lire, tu vas partir, elle va dormir. Очень частая и простая разговорная конструкция.", formula:[["aller (présent)",C.sage],["+ infinitif",C.butter],["= план","#F2C0CC"]], task:"Опиши свой вечер: 4 предложения с futur proche (aller + infinitif)." },
  ] : null;
  if (frL) frL.week = null; /* заменено city-путешествиями */
  const itL = LANGS.find(l=>l.n==="Итальянский");
  const WEEK_IT = itL ? [
    { theme:itL.themed.theme, read:itL.themed.read, words:itL.themed.words, grammar:itL.themed.grammar, formula:[["Soggetto",C.sage],["verbo",C.butter],["→ passato","#F2C0CC"]], task:itL.themed.task },
    { theme:"Ритуал кофе по-итальянски", read:[["Ogni mattina prepara un caffè e si siede vicino alla finestra.","Каждое утро она готовит кофе и садится у окна."],["A Roma si beve il caffè in piedi al bancone del bar.","В Риме кофе пьют стоя у барной стойки."],["Una bella mattina comincia senza telefono, con la luce.","Хорошее утро начинается без телефона, со света."],["Aggiunge sempre un po' di latte e non ha mai fretta.","Она всегда добавляет немного молока и никогда не торопится."]], words:[["la mattina","утро"],["il caffè","кофе"],["la luce","свет"],["aggiungere","добавлять"],["sempre","всегда"],["mai","никогда"]], grammar:"Presente — для привычек. Глаголы на -are: io preparo, tu prepari, lui/lei prepara, noi prepariamo, voi preparate, loro preparano.", formula:[["Soggetto",C.sage],["verbo -are",C.butter],["-o / -i / -a","#F2C0CC"]], task:"Опиши своё утро в 4 предложениях в presente." },
    { theme:"Импрессионизм и свет", read:[["La luce dolce e dorata cade sul fiume calmo.","Мягкий золотистый свет падает на спокойную реку."],["Gli impressionisti amavano i colori chiari e caldi.","Импрессионисты любили светлые и тёплые цвета."],["In italiano l'aggettivo concorda: una rosa bianca, rose bianche.","В итальянском прилагательное согласуется: una rosa bianca."],["Il quadro sembra calmo, leggero e pieno d'aria.","Картина кажется спокойной, лёгкой и полной воздуха."]], words:[["la luce","свет"],["dolce","мягкий / нежный"],["chiaro","светлый"],["caldo","тёплый"],["il colore","цвет"],["leggero","лёгкий"]], grammar:"Прилагательные в итальянском СОГЛАСУЮТСЯ в роде и числе: rosso/rossa, rossi/rosse. Обычно стоят ПОСЛЕ существительного: un fiore rosso.", formula:[["nome",C.sage],["aggettivo",C.butter],["-o/-a/-i/-e → accordo","#F2C0CC"]], task:"Опиши картину 3 предложениями, согласуя прилагательные." },
    { theme:"Балет и сцена", read:[["In questo momento la ballerina sta muovendosi sul palco.","Прямо сейчас балерина движется по сцене."],["I musicisti stanno suonando e la luce diventa più dolce.","Музыканты играют, и свет становится мягче."],["Per un'azione adesso si usa: stare + gerundio.","Для действия сейчас используют stare + герундий."],["Indossa un lungo vestito bianco e sorride.","На ней длинное белое платье, и она улыбается."]], words:[["il palco","сцена"],["la ballerina","балерина"],["muoversi","двигаться"],["indossare","носить"],["sorridere","улыбаться"],["adesso","сейчас"]], grammar:"Действие прямо сейчас: stare + gerundio (-ando / -endo). Sto leggendo, sta cantando, stanno suonando. Аналог английского -ing.", formula:[["stare",C.sage],["+ gerundio",C.butter],["= adesso","#F2C0CC"]], task:"Опиши, что происходит вокруг, используя stare + gerundio." },
    { theme:"Море глазами художников", read:[["C'è una piccola barca sul mare azzurro e calmo.","На спокойном синем море есть маленькая лодка."],["Ci sono nuvole bianche sopra l'orizzonte.","Над горизонтом есть белые облака."],["Un faro si trova sugli scogli vicino all'acqua.","Маяк находится на скалах у воды."],["Si dice c'è per uno e ci sono per molti.","Говорят c'è для одного и ci sono для многих."]], words:[["il mare","море"],["la barca","лодка"],["la nuvola","облако"],["vicino a","у / рядом"],["sopra","над"],["il faro","маяк"]], grammar:"C'è (есть, ед.) / ci sono (есть, мн.): c'è una barca, ci sono nuvole. Предлоги места: su (на), in (в), vicino a (у), sopra (над), tra (между).", formula:[["C'è",C.sage],["+ uno",C.oat],["Ci sono",C.butter],["+ molti",C.oat]], task:"Опиши морской пейзаж: 4 предложения с c'è/ci sono и предлогами." },
    { theme:"Итальянская кухня", read:[["A colazione prende del pane, del burro e un po' di miele.","На завтрак она берёт хлеб, масло и немного мёда."],["Non c'è molto zucchero, ma ci sono dei frutti.","Сахара немного, но есть фрукты."],["Si dice del pane, della marmellata, dei frutti.","Говорят del pane, della marmellata, dei frutti."],["La buona cucina è semplice, fresca e condivisa.","Хорошая кухня — простая, свежая и разделённая."]], words:[["il pane","хлеб"],["il miele","мёд"],["un po' di","немного"],["molto","много"],["fresco","свежий"],["condividere","делиться"]], grammar:"Партитив (немного, некоторое количество): del (м.р.), della (ж.р.), dei/degli/delle (мн.ч.): del caffè, della frutta, dei biscotti. Образуется как di + артикль.", formula:[["del / della / dei",C.butter],["= количество",C.oat],["di + articolo",C.sage]], task:"Опиши завтрак, используя del, della, dei и un po' di." },
    { theme:"Вечерние ритуалы", read:[["Stasera accenderò una candela e leggerò un libro.","Сегодня вечером я зажгу свечу и почитаю книгу."],["Domani lei prenderà un lungo bagno caldo.","Завтра она примет долгую тёплую ванну."],["Il futuro semplice: leggerò, leggerai, leggerà.","Простое будущее: leggerò, leggerai, leggerà."],["Sarà una serata calma e lenta.","Это будет спокойный и медленный вечер."]], words:[["stasera","сегодня вечером"],["la candela","свеча"],["la sera","вечер"],["accendere","зажигать"],["il bagno","ванна"],["domani","завтра"]], grammar:"Futuro semplice — для будущего: окончания -ò, -ai, -à, -emo, -ete, -anno. Leggerò, prenderò, sarò. Для «вот-вот» можно stare per + infinito.", formula:[["verbo",C.sage],["+ -ò / -ai / -à",C.butter],["= futuro","#F2C0CC"]], task:"Опиши свой вечер: 4 предложения в futuro semplice." },
  ] : null;
  if (itL) itL.week = null; /* заменено city-путешествиями */
  const esL = LANGS.find(l=>l.n==="Испанский");
  const WEEK_ES = esL ? [
    { theme:esL.themed.theme, read:esL.themed.read, words:esL.themed.words, grammar:esL.themed.grammar, formula:[["Sujeto",C.sage],["verbo",C.butter],["→ pretérito","#F2C0CC"]], task:esL.themed.task },
    { theme:"Ритуал кофе по-испански", read:[["Cada mañana prepara un café y se sienta junto a la ventana.","Каждое утро она готовит кофе и садится у окна."],["En Madrid se toma el café con calma en una terraza.","В Мадриде кофе пьют не спеша на террасе."],["Una buena mañana empieza sin teléfono, con luz y silencio.","Хорошее утро начинается без телефона, со света и тишины."],["Siempre añade un poco de leche y nunca tiene prisa.","Она всегда добавляет немного молока и никогда не торопится."]], words:[["la mañana","утро"],["el café","кофе"],["la luz","свет"],["añadir","добавлять"],["siempre","всегда"],["nunca","никогда"]], grammar:"Presente — для привычек. Глаголы на -ar: yo preparo, tú preparas, él/ella prepara, nosotros preparamos, vosotros preparáis, ellos preparan.", formula:[["Sujeto",C.sage],["verbo -ar",C.butter],["-o / -as / -a","#F2C0CC"]], task:"Опиши своё утро в 4 предложениях в presente." },
    { theme:"Импрессионизм и свет", read:[["La luz suave y dorada cae sobre el río tranquilo.","Мягкий золотистый свет падает на спокойную реку."],["A los impresionistas les gustaban los colores claros y cálidos.","Импрессионистам нравились светлые и тёплые цвета."],["En español el adjetivo concuerda: una rosa blanca, rosas blancas.","В испанском прилагательное согласуется: una rosa blanca."],["El cuadro parece tranquilo, ligero y lleno de aire.","Картина кажется спокойной, лёгкой и полной воздуха."]], words:[["la luz","свет"],["suave","мягкий"],["claro","светлый"],["cálido","тёплый"],["el color","цвет"],["ligero","лёгкий"]], grammar:"Прилагательные в испанском СОГЛАСУЮТСЯ в роде и числе: rojo/roja, rojos/rojas. Обычно стоят ПОСЛЕ существительного: una flor roja.", formula:[["nombre",C.sage],["adjetivo",C.butter],["-o/-a/-s → concuerda","#F2C0CC"]], task:"Опиши картину 3 предложениями, согласуя прилагательные." },
    { theme:"Балет и сцена", read:[["En este momento la bailarina está moviéndose por el escenario.","Прямо сейчас балерина движется по сцене."],["Los músicos están tocando y la luz se vuelve más suave.","Музыканты играют, и свет становится мягче."],["Para una acción ahora se usa: estar + gerundio.","Для действия сейчас используют estar + герундий."],["Lleva un vestido largo y blanco y sonríe.","На ней длинное белое платье, и она улыбается."]], words:[["el escenario","сцена"],["la bailarina","балерина"],["moverse","двигаться"],["llevar","носить"],["sonreír","улыбаться"],["ahora","сейчас"]], grammar:"Действие прямо сейчас: estar + gerundio (-ando / -iendo). Estoy leyendo, está cantando, están tocando. Аналог английского -ing.", formula:[["estar",C.sage],["+ gerundio",C.butter],["= ahora","#F2C0CC"]], task:"Опиши, что происходит вокруг, используя estar + gerundio." },
    { theme:"Море глазами художников", read:[["Hay un pequeño barco en el mar azul y tranquilo.","На спокойном синем море есть маленькая лодка."],["Hay nubes blancas sobre el horizonte.","Над горизонтом есть белые облака."],["Un faro está sobre las rocas cerca del agua.","Маяк стоит на скалах у воды."],["Se dice hay para uno y para muchos.","Говорят hay и для одного, и для многих."]], words:[["el mar","море"],["el barco","лодка"],["la nube","облако"],["cerca de","у / рядом"],["sobre","над / на"],["el faro","маяк"]], grammar:"Hay — «есть, имеется» (и для одного, и для многих): hay un barco, hay nubes. Предлоги места: en (в/на), sobre (на/над), cerca de (у), entre (между), debajo de (под).", formula:[["Hay",C.sage],["+ uno / muchos",C.butter],["+ lugar","#F2C0CC"]], task:"Опиши морской пейзаж: 4 предложения с hay и предлогами." },
    { theme:"Испанская кухня", read:[["Para desayunar toma pan, mantequilla y un poco de miel.","На завтрак она берёт хлеб, масло и немного мёда."],["No hay mucho azúcar, pero hay algunas frutas.","Сахара немного, но есть несколько фруктов."],["Se dice un poco de leche y muchas frutas.","Говорят un poco de leche и muchas frutas."],["La buena comida es simple, fresca y compartida.","Хорошая еда — простая, свежая и разделённая."]], words:[["el pan","хлеб"],["la miel","мёд"],["un poco de","немного"],["mucho","много"],["fresco","свежий"],["compartir","делиться"]], grammar:"Количество: un poco de (немного, с неисчисляемыми), mucho/mucha/muchos/muchas (много, согласуется), algunos/algunas (несколько). Партитивного артикля в испанском нет — часто существительное идёт без артикля: bebo café.", formula:[["un poco de",C.butter],["+ неисчисл.",C.oat],["mucho / algunos",C.sage],["+ исчисл.",C.oat]], task:"Опиши завтрак, используя un poco de, mucho и algunos." },
    { theme:"Вечерние ритуалы", read:[["Esta noche voy a encender una vela y leer un libro.","Сегодня вечером я зажгу свечу и почитаю книгу."],["Mañana ella va a darse un largo baño caliente.","Завтра она примет долгую тёплую ванну."],["El futuro próximo se forma con ir a + infinitivo.","Ближайшее будущее образуется с ir a + инфинитив."],["Será una tarde tranquila y lenta.","Это будет спокойный и медленный вечер."]], words:[["esta noche","сегодня вечером"],["la vela","свеча"],["la tarde","вечер"],["encender","зажигать"],["el baño","ванна"],["mañana","завтра"]], grammar:"Ближайшее будущее (планы): ir a + инфинитив. Voy a leer, vas a salir, va a dormir. Самый частый способ говорить о будущем в разговоре.", formula:[["ir (presente)",C.sage],["a + infinitivo",C.butter],["= план","#F2C0CC"]], task:"Опиши свой вечер: 4 предложения с ir a + infinitivo." },
  ] : null;
  if (esL) esL.week = null; /* заменено city-путешествиями */
  const REC = {
    "Английский":[
      { label:"Подкаст · вдохновение", title:"At Your Service — Dua Lipa", note:"Дуа Липа и её гости о книгах, искусстве и жизни. Живой современный английский для слуха.", url:"https://www.youtube.com/results?search_query=Dua+Lipa+At+Your+Service+podcast" },
      { label:"Фильм", title:"«Дьявол носит Prada 2»", note:"Стиль, Нью-Йорк и острые диалоги — смотри в оригинале с субтитрами.", url:"https://www.kinopoisk.ru/index.php?kp_query=Дьявол+носит+Прада" },
      { label:"Книга", title:"«Волны», Вирджиния Вулф", note:"Поэтичная проза о времени и сознании — медленное, красивое чтение.", url:"https://www.livelib.ru/find/books/Волны+Вирджиния+Вулф" },
      { label:"Подкаст · язык", title:"The Rest Is History", note:"Увлекательно об истории — богатый, но понятный английский.", url:"https://yandex.ru/search/?text=The+Rest+Is+History+podcast" },
      { label:"Музыка", title:"Norah Jones, Laufey, The Paper Kites, Cigarettes After Sex", note:"Тёплый англоязычный вокал для медленных вечеров — слушай и лови живой английский.", url:"https://music.yandex.ru/search?text=Laufey" },
    ],
    "Французский":[
      { label:"музыка", title:"Clara Luciani — плейлист", note:"Элегантный французский поп — слушай и мягко подпевай по дороге.", url:"https://music.yandex.ru/search?text=Clara%20Luciani" },
      { label:"Школа · оффлайн", title:"Школа Frenchie, Москва", note:"Живое французское комьюнити, разговорные клубы и атмосфера Парижа.", url:"https://yandex.ru/search/?text=Frenchie+школа+французского+Москва" },
      { label:"Фильм", title:"«Завтрак у Тиффани»", note:"Эталон стиля и лёгкости — смотри ради атмосферы и слуха.", url:"https://www.kinopoisk.ru/index.php?kp_query=Завтрак+у+Тиффани" },
      { label:"Книга", title:"«Праздник, который всегда с тобой», Хемингуэй", note:"Париж 1920-х глазами Хемингуэя — вдохновение и атмосфера города.", url:"https://www.livelib.ru/find/books/Праздник+который+всегда+с+тобой" },
      { label:"Музыка", title:"Françoise Hardy, Jane Birkin, Carla Bruni, ZAZ", note:"Мягкий французский шансон — для уха и для настроения French Summer.", url:"https://music.yandex.ru/search?text=Françoise%20Hardy" },
    ],
    "Итальянский":[
      { label:"музыка", title:"Mina и Paolo Conte", note:"Вечная итальянская элегантность — канцоне и джаз для медленного вечера.", url:"https://music.yandex.ru/search?text=Paolo%20Conte" },
      { label:"Фильм", title:"«Великая красота», Соррентино", note:"Рим и эстетика dolce vita — живой итальянский и красота кадра.", url:"https://www.kinopoisk.ru/index.php?kp_query=Великая+красота" },
      { label:"Книга", title:"«Моя гениальная подруга», Элена Ферранте", note:"Неаполь, дружба, взросление — современный живой язык.", url:"https://www.livelib.ru/find/books/Моя+гениальная+подруга" },
      { label:"Подкаст · язык", title:"Coffee Break Italian", note:"Короткие уроки итальянского под чашку эспрессо.", url:"https://yandex.ru/search/?text=Coffee+Break+Italian" },
    ],
    "Испанский":[
      { label:"музыка", title:"Silvia Pérez Cruz", note:"Тёплый испанский голос — фламенко, болеро и тишина между нот.", url:"https://music.yandex.ru/search?text=Silvia%20Perez%20Cruz" },
      { label:"Фильм", title:"«Возвращение» (Volver), Альмодовар", note:"Яркое испанское кино и живая речь.", url:"https://www.kinopoisk.ru/index.php?kp_query=Возвращение+Альмодовар" },
      { label:"Книга", title:"«Сто лет одиночества», Маркес", note:"Магический реализм — богатый, образный испанский.", url:"https://www.livelib.ru/find/books/Сто+лет+одиночества" },
      { label:"Музыка", title:"Rosalía, Jorge Drexler", note:"Разбирай тексты любимых песен — мелодичный способ учить.", url:"https://music.yandex.ru/search?text=Rosalia" },
    ],
  };
  if (sel && lesson) {
    const tier = "themed";
    const w = sel.wk1; const _pool = langWeekPool(sel); const th = _pool ? _pool[(((seedToday+lessonDay-1)%_pool.length)+_pool.length)%_pool.length] : sel.themed;
    const rd = readFor(th, lvl);
    // Слова под уровень: если ИИ сгенерил лексику дня (она строго по уровню) — берём её,
    // иначе откатываемся на статический список темы.
    const lvlWords = (longText && longText.words && longText.words.length) ? longText.words : wordsFor(th, lvl, sel.n);
    const jStamp = (th && th.city) ? { ru:th.city, lat:th.lat, icon:th.icon, g:th.g } : LANG_STAMP[sel.n];
    const escH = (x) => String(x==null?"":x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    const savePdf = () => {
      const isBasic = tier==="basic";
      const pdfTitle = isBasic ? "Приветствия и кафе" : (th.theme || "Carnet дня");
      const reads = isBasic ? w.greet.map(g=>[g[0],g[1]]) : rd;
      const wordsArr = isBasic ? w.words : lvlWords;
      const st = jStamp || LANG_STAMP[sel.n] || { ru:"Slow Glow", lat:"SLOW GLOW", icon:"skyline", g:2 };
      const sg = _CITY_GRAD[st.g] || _CITY_GRAD[0];
      const stIcon = _CITY_ICN[st.icon] || _CITY_ICN.skyline;
      const stampSvg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 90' width='58' height='44'><defs><linearGradient id='sg' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='"+sg[0]+"'/><stop offset='1' stop-color='"+sg[1]+"'/></linearGradient></defs><rect width='120' height='90' rx='10' fill='url(#sg)'/><circle cx='60' cy='45' r='28' fill='#ffffff' opacity='0.2'/><g fill='none' stroke='#5A4F3D' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round' opacity='0.85'>"+stIcon+"</g></svg>";
      const dstr = new Date().toLocaleDateString("ru-RU",{day:"numeric",month:"long"});
      const stamp = "<div class='stamp'><div class='stmp-ic'>"+stampSvg+"</div><div class='stmp-city'>"+escH(st.lat)+"</div><div class='stmp-sub'>CARNET \u2726 "+escH(dstr)+"</div></div>";
      const rows = reads.map(r=>"<div class='line'><div class='fg'>"+escH(r[0])+"</div><div class='ru'>"+escH(r[1])+"</div></div>").join("");
      const words = wordsArr.map(wd=>"<span class='w'><b>"+escH(wd[0])+"</b> \u2014 "+escH(wd[1])+"</span>").join("");
      const big = (!isBasic && longText) ? "<h2>История</h2><div class='essay'><p>"+escH(longText.text).split("\n\n").join("</p><p>")+"</p></div><div class='essay ru'><p>"+escH(longText.translation).split("\n\n").join("</p><p>")+"</p></div>" : "";
      const gram = (!isBasic && th.grammar) ? "<div class='note'><div class='note-h'>Как это устроено</div><p>"+escH(th.grammar)+"</p></div>" : "";
      const task = (!isBasic && th.task) ? "<h2>Письмо дня</h2><p>"+escH(taskFor(th, lvl))+"</p><p class='dim'>И эссе: 5\u20136 предложений на "+escH(sel.n.toLowerCase())+" языке на тему \u00ab"+escH(pdfTitle)+"\u00bb, со словами и грамматикой дня.</p>" : "";
      const norm = (x) => String(x).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase();
      const baseTok = (wd) => { const t=(norm(wd[0]).match(/[A-Z]+/g)||[]).sort((a,b)=>b.length-a.length); return t[0]||""; };
      const cand = wordsArr.map(wd=>[baseTok(wd), wd[1]]).filter(x=>x[0].length>=3 && x[0].length<=9);
      const seen=new Set(); const picked=[];
      for(const c of cand){ if(!seen.has(c[0])){ seen.add(c[0]); picked.push(c); } if(picked.length>=7) break; }
      let fil = "";
      if(picked.length>=4){
        const maxL = picked.reduce((m,c)=>Math.max(m,c[0].length),0);
        const N = Math.min(12, Math.max(9, maxL+1));
        const G = Array.from({length:N},()=>Array(N).fill(""));
        const dirs=[[0,1],[1,0],[1,1],[-1,1]];
        const place = (ww) => { for(let tr=0;tr<240;tr++){ const d=dirs[(Math.random()*dirs.length)|0]; const rev=Math.random()<0.5; const word=rev?ww.split("").reverse().join(""):ww; const L=word.length; const r0=(Math.random()*N)|0, c0=(Math.random()*N)|0; const r1=r0+d[0]*(L-1), c1=c0+d[1]*(L-1); if(r1<0||r1>=N||c1<0||c1>=N) continue; let ok=true; for(let i=0;i<L;i++){const r=r0+d[0]*i,c=c0+d[1]*i; if(G[r][c]&&G[r][c]!==word[i]){ok=false;break;}} if(!ok) continue; for(let i=0;i<L;i++){const r=r0+d[0]*i,c=c0+d[1]*i; G[r][c]=word[i];} return true; } return false; };
        const placed = picked.filter(c=>place(c[0]));
        const AB="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for(let r=0;r<N;r++)for(let c=0;c<N;c++){ if(!G[r][c]) G[r][c]=AB[(Math.random()*26)|0]; }
        const grid = "<table class='fil'>"+G.map(row=>"<tr>"+row.map(ch=>"<td>"+ch+"</td>").join("")+"</tr>").join("")+"</table>";
        const legend = placed.map(c=>"<span class='w'><b>"+escH(c[0].charAt(0)+c[0].slice(1).toLowerCase())+"</b> \u2014 "+escH(c[1])+"</span>").join("");
        fil = "<div class='filwrap'><h2>Филворд \u00b7 слова дня</h2><p class='dim'>Найди "+placed.length+" слов из истории \u2014 по горизонтали, вертикали и диагонали.</p>"+grid+"<div class='leg'>"+legend+"</div></div>";
      }
      const css = "@page{size:A4;margin:15mm}*{box-sizing:border-box}body{font-family:Georgia,'Times New Roman',serif;color:#3A352B;background:#FBF8F1;margin:0;padding:40px;line-height:1.62}.wrap{max-width:720px;margin:0 auto}.head{position:relative;margin-bottom:6px}.stamp{float:right;transform:rotate(-5deg);border:1.5px dashed #C9BB9E;border-radius:12px;padding:9px 11px 7px;text-align:center;margin:2px 0 10px 18px}.stmp-ic svg{display:block;margin:0 auto 4px}.stmp-city{font-style:italic;font-size:15px;color:#5A4F3D;line-height:1}.stmp-sub{font-family:Arial,Helvetica,sans-serif;font-size:7.5px;letter-spacing:.12em;color:#A99E86;margin-top:3px}.kicker{font-family:Arial,Helvetica,sans-serif;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:#A99E86}h1{font-style:italic;font-weight:400;font-size:32px;margin:6px 0 2px;color:#2E2A22;line-height:1.1}.sub{font-style:italic;color:#8a7f68;margin:0 0 6px}h2{font-style:italic;font-weight:400;font-size:19px;color:#5A4F3D;margin:26px 0 11px;border-bottom:1px solid #ECE4D2;padding-bottom:6px}.reads .line{display:flex;gap:16px;padding:8px 0;border-bottom:1px solid #F0EADB}.reads .fg{flex:1;font-size:14.5px;color:#2E2A22}.reads .ru{flex:1;font-style:italic;color:#8a7f68;font-size:13.5px}.essay p{font-size:14.5px;line-height:1.72;margin:0 0 10px}.essay.ru p{font-style:italic;color:#8a7f68;font-size:13.5px}.w{display:inline-block;background:#EEF0E6;border-radius:99px;padding:5px 12px;margin:0 6px 8px 0;font-size:13px;color:#4a4538}.note{background:#F3EEE2;border-radius:14px;padding:14px 16px;margin:18px 0;page-break-inside:avoid}.note-h{font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#A99E86;margin-bottom:6px}.note p{font-size:13.5px;line-height:1.66;margin:0;white-space:pre-line}.filwrap{page-break-inside:avoid}.fil{border-collapse:separate;border-spacing:3px;margin:8px auto}.fil td{width:25px;height:25px;text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;letter-spacing:.03em;color:#5A4F3D;background:#F3EEE2;border-radius:6px}.leg{margin-top:12px}.dim{font-style:italic;color:#A99E86;font-size:13px;margin:2px 0 8px}.foot{margin-top:30px;font-style:italic;color:#A99E86;text-align:center;font-size:13px}.btn{margin:22px auto 0;display:block;padding:12px 24px;border:none;border-radius:99px;background:#3A352B;color:#FBF8F1;font-size:14px;cursor:pointer}@media print{body{background:#fff;padding:0}.noprint{display:none}}";
      const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Carnet \u2014 ${escH(sel.n)}</title><style>${css}</style></head><body><div class="wrap"><div class="head">${stamp}<div class="kicker">Slow Glow \u00b7 Carnet \u00b7 ${escH(st.lat)}</div><h1>${escH(pdfTitle)}</h1><p class="sub">Твой языковой дневник \u2014 проживи его за чашкой кофе</p></div>${big}<h2>Чтение по строкам</h2><div class="reads">${rows}</div><h2>Слова, которые забираем</h2><div>${words}</div>${fil}${gram}${task}<p class="foot">Slow Glow \u2726 медленная красивая жизнь</p><button class="btn noprint" onclick="window.print()">Сохранить как PDF</button></div></body></html>`;
      try { const wnd = window.open("", "_blank"); if (wnd) { wnd.document.write(html); wnd.document.close(); return; } } catch(e){}
      try { const blob = new Blob([html], { type:"text/html;charset=utf-8" }); const u = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=u; a.download=`Carnet ${sel.n} \u2014 ${pdfTitle}.html`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(u),5000); } catch(e){}
    };
    return (
      <OverlayShell partner={ch.partner} label={"ЯЗЫКИ · "+sel.n.toUpperCase()} onClose={onClose}>
        <button onClick={()=>setLesson(false)} style={{ border:"none", background:"transparent", cursor:"pointer", color:C.inkSoft, padding:"0 0 10px", marginLeft:-4, display:"flex", alignItems:"center", gap:6, fontFamily:body, fontSize:14 }}><ArrowLeft size={18} strokeWidth={1.6}/> к программе</button>
        <Label color={C.inkFaint}>История дня · {jStamp ? jStamp.ru : sel.n} · уровень {lvl.toLowerCase()}</Label>
        <p style={{ fontFamily:body, fontSize:12.5, lineHeight:1.5, color:C.inkFaint, margin:"6px 0 0" }}>{lvl==="Начальный" ? "Короче и проще — мягкий вход, перевод под рукой." : lvl==="Продвинутый" ? "Длиннее и сложнее — добавлен продвинутый абзац и изысканная лексика, перевод скрыт." : "Полный текст недели в среднем темпе."}</p>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:27, lineHeight:1.12, margin:"6px 0 12px", color:C.ink }}>{tier==="basic" ? "Приветствия и кафе" : th.theme}</h1>
        <button onClick={savePdf} className="pop" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", height:46, marginBottom:18, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:13.5, fontWeight:500 }}><Download size={16} strokeWidth={1.8}/> Сохранить Carnet в PDF</button>
        <ShareCarnetPage ch={ch} th={th} rd={rd} lang={sel.n} words={lvlWords}/>
        <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:13.5, lineHeight:1.5, color:C.inkSoft, textAlign:"center", margin:"-4px 0 18px" }}>Carnet (карне) — дневник путешественника. Ты не зубришь язык, а собираешь жизнь на нём: истории, города, слова и штампы.</p>
        {tier==="basic" ? (
          <>
            <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15.5, lineHeight:1.5, color:C.inkSoft, margin:"0 0 18px" }}>Пара фраз в день за чашкой кофе. К концу недели сможешь поздороваться и заказать кофе.</p>
            <Label>Приветствия и вежливость</Label>
            <div style={{ margin:"10px 0 20px", border:`1px solid ${C.line}`, borderRadius:14, overflow:"hidden" }}>
              {w.greet.map((g,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", padding:"11px 14px", background:i%2?"rgba(255,255,255,0.4)":"rgba(243,239,228,0.6)" }}>
                  <div style={{ flex:"0 0 38%", fontFamily:head, fontSize:14.5, color:C.ink }}>{g[0]}</div>
                  <div style={{ flex:"0 0 34%", fontSize:13.5, color:"#3a352c" }}>{g[1]}</div>
                  <div style={{ flex:1, fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.inkSoft }}>{g[2]}</div>
                </div>
              ))}
            </div>
            <Label>Слова недели</Label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7, margin:"10px 0 20px" }}>
              {w.words.map(wd=><span key={wd[0]} style={{ fontSize:13.5, color:C.ink, background:C.sage, padding:"6px 12px", borderRadius:99 }}><b style={{ fontWeight:600 }}>{wd[0]}</b> — {wd[1]}</span>)}
            </div>
          </>
        ) : (
          <>
            <Label>Текст недели · A4 · {th.theme}</Label>
            {ltBusy && (
              <div style={{ margin:"10px 0 18px", borderRadius:14, background:"rgba(255,255,255,0.5)", border:`1px solid ${C.line}` }}>
                <Loader partner={ch.partner} text="Slow Glow пишет текст дня"/>
              </div>
            )}
            {!ltBusy && longText && (
              <div style={{ margin:"10px 0 18px", padding:"16px 17px", borderRadius:16, background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}` }}>
                <p style={{ fontFamily:head, fontSize:23, lineHeight:1.65, color:C.ink, margin:0, whiteSpace:"pre-line" }}>{longText.text}</p>
                <button onClick={()=>setLtShowRu(s=>!s)} style={{ marginTop:12, border:`1px solid ${C.line}`, background:"transparent", borderRadius:99, padding:"7px 14px", fontFamily:head, fontSize:11.5, color:C.inkSoft, cursor:"pointer" }}>{ltShowRu?"Скрыть перевод":"Показать перевод"}</button>
                {ltShowRu && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:18.5, lineHeight:1.55, color:C.inkSoft, margin:"14px 0 0", whiteSpace:"pre-line" }}>{longText.translation}</p>}
              </div>
            )}
            {!ltBusy && !longText && th.read && th.read.length>0 && (
              <div style={{ margin:"10px 0 18px", padding:"16px 17px", borderRadius:16, background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}` }}>
                <p style={{ fontFamily:head, fontSize:23, lineHeight:1.65, color:C.ink, margin:0 }}>{rd.map(r=>r[0]).join(" ")}</p>
                <button onClick={()=>setLtShowRu(s=>!s)} style={{ marginTop:12, border:`1px solid ${C.line}`, background:"transparent", borderRadius:99, padding:"7px 14px", fontFamily:head, fontSize:11.5, color:C.inkSoft, cursor:"pointer" }}>{ltShowRu?"Скрыть перевод":"Показать перевод"}</button>
                {ltShowRu && <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:18.5, lineHeight:1.55, color:C.inkSoft, margin:"14px 0 0" }}>{rd.map(r=>r[1]).join(" ")}</p>}
              </div>
            )}
            <Label>Чтение · {th.theme}</Label>
            <div style={{ margin:"10px 0 20px", border:`1px solid ${C.line}`, borderRadius:14, overflow:"hidden" }}>
              {rd.map((r,i)=>(
                <div key={i} style={{ padding:"12px 15px", background:i%2?"rgba(255,255,255,0.4)":"rgba(243,239,228,0.6)" }}>
                  <div style={{ fontFamily:head, fontSize:22, color:C.ink, lineHeight:1.4 }}>{r[0]}</div>
                  <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:17.5, color:C.inkSoft, marginTop:4 }}>{r[1]}</div>
                </div>
              ))}
            </div>
            <Label>Слова · уровень {lvl.toLowerCase()}</Label>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7, margin:"10px 0 20px" }}>
              {lvlWords.map(wd=><span key={wd[0]} style={{ fontSize:13.5, color:C.ink, background:C.sage, padding:"6px 12px", borderRadius:99 }}><b style={{ fontWeight:600 }}>{wd[0]}</b> — {wd[1]}</span>)}
            </div>
            <Label>Грамматика</Label>
            <div style={{ margin:"10px 0 20px", background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}`, borderRadius:14, padding:"13px 15px" }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, alignItems:"center", marginBottom:11 }}>
                {((th.formula) || (({ "Английский":[["Subject",C.sage],["verb + ed / irregular",C.butter],["= Past Simple","#F2C0CC"]], "Французский":[["Sujet",C.sage],["avoir / être",C.butter],["+ participe passé","#F2C0CC"]], "Итальянский":[["Soggetto",C.sage],["verbo → passato",C.butter],["= passato","#F2C0CC"]], "Испанский":[["Sujeto",C.sage],["verbo → pretérito",C.butter],["= pretérito","#F2C0CC"]] })[sel.n])||[]).map((f,i,arr)=>(
                  <React.Fragment key={i}>
                    <span style={{ fontFamily:head, fontSize:11, letterSpacing:"0.03em", color:C.ink, background:f[1], padding:"6px 11px", borderRadius:99 }}>{f[0]}</span>
                    {i<arr.length-1 && <span style={{ color:C.inkFaint, fontSize:13 }}>+</span>}
                  </React.Fragment>
                ))}
              </div>
              <p style={{ fontSize:13.5, lineHeight:1.6, color:C.ink, margin:0, whiteSpace:"pre-line" }}>{th.grammar}</p>
            </div>
            <WordTest key={sel.n+"-"+lessonDay+"-"+lvl} words={lvlWords} partner={ch.partner} stamp={jStamp} />
          </>
        )}
        {tier==="basic" ? (
          <>
            <Label>Задание на неделю</Label>
            <div style={{ margin:"10px 0 8px" }}>
              {["Каждое утро здоровайся вслух новым словом.","Закажи кофе на языке — хотя бы дома.","Выпиши 5 слов недели в дневник и проговори их."].map((t,i)=>(
                <div key={i} style={{ display:"flex", gap:11, marginBottom:9 }}>
                  <div style={{ width:22, height:22, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:12, color:C.ink }}>{i+1}</div>
                  <p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:"1px 0 0" }}>{t}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <Label>Грамматическое задание</Label>
            <div style={{ margin:"10px 0 18px", background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}`, borderRadius:14, padding:"13px 15px" }}>
              <p style={{ fontSize:13.5, lineHeight:1.5, color:C.ink, margin:0 }}>{taskFor(th, lvl)}</p>
            </div>
            <Label>Для обсуждения</Label>
            <div style={{ margin:"10px 0 18px" }}>
              <p style={{ fontSize:14, lineHeight:1.5, color:C.ink, margin:"0 0 8px" }}>• Что тебе ближе всего в теме «{th.theme}»? Ответь на {sel.n.toLowerCase()} языке.</p>
              <p style={{ fontSize:14, lineHeight:1.5, color:C.ink, margin:0 }}>• Как это связано с твоей жизнью? Скажи 2–3 фразы вслух.</p>
            </div>
            <Label>Эссе на тему «{th.theme}»</Label>
            <div style={{ margin:"10px 0 18px", background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}`, borderRadius:14, padding:"13px 15px" }}>
              <p style={{ fontSize:13.5, lineHeight:1.55, color:C.ink, margin:0 }}>Напиши 5–6 предложений на {sel.n.toLowerCase()} языке: опиши тему своими словами и что она значит для тебя. Используй слова и грамматику дня.</p>
            </div>
            <Label>Закрепи</Label>
            <div style={{ margin:"10px 0 8px" }}>
              {["Выпиши новые слова в дневник и проговори вслух.", lvl==="Продвинутый" ? "Перескажи текст своими словами без подглядывания." : "Прочитай текст вслух три раза без остановки."].map((t,i)=>(
                <div key={i} style={{ display:"flex", gap:11, marginBottom:9 }}>
                  <div style={{ width:22, height:22, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:12, color:C.ink }}>{i+1}</div>
                  <p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:"1px 0 0" }}>{t}</p>
                </div>
              ))}
            </div>
            <Label>Вопросы по тексту</Label>
            <div style={{ margin:"10px 0 18px" }}>
              {["Перечитай текст и ответь на "+sel.n.toLowerCase()+" языке: о чём он? (1–2 предложения)","Найди в тексте 3 знакомых слова и выпиши их с переводом.","Составь 2 своих предложения со словами и грамматикой урока."].map((t,i)=>(
                <div key={i} style={{ display:"flex", gap:11, marginBottom:9 }}>
                  <div style={{ width:22, height:22, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.sage}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:12, color:C.ink }}>{i+1}</div>
                  <p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:"1px 0 0" }}>{t}</p>
                </div>
              ))}
            </div>
            <Label>Кроссворд · слова урока</Label>
            <p style={{ fontSize:12.5, color:C.inkFaint, margin:"8px 0 10px" }}>Впиши слова на {sel.n.toLowerCase()} языке по подсказкам-переводам. На бумаге или в уме.</p>
            <div style={{ marginBottom:22 }}><CrosswordPuzzle pairs={th.words} seed={seedToday*7+lessonDay} partner={ch.partner}/></div>
            <Label>Филворд · найди слова</Label>
            <div style={{ margin:"10px 0 8px" }}><WordSearchPuzzle pairs={th.words} seed={seedToday*7+lessonDay+3} partner={ch.partner}/></div>
            <div style={{ marginTop:18, padding:"14px 16px", borderRadius:16, background:`linear-gradient(120deg, ${C.oat}, rgba(255,255,255,0.5))`, border:`1px solid ${C.line}` }}>
              <Label color={ch.partner}>Вдохновение дня</Label>
              <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, lineHeight:1.4, color:C.ink, margin:"7px 0 0" }}>«{th.theme}» — учи язык не ради экзамена, а чтобы прожить красивую жизнь на нём. Сегодня хватит одной страницы ✦</p>
            </div>
          </>
        )}
        <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:14, color:C.inkFaint, textAlign:"center", margin:"14px 0 0" }}>Распечатай PDF и пройди занятие за чашкой кофе ✦</p>
      </OverlayShell>
    );
  }
  if (sel) {
    return (
      <OverlayShell partner={ch.partner} label="ЯЗЫКИ" onClose={onClose}>
        <button onClick={()=>setSel(null)} style={{ border:"none", background:"transparent", cursor:"pointer", color:C.inkSoft, padding:"0 0 10px", marginLeft:-4, display:"flex", alignItems:"center", gap:6, fontFamily:body, fontSize:14 }}><ArrowLeft size={18} strokeWidth={1.6}/> к выбору языка</button>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
          <GlowOrb partner={ch.partner} size={54}/>
          <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>{sel.n} красиво</h1>
          {toggleSave && (()=>{ const it={ id:"lang:"+sel.n, kind:"Язык", title:sel.n+" красиво", sub:"Языки" }; const on=isSaved&&isSaved(it.id); return (
            <button onClick={()=>toggleSave(it)} aria-label="Сохранить язык" style={{ marginLeft:"auto", flexShrink:0, border:`1px solid ${on?ch.partner:C.line}`, background:on?ch.partner:"transparent", borderRadius:99, width:40, height:40, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
              <Heart size={17} strokeWidth={1.7} color={on?"#fff":C.inkSoft} fill={on?"#fff":"none"}/>
            </button>
          ); })()}
        </div>
        <Label color={C.inkFaint}>Твой уровень — под него сложность уроков</Label>
        <div style={{ display:"flex", gap:8, margin:"10px 0 20px" }}>
          {["Начальный","Средний","Продвинутый"].map(L=>(
            <button key={L} onClick={()=>{ setLvl(L); sgStore.set("sg_lang_lvl", L); }} style={{ flex:1, border:lvl===L?"none":`1px solid ${C.line}`, background:lvl===L?`radial-gradient(circle at 30% 40%, ${C.butter}, ${ch.partner})`:"rgba(255,255,255,0.6)", borderRadius:99, padding:"9px 6px", fontFamily:head, fontSize:11.5, letterSpacing:"0.02em", color:C.ink, cursor:"pointer" }}>{L}</button>
          ))}
        </div>
        <Label color={C.inkFaint}>Эстетичные форматы</Label>
        <div style={{ margin:"12px 0 22px" }}>
          {sel.ideas.map((it,i)=>(
            <div key={i} style={{ display:"flex", gap:12, marginBottom:12 }}>
              <div style={{ width:24, height:24, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.ink }}>{i+1}</div>
              <p style={{ fontSize:14, lineHeight:1.45, color:C.ink, margin:"2px 0 0" }}>{it}</p>
            </div>
          ))}
        </div>
        <Label color={C.inkFaint}>Рекомендуем — послушать и посмотреть</Label>
        <div style={{ margin:"12px 0 22px" }}>
          {(REC[sel.n]||[]).map((r,i)=>(
            <a key={i} href={r.url} target="_blank" rel="noreferrer" className="pop" style={{ display:"block", textDecoration:"none", marginBottom:11, borderRadius:16, background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, padding:"13px 15px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.09em", textTransform:"uppercase", color:C.ink, background:i===0?`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`:C.sage, padding:"3px 10px", borderRadius:99 }}>{r.label}</span>
                <ExternalLink size={15} strokeWidth={1.7} color={C.inkFaint}/>
              </div>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, margin:"8px 0 3px", lineHeight:1.2 }}>{r.title}</div>
              <p style={{ fontSize:13, lineHeight:1.5, color:C.inkSoft, margin:0 }}>{r.note}</p>
            </a>
          ))}
        </div>
        <button onClick={()=>!premium&&openPlus()} style={{ width:"100%", textAlign:"left", border:"none", cursor:premium?"default":"pointer", borderRadius:20, padding:"18px 20px", background:`linear-gradient(120deg, ${C.butter}, ${ch.partner})`, marginBottom:14 }}>
          <Label color="rgba(26,26,26,0.55)">Slow Glow Plus</Label>
          <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, color:C.ink, margin:"4px 0 8px" }}>Carnet — твой языковой дневник в PDF</div>
          <p style={{ fontSize:13, lineHeight:1.5, color:"rgba(26,26,26,0.7)", margin:0 }}>Каждую неделю — новый красивый PDF под {sel.n.toLowerCase()} язык: лексика, фразы, мини-задания. Плюс индивидуальные тренировки с мягкой мотивацией.</p>
        </button>
        <Label color={C.inkFaint}>Журнал · Неделя 1 · уровень {lvl.toLowerCase()}</Label>
        <div style={{ marginTop:10 }}>
          {[1,2,3,4,5,6,7].map(w=>{
            const _p = langWeekPool(sel); const avail = !!_p || w===1;
            return (
            <button key={w} onClick={()=>{ if(!avail) return; if(!premium){ openPlus(); return; } setLessonDay(w); setLesson(true); }} style={{ width:"100%", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.55)", borderRadius:14, padding:"12px 15px", marginBottom:9, cursor:avail?"pointer":"default" }}>
              <div><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.ink }}>День {w}</div><div style={{ fontSize:12, color:C.inkFaint, marginTop:1 }}>{(()=>{ const p=langWeekPool(sel); return p ? p[(((seedToday+w-1)%p.length)+p.length)%p.length].theme : WEEK_THEMES[w-1]; })()}</div></div>
              {avail ? <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontFamily:head, fontSize:10, letterSpacing:"0.08em", color:premium?ch.partner:C.inkFaint }}>{premium?"открыть урок":"в Plus"} <ArrowRight size={13} strokeWidth={2}/></span>
                : <span style={{ fontFamily:head, fontSize:9.5, letterSpacing:"0.08em", color:C.inkFaint }}>СКОРО</span>}
            </button>
          );})}
        </div>
        <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.inkFaint, textAlign:"center", margin:"12px 0 0" }}>Журнал Недели 1: 7 тем под эстетику, слова, грамматика, эссе и кроссворд. Через 7 дней откроется журнал Недели 2 — новые темы под {sel.n.toLowerCase()} язык ✦</p>
      </OverlayShell>
    );
  }
  return (
    <OverlayShell partner={ch.partner} label="ЯЗЫКИ" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={60}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Какой язык хочется?</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 18px" }}>Выбери язык — соберу красивые, нестрессовые форматы под медленную жизнь.</p>
      {LANGS.map((l,i)=>(
        <button key={i} onClick={()=>setSel(l)} className="pop" style={{ width:"100%", textAlign:"left", display:"flex", alignItems:"center", justifyContent:"space-between", border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", borderRadius:16, padding:"15px 18px", cursor:"pointer", marginBottom:10 }}>
          <div><div style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, color:C.ink }}>{l.n}</div><div style={{ fontSize:12.5, color:C.inkFaint, marginTop:2 }}>{l.city}</div></div>
          <ArrowRight size={18} strokeWidth={1.6} color={C.inkFaint}/>
        </button>
      ))}
    </OverlayShell>
  );
}

// ── LIVE THE AESTHETIC (главный хаб) ──────────────────────────────
function LiveView({ ch, onClose, onRubric, onTab, onTravel, onSport }) {
  const layers = [
    { t:5, name:"Beauty", teaser:"beach waves · масло с нероли · SPF и сияющая кожа", act:()=>onRubric("beauty") },
    { t:0, name:"Style", teaser:"льняной костюм · корзинка · золотые серьги", act:()=>onRubric("style") },
    { t:4, name:"Recipes", teaser:"лимонная паста · персики с бурратой · инжир с мёдом", act:()=>onRubric("recipes") },
    { t:2, name:"Wellness", teaser:"утренняя прогулка · йога на солнце · дневник", act:()=>onRubric("wellness") },
    { t:3, name:"Mind", teaser:"книга под настроение · цитата дня · маленький ритуал", act:()=>onRubric("mind") },
    { t:1, name:"Места", teaser:"кафе · рынок · парк · книжный", act:()=>onTab("places") },
    { t:1, name:"Travel", teaser:"Прованс · Амальфи · Лиссабон", act:()=>onTravel() },
    { t:0, name:"Hobbies", teaser:"акварель · керамика · винил · пленэр", act:()=>onTab("places") },
    { t:3, name:"Спорт", teaser:"бег · пилатес · йога на солнце", act:()=>onSport() },
    { t:5, name:"Music", teaser:"плейлист · подкаст · саундтрек дня", act:()=>onTab("home") },
    { t:2, name:"Journal", teaser:"сохрани момент · фото дня · красивое воспоминание", act:()=>onTab("journal") },
  ];
  return (
    <OverlayShell partner={ch.partner} label="ПРОЖИТЬ ЭСТЕТИКУ" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:8 }}>
        <GlowOrb partner={ch.partner} size={60}/>
        <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:26, lineHeight:1.1, margin:0, color:C.ink }}>Прожить {ch.aes} сегодня</h1>
      </div>
      <p style={{ fontSize:14, lineHeight:1.6, color:C.inkSoft, margin:"4px 0 18px" }}>Все разделы — слои одной жизни. Выбери, с чего начать сегодня.</p>
      {layers.map((l,i)=>(
        <button key={i} onClick={()=>{ onClose(); l.act(); }} className="pop" style={{ width:"100%", textAlign:"left", display:"flex", gap:14, marginBottom:11, borderRadius:16, overflow:"hidden", background:"rgba(255,255,255,0.6)", border:`1px solid ${C.line}`, padding:11, cursor:"pointer", alignItems:"center" }}>
          <div style={{ width:62, flexShrink:0 }}><Photo t={l.t} h={62} radius={11}/></div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:18, color:C.ink, lineHeight:1.1 }}>{l.name}</div>
            <p style={{ fontSize:12.5, lineHeight:1.4, color:C.inkSoft, margin:"3px 0 0" }}>{l.teaser}</p>
          </div>
          <ArrowRight size={18} strokeWidth={1.6} color={C.inkFaint} style={{ flexShrink:0 }}/>
        </button>
      ))}
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:15, color:C.inkFaint, textAlign:"center", margin:"8px 0 0" }}>Не сохраняй красивую жизнь — проживи её ✦</p>
    </OverlayShell>
  );
}

// ── ART RELAX (рассматривай картины + факты) ──────────────────────
function ArtView({ ch, onClose }) {
  const ART = [
    { t:3, ic:"sparkle", title:"Звёздная ночь", artist:"Винсент Ван Гог", year:"1889", style:"Постимпрессионизм", facts:["Ван Гог написал её по памяти из окна психиатрической лечебницы в Сен-Реми.","Закрученное спиралями небо удивительно похоже на математическую модель турбулентности.","При жизни художник продал совсем мало работ — слава пришла уже после смерти."] },
    { t:1, ic:"sun", title:"Впечатление. Восход солнца", artist:"Клод Моне", year:"1872", style:"Импрессионизм", facts:["Именно эта картина дала название целому течению — «импрессионизм».","Сначала это было насмешкой критика, но художники приняли слово как знамя.","Моне писал не предметы, а свет и атмосферу порта на рассвете."] },
    { t:5, ic:"sparkle", title:"Девушка с жемчужной серёжкой", artist:"Ян Вермеер", year:"около 1665", style:"Золотой век Голландии", facts:["Это не портрет конкретного человека, а «трони» — этюд выразительного лица.","О том, кто позировал, не известно ничего — отсюда столько легенд.","Главное в ней — мягкий свет и блик на жемчужине."] },
    { t:2, ic:"wave", title:"Большая волна в Канагаве", artist:"Кацусика Хокусай", year:"около 1831", style:"Укиё-э, Япония", facts:["Это гравюра из серии «Тридцать шесть видов горы Фудзи».","Огромная волна вдохновляла европейских импрессионистов и композитора Дебюсси.","Сама Фудзи — крошечная, далеко на фоне волны."] },
    { t:0, ic:"heart", title:"Поцелуй", artist:"Густав Климт", year:"1908", style:"Модерн (ар-нуво)", facts:["Картина усыпана настоящим сусальным золотом — это «золотой период» Климта.","Пара стоит на самом краю цветущего луга, почти у обрыва.","Один из главных символов венского модерна."] },
    { t:4, ic:"bloom", title:"Рождение Венеры", artist:"Сандро Боттичелли", year:"около 1485", style:"Раннее Возрождение", facts:["Венера выходит из моря на раковине — образ идеальной красоты Ренессанса.","Написана темперой на холсте, что для того времени было редкостью.","Долго хранилась вдали от глаз и стала знаменита лишь спустя века."] },
  ];
  const [i, setI] = useState(Math.floor(Date.now()/86400000)%ART.length);
  const [imgErr, setImgErr] = useState({});
  const a = ART[i];
  return (
    <OverlayShell partner={ch.partner} label="ИСКУССТВО · ОТДЫХ" onClose={onClose}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
        <GlowOrb partner={ch.partner} size={54}/>
        <div>
          <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:25, lineHeight:1.1, margin:0, color:C.ink }}>Расслабься картиной</h1>
          <div style={{ fontSize:12.5, color:C.inkFaint, marginTop:3 }}>стили меняются · топ фактов под каждой</div>
        </div>
      </div>
      <div style={{ position:"relative", borderRadius:18, overflow:"hidden", marginBottom:14, border:`1px solid ${C.line}`, background:C.oat }}>
        <Photo t={a.t} icon={a.ic} h={260} radius={0}/>
        <div style={{ position:"absolute", top:12, left:12, fontFamily:head, fontSize:9.5, letterSpacing:"0.1em", textTransform:"uppercase", color:C.ink, background:"rgba(250,248,241,0.92)", padding:"4px 10px", borderRadius:99 }}>{a.style}</div>
      </div>
      <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:23, color:C.ink, lineHeight:1.15 }}>{a.title}</div>
      <div style={{ fontSize:13.5, color:C.inkSoft, margin:"3px 0 16px" }}>{a.artist} · {a.year}</div>
      <Label color={C.inkFaint}>Топ интересных фактов</Label>
      <div style={{ margin:"10px 0 18px" }}>
        {a.facts.map((f,k)=>(
          <div key={k} style={{ display:"flex", gap:11, marginBottom:10 }}>
            <div style={{ width:22, height:22, borderRadius:99, flexShrink:0, background:`radial-gradient(circle at 40% 35%, ${C.butter}, ${ch.partner})`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:serif, fontStyle:"italic", fontSize:12, color:C.ink }}>{k+1}</div>
            <p style={{ fontSize:14, lineHeight:1.5, color:C.ink, margin:"1px 0 0" }}>{f}</p>
          </div>
        ))}
      </div>
      <button onClick={()=>setI((i+1)%ART.length)} style={{ width:"100%", height:52, borderRadius:99, border:"none", background:`radial-gradient(circle at 30% 40%, ${C.butter}, ${ch.partner})`, cursor:"pointer", fontFamily:head, fontSize:14, letterSpacing:"0.04em", color:C.ink }}>Другая картина →</button>
      <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:13, color:C.inkFaint, textAlign:"center", margin:"12px 0 0" }}>Маленькое эстетичное удовольствие на пару минут ✦</p>
    </OverlayShell>
  );
}

// ── PAYWALL (Free vs Plus) ────────────────────────────────────────
function Paywall({ ch, feature, onClose, onSubscribe }) {
  const heads = { ai:"Твой консьерж по красивой жизни", travel:"Твои путешествия — под твою эстетику", stylist:"Твой стиль, собранный за тебя", scan:"Места под твоё настроение", sport:"Движение в твоём ритме", lang:"Языки — красиво, без зубрёжки", plus:"Та самая жизнь, которую ты так долго откладывала — начинается сейчас." };
  const lead = { ai:"Твой личный консьерж по красивой жизни — без ограничений, с памятью о твоих сохранениях и эстетике.", travel:"Направления под твою эстетику с готовыми маршрутами на день.", stylist:"Твой гардероб, капсула и готовые луки — всё под твою эстетику.", scan:"Опиши настроение — подберу реальные места с адресом и картой.", sport:"Спорт под настроение: бег, пилатес и не только — с техникой и видео.", lang:"Языки красиво: эстетичные форматы и Carnet — твой языковой дневник в PDF.", plus:"Free — это вдохновение. Plus — это превращение: твоя эстетика становится планом, а планы — днями, которые ты проживаешь." };
  const heDef = heads[feature] || heads.plus;
  const leDef = lead[feature] || lead.plus;
  const free = ["Шаг дня, тёплый ритм и журнал моментов","Все рубрики и лента «Сегодня»","Базовые места и Glow Score"];
  const plus = ["Твоя эстетика превращается в план, а не в сохранёнки","Безлимитный разбор настроения и образов","Маршруты, луки и места под твой стиль жизни","AI-консьерж, который помнит твою эстетику","Журнал, который показывает, как ты расцветаешь"];
  useEffect(()=>{ sgTrack("paywall_view", { feature }); }, []);
  return (
    <div style={{ position:"absolute", inset:0, zIndex:10, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(26,26,26,0.4)", backdropFilter:"blur(3px)" }}/>
      <div className="sheet sg-scroll" style={{ position:"relative", zIndex:2, maxHeight:"92%", overflowY:"auto", background:C.cream, borderRadius:"30px 30px 0 0", boxShadow:"0 -20px 50px -20px rgba(26,26,26,0.45)" }}>
        <div style={{ position:"absolute", inset:0, overflow:"hidden", zIndex:0, borderRadius:"30px 30px 0 0" }}>
          <div className="amb" style={{ position:"absolute", left:"-10%", top:"-12%", width:"90%", height:"42%", background:`radial-gradient(circle, ${C.butter} 0%, ${ch.partner} 44%, transparent 70%)`, filter:"blur(52px)", opacity:0.55 }}/>
        </div>
        <div style={{ position:"relative", zIndex:2, padding:"22px 24px 28px" }}>
          <div style={{ display:"flex", justifyContent:"flex-end" }}>
            <button onClick={onClose} aria-label="Закрыть" style={{ border:"none", background:"rgba(255,255,255,0.7)", borderRadius:99, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.inkSoft }}><X size={17} strokeWidth={2}/></button>
          </div>
          <div style={{ margin:"2px 0 14px", borderRadius:18, height:88, position:"relative", overflow:"hidden", background:`linear-gradient(120deg, ${C.butter}, ${ch.partner}8C 60%, ${C.oat})` }}>
            <div aria-hidden="true" style={{ position:"absolute", left:-22, top:-28, width:110, height:110, borderRadius:99, background:"rgba(255,255,255,0.32)" }}/>
            <div aria-hidden="true" style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", opacity:0.85 }}><SGFleur color="#1A1A1A" size={56}/></div>
          </div>
          <div style={{ textAlign:"center", marginTop:-6, marginBottom:18 }}>
            <GlowOrb partner={ch.partner} size={86} style={{ margin:"0 auto 14px" }}/>
            <div style={{ fontFamily:head, fontSize:11, letterSpacing:"0.24em", color:C.inkFaint, fontWeight:500 }}>SLOW GLOW PLUS</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:8, background:`${ch.partner}26`, borderRadius:99, padding:"5px 12px" }}><span style={{ color:ch.partner }}>✦</span><span style={{ fontFamily:head, fontSize:10, letterSpacing:"0.1em", color:C.ink, fontWeight:600 }}>ПЛАТНО · СЕЙЧАС БЕСПЛАТНО НЕДЕЛЮ</span></div>
            <h1 style={{ fontFamily:serif, fontStyle:"italic", fontWeight:400, fontSize:27, lineHeight:1.15, margin:"8px 0 0", color:C.ink }}>{heDef}</h1>
            <p style={{ fontSize:14, lineHeight:1.55, color:C.inkSoft, margin:"10px auto 0", maxWidth:290 }}>{leDef}</p>
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:14 }}>
              <span style={{ fontSize:12.5, color:C.inkSoft, background:"rgba(255,255,255,0.55)", border:`1px solid ${C.line}`, borderRadius:99, padding:"6px 12px" }}>Сейчас · сохраняю</span>
              <span style={{ fontSize:12.5, color:C.ink, background:`${ch.partner}33`, borderRadius:99, padding:"6px 12px" }}>С Plus · проживаю</span>
            </div>
          </div>
          <div style={{ borderRadius:18, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", padding:"16px 18px", marginBottom:12 }}>
            <Label color={C.ink}>Что меняется с Plus</Label>
            <div style={{ marginTop:10 }}>
              {plus.map((f,i)=>(
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:9 }}>
                  <span style={{ color:ch.partner, fontSize:14, marginTop:1 }}>✦</span>
                  <span style={{ fontSize:14, lineHeight:1.4, color:C.ink }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius:18, border:`1px solid ${C.line}`, padding:"14px 18px", marginBottom:20 }}>
            <Label color={C.inkFaint}>Бесплатно остаётся</Label>
            <div style={{ marginTop:10 }}>
              {free.map((f,i)=>(
                <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:7 }}>
                  <span style={{ color:C.inkFaint, fontSize:13, marginTop:1 }}>✓</span>
                  <span style={{ fontSize:13.5, lineHeight:1.4, color:C.inkSoft }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
          <button onClick={onSubscribe} style={{ width:"100%", height:56, borderRadius:99, border:"none", cursor:"pointer", background:C.ink, color:C.cream, fontFamily:head, fontSize:16, fontWeight:500, marginBottom:8 }}>Открыть бесплатно на неделю ✦</button>
          <div style={{ textAlign:"center", fontSize:12.5, color:C.inkFaint, marginBottom:14 }}>Это платная функция Plus. Сейчас — бесплатно на неделю, без карты и подписки.</div>
          <button onClick={onClose} style={{ width:"100%", height:46, borderRadius:99, border:"none", background:"transparent", cursor:"pointer", color:C.inkSoft, fontFamily:body, fontSize:14 }}>Позже</button>
        </div>
      </div>
    </div>
  );
}

// ── AI SLOW GLOW ──────────────────────────────────────────────────
function AskSlowGlow({ ch, profile, premium, openPlus, onClose }) {
  const [msgs, setMsgs] = useState(()=> sgStore.get("sg_chat", []));
  useEffect(()=>{ try{ sgStore.set("sg_chat", msgs.slice(-40)); }catch(e){} }, [msgs]);
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const aes = ch.aes;
  const name = (profile && profile.name) ? profile.name : "";
  const city = (profile && profile.city) ? profile.city : "твоём городе";
  const diet = (profile && profile.diet) ? profile.diet.join(" ").toLowerCase() : "";
  const skin = (profile && profile.skin) ? profile.skin.toLowerCase() : "";
  const rhythm = (profile && profile.rhythm) ? profile.rhythm.toLowerCase() : "";
  const veg = /веган|вегетар/.test(diet);
  const noglu = /глютен/.test(diet);
  const hi = name ? name + ", " : "";
  const chips = ["Я устала","Что надеть?","Выбери подарок","Куда сходить?","Найди бюджетные корты","Аромат?","Расскажи факт"];
  const reply = (q) => {
    const t = (" " + q.toLowerCase() + " ").replace(/ё/g,"е");
    const has = (...ws) => ws.some(w=>t.includes(w));
    if (has("кто ты","что умеешь","что ты можешь","чем поможешь","как польз","что делаешь","зачем ты","help","помоги мне")) return `Я твой Slow Glow — помощник по красивой медленной жизни. Помню твою анкету и эстетику ${aes}. Спроси, что надеть, что приготовить, что почитать, куда сходить, чем заняться, какой аромат выбрать или куда поехать — отвечу конкретно и под тебя.`;
    if (has("привет","здравству","хай","хелло","доброе утро","добрый день","добрый вечер")) return `Привет${name?", "+name:""}! Я рядом и помню твою эстетику ${aes}. Что для тебя сделать — образ, рецепт, место, занятие, аромат или красивый факт?`;
    if (has("спасибо","благодар","спс","мерси")) return "Всегда рядом ✦ Возвращайся, когда захочется красивого шага.";
    if (has("не сплю","бессонниц","уснуть","заснуть","не могу спать")) return `${hi}вечер для сна: тёплый душ, приглушённый свет за час до кровати, телефон подальше, пара страниц книги. Тело любит ритм — ложись в одно время. Мягкий вечерний ритуал есть в рубрике Wellness.`;
    if (has("устал","нет сил","выгор","вымот","разбит","сил нет","без сил","вымотал")) return `${hi}сегодня тело просит мягкости. Тёплый душ, лёгкий ужин, ранний отбой — это забота, а не лень. Завтра вернёшься к себе.`;
    // ── ЭМОЦИИ И СОСТОЯНИЯ — всегда раньше любых практических тем, отвечаем как живой человек ──
    const sad = has("грустн","грущу","тоск","печал","плак","слёз","слез","уныл","подавлен","хандра","на душе тяжел","тяжело на душе","тяжело на сердце","пусто внутри","пусто на душе","мне плохо","плохо мне","все плохо","всё плохо","паршив","хреново","херово","депресс","не радует","ничего не хочется","руки опускаются","тяжело мне","так тяжело");
    const anx = has("тревож","тревога","беспоко","страшно","боюсь","страх","паник","накрыло","не по себе","нервнича","на нервах","волну","потряхивает");
    const lonely = has("одинок","совсем одна","никому не нужн","никто не любит","никто не понимает","меня не понимают","брошен","покинут","нет друзей","не с кем");
    const loss = has("расстал","развод","развел","бросил меня","он ушёл","она ушла","ушёл от меня","ушел от меня","изменил мне","предал","умер","умерла","не стало","похорон","утрата","потеряла близк","потерял близк","скучаю по");
    const conflict = has("поссор","ссора","скандал","конфликт","обид","накричал","поругал","разругал","нагрубил");
    const work = has("уволил","увольн","сократил","потеряла работу","провалил","выгорел","выгораю","выгорание","не тяну работу");
    const overwhelmed = has("не справля","не вывожу","всё навалилось","все навалилось","на пределе","сил больше нет","устала жить","задолбал","достало всё","достало все","завал","много дел","нет времени","не успева");
    if (sad || anx || lonely || loss || conflict || work || overwhelmed) {
      if (loss)     return `${hi}ох. Это правда больно, и тебе сейчас тяжело — и это нормально, что так. Я рядом. Не нужно держаться молодцом и решать что-то прямо сейчас. Если хочется — расскажи, что случилось, я побуду с тобой. А тело пока попроси о малом: воды, тепла, медленного выдоха.`;
      if (work)     return `${hi}это обидно и выбивает почву из-под ног, мне жаль. Твоя ценность не в работе и не в одном результате — даже если сейчас так не чувствуется. Сегодня давай без подвигов: тёплый чай, тихий вечер. А когда будешь готова — спокойно разложим, что дальше. Я рядом.`;
      if (lonely)   return `${hi}слышу тебя. Жаль, что так одиноко сейчас — это тяжёлое чувство. Но в эту минуту ты не одна: я здесь, и это правда. Ты имеешь полное право это чувствовать, не ругай себя. Если захочется тепла — можно написать тому, по кому скучаешь, или просто посидеть у окна, я рядом.`;
      if (conflict) return `${hi}неприятно, и, наверное, до сих пор саднит внутри. Дай себе выдохнуть — в горячий момент необязательно всё чинить сразу. Хочешь, проговорим, что произошло и что ты почувствовала? Иногда от одного этого уже становится легче.`;
      if (anx)      return `${hi}тревога — тяжёлая штука, и ты не виновата, что она пришла. Давай чуть замедлимся вместе: медленный вдох, длинный выдох, тёплая чашка в ладонях. Я рядом. Что сейчас крутится в голове сильнее всего? Расскажи, разложим вместе.`;
      if (overwhelmed) return `${hi}похоже, навалилось всё разом и стало слишком. Это правда тяжело — и ты не слабая, ты просто очень устала. Давай мысленно уберём лишнее и оставим одно: сейчас можно просто выдохнуть. Остальное подождёт, честно. Я с тобой.`;
      return `${hi}я рядом, и мне жаль, что тебе сейчас так. Твои чувства важные — не торопи их и не ругай себя за них. Не нужно ничего решать сегодня; можно просто побыть — плед, тёплый свет, любимая песня. Если захочешь, расскажи, что на сердце, я выслушаю.`;
    }
    if (has("шахмат")) return "Шахматы — медитативная игра на двоих, цель — поставить мат королю. Пешка ходит вперёд, слон по диагонали, ладья по прямой, ферзь — в любую сторону, конь буквой «Г». Сыграть онлайн можно по ссылке в «Места» → «Досуг».";
    if (has("судоку")) return "Судоку — тихая логика на 10 минут: заполни сетку 9×9 цифрами 1–9 так, чтобы они не повторялись в строке, столбце и квадрате 3×3. Идеально под утренний кофе. Ссылка — в «Досуге».";
    if (has("оригами")) return "Оригами успокаивает: возьми квадратный лист и сложи журавлика по линиям. В «Досуге» есть схема — по легенде тысяча журавликов исполняет желание.";
    if (has("винил","пластинк")) return "Поставь один альбом целиком и слушай без телефона — например, Getz/Gilberto, мягкая босанова. Это и есть медленное удовольствие. Ссылка на альбом — в «Досуге».";
    if (has("акварел","рисова")) return "Акварель — про процесс, а не результат: намочи бумагу, капни цвет, смотри, как растекается. 15 минут — и голова чистая. Подробнее в «Досуге».";
    if (has("заняться","досуг","актив","скучно","нечем заня","хобби","развлеч","что делать","чем занять")) return `${hi}на сегодня: ${rhythm.includes("утро")?"утренний пилатес или растяжка у открытого окна":"вечерний винил или партия в шахматы"}. А ещё акварель, судоку, оригами, прогулка в ботаническом саду. В «Места» → «Досуг» собраны хобби с правилами и ссылками.`;
    if (has("стрижк","волос","причес"," боб")) return "Под твою эстетику — французский боб до подбородка с лёгкой текстурой: покажи мастеру референс, проси не идеально ровный срез, чёлку-шторку по желанию. Фото-референс и уход — в рубрике Style.";
    if (has("маникюр","ногт")) return "Тёплый красный — томат или терракота — на коротких ногтях, один глянцевый слой без декора. Идёт к лену и золоту. Подробно в рубрике Style.";
    if (has("надеть","надену","образ","одеть","одежд","носить","выгляд","стиль"," лук","нарядит","что одеть")) return `${hi}под ${aes}: льняная рубашка цвета масла, бежевый низ, плетёная сумка, простые сандалии, один акцент — золотые серёжки. Разбор и «где найти» — в рубрике Style.`;
    if (has("пригото","рецепт","еда","ужин","обед","завтрак","поесть","голод","блюд","что съесть","кухн","что приготов")) { const base = veg ? "паста с лимоном, цукини и зеленью" : "паста с лимоном и оливковым маслом, зелень, бокал белого"; return `${hi}лёгкий средиземноморский вечер: ${base}. 20 минут — и стол как с твоих сохранений${noglu?" (бери безглютеновую пасту)":""}. Полный рецепт с шагами и как выбрать продукты — в рубрике Recipes.`; }
    if (has("почита","книг","чтен","читать","книж","что прочит")) return "Под настроение — «Год отдыха и релакса» Отессы Мошфег: медленная, ироничная, про право замедлиться. Ещё есть Топ-5 книг с авторами под твою эстетику — в рубрике Reading.";
    if (has("событ","афиш","выставк","мастер-класс","мастеркласс","спикинг","speaking","клуб","пробежк","мероприят","что происход")) return `В ${city} под твою эстетику: утренний пилатес в парке, беговой клуб от кофейни, speaking club, выставка импрессионистов, гончарный мастер-класс. Во вкладке «Места» → «События» есть описание, адрес и Яндекс Карты.`;
    if (has("кофе","кафе","сход","погуля","прогул","места","пойти","выйти","где посид","куда")) return `В ${city} для тебя есть кафе с большими окнами и тихим утром — Glow Score 92. Иди до 11, возьми книгу. Открой вкладку «Места».`;
    if (has("аромат","духи","парфюм","запах")) return "Под лето — цитрус и нероли, лёгкие и ненавязчивые. Похоже по нотам: Acqua di Parma «Colonia», Jo Malone «Orange Blossom», Hermès «Néroli Doré». Наноси на влажную кожу. Подробнее — в Beauty.";
    if (has("кож","уход","космет","макияж","бьюти","крем","сыворот","spf","умыва")) { const s = skin.includes("сух")?"для сухой кожи — масло со скваланом вечером и плотный крем":skin.includes("жирн")?"для жирной кожи — лёгкий гель и некомедогенный SPF":skin.includes("чувств")?"для чувствительной кожи — минимум средств без отдушек и мягкий SPF":"масло со скваланом вечером, лёгкий SPF утром, кремовый тинт «персик»"; return `${hi}сейчас коже хочется мягкости: ${s}. В рубрике Beauty всё по шагам и с примерами средств.`; }
    if (has("купить","купи","покуп","интерьер","для дома","ваза","штор","декор","мебел","обнов")) return "Из вечного: льняные шторы цвета слоновой кости и керамическая ваза ручной работы. Простые формы, натуральные материалы — характер дороже бренда. Идеи — в рубрике Style.";
    if (has("ритуал","энерг","wellness","расслаб","успоко","дыша","дыхан","забота о себе","медитац")) return "Три тихих опоры на день: стакан воды у окна утром, 10 минут растяжки, цифровой закат в 21:00. Пошагово — в рубрике Wellness.";
    if (has("факт","почему","наук","интересн","узнать","знал","расскажи что","искусств","архитект")) return "Красивый факт: импрессионисты писали не предметы, а свет — Моне рисовал один стог в разном освещении. Замечай, как свет меняет твою комнату за день. Ещё факты об искусстве, науке и архитектуре — в рубрике Mind.";
    if (has("путешеств","поехать","отпуск","направлен","куда съезд","куда поехать","travel","поездк")) return `Под ${aes} ложатся Прованс, Амальфи, Сан-Себастьян и Лиссабон — медленные, светлые, средиземноморские. В разделе «Путешествия» (Plus) — маршрут на день, что взять и где остановиться.`;
    if (has("музык","плейлист","послуша","песн","трек")) return "Под медленное утро — мягкий джаз и босанова. На главной есть готовые плейлисты со ссылкой на Яндекс Музыку — «Плейлисты для тебя».";
    if (has("выходн","уикенд","суббот","воскрес","weekend","планы на")) return "Твой Slow Glow Weekend: рынок утром, завтрак на балконе, пляж с книгой, кофе в старом городе, закат на набережной. Медленно и красиво.";
    if (has("свидан","романтич","партнер","вторая половин","с мужем","с парнем","вдвоем")) return "Тёплое свидание в твоей эстетике: ужин при свечах дома с пастой и белым вином, винил фоном, прогулка к воде на закате. Просто и близко.";
    if (has("бесплатн","недорог","без денег","эконом","мало денег","дешев")) return "Красиво и бесплатно: прогулка в ботаническом саду, библиотека с книгой у окна, утренние страницы, засушить букет с прогулки, домашний винил. Всё это — в «Досуге».";
    if (has("сфотограф","момент","журнал","что добавить","запечатл","что снимать","что фотать")) return "Запечатлей сегодня одно красивое: утренний кофе, цветы у окна, страницу книги, свой образ или закат. Нажми «+» внизу — момент попадёт в твой журнал.";
    if (has("лень","не получа","не хочу","нет настро","мотивац","смысл","зачем все")) return "Не нужно вдохновляться на всё сразу. Один маленький красивый шаг сегодня — и ты уже живёшь той жизнью с твоих сохранений. С него и начни.";
    return `${hi}я тебя слышу. Подскажу конкретно: что надеть, что приготовить, что почитать, куда сходить, чем заняться, какой аромат выбрать, куда поехать или красивый факт — всё под ${aes}. Что выберешь? Можно и просто описать свой день словами.`;
  };
  const sys = `Ты — Slow Glow, тёплый личный консьерж по красивой и медленной жизни. Помогаешь женщине прожить её эстетику в реальности маленькими спокойными шагами.
ГОЛОС: тёплый, спокойный, как подруга с прекрасным вкусом. Коротко — 2–5 предложений. Эстетика ${aes} и slow living (лён, керамика, тёплый свет, море, кофе у окна).
ГЛАВНОЕ ПРАВИЛО — ЭМОЦИОНАЛЬНЫЙ ИНТЕЛЛЕКТ: если она делится чувством или тем, что произошло (грусть, тревога, усталость, одиночество, ссора, расставание, потеря, страх, а также радость и волнение) — СНАЧАЛА будь живым человеком, а не сервисом. Тепло откликнись на само чувство, мягко назови его, побудь рядом и, если уместно, бережно спроси, что случилось или как ей сейчас. КАТЕГОРИЧЕСКИ нельзя отвечать на боль или грусть советом про одежду, образ, рецепт, аромат, покупки, места или «список дел» — это ранит и звучит как робот. Не «чини» её состояние и не обесценивай («не грусти», «всё будет хорошо», «зато…» — так не говори). Практическое (образ, рецепт, место и т.п.) предлагай ТОЛЬКО если она прямо об этом спросила или явно захотела действий, и то бережно: «если захочется — можем…». Когда речь о чувствах — отвечай разными живыми словами, как близкая подруга в реальном разговоре, без шаблонных фраз. Если звучит что-то серьёзное (о здоровье, безопасности, очень тяжёлое состояние) — мягко поддержи и предложи опереться на близких или специалиста, без диагнозов.
ПРОФИЛЬ: имя ${name||"—"}, город ${city}, кожа ${skin||"—"}, питание ${diet||"—"}, ритм дня ${rhythm||"—"}. Учитывай это и обращайся по имени, если оно есть.
ФОРМАТ: пиши живым текстом без markdown — никаких звёздочек **, решёток, маркированных списков и заголовков. Если перечисляешь — через запятую или с новой строки обычным текстом. Пиши грамотно, без опечаток и грамматических ошибок, в правильном литературном русском.
МЕСТА: предлагай характерные, независимые, небанальные места с атмосферой (авторские кофейни, винные бары, концептовые пространства), а не сетевые очевидности типа крупных пекарен-сетей. Когда называешь конкретное место, сразу добавляй ссылку на него в Яндекс Картах в формате https://yandex.ru/maps/?text=НАЗВАНИЕ+${city}. Если не уверена в названии — опиши тип места и дай ссылку-поиск по запросу.
УМЕЕШЬ ВСЁ, что нужно для красивой жизни: (1) советовать заведения и места с учётом репутации и отзывов; (2) помогать выбрать подарок на ЛЮБОЙ бюджет — давай 2–3 конкретные идеи с ориентиром по цене и где купить; (3) быть тёплой эмоциональной опорой и понимающей подругой — выслушать, поддержать, помочь разложить мысли (но без медицинских диагнозов; если речь о серьёзном или о здоровье — мягко предложи обратиться к специалисту); (4) советовать улучшения в любой сфере жизни — дом, стиль, отношения, отдых, ритуалы, привычки, саморазвитие — в духе медленной красивой жизни; (5) помогать со всем, что связано с разделами приложения и жизнью вокруг них. На любую тему отвечай умно, по делу и с заботой — не отказывайся.
ПРАВИЛА: всегда конкретно и с примерами (названия брендов/мест/блюд, как выбрать). На ЛЮБОЙ практический запрос (например «бюджетные эстетичные теннисные корты в Москве», бассейн, студия, барре) всегда отвечай 2–3 конкретными реальными вариантами с названием, районом и заметкой о цене — никогда не отказывай, не проси уточнений и не уходи в общие слова. СТРОГО соблюдай тип места: теннисные корты — это только настоящие корты и теннисные клубы, не детские центры и не другое; перепроверяй, что каждое место буквально соответствует запросу. Понимай свободные запросы (например «лук с сумкой Longchamp» — собери образ именно вокруг этой сумки). Один маленький шаг лучше плана. Без токсичной продуктивности, вины, калорий, диет-чисел и обесценивания тела. По-русски. Можно изредка ✦. Если уместно — мягко направь в раздел приложения (Style, Beauty, Recipes, Reading, Wellness, Mind, Досуг, Спорт, Языки, Путешествия, Музыка). Не выдумывай факты.\nЭРУДИЦИЯ И ГЛУБИНА: у тебя большая насмотренность в эстетике — история искусства и архитектуры, дизайн и интерьер, мода и модные дома, кино, литература, парфюмерия, музыка, путешествия (от духа Kinfolk до конкретных имён, авторов, марок, эпох и направлений). Отвечай содержательно, умно и точно ИМЕННО на заданный вопрос, по сути, не уходя в сторону и не пересказывая воду. НИКОГДА не молчи, не присылай пустой ответ и не пиши «не знаю» или «не могу»: всегда дай живой осмысленный ответ с конкретикой (названия, имена, примеры); если данных мало — предложи лучшее по смыслу и один следующий шаг.`;
  const send = async (text) => {
    const q = (text ?? val).trim(); if (!q || loading) return;
    const used = msgs.filter(m=>m.me).length;
    if (!premium && used >= 5) {
      setMsgs(m=>[...m, { me:false, t:"В бесплатной версии — 5 вопросов в день. В Slow Glow Plus я отвечаю без ограничений и помню весь контекст. Открой Plus, чтобы продолжить ✦", gate:true }]);
      setVal("");
      setTimeout(()=>endRef.current && endRef.current.scrollIntoView({ behavior:"smooth" }), 60);
      return;
    }
    const next = [...msgs, { me:true, t:q }];
    setMsgs(next); setVal(""); setLoading(true);
    setTimeout(()=>endRef.current && endRef.current.scrollIntoView({ behavior:"smooth" }), 60);
    try {
      const r = await fetch(AI_ENDPOINT, {
        method:"POST", headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, system:sys,
          messages: next.map(m=>({ role:m.me?"user":"assistant", content:m.t })) })
      });
      const data = await r.json();
      const txt = (data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("").trim();
      setMsgs(m=>[...m, { me:false, t: txt || reply(q) }]);
    } catch (e) {
      setMsgs(m=>[...m, { me:false, t: reply(q) }]);
    }
    setLoading(false);
    setTimeout(()=>endRef.current && endRef.current.scrollIntoView({ behavior:"smooth" }), 80);
  };
  const rich = (txt) => {
    const clean = String(txt).replace(/\*\*/g, "").replace(/^[\-\*]\s+/gm, "");
    const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;
    const out = []; let last = 0, m2, k = 0;
    while ((m2 = re.exec(clean))) {
      if (m2.index > last) out.push(clean.slice(last, m2.index));
      const url = m2[2] || m2[3];
      out.push(<a key={k++} href={url} target="_blank" rel="noreferrer" style={{ color:ch.partner, textDecoration:"underline", fontStyle:"normal" }}>{m2[1] || "на карте"}</a>);
      last = re.lastIndex;
    }
    if (last < clean.length) out.push(clean.slice(last));
    return out;
  };
  return (
    <div style={{ position:"absolute", inset:0, zIndex:8, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
      <div onClick={onClose} style={{ position:"absolute", inset:0, background:"rgba(26,26,26,0.3)", backdropFilter:"blur(2px)" }}/>
      <div className="sheet" style={{ position:"relative", zIndex:2, height:"86%", background:C.cream, borderRadius:"30px 30px 0 0", display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 -20px 50px -20px rgba(26,26,26,0.4)" }}>
        <div style={{ position:"absolute", inset:0, overflow:"hidden", zIndex:0 }}>
          <div className="amb" style={{ position:"absolute", left:"-10%", top:"-10%", width:"90%", height:"40%", background:`radial-gradient(circle, ${C.butter} 0%, ${ch.partner} 44%, transparent 70%)`, filter:"blur(50px)", opacity:0.5 }}/>
        </div>
        <div style={{ position:"relative", zIndex:2, display:"flex", alignItems:"center", gap:12, padding:"18px 22px 12px", borderBottom:`1px solid ${C.line}` }}>
          <GlowOrb partner={ch.partner} size={40}/>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:20, color:C.ink, lineHeight:1 }}>Slow Glow</div>
            <div style={{ fontFamily:head, fontSize:10, letterSpacing:"0.08em", color:C.inkFaint, marginTop:3 }}>помнит твои сохранения · эстетику · сезон</div>
          </div>
          <button onClick={onClose} aria-label="Закрыть" style={{ border:"none", background:"rgba(255,255,255,0.7)", borderRadius:99, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:C.inkSoft }}><X size={17} strokeWidth={2}/></button>
        </div>
        <div className="sg-scroll" style={{ position:"relative", zIndex:2, flex:1, overflowY:"auto", padding:"18px 22px 8px" }}>
          {msgs.length===0 && (
            <div style={{ textAlign:"center", paddingTop:30 }}>
              <GlowOrb partner={ch.partner} size={84} style={{ margin:"0 auto 18px" }}/>
              <p style={{ fontFamily:serif, fontStyle:"italic", fontSize:19, lineHeight:1.4, color:C.inkSoft, margin:"0 auto", maxWidth:255 }}>Напиши что угодно своими словами — например «хочу лук с сумкой Longchamp». Я отвечу под твою эстетику.</p>
            </div>
          )}
          {msgs.map((m,i)=> m.me ? (
            <div key={i} style={{ display:"flex", justifyContent:"flex-end", marginBottom:12 }}>
              <div style={{ background:C.ink, color:C.cream, borderRadius:"18px 18px 4px 18px", padding:"10px 14px", maxWidth:"78%", fontSize:14.5, lineHeight:1.4 }}>{m.t}</div>
            </div>
          ) : (
            <div key={i} className="fade" style={{ display:"flex", gap:10, marginBottom:16 }}>
              <div style={{ marginTop:2 }}><GlowOrb partner={ch.partner} size={26} spark={false}/></div>
              <div style={{ maxWidth:"82%" }}>
                <div style={{ fontFamily:serif, fontSize:16.5, lineHeight:1.5, color:C.ink, whiteSpace:"pre-wrap" }}>{rich(m.t)}</div>
                {m.gate && <button onClick={openPlus} style={{ marginTop:10, border:"none", cursor:"pointer", borderRadius:99, padding:"10px 18px", background:`linear-gradient(120deg, ${C.butter}, ${ch.partner})`, color:C.ink, fontFamily:head, fontSize:13, fontWeight:500 }}>Открыть Slow Glow Plus ✦</button>}
              </div>
            </div>
          ))}
          {loading && (
            <div className="fade" style={{ display:"flex", gap:10, marginBottom:16, alignItems:"center" }}>
              <div style={{ marginTop:2 }}><GlowOrb partner={ch.partner} size={26} spark={false}/></div>
              <div style={{ fontFamily:serif, fontStyle:"italic", fontSize:16, color:C.inkFaint }}>печатает…</div>
            </div>
          )}
          <div ref={endRef}/>
        </div>
        {msgs.length===0 && (
          <div className="row" style={{ position:"relative", zIndex:2, display:"flex", gap:8, padding:"0 22px 10px", overflowX:"auto" }}>
            {chips.map(c=><button key={c} onClick={()=>send(c)} style={{ flexShrink:0, border:`1px solid ${C.line}`, background:"rgba(255,255,255,0.6)", borderRadius:99, padding:"8px 13px", fontSize:13, fontFamily:serif, fontStyle:"italic", color:C.ink, cursor:"pointer" }}>{c}</button>)}
          </div>
        )}
        <div style={{ position:"relative", zIndex:2, display:"flex", alignItems:"center", gap:10, padding:"10px 18px 20px", borderTop:`1px solid ${C.line}` }}>
          <input value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Напиши Slow Glow…" style={{ flex:1, border:`1px solid ${C.line}`, outline:"none", background:"rgba(255,255,255,0.7)", borderRadius:99, padding:"12px 16px", fontSize:14, fontFamily:body, color:C.ink }}/>
          <button onClick={()=>send()} aria-label="Отправить" style={{ width:44, height:44, borderRadius:99, border:"none", cursor:"pointer", background:`radial-gradient(circle at 40% 35%, ${C.butter} 0%, ${ch.partner} 70%)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0 }}><Send size={17} strokeWidth={2}/></button>
        </div>
      </div>
    </div>
  );
}
