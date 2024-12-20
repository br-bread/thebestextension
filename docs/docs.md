### File structure:

    ├── docs
        ├── README.md
        └── docs.md
    ├── test
        └── extension.test.js
    ├──.vscode-test.mjs
    ├──eslint.config.mjs
    ├──extension.js
    ├──jsconfig.json
    ├──package-lock.json
    ├──package.json
    ├──.gitignore
    └──.vscodeignore

### Functions

The extension.js file contains functions:

    startTimer(duration, timerType) // Starts the pomodoro timer
    notifyUser(message) // Sends a notification to user
    startPomodoro() // Starts Working timer
    startBreak() // Starts Break timer
    setWorkDuration(newDuration) // Changes Pomodoro duration
    setBreakDuration(newDuration) // Changes Break duration

Use of each function is explained in comments

### Commits history:

    * 1b88dbd (HEAD -> master, origin/master) create docs and update structure
    * 226cd30 add docs to functions
    * d5902fe add readme
    * dae70cd create the extension
    * 0a240f4 initial commit