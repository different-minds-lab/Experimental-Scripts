// PRELOAD IMAGES AND INITIATE TIMELINE
// Define stimuli variables
let img_list = [
    "./img/rock_pics/i_B1.png",
    "./img/rock_pics/i_B2.png",
    "./img/rock_pics/i_B3.png",
    "./img/rock_pics/i_D1.png",
    "./img/rock_pics/i_D2.png",
    "./img/rock_pics/i_D3.png",
    "./img/rock_pics/i_G1.png",
    "./img/rock_pics/i_G2.png",
    "./img/rock_pics/i_G3.png",
    "./img/rock_pics/i_N1.png",
    "./img/rock_pics/i_N2.png",
    "./img/rock_pics/i_N3.png",
    "./img/rock_pics/i_O1.png",
    "./img/rock_pics/i_O2.png",
    "./img/rock_pics/i_O3.png",
    "./img/rock_pics/i_P1.png",
    "./img/rock_pics/i_P2.png",
    "./img/rock_pics/i_P3.png",
    "./img/rock_pics/i_U1.png",
    "./img/rock_pics/i_U2.png",
    "./img/rock_pics/i_U3.png",
    "./img/rock_pics/s_A1.png",
    "./img/rock_pics/s_A2.png",
    "./img/rock_pics/s_A3.png",
    "./img/rock_pics/s_B1.png",
    "./img/rock_pics/s_B2.png",
    "./img/rock_pics/s_B3.png",
    "./img/rock_pics/s_C1.png",
    "./img/rock_pics/s_C2.png",
    "./img/rock_pics/s_C3.png",
    "./img/rock_pics/s_G1.png",
    "./img/rock_pics/s_G2.png",
    "./img/rock_pics/s_G3.png",
    "./img/rock_pics/s_H1.png",
    "./img/rock_pics/s_H2.png",
    "./img/rock_pics/s_H3.png",
    "./img/rock_pics/s_S1.png",
    "./img/rock_pics/s_S2.png",
    "./img/rock_pics/s_S3.png",
    "./img/rock_pics/s_Y1.png",
    "./img/rock_pics/s_Y2.png",
    "./img/rock_pics/s_Y3.png",
]

let label_list = [
    "./img/rock_name_stims/i_B.png",
    "./img/rock_name_stims/i_D.png",
    "./img/rock_name_stims/i_G.png",
    "./img/rock_name_stims/i_N.png",
    "./img/rock_name_stims/i_O.png",
    "./img/rock_name_stims/i_P.png",
    "./img/rock_name_stims/i_U.png",
    "./img/rock_name_stims/ic_I.png",
    "./img/rock_name_stims/s_A.png",
    "./img/rock_name_stims/s_B.png",
    "./img/rock_name_stims/s_C.png",
    "./img/rock_name_stims/s_G.png",
    "./img/rock_name_stims/s_H.png",
    "./img/rock_name_stims/s_S.png",
    "./img/rock_name_stims/s_Y.png",
    "./img/rock_name_stims/sc_E.png",
    "./img/rock_name_stims/ic_I.png", //added
    "./img/rock_name_stims/sc_E.png", //added
]

////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////// 

// DECLARING FUNCTIONS TO USE ON IMAGE TRIALS //

// Function to sample references from the SAME ROCK TYPE
function getSameRockTypeReferences(current_query, img_list) {
    let img_name = current_query.replace("./img/rock_pics/", "").replace(".png", "").replace(/[0-9]/g, ''); // take current query, take out extra img path info and assign it to the var img_name
    let rockType_options = img_list.filter(item => {
        let item_type = item.replace("./img/rock_pics/", "").replace(".png", "").replace(/[0-9]/g, '');
        return item_type === img_name && item !== current_query; // returns the rock type of your img
    });
    return jsPsych.randomization.sampleWithoutReplacement(rockType_options, 2); // returns two stimulus options that meet the same rock type criteria
}

