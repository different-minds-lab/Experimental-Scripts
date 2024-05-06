let timeline = []

// * PRE-IMG SURVEY QUESTIONS * //
let v_Num = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Please input your V-Number.",
            placeholder: 'V########',
            name: 'S2_V_Number',
            required: true
        }
    ],
}

let justificationOfSelection = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Please provide a justification for the rocks that you selected on the previous trial.",
            name: 'S2_justifyingSelection',
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
            name: 'S2_Age',
            required: true
        }
    ],
}

let gender = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: 'What gender do you identify with?',
            name: 'S2_Gender',
            options: ["Female", "Male", "Non-Binary", "Other"],
            required: true
        }
    ],
}

let participateIn_S1 = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: `Did you participate in this study's first data collection time point in January of 2024?`,
            name: 'S2_participationIn_S1',
            options: ['Yes', 'No'],
            required: true
        }
    ]
}


let interestPostEnrollment = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: `Do you feel as though your interest in rocks has changed at all since enrolling in EOS 120?`,
            name: 'S2_interestPostEnrollment',
            options: ['Increased', 'Stayed the same', 'Decreased'],
            required: true
        }
    ]
}

let S2_TimeLookingAtRocks = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Before taking EOS 120, did you spend much time observing rocks? This could be when going for hikes, as part of your job, a hobby, etc.",
            name: 'S2_TimeLookingAtRocks',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S2_TimeLookingAtRocks:", responses.S2_TimeLookingAtRocks)
        data["answer"] = responses.S2_TimeLookingAtRocks
    },
});


// Add the follow-up questions if the response to S2_TimeLookingAtRocks is "Yes"
var S2_YesTimeLookingAtRocks = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "At what age did you start developing an interest in rocks?",
            name: 'S2_AgeStartLookingAtRocks',
            options: ['Under 18', '18 - 24', '25 - 44', '45 - 65', 'Over 65'],
            required: true
        },
        {
            prompt: "On average, before taking EOS 120, how many hours per week did you spend using websites or software related to geology?",
            name: 'S2_HrsPerWeekLookingAtRocks',
            options: ['0 hrs', 'Under 1 hr', '1 - 6 hrs', '6 - 12 hrs', '12 - 24 hrs', 'Over 24 hrs'],
            required: true
        },
        {
            prompt: "Prior to EOS 120, were you affiliated with any geology groups?",
            name: 'S2_AffiliationWithGeologists',
            options: ['Yes', 'No'],
            required: true
        }
    ],
}
// push a check to the timeline for what selection Ps made
const S2_followUpTimeLookingAtRocks = ({
    timeline: [S2_YesTimeLookingAtRocks],
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

let S2_TimeLookingAtRocks_PostCourse = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Since beginning EOS 120 in January 2024, have you found yourself spending much time observing rocks outside of class & lab hours? This could be when going for hikes, as part of your job, a hobby, etc.",
            name: 'S2_TimeLookingAtRocks_PostCourse',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S2_TimeLookingAtRocks_PostCourse:", responses.S2_TimeLookingAtRocks_PostCourse)
        data["answer"] = responses.S2_TimeLookingAtRocks_PostCourse
    },
});


// Add the follow-up questions if the response to S2_TimeLookingAtRocks_PostCourse is "Yes"
var S2_YesTimeLookingAtRocks_PostCourse = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "On average, since taking EOS 120, how many hours per week do you spend using websites or software related to geology (out of personal interest)?",
            name: 'S2_HrsPerWeekLookingAtRocks_PostCourse',
            options: ['0 hrs', 'Under 1 hr', '1 - 6 hrs', '6 - 12 hrs', '12 - 24 hrs', 'Over 24 hrs'],
            required: true
        },
        {
            prompt: "Since January of 2024, have you joined any geology groups or environmental ocean science groups?",
            name: 'S2_AffiliationWithGeologists_PostCourse',
            options: ['Yes', 'No'],
            required: true
        }
    ],
}
// push a check to the timeline for what selection Ps made
const S2_followUpTimeLookingAtRocks_PostCourse = ({
    timeline: [S2_YesTimeLookingAtRocks_PostCourse],
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
var S2_TakenGeoCourse = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Have you taken a geology or environmental ocean science course before (excluding EOS 120)? ",
            name: 'S2_TakenGeoCourse',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S2_TakenGeoCourse:", responses.S2_TakenGeoCourse)
        data["answer"] = responses.S2_TakenGeoCourse
    },
});


