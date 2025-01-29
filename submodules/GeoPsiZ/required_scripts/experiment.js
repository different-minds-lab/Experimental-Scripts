// PRE-JSPSYCH CODE
// INITIATE GLOBAL VARIABLES AND COLLECT INFORMATION RE: PARTICIPANT'S BROWSER

// Initiate global variables
let chromeBrowser = false;
let TEST = false;
let hideSurvey = true;
let CATCH = false;
let numChoices = 2; //1 means 3 choose 1
let ONLINE = false;

// These are define in external libraries, included in the experiment.html
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

jsPsych.data.addProperties({ date: Date() })
jsPsych.data.addProperties({ OS: navigator.platform })

// JSPSYCH CODE BEGINS HERE

// * TRIAL TYPES OUTLINE * //
    // IMAGE TRIALS //
        // img_CATEGORY_TYPE_level
            // if igneous rock query --> 2 igneous ref & 6 sedimentary rock ref

        // img_EXEMPLAR_level
            // if rock type 1a query --> rock type 1b & 1c ref + 2 ref of same category as query + 4 ref of different category as query

    // LABEL TRIALS //
        // label_CATEGORY_TYPE_level_vA
            // if igneous rock query --> 2 igneous ref + 6 sedimentary rock ref

        // label_TYPE_level_vB
            // if "Igneous" label query --> 2 igneous rock type ref + 6 sedimentary rock type ref

    // UNIVERSAL CONSTRAINTS
        // Always have 2 correct options
        // References randomly placed
        // Only 1 exemplar of each type present in references (i.e., only 1 basalt ref) Note: (unless Exemplar img trial)
// * TRIAL TYPES OUTLINE * //

////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////// 

// IMG TRIALS DEFINED BELOW //

////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////// 

// Create trial-level information
// Randomly select the references
let img_trial_data = [];
let img_totalTrials = img_list.length * 2; // Each image appears twice as a query

shuffleArray(img_list);
const img_queryStimuli = [];

// console.log("Order of Image Trial Queries (Shuffled):");
for (let i = 0; i < img_list.length; i++) {
    let current_query = img_list[i];
    img_queryStimuli.push(current_query); // Add the query stimulus to the array
}

// * Declaring Image trials * //
for (let j = 0; j < 2; j++) {
    shuffleArray(img_queryStimuli);

    for (let i = 0; i < img_queryStimuli.length; i++) {
        let current_query = img_queryStimuli[i];
        let img_name = current_query.replace("./img/rock_pics/", "").replace(".png", "").replace(/[0-9]/g, '');
        let trial_item = { "query_path": current_query, "query_name": img_name, catchTrial: false, embeddingType: "Image" };

        // Reset options array at the beginning of each iteration
        let options = _.filter(_.clone(img_list), item => {
            return item != current_query;
        });

        // Randomly select the trial type
        let imgtrialType = "";

        if (img_CATEGORY_TYPE_level < img_totalTrials * 0.8) {
            imgtrialType = "img_CATEGORY_TYPE_level";
        } else {
            imgtrialType = "img_EXEMPLAR_level";
        }

        // Initialize the constraintType
        let constraintType = "";

        if (imgtrialType === "img_CATEGORY_TYPE_level") {
            let sameCategoryReferences = img_getSameCategoryReferences(current_query, img_list, options);
            let oppositeCategoryReferences = img_getOppositeCategoryReferences(current_query, img_list, options);

            // Combine 2 references from the same category and 6 references from the opposite category
            trial_item["references"] = sameCategoryReferences.slice(0, 2).concat(oppositeCategoryReferences.slice(0, 6));

            // Shuffle the references randomly using the custom shuffle function
            trial_item["references"] = shuffleArray(trial_item["references"]);

            img_CATEGORY_TYPE_level++;
            constraintType = "img_CATEGORY_TYPE_level";

        } else {
            // img_EXEMPLAR_level trials
            let sameCategoryReferences = img_getSameCategoryReferences(current_query, img_list, options);
            let oppositeCategoryReferences = img_getOppositeCategoryReferences(current_query, img_list, options);
            let sameRockTypeReferences = getSameRockTypeReferences(current_query, img_list, options);

            // Create the desired combination of references
            let exemplarReferences = sameRockTypeReferences.slice(0, 2)
                .concat(sameCategoryReferences.slice(0, 2))
                .concat(oppositeCategoryReferences.slice(0, 4));

            // Shuffle the references randomly using the custom shuffle function
            trial_item["references"] = shuffleArray(exemplarReferences);

            img_EXEMPLAR_level++;
            constraintType = "img_EXEMPLAR_level";
        }
        // Add constraintType to trial_item
        trial_item["constraintType"] = constraintType;
        // Update the options array with the selected references
        options = options.concat(trial_item["references"]);

        img_trial_data.push(trial_item);
    }
}

