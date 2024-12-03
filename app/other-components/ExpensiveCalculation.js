export default function ExpensiveCalculation() {
  // This calculation happens at build time for static rendering
  function expensiveCalculation() {
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i);
    }
    console.log("expensiveCalculation");
    return result.toFixed(2);
  }

  const result = expensiveCalculation();

  return <p>Build-time computed value: {result}</p>;
}

// pages/index.js
// export async function getStaticProps() {
//   return {
//     props: {}, // No props needed, we just want to use SSG
//   };
// }
