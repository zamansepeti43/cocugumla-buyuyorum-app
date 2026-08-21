import type { Activity, ActivityCategory, ActivityInteractionId, WorldId } from '../types/models'
import { researchData1 } from './researchData1'
import { researchData2 } from './researchData2'
import { researchData3 } from './researchData3'
import { researchData4 } from './researchData4'
import { researchData5 } from './researchData5'
import { researchData6 } from './researchData6'

type Row=readonly [string,number,number,number,string,string,number,number,ActivityInteractionId]
const rows:Row[]=[...researchData1,...researchData2,...researchData3,...researchData4,...researchData5,...researchData6]
const areas=["Dinleme","Dil","İnce Motor","Duyusal","Neden-Sonuç","Kaba Motor","Keşif","Sosyal","Yönerge","Bilişsel","Görsel","Motor","Hareket","Sanat","Renkler","Şekiller","Matematik","Duygular","Günlük Yaşam","Müzik","Hikâye","Geometri","İngilizce","Bilim","Mantık","Sosyal-Duygusal","Keşfet","Masal","Oyun","Okuma Hazırlığı"]
const cats:ActivityCategory[]=["cognitive","language","motor","cognitive","cognitive","motor","cognitive","social","cognitive","cognitive","cognitive","motor","motor","creativity","cognitive","cognitive","cognitive","social","social","creativity","social","cognitive","language","cognitive","cognitive","social","cognitive","social","cognitive","language"]
const worlds:WorldId[]=["forest","space","english","math","speech","games","stories","fairy-tales"]
const sections=["games-quick","speech-sound-track","forest-animals-intro","forest-animal-sounds","stories-friendship","games-memory","speech-first-words","math-shapes","math-numbers-10","games-logic","stories-adventure","english-animals","english-colors","space-planets","math-begin-add","english-family","fairy-tales-bedtime","space-rockets","speech-practice"]
const duration=(a:number)=>a<12?3:a<36?4:a<48?5:a<60?6:7
export type PlacedActivity=Activity&{worldId:WorldId;sectionId:string}

export const researchActivities:PlacedActivity[]=rows.map(r=>{
 const [id,ageMin,ageMax,area,title,purpose,w,s,interactionId]=r
 const description=`${title} — ${purpose}.`
 return {id,title,description,purpose,ageMin,ageMax,category:cats[area]??'cognitive',skill:purpose,duration:duration(ageMin),materials:[],instructions:[description,'Çocuğunuzun seçimine ve keşfetmesine zaman tanıyın.'],parentTip:'Kısa bir oturumla başlayın; çocuğun ilgisi azaldığında mola verin.',benefits:[purpose],difficulty:ageMin>=48?'medium':'easy',safetyNotes:[],variations:[],repeatCooldownDays:2,activityType:areas[area]==='Hikâye'||areas[area]==='Masal'?'guided':areas[area]==='Sanat'?'creative':'game',interactionId,completed:false,isPremium:false,worldId:worlds[w],sectionId:sections[s]}
})