console.log("Number of 'img_CATEGORY_TYPE' trials:", img_CATEGORY_TYPE_level);
console.log("Number of 'img_EXEMPLAR' trials:", img_EXEMPLAR_level);


// * Declaring Image trials * //

let img_blocked_trials = [];

// Generate catch trials as 10% of trials
if (CATCH == true) {
    let catch_trials = _.cloneDeep(jsPsych.randomization.sampleWithoutReplacement(img_trial_data, Math.ceil(img_trial_data.length * .1))); //og *.1
    catch_trials.forEach(catchTrial => {
        catchTrial["catchTrial"] = true;
    });

    // concat catch and non-catch trials then break into blocks of 20
    img_blocked_trials = _.chain(img_trial_data).concat(catch_trials).shuffle().chunk(20).value();
} else {
    // break trials into blocks of 20 without any catch trials
    img_blocked_trials = _.chunk(_.shuffle(img_trial_data), 20);
}

console.log(img_blocked_trials);


if (ONLINE) {
    /* init connection with pavlovia.org */
    var pavlovia_init = {
        type: "pavlovia",
        command: "init"
    };
    timeline.push(pavlovia_init)
}

// ENTER FULL SCREEN MODE
if (!TEST) {
    timeline.push({
        type: 'fullscreen',
        fullscreen_mode: true
    });
}

// // * PRE-IMG SURVEY QUESTIONS * //
if (!hideSurvey) { timeline.push(v_Num, age, gender, participateIn_S1, interestPostEnrollment, S2_TimeLookingAtRocks, S2_followUpTimeLookingAtRocks, S2_TakenGeoCourse, S2_followUpTakenGeoCourse, S2_followUpPostSecGeoCourse, ability_n_profession) }

if (numChoices == 2) {
    timeline.push({
        type: 'instructions',
        pages: ["<div class='main' style='max-width:900px'><p>During this experiment, you will see displays composed of nine images arranged in a grid.</p><p>Your task is to click the <u>2 surrounding images</u> you consider most similar to the <u>center image</u>.</p><p>Select the images <b>in order</b> of their similarity. Once an image is clicked,  its ranking will be displayed.</p><p>You can deselect an image by clicking it again.</p></div>", "<div class='main' style='max-width:900px'><p>Some displays will be easy, while others will be hard. Just do your best when making your selection.</p><p>When you are happy with your decision, press your [spacebar] to submit your response.</p><p>Your progress is displayed at the top of the screen.</p></div>"],
        key_forward: 'space',
        show_page_number: true,
        show_clickable_nav: true
    });
} else if (numChoices == 1) {
    timeline.push({
        type: 'instructions',
        pages: ["<div class='main' style='max-width:900px'><p>Great, thank you for filling out the survey.</p><p>Now, we will move on to trials where you will rank the similarity of images of different rocks.</p><p>During this experiment, you will see displays composed of 9 images.</p><p>Your task is to click the <u>2 surrounding images</u> you consider most similar to the <u>center image</u>.</p> <p>Once an image is clicked, its ranking will be displayed.</p><p>You can deselect an image by clicking it again.</p></div>", "<div class='main' style='max-width:900px'><p>Some displays will be easy, while others will be hard. Just do your best when making your selection.</p><p>When you are happy with your decision, press your [spacebar] to submit your response.</p><p>Your progress is displayed at the top of the screen.</p></div>"],
        key_forward: 'space',
        show_page_number: true,
        show_clickable_nav: true
    });
}
// END OF PRE-IMG SURVEY QUESTIONS //

// Add a simple text plugin to indicate the experiment is starting
timeline.push({
    type: 'html-keyboard-response',
    stimulus: "<p>Press the [space] key to proceed to the experiment.</p><p>As a reminder, there will be breaks every 20 trials.</p>",
    choices: ["space"]
});


// EMBEDDING MODULE
let embeddingModule = {}

if (numChoices == 2) {
    embeddingModule = {
        type: '8c2-embedding-module',
        reference: jsPsych.timelineVariable("query_path"),
        options: jsPsych.timelineVariable("references"),
        catchTrial: jsPsych.timelineVariable("catchTrial"),
        test: () => { return TEST; },
        data: {
            img_name: jsPsych.timelineVariable("img_name"),
            embeddingType: jsPsych.timelineVariable("embeddingType"),
            constraintType: jsPsych.timelineVariable("constraintType"),
        }
    }
} else {
    embeddingModule = {
        type: '3c1-embedding-module',
        reference: jsPsych.timelineVariable("query_path"),
        options: jsPsych.timelineVariable("references"),
        catchTrial: jsPsych.timelineVariable("catchTrial"),
        test: () => { return TEST; },
        data: {
            img_name: jsPsych.timelineVariable("img_name"),
            embeddingType: jsPsych.timelineVariable("embeddingType"),
            constraintType: jsPsych.timelineVariable("constraintType"),
        }
    }
}
console.log(embeddingModule)

