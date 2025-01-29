# jsPsych Template

jsPsych is a framework for web-based experiments that is particularly useful for vision science.
The following jsPsych template is built for the DML and also includes a framework for a web server for testing purposes, separate source and public trees, and standard html for an intro and outro.

# How To Install

1. Branch this repository and download the branch onto your computer.
2. If you don't already have Node.js on your computer, install it from: [Download link](https://nodejs.org/en/download/)
3. In terminal, navigate to the new repository and run the command:

```
npm install
```

# How To Run Experiments

Follow the next step to create a local HTTPS server. **You must complete installation to perform these steps.**

1. In terminal, navigate to the folder you have been coding in (default name jsPsychTemplate) and run the following command:

```
npm run experiment
```

# HOW TO SWITCH TO "ONLINE" VERSION 
1. Set the ONLINE global variable to true in experiment.js
2. UNcomment the code between "ONLINE VERSION" and "END OF ONLINE VERSION" in experiment.html
3. Comment the code between "LOCAL VERSION" and "END OF LOCAL VERSION" in experiment.html

# HOW TO SWITCH TO "LOCAL" VERSION 
1. Set the ONLINE global variable to false in experiment.js
2. Comment the code between "ONLINE VERSION" and "END OF ONLINE VERSION" in experiment.html
3. UNcomment the code between "LOCAL VERSION" and "END OF LOCAL VERSION" in experiment.html