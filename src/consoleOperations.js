const codeOutput = document.getElementById('code-output');

/**
 * Prints a message to the game console.
 * Newlines in the message are rendered as line breaks.
 *
 * @param {string} message - The message to print.
 */
export function printToConsole(message = "") {
    if (!codeOutput) return;
    codeOutput.scrollTop = codeOutput.scrollHeight;
    const escaped = String(message).replace(/\n/g, '<br>');
    codeOutput.innerHTML += "<span id=\"printText\">" + escaped + "</span>";
}

/**
 * Prints a message followed by a newline to the game console.
 *
 * @param {string} message - The message to print.
 */
export function printlnToConsole(message = "") {
    if (!codeOutput) return;
    codeOutput.scrollTop = codeOutput.scrollHeight;
    codeOutput.innerHTML += "<span id=\"printText\">" + message + "</span><br>";
}

/**
 * Clears the in-game console of all its content.
 */
export function clearConsole() {
    codeOutput.innerHTML = '';
}

/**
 * Prints an error message to the game console.
 *
 * @param {string} message - The error message.
 */
export function printErrorToConsole(message = "") {
    codeOutput.scrollTop = codeOutput.scrollHeight;
    codeOutput.innerHTML += "<span id=\"errorText\">" + message + "</span><br>";
}

/**
 * Prints an warning message to the game console.
 *
 * @param {string} message - The warning message.
 */
export function printWarningToConsole(message = "") {
    codeOutput.scrollTop = codeOutput.scrollHeight;
    codeOutput.innerHTML += "<span id=\"warningText\">" + message + "</span><br>";
}