// Function to sample references from the SAME CATEGORY that are NOT the SAME TYPE as the query CATEGORY TYPE & EXEMPLAR TRIALS
function img_getSameCategoryReferences(current_query, img_list) {
    const img_name = current_query.replace("./img/rock_pics/", "").replace(".png", "");
    const queryCategory = img_name.charAt(0); // Get the category from the query (indicated by the naming of the file)
    const queryRockType = img_name.charAt(2); // Get the rock type from the query (indicated by the naming of the file)

    // Create an object to store references from the same category but different rock types
    const sameCategoryDifferentRockTypeReferences = {};

    img_list.forEach(reference => {
        const referenceName = reference.replace("./img/rock_pics/", "").replace(".png", "");
        const referenceCategory = referenceName.charAt(0);
        const referenceRockType = referenceName.charAt(2); // Get the rock type

        // Check if the reference is not the same as the query, is from the same category,
        // and has a different rock type than the query
        if (
            reference !== current_query &&
            referenceCategory === queryCategory &&
            referenceRockType !== queryRockType
        ) {
            // Initialize the array for this rock type if it doesn't exist
            if (!sameCategoryDifferentRockTypeReferences[referenceRockType]) {
                sameCategoryDifferentRockTypeReferences[referenceRockType] = [];
            }
            sameCategoryDifferentRockTypeReferences[referenceRockType].push(reference);
        }
    });

    // Create an array to store the final selected references
    const selectedReferences = [];

    // Randomly select one image from each rock type
    for (const rockType in sameCategoryDifferentRockTypeReferences) {
        const rockTypeOptions = sameCategoryDifferentRockTypeReferences[rockType];
        if (rockTypeOptions.length > 0) {
            const randomIndex = Math.floor(Math.random() * rockTypeOptions.length);
            selectedReferences.push(rockTypeOptions[randomIndex]);
        }
    }
    return selectedReferences;
}

// Function to sample references from the OPPOSITE CATEGORY as the query
function img_getOppositeCategoryReferences(current_query, img_list) {
    const img_name = current_query.replace("./img/rock_pics/", "").replace(".png", "");
    const queryCategory = img_name.charAt(0); // Get the category from the query

    // Create an object to store references from the opposite category, grouped by rock type
    const oppositeCategoryReferencesByRockType = {};

    img_list.forEach(reference => {
        const referenceName = reference.replace("./img/rock_pics/", "").replace(".png", "");
        const referenceCategory = referenceName.charAt(0);
        const referenceRockType = referenceName.charAt(2); // Get the rock type

        // Check if the reference is not the same as the query and is from the opposite category
        if (reference !== current_query && referenceCategory !== queryCategory) {
            // Initialize the array for this rock type if it doesn't exist
            if (!oppositeCategoryReferencesByRockType[referenceRockType]) {
                oppositeCategoryReferencesByRockType[referenceRockType] = [];
            }
            oppositeCategoryReferencesByRockType[referenceRockType].push(reference);
        }
    });

    // Create an array to store the final selected references
    const selectedReferences = [];

    // Randomly select one image from each rock type
    for (const rockType in oppositeCategoryReferencesByRockType) {
        const rockTypeOptions = oppositeCategoryReferencesByRockType[rockType];
        if (rockTypeOptions.length > 0) {
            const randomIndex = Math.floor(Math.random() * rockTypeOptions.length);
            selectedReferences.push(rockTypeOptions[randomIndex]);
        }
    }
    return selectedReferences;
}
// * END OF FUNCTIONS TO USE ON IMAGE TRIALS * //

// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// initialize trial constraint counts
let img_CATEGORY_TYPE_level = 0;
let img_EXEMPLAR_level = 0;

// BLANK SCREEN FOR INTER TRIAL INTERVAL
const blankScreen500 = {
    type: 'html-keyboard-response',
    trial_duration: 500,
    stimulus: ""
};

////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////// 

// DECLARING FUNCTIONS TO USE ON LABEL TRIALS //

// PULLS OUT ALL OPPOSITE IMGS FROM OPTIONS ALSO EXCLUDES CATEGORY LABELS FROM OPTIONS
// CAN HAVE CATEGORY LABELS AS QUERY
function label_getSameCategoryReferences(current_query, label_list) {
    const img_name = current_query.replace("./img/rock_name_stims/", "").replace(".png", "");
    const queryCategory = img_name.charAt(0); // Get the category from the query

    // Create an array to store references from the same category but excluding category labels
    const categoryMatchingReferences = [];

    label_list.forEach(reference => {
        const referenceName = reference.replace("./img/rock_name_stims/", "").replace(".png", "");
        const referenceCategory = referenceName.charAt(0);

        // Check if the reference is not the same as the query, is from the same category,
        // and is not a category label
        if (reference !== current_query && referenceCategory === queryCategory && referenceName.charAt(1) !== 'c') {
            categoryMatchingReferences.push(reference);
        }
    });

    // Randomly select references from the same category (excluding category labels)
    return jsPsych.randomization.sampleWithoutReplacement(categoryMatchingReferences);
}

