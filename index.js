document.addEventListener("DOMContentLoaded", function () {
    const originalTextElement = document.getElementById("originalText");
    const wordsToRedactElement = document.getElementById("wordsToRedact");
    const replaceWithElement = document.getElementById("replaceWith");
    const redactButton = document.getElementById("redactButton");
    const outputContainer = document.getElementById("output-container");
    const redactedTextElement = document.getElementById("redactedText");
    const statsElement = document.getElementById("stats");
    const copyButton = document.getElementById("copyButton");
    const clearButton = document.getElementById("clearButton");

    redactButton.addEventListener("click", function () {
        const originalText = originalTextElement.value;
        let wordsToRedact = wordsToRedactElement.value.split(" ");
        wordsToRedact = wordsToRedact.filter(word => word.trim() !== ''); // Remove empty strings

        let replaceWith = replaceWithElement.value.trim();

        if (replaceWith === "") {
            replaceWith = "****";
        }

        if (originalText.trim() === '') {
            alert("Please enter some text in the 'Original Text' box.");
            return;
        }

        if (wordsToRedact.length === 0) {
            alert("Please enter words to redact in the 'Words to Redact' box.");
            return;
        }

        const startTime = Date.now();

        let redactedText = originalText;
        let wordsMatched = 0;
        let charactersRedacted = 0;

        for (const word of wordsToRedact) {
            const regex = new RegExp(`\\b${word}\\b`, "ig");
            redactedText = redactedText.replace(regex, (match) => {
                wordsMatched++;
                charactersRedacted += match.length;
                return replaceWith;
            });
        }

        const endTime = Date.now();
        const elapsedTime = (endTime - startTime) / 1000;

        redactedTextElement.textContent = redactedText;
        statsElement.textContent = "Words Scanned: " + wordsToRedact.length +
            ", Words Matched: " + wordsMatched +
            ", Characters Redacted: " + charactersRedacted +
            ", Time Taken: " + elapsedTime.toFixed(2) + " seconds";

        outputContainer.style.display = "block";
        copyButton.style.display = "block";
        clearButton.style.display = "block";
    });

    copyButton.addEventListener("click", function () {
        const textToCopy = redactedTextElement.textContent;
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
        wordsToRedactElement.value = "";
        replaceWithElement.value = "";
        redactedTextElement.textContent = "";
        statsElement.textContent = "";
        outputContainer.style.display = "none";
        copyButton.style.display = "none";
    });
});
