const spawn = require("child_process").spawn;

let wateringMutex = 0;
export async function waterPlantOnce(index: number): Promise<void> {
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (wateringMutex === 0) {
                clearInterval(interval);
                wateringMutex = 1;
    
                const cmd = spawn("/usr/bin/python", ["./python-scripts/water-once.py", index]);
    
                cmd.stderr.on("data", (error: any) => {
                    console.log("a");
                    console.log("error", error);
                    reject(error);
                    wateringMutex = 0;
                });
            
                cmd.on("close", (code: number) => {
                    console.log("b");
                    if (code !== 0) {
                        reject(new Error("Failed to water plant."));
                        wateringMutex = 0;
                        return;
                    }
    
                    resolve();
                    wateringMutex = 0;
                });
            }
        }, 100);
    });
}