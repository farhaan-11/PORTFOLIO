/*
  Contact form ki field seemayein — ek hi jagah.

  Ye alag file isliye hai ki in numbers ko do jagah chahiye: browser mein
  input ka maxLength, aur server pe wahi jaanch dobara (browser ka maxLength
  sirf UI hai — curl se koi bhi usse bada message bhej sakta hai).

  Dono taraf ek hi file se aane se ye kabhi alag nahi ho sakte.
*/
export const contactFieldLimits = {
  maxNameLength: 80,
  maxEmailLength: 120,
  maxMessageLength: 1500,
};
