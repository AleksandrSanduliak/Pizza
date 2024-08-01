export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// export function setCookie(name, value, options = {}) {
//   options = {
//     path: "/",
//     // при необходимости добавьте другие значения по умолчанию
//     ...options,
//   };

//   if (options.expires instanceof Date) {
//     options.expires = options.expires.toUTCString();
//   }

//   let updatedCookie =
//     encodeURIComponent(name) + "=" + encodeURIComponent(value);

//   for (let optionKey in options) {
//     updatedCookie += "; " + optionKey;
//     let optionValue = options[optionKey];
//     if (optionValue !== true) {
//       updatedCookie += "=" + optionValue;
//     }
//   }

//   document.cookie = updatedCookie;
// }

export function strToObj(str) {
  str = str.split(", ");
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split("=");
    result[cur[0]] = cur[1];
  }
  return result;
}
