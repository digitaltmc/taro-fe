/** * 判断是否为微信小程序 * * @export * @returns */

// export function isWeChatApp() {
//   const ua = window.navigator.userAgent.toLowerCase();
//   return new Promise((resolve) => {
//     if (ua.indexOf('micromessenger') == -1) {//不在微信或者小程序中
//       resolve(true);
//     } else {
//       wx.miniProgram.getEnv((res) => {
//         if (res.miniprogram) {//在小程序中
//           resolve(false);
//         } else {//在微信中
//           resolve(true);
//         }
//       });
//     }
//   });
// }

export function isWeChatApp() {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf('micromessenger') == -1) {//不在微信或者小程序中
    return true;
  } else {
    wx.miniProgram.getEnv((res) => {
      if (res.miniprogram) {//在小程序中
        return false;
      } else {//在微信中
        return true;
      }
    });
  }
}

// ---------------------

// 作者：sxtysjzx0606
// 来源：CSDN
// 原文：https://blog.csdn.net/sxtysjzx0606/article/details/82427346
// 版权声明：本文为博主原创文章，转载请附上博文链接！