// push each block of trials and break text
img_blocked_trials.map((block, index) => {
    timeline.push({
        timeline: [blankScreen500, embeddingModule],
        timeline_variables: block,
        randomize_order: false
    });

    if (index < img_blocked_trials.length - 1) {
        // Add a simple text plugin to indicate the block is over
        timeline.push({
            type: 'html-keyboard-response',
            stimulus: "Time to take a break! Press [space] once you're ready to continue.</p>",
            choices: ["space"]
        });
    }
});
// // * POST-IMAGE SURVEY QUESTIONS * //
if (!hideSurvey) { timeline.push(numRockTypes_estimate, strategiesImg) }
// // * POST-IMAGE SURVEY QUESTIONS * //

timeline.push(fixedTrial_instructions)
for (let i = 0; i < 3; i++) {
    timeline.push(shuffled_fixedImgTrials[i], blankScreen500, justificationOfSelection)
}

timeline.push(blankScreen500); // extra blank screen transition before moving onto label trials

// END OF Image EXPERIMENTAL TRIALS //

////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////// 

// LABEL TRIALS DEFINED BELOW //

////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////// 

///////////////////////////////////////////////////

// initiate trial constraint counts
let label_CATEGORY_TYPE_level_vA = 0;
let label_TYPE_level_vB = 0;

// Create trial-level information
// Randomly select the references
let label_trial_data = [];
let label_totalTrials = label_list.length * 2;

// Calculate the number of trials for each condition
let num_label_CATEGORY_TYPE_level_vA = Math.floor(label_totalTrials * 0.8); // 80% for label_CATEGORY_TYPE_level_vA
let num_label_TYPE_level_vB = label_totalTrials - num_label_CATEGORY_TYPE_level_vA; // 20% for label_TYPE_level_vB

// Create arrays to hold trial types for random selection
let label_trialTypes = [];
for (let i = 0; i < num_label_CATEGORY_TYPE_level_vA; i++) {
    label_trialTypes.push("label_CATEGORY_TYPE_level_vA");
}
for (let i = 0; i < num_label_TYPE_level_vB; i++) {
    label_trialTypes.push("label_TYPE_level_vB");
}

// Shuffle the label_trialTypes array to randomize trial types
shuffleArray(label_trialTypes);
shuffleArray(label_list);
shuffleArray(type_list)

const label_queryStimuli = [];

for (let i = 0; i < label_list.length; i++) {
    let current_query = label_list[i];
    label_queryStimuli.push(current_query); // Add the query stimulus to the array
}

// * DECLARING Label TRIALS * //
for (let j = 0; j < 2; j++) {
    shuffleArray(label_queryStimuli);

    for (let i = 0; i < label_queryStimuli.length; i++) {
        let current_query = label_queryStimuli[i];
        let img_name = current_query.replace("./img/rock_name_stims/", "").replace(".png", "").replace(/[0-9]/g, '');
        let trial_item = { "query_path": current_query, "query_name": img_name, catchTrial: false, embeddingType: "Word" };

        // Determine the constraintType based on "c" at index 1
        let constraintType = img_name.charAt(1) === "c" ? "label_TYPE_level_vB" : "label_CATEGORY_TYPE_level_vA";
        // Reset options array at the beginning of each iteration
        let options = _.filter(_.clone(type_list), item => {
            return item != current_query;
        });

        let sameCategoryReferences = label_getSameCategoryReferences(current_query, label_list, options);
        let oppositeCategoryReferences = label_getOppositeCategoryReferences(current_query, label_list, options);

        // Combine 2 references from the same category and 6 references from the opposite category
        trial_item["references"] = sameCategoryReferences.slice(0, 2).concat(oppositeCategoryReferences.slice(0, 6));

        // Shuffle the references randomly using the custom shuffle function
        trial_item["references"] = shuffleArray(trial_item["references"]);

        // Add constraintType to trial_item
        trial_item["constraintType"] = constraintType;

        // Update the options array with the selected references
        options = options.concat(trial_item["references"]);

        label_trial_data.push(trial_item);
    }
}

console.log("Number of 'label_CATEGORY_TYPE_level_vA' trials:", num_label_CATEGORY_TYPE_level_vA);
console.log("Number of 'label_TYPE_level_vB' trials:", num_label_TYPE_level_vB);


let label_blocked_trials = [];
label_blocked_trials = _.chunk(_.shuffle(label_trial_data), 20);

console.log(label_blocked_trials);

