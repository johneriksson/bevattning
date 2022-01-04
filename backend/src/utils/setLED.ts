const spawn = require("child_process").spawn;

export async function setLED(on: Boolean): Promise<void> {
    console.log("on", on);
    return new Promise((resolve, reject) => {
        const cmd = spawn("/usr/bin/python", ["./python-scripts/control-led.py", on ? 1 : 0]);

        cmd.stderr.on("data", (error: any) => {
            console.log("error", error.toString());
            reject(error);
        });
    
        cmd.on("close", (code: number) => {
            if (code !== 0) {
                reject(new Error("Failed to set LED."));
                return;
            }

            resolve();
        });
    });
}