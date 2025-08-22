export class TaskQueue {
    constructor() {
        this.tasks = [];
        this.isRunning = false;
        this.isPaused = false;
        this.currentTask = null;
    }

    // Adding tasks to the queue
    addTask(task) {
        this.tasks.push(task);
        if (!this.isRunning) {
            this.start();
        }
    }

    // Deleting a task
    removeTask(taskToRemove) {
        this.tasks = this.tasks.filter(task => task !== taskToRemove);
    }

    // Clear the task queue
    clearQueue() {
        this.tasks = [];
    }

    // Pause task execution
    pause() {
        this.isPaused = true;
    }

    // Resume task execution
    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            if (!this.isRunning) {
                this.start();
            }
        }
    }

    // Internal startup method
    async start() {
        this.isRunning = true;
        while (this.tasks.length > 0 && !this.isPaused) {
            this.currentTask = this.tasks.shift();
            await this.currentTask();

            // Check if the task queue is cleared or not
            if (this.isPaused || this.tasks.length === 0) {
                this.isRunning = false;
                break;
            }
        }
        this.isRunning = false;
    }
}

// Example task function
function exampleTask(id) {
    return () =>
        new Promise(resolve => {
            console.log(`Executing task ${id}`);
            setTimeout(() => {
                console.log(`Task ${id} completed`);
                resolve();
            }, 1000); // Each task takes 1 second
        });
}

// Test Example
const queue = new TaskQueue();

// Adding tasks to the queue
for (let i = 1; i <= 5; i++) {
    queue.addTask(exampleTask(i));
}

// Pause the queue and execute after 2.5 seconds
setTimeout(() => {
    console.log('Pausing queue...');
    queue.pause();
}, 2500);

// Resume queue, execute after 4.5 seconds
setTimeout(() => {
    console.log('Resuming queue...');
    queue.resume();
}, 4500);

// Clear the queue and execute after 3 seconds
setTimeout(() => {
    console.log('Clearing queue...');
    queue.clearQueue();
}, 3000);
