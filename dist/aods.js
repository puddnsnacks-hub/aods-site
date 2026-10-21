const AODS_SPRITE = `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
  <symbol id="aods-search" viewBox="0 0 32 32"><path d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"/></symbol>
  <symbol id="aods-close" viewBox="0 0 32 32"><path d="M17.4141 16 24 9.4141 22.5859 8 16 14.5859 9.4143 8 8 9.4141 14.5859 16 8 22.5859 9.4143 24 16 17.4141 22.5859 24 24 22.5859 17.4141 16z"/></symbol>
  <symbol id="aods-menu" viewBox="0 0 32 32"><path d="M4 6H28V8H4z"/><path d="M4 24H28V26H4z"/><path d="M4 12H28V14H4z"/><path d="M4 18H28V20H4z"/></symbol>
  <symbol id="aods-chevron-down" viewBox="0 0 32 32"><path d="M16 22 6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"/></symbol>
  <symbol id="aods-chevron-up" viewBox="0 0 32 32"><path d="M16 10 26 20 24.6 21.4 16 12.8 7.4 21.4 6 20z"/></symbol>
  <symbol id="aods-chevron-right" viewBox="0 0 32 32"><path d="M22 16 12 26 10.6 24.6 19.2 16 10.6 7.4 12 6z"/></symbol>
  <symbol id="aods-chevron-left" viewBox="0 0 32 32"><path d="M10 16 20 6 21.4 7.4 12.8 16 21.4 24.6 20 26z"/></symbol>
  <symbol id="aods-check" viewBox="0 0 32 32"><path d="M13 24 4 15 5.414 13.586 13 21.171 26.586 7.586 28 9 13 24z"/></symbol>
  <symbol id="aods-warning" viewBox="0 0 32 32"><path d="M16,23a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,23Z"/><path d="M15 12H17V21H15z"/><path d="M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"/></symbol>
  <symbol id="aods-error" viewBox="0 0 32 32"><path d="M16,2C8.2,2,2,8.2,2,16s6.2,14,14,14s14-6.2,14-14S23.8,2,16,2z M16,28C9.4,28,4,22.6,4,16S9.4,4,16,4s12,5.4,12,12	S22.6,28,16,28z"/><path d="M21.4 23 16 17.6 10.6 23 9 21.4 14.4 16 9 10.6 10.6 9 16 14.4 21.4 9 23 10.6 17.6 16 23 21.4z"/></symbol>
  <symbol id="aods-info" viewBox="0 0 32 32"><path d="M17 22 17 14 13 14 13 16 15 16 15 22 12 22 12 24 20 24 20 22 17 22z"/><path d="M16,8a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,8Z"/><path d="M16,30A14,14,0,1,1,30,16,14,14,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12,12,0,0,0,16,4Z"/></symbol>
  <symbol id="aods-success" viewBox="0 0 32 32"><path d="M14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414z"/><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/></symbol>
  <symbol id="aods-emergency" viewBox="0 0 32 32"><path d="M16,21a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,21Z"/><path d="M15 8H17V18H15z"/><path d="M23,29H9a1,1,0,0,1-.8638-.4961l-7-12a1,1,0,0,1,0-1.0078l7-12A1,1,0,0,1,9,3H23a1,1,0,0,1,.8638.4961l7,12a1,1,0,0,1,0,1.0078l-7,12A1,1,0,0,1,23,29ZM9.5742,27H22.4258l6.4165-11L22.4258,5H9.5742L3.1577,16Z"/></symbol>
  <symbol id="aods-download" viewBox="0 0 32 32"><path d="M26,24v4H6V24H4v4H4a2,2,0,0,0,2,2H26a2,2,0,0,0,2-2h0V24Z"/><path d="M26 14 24.59 12.59 17 20.17 17 2 15 2 15 20.17 7.41 12.59 6 14 16 24 26 14z"/></symbol>
  <symbol id="aods-lock" viewBox="0 0 32 32"><path d="M24,14H22V8A6,6,0,0,0,10,8v6H8a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V16A2,2,0,0,0,24,14ZM12,8a4,4,0,0,1,8,0v6H12ZM24,28H8V16H24Z"/></symbol>
  <symbol id="aods-arrow-left" viewBox="0 0 32 32"><path d="M14 26 15.41 24.59 7.83 17 28 17 28 15 7.83 15 15.41 7.41 14 6 4 16 14 26z"/></symbol>
  <symbol id="aods-arrow-right" viewBox="0 0 32 32"><path d="M18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6z"/></symbol>
  <symbol id="aods-external" viewBox="0 0 32 32"><path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"/><path d="M20 2 20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z"/></symbol>
  <symbol id="aods-clear" viewBox="0 0 32 32"><path d="M20 18H26V20H20z" transform="matrix(-1 0 0 -1 46 38)"/><path d="M24 26H30V28H24z" transform="matrix(-1 0 0 -1 54 54)"/><path d="M22 22H28V24H22z" transform="matrix(-1 0 0 -1 50 46)"/><path d="M17.0029,20a4.8952,4.8952,0,0,0-2.4044-4.1729L22,3,20.2691,2,12.6933,15.126A5.6988,5.6988,0,0,0,7.45,16.6289C3.7064,20.24,3.9963,28.6821,4.01,29.04a1,1,0,0,0,1,.96H20.0012a1,1,0,0,0,.6-1.8C17.0615,25.5439,17.0029,20.0537,17.0029,20ZM11.93,16.9971A3.11,3.11,0,0,1,15.0041,20c0,.0381.0019.208.0168.4688L9.1215,17.8452A3.8,3.8,0,0,1,11.93,16.9971ZM15.4494,28A5.2,5.2,0,0,1,14,25H12a6.4993,6.4993,0,0,0,.9684,3H10.7451A16.6166,16.6166,0,0,1,10,24H8a17.3424,17.3424,0,0,0,.6652,4H6c.031-1.8364.29-5.8921,1.8027-8.5527l7.533,3.35A13.0253,13.0253,0,0,0,17.5968,28Z"/></symbol>
  <symbol id="aods-copy" viewBox="0 0 32 32"><path d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z"/><path d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z"/></symbol>
  <symbol id="aods-thumb-up" viewBox="0 0 32 32"><path d="M26,12H20V6a3.0033,3.0033,0,0,0-3-3H14.8672a2.0094,2.0094,0,0,0-1.98,1.7173l-.8453,5.9165L8.4648,16H2V30H23a7.0078,7.0078,0,0,0,7-7V16A4.0045,4.0045,0,0,0,26,12ZM8,28H4V18H8Zm20-5a5.0057,5.0057,0,0,1-5,5H10V17.3027l3.9578-5.9365L14.8672,5H17a1.0008,1.0008,0,0,1,1,1v8h8a2.0025,2.0025,0,0,1,2,2Z"/></symbol>
  <symbol id="aods-thumb-down" viewBox="0 0 32 32"><path d="M30,16V9a7.0078,7.0078,0,0,0-7-7H2V16H8.4648l3.5774,5.3662.8453,5.9165A2.0094,2.0094,0,0,0,14.8672,29H17a3.0033,3.0033,0,0,0,3-3V20h6A4.0045,4.0045,0,0,0,30,16ZM8,14H4V4H8Zm20,2a2.0025,2.0025,0,0,1-2,2H18v8a1.0008,1.0008,0,0,1-1,1H14.8672l-.9094-6.3662L10,14.6973V4H23a5.0057,5.0057,0,0,1,5,5Z"/></symbol>
  <symbol id="aods-retry" viewBox="0 0 32 32"><path d="M12,10H6.78A11,11,0,0,1,27,16h2A13,13,0,0,0,6,7.68V4H4v8h8Z"/><path d="M20,22h5.22A11,11,0,0,1,5,16H3a13,13,0,0,0,23,8.32V28h2V20H20Z"/></symbol>
  <symbol id="aods-send" viewBox="0 0 32 32"><path d="M27.71,4.29a1,1,0,0,0-1.05-.23l-22,8a1,1,0,0,0,0,1.87l9.6,3.84,3.84,9.6A1,1,0,0,0,19,28h0a1,1,0,0,0,.92-.66l8-22A1,1,0,0,0,27.71,4.29ZM19,24.2l-2.79-7L21,12.41,19.59,11l-4.83,4.83L7.8,13,25.33,6.67Z"/></symbol>
  <symbol id="aods-help" viewBox="0 0 32 32"><path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"/><circle cx="16" cy="23.5" r="1.5"/><path d="M17,8H15.5A4.49,4.49,0,0,0,11,12.5V13h2v-.5A2.5,2.5,0,0,1,15.5,10H17a2.5,2.5,0,0,1,0,5H15v4.5h2V17a4.5,4.5,0,0,0,0-9Z"/></symbol>
  <symbol id="aods-calendar" viewBox="0 0 32 32"><path d="M26,4h-4V2h-2v2h-8V2h-2v2H6C4.9,4,4,4.9,4,6v20c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V6C28,4.9,27.1,4,26,4z M26,26H6V12h20	V26z M26,10H6V6h4v2h2V6h8v2h2V6h4V10z"/></symbol>
  <symbol id="aods-upload" viewBox="0 0 32 32"><path d="M6 18 7.41 19.41 15 11.83 15 30 17 30 17 11.83 24.59 19.41 26 18 16 8 6 18z"/><path d="M6,8V4H26V8h2V4a2,2,0,0,0-2-2H6A2,2,0,0,0,4,4V8Z"/></symbol>
  <symbol id="aods-file" viewBox="0 0 32 32"><path d="M25.7,9.3l-7-7C18.5,2.1,18.3,2,18,2H8C6.9,2,6,2.9,6,4v24c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V10C26,9.7,25.9,9.5,25.7,9.3	z M18,4.4l5.6,5.6H18V4.4z M24,28H8V4h8v6c0,1.1,0.9,2,2,2h6V28z"/><path d="M10 22H22V24H10z"/><path d="M10 16H22V18H10z"/></symbol>
  <symbol id="aods-sort" viewBox="0 0 32 32"><path d="M27.6 20.6 24 24.2 24 4 22 4 22 24.2 18.4 20.6 17 22 23 28 29 22z"/><path d="M9 4 3 10 4.4 11.4 8 7.8 8 28 10 28 10 7.8 13.6 11.4 15 10z"/></symbol>
  <symbol id="aods-sort-asc" viewBox="0 0 32 32"><path d="M16 4 6 14 7.41 15.41 15 7.83 15 28 17 28 17 7.83 24.59 15.41 26 14 16 4z"/></symbol>
  <symbol id="aods-sort-desc" viewBox="0 0 32 32"><path d="M24.59 16.59 17 24.17 17 4 15 4 15 24.17 7.41 16.59 6 18 16 28 26 18 24.59 16.59z"/></symbol>
  <symbol id="aods-chevrons-left" viewBox="0 0 32 32"><path d="M14 16 24 6 25.4 7.4 16.8 16 25.4 24.6 24 26z"/><path d="M8 4H10V28H8z"/></symbol>
  <symbol id="aods-chevrons-right" viewBox="0 0 32 32"><path d="M18 16 8 26 6.6 24.6 15.2 16 6.6 7.4 8 6z"/><path d="M22 4H24V28H22z"/></symbol>
  <symbol id="aods-filter" viewBox="0 0 32 32"><path d="M18,28H14a2,2,0,0,1-2-2V18.41L4.59,11A2,2,0,0,1,4,9.59V6A2,2,0,0,1,6,4H26a2,2,0,0,1,2,2V9.59A2,2,0,0,1,27.41,11L20,18.41V26A2,2,0,0,1,18,28ZM6,6V9.59l8,8V26h4V17.59l8-8V6Z"/></symbol>
  <symbol id="aods-print" viewBox="0 0 32 32"><path d="M28,9H25V3H7V9H4a2,2,0,0,0-2,2V21a2,2,0,0,0,2,2H7v6H25V23h3a2,2,0,0,0,2-2V11A2,2,0,0,0,28,9ZM9,5H23V9H9ZM23,27H9V17H23Zm5-6H25V15H7v6H4V11H28Z"/></symbol>
  <symbol id="aods-quote" viewBox="0 0 32 32"><path d="M12,15H6.11A9,9,0,0,1,10,8.86l1.79-1.2L10.69,6,8.9,7.2A11,11,0,0,0,4,16.35V23a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V17A2,2,0,0,0,12,15Z"/><path d="M26,15H20.11A9,9,0,0,1,24,8.86l1.79-1.2L24.7,6,22.9,7.2A11,11,0,0,0,18,16.35V23a2,2,0,0,0,2,2h6a2,2,0,0,0,2-2V17A2,2,0,0,0,26,15Z"/></symbol>
  <symbol id="aods-social-facebook" viewBox="0 0 32 32"><path d="M26.67,4H5.33A1.34,1.34,0,0,0,4,5.33V26.67A1.34,1.34,0,0,0,5.33,28H16.82V18.72H13.7V15.09h3.12V12.42c0-3.1,1.89-4.79,4.67-4.79.93,0,1.86,0,2.79.14V11H22.37c-1.51,0-1.8.72-1.8,1.77v2.31h3.6l-.47,3.63H20.57V28h6.1A1.34,1.34,0,0,0,28,26.67V5.33A1.34,1.34,0,0,0,26.67,4Z"/></symbol>
  <symbol id="aods-social-instagram" viewBox="0 0 32 32"><circle cx="22.406" cy="9.594" r="1.44"/><path d="M16,9.8378A6.1622,6.1622,0,1,0,22.1622,16,6.1622,6.1622,0,0,0,16,9.8378ZM16,20a4,4,0,1,1,4-4A4,4,0,0,1,16,20Z"/><path d="M16,6.1622c3.2041,0,3.5837.0122,4.849.07a6.6418,6.6418,0,0,1,2.2283.4132,3.9748,3.9748,0,0,1,2.2774,2.2774,6.6418,6.6418,0,0,1,.4132,2.2283c.0577,1.2653.07,1.6449.07,4.849s-.0122,3.5837-.07,4.849a6.6418,6.6418,0,0,1-.4132,2.2283,3.9748,3.9748,0,0,1-2.2774,2.2774,6.6418,6.6418,0,0,1-2.2283.4132c-1.2652.0577-1.6446.07-4.849.07s-3.5838-.0122-4.849-.07a6.6418,6.6418,0,0,1-2.2283-.4132,3.9748,3.9748,0,0,1-2.2774-2.2774,6.6418,6.6418,0,0,1-.4132-2.2283c-.0577-1.2653-.07-1.6449-.07-4.849s.0122-3.5837.07-4.849a6.6418,6.6418,0,0,1,.4132-2.2283A3.9748,3.9748,0,0,1,8.9227,6.6453a6.6418,6.6418,0,0,1,2.2283-.4132c1.2653-.0577,1.6449-.07,4.849-.07M16,4c-3.259,0-3.6677.0138-4.9476.0722A8.8068,8.8068,0,0,0,8.14,4.63,6.1363,6.1363,0,0,0,4.63,8.14a8.8068,8.8068,0,0,0-.5578,2.9129C4.0138,12.3323,4,12.741,4,16s.0138,3.6677.0722,4.9476A8.8074,8.8074,0,0,0,4.63,23.8605a6.1363,6.1363,0,0,0,3.51,3.51,8.8068,8.8068,0,0,0,2.9129.5578C12.3323,27.9862,12.741,28,16,28s3.6677-.0138,4.9476-.0722a8.8074,8.8074,0,0,0,2.9129-.5578,6.1363,6.1363,0,0,0,3.51-3.51,8.8074,8.8074,0,0,0,.5578-2.9129C27.9862,19.6677,28,19.259,28,16s-.0138-3.6677-.0722-4.9476A8.8068,8.8068,0,0,0,27.37,8.14a6.1363,6.1363,0,0,0-3.51-3.5095,8.8074,8.8074,0,0,0-2.9129-.5578C19.6677,4.0138,19.259,4,16,4Z"/></symbol>
  <symbol id="aods-social-linkedin" viewBox="0 0 32 32"><path d="M26.2,4H5.8C4.8,4,4,4.8,4,5.7v20.5c0,0.9,0.8,1.7,1.8,1.7h20.4c1,0,1.8-0.8,1.8-1.7V5.7C28,4.8,27.2,4,26.2,4z M11.1,24.4	H7.6V13h3.5V24.4z M9.4,11.4c-1.1,0-2.1-0.9-2.1-2.1c0-1.2,0.9-2.1,2.1-2.1c1.1,0,2.1,0.9,2.1,2.1S10.5,11.4,9.4,11.4z M24.5,24.3	H21v-5.6c0-1.3,0-3.1-1.9-3.1c-1.9,0-2.1,1.5-2.1,2.9v5.7h-3.5V13h3.3v1.5h0.1c0.5-0.9,1.7-1.9,3.4-1.9c3.6,0,4.3,2.4,4.3,5.5V24.3z"/></symbol>
  <symbol id="aods-social-x" viewBox="0 0 32 32"><path d="m18.2342,14.1624l8.7424-10.1624h-2.0717l-7.591,8.8238-6.0629-8.8238h-6.9929l9.1684,13.3432-9.1684,10.6568h2.0718l8.0163-9.3183,6.4029,9.3183h6.9929l-9.5083-13.8376h.0005Zm-2.8376,3.2984l-.9289-1.3287L7.0763,5.5596h3.1822l5.9649,8.5323.9289,1.3287,7.7536,11.0907h-3.1822l-6.3272-9.05v-.0005Z"/></symbol>
  <symbol id="aods-social-youtube" viewBox="0 0 32 32"><path d="M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z"/></symbol>
</svg>`;
/* AODS — behaviors. Optional; every component renders without it. Binds by class, never by id, so
 any number of instances work. Load once after the DOM: <script src="dist/aods.js" defer>…
 Exposes window.AODS.init(root) for content added later. */