// Initiate jsPsych event timeline
// Add a simple text plugin to indicate the experiment is over
timeline.push({
    type: 'html-keyboard-response',
    stimulus: "<p>Thank you for completing the second portion of the task. You are nearly done!</p><p>During this final portion of the task, please rate the similarity of the words displayed on screen.</p><p>The trial format is the same as the previous section of the study, however, you will not need to provide your reasoning for your selections.</p><p>Nine images will be displayed on screen, please select the rock types that you think are the most similar to the center rock type, then press your [spacebar] to submit your response. When you are ready, press your [spacebar] to proceed to the trials.",
    choices: ["space"]
});

// push each block of trials and break text
label_blocked_trials.map((block, index) => {
    timeline.push({
        timeline: [blankScreen500, embeddingModule],
        timeline_variables: block,
        randomize_order: false
    });

    if (index < label_blocked_trials.length - 1) {
        // Add a simple text plugin to indicate the block is over
        timeline.push({
            type: 'html-keyboard-response',
            stimulus: "Time to take a break! Press [space] once you're ready to continue.</p>",
            choices: ["space"]
        });
    }
});

if (!hideSurvey) { timeline.push(strategiesLabel) }

timeline.push(fixedTrial_instructions)
for (let i = 0; i < 2; i++) {
    timeline.push(shuffled_fixedLabelTrials[i], blankScreen500, justificationOfSelection)
}
// // * POST LABEL TRIAL SURVEY QUESTIONS * //

if (!hideSurvey) { timeline.push(S2_studyTime, S2_general_rockUnderstanding, S2_FairRockID_CategoryLevel, S2_followUpFairRockID_CategoryLevel, S2_FairRockID_TypeLevel, S2_followUpFairRockID_TypeLevel, TechnicalDifficulties, yes_to_TechDiff) }

if (!hideSurvey) {
    timeline.push({
        type: 'survey-multi-choice',
        preamble: 'As a reminder, your response to this question will remain confidential and will not be shared with your course instructor at any point throughout the Spring 2024 term.',
        questions: [
            {
                prompt: 'Would you like to release your data for research purposes? If so, please opt in.',
                name: 'S2_Research_OptInOrOut',
                options: ['Opt-in', 'Opt-out'],
                required: true
            }
        ],
    });
}

timeline.push(blankScreen500);

////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////// 

// CLOSING OFF THE EXPERIMENT //

// EXIT FULL SCREEN MODE
if (!TEST) {
    timeline.push({
        type: 'fullscreen',
        fullscreen_mode: false
    });
}

// may be unnecessary and saving data twice per participant
if (ONLINE) {
    /* finish connection with pavlovia.org */
    var pavlovia_finish = {
        type: "pavlovia",
        command: "finish"
    };

    timeline.push(pavlovia_finish)

}

// Add a simple text plugin to indicate the experiment is over
timeline.push({
    type: 'html-keyboard-response',
    stimulus: "All done! <p>Press the [space] key to finish the experiment.</p>",
    choices: ["space"],
    on_finish: () => {
        if (CATCH) {
            // calculate accuracy on catch trials, record as attention weight
            let correctCatch = jsPsych.data.get().filter({ catchResponse: 1 }).count();
            jsPsych.data.addProperties({ attentionWeight: correctCatch / 10 });
        }

    }
});

//Give chance for data to load prior to debrief
timeline.push({
    type: 'html-keyboard-response',
    stimulus: 'Please wait while your data is uploaded! This should take around 10 seconds.</div',
    choices: jsPsych.NO_KEYS,
    trial_duration: 10000 //in ms (10s)
});

// LOG EXPERIMENT'S TIMELINE FOR DEBUGGING
console.log(timeline);

let preload_img_list = img_list.concat(label_list).concat(type_list)

// Execute the jsPsych experiment with the events defined in the timeline array if chrome is detected
if (chromeBrowser) {
    jsPsych.init({
        timeline: timeline,
        preload_images: preload_img_list,
        show_progress_bar: true,
        auto_update_progress_bar: true,
        show_preload_progress_bar: true,
        on_finish: () => {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString)
            const auth = urlParams.get('__oauthToken')
            const pilotToken = urlParams.get('__pilotToken')
            window.location.href = pilotToken != null ? `./debrief.html?subject=${participantID}&__oauthToken=${auth}&__pilotToken=${pilotToken}` : `./debrief.html?subject=${participantID}`;
        }
    });
} else {
    jsPsych.init({
        timeline: [{
            type: "html-keyboard-response",
            stimulus: "<div id='main' style='max-width:600;'>Sorry, your setup is insufficient for the current experiment. Either we were unable to access your webcam, or you are not using the Chrome browser. Please restart using Chrome. Thanks!</div>",
            choices: ["space"]
        }]
    });
}
