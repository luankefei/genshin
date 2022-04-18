import fetch from "isomorphic-unfetch";
import { normalizedQuery, httpBuildQuery } from "./request";

interface IParam {
  [key: string]: string | number;
}

// send api
function send(logKey: string, params?: IParam) {
  try {
    const page = window.location.pathname.substring(1, location.pathname.length).split("/").pop() || "me";
    const queryStr = httpBuildQuery(
      normalizedQuery({
        page,
        log_key: logKey,
        ...params,
        ua: navigator.userAgent,
      })
    );
    sendLog(queryStr);
  } catch (err) {
    console.error("send log error", logKey, params);
  }
}

function sendLog(queryStr: string) {
  const img = document.createElement("img");
  const el = document.getElementById("app");
  img.src = ["https://statistics.laiye.com/static/p.gif?", queryStr].join("");

  if (el) {
    el.appendChild(img);
    setTimeout(() => {
      el.removeChild(img);
    }, 0);
  }
}

export default {
  send,
};
