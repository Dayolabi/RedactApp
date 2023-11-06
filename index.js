document.addEventListener("DOMContentLoaded", function () {
  const originalTextElement = document.getElementById("originalText");
  const wordsToScrambleElement = document.getElementById("wordsToScramble");
  const replaceWithElement = document.getElementById("replaceWith");
  const redactButton = document.getElementById("redactButton");
  const outputContainer = document.getElementById("output-container");
  const scrambledTextElement = document.getElementById("scrambledText");
  const statsElement = document.getElementById("stats");
  const copyButton = document.getElementById("copyButton");
  const clearButton = document.getElementById("clearButton");

  redactButton.addEventListener("click", function () {
      const originalText = originalTextElement.value;
      const wordsToScramble = wordsToScrambleElement.value.split(" ");
      let replaceWith = replaceWithElement.value.trim();

      if (replaceWith === "") {
          replaceWith = "****";
      }

      if (originalText.trim() === '') {
          alert("Please enter some text in the 'Original Text' box.");
          return;
      }

      const startTime = Date.now();

      let scrambledText = originalText;
      let wordsMatched = 0;
      let charactersScrambled = 0;

      for (const word of wordsToScramble) {
          const regex = new RegExp(`\\b${word}\\b`, "ig");
          scrambledText = scrambledText.replace(regex, (match) => {
              wordsMatched++;
              charactersScrambled += match.length;
              return replaceWith;
          });
      }

      const endTime = Date.now();
      const elapsedTime = (endTime - startTime) / 1000;

      scrambledTextElement.textContent = scrambledText;
      statsElement.textContent = "Words Scanned: " + wordsToScramble.length +
          ", Words Matched: " + wordsMatched +
          ", Characters Scrambled: " + charactersScrambled +
          ", Time Taken: " + elapsedTime.toFixed(2) + " seconds";

      outputContainer.style.display = "block";
      copyButton.style.display = "block";
      clearButton.style.display = "block";
  });

  copyButton.addEventListener("click", function () {
      const textToCopy = scrambledTextElement.textContent;
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Redacted Text Copied to Clipboard");
  });

  clearButton.addEventListener("click", function () {
      originalTextElement.value = "";
      wordsToScrambleElement.value = "";
      replaceWithElement.value = "";
      scrambledTextElement.textContent = "";
      statsElement.textContent = "";
      outputContainer.style.display = "none";
      copyButton.style.display = "none";
  });
});