// PULLS OUT ALL SAME CATEGORY IMGS FROM OPTIONS ALSO EXCLUDES CATEGORY LABELS FROM OPTIONS
// CAN HAVE CATEGORY LABELS AS QUERY
function label_getOppositeCategoryReferences(current_query, label_list) {
    const img_name = current_query.replace("./img/rock_name_stims/", "").replace(".png", "");
    const queryCategory = img_name.charAt(0); // Get the category from the query

    // Create an array to store references from the opposite category, including those with "c" at index 1
    const oppositeCategoryReferences = [];

    label_list.forEach(reference => {
        const referenceName = reference.replace("./img/rock_name_stims/", "").replace(".png", "");
        const referenceCategory = referenceName.charAt(0);

        // Check if the reference is not the same as the query, is from the opposite category,
        // and has "c" at index 1
        if (
            reference !== current_query &&
            referenceCategory !== queryCategory &&
            referenceName.charAt(1) !== 'c' // Use !== instead of === here
        ) {
            oppositeCategoryReferences.push(reference);
        }
    });

    return oppositeCategoryReferences;
}
// END OF DECLARING FUNCTIONS TO USE ON LABEL TRIALS

// defining a list of the label stims that excludes the category label stimuli (i.e., no "Sedimentary" or "Igneous" stimuli labels)
let type_list = [
    "./img/rock_name_stims/i_B.png",
    "./img/rock_name_stims/i_D.png",
    "./img/rock_name_stims/i_G.png",
    "./img/rock_name_stims/i_N.png",
    "./img/rock_name_stims/i_O.png",
    "./img/rock_name_stims/i_P.png",
    "./img/rock_name_stims/i_U.png",
    "./img/rock_name_stims/s_A.png",
    "./img/rock_name_stims/s_B.png",
    "./img/rock_name_stims/s_C.png",
    "./img/rock_name_stims/s_G.png",
    "./img/rock_name_stims/s_H.png",
    "./img/rock_name_stims/s_S.png",
    "./img/rock_name_stims/s_Y.png",
]


////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////// 

// Code for FIXED image and label trials (same trials presented to participants pre and post instruction to get at a more concrete shift in perceived category structure)


// trial instructions presented to participants before completing a "fixed trial" where references presented are the same pre-to-post instruction
let fixedTrial_instructions = {
        type: 'instructions',
        pages: ["<div class='main' style='max-width:900px'><p>During this section of the experiment, you will complete a similarity ranking trial and will then be asked to justify your selections. Considering this, please be mindful of what you select and why you selected it. You will be asked for your reasoning after you submit your judgment by pressing the [spacebar]. There will only be a few trials of this type.</p><p>Press the [next] button below to proceed to the trials.</div>"],
        key_forward: 'space',
        show_page_number: true,
        show_clickable_nav: true
    }


// FIXED IMG TRIALS
let fixed_img_trial_data = []
// Additional code for trials with set reference images
// Trial 1
let fixed_trial1_options_img = ["./img/rock_pics/i_G3.png", "./img/rock_pics/i_U2.png", "./img/rock_pics/s_A1.png", "./img/rock_pics/s_C2.png", "./img/rock_pics/s_S3.png", "./img/rock_pics/s_G1.png", "./img/rock_pics/s_H2.png", "./img/rock_pics/s_B1.png"]
shuffleArray(fixed_trial1_options_img)

let fixed_trial1_img = {
    type: '8c2-embedding-module',
    "query_path": "./img/rock_pics/i_B1.png",
    reference: "./img/rock_pics/i_B1.png",
    "query_name": "i_B1",
    catchTrial: false,
    embeddingType: "Image",
    "references": fixed_trial1_options_img,
    "constraintType": "img_CATEGORY_TYPE_level",
    options: fixed_trial1_options_img,
};
fixed_img_trial_data.push(fixed_trial1_img);

