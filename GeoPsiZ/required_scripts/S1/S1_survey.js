let timeline = []

// * PRE-IMG SURVEY QUESTIONS * //
let v_Num = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Please input your V-Number.",
            placeholder: 'V########',
            name: 'S1_V_Number',
            required: true
        }
    ],
}

// * PRE-IMG SURVEY QUESTIONS * //
let justificationOfSelection = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Please provide a justification for the rocks that you selected on the previous trial.",
            name: 'justifyingSelection',
            rows: 4,
            required: true
        }
    ],
}

let age = {
    type: 'survey-text',
    questions: [
        {
            prompt: "What is your age?",
            name: 'S1_Age',
            required: true
        }
    ],
}

let gender = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: 'What gender do you identify with?',
            name: 'Gender',
            options: ["Female", "Male", "Non-Binary", "Other"],
            required: true
        }
    ],
}

let S1_TimeLookingAtRocks = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Before taking EOS 120, did you spend much time observing rocks? This could be when going for hikes, as part of your job, a hobby, etc.",
            name: 'S1_TimeLookingAtRocks',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S1_TimeLookingAtRocks:", responses.S1_TimeLookingAtRocks)
        data["answer"] = responses.S1_TimeLookingAtRocks
    },
});


// Add the follow-up questions if the response to S1_TimeLookingAtRocks is "Yes"
var S1_YesTimeLookingAtRocks = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "At what age did you start developing an interest in rocks?",
            name: 'S1_AgeStartLookingAtRocks',
            options: ['Under 18', '18 - 24', '25 - 44', '45 - 65', 'Over 65'],
            required: true
        },
        {
            prompt: "On average, before taking EOS 120, how many hours per week did you spend using websites or software related to geology?",
            name: 'S1_HrsPerWeekLookingAtRocks',
            options: ['0 hrs', 'Under 1 hr', '1 - 6 hrs', '6 - 12 hrs', '12 - 24 hrs', 'Over 24 hrs'],
            required: true
        },
        {
            prompt: "Prior to EOS 120, were you affiliated with any geology groups?",
            name: 'S1_AffiliationWithGeologists',
            options: ['Yes', 'No'],
            required: true
        }
    ],
}
// push a check to the timeline for what selection Ps made
const S1_followUpTimeLookingAtRocks = ({
    timeline: [S1_YesTimeLookingAtRocks],
    conditional_function: function () {
        var response = jsPsych.data.get().last(1).values()[0];
        let answer = response["answer"]
        console.log(answer)
        if (answer == "Yes") {
            return true;
        } else {
            return false;
        }
    }
});


//make this page show up no matter what. That is, either after the first page or second page
var S1_TakenGeoCourse = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Have you taken a geology or environmental ocean science course before (excluding EOS 120)? ",
            name: 'S1_TakenGeoCourse',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S1_TakenGeoCourse:", responses.S1_TakenGeoCourse)
        data["answer"] = responses.S1_TakenGeoCourse
    },
});



var S1_LevelOfGeoEducation = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Was the course at a recreational, secondary, or post-secondary level?",
            name: 'S1_LevelOfGeoEducation',
            options: ['Recreational', 'Secondary Level', 'Post-Secondary Level'],
            required: true
        },
        {
            prompt: "Did the course teach you anything about rock types, minerals, and/or how rocks form?",
            name: 'S1_ContentOfGeoCourse',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S1_LevelOfGeoEducation:", responses.S1_LevelOfGeoEducation)
        data["answer"] = responses.S1_LevelOfGeoEducation
    },
}
// push a check to the timeline for what selection Ps made
const S1_followUpTakenGeoCourse = ({
    timeline: [S1_LevelOfGeoEducation],
    conditional_function: function () {
        var response = jsPsych.data.get().last(1).values()[0];
        let answer = response["answer"]
        console.log(answer)
        if (answer == "Yes") {
            return true;
        } else {
            return false;
        }
    }
});

var S1_TakenPostSecGeo = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "How many post-secondary-level courses have you taken that covered different rock types (excluding EOS 120)?",
            name: "S1_NumOfPost-SecondaryGeoCourses",
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+ 9'],
            required: true
        }
    ],
}
const S1_followUpPostSecGeoCourse = ({
    timeline: [S1_TakenPostSecGeo],
    conditional_function: function () {
        var response = jsPsych.data.get().last(1).values()[0];
        let answer = response["answer"]
        console.log(answer)
        if (answer == "Post-Secondary Level") {
            return true;
        } else {
            return false;
        }
    },
});

//make this page show up no matter what
let ability_n_profession = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "How would you rate your ability to identify different rock types?",
            name: 'S1_RockIDAbility',
            options: ['Nonexistent', 'Beginner', 'Intermediate', 'Expert'],
            required: true
        },
        {
            prompt: "Has your profession ever involved any form of rock identification or analyses?",
            name: 'S1_RockIDProfession',
            options: ['Yes', 'No'],
            required: true
        }
    ],
}
// * PRE-IMG SURVEY QUESTIONS * //


