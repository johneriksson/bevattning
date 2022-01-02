const spawn = require("child_process").spawn;

export async function toggleLED(): Promise<void> {
    return new Promise((resolve, reject) => {
        const cmd = spawn("/usr/bin/python", ["./python-scripts/toggle-led.py"]);

        cmd.stderr.on("data", (error: any) => {
            console.log("error", error);
            reject(error);
        });
    
        cmd.on("close", (code: number) => {
            if (code !== 0) {
                reject(new Error("Failed to toggle LED."));
                return;
            }

            resolve();
        });
    });
}