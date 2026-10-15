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
export const sectionPadding = "py-12 md:py-16";

// Hero ki apni padding. Upar thodi zyada hawa (header ke neeche page shuru
// hota hai, wahan tanga hua nahi lagna chahiye) aur neeche kam, taaki About
// thoda jhaanke — isse reader ko pata chalta hai ki neeche aur bhi kuch hai.
export const heroPadding = "pt-14 pb-8 md:pt-20 md:pb-12";