var S2_LevelOfGeoEducation = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Was the course at a recreational, secondary, or post-secondary level?",
            name: 'S2_LevelOfGeoEducation',
            options: ['Recreational', 'Secondary Level', 'Post-Secondary Level'],
            required: true
        },
        {
            prompt: "Did the course teach you anything about rock types, minerals, and/or how rocks form?",
            name: 'S2_ContentOfGeoCourse',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S2_LevelOfGeoEducation:", responses.S2_LevelOfGeoEducation)
        data["answer"] = responses.S2_LevelOfGeoEducation
    },
}

// push a check to the timeline for what selection Ps made
const S2_followUpTakenGeoCourse = ({
    timeline: [S2_LevelOfGeoEducation],
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

var S2_TakenPostSecGeo = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "How many post-secondary-level courses have you taken that covered different rock types (excluding EOS 120)?",
            name: "S2_NumOfPost-SecondaryGeoCourses",
            options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+ 9'],
            required: true
        }
    ],
}

const S2_followUpPostSecGeoCourse = ({
    timeline: [S2_TakenPostSecGeo],
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
            name: 'S2_RockIDAbility',
            options: ['Nonexistent', 'Beginner', 'Intermediate', 'Expert'],
            required: true
        },
        {
            prompt: "Has your profession ever involved any form of rock identification or analyses?",
            name: 'S2_RockIDProfession',
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
            name: 'S2_EstimateNumRock_Types',
            required: true
        },
        {
            prompt: "How many rock categories do you think you saw?",
            name: 'S2_EstimateNumRock_Categories',
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
            name: 'S2_Img_MostCommonStrategy',
            required: true
        },
        {
            prompt: "Did you notice that on some trials, there were multiple images of rocks belonging to the same rock type as the center image? If so, do you recall what you considered when selecting which images were the most similar on those trials in particular?",
            rows: 3,
            name: 'S2_Img_ExemplarStrategies',
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
            name: 'S2_Label_MostCommonStrategy',
            required: true
        },
    ],
}
// * POST LABEL TRIAL SURVEY QUESTIONS * //

// * POST PSIZ COLLECT SURVEY QUESTIONS * //
var S2_FairRockID_CategoryLevel = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Do you feel the images you were presented with allowed for a fair rock ID to the category level (i.e., igneous, sedimentary, etc.)?",
            name: 'S2_FairRockID_CategoryLevel',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S2_FairRockID_CategoryLevel:", responses.S2_FairRockID_CategoryLevel)
        data["answer"] = responses.S2_FairRockID_CategoryLevel
    },
});


