#!/usr/bin/env node

process.stdin.setEncoding("utf8");
let prompt = "";
process.stdin.on("data", (chunk) => { prompt += chunk; });
process.stdin.on("end", () => {
  if (!prompt.includes("<learner_answer>")) process.exitCode = 2;
  else process.stdout.write(JSON.stringify({
    score:10,
    passed:true,
    feedback:/[\u0600-\u06ff]/.test(prompt) ? "وضّحت الفرق بين الطلب والاستجابة بدقة، وقدّمت مثالًا مفيدًا." : "Clear request and response distinction with a useful example.",
  }));
});
