const spawn = require("child_process").spawn;

export async function readLEDStatus(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const cmd = spawn("/usr/bin/python", ["./python-scripts/read-led.py"]);

        cmd.stderr.on("data", (error: ErrorEvent) => {
            reject(error);
        });

        cmd.stdout.on("data", (data: Object) => {
            console.log("data", data);
            console.log("data.toString()", data.toString());
            resolve(data.toString().trim() === "ON");
        });
    });
}