// Add the follow-up questions if the response to S2_FairRockID_CategoryLevel is "No"
var S2_NoFairRockID_CategoryLevel = {
    type: 'survey-text',
    questions: [
        {
            prompt: "<p>As it relates to the format of this experiment:</p><p>Why was it challenging to identify rocks at the category level?<p>",
            rows: 5,
            name: 'S2_WhyUnfairCategoryLevelID',
            required: true
        }
    ],
}
// push a check to the timeline for what selection Ps made
const S2_followUpFairRockID_CategoryLevel = ({
    timeline: [S2_NoFairRockID_CategoryLevel],
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


var S2_FairRockID_TypeLevel = ({
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "Do you feel the images you were presented with allowed for a fair rock ID to the type level (e.g., basalt, conglomerate, etc.)?",
            name: 'S2_FairRockID_TypeLevel',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("S2_FairRockID_TypeLevel:", responses.S2_FairRockID_TypeLevel)
        data["answer"] = responses.S2_FairRockID_TypeLevel
    },
});

// Add the follow-up questions if the response to S2_FairRockID_TypeLevel is "No"

var S2_NoFairRockID_TypeLevel = {
    type: 'survey-text',
    questions: [
        {
            prompt: "<p>As it relates to the format of this experiment:</p><p>Why was it challenging to identify rocks at the type level?<p>",
            rows: 5,
            name: 'S2_WhyUnfairTypeLevelID',
            required: true
        }
    ],
}
// push a check to the timeline for what selection Ps made
const S2_followUpFairRockID_TypeLevel = ({
    timeline: [S2_NoFairRockID_TypeLevel],
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
            name: 'S2_TechnicalDifficulties',
            options: ['Yes', 'No'],
            required: true
        }
    ],
    on_finish: function (data) {
        var responses = JSON.parse(data.responses);
        console.log("TechnicalDifficulties:", responses.S2_TechnicalDifficulties);
        data["answer"] = responses.S2_TechnicalDifficulties;
    },
};

// Add the follow-up questions if the response to TechnicalDifficulties is "Yes"

var yes_TechnicalDifficulties = {
    type: 'survey-text',
    questions: [
        {
            prompt: "Could you please describe the technical difficulties you experienced? In what way did they impact your ability to participate in the study?",
            rows: 5,
            name: 'S2_TechDiffDescription',
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

let S2_studyTime = {
    type: 'survey-multi-choice',
    questions: [
        {
            prompt: "How much time have you spent outside of labs practicing your rock identification?",
            name: 'S2_timeSpentOn_ID',
            options: ['0hrs', 'Under 1hr', '1 - 2hrs', '2 - 3hrs', '3 - 4hrs', '4 - 5hrs', '5 - 6hrs', '6 - 7hrs', '7 - 8hrs', '>8hrs'],
            required: true
        },
        {
            prompt: "How much time have you spent outside of labs studying rock-related content (e.g., rock processes, mineral content in different rock types, mineral identification, etc.)?",
            name: 'S2_timeSpentOn_genStudying',
            options: ['0hrs', 'Under 1hr', '1 - 2hrs', '2 - 3hrs', '3 - 4hrs', '4 - 5hrs', '5 - 6hrs', '6 - 7hrs', '7 - 8hrs', '>8hrs'],
            required: true
        }
    ],
}


let S2_general_rockUnderstanding = {
    type: 'survey-likert',
    questions: [
        {
            prompt: "How confident do you feel in your understanding of rock processes (e.g., weathering, erosion, lithification, crystallization)?",
            name: 'S2_rockProcess_understanding',
            labels: ['Very confident', 'Confident', 'Somewhat confident', 'Not very confident', 'Not at all confident'],
            required: true
        },
        {
            prompt: "To what extent did you consider/weigh the processes that formed a rock when making your similarity judgments?",
            name: 'S2_rockProcess_consideration',
            labels: ['All of the time', 'Majority of the time', 'Some of the time', 'Not very often', 'Not at all'],
            required: true
        },
        {
            prompt: "How confident do you feel in your understanding of the mineral content that makes up rocks (e.g., mafic vs. felsic igneous rocks)?",
            name: 'S2_mineralComp_understanding',
            labels: ['Very confident', 'Confident', 'Somewhat confident', 'Not very confident', 'Not at all confident'],
            required: true
        },
        {
            prompt: "To what extent did you consider/weigh a rock's mineral content when making your similarity judgments?",
            name: 'S2_mineralComp_consideration',
            labels: ['All of the time', 'Majority of the time', 'Some of the time', 'Not very often', 'Not at all'],
            required: true
        },
    ],
}