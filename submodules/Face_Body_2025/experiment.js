// initiate global variables
let TEST = false;
let SHOWTIMELINE = true;
let ONLINE = true;
let skipSurvey = false;

// JSPSYCH CODE BEGINS HERE
var jsPsych;

// Get the user-agent string 
let userAgentString = navigator.userAgent;

// Detect Chrome 
chromeBrowser = userAgentString.indexOf("Chrome") > -1;

let participantID = "";
// once the page is loaded, get the URL parameter for participant id
// note, if session is collected here, it will not load quick enough to be used in the jsPsych code
document.addEventListener("DOMContentLoaded", () => {
    if (jsPsych.data.urlVariables().subject != "null") {
        participantID = participantID + jsPsych.data.urlVariables().subject;
    } else {
        participantID = participantID + "noid";
    }
    // add pid to all trial-level data
    jsPsych.data.addProperties({ pid: participantID });
});

let timeline = [];

// add the ID to the data for all trials
jsPsych.data.addProperties({ gender_to_present: gender_to_present });
jsPsych.data.addProperties({ experiment_version: experiment });

// add keymapping assignments
jsPsych.data.addProperties({ sameKey: keyMapping.sameKey });
jsPsych.data.addProperties({ differentKey: keyMapping.differentKey });

//get subject id from sona in url
var subject_id = jsPsych.data.urlVariables(1234).subject;

// add the ID to the data for all trials
jsPsych.data.addProperties({ ID: subject_id });

var rand_subject_id = jsPsych.randomization.randomID(5);
// add the ID to the data for all trials
jsPsych.data.addProperties({ ID: rand_subject_id });
jsPsych.data.addProperties({ date: Date() }) // save Date of data collection to csv output
jsPsych.data.addProperties({ OS: navigator.platform }) // save operation system to csv output


// compile our indiviudal blocks into one array
console.log(`Experiment blocks:`, experiment_trials_blocked);

var cursor_on = {
    type: 'call-function',
    func: function () {
        document.body.style.cursor = "auto";
    }
}
var cursor_off = {
    type: 'call-function',
    func: function () {
        document.body.style.cursor = "none";
    }
}
/* init connection with pavlovia.org */
var pavlovia_init = {
    type: "pavlovia",
    command: "init"
};
if (ONLINE) timeline.push(pavlovia_init);

var fullscreen_trial = {
    type: 'fullscreen',
    fullscreen_mode: true
}

// // Create the break trial
if (experiment == 1) {
    var countdown_trial = {
        type: 'html-keyboard-response',
        stimulus: '<p style="font-size: 25px;">Time for a break!</p><p style="font-size: 20px;">You will be able to proceed to the next round of trials in <span id="clock" style="font-size: 20px;">0:30</span></p>' +
            `<span><p><b>Reminder:</b></p><p>[${keyMapping.sameKey}] = Faces are the SAME.</p><p>[${keyMapping.differentKey}] = Faces are DIFFERENT</p>` +
            '<span><p style="color:navy;">Please Note: The experiment will automatically proceed when the 30 second countdown timer reaches 0.</p>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 30000,
        on_load: function () {
            let num_seconds = 30; // 180 second break (3 minutes)
            var wait_time = num_seconds * 1000; // in milliseconds
            var start_time = performance.now();
            // document.querySelector('button').disabled = true;

            var interval = setInterval(function () {
                var time_left = wait_time - (performance.now() - start_time);
                var minutes = Math.floor(time_left / 1000 / 60);
                var seconds = Math.floor((time_left - minutes * 60 * 1000) / 1000);
                var seconds_str = seconds.toString().padStart(2, '0');
                var clock_element = document.querySelector('#clock');

                if (clock_element) {
                    clock_element.innerHTML = minutes + ':' + seconds_str;
                }

                if (time_left <= 0) {
                    if (clock_element) {
                        clock_element.innerHTML = "0:00";
                    }
                    // document.querySelector('button').disabled = false;
                    clearInterval(interval);
                }
            }, 250);
        },
        on_start: function () {
            // Set cursor visibility at the start of the break
            document.body.style.cursor = cursor_on;
        },
    };
} else if (experiment == 2) {
    var countdown_trial = {
        type: 'html-keyboard-response',
        stimulus: '<p style="font-size: 25px;">Time for a break!</p><p style="font-size: 20px;">You will be able to proceed to the next round of trials in <span id="clock" style="font-size: 20px;">0:30</span></p>' +
            `<span><p><b>Reminder:</b></p><p>[${keyMapping.sameKey}] = Bodies are the SAME.</p><p>[${keyMapping.differentKey}] = Bodies are DIFFERENT</p>` +
            '<span><p style="color:navy;">Please Note: The experiment will automatically proceed when the 30 second countdown timer reaches 0.</p>',
        choices: jsPsych.NO_KEYS,
        trial_duration: 30000,
        on_load: function () {
            let num_seconds = 30; // 180 second break (3 minutes)
            var wait_time = num_seconds * 1000; // in milliseconds
            var start_time = performance.now();
            // document.querySelector('button').disabled = true;

            var interval = setInterval(function () {
                var time_left = wait_time - (performance.now() - start_time);
                var minutes = Math.floor(time_left / 1000 / 60);
                var seconds = Math.floor((time_left - minutes * 60 * 1000) / 1000);
                var seconds_str = seconds.toString().padStart(2, '0');
                var clock_element = document.querySelector('#clock');

                if (clock_element) {
                    clock_element.innerHTML = minutes + ':' + seconds_str;
                }

                if (time_left <= 0) {
                    if (clock_element) {
                        clock_element.innerHTML = "0:00";
                    }
                    // document.querySelector('button').disabled = false;
                    clearInterval(interval);
                }
            }, 250);
        },
        on_start: function () {
            // Set cursor visibility at the start of the break
            document.body.style.cursor = cursor_on;
        },
    };
}


