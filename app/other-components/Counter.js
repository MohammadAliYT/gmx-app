"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Counter: {count}</p>
      <button
        className="bg-blue-400 p-5 m-5"
        onClick={() => {
          setCount(count + 1);
          console.log("counter incremented");
        }}
      >
        Increment
      </button>
    </div>
  );
}

// pages/index.js
// export async function getStaticProps() {
//   return {
//     props: {}, // No props needed, we just want to use SSG
//   };
// }
