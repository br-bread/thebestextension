
const vscode = require('vscode');

//import { notifyUser, setWorkDuration, setBreakDuration } from './pomodoro.js';

/**
 * @param {vscode.ExtensionContext} context
 */

let workDuration = 25 * 60; 
let breakDuration = 5 * 60; 
let timer;
let isPomodoroActive = false;

function startTimer(duration, timerType) {
	var notifications = [
		"Keep working!",
		"Great job! Keep working!",
		"Don't stop working!",
		"The harder the work, the better the result!",
		"Work work work",
		"Work is everything!"
	];
    let timeRemaining = duration;
	let lastNotification = timeRemaining;
    timer = setInterval(() => {
        timeRemaining -= 1;
		if (timerType == "work" && timeRemaining == duration/2){
			notifyUser("Half of pomodoro behind!");
		}

		if (timerType == "work" && lastNotification == timeRemaining + duration/4){
			lastNotification = timeRemaining;
			notifyUser(notifications[Math.floor(Math.random() * notifications.length)]);
		}

        if (timeRemaining <= 0) {
            clearInterval(timer);
            if (timerType == "work"){
				isPomodoroActive = false;
				notifyUser("Time's up! Take a break.");
				startBreak();
			} else {
				notifyUser("Break's over, you can start another pomodoro.");
			}
        }
    }, 1000);
}

function notifyUser(message) {
    const vscode = require('vscode');
    vscode.window.showInformationMessage(message);
}

function startPomodoro() {
    isPomodoroActive = true;
    notifyUser(`Pomodoro started! Work for ${workDuration / 60} minutes`);
    startTimer(workDuration, "work");
}

function startBreak() {
    notifyUser(`Break started! Relax for ${breakDuration / 60} minutes`);
    startTimer(breakDuration, "break");
}

function setWorkDuration(newDuration) {
    workDuration = newDuration * 60;
	
}

function setBreakDuration(newDuration) {
    breakDuration = newDuration * 60;
}

function activate(context) {
	console.log('Congratulations, your extension "thebestextension" is now active!');

	//const { startPomodoro } = require('./pomodoro.js');

	const disposable = vscode.commands.registerCommand('thebestextension.startPomodoro', startPomodoro);

	const disposableSetPomodoro = vscode.commands.registerCommand('thebestextension.setWorkDuration', async () => {
		const input = await vscode.window.showInputBox({ prompt: 'Enter Work duration in minutes' });
		if (input) {
			setWorkDuration(parseInt(input));
			notifyUser(`Pomodoro duration set to ${input} minutes.`);
		}
	});

	const disposableSetBreak = vscode.commands.registerCommand('thebestextension.setBreakDuration', async () => {
		const input = await vscode.window.showInputBox({ prompt: 'Enter Break duration in minutes' });
		if (input) {
			setBreakDuration(parseInt(input));
			notifyUser(`Break duration set to ${input} minutes.`);
		}
	});
	
	context.subscriptions.push(disposableSetPomodoro);
	context.subscriptions.push(disposableSetBreak);
    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
