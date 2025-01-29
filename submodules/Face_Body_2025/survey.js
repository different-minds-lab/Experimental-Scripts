var TechnicalDifficulties = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Did you experience any technical difficulties when completing this experiment?",
            name: 'TechnicalDifficulties',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("TechnicalDifficulties:", responses.TechnicalDifficulties);
        data["answer"] = responses.TechnicalDifficulties;
    },
};

// Add the follow-up questions if the response to TechnicalDifficulties is "Yes"

var yes_TechnicalDifficulties = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Could you please describe the technical difficulties you experienced? In what way did they impact your ability to participate in the study?",
            rows: 5,
            name: 'TechDiffDescription',
            required: true
        }
    ],
};

// push a check to the timeline for what selection Ps made
const yes_to_TechDiff = {
    timeline: [yes_TechnicalDifficulties],
    conditional_function: function () {
        var response = jsPsych.data.get().last(1).values()[0];
        let answer = response["answer"];
        console.log(answer);
        if (answer == "Yes") {
            return true;
        } else {
            return false;
        }
    },
};


let age = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Please input your age.",
            name: 'age',
            required: true
        }
    ],
}

// Add the follow-up questions if the response to gender_survey_question is "Other"
var yes_genderOther = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Please provide your gender below. If you would prefer not to, please write NA",
            name: 'other_gender_description',
            required: true
        }
    ],
};

// push a check to the timeline for what selection Ps made
var gender_survey_question = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "What gender do you identify with?",
            options: ["Female", "Male", "Non-Binary", "Other"],
            name: 'gender_survey_question',
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("gender_survey_question:", responses.gender_survey_question);
    },
};

// Update the conditional check for 'Other' to access 'gender_survey_question' directly
const yes_to_Other = {
    timeline: [yes_genderOther],
    conditional_function: function () {
        var response = jsPsych.data.get().last(1).values()[0];
        let answer = JSON.parse(response.responses).gender_survey_question;
        console.log(answer);
        return answer === "Other";
    },
};


var other_info = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Is there anything else that you would like the researchers to know? If not, please write NA.",
            name: 'other_info_for_researcher',
            rows: 5,
            required: true
        }
    ],
};

let initial_survey_timeline = {
    timeline: [age, gender_survey_question, yes_to_Other]
}

let followup_survey_timeline = {
    timeline: [TechnicalDifficulties, yes_to_TechDiff, other_info]
}

// Text announcements presented throughout experiment =====
var doneText = {
    type: "html-keyboard-response",
    stimulus: "<p><b>You have completed the experiment!</b> <p> Please press your [spacebar] to continue.</p>",
    choices: ['space']
}

var breakOver = {
    type: "html-keyboard-response",
    stimulus: "Break is now over. Press your [spacebar] to begin the next block.",
    choices: ['space']
}