import React, { useEffect, useState } from "react";
import styles from "../styles/ticker.module.css";
import protobuf from "protobufjs";

const { Buffer } = require("buffer/");

export default function Ticker() {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const ws = new WebSocket("wss://streamer.finance.yahoo.com");

    protobuf.load("./YPricingData.proto", (error, root) => {
      if (error) {
        return console.log(error);
      }
      const Yaticker = root.lookupType("yaticker");

      ws.onopen = function open() {
        console.log("opened");
        ws.send(
          JSON.stringify({
            subscribe: ["^IXIC"],
          })
        );
      };

      ws.onclose = function close() {
        console.log("closed");
      };

      ws.onmessage = function incoming(data) {
        console.log("message");
        const next = Yaticker.decode(new Buffer(data.data, "base64"));

        setCurrent(next);
      };
    });
  }, []);

  function commafy(num) {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  }

  return (
    <div className={`${styles.vReuC} ${styles.GEykwb} `}>
      <span className={styles.hEj6ke}>
        <div jsname="VORjKe" className={styles.tGqfud}>
          <div
            className={`${styles.n1rUf} ${
              current && current.change.toFixed(2) < 0 ? `${styles.tmWKn}` : `${styles.uoQxH}`
            }`}
          >
            <span
              className={`${styles.ZoIEk} ${
                current && current.change.toFixed(2) < 0 ? `${styles.tmWKn}` : `${styles.uoQxH}`
              }`}
              aria-hidden="true"
            >
              <svg
                focusable="false"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className={styles.NMm5M}
              >
                {current && current.change.toFixed(2) < 0 ? (
                  <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                ) : (
                  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                )}
              </svg>
            </span>
          </div>
        </div>
      </span>
      <div className={styles.VKMjFc}>
        <div className={styles.pKBk1e}>Nasdaq</div>
        <div className={styles.wzUQBf}>
          <span className={styles.lh92}>
            <div jsname="ip75Cb" className={styles.s1OkXb}>
              <div className={styles.YMlKec}>{current && commafy(current.price.toFixed(2))}</div>
            </div>
          </span>
        </div>
      </div>
      <div className={styles.T7Akdb}>
        <span
          jsname="p08n3b"
          className={`${styles.NydbP} ${styles.a3qxNc}`}
          data-disable-percent-toggle="true"
          data-multiplier-for-price-change="1"
          aria-label="Up by 1.30%"
        >
          <div
            jsname="m6NnIb"
            className={`${styles.zWwE1} ${styles.P2Luy} ${styles.t5mBV} ${
              current && current.change.toFixed(2) < 0 ? `${styles.Ebnabc}` : `${styles.Ez2Ioe}`
            }`}
          >
            <div className={`${styles.JwB6zf} ${styles.V7hZne}`}>
              {current && current.change.toFixed(2) > 0 ? "+" : ""}
              {current && current.changePercent.toFixed(2)}%
            </div>
          </div>
        </span>
        <div className={styles.SEGxAb}>
          <div
            className={styles.BAftM}
            jsname="vY9t3b"
            data-animation-size="16"
            // style="transform: translateY(calc(-100% + 16px));"
          >
            <span
              className={`${styles.P2Luy} ${
                current && current.change.toFixed(2) < 0 ? `${styles.Ebnabc}` : `${styles.Ez2Ioe}`
              }`}
            >
              {current && current.change.toFixed(2) > 0 ? "+" : ""}
              {current && current.change.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