// * POST-IMAGE SURVEY QUESTIONS * //
//make this page show up no matter what
let numRockTypes_estimate = {
    type: 'survey-text',
    preamble: 'If you had to estimate over all of the trials you just completed...',
    questions: [
        {
            prompt: "How many rock types do you think you saw?",
            name: 'S1_EstimateNumRock_Types',
            required: true
        },
        {
            prompt: "How many rock categories do you think you saw?",
            name: 'S1_EstimateNumRock_Categories',
            required: true,
        }
    ],
}

let strategiesImg = {
    type: 'survey-text',
    questions: [
        {
            prompt: "What were your most commonly used strategies for guiding your judgments on the trials where images of rocks were presented on screen?",
            rows: 3,
            name: 'S1_Img_MostCommonStrategy',
            required: true
        },
        {
            prompt: "Did you notice that on some trials, there were multiple images of rocks belonging to the same rock type as the center image? If so, do you recall what you considered when selecting which images were the most similar on those trials in particular?",
            rows: 3,
            name: 'S1_Img_ExemplarStrategies',
            required: true
        }
    ],
}
// * POST-IMAGE SURVEY QUESTIONS * //

// * POST LABEL TRIAL SURVEY QUESTIONS * //
let strategiesLabel = {
    type: 'survey-text',
    questions: [
        {
            prompt: "What were your most commonly used strategies for guiding your judgments on the trials where words were presented on screen?",
            rows: 3,
            name: 'S1_Label_MostCommonStrategy',
            required: true
        },
    ],
}
// * POST LABEL TRIAL SURVEY QUESTIONS * //

// * POST PSIZ COLLECT SURVEY QUESTIONS * //
var S1_FairRockID_CategoryLevel = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Do you feel the images you were presented with allowed for a fair rock ID to the category level (i.e., igneous, sedimentary, etc.)?",
            name: 'S1_FairRockID_CategoryLevel',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S1_FairRockID_CategoryLevel:", responses.S1_FairRockID_CategoryLevel)
        data["answer"] = responses.S1_FairRockID_CategoryLevel
    },
});


// Add the follow-up questions if the response to S1_FairRockID_CategoryLevel is "No"
var S1_NoFairRockID_CategoryLevel = {
    type: 'survey-text',
    questions: [
        {
            prompt: "<p>As it relates to the format of this experiment:</p><p>Why was it challenging to identify rocks at the category level?<p>",
            rows: 5,
            name: 'S1_WhyUnfairCategoryLevelID',
            required: true
        }
    ],
}
// push a check to the timeline for what selection Ps made
const S1_followUpFairRockID_CategoryLevel = ({
    timeline: [S1_NoFairRockID_CategoryLevel],
    conditional_function: function () {
        var response = jsPsych.data.get().last(1).values()[0];
        let answer = response["answer"]
        console.log(answer)
        if (answer == "No") {
            return true;
        } else {
            return false;
        }
    }
});


var S1_FairRockID_TypeLevel = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Do you feel the images you were presented with allowed for a fair rock ID to the type level (e.g., basalt, conglomerate, etc.)?",
            name: 'S1_FairRockID_TypeLevel',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S1_FairRockID_TypeLevel:", responses.S1_FairRockID_TypeLevel)
        data["answer"] = responses.S1_FairRockID_TypeLevel
    },
});

// Add the follow-up questions if the response to S1_FairRockID_TypeLevel is "No"

var S1_NoFairRockID_TypeLevel = {
    type: 'survey-text',
    questions: [
        {
            prompt: "<p>As it relates to the format of this experiment:</p><p>Why was it challenging to identify rocks at the type level?<p>",
            rows: 5,
            name: 'S1_WhyUnfairTypeLevelID',
            required: true
        }
    ],
}
// push a check to the timeline for what selection Ps made
const S1_followUpFairRockID_TypeLevel = ({
    timeline: [S1_NoFairRockID_TypeLevel],
    conditional_function: function () {
        var response = jsPsych.data.get().last(1).values()[0];
        let answer = response["answer"]
        console.log(answer)
        if (answer == "No") {
            return true;
        } else {
            return false;
        }
    }
});

// * POST PSIZ COLLECT SURVEY QUESTIONS * //

// END OF ALL (IMAGES & WORDS) EXPERIMENTAL TRIALS //

var TechnicalDifficulties = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Did you experience any technical difficulties when completing this experiment?",
            name: 'S1_TechnicalDifficulties',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("TechnicalDifficulties:", responses.S1_TechnicalDifficulties);
        data["answer"] = responses.S1_TechnicalDifficulties;
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
