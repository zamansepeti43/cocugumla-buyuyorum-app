import type { Activity, ActivityCategory, ActivityInteractionId, WorldId } from '../types/models'

type Row=[string,number,number,number,string,string,number,number,ActivityInteractionId]
const rows:Row[]=["a001",2,4,0,"Ritimli Ayaklar","dinleme ve ritim farkındalığı",5,0,"motion-track"]
const areas=["Dinleme","Dil","İnce Motor","Duyusal","Neden-Sonuç","Kaba Motor","Keşif","Sosyal","Yönerge","Bilişsel","Görsel","Motor","Hareket","Sanat","Renkler","Şekiller","Matematik","Duygular","Günlük Yaşam","Müzik","Hikâye","Geometri","İngilizce","Bilim","Mantık","Sosyal-Duygusal","Keşfet","Masal","Oyun","Okuma Hazırlığı"]
const cats:ActivityCategory[]=["cognitive","language","motor","cognitive","cognitive","motor","cognitive","social","cognitive","cognitive","cognitive","motor","motor","creativity","cognitive","cognitive","cognitive","social","social","creativity","social","cognitive","language","cognitive","cognitive","social","cognitive","social","cognitive","language"]
const worlds:WorldId[]=["forest","space","english","math","speech","games","stories","fairy-tales"]
const sections=["games-quick","speech-sound-track","forest-animals-intro","forest-animal-sounds","stories-friendship","games-memory","speech-first-words","math-shapes","math-numbers-10","games-logic","stories-adventure","english-animals","english-colors","space-planets","math-begin-add","english-family","fairy-tales-bedtime","space-rockets","speech-practice"]
const duration=(a:number)=>a<12?3:a<36?4:a<48?5:a<60?6:7
export type PlacedActivity=Activity&{worldId:WorldId;sectionId:string}
export const researchActivities:PlacedActivity[]=[]