timeline.push(fullscreen_trial)
if (!skipSurvey) {timeline.push(initial_survey_timeline)}

var sameDifferent = {
    type: 'custom-same-different',
    stim1: jsPsych.timelineVariable("stim1"),
    stim2: jsPsych.timelineVariable("stim2"),
    corr_response: jsPsych.timelineVariable("corr_response"),
    sameKey: jsPsych.timelineVariable('sameKey'),
    differentKey: jsPsych.timelineVariable('differentKey'),
    Face_1: jsPsych.timelineVariable("Face_1"),
    Face_2: jsPsych.timelineVariable("Face_2"),
    Body_1: jsPsych.timelineVariable("Body_1"),
    Body_2: jsPsych.timelineVariable("Body_2"),
    gender: jsPsych.timelineVariable('gender'),
    trialType: jsPsych.timelineVariable("trialType"),
    stim1_alignment: jsPsych.timelineVariable("stim1_alignment"),
    stim2_alignment: jsPsych.timelineVariable("stim2_alignment"),
    difficulty: jsPsych.timelineVariable("difficulty"),

    data: {
        corr_response: jsPsych.timelineVariable("corr_response"),
        sameKey: jsPsych.timelineVariable('sameKey'),
        differentKey: jsPsych.timelineVariable('differentKey'),
        Face_1: jsPsych.timelineVariable("Face_1"),
        Face_2: jsPsych.timelineVariable("Face_2"),
        Body_1: jsPsych.timelineVariable("Body_1"),
        Body_2: jsPsych.timelineVariable("Body_2"),
        gender: jsPsych.timelineVariable('gender'),
        trialType: jsPsych.timelineVariable("trialType"),
        stim1_alignment: jsPsych.timelineVariable("stim1_alignment"),
        stim2_alignment: jsPsych.timelineVariable("stim2_alignment"),
        difficulty: jsPsych.timelineVariable("difficulty"),
        congruent: jsPsych.timelineVariable("congruent"),
        stim1: jsPsych.timelineVariable("stim1"),
        stim2: jsPsych.timelineVariable("stim2")

    },

    mask: jsPsych.timelineVariable("mask"),
    mask_duration: 500,
    first_stim_duration: 1000,
    second_stim_duration: 5000,
    sameKey: keyMapping.sameKey,
    differentKey: keyMapping.differentKey
};

var blankScreen1000 = {
    type: "html-keyboard-response",
    stimulus: "",
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000
}


var intertrialBlank = {
    type: "html-keyboard-response-same-different",
    stimulus: intertrialBlank_stim[0],
    sameKey: keyMapping.sameKey,
    differentKey: keyMapping.differentKey,
    choices: jsPsych.NO_KEYS,
    trial_duration: 1000
}

