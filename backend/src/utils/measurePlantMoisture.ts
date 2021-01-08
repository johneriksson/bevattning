const spawn = require("child_process").spawn;

export async function measureMoisture(index: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const cmd = spawn("/usr/bin/python", ["./python-scripts/measure.py", index]);

        cmd.stderr.on("data", (error: ErrorEvent) => {
            reject(error);
        });

        cmd.stdout.on("data", (data: Object) => {
            resolve(data.toString());
        });
    });
}