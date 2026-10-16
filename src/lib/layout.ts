// Page ki ek hi width, ek hi jagah.
// Har section isey use karta hai, isliye poore page mein text ka
// left edge ek hi seedhi line pe rehta hai — editorial layout isi se banta hai.
//
// 64rem (1024px) se badha ke 76rem (1216px) kiya gaya. 1024 ek 1440 screen pe
// dono taraf 200px khaali chhodta tha aur 1920 pe 448px — page aadha khaali
// dikhta tha. Isse zyada chauda nahi karna: heading ki line itni lambi ho
// jaati hai ki aankh wapas aate hue kho jaati hai.
//
// Side padding phone pe 24px (px-6) aur desktop pe 40px (md:px-10).
export const container = "mx-auto w-full max-w-[76rem] px-6 md:px-10";

// Section ke upar-neeche ki jagah. Phone pe kam, desktop pe zyada.
//
// Pehle py-20 md:py-28 tha, yaani desktop pe 112px upar aur 112px neeche —
// aur jahan do section milte the wahan 224px ka khaali patch ban jata tha.
// Ab 80+80 = 160px. Itna gap section alag dikhane ke liye kaafi hai;
// usse zyada sirf khaali screen lagti hai.
//
// Dusri baar aur kam kiya gaya: 80+80 bhi bada lag raha tha. Ab 64+64 =
// 128px desktop pe, 96px phone pe. Isse neeche jaane pe section ek doosre
// se chipakne lagte hain aur list ek lambi deewar ban jati hai.
//
// Teesri baar — 16 Oct 2026 — wapas thoda badhaya gaya, aur wajah "khaali
// jagah kam/zyada" nahi hai, RATIO hai:
//
// Page pe do tarah ke gap hain — row ke beech, aur section ke beech. Aankh
// gap ke SIZE se tay karti hai ki ek cheez kahan khatam hui. 128px section
// gap ke saamne work row ka gap 80px tha, yaani sirf 1.6x — aur phone pe
// 96 vs 80, yaani 1.2x, jo usse bhi bura tha. Do gap jab ek jaise lagein
// to aankh ko kuch nahi batata ki naya hissa shuru hua, aur poora page ek
// lambi list jaisa padhta hai.
//
// Ab: desktop 80+80 = 160px, phone 64+64 = 128px. Row ka gap bhi kasa gaya
// hai (WorkIndex py-8 = 64px), to ratio 2.5x desktop aur 2x phone.
//
// Page lamba nahi hua: rows se ~64px bacha, section gap mein ~96px gaya —
// net ~32px. Ye jagah badhane wala badlav nahi, jagah dobara baantne wala hai.
export const sectionPadding = "py-16 md:py-20";

// Hero ki apni padding. Upar thodi zyada hawa (header ke neeche page shuru
// hota hai, wahan tanga hua nahi lagna chahiye) aur neeche kam, taaki About
// thoda jhaanke — isse reader ko pata chalta hai ki neeche aur bhi kuch hai.
export const heroPadding = "pt-14 pb-8 md:pt-20 md:pb-12";
