import { emitKeypressEvents } from 'readline';
import readline from "node:readline";

const readlineInterface = readline.createInterface({
    input: process.stdin
});

const listener = (_, key) => {
    if (key.name === "escape" ||
        key.ctrl && key.name === 'c') {
        cleanUpTerminal();
    }
    render();
}

function setUpTerminal() {    
    emitKeypressEvents(process.stdin, readlineInterface);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", listener);
    //use terminal alternate screen
    process.stdout.write("\x1b[?1049h");
    //hide cursor
    process.stdout.write("\x1B[?25l");
    render();
}

function cleanUpTerminal() {    
    process.stdin.off("keypress", listener);
    process.stdin.setRawMode(false);
    readlineInterface.close();
    //return from terminal alternate screen
    process.stdout.write("\x1b[?1049l");
    //unhide cursor
    process.stdout.write("\x1B[?25h");
    process.exit();
}

function render() {
    console.clear();
    process.stdout.cursorTo(0,0);
    process.stdout.write("Press 'Esc' or Ctrl+C to exit.");
}

setUpTerminal() 