let fixed_trial2_options_img = ["./img/rock_pics/i_N3.png", "./img/rock_pics/i_N1.png", "./img/rock_pics/i_D3.png", "./img/rock_pics/i_G1.png", "./img/rock_pics/s_B3.png", "./img/rock_pics/s_C2.png", "./img/rock_pics/s_H1.png", "./img/rock_pics/s_G1.png"]
shuffleArray(fixed_trial2_options_img)
// Trial 2
let fixed_trial2_img = {
    type: '8c2-embedding-module',
    "query_path": "./img/rock_pics/i_N2.png",
    reference: "./img/rock_pics/i_N2.png",
    "query_name": "i_N2",
    catchTrial: false,
    embeddingType: "Image",
    "references": fixed_trial2_options_img,
    "constraintType": "img_EXEMPLAR_level",
    options: fixed_trial2_options_img,

};
fixed_img_trial_data.push(fixed_trial2_img);

// Trial 3
let fixed_trial3_options_img = ["./img/rock_pics/i_G1.png", "./img/rock_pics/i_U3.png", "./img/rock_pics/s_A2.png", "./img/rock_pics/s_C1.png", "./img/rock_pics/s_S1.png", "./img/rock_pics/s_G3.png", "./img/rock_pics/s_H1.png", "./img/rock_pics/s_B2.png"]
shuffleArray(fixed_trial3_options_img)

let fixed_trial3_img = {
    type: '8c2-embedding-module',
    "query_path": "./img/rock_pics/i_N3.png",
    reference: "./img/rock_pics/i_N3.png",
    "query_name": "i_N3",
    catchTrial: false,
    embeddingType: "Image",
    "references": fixed_trial3_options_img,
    "constraintType": "img_CATEGORY_TYPE_level",
    options: fixed_trial3_options_img,
};
fixed_img_trial_data.push(fixed_trial3_img);

var fixedImgTrials = [fixed_trial1_img, fixed_trial2_img, fixed_trial3_img]
let shuffled_fixedImgTrials = shuffleArray(fixedImgTrials)

// FIXED LABEL TRIALS
let fixed_label_trial_data = [];

// Additional code for trials with set reference images
// Trial 1
let fixed_trial1_options_lab = ["./img/rock_name_stims/i_G.png", "./img/rock_name_stims/i_U.png", "./img/rock_name_stims/s_A.png", "./img/rock_name_stims/s_C.png", "./img/rock_name_stims/s_S.png", "./img/rock_name_stims/s_G.png", "./img/rock_name_stims/s_H.png", "./img/rock_name_stims/s_B.png"]
shuffleArray(fixed_trial1_options_lab)

let fixed_trial1_lab = {
    type: '8c2-embedding-module',
    "query_path": "./img/rock_name_stims/i_B.png",
    reference: "./img/rock_name_stims/i_B.png",
    "query_name": "i_B",
    catchTrial: false,
    embeddingType: "Word",
    "references": fixed_trial1_options_lab,
    "constraintType": "label_CATEGORY_TYPE_level_vA",
    options: fixed_trial1_options_lab,
};
fixed_label_trial_data.push(fixed_trial1_lab);

let fixed_trial2_options_lab = ["./img/rock_name_stims/s_H.png", "./img/rock_name_stims/s_C.png", "./img/rock_name_stims/s_Y.png", "./img/rock_name_stims/i_B.png", "./img/rock_name_stims/i_U.png", "./img/rock_name_stims/i_N.png", "./img/rock_name_stims/i_D.png", "./img/rock_name_stims/i_O.png"]
shuffleArray(fixed_trial2_options_lab)
// Trial 2
let fixed_trial2_lab = {
    type: '8c2-embedding-module',
    "query_path": "./img/rock_name_stims/sc_E.png",
    reference: "./img/rock_name_stims/sc_E.png",
    "query_name": "sc_E",
    catchTrial: false,
    embeddingType: "Word",
    "references": fixed_trial2_options_lab,
    "constraintType": "label_TYPE_level_vB",
    options: fixed_trial2_options_lab,

};
fixed_label_trial_data.push(fixed_trial2_lab);

var fixedLabelTrials = [fixed_trial1_lab, fixed_trial2_lab]
let shuffled_fixedLabelTrials = shuffleArray(fixedLabelTrials)