const answerEvaluation = {
    type: 'html-keyboard-response',
    choices: ['space'],
    stimulus: "Evaluating previous response...",
    on_start: (trial) => {
        let data = jsPsych.data.getLastTrialData().values()[0]
        console.log(data)
        let wasCorrect = data.correct

        if (data.key_press == 0) {
            trial.stimulus = "<div class = 'main'> <p> You timed out! Reminder: You only have 5 SECONDS to respond. </p> <p> Press your [spacebar] to continue. </p>"
        } else {
            if (wasCorrect) {
                trial.stimulus = "<div class = 'main'> <p> That was correct! </p> <p> Press your [spacebar] to continue. </p>"
            } else {
                if (experiment == 1) {
                    trial.stimulus = `<div class='main'> <p> That was incorrect. </p> <p> Reminder: Your task is to press [${keyMapping.sameKey}] if the FACES are the same, and [${keyMapping.differentKey}] if they are different. </p> <p> Press your [spacebar] to continue. </p>`
                } else if (experiment == 2) {
                    trial.stimulus = `<div class='main'> <p> That was incorrect. </p> <p> Reminder: Your task is to press [${keyMapping.sameKey}] if the BODIES are the same, and [${keyMapping.differentKey}] if they are different. </p> <p> Press your [spacebar] to continue. </p>`
                }
            }
        }
    }
}


var practice_block_trials = {
    timeline: [sameDifferent, answerEvaluation, intertrialBlank],
    randomize_order: true,
    timeline_variables: practice_trials,
    repetitions: 1
}

if (experiment == 1) {
    var instructions = {
        type: "instructions",
        pages: [
            "<div class='main'> <p>Welcome to the Face Body Perception Experiment!</p> <p>Please click the [next] button below to proceed to the experiment instructions.</p> </div>",
            `<div class='main'> <p>Throughout this experiment, you will be presented with two images of people, presented one after the other. Your task will be to identify if the <u>faces</u> you saw were the same or if they were different.</p> <p>If the <b>faces</b> are the SAME, press the [${keyMapping.sameKey}] key on your keyboard.</p><p>If the <b>faces</b> are DIFFERENT, press the [${keyMapping.differentKey}] key on your keyboard.</p> </div>`,
            "<div class='main'> <p>This experiment should take approximately 30 minutes.</p> <p>The experiment will be broken up into blocks with rest breaks incorporated throughout.</p></div>",
            "<div class='main'> <p>During trials, please rest your left hand on the [F] key and your right hand on the [J] key.</p></div>",
            `<div class='main'> <p>We will start with 5 practice trials.</p> <p> In these practice trials, you will receive feedback on the accuracy of your responses. You will NOT receive feedback in the actual experiment.</p> <p>As a reminder, press [${keyMapping.sameKey}] if the faces are the SAME, and [${keyMapping.differentKey}] if the faces are DIFFERENT</p> </div>`
        ],
        show_page_number: true,
        show_clickable_nav: true
    }

    var intro = {
        type: "html-keyboard-response",
        stimulus: `<p><b>Beginning of Experiment:</b></p><p><b>Reminder:</b><p>[${keyMapping.sameKey}] = faces are the SAME</p><p>[${keyMapping.differentKey}] = faces are DIFFERENT</p> <p>Please make your responses as <b>quickly and as accurately</b> as possible.</p><p> Press your [spacebar] to begin! </p>`,
        choices: ['space']
    };

    var reminder_of_instructions = {
        type: "html-keyboard-response",
        stimulus: `<p><b>Reminder:</b><p>[${keyMapping.sameKey}] = faces are the SAME</p><p>[${keyMapping.differentKey}] = faces are DIFFERENT</p> <p> Press your [spacebar] to begin! </p>`,
        choices: ['space']
    }

} else if (experiment == 2) {
    var instructions = {
        type: "instructions",
        pages: [
            "<div class='main'> <p>Welcome to the Face Body Perception Experiment!</p> <p>Please click the [next] button below to proceed to the experiment instructions.</p> </div>",
            `<div class='main'> <p>Throughout this experiment, you will be presented with two images of people, presented one after the other. Your task will be to identify if the <u>bodies</u> you saw were the same or if they were different.</p> <p>If the <b>bodies</b> are the SAME, press the [${keyMapping.sameKey}] key on your keyboard.</p><p>If the <b>bodies</b> are DIFFERENT, press the [${keyMapping.differentKey}] key on your keyboard.</p> </div>`,
            "<div class='main'> <p>This experiment should take approximately 30 minutes.</p> <p>The experiment will be broken up into blocks with rest breaks incorporated throughout.</p></div>",
            "<div class='main'> <p>During trials, please rest your left hand on the [F] key and your right hand on the [J] key.</p></div>",
            `<div class='main'> <p>We will start with 5 practice trials.</p> <p> In these practice trials, you will receive feedback on the accuracy of your responses. You will NOT receive feedback in the actual experiment.</p> <p>As a reminder, press [${keyMapping.sameKey}] if the bodies are the SAME, and [${keyMapping.differentKey}] if the bodies are DIFFERENT</p> </div>`
        ],
        show_page_number: true,
        show_clickable_nav: true
    }

    var intro = {
        type: "html-keyboard-response",
        stimulus: `<p><b>Beginning of Experiment:</b></p><p><b>Reminder:</b><p>[${keyMapping.sameKey}] = bodies are the SAME</p><p>[${keyMapping.differentKey}] = bodies are DIFFERENT</p> <p>Please make your responses as <b>quickly and as accurately</b> as possible.</p><p> Press your [spacebar] to begin! </p>`,
        choices: ['space']
    };

    var reminder_of_instructions = {
        type: "html-keyboard-response",
        stimulus: `<p><b>Reminder:</b><p>[${keyMapping.sameKey}] = bodies are the SAME</p><p>[${keyMapping.differentKey}] = bodies are DIFFERENT</p> <p> Press your [spacebar] to begin! </p>`,
        choices: ['space']
    }
}