(function () {
  /* ---- icons: the sprite is injected once per document, before anything paints. It lives in
 dist/aods.js because a <use href> can only reach symbols that are IN the document — an external
 file works from a server and fails from file:// and inside a bundled artifact. Idempotent. */
  function sprite() {
    if (typeof AODS_SPRITE !== "string" || document.getElementById("aods-sprite")) return;
    const host = document.createElement("div");
    host.id = "aods-sprite";
    host.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    host.setAttribute("aria-hidden", "true");
    host.innerHTML = AODS_SPRITE;
    (document.body || document.documentElement).insertBefore(host, (document.body || document.documentElement).firstChild);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", sprite, { once: true }); else sprite();

  const on = (el, ev, fn, opts) => el.addEventListener(ev, fn, opts);   /* opts: the in-page-nav's scroll sampler needs { passive: true } and the argument was being dropped */
  let uid = 0;

  /* ---- select: trigger + listbox (.aods-menu[role=listbox]) mirroring a hidden native <select> */
  function select(root) {
    const trigger = root.querySelector(".aods-select__trigger");
    const list = root.querySelector(".aods-select__list");
    const native = root.querySelector(".aods-select__native");
    if (!trigger || !list || root.dataset.aodsReady) return;
    root.dataset.aodsReady = "1";
    const options = [...list.querySelectorAll(".aods-select__option")];
    // combobox semantics : the trigger IS the combobox; its name comes from the field's label;
    // aria-activedescendant is not used — focus really moves to the option. Invalid/required mirror the native.
    trigger.setAttribute("role", "combobox");
    if (!trigger.hasAttribute("aria-labelledby") && !trigger.hasAttribute("aria-label")) {
      const lab = root.closest(".aods-field")?.querySelector(".aods-label"); if (lab) trigger.setAttribute("aria-labelledby", id(lab, "label"));
    }
    const mirror = () => { if (!native) return;
      if (native.required) trigger.setAttribute("aria-required", "true");
      if (native.getAttribute("aria-invalid") === "true" || native.matches(":invalid:not(:placeholder-shown)") && native.value) trigger.setAttribute("aria-invalid", "true"); else trigger.removeAttribute("aria-invalid"); };
    const placeholder = trigger.textContent.trim();
    let active = options.findIndex(o => o.getAttribute("aria-selected") === "true");

    const paint = () => {
      options.forEach((o, i) => { o.setAttribute("aria-selected", i === active); o.id = o.id || `${trigger.id || "aods-select"}-opt-${i}`; });
      if (active >= 0) { trigger.textContent = options[active].textContent.trim(); trigger.removeAttribute("data-placeholder"); if (native) native.value = options[active].dataset.value ?? options[active].textContent.trim(); }
      else { trigger.textContent = placeholder; trigger.setAttribute("data-placeholder", ""); }
      mirror();
    };
    const open = () => { list.hidden = false; trigger.setAttribute("aria-expanded", "true"); (options[Math.max(active, 0)] || trigger).focus(); };
    const close = (refocus = true) => { list.hidden = true; trigger.setAttribute("aria-expanded", "false"); if (refocus) trigger.focus(); };
    const choose = i => { active = i; paint(); close(); native?.dispatchEvent(new Event("change", { bubbles: true })); root.dispatchEvent(new CustomEvent("aods:change", { bubbles: true, detail: { value: native?.value, index: i } })); };

    on(trigger, "click", () => list.hidden ? open() : close());
    on(trigger, "keydown", e => { if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); open(); } });
    options.forEach((o, i) => { o.tabIndex = -1; on(o, "click", () => choose(i)); on(o, "keydown", e => {
      if (e.key === "ArrowDown") { e.preventDefault(); (options[i + 1] || options[0]).focus(); }
      else if (e.key === "ArrowUp") { e.preventDefault(); (options[i - 1] || options[options.length - 1]).focus(); }
      else if (e.key === "Home") { e.preventDefault(); options[0].focus(); }
      else if (e.key === "End") { e.preventDefault(); options[options.length - 1].focus(); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(i); }
      else if (e.key === "Escape") { e.preventDefault(); close(); }
      else if (e.key === "Tab") close(false);
      else if (e.key.length === 1) { const k = e.key.toLowerCase(); const j = options.findIndex((x, n) => n > i && x.textContent.trim().toLowerCase().startsWith(k)); const m = j >= 0 ? j : options.findIndex(x => x.textContent.trim().toLowerCase().startsWith(k)); if (m >= 0) options[m].focus(); }
    }); });
    on(document, "click", e => { if (!root.contains(e.target) && !list.hidden) close(false); });
    paint();
  }

  /* ---- header: mega menus (one open at a time, Escape closes and returns focus) and, under the compact
 container width, the drawer: the menu button toggles data-open, each mega panel moves inline under its
 nav item, and it all moves back when the header widens (AODS.header.mobile). */
  /* every number here is read from a token at run time; the literal is only the fallback for a page without tokens.css */
  const prop = (el, name) => getComputedStyle(el).getPropertyValue(name).trim();
  const ms = (v, fallback) => { const n = parseFloat(v); return isNaN(n) ? fallback : n * (/ms$/.test(v) ? 1 : 1000); };
  const COMPACT = parseFloat(prop(document.documentElement, "--c-page-breakpoint-compact")) || 900;
  function header(root) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";
    /* THE HEADER PUBLISHES ITS OWN HEIGHT (2026-08-28). Anything that sticks below a sticky header needs to
 know how tall it is, and NOTHING IN THE TOKENS CAN SAY. Measured: 90 = utility 33 + bar 57 at wide,
 78 = 33 + 45 at compact. c.header.height is 48 — the bars are padded, so their real heights are computed,
 and they differ again by data-size (landing vs internal). A fixed token would have been a magic number
 hand-fitted to a computed height, wrong at the first variant. So the header measures itself and writes it
 where anyone can read it; a ResizeObserver, not a resize listener, because the height also changes when the
 header itself changes size, not only when the window does.
 It is an internal --_ property, not a token: a measurement is not a design decision. */
    if (getComputedStyle(root).position === "sticky" && window.ResizeObserver) {
      /* PAST THE COVER (RULING 2026-09-03). data-cover says the page opens with a hero whose photograph
 runs up behind the bar, which is the only reading the translucent bar was ever for. The glass has
 something behind it only while the cover is there: once the cover's bottom edge reaches the bar the
 glass would composite 80% navy over the white page ground, which is a color nobody chose, so the bar
 goes opaque. OBSERVED, NOT SCROLLED - one IntersectionObserver rather than a scroll listener - and
 re-armed from the SAME measurement that publishes the height, so the trigger line and the bar's own
 height can never drift apart. The rootMargin is what moves the trip wire off the top of the viewport
 and onto the bottom of the bar. */
      let after = root.nextElementSibling; while (after && after.tagName !== "MAIN") after = after.nextElementSibling;
      const cover = root.hasAttribute("data-cover") && after ? after.querySelector(":scope > .aods-hero") : null;
      let io = null;
      const publish = () => {
        const h = Math.round(root.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--_aods-header-height", h + "px");
        if (cover && window.IntersectionObserver) {
          if (io) io.disconnect();
          io = new IntersectionObserver(function (e) { root.toggleAttribute("data-past-cover", !e[0].isIntersecting); },
                                        { rootMargin: "-" + h + "px 0px 0px 0px" });
          io.observe(cover);
        }
      };
      new ResizeObserver(publish).observe(root); publish();
    }

    /* WHEN THE HEADER FOLDS IS A MEASUREMENT (RULING 2026-09-03). The fold was
 @container aods-header (max-width: 900px) - one number for every header the system will ever draw -
 and measured on the shipped face that number is wrong in both directions at once: article.html
 hamburgered 174px before its nav ran out of room, strategic-plan.html 218px after, overflowing 92px
 at 901. Same component, same number, opposite failures. So the header folds the way the tabs do: it
 measures.
 MEASUREMENT ALWAYS HAPPENS UNFOLDED, which is the trap this kind of check falls into - summing the
 widths the items are RENDERING at reads the already-shrunk row and can never say what the row wants.
 Here it is nearly free, because the fold is carried by our own attributes: measuring is taking them
 off, forcing the row to max-content, reading, and putting back whatever turns out to be true.
 TWO STAGES. The SEARCH yields first, because it is the only item with a designed width rather than a
 content width, and it yields by LEAVING at its floor rather than shrinking into a stub. The NAV
 yields last - a CTA in the bar measures with it and never leaves before it - and only then does the
 menu button appear. */
    const bar = root.querySelector(".aods-header__bar");
    const row = bar && bar.querySelector(".aods-header__content");
    const searchEl = root.querySelector(".aods-header__search");
    const navEl = root.querySelector(".aods-header__drawer nav") || root.querySelector(".aods-header__bar nav");
    if (row && window.ResizeObserver) {
      let busy = false, seen = -1;
      const px = (el, prop) => parseFloat(getComputedStyle(el)[prop]) || 0;
      const fit = (force) => {
        if (busy) return;
        /* THE ROW'S WIDTH IS THE SAME IN ALL THREE ARRANGEMENTS - it fills the bar's content box
 whether the header is one row, two rows or gated - so it can be read BEFORE anything is changed, and
 an unchanged reading means there is nothing to redo. That guard is what keeps this off a treadmill:
 fit() perturbs the layout to measure it, which is exactly what the ResizeObserver watching it would
 otherwise report as a change. */
        const avail = row.getBoundingClientRect().width;
        if (!force && Math.round(avail) === seen) return;
        busy = true; seen = Math.round(avail);

        /* "measuring" and not simply REMOVED. The no-script floor keys on :not([data-gate]), so taking
 the attribute off below the compact breakpoint hands the measurement a stacked nav and a hidden
 search - a folded state, read as if it were the unfolded one, which put the gate 275px late and 122px
 of overflow back on the page. A third value belongs to neither rule. */
        root.setAttribute("data-gate", "measuring"); root.removeAttribute("data-shelf");
        const w = row.style.width, fw = row.style.flexWrap, mw = row.style.maxWidth;
        const sw = searchEl && searchEl.style.width, nd = navEl && navEl.style.display;
        row.style.flexWrap = "nowrap"; row.style.width = "max-content"; row.style.maxWidth = "none";

        /* A - ONE ROW, at its most compressed: the search may shrink to its floor and no further, so
 this is the last width at which everything still shares a line. */
        if (searchEl) searchEl.style.width = px(searchEl, "minWidth") + "px";
        const wantsRow = row.getBoundingClientRect().width;

        /* B - THE TOP ROW OF THE SHELF: everything except the nav, with the search HUGGING. */
        if (searchEl) searchEl.style.width = "max-content";
        if (navEl) navEl.style.display = "none";
        const wantsTop = row.getBoundingClientRect().width;
        if (navEl) navEl.style.display = nd || "";

        /* C - THE SHELF ITSELF: the nav at its own content width. The strip bleeds to the header's
 edges and puts the gutter back as padding, so what it has to fit inside is the same avail. */
        let wantsNav = 0;
        if (navEl) { const nw = navEl.style.width; navEl.style.width = "max-content";
                     wantsNav = navEl.getBoundingClientRect().width; navEl.style.width = nw; }

        row.style.width = w; row.style.flexWrap = fw; row.style.maxWidth = mw;
        if (searchEl) searchEl.style.width = sw || "";

        const gate = avail < Math.max(wantsTop, wantsNav);
        root.setAttribute("data-gate", gate ? "on" : "off");
        if (!gate && avail < wantsRow) root.setAttribute("data-shelf", "on");
        else root.removeAttribute("data-shelf");
        if (!gate && root.dataset.open === "true") root.dataset.open = "false";  // the drawer cannot outlive the gate
        busy = false;
      };
      new ResizeObserver(() => fit(false)).observe(root);
      fit(true);
      /* the row's width is a function of the FACE, and the fallback face is not the shipped one - every
 reading taken before the web fonts resolve is a reading of a document this system does not render. */
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fit(true));
    }

    const items = [...root.querySelectorAll(".aods-header__nav-item[aria-expanded]")];
    const mega = b => root.querySelector(`[id="${b.getAttribute("aria-controls")}"]`);   // scoped: the docs repeat ids across specimens
    /* THE PANEL SITS UNDER THE ITEM THAT OPENED IT (ruling). Once a mega column is a
 measure rather than a fraction (aods.css), a menu with few columns no longer fills the panel — and
 the slack has to go somewhere. Left alone it all piles up on the right and the group reads as
 jammed against the lockup, unrelated to the nav item it belongs to. So: measure, clamp, publish.
 THREE THINGS THIS GETS RIGHT, each of which cost a wrong version first:
 · The group width is the SUM of the columns plus the gaps — NOT last.right - first.left, which
 is a different number the moment the columns wrap and produced a 256px "group" that shoved
 the menu into three rows at 1100px.
 · It anchors only when the columns have stopped growing. While they are still absorbing slack
 there is nothing to move, and shifting the box would just shrink them again.
 · It measures at anchor 0. Reading a width while the previous anchor is applied compounds.
 Compact is excluded: inline in the drawer the panel is a list, not a panel, and the padding would
 read as a stray indent. */
    const anchor = m => {
      if (inDrawer || !m || m.hidden) return;
      const content = m.querySelector(":scope > .aods-header__content");
      const cols = content && [...content.children];
      if (!cols || !cols.length) return;
      content.style.setProperty("--_mega-anchor", "0px");
      const gap = parseFloat(getComputedStyle(content).columnGap) || 0;
      const groupW = cols.reduce((sum, c) => sum + c.getBoundingClientRect().width, 0) + gap * (cols.length - 1);
      const avail = content.clientWidth;
      if (groupW >= avail - 1) return;                       // the columns still fill it: nothing to anchor
      const bar = root.querySelector(".aods-header__bar .aods-header__content");
      const btn = items.find(b => b.getAttribute("aria-controls") === m.id);
      if (!bar || !btn) return;
      const trigger = btn.getBoundingClientRect().left - bar.getBoundingClientRect().left;
      content.style.setProperty("--_mega-anchor", Math.round(Math.max(0, Math.min(trigger, avail - groupW))) + "px");
    };
    const openMega = () => root.querySelector(".aods-header__mega:not([hidden])");

    items.forEach(b => on(b, "click", () => {
      const wasOpen = b.getAttribute("aria-expanded") === "true";
      items.forEach(o => o.setAttribute("aria-expanded", "false"));
      root.querySelectorAll(".aods-header__mega").forEach(m => m.hidden = true);
      if (!wasOpen) { b.setAttribute("aria-expanded", "true"); const m = mega(b); if (m) { m.hidden = false; anchor(m); } }
    }));
    // the drawer
    const menu = root.querySelector(".aods-header__menu"), drawer = root.querySelector(".aods-header__drawer");
    const setOpen = v => { root.dataset.open = v; menu?.setAttribute("aria-expanded", v); };
    if (menu && drawer) {
      menu.type = "button"; if (!drawer.id) drawer.id = `aods-drawer-${++uid}`; menu.setAttribute("aria-controls", drawer.id); setOpen(root.dataset.open === "true");
      on(menu, "click", () => { const open = root.dataset.open !== "true"; setOpen(open); if (open) (drawer.querySelector("input, a, button") || drawer).focus(); });
      on(root, "keydown", e => { if (e.key === "Escape" && root.dataset.open === "true") { setOpen(false); menu.focus(); } });
    }
    /* A MEGA PANEL MOVES INTO ITS <li> ONLY WHEN THE DRAWER IS ACTUALLY OPEN FOR BUSINESS
       (fix 2026-09-05, operator: "the mega menu ground should span the whole width"). It used to
       relocate on a RAW WIDTH TEST, w <= COMPACT, while the drawer itself gates on a MEASURED fold -
       and the two do not agree. Measured at six widths: at 940 the panel is a child of .aods-header,
       absolute, and spans the full 940; at 900 it is a child of the LI, static, and 456 wide, while
       data-gate is still "off". Between those two thresholds the panel was inline in a list item
       with no drawer to be inline in, so it rendered as a static block and the header grew to
       contain it - which is what the screenshot showed.
       KEYING BOTH OFF data-gate makes the question one question. The panel is a nested list when the
       nav is a drawer, and an overlay every other time; there is no third state, and now no width at
       which the code believes in one while the markup is in the other. */
    const homes = new Map();
    root.querySelectorAll(".aods-header__mega").forEach(m => homes.set(m, { parent: m.parentNode, next: m.nextSibling }));
    let inDrawer = null;
    const layout = () => {
      const c = root.getAttribute("data-gate") === "on"; if (c === inDrawer) return; inDrawer = c;
      items.forEach(b => { const m = mega(b); if (!m || !homes.has(m)) return;
        if (c) b.closest("li")?.appendChild(m); else { const h = homes.get(m); h.parent.insertBefore(m, h.next && h.next.parentNode === h.parent ? h.next : null); } });
      if (!c) setOpen(false);
      anchor(openMega());
    };
    /* the gate is stamped by the measuring pass above, so watch the attribute rather than the width */
    new MutationObserver(() => { layout(); }).observe(root, { attributes: true, attributeFilter: ["data-gate"] });
    if (window.ResizeObserver) new ResizeObserver(() => { layout(); anchor(openMega()); }).observe(root);
    layout();
  }

  /* ---- footer: the nav band is a <details> — always open when wide (its summary is hidden), closed by
 default when compact so "Site Map" folds the columns away (AODS.footer.mobile). */
  function footer(root) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";
    const d = root.querySelector('details.aods-footer__band[data-band="nav"]'); if (!d) return;
    let compact = null;
    const layout = w => { const c = w <= COMPACT; if (c === compact) return; compact = c; d.open = !c || root.dataset.open === "true"; };
    if (window.ResizeObserver) new ResizeObserver(es => layout(es[0].contentRect.width)).observe(root);
    layout(root.getBoundingClientRect().width);
  }

  /* ---- chip dismiss: remove, move focus to the next chip or the group */
  function chipGroup(root) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";     // bind once, like every root
    root.querySelectorAll(".aods-chip__dismiss").forEach(b => on(b, "click", () => {
      const chip = b.closest(".aods-chip"), next = chip.nextElementSibling;
      chip.dispatchEvent(new CustomEvent("aods:dismiss", { bubbles: true }));
      chip.remove(); const target = next?.querySelector(".aods-chip__dismiss"); if (target) target.focus(); else { if (!root.hasAttribute("tabindex")) root.tabIndex = -1; root.focus(); }
    }));
    root.querySelectorAll("button.aods-chip[aria-pressed]").forEach(b => on(b, "click", () => b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") !== "true")));
  }

  /* ---- form reveal: a checkbox with data-reveal shows the element it aria-controls and focuses its input */
  function reveal(cb) {
    if (cb.dataset.aodsBound) return; cb.dataset.aodsBound = "1";         // bind once, like every root
    const w = document.getElementById(cb.getAttribute("aria-controls")); if (!w) return;
    cb.setAttribute("aria-expanded", String(cb.checked)); w.hidden = !cb.checked;
    on(cb, "change", () => { w.hidden = !cb.checked; cb.setAttribute("aria-expanded", String(cb.checked)); if (cb.checked) w.querySelector("input,select,textarea,button")?.focus(); });
  }


  /* ---- details: every open/close eases (ruling). The panel after the summary grows from 0 to
 its height on open and shrinks on close; details.open flips after the close has finished. */
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)");
  const DUR = () => ms(prop(document.documentElement, "--c-page-motion-state"), 120);
  const EASE = kind => prop(document.documentElement, "--c-page-motion-ease-" + kind) || "ease-out";   /* the curve comes from the token — enter for arriving, exit for leaving */

  /* ---- anchor travel — RULING: a CHARACTERISTIC of the system. Anchor links scroll fast
 instead of jumping: a fixed, short travel (--c-page-motion-travel) with an ease-out, the same
 decisive duration whatever the distance. Reduced motion jumps. Focus lands on the target either way. */
  document.addEventListener("click", e => {
    const a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    /* OPT-OUT ( ruling): travel is a characteristic of the PRODUCT. Documentation jumps —
 a reference page is scanned, not toured, and a fold that opens on the way makes any animated
 destination wrong before it arrives. Any ancestor may carry data-anchor-travel="off". */
    if (a.closest('[data-anchor-travel="off"]')) return;
    const id = decodeURIComponent(a.getAttribute("href").slice(1)); if (!id) return;
    const t = document.getElementById(id); if (!t) return;
    e.preventDefault();
    const margin = parseFloat(getComputedStyle(t).scrollMarginBlockStart) || 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const to = Math.max(0, Math.min(window.scrollY + t.getBoundingClientRect().top - margin, max));
    const from = window.scrollY;
    const focusIt = () => { if (t.tabIndex < 0 && !t.hasAttribute("tabindex")) t.setAttribute("tabindex", "-1"); t.focus({ preventScroll: true }); };
    try { history.pushState(null, "", "#" + id); } catch (err) { /* srcdoc iframes forbid pushState */ }
    if (REDUCED.matches) { window.scrollTo(0, to); focusIt(); return; }
    const dur = ms(prop(document.documentElement, "--c-page-motion-travel"), 360);
    const t0 = performance.now(); const out = x => 1 - Math.pow(1 - x, 3);
    const step = now => { const p = Math.min(1, (now - t0) / dur); window.scrollTo(0, from + (to - from) * out(p)); if (p < 1) requestAnimationFrame(step); else focusIt(); };
    requestAnimationFrame(step);
  });
  function closeDetails(d) {
    const panel = d.querySelector(":scope > summary + *"); if (!d.open) return;
    if (REDUCED.matches || !panel || !panel.animate) { d.open = false; return; }
    const h = panel.offsetHeight; panel.style.overflow = "hidden";
    panel.animate([{ height: h + "px", opacity: 1 }, { height: "0px", opacity: 0 }], { duration: DUR(), easing: EASE("exit") })
      .onfinish = () => { panel.style.overflow = ""; d.open = false; };
  }
  function openDetails(d) {
    d.open = true; const panel = d.querySelector(":scope > summary + *");
    if (REDUCED.matches || !panel || !panel.animate) return;
    const h = panel.offsetHeight; panel.style.overflow = "hidden";
    panel.animate([{ height: "0px", opacity: 0 }, { height: h + "px", opacity: 1 }], { duration: DUR(), easing: EASE("enter") })
      .onfinish = () => { panel.style.overflow = ""; };
  }
  /* the disclosure and the accordion item animate their height in CSS (::details-content + interpolate-size, see the
 @supports blocks in aods.css); where the browser supports that selector the script must NOT add a second, shorter
 animation on top — so those two are left to the stylesheet and only the rest (reference-list, gov-banner, footer
 sitemap) get the JS ease. */
  const CSS_EASED = ".aods-disclosure, .aods-accordion__item";   /* accordion: CSS ::details-content; disclosure: the LIFT below */

  /* disclosure: simplified — plain details, CSS handles the height ease. */
  const cssEases = d => typeof CSS !== "undefined" && CSS.supports?.("selector(::details-content)") && d.matches(CSS_EASED);
  function easeDetails(d) {
    const sum = d.querySelector(":scope > summary"); if (!sum || d.dataset.aodsEased || cssEases(d)) return; d.dataset.aodsEased = "1";
    on(sum, "click", ev => { ev.preventDefault(); d.open ? closeDetails(d) : openDetails(d); });
  }

  /* ---- reference-list: one row open at a time, on click/Enter only (RULING: no hover preview). */
  function referenceList(root) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";
    root.querySelectorAll(".aods-reference-list__item").forEach(it => on(it.querySelector(":scope > summary"), "click", () => {
      if (!it.open) root.querySelectorAll(".aods-reference-list__item").forEach(o => { if (o !== it) closeDetails(o); });
    }));
  }


  /* ---- tabs: a real tab widget . Panels follow the list in source order, or name
 themselves with aria-labelledby / the tab's aria-controls. Roving tabindex; Left/Right/Home/End move
 and select; the selected tab is the only one in the Tab order; aria-disabled tabs are skipped.
 THE FOLD (): the rail never scrolls sideways. We sum the tab widths against the rail's own
 box and, when they stop fitting, set data-fold="on" — the rail collapses into the DESIGN SYSTEM'S
 select (.aods-select__trigger + .aods-menu), never the OS control. Measurement always happens unfolded,
 because a folded list is absolutely positioned and stacked and would measure itself as fitting. */
  const id = (el, p) => el.id || (el.id = `aods-${p}-${++uid}`);
  function tabs(root, chrome = true) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";
    const list = root.querySelector('[role="tablist"]'); if (!list) return;
    const tabsEl = [...list.querySelectorAll('[role="tab"]')];
    const panels = [...root.querySelectorAll('[role="tabpanel"]')];
    tabsEl.forEach((t, i) => {
      id(t, "tab"); t.type = t.tagName === "BUTTON" ? "button" : t.type;
      const panel = document.getElementById(t.getAttribute("aria-controls")) || panels[i];
      if (panel) { id(panel, "panel"); t.setAttribute("aria-controls", panel.id); panel.setAttribute("aria-labelledby", t.id); if (!panel.hasAttribute("tabindex")) panel.tabIndex = 0; }
    });
    const enabled = () => tabsEl.filter(t => t.getAttribute("aria-disabled") !== "true");
    const select = (t, focus = true) => {
      tabsEl.forEach(o => { const on_ = o === t; o.setAttribute("aria-selected", on_); o.tabIndex = on_ ? 0 : -1;
        const p = document.getElementById(o.getAttribute("aria-controls")); if (p) p.hidden = !on_; });
      /* a selected tab is never left invisible. Arrowing into the overflow while its select is shut would
 call focus() on a hidden button and quietly leave focus where it was, so focus goes to the trigger,
 which by then is already wearing this tab's name. */
      if (focus) { const box = t.closest(".aods-tabs__held"); (box && box.hidden ? box.previousElementSibling : t).focus(); }
      root.dispatchEvent(new CustomEvent("aods:tabchange", { bubbles: true, detail: { tab: t } }));
    };
    tabsEl.forEach(t => {
      on(t, "click", e => { if (t.getAttribute("aria-disabled") === "true") { e.preventDefault(); return; }
        select(t, false);
        const box = t.closest(".aods-tabs__held");
        if (box) { box.hidden = true; const trg = box.previousElementSibling; trg?.setAttribute("aria-expanded", "false"); trg?.focus(); }
        else if (root.getAttribute("data-fold") === "on") { list.hidden = true; const f = root.querySelector(".aods-tabs__fold"); f?.setAttribute("aria-expanded", "false"); f?.focus(); } });
      on(t, "keydown", e => {
        const list_ = enabled(), i = list_.indexOf(t); if (i < 0) return; let n = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") n = list_[(i + 1) % list_.length];
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = list_[(i - 1 + list_.length) % list_.length];
        else if (e.key === "Home") n = list_[0]; else if (e.key === "End") n = list_[list_.length - 1];
        if (n) { e.preventDefault(); select(n); }
      });
    });
    const initial = tabsEl.find(t => t.getAttribute("aria-selected") === "true") || enabled()[0];
    if (initial) select(initial, false);
    /* THE EXPLORER BORROWS THE CONTROLLER, NOT THE CHROME. Everything above is the tab
 CONTRACT - roving tabindex, arrows, Home/End, one panel visible, aria wired both ways - and it is
 keyed off roles rather than off .aods-tabs classes, so any widget that wears the roles gets it for
 free. Everything below is the tab RAIL's problem: a horizontal strip that runs out of width folds
 into a select. A vertical list of rows cannot run out of width, so it takes the contract and stops. */
    if (!chrome) return;

    /* the fold. The wrap is permanent so the popover always has a positioning context; unfolded it is inert. */
    const wrap = document.createElement("div");
    wrap.className = "aods-tabs__fold-wrap";
    list.parentNode.insertBefore(wrap, list);
    const fold = document.createElement("button");
    fold.type = "button";
    fold.className = "aods-tabs__fold aods-select__trigger";   /* the DS select, not the native one */
    fold.setAttribute("aria-expanded", "false");
    fold.setAttribute("aria-controls", id(list, "tablist"));
    const foldLabel = document.createElement("span");
    foldLabel.className = "aods-tabs__fold-label";
    fold.appendChild(foldLabel);
    wrap.appendChild(fold);
    wrap.appendChild(list);

    const folded = () => root.getAttribute("data-fold") === "on";
    const paintFold = () => { const t = tabsEl.find(x => x.getAttribute("aria-selected") === "true") || tabsEl[0];
      if (t) foldLabel.innerHTML = t.innerHTML; };
    const openFold = () => { list.hidden = false; fold.setAttribute("aria-expanded", "true");
      (tabsEl.find(t => t.getAttribute("aria-selected") === "true") || enabled()[0] || fold).focus(); };
    const closeFold = (refocus = true) => { list.hidden = true; fold.setAttribute("aria-expanded", "false"); if (refocus) fold.focus(); };
    /* repaint only. Arrows inside the popover call select() as they move (follow-focus, like select's list);
 closing here would slam the popover shut on the first arrow press. Committing closes it — see the click
 handler, which <button> fires for Enter and Space too. */
    root.addEventListener("aods:tabchange", paintFold);
    on(fold, "click", () => list.hidden ? openFold() : closeFold());
    on(fold, "keydown", e => { if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); openFold(); } });
    on(list, "keydown", e => { if (!folded()) return;
      if (e.key === "Escape") { e.preventDefault(); closeFold(); } else if (e.key === "Tab") closeFold(false); });
    on(document, "click", e => { if (folded() && !list.hidden && !root.contains(e.target)) closeFold(false); });

    /* ---- the overflow select (ruling): "if all the tabs do not fit, the last three go
 in a select with their tab names as the placeholder with the names truncated to an equal number of
 letters, if a tab from that select is active, the active tab name is the name displayed in the select."
 The held tabs never leave the tablist — .aods-tabs__held is role="presentation", so they stay the
 tablist's effective children and arrows still cross the whole set. */
    const HELD_FIRST = 3;      /* "the last three go in a select" */
    const MIN_LETTERS = 3;     /* below this the placeholder stops being names — see THE FLOOR below */
    const overflow = document.createElement("div");
    overflow.className = "aods-tabs__overflow";
    overflow.setAttribute("role", "presentation");
    const more = document.createElement("button");
    more.type = "button";
    more.className = "aods-tabs__more aods-select__trigger";   /* the DS select again, never the native one */
    more.setAttribute("aria-expanded", "false");
    const moreLabel = document.createElement("span");
    moreLabel.className = "aods-tabs__more-label";
    more.appendChild(moreLabel);
    const heldBox = document.createElement("div");
    heldBox.className = "aods-tabs__held aods-menu";
    heldBox.setAttribute("role", "presentation");
    heldBox.hidden = true;
    more.setAttribute("aria-controls", id(heldBox, "held"));
    overflow.append(more, heldBox);
    list.appendChild(overflow);

    let heldCount = 0;
    const overflowed = () => root.getAttribute("data-overflow") === "on";
    const isHeld = t => tabsEl.indexOf(t) >= tabsEl.length - heldCount && heldCount > 0;
    const nameOf = t => { const c = t.cloneNode(true); c.querySelector(".aods-tabs__index")?.remove();
      return c.textContent.trim(); };

    /* one hidden ruler, wearing the trigger's own type, so the letter count is measured and not guessed */
    const ruler = document.createElement("span");
    ruler.setAttribute("aria-hidden", "true");
    ruler.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap;pointer-events:none;left:-9999px;top:0";
    const joinAt = (names, n) => names.map(x => x.length > n ? x.slice(0, n) + "\u2026" : x).join(" \u00b7 ");

    /* The largest number of letters every held name can carry, computed from the PLACEHOLDER form always —
 never from whichever tab happens to be active. If it depended on the selection, choosing a tab could
 change how many tabs fit on the rail, and the layout would jump under the pointer. */
    const letterFit = () => {
      const names = tabsEl.slice(tabsEl.length - heldCount).map(nameOf);
      if (!names.length) return 0;
      const cs = getComputedStyle(more);
      ruler.style.font = cs.font || `${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight} ${cs.fontFamily}`;
      ruler.style.letterSpacing = cs.letterSpacing;
      more.appendChild(ruler);
      /* the room is the trigger's REAL width — it flexes into whatever the rail did not use — minus its own
 padding and its chevron. This cannot chase its own tail: the fit loop reserved a CONSTANT while it
 decided how many tabs stay, so this width is an output of that decision, never an input to it. */
      const chrome = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0)
        + (parseFloat(getComputedStyle(more, "::after").width) || 0) + (parseFloat(cs.columnGap) || 0);
      const room = Math.max(more.getBoundingClientRect().width - chrome, 24);
      let n = Math.max(...names.map(x => x.length));
      ruler.textContent = joinAt(names, n);
      while (n > 1 && ruler.getBoundingClientRect().width > room) { n--; ruler.textContent = joinAt(names, n); }
      ruler.remove();
      return n;
    };

    const paintMore = () => {
      const heldTabs = tabsEl.slice(tabsEl.length - heldCount);
      if (!heldTabs.length) return;
      const active = heldTabs.find(t => t.getAttribute("aria-selected") === "true");
      if (active) { moreLabel.textContent = nameOf(active); return; }   /* the active one wins the label */
      moreLabel.textContent = joinAt(heldTabs.map(nameOf), letterFit());   /* same letter count for every name */
    };

    const hold = k => {
      heldCount = k;
      /* re-append every held tab each pass, in index order. Skipping the ones already in the box left
 newly-held tabs stacked on the end: at 1000px the select read Lineage, Retention, Contacts,
 Access, Stewardship — the two that arrived last sitting after the three that were there first. */
      tabsEl.forEach((t, i) => {
        const held = i >= tabsEl.length - k;
        t.classList.toggle("aods-menu__item", held);
        if (held) heldBox.appendChild(t);
        else if (t.parentNode !== list) list.insertBefore(t, overflow);
      });
      paintMore();
    };
    const railAll = () => {
      heldCount = 0;
      root.removeAttribute("data-fold"); root.removeAttribute("data-overflow");
      root.removeAttribute("data-numerals-off");   /* the numerals come back whenever the room does */
      list.hidden = false; list.classList.remove("aods-menu");
      heldBox.hidden = true; more.setAttribute("aria-expanded", "false");
      moreLabel.textContent = "";   /* never leave a stale placeholder behind a hidden trigger */
      tabsEl.forEach(t => { t.classList.remove("aods-menu__item");
        if (t.parentNode !== list) list.insertBefore(t, overflow); });
    };
    const room = () => { const cs = getComputedStyle(list);
      return { have: list.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0),
               gap: parseFloat(cs.columnGap) || 0 }; };
    /* The trigger grows to fill, so measuring its rendered width here would make need() equal have() forever
 and the loop would never move a second tab. Reserve its declared minimum instead. */
    const need = () => { const { gap } = room();
      const vis = tabsEl.filter(t => t.parentNode === list);
      const reserve = heldCount
        ? (parseFloat(getComputedStyle(overflow).minInlineSize) || 256) + gap
        : 0;
      return vis.reduce((sum, t) => sum + t.getBoundingClientRect().width, 0)
        + gap * Math.max(vis.length - 1, 0) + reserve; };
    const fits = () => need() <= room().have + 1;

    const layoutTabs = () => {
      railAll();
      if (fits()) return;                                   /* everything fits: no select at all */
      /* STEP ONE, before anything is hidden: drop the decorative numerals . They cost
 about 40px a tab — 360px across this nine-tab rail — and they are ornament, so they go before a
 single tab name does. Reversible: railAll() puts them back on the next pass that has the room. */
      if (root.hasAttribute("data-numerals")) {
        root.setAttribute("data-numerals-off", "");
        if (fits()) return;
      }
      root.setAttribute("data-overflow", "on");
      let k = Math.min(HELD_FIRST, tabsEl.length);           /* the last three, per the ruling */
      hold(k);
      while (!fits() && k < tabsEl.length) hold(++k);        /* still short? keep taking from the tail */
      /* THE FLOOR . Two ways to hit it, and the second is the one that bites first:
 nothing can stay on the rail, OR the placeholder has starved. At 480px eight names shared the cap
 and came out at one letter each — "P… · D… · Q… · S… · A… · L… · R… · C…", which is texture, not
 names. Below MIN_LETTERS the split has stopped buying anything, so take the whole rail instead. */
      if (k >= tabsEl.length || letterFit() < MIN_LETTERS) {
        railAll();   /* also restores the numerals: there is no rail left to crowd, and the rows have room */
        root.setAttribute("data-fold", "on");
        list.classList.add("aods-menu");
        tabsEl.forEach(t => t.classList.add("aods-menu__item"));
        list.hidden = true; fold.setAttribute("aria-expanded", "false");
        paintFold();
      }
    };

    const openMore = () => { heldBox.hidden = false; more.setAttribute("aria-expanded", "true");
      (tabsEl.slice(tabsEl.length - heldCount).find(t => t.getAttribute("aria-selected") === "true")
        || tabsEl[tabsEl.length - heldCount] || more).focus(); };
    const closeMore = (refocus = true) => { heldBox.hidden = true; more.setAttribute("aria-expanded", "false");
      if (refocus) more.focus(); };
    on(more, "click", () => heldBox.hidden ? openMore() : closeMore());
    on(more, "keydown", e => { if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); openMore(); } });
    on(heldBox, "keydown", e => {
      if (e.key === "Escape") { e.preventDefault(); closeMore(); } else if (e.key === "Tab") closeMore(false); });
    on(document, "click", e => { if (overflowed() && !heldBox.hidden && !root.contains(e.target)) closeMore(false); });
    root.addEventListener("aods:tabchange", () => { if (overflowed()) paintMore(); });

    let measuring = false;
    const remeasure = () => { if (measuring) return; measuring = true; layoutTabs();
      requestAnimationFrame(() => { measuring = false; }); };
    if (window.ResizeObserver) new ResizeObserver(remeasure).observe(root);
    remeasure();
    document.fonts?.ready.then(remeasure);   /* a webfont swap changes every tab's width */
  }

  /* ---- modal: <dialog class="aods-modal">. AODS.modal.open(el|id) uses showModal() — the platform gives the
 scrim, the focus trap, Escape and aria-modal. Focus returns to the opener on close. [data-modal-open="id"]
 on any button opens; [data-modal-close] inside closes; the title labels the dialog. */
  function modal(d) {
    if (d.dataset.aodsBound) return; d.dataset.aodsBound = "1";
    const title = d.querySelector(".aods-modal__title"); if (title && !d.hasAttribute("aria-labelledby")) d.setAttribute("aria-labelledby", id(title, "modal-title"));
    d.querySelectorAll("[data-modal-close]").forEach(b => on(b, "click", () => closeModal(d)));
    on(d, "cancel", e => { e.preventDefault(); closeModal(d); });
    on(d, "click", e => { if (e.target === d && d.dataset.modalLight !== undefined) closeModal(d); });
  }
  function openModal(target, opener) {
    const d = typeof target === "string" ? document.getElementById(target) : target; if (!d) return;
    modal(d); d._aodsOpener = opener || document.activeElement;
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    (d.querySelector("[autofocus]") || d.querySelector(".aods-modal__close") || d.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"))?.focus();
    d.dispatchEvent(new CustomEvent("aods:open", { bubbles: true }));
  }
  function closeModal(d) {
    if (!d.open) return;
    const done = () => { if (typeof d.close === "function") d.close(); else d.removeAttribute("open"); d._aodsOpener?.focus?.(); d.dispatchEvent(new CustomEvent("aods:close", { bubbles: true })); };
    if (REDUCED.matches || !d.animate) return done();
    d.animate([{ opacity: 1 }, { opacity: 0 }], { duration: DUR(), easing: EASE("exit") }).onfinish = done;
  }

  /* ---- menu: role=menu gets the menu keyboard model (Up/Down/Home/End, type-ahead, Escape); aria-disabled
 items are skipped and inert. Side navigation is NOT a menu: use <nav><ul class="aods-menu"> with plain
 links and aria-current="page" — no role, no script . */
  function menu(root) {
    if (root.dataset.aodsBound || root.getAttribute("role") !== "menu") return; root.dataset.aodsBound = "1";
    const items = () => [...root.querySelectorAll('[role="menuitem"], [role="menuitemradio"], [role="menuitemcheckbox"]')].filter(i => i.getAttribute("aria-disabled") !== "true");
    const first = items()[0];
    root.querySelectorAll('[role^="menuitem"]').forEach(it => { it.tabIndex = it === first ? 0 : -1; if (it.tagName === "BUTTON") it.type = "button"; });
    on(root, "click", e => { const it = e.target.closest('[role^="menuitem"]'); if (it && it.getAttribute("aria-disabled") === "true") { e.preventDefault(); e.stopImmediatePropagation(); } });
    on(root, "keydown", e => {
      const list = items(), cur = e.target.closest('[role^="menuitem"]'), i = list.indexOf(cur); let n = null;
      if (e.key === "ArrowDown") n = list[(i + 1) % list.length]; else if (e.key === "ArrowUp") n = list[(i - 1 + list.length) % list.length];
      else if (e.key === "Home") n = list[0]; else if (e.key === "End") n = list[list.length - 1];
      else if (e.key === "Escape") { root.dispatchEvent(new CustomEvent("aods:menuescape", { bubbles: true })); return; }
      else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { const k = e.key.toLowerCase(); n = list.find((x, j) => j > i && x.textContent.trim().toLowerCase().startsWith(k)) || list.find(x => x.textContent.trim().toLowerCase().startsWith(k)); }
      if (n) { e.preventDefault(); list.forEach(x => x.tabIndex = -1); n.tabIndex = 0; n.focus(); }
    });
  }

  /* ---- steps: an empty marker link is named by its label ("Step 2: Vehicle"), not by the CSS counter */
  function steps(root) {
    root.querySelectorAll(".aods-steps__item").forEach((li, i) => {
      const m = li.querySelector(".aods-steps__marker"), l = li.querySelector(".aods-steps__label");
      if (m && l && !m.textContent.trim() && !m.hasAttribute("aria-label")) m.setAttribute("aria-label", `Step ${i + 1}: ${l.textContent.trim()}`);
    });
  }

  /* ---- inventory ---- */
  /* search: the clear control shows when there is a value, clears and refocuses */
  function search(root) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";
    const input = root.querySelector(".aods-input"), clear = root.querySelector(".aods-search__clear"); if (!input) return;
    const sync = () => { if (input.value) root.dataset.hasValue = ""; else delete root.dataset.hasValue; };
    on(input, "input", sync); sync();
    if (clear) { clear.type = "button"; on(clear, "click", () => { input.value = ""; sync(); input.focus(); input.dispatchEvent(new Event("input", { bubbles: true })); }); }
  }
  /* in-page-nav: aria-current follows the section nearest the top of the viewport, and at the compact
 breakpoint the rail folds into the design system's select — the SAME composition tabs folds into
 (.aods-select__trigger + the menu), never the OS control. RULING 2026-08-28: "on compact it collapses
 into a sticky select", "exactly like tabs".
 The lever differs and only the lever: tabs MEASURES, because a nine-tab rail can fold at 1200px in a
 narrow column. A vertical rail loses its column at a known width — the one where the sidebar layout
 collapses — so this reads that breakpoint from the token rather than measuring. */
  function inPageNav(root) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";
    const links = [...root.querySelectorAll(".aods-in-page-nav__link[href^='#']")];
    const targets = links.map(l => document.getElementById(decodeURIComponent(l.getAttribute("href").slice(1)))).filter(Boolean);
    const list = root.querySelector(".aods-in-page-nav__list");
    if (!list) return;
    /* NOTE the guards. This used to bail before doing anything if the anchors resolved to nothing or the
 browser had no IntersectionObserver — which was fine when the only job was painting aria-current, and
 became a defect the moment the FOLD lived here too: a nav with one mistyped href, or a specimen whose
 sections are not on the page, kept the full rail at compact instead of collapsing. Caught in the sweep on
 the reference page. The fold is layout and must not depend on the observer; only the observer does. */

    /* ---- the fold. The wrap is permanent so the popover always has a positioning context; unfolded it is inert. */
    const wrap = document.createElement("div");
    wrap.className = "aods-in-page-nav__fold-wrap";
    list.parentNode.insertBefore(wrap, list);
    const fold = document.createElement("button");
    fold.type = "button";
    fold.className = "aods-in-page-nav__fold aods-select__trigger";   /* the DS select, not the native one */
    fold.setAttribute("aria-expanded", "false");
    fold.setAttribute("aria-controls", id(list, "in-page-nav"));
    const foldLabel = document.createElement("span");
    foldLabel.className = "aods-in-page-nav__fold-label";
    fold.appendChild(foldLabel);
    wrap.appendChild(fold);
    wrap.appendChild(list);

    const folded = () => root.getAttribute("data-fold") === "on";
    /* the trigger is named by the CURRENT section, the way the tabs fold is named by the selected tab.
 Falling back to the nav's own label keeps it named before the observer has painted anything. */
    const navLabel = root.querySelector(".aods-in-page-nav__label");
    const paintFold = () => { const cur = links.find(l => l.getAttribute("aria-current")) || links[0];
      foldLabel.textContent = cur ? cur.textContent : (navLabel ? navLabel.textContent : "On this page"); };
    const openFold = () => { list.hidden = false; fold.setAttribute("aria-expanded", "true");
      (links.find(l => l.getAttribute("aria-current")) || links[0] || fold).focus(); };
    const closeFold = (refocus = true) => { list.hidden = true; fold.setAttribute("aria-expanded", "false"); if (refocus) fold.focus(); };
    on(fold, "click", () => list.hidden ? openFold() : closeFold());
    on(fold, "keydown", e => { if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) { e.preventDefault(); openFold(); } });
    on(list, "keydown", e => { if (!folded()) return;
      if (e.key === "Escape") { e.preventDefault(); closeFold(); } else if (e.key === "Tab") closeFold(false); });
    /* choosing an anchor COMMITS — the popover shuts and the page travels. Without this the list stays
 open over the very section it just moved to. */
    links.forEach(l => on(l, "click", () => { if (folded()) closeFold(false); }));
    on(document, "click", e => { if (folded() && !list.hidden && !root.contains(e.target)) closeFold(false); });

    /* the lever: the breakpoint the sidebar layout collapses at, read from the token so one number governs
 the fold and the layout together and they can never disagree. */
    const bp = prop(document.documentElement, "--c-page-breakpoint-compact") || "1000px";
    const mq = window.matchMedia(`(max-width: ${bp})`);
    const setFold = () => { if (mq.matches) { root.setAttribute("data-fold", "on"); list.hidden = true; }
      else { root.removeAttribute("data-fold"); list.hidden = false; fold.setAttribute("aria-expanded", "false"); } };
    on(mq, "change", setFold); setFold();

    paintFold();
    if (!targets.length || !window.IntersectionObserver) return;
    /* THE CURRENT SECTION IS THE ONE UNDER THE STICKY CHROME (operator 2026-09-08: "the in-page-nav
      indicator is switching too early. It should switch when the section or subsection it is
      referring to is at the top of the page - so when it hits the sticky nav").
      WHAT IT USED TO DO: observe a band from 20% to 40% of the viewport and take the topmost target
      inside it, so a section became current as soon as its heading entered the upper third - most of
      a screen early, and EARLIER ON A TALLER WINDOW, because a percentage band grows with the
      viewport while the user's eye does not.
      THE LINE IS WHERE THE PAGE ACTUALLY DISAPPEARS: the bottom edge of the sticky header, already
      published as --_aods-header-height by the header itself. The current section is simply the last
      one whose top has passed that line - computed from geometry, so it is right even when nothing
      is crossing and above the first section, where the answer is the first.
      STILL OBSERVED, NOT SCROLLED. rootMargin insets the root to a 1px band ON the line, so the
      observer fires exactly when a section crosses it and at no other time. Both numbers are
      measurements rather than constants, so the observer is re-armed when either changes. */
    const line = () => parseFloat(getComputedStyle(document.documentElement)
      .getPropertyValue("--_aods-header-height")) || 0;
    /* A SECTION STARTS AT ITS CONTAINER, NOT AT ITS HEADING (operator 2026-09-08: "it should change
      at the container of a section - so sooner than currently. the section starts at the container
      not the component"). The href points at a heading because that is what an anchor can name, but
      the heading is not where the section begins: the container above it holds the seam the band
      above handed over, so by the time the heading reaches the line the user has been inside the
      new section for the whole of that padding. Measuring the CONTAINER moves the switch earlier by
      exactly that number - 39 on a band below a display h1 - which is the point at which the section
      actually arrives.
      ONE CONTAINER MAY HOLD TWO TARGETS - an h2 and an h3 of the same section - and then only the
      FIRST of them may claim it, or both would switch at the same pixel and the subsection would
      never be reachable. Assigned in DOCUMENT order rather than link order, because program.html
      already proves those two can disagree. */
    const anchor = new Map();
    (() => {
      const claimed = new Set();
      [...targets].sort((a, b) =>
        (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1
      ).forEach(t => {
        const c = t.closest('.aods-layout[data-kind="container"], .aods-paper');
        anchor.set(t, (c && !claimed.has(c)) ? c : t);
        if (c) claimed.add(c);
      });
    })();
    /* PICK BY POSITION, NOT BY ORDER. "The last one that has passed" is only the same as "the last
      one in the list" while the nav is in document order, and program.html proves it need not be:
      its final link, #faq, sits at y=510 with #overview at y=947, so a list-order scan made the FAQ
      current for the whole page. Taking the passed target CLOSEST to the line is the same answer
      when the orders agree and the right one when they do not. */
    const paint = () => {
      const y = line() + 1;
      let cur = null, best = -Infinity, first = null, firstTop = Infinity;
      for (const t of targets) {
        const top = (anchor.get(t) || t).getBoundingClientRect().top;
        if (top < firstTop) { firstTop = top; first = t; }
        if (top <= y && top > best) { best = top; cur = t; } }
      cur = cur || first;
      if (!cur) return;
      links.forEach(l => { if (l.getAttribute("href") === "#" + cur.id) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
      paintFold(); };
    /* WHY A 1PX DETECTION BAND WAS NOT ENOUGH, measured: with rootMargin insetting the root to a
      single line, a section that passes the line ENTIRELY between two frames is not-intersecting
      before and not-intersecting after - no state change, so no callback, so no repaint. A 600px
      jump on program.html left #faq painted while the user was four sections further down. Smooth
      scrolling hid it; a flick, an anchor jump or a restored scroll position does not.
      So the observer's band runs from the line to the bottom of the viewport - a section is in it
      while any part of it is still below the line - and a rAF-throttled scroll listener samples in
      between. The observer is the cheap signal; the listener is the guarantee. Both call the same
      geometry, so neither can disagree with the other. */
    let io = null;
    const arm = () => {
      if (io) io.disconnect();
      io = new IntersectionObserver(paint, { rootMargin: `-${line()}px 0px 0px 0px` });
      targets.forEach(t => io.observe(t)); };
    let queued = false;
    const sample = () => { if (queued) return; queued = true;
      requestAnimationFrame(() => { queued = false; paint(); }); };
    arm(); paint();
    on(window, "scroll", sample, { passive: true });
    on(window, "resize", () => { arm(); sample(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { arm(); paint(); });
  }
  /* toast: AODS.toast("Saved.", {status, title, sticky}) — stacks bottom-right, leaves on its own after --c-toast-motion-stay */
  function toastRegion() { let r = document.querySelector(".aods-toast-region"); if (!r) { r = document.createElement("div"); r.className = "aods-toast-region"; document.body.appendChild(r); } return r; }
  function toast(message, opts = {}) {
    const status = opts.status || "info", urgent = status === "error" || status === "emergency";
    const el = document.createElement("div"); el.className = "aods-toast"; el.dataset.status = status; el.setAttribute("role", urgent ? "alert" : "status");
    el.innerHTML = `<div class="aods-toast__body">${opts.title ? `<span class="aods-toast__title"></span>` : ""}<span class="aods-toast__text"></span></div><button class="aods-button aods-toast__dismiss" data-variant="tertiary" data-icon="only" aria-label="Dismiss" type="button"><svg class="aods-icon" data-size="md" aria-hidden="true"><use href="#aods-close"></use></svg></button>`;
    if (opts.title) el.querySelector(".aods-toast__title").textContent = opts.title;
    el.querySelector(".aods-toast__text").textContent = message;
    const leave = () => { if (el.dataset.leaving !== undefined) return; el.dataset.leaving = ""; const done = () => el.remove(); if (REDUCED.matches) done(); else el.addEventListener("animationend", done, { once: true }); };
    on(el.querySelector("button"), "click", leave);
    toastRegion().appendChild(el);
    if (!urgent && !opts.sticky) { const stay = ms(prop(el, "--c-toast-motion-stay") || prop(el, "--_stay"), 6000); let t = setTimeout(leave, stay);
      // the clock pauses while the pointer is over it OR while anything inside it has focus (a keyboard user reading the dismiss button must not lose it mid-read)
      const pause = () => clearTimeout(t), resume = () => { clearTimeout(t); t = setTimeout(leave, stay); };
      on(el, "pointerenter", pause); on(el, "pointerleave", resume); on(el, "focusin", pause); on(el, "focusout", e => { if (!el.contains(e.relatedTarget)) resume(); }); }
    return el;
  }
  /* error-summary: when it appears (or is revealed) it takes focus so the list is announced and read first */
  function errorSummary(root) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";
    root.tabIndex = -1; if (!root.hidden && root.dataset.autofocus !== undefined) root.focus();
    root.querySelectorAll(".aods-error-summary__link[href^='#']").forEach(a => on(a, "click", e => { const f = document.getElementById(a.getAttribute("href").slice(1)); if (f) { e.preventDefault(); f.focus(); f.scrollIntoView({ block: "center", behavior: REDUCED.matches ? "auto" : "smooth" }); } }));
  }

  /* ---- table wrap: it scrolls, so when it actually overflows it IS a control — reachable by keyboard, named
 by the table's caption, and ringed like anything else that can hold focus. When the table fits, the tab stop
 is removed again so it is never a stop for nothing . ---- */
  function tableWrap(w) {
    if (w.dataset.aodsBound) return; w.dataset.aodsBound = "1";
    const table = w.querySelector(".aods-table"); if (!table) return;
    const cap = table.querySelector("caption");
    if (cap && !w.hasAttribute("aria-label")) w.setAttribute("aria-labelledby", id(cap, "table-caption"));
    const sync = () => {
      if (w.scrollWidth > w.clientWidth + 1) { w.tabIndex = 0; w.setAttribute("role", "region"); }
      else { w.removeAttribute("tabindex"); w.removeAttribute("role"); }
    };
    sync();
    if (window.ResizeObserver) new ResizeObserver(sync).observe(w);
  }

  /* ---- table (): sortable heads and stacked labels. th[aria-sort] > button.aods-table__sort toggles
 ascending → descending → ascending, clears every other head to none, sorts the tbody rows client-side
 (numeric when BOTH cells parse as a number — "2,899.59", "12%", "$40" — else localeCompare with numeric
 collation) and announces "Sorted by {col}, {direction}" on a polite sr-only node placed after the table.
 data-stacked: every cell without a data-label gets its column head's text, so the stacked CSS can show it. ---- */
  function table(t) {
    if (t.dataset.aodsBound) return; t.dataset.aodsBound = "1";
    const heads = [...t.querySelectorAll("thead th")];
    if (t.hasAttribute("data-stacked")) t.querySelectorAll("tbody tr").forEach(tr => [...tr.children].forEach((cell, i) => {
      if (!cell.hasAttribute("data-label") && heads[i]) cell.setAttribute("data-label", heads[i].textContent.trim());
    }));
    const sorts = heads.filter(h => h.hasAttribute("aria-sort") && h.querySelector(".aods-table__sort"));
    if (!sorts.length) return;
    let live = t.parentElement.querySelector(":scope > .aods-table__live");
    if (!live) { live = document.createElement("div"); live.className = "aods-sr-only aods-table__live"; live.setAttribute("aria-live", "polite"); t.after(live); }
    const NUM = /^[-+]?\$?[\d,]*\.?\d+%?$/;
    const num = s => NUM.test(s) ? parseFloat(s.replace(/[$,%]/g, "")) : null;
    sorts.forEach(h => on(h.querySelector(".aods-table__sort"), "click", () => {
      const dir = h.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";
      sorts.forEach(o => o.setAttribute("aria-sort", o === h ? dir : "none"));
      const i = heads.indexOf(h), body = t.tBodies[0]; if (!body || body.hasAttribute("data-empty")) return;
      const rows = [...body.rows], val = r => (r.cells[i]?.textContent || "").trim();
      rows.sort((a, b) => {
        const va = val(a), vb = val(b), na = num(va), nb = num(vb);
        const c = na !== null && nb !== null ? na - nb : va.localeCompare(vb, undefined, { numeric: true, sensitivity: "base" });
        return dir === "ascending" ? c : -c;
      });
      rows.forEach(r => body.appendChild(r));
      live.textContent = `Sorted by ${h.querySelector(".aods-table__sort").textContent.trim()}, ${dir}`;
      t.dispatchEvent(new CustomEvent("aods:sort", { bubbles: true, detail: { column: i, direction: dir } }));
    }));
  }

  /* ---- site-alert: the dismiss removes the band and says so (aods:dismiss), like the chip.
 DISMISSIBLE BY DEFAULT (operator ruling). Every band carries the __dismiss, so the button is the
 declaration: there is no attribute to turn it on. ---- */
  function siteAlert(root) {
    if (root.dataset.aodsBound) return; root.dataset.aodsBound = "1";
    root.querySelectorAll(".aods-site-alert__dismiss").forEach(b => on(b, "click", () => { root.dispatchEvent(new CustomEvent("aods:dismiss", { bubbles: true })); root.remove(); }));
  }

  function init(scope = document) {
    scope.querySelectorAll(".aods-table").forEach(table);
    scope.querySelectorAll(".aods-site-alert").forEach(siteAlert);
    scope.querySelectorAll(".aods-select").forEach(select);
    scope.querySelectorAll(".aods-header").forEach(header);
    scope.querySelectorAll(".aods-footer").forEach(footer);
    scope.querySelectorAll(".aods-chip-group").forEach(chipGroup);
    scope.querySelectorAll("[data-reveal]").forEach(reveal);
    scope.querySelectorAll(".aods-reference-list").forEach(referenceList);
    scope.querySelectorAll("details[class^=\"aods-\"]").forEach(easeDetails);
    scope.querySelectorAll(".aods-tabs").forEach(t => tabs(t));
    scope.querySelectorAll(".aods-explorer").forEach(e => tabs(e, false));
    scope.querySelectorAll(".aods-modal").forEach(modal);
    scope.querySelectorAll(".aods-menu").forEach(menu);
    scope.querySelectorAll(".aods-steps").forEach(steps);
    scope.querySelectorAll(".aods-search").forEach(search);
    scope.querySelectorAll(".aods-in-page-nav").forEach(inPageNav);
    scope.querySelectorAll(".aods-error-summary").forEach(errorSummary);
    scope.querySelectorAll(".aods-table-wrap").forEach(tableWrap);
    scope.querySelectorAll("[data-modal-open]").forEach(b => { if (!b.dataset.aodsBound) { b.dataset.aodsBound = "1"; on(b, "click", () => openModal(b.dataset.modalOpen, b)); } });
    scope.querySelectorAll(".aods-disclosure").forEach(d => disclosure(d));
  }
  /* an aria-disabled button stays focusable and announced (unlike disabled), so the script is what makes it inert:
 a capture-phase guard swallows the click before any handler, without pointer-events:none */
  document.addEventListener("click", e => { const b = e.target.closest?.('.aods-button[aria-disabled="true"]'); if (b) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
  on(document, "keydown", e => { if (e.key === "Escape") document.querySelectorAll('.aods-header:not([data-open="true"]) .aods-header__nav-item[aria-expanded="true"]').forEach(b => { b.click(); b.focus(); }); });
  /* ---- disclosure: an UPSIDE-DOWN SELECT (ruling) — the open panel grows upward as an overlay,
 covering the content above the bar without moving the page. The CSS anchors the panel to the bar's bottom
 edge; the script's only structural job is measuring the panel so the bar can ride up on top of it
 (--_rise). It takes the popover contract — Escape closes the one that has focus and returns focus to its
 bar; a pointerdown anywhere outside an open disclosure closes it. Nothing else in the page needs to know. */
  function disclosure(d) {
    if (d.dataset.aodsRise) return; d.dataset.aodsRise = "1";
    const panel = d.querySelector(".aods-disclosure__panel"); if (!panel) return;
    /* THE WAY OUT (): a close control in the panel's bottom corner, injected rather than authored.
 The panel opens upward, so that corner is where the pointer already is; the bar is a panel-height away.
 Injected because it cannot work without this script — an authored one would be a dead control wherever
 the script has not run. The mark is the bar's own MINUS: this component says + closed and - open, so
 its way out says - too. Not the close X, which dismisses rather than collapses. */
    if (!panel.querySelector(".aods-disclosure__close")) {
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "aods-disclosure__close";
      btn.innerHTML = `Close<span class="aods-disclosure__close-glyph" aria-hidden="true">\u2212</span>`;
      btn.addEventListener("click", () => { d.open = false; d.querySelector(":scope > summary")?.focus(); });
      const list = /^(UL|OL)$/.test(panel.tagName);
      if (list) { const li = document.createElement("li"); li.className = "aods-disclosure__close-row"; li.appendChild(btn); panel.appendChild(li); }
      else { const row = document.createElement("div"); row.className = "aods-disclosure__close-row"; row.appendChild(btn); panel.appendChild(row); }
    }
    on(d, "toggle", () => { if (d.open) d.style.setProperty("--_rise", panel.offsetHeight + "px"); });
  }
  document.querySelectorAll(".aods-disclosure").forEach(disclosure);
  on(document, "keydown", e => {
    if (e.key !== "Escape") return;
    const d = document.activeElement?.closest?.(".aods-disclosure[open]"); if (!d) return;
    d.open = false; d.querySelector(":scope > summary")?.focus();
  });
  on(document, "pointerdown", e => {
    document.querySelectorAll(".aods-disclosure[open]").forEach(d => { if (!d.contains(e.target)) d.open = false; });
  });
  /* settled (ruling): a press fades the hover wash out; leaving the element re-arms it. The attribute
 goes on the INTERACTIVE HOST — the summary, button, link, tab, option, row — not on whatever child was hit,
 so every expanding component (details/summary) takes the rule too. */
  const HOSTS = 'summary, button, a[href], [role="tab"], [role="menuitem"], [role="option"], [role="button"], label, tr, [data-interactive], .aods-chip, .aods-conv-source';
  on(document, "pointerup", e => {
    if (e.pointerType === "touch") return;
    let el = e.target.closest?.(HOSTS); while (el && !/(^|\s)aods-/.test(el.className || "")) el = el.parentElement?.closest(HOSTS);
    if (!el) return;
    el.setAttribute("data-aods-settled", ""); el.addEventListener("pointerleave", () => el.removeAttribute("data-aods-settled"), { once: true });
  });
/* HEADLINE FIT (RULING 2026-08-30). The measure is CSS; the rung cannot be, because nothing counts
   lines in a stylesheet. Stamp data-rung and let the CSS ladder do the rest. The ladder floors at
   display-xs and each container query re-declares the rungs, so this can only ever step DOWN from
   whatever the breakpoint already chose - the responsive ladder sets the ceiling. */
  const HEADLINE_MAX_LINES = 2;
  function fitHeadlines(root = document) {
    root.querySelectorAll('.aods-section-heading[data-scale="display"] .aods-section-heading__heading')
      .forEach(el => {
        el.removeAttribute("data-rung");                       // always re-measure from the ceiling
        for (let rung = 0; rung < 2; ) {
          const lh = parseFloat(getComputedStyle(el).lineHeight);
          if (!lh || el.getBoundingClientRect().height / lh <= HEADLINE_MAX_LINES) break;
          el.dataset.rung = String(++rung);
        }
      });
  }
  let fitTimer;
  on(window, "resize", () => { clearTimeout(fitTimer); fitTimer = setTimeout(() => fitHeadlines(), 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => fitHeadlines());
  const _initWas = init;
  init = function (r) { _initWas(r); fitHeadlines(r || document); };

/* THE SEAM FOLLOWS THE LEAD DOWN (fix 2026-09-04). The seam a band owes the band under it is
   1.5 x the largest line in THIS band, and the CSS sibling ladder derives that with :has() - which
   reads the MARKUP and cannot see that the heading has since stepped down a size. Measured across
   six widths: --_lead correctly went 52 -> 44 at 900 through the section-heading's own container
   query, and --_seam stayed at 78 all the way down, because the ladder still matched a display-md
   heading that was no longer rendering at display-md. A container query cannot reach a following
   sibling's ground, so no selector can fix this.
   THIS DOES NOT RE-DERIVE ANYTHING. It reads the --_lead the cascade has ALREADY computed on one
   container and forwards it to the next one as --_seam, which is the one thing CSS cannot do for
   itself. The ladder stays exactly as it is and remains the answer with no script: it is right at
   every width where nothing has stepped, so what this corrects is the stepped case only. Same
   reason data-rung is stamped rather than declared - nothing counts lines in a stylesheet, and
   nothing reads a sibling's computed value either. */
  function seams(root = document) {
    root.querySelectorAll("main").forEach(m => {
      let prev = null;
      [...m.children].forEach(sec => {
        /* EVERY container in the band, not just the first: a two-container ground has two columns
           and both are owed the same seam. Reading only the first left the second column falling
           back to the stylesheet, which cannot see the band above it. */
        /* A BAND MAY HOLD GROUNDS, so its containers sit one level deeper (2026-09-08). Until this,
           seams() walked main's children looking for containers directly under them - true of a
           band that IS a ground, false of a band that HOLDS grounds, so a two-ground band could not
           be handed the seam from the band above it and fell back to its own isolated value.
           Measured: 12 where the rule wants 30. */
        const all = [...sec.querySelectorAll(':scope > .aods-layout[data-kind="container"],'
                     + ' :scope > .aods-ground > .aods-layout[data-kind="container"]')];
        const c = all[0];
        if (!c) return;
        if (prev) {
          const lead = parseFloat(getComputedStyle(prev).getPropertyValue("--_lead"));
          const ratio = parseFloat(getComputedStyle(prev).getPropertyValue("--c-layout-lead-ratio")) || 1.5;
          /* a breadcrumb band hands over a DECLARED number, not a derived one - leave it to the CSS */
          const crumb = prev.querySelector(".aods-breadcrumb") && !prev.querySelector(':scope > :not(.aods-breadcrumb)');
          /* THE RATIO STEPS TO 2 ACROSS A COLOR CHANGE (operator 2026-09-04: "when switching color
             modes, the formula goes from 1.5 to 2 x the largest line height of the preceding
             container"). The seam is the same KIND of number either way - the preceding band's
             largest line, times a constant - so this is one rule with two constants rather than a
             special case. And it repairs the polarity seam, which until now was built from the
             wrong two numbers: the band above closed at its own TOP pad and the band below opened
             at half its OWN lead, so the one boundary the model says is owed by the section above
             was the only one that never read that section's lead. Measured stuck at 78 across four
             widths while the headline stepped 52 -> 44 underneath it. */
          const dark = g => { const v = g.getAttribute("data-ground");
            return v === "dark" || v === "brand" || v === "vivid"; };
          /* THE POLARITY OF A BAND IS ITS GROUNDS', and a band that holds more than one may hold
             both. It counts as dark only when EVERY ground in it is dark: a band that is half dark
             does not flip the whole page's polarity, and treating it as if it did would step the
             seam to 2x above a boundary that is light on one side. */
          const gsOf = sec.classList.contains("aods-band")
            ? [...sec.children].filter(e => e.classList.contains("aods-ground")) : [sec];
          const flip = dark(prev.closest(".aods-ground")) !== (gsOf.length > 0 && gsOf.every(dark));
          const flipRatio = parseFloat(getComputedStyle(prev).getPropertyValue("--c-layout-lead-ratio-polarity")) || 2;
          const total = (flip ? flipRatio : ratio) * lead;
          /* HALF ON EITHER SIDE OF THE BOUNDARY (operator 2026-09-04: "88 with 44 on either side").
             The boundary is the thing being balanced, not the band: a color change is an edge, and
             an edge wants equal air above and below it. So the band above closes at half the seam
             and the band below opens at half, and the two halves are painted in different grounds
             - which is the ONE place a 50/50 split is right, and is why the general split was
             withdrawn while this one stands. */
          /* publish the WHOLE owed seam; the stylesheet takes half of it for this band's top and
             the band above pays the other half out of its own padding-bottom */
          all.forEach(col => {
            if (lead && !crumb) col.style.setProperty("--_seam", Math.round(total) + "px");
            else col.style.removeProperty("--_seam");
          });
        }
        /* what the band owes BELOW derives from its tallest line, whichever column holds it */
        prev = all.reduce((a, x) => (parseFloat(getComputedStyle(x).getPropertyValue("--_lead")) || 0)
                                  > (parseFloat(getComputedStyle(a).getPropertyValue("--_lead")) || 0) ? x : a, c);
      });
    });
  }
  let seamTimer;
  on(window, "resize", () => { clearTimeout(seamTimer); seamTimer = setTimeout(() => seams(), 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => seams());
  const _initSeams = init;
  init = function (r) { _initSeams(r); seams(r || document); };

  window.AODS = Object.assign(window.AODS || {}, { init, toast, modal: { open: openModal, close: closeModal } });
  if (document.readyState === "loading") on(document, "DOMContentLoaded", () => init()); else init();
})();