timeline.push(
    instructions,
    cursor_off,
    blankScreen1000,
    practice_block_trials,
    {
        type: "html-keyboard-response",
        stimulus: "You have just completed the practice trials. Press your [spacebar] to continue!",
        choices: ['space']
    },
    cursor_on,
    blankScreen1000,
    intro);


// loop through each of our pre-defined block of trials
experiment_trials_blocked.forEach(block => {

    // NEW IF STATEMENT: IF YOU MAKE THE VARIABLE 'TEST' AT THE TOP = TRUE
    // I.E. : TEST = true
    // YOU WILL ONLY ADD THE FIRST BLOCK OF TRIALS TO THE TIMELINE, TO MAKE TESTING EASIER
    if (!TEST || (TEST && block == experiment_trials_blocked[1])) {

        // define the trials using the variables in the current block
        var block_of_trials = {
            timeline: [sameDifferent, intertrialBlank],
            timeline_variables: block,
            randomize_order: true,
            repetitions: 1
        };

        // push the trials and a break text to the timeline
        timeline.push(cursor_off, block_of_trials, cursor_on)

        // don't add the breakText after the last block
        if (block != experiment_trials_blocked[3]) {
            timeline.push(countdown_trial)
            timeline.push(breakOver)
        }
    }
})



if (SHOWTIMELINE) { console.log(timeline) }

timeline.push(doneText, cursor_on, followup_survey_timeline)

/* finish connection with pavlovia.org */
var pavlovia_finish = {
    type: "pavlovia",
    command: "finish"
};

if (ONLINE) timeline.push(pavlovia_finish);

var fullscreen_trial_exit = {
    type: 'fullscreen',
    fullscreen_mode: false
};

timeline.push(fullscreen_trial_exit);

let preload_list = masks.concat(experiment_masks, exp1_stimuli.Female, exp1_stimuli.Male, exp2_stimuli.Female, exp2_stimuli.Male, practice_stimulus_set.Female, practice_stimulus_set.Male, intertrialBlank_stim)

// initiates the jsPsych experiment with the events defined in the timeline array
jsPsych.init({
    timeline: timeline,
    show_progress_bar: true,
    preload_images: preload_list,
    auto_update_progress_bar: true,
    show_preload_progress_bar: true,
    on_finish: () => {
        //jsPsych.data.displayData('json')
        if (TEST) { alert("ALL DONE!") };

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        const id = urlParams.get('subject')

        window.location.href = `./debrief.html?subject=${id}`;

    }
});
