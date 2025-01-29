// Experiment Overview: ================================================================================================

// STIMULI INFORMATION
    // 176 trials in total (88 Face 1, 88 Face 2)
    // 96 DIFFERENT trials (48 congruent, 48 incongruent) (32 easy [BodyA-BodyD, BodyB-BodyE], 32 medium [BodyA-BodyC, BodyC-BodyE], 32 hard [BodyA-BodyB, BodyD-BodyE])
    // 80 SAME trials - each pair of stimuli is shown twice to make the number of same trials more closely resemble the number of different trials
    // Congruent trials = (faces that are NON IDENTICAL and bodies that are NON IDENTICAL) (faces that are IDENTICAL and bodies that are IDENTICAL)
    // Incongruent trials = (faces that are NON IDENTICAL and bodies that are IDENTICAL) (faces that are IDENTICAL and bodies that are NON IDENTICAL)

//DIFFICULTY LEVELS
    // Body A and Body E are Parent Bodies. They are 99%-1% morphs so that they are not original images (ie. match the quality of the morphed images)
    // Body B is 75% Body A and 25% Body E. Body C is 50% A and E. Body D is 75% Body E and 25% Body A. Trials are created so that each morph is paried with a parent body.
    // Easy trials = bodies that are MORE different. Ex. Body A and Body D, or Body B and Body E --> Ex. Face1_BodyA.png and Face1_BodyD.png, Face1_BodyB.png and Face1_BodyE.png
    // Medium Trials = bodies that are different.  Ex. Body A and Body C, or Body E and Body C --> Ex. Face1_BodyA.png and Face1_BodyC.png, Face1_BodyE.png and Face1_BodyC.png
    // Hard trials = bodies that are LESS different. Ex. Body A and Body B, or Body D and Body E --> Ex. Face1_BodyA.png and Face1_BodyB.png, Face1_BodyD.png and Face1_BodyE.png

//FACES
    // There are 2 different faces being used. 1 and 2. --> Face1_BodyA.png, Face2_BodyA.png
        // If they are the SAME number and it is a DIFFERENT trial, they should be INCONGRUENT
        // If they are DIFFERENT numbers and it is a DIFFERENT trial, they should be CONGRUENT
        // If they are the SAME number and it is a SAME trial, they should be CONGRUENT
        // If they are DIFFERENT numbers and it is a SAME trial, they should be INCONGRUENT

// =====================================================================================================================


// Generates all appropriate trial combinations for Experiments 1 & 2 (dynamically depending on setting of Boolean)

// Retrieve the URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the 'version' parameter from the URL
const experimentVersion = urlParams.get('exp');
// const experimentVersion = 1;

const gender_to_present = urlParams.get('stim');

let keyOptions = ['F', 'J'];
let sameKey = keyOptions[Math.round(Math.random())];
let differentKey = sameKey === 'F' ? 'J' : 'F';

let keyMapping = { sameKey, differentKey };

console.log(keyMapping);

// Define the 'experiment' variable based on the 'version' parameter
const experiment = experimentVersion ? parseInt(experimentVersion) : 1; // Default to 1 if 'version' is not present
// const experiment = experimentVersion// Default to 1 if 'version' is not present

// Now 'experiment' holds the value of the selected version ('1' or '2')
// You can use 'experiment' throughout your script
console.log(`Experiment version: ${experiment}`);

    // 1 = run Exp1 - attend to face
    // 2 = run Exp2 - attend to body

let printTrial_options = true; // if 'true', will print out all trial options displayed to participant
let exp_stimuli; // initialize var to store stimuli for experiment
let trialCount = false; // will print num trials / condition

// Experiment 1 (attend to the face) =============================================================================================

// Overview of trials:
    // Have 2 body options
    // Have 5 face options (parametrically manipulated ranging from FaceA to FaceE)

    // 176 trials (88 / parent stimulus - different body options)
    // 96 DIFFERENT trials 
        // (48 congruent, 48 incongruent) 
        // (32 easy [FaceA-FaceD, FaceB-FaceE], 32 medium [FaceA-FaceC, FaceC-FaceE], 32 hard [FaceA-FaceB, FaceD-FaceE])
    // 80 SAME trials - each pair of stimuli is shown twice to make the number of same trials more closely resemble the number of different trials
    
    // CONGRUENCY:
        // Congruent trials = (bodies that are NON IDENTICAL and faces that are NON IDENTICAL) OR (bodies that are IDENTICAL and faces that are IDENTICAL)
        // Incongruent trials = (bodies that are NON IDENTICAL and faces that are IDENTICAL) OR (bodies that are IDENTICAL and faces that are NON IDENTICAL)


// Start by defining stimuli list for both experiments
let exp1_stimuli = {
    Female: [
        "./imgs/Exp1_Face/Female_Body1_FaceA_A.png",
        "./imgs/Exp1_Face/Female_Body1_FaceA_M.png",
        "./imgs/Exp1_Face/Female_Body1_FaceB_A.png",
        "./imgs/Exp1_Face/Female_Body1_FaceB_M.png",
        "./imgs/Exp1_Face/Female_Body1_FaceC_A.png",
        "./imgs/Exp1_Face/Female_Body1_FaceC_M.png",
        "./imgs/Exp1_Face/Female_Body1_FaceD_A.png",
        "./imgs/Exp1_Face/Female_Body1_FaceD_M.png",
        "./imgs/Exp1_Face/Female_Body1_FaceE_A.png",
        "./imgs/Exp1_Face/Female_Body1_FaceE_M.png",
        "./imgs/Exp1_Face/Female_Body2_FaceA_A.png",
        "./imgs/Exp1_Face/Female_Body2_FaceA_M.png",
        "./imgs/Exp1_Face/Female_Body2_FaceB_A.png",
        "./imgs/Exp1_Face/Female_Body2_FaceB_M.png",
        "./imgs/Exp1_Face/Female_Body2_FaceC_A.png",
        "./imgs/Exp1_Face/Female_Body2_FaceC_M.png",
        "./imgs/Exp1_Face/Female_Body2_FaceD_A.png",
        "./imgs/Exp1_Face/Female_Body2_FaceD_M.png",
        "./imgs/Exp1_Face/Female_Body2_FaceE_A.png",
        "./imgs/Exp1_Face/Female_Body2_FaceE_M.png"],
    Male: [
        "./imgs/Exp1_Face/Male_Body1_FaceA_A.png",
        "./imgs/Exp1_Face/Male_Body1_FaceA_M.png",
        "./imgs/Exp1_Face/Male_Body1_FaceB_A.png",
        "./imgs/Exp1_Face/Male_Body1_FaceB_M.png",
        "./imgs/Exp1_Face/Male_Body1_FaceC_A.png",
        "./imgs/Exp1_Face/Male_Body1_FaceC_M.png",
        "./imgs/Exp1_Face/Male_Body1_FaceD_A.png",
        "./imgs/Exp1_Face/Male_Body1_FaceD_M.png",
        "./imgs/Exp1_Face/Male_Body1_FaceE_A.png",
        "./imgs/Exp1_Face/Male_Body1_FaceE_M.png",
        "./imgs/Exp1_Face/Male_Body2_FaceA_A.png",
        "./imgs/Exp1_Face/Male_Body2_FaceA_M.png",
        "./imgs/Exp1_Face/Male_Body2_FaceB_A.png",
        "./imgs/Exp1_Face/Male_Body2_FaceB_M.png",
        "./imgs/Exp1_Face/Male_Body2_FaceC_A.png",
        "./imgs/Exp1_Face/Male_Body2_FaceC_M.png",
        "./imgs/Exp1_Face/Male_Body2_FaceD_A.png",
        "./imgs/Exp1_Face/Male_Body2_FaceD_M.png",
        "./imgs/Exp1_Face/Male_Body2_FaceE_A.png",
        "./imgs/Exp1_Face/Male_Body2_FaceE_M.png",
    ]
}
let exp2_stimuli = {
    Female: [
        "./imgs/Exp2_Body/Female_Face1_BodyA_A.png",
        "./imgs/Exp2_Body/Female_Face1_BodyA_M.png",
        "./imgs/Exp2_Body/Female_Face1_BodyB_A.png",
        "./imgs/Exp2_Body/Female_Face1_BodyB_M.png",
        "./imgs/Exp2_Body/Female_Face1_BodyC_A.png",
        "./imgs/Exp2_Body/Female_Face1_BodyC_M.png",
        "./imgs/Exp2_Body/Female_Face1_BodyD_A.png",
        "./imgs/Exp2_Body/Female_Face1_BodyD_M.png",
        "./imgs/Exp2_Body/Female_Face1_BodyE_A.png",
        "./imgs/Exp2_Body/Female_Face1_BodyE_M.png",
        "./imgs/Exp2_Body/Female_Face2_BodyA_A.png",
        "./imgs/Exp2_Body/Female_Face2_BodyA_M.png",
        "./imgs/Exp2_Body/Female_Face2_BodyB_A.png",
        "./imgs/Exp2_Body/Female_Face2_BodyB_M.png",
        "./imgs/Exp2_Body/Female_Face2_BodyC_A.png",
        "./imgs/Exp2_Body/Female_Face2_BodyC_M.png",
        "./imgs/Exp2_Body/Female_Face2_BodyD_A.png",
        "./imgs/Exp2_Body/Female_Face2_BodyD_M.png",
        "./imgs/Exp2_Body/Female_Face2_BodyE_A.png",
        "./imgs/Exp2_Body/Female_Face2_BodyE_M.png"],
    Male: [
        "./imgs/Exp2_Body/Male_Face1_BodyA_A.png",
        "./imgs/Exp2_Body/Male_Face1_BodyA_M.png",
        "./imgs/Exp2_Body/Male_Face1_BodyB_A.png",
        "./imgs/Exp2_Body/Male_Face1_BodyB_M.png",
        "./imgs/Exp2_Body/Male_Face1_BodyC_A.png",
        "./imgs/Exp2_Body/Male_Face1_BodyC_M.png",
        "./imgs/Exp2_Body/Male_Face1_BodyD_A.png",
        "./imgs/Exp2_Body/Male_Face1_BodyD_M.png",
        "./imgs/Exp2_Body/Male_Face1_BodyE_A.png",
        "./imgs/Exp2_Body/Male_Face1_BodyE_M.png",
        "./imgs/Exp2_Body/Male_Face2_BodyA_A.png",
        "./imgs/Exp2_Body/Male_Face2_BodyA_M.png",
        "./imgs/Exp2_Body/Male_Face2_BodyB_A.png",
        "./imgs/Exp2_Body/Male_Face2_BodyB_M.png",
        "./imgs/Exp2_Body/Male_Face2_BodyC_A.png",
        "./imgs/Exp2_Body/Male_Face2_BodyC_M.png",
        "./imgs/Exp2_Body/Male_Face2_BodyD_A.png",
        "./imgs/Exp2_Body/Male_Face2_BodyD_M.png",
        "./imgs/Exp2_Body/Male_Face2_BodyE_A.png",
        "./imgs/Exp2_Body/Male_Face2_BodyE_M.png",
    ]
}

let masks = [
    "./imgs/masks/female_mask.png",
    "./imgs/masks/male_mask.png",
]

let intertrialBlank_stim = ['./imgs/whiteImg.png']

let practice_stimulus_set = {
    Female: [
        "./imgs/practice_stims/Female_Body1_FaceA_A.png",
        "./imgs/practice_stims/Female_Body1_FaceA_M.png",
        "./imgs/practice_stims/Female_Body1_FaceB_A.png",
        "./imgs/practice_stims/Female_Body1_FaceB_M.png",
        "./imgs/practice_stims/Female_Body1_FaceC_A.png",
        "./imgs/practice_stims/Female_Body1_FaceC_M.png",
        "./imgs/practice_stims/Female_Body1_FaceD_A.png",
        "./imgs/practice_stims/Female_Body1_FaceD_M.png",
        "./imgs/practice_stims/Female_Body2_FaceA_A.png",
        "./imgs/practice_stims/Female_Body2_FaceA_M.png",
        "./imgs/practice_stims/Female_Body2_FaceB_A.png",
        "./imgs/practice_stims/Female_Body2_FaceB_M.png",
        "./imgs/practice_stims/Female_Body2_FaceC_A.png",
        "./imgs/practice_stims/Female_Body2_FaceC_M.png",
        "./imgs/practice_stims/Female_Body2_FaceD_A.png",
        "./imgs/practice_stims/Female_Body2_FaceD_M.png",
    ],
    Male: [
        "./imgs/practice_stims/Male_Body1_FaceA_A.png",
        "./imgs/practice_stims/Male_Body1_FaceA_M.png",
        "./imgs/practice_stims/Male_Body1_FaceB_A.png",
        "./imgs/practice_stims/Male_Body1_FaceB_M.png",
        "./imgs/practice_stims/Male_Body1_FaceC_A.png",
        "./imgs/practice_stims/Male_Body1_FaceC_M.png",
        "./imgs/practice_stims/Male_Body1_FaceD_A.png",
        "./imgs/practice_stims/Male_Body1_FaceD_M.png",
        "./imgs/practice_stims/Male_Body2_FaceA_A.png",
        "./imgs/practice_stims/Male_Body2_FaceA_M.png",
        "./imgs/practice_stims/Male_Body2_FaceB_A.png",
        "./imgs/practice_stims/Male_Body2_FaceB_M.png",
        "./imgs/practice_stims/Male_Body2_FaceC_A.png",
        "./imgs/practice_stims/Male_Body2_FaceC_M.png",
        "./imgs/practice_stims/Male_Body2_FaceD_A.png",
        "./imgs/practice_stims/Male_Body2_FaceD_M.png",
    ]
}

let practice_stimuli;

// determine which stimulus set to use
if (experiment == 1) {
    if (gender_to_present == 'female') {
        exp_stimuli = exp1_stimuli.Female
        practice_stimuli = practice_stimulus_set.Female
    } else if (gender_to_present == 'male') {
        exp_stimuli = exp1_stimuli.Male
        practice_stimuli = practice_stimulus_set.Male
    }
} else if (experiment == 2) {
    if (gender_to_present == 'female') {
        exp_stimuli = exp2_stimuli.Female
        practice_stimuli = practice_stimulus_set.Female
    } else if (gender_to_present == 'male') {
        exp_stimuli = exp2_stimuli.Male
        practice_stimuli = practice_stimulus_set.Male
    }
}

// // ===============================================================================================================================
//     // ===============================================================================================================================
//     // ===============================================================================================================================
// // ===============================================================================================================================


// // Experiment 2 (attend to the body) =============================================================================================

// // Overview of trials:
//     // Have 2 face options
//     // Have 5 body options (parametrically manipulated ranging from BodyA to BodyE)

//     // 176 trials (88 / parent stimulus - different face options)
//     // 96 DIFFERENT trials 
//         // (48 congruent, 48 incongruent) 
//         // (32 easy [BodyA-BodyD, BodyB-BodyE], 32 medium [BodyA-BodyC, BodyC-BodyE], 32 hard [BodyA-BodyB, BodyD-BodyE])
    // 80 SAME trials - each pair of stimuli is shown twice to make the number of same trials more closely resemble the number of different trials

//     // CONGRUENCY:
//         // Congruent trials = (faces that are NON IDENTICAL and bodies that are NON IDENTICAL) OR (faces that are IDENTICAL and bodies that are IDENTICAL)
//         // Incongruent trials = (faces that are NON IDENTICAL and bodies that are IDENTICAL) OR (faces that are IDENTICAL and bodies that are NON IDENTICAL)



// // ===============================================================================================================================


// Experiment 1 (attend to the face) =============================================================================================

// Overview of trials:
    // 176 trials (88 / parent stimulus - different body options)
    // 96 DIFFERENT trials 
    // (48 congruent, 48 incongruent) 
    // (32 easy [FaceA-FaceD, FaceB-FaceE], 32 medium [FaceA-FaceC, FaceC-FaceE], 32 hard [FaceA-FaceB, FaceD-FaceE])
    // 80 SAME trials - each pair of stimuli is shown twice to make the number of same trials more closely resemble the number of different trials

// CONGRUENCY:
    // Congruent trials = (bodies that are NON IDENTICAL and faces that are NON IDENTICAL) OR (bodies that are IDENTICAL and faces that are IDENTICAL)
    // Incongruent trials = (bodies that are NON IDENTICAL and faces that are IDENTICAL) OR (bodies that are IDENTICAL and faces that are NON IDENTICAL)

function determineDifficulty(stim1, stim2, experiment) {
    // console.log('stim1:', stim1, '=====', 'stim2:', stim2, '=======', 'experiment:', experiment)
    if (experiment == 1) {
        const faceDifficultyMap = {
            'FaceA-FaceD': 'easy',
            'FaceB-FaceE': 'easy',
            'FaceA-FaceC': 'medium',
            'FaceC-FaceE': 'medium',
            'FaceA-FaceB': 'hard',
            'FaceD-FaceE': 'hard'
        };
    
        let facePair = `${stim1}-${stim2}`;
        let reverseFacePair = `${stim2}-${stim1}`;
        console.log('Checking pairs:', facePair, reverseFacePair);

        
        return faceDifficultyMap[facePair] || faceDifficultyMap[reverseFacePair] || 'unknown';
    } else if (experiment == 2) {
        const bodyDifficultyMap = {
            'BodyA-BodyD': 'easy',
            'BodyB-BodyE': 'easy',
            'BodyA-BodyC': 'medium',
            'BodyC-BodyE': 'medium',
            'BodyA-BodyB': 'hard',
            'BodyD-BodyE': 'hard'
        };
    
        let bodyPair = `${stim1}-${stim2}`;
        let reverseBodyPair = `${stim2}-${stim1}`;
        console.log('Checking pairs:', bodyPair, reverseBodyPair);

        
        return bodyDifficultyMap[bodyPair] || bodyDifficultyMap[reverseBodyPair] || 'unknown';
    }

}

function generateTrial(stimuli, gender_of_stimuli, experiment) {
    // Split path to get gender, face, body, and alignment
    let parts = stimuli.split('/');
    let filename = parts[parts.length - 1];

    if (experiment == 1) {
        // Attempt to match face and body patterns
        let faceMatch = filename.match(/Face[A-E]/);
        let bodyMatch = filename.match(/Body[1-2]/);
        if (!faceMatch || !bodyMatch) {
            console.error(`Unexpected filename format: ${filename}`);
            return null;  // Skip this stimulus if it doesn't match expected patterns
        }
        let face = faceMatch[0];
        let body = bodyMatch[0];
        let alignment = filename.split('_').pop().replace('.png', ''); // Extract alignment from filename
        let gender = gender_of_stimuli;
    
        return { gender, face, body, alignment, stimuli, mask_stimulus };
    } else if (experiment == 2) {
        // Attempt to match face and body patterns
        let bodyMatch = filename.match(/Body[A-E]/);
        let faceMatch = filename.match(/Face[1-2]/);
        if (!bodyMatch || !faceMatch) {
            console.error(`Unexpected filename format: ${filename}`);
            return null;  // Skip this stimulus if it doesn't match expected patterns
        }
        let face = faceMatch[0];
        let body = bodyMatch[0];
        let alignment = filename.split('_').pop().replace('.png', ''); // Extract alignment from filename
        let gender = gender_of_stimuli; // Assumes gender is in the folder name


        return { gender, face, body, alignment, stimuli};
    }
}

function generatePracticeTrial(stimuli, gender_of_stimuli, experiment) {
    // Split path to get gender, face, body, and alignment
    let parts = stimuli.split('/');
    let filename = parts[parts.length - 1];

        // Attempt to match face and body patterns
        let faceMatch = filename.match(/Face[A-E]/);
        let bodyMatch = filename.match(/Body[1-2]/);
        if (!faceMatch || !bodyMatch) {
            console.error(`Unexpected filename format: ${filename}`);
            return null;  // Skip this stimulus if it doesn't match expected patterns
        }
        let face = faceMatch[0];
        let body = bodyMatch[0];
        let alignment = filename.split('_').pop().replace('.png', ''); // Extract alignment from filename
        let gender = gender_of_stimuli;
    
        return { gender, face, body, alignment, stimuli, mask_stimulus };

}

function createTrials_exp1(exp_stimuli, gender_of_stimuli, mask_assigned) {
    let trials = [];
    mask_stimulus = mask_assigned
    // Generate all possible "different" trials
    for (let i = 0; i < exp_stimuli.length; i++) {
        for (let j = i + 1; j < exp_stimuli.length; j++) {
            let stim1 = generateTrial(exp_stimuli[i], gender_of_stimuli, experiment);
            let stim2 = generateTrial(exp_stimuli[j], gender_of_stimuli, experiment);

            // Skip invalid stimuli
            if (!stim1 || !stim2) continue;

            // Ensure that stim1 and stim2 have the same alignment (aligned or misaligned)
            if (stim1.alignment !== stim2.alignment) continue;

            let isSame = (stim1.stimuli === stim2.stimuli);
            let trialType = isSame ? 'Same' : 'Different';

            let congruent = (stim1.body !== stim2.body && stim1.face !== stim2.face) ||
                            (stim1.body === stim2.body && stim1.face === stim2.face);

            let difficulty;

            if (experiment == 1) {
                difficulty = determineDifficulty(stim1.face, stim2.face, experiment)
            } else if (experiment == 2) {
                difficulty = determineDifficulty(stim1.body, stim2.body, experiment);
            }

            // Skip trial if difficulty is 'unknown'
            if (difficulty === 'unknown') continue;

            // Add the original order
            trials.push({
                stim1: stim1.stimuli,
                stim2: stim2.stimuli,
                congruent: congruent ? 'Congruent' : 'Incongruent',
                difficulty: difficulty,
                stim1_alignment: stim1.alignment,
                stim2_alignment: stim2.alignment,
                Face_1: stim1.face.slice(-1),
                Face_2: stim2.face.slice(-1),
                Body_1: stim1.body.slice(-1),
                Body_2: stim2.body.slice(-1),
                trialType: trialType,
                corr_response: keyMapping.differentKey,
                gender: gender_of_stimuli,
                mask: mask_stimulus,
            });

            // Add the reversed order for different trials
            if (trialType === 'Different') {
                trials.push({
                    stim1: stim2.stimuli,
                    stim2: stim1.stimuli,
                    congruent: congruent ? 'Congruent' : 'Incongruent',
                    difficulty: difficulty,
                    stim1_alignment: stim2.alignment,
                    stim2_alignment: stim1.alignment,
                    Face_1: stim2.face.slice(-1),
                    Face_2: stim1.face.slice(-1),
                    Body_1: stim2.body.slice(-1),
                    Body_2: stim1.body.slice(-1),
                    trialType: trialType,
                    corr_response: keyMapping.differentKey,
                    gender: gender_of_stimuli,
                    mask: mask_stimulus,
                });
            }
        }
    }

    // Generate all "same" trials (identical stimuli)
    for (let i = 0; i < exp_stimuli.length; i++) {
        let stim1 = generateTrial(exp_stimuli[i], gender_of_stimuli, experiment);

        // Skip invalid stimuli
        if (!stim1) continue;

        // Generate congruent same trials (both face and body remain the same)
        trials.push({
            stim1: stim1.stimuli,
            stim2: stim1.stimuli, // identical stimuli for "same" trials
            congruent: 'Congruent',
            difficulty: 'Same',
            stim1_alignment: stim1.alignment,
            stim2_alignment: stim1.alignment,
            Face_1: stim1.face.slice(-1),
            Face_2: stim1.face.slice(-1),
            Body_1: stim1.body.slice(-1),
            Body_2: stim1.body.slice(-1),
            trialType: 'Same',
            corr_response: keyMapping.sameKey,
            gender: gender_of_stimuli,
            mask: mask_stimulus
        });

        // Generate incongruent same trials (same face but different body)
        for (let j = 0; j < exp_stimuli.length; j++) {
            if (i === j) continue; // Skip identical trials

            let stim2 = generateTrial(exp_stimuli[j], gender_of_stimuli, experiment);

            // Skip invalid stimuli
            if (!stim2 || stim1.face !== stim2.face || stim1.body === stim2.body || stim1.alignment !== stim2.alignment) continue;

            trials.push({
                stim1: stim1.stimuli,
                stim2: stim2.stimuli, // same face, different body for "incongruent same" trials
                congruent: 'Incongruent',
                difficulty: 'Same',
                stim1_alignment: stim1.alignment,
                stim2_alignment: stim2.alignment,
                Face_1: stim1.face.slice(-1),
                Face_2: stim2.face.slice(-1),
                Body_1: stim1.body.slice(-1),
                Body_2: stim2.body.slice(-1),
                trialType: 'Same',
                corr_response: keyMapping.sameKey,
                gender: gender_of_stimuli,
                mask: mask_stimulus
            });
        }
    }

        // Duplicate SAME trials to match DIFFERENT trial count
        let sameTrials = trials.filter(t => t.trialType === 'Same');
    
        // Log the counts
        if (trialCount) {
            console.log(`Total ${gender_of_stimuli} trials before duplicating same trials: ${trials.length}`);
            console.log(`Same ${gender_of_stimuli} trials - before duplicating: ${sameTrials.length}`)
        };
    

        // Duplicate same trials if needed
        trials = trials.concat(sameTrials);
    
        sameTrials = trials.filter(t => t.trialType === 'Same');
        if (trialCount) { console.log(`Same ${gender_of_stimuli} trials - after duplicating: ${sameTrials.length}`)};

        let differentTrials = trials.filter(t => t.trialType === 'Different');
        let congruentTrials = trials.filter(t => t.congruent === 'Congruent');
        let incongruentTrials = trials.filter(t => t.congruent === 'Incongruent');

        // Log the counts
        console.log(`Total ${gender_of_stimuli} trials count: ${trials.length}`);
        
        if (printTrial_options) {console.log(`Same ${gender_of_stimuli}: `, trials.filter(t => t.trialType === 'Same'))}
        if (trialCount) {console.log(`Different ${gender_of_stimuli} trials count: ${differentTrials.length}`)};
        if (printTrial_options) { console.log(`Different ${gender_of_stimuli}: `, trials.filter(t => t.trialType === 'Different'))};
        if (trialCount) {console.log(`Congruent ${gender_of_stimuli} trials count: ${congruentTrials.length}`)}
        if (trialCount) {console.log(`Incongruent ${gender_of_stimuli} trials count: ${incongruentTrials.length}`)};
        if (printTrial_options) { console.log(`Incongruent ${gender_of_stimuli}: `, trials.filter(t => t.congruent === 'Incongruent'))};
    
    // Shuffle trials
    trials = shuffleArray(trials);

    return trials;
}

function createTrials_exp2(exp_stimuli, gender_of_stimuli, mask_assigned) {
    let trials = [];
    mask_stimulus = mask_assigned
    // Generate all possible "different" trials
    for (let i = 0; i < exp_stimuli.length; i++) {
        for (let j = i + 1; j < exp_stimuli.length; j++) {
            let stim1 = generateTrial(exp_stimuli[i], gender_of_stimuli, experiment);
            let stim2 = generateTrial(exp_stimuli[j], gender_of_stimuli, experiment);

            // Skip invalid stimuli
            if (!stim1 || !stim2) continue;

            // Ensure that stim1 and stim2 have the same alignment (aligned or misaligned)
            if (stim1.alignment !== stim2.alignment) continue;

            let isSame = (stim1.stimuli === stim2.stimuli);
            let trialType = isSame ? 'Same' : 'Different';

            let congruent = (stim1.face !== stim2.face && stim1.body !== stim2.body) ||
                            (stim1.face === stim2.face && stim1.body === stim2.body);

            let difficulty;

            if (experiment == 1) {
                difficulty = determineDifficulty(stim1.face, stim2.face, experiment)
            } else if (experiment == 2) {
                difficulty = determineDifficulty(stim1.body, stim2.body, experiment);
            }

            // Skip trial if difficulty is 'unknown'
            if (difficulty === 'unknown') continue;

            // Add the original order
            trials.push({
                stim1: stim1.stimuli,
                stim2: stim2.stimuli,
                congruent: congruent ? 'Congruent' : 'Incongruent',
                difficulty: difficulty,
                stim1_alignment: stim1.alignment,
                stim2_alignment: stim2.alignment,
                Face_1: stim1.face.slice(-1),
                Face_2: stim2.face.slice(-1),
                Body_1: stim1.body.slice(-1),
                Body_2: stim2.body.slice(-1),
                trialType: trialType,
                corr_response: keyMapping.differentKey,
                gender: gender_of_stimuli,
                mask: mask_stimulus,
            });

            // Add the reversed order for different trials
            if (trialType === 'Different') {
                trials.push({
                    stim1: stim2.stimuli,
                    stim2: stim1.stimuli,
                    congruent: congruent ? 'Congruent' : 'Incongruent',
                    difficulty: difficulty,
                    stim1_alignment: stim2.alignment,
                    stim2_alignment: stim1.alignment,
                    Face_1: stim2.face.slice(-1),
                    Face_2: stim1.face.slice(-1),
                    Body_1: stim2.body.slice(-1),
                    Body_2: stim1.body.slice(-1),
                    trialType: trialType,
                    corr_response: keyMapping.differentKey,
                    gender: gender_of_stimuli,
                    mask: mask_stimulus,
                });
            }
        }
    }

    // Generate all "same" trials (identical stimuli)
    for (let i = 0; i < exp_stimuli.length; i++) {
        let stim1 = generateTrial(exp_stimuli[i], gender_of_stimuli, experiment);

        // Skip invalid stimuli
        if (!stim1) continue;

        // Generate congruent same trials (both face and body remain the same)
        trials.push({
            stim1: stim1.stimuli,
            stim2: stim1.stimuli, // identical stimuli for "same" trials
            congruent: 'Congruent',
            difficulty: 'Same',
            stim1_alignment: stim1.alignment,
            stim2_alignment: stim1.alignment,
            Face_1: stim1.face.slice(-1),
            Face_2: stim1.face.slice(-1),
            Body_1: stim1.body.slice(-1),
            Body_2: stim1.body.slice(-1),
            trialType: 'Same',
            corr_response: keyMapping.sameKey,
            gender: gender_of_stimuli,
            mask: mask_stimulus
        });

        // Generate incongruent same trials (same face but different body)
        for (let j = 0; j < exp_stimuli.length; j++) {
            if (i === j) continue; // Skip identical trials

            let stim2 = generateTrial(exp_stimuli[j], gender_of_stimuli, experiment);

            // Skip invalid stimuli
            if (!stim2 || stim1.body !== stim2.body || stim1.face === stim2.face || stim1.alignment !== stim2.alignment) continue;

            trials.push({
                stim1: stim1.stimuli,
                stim2: stim2.stimuli, // same face, different body for "incongruent same" trials
                congruent: 'Incongruent',
                difficulty: 'Same',
                stim1_alignment: stim1.alignment,
                stim2_alignment: stim2.alignment,
                Face_1: stim1.face.slice(-1),
                Face_2: stim2.face.slice(-1),
                Body_1: stim1.body.slice(-1),
                Body_2: stim2.body.slice(-1),
                trialType: 'Same',
                corr_response: keyMapping.sameKey,
                gender: gender_of_stimuli,
                mask: mask_stimulus
            });
        }
    }

        // Duplicate SAME trials to match DIFFERENT trial count
        let sameTrials = trials.filter(t => t.trialType === 'Same');
    
        // Log the counts
        if (trialCount) {
            console.log(`Total ${gender_of_stimuli} trials before duplicating same trials: ${trials.length}`);
            console.log(`Same ${gender_of_stimuli} trials - before duplicating: ${sameTrials.length}`)
        };
    

        // Duplicate same trials if needed
        trials = trials.concat(sameTrials);
    
        sameTrials = trials.filter(t => t.trialType === 'Same');
        if (trialCount) { console.log(`Same ${gender_of_stimuli} trials - after duplicating: ${sameTrials.length}`)};

        let differentTrials = trials.filter(t => t.trialType === 'Different');
        let congruentTrials = trials.filter(t => t.congruent === 'Congruent');
        let incongruentTrials = trials.filter(t => t.congruent === 'Incongruent');

        // Log the counts
        console.log(`Total ${gender_of_stimuli} trials count: ${trials.length}`);
        
        if (printTrial_options) {console.log(`Same ${gender_of_stimuli}: `, trials.filter(t => t.trialType === 'Same'))}
        if (trialCount) {console.log(`Different ${gender_of_stimuli} trials count: ${differentTrials.length}`)};
        if (printTrial_options) { console.log(`Different ${gender_of_stimuli}: `, trials.filter(t => t.trialType === 'Different'))};
        if (trialCount) {console.log(`Congruent ${gender_of_stimuli} trials count: ${congruentTrials.length}`)}
        if (trialCount) {console.log(`Incongruent ${gender_of_stimuli} trials count: ${incongruentTrials.length}`)};
        if (printTrial_options) { console.log(`Incongruent ${gender_of_stimuli}: `, trials.filter(t => t.congruent === 'Incongruent'))};
    
    // Shuffle trials
    trials = shuffleArray(trials);

    return trials;
}

// Other functions remain unchanged
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let experiment_masks = [
    './imgs/masks/female_mask.png',
    './imgs/masks/male_mask.png'
]


// Generate the trials

let experiment_trials;
let experiment_masks_to_use;

if (gender_to_present == 'female') {
    experiment_masks_to_use = experiment_masks[0]
} else if (gender_to_present == 'male') {
    experiment_masks_to_use = experiment_masks[1]
}



function createPracticeTrials(practice_stimuli, gender_of_stimuli, experiment_masks_to_use) {
    let practice_trials;
    if (experiment == 1) {
        console.log('practice_stimuli:', practice_stimuli)
        practice_trials = [
            // Same Trials
                { // faces and bodies stay the same
                    stim1: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Congruent',
                    difficulty: 'Same',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Same',
                    corr_response: keyMapping.sameKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                },
                { // faces stay the same, bodies change
                    stim1: generatePracticeTrial(practice_stimuli[3], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[11], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Incongruent',
                    difficulty: 'Same',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[3], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[11], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[3], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[11], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[3], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[11], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Same',
                    corr_response: keyMapping.sameKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                },
             // Different Trials
                { // face and body change
                    stim1: generatePracticeTrial(practice_stimuli[6], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[12], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Congruent',
                    difficulty: 'Different',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[6], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[12], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[6], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[12], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[6], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[12], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Different',
                    corr_response: keyMapping.differentKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                },
                { // face changes body stays the same
                    stim1: generatePracticeTrial(practice_stimuli[5], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[1], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Incongruent',
                    difficulty: 'Different',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[5], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[1], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[5], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[1], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[5], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[1], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Different',
                    corr_response: keyMapping.differentKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                },
                { // face changes and body changes
                    stim1: generatePracticeTrial(practice_stimuli[14], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[2], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Congruent',
                    difficulty: 'Different',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[14], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[2], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[14], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[2], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[14], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[2], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Different',
                    corr_response: keyMapping.differentKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                }
            ]
    } else if (experiment == 2) {
        console.log('practice_stimuli:', practice_stimuli)

        practice_trials = [
            // Same Trials
                { // faces and bodies stay the same
                    stim1: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Congruent',
                    difficulty: 'Same',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[0], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Same',
                    corr_response: keyMapping.sameKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                },
                { // Incongruent Different - faces stay the same, bodies change
                    stim1: generatePracticeTrial(practice_stimuli[3], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[11], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Incongruent',
                    difficulty: 'Different',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[3], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[11], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[3], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[11], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[3], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[11], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Different',
                    corr_response: keyMapping.differentKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                },
             // Different Trials
                { // face and body change
                    stim1: generatePracticeTrial(practice_stimuli[6], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[12], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Congruent',
                    difficulty: 'Different',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[6], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[12], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[6], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[12], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[6], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[12], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Different',
                    corr_response: keyMapping.differentKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                },
                { // Incongruent Same - face changes body stays the same
                    stim1: generatePracticeTrial(practice_stimuli[5], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[1], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Incongruent',
                    difficulty: 'Same',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[5], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[1], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[5], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[1], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[5], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[1], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Same',
                    corr_response: keyMapping.sameKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                },
                { // face changes and body changes
                    stim1: generatePracticeTrial(practice_stimuli[14], gender_of_stimuli, experiment).stimuli,
                    stim2: generatePracticeTrial(practice_stimuli[2], gender_of_stimuli, experiment).stimuli,
                    congruent: 'Congruent',
                    difficulty: 'Different',
                    sameKey: keyMapping.sameKey,
                    differentKey: keyMapping.differentKey,
                    stim1_alignment: generatePracticeTrial(practice_stimuli[14], gender_of_stimuli, experiment).alignment,
                    stim2_alignment: generatePracticeTrial(practice_stimuli[2], gender_of_stimuli, experiment).alignment,
                    Face_1: generatePracticeTrial(practice_stimuli[14], gender_of_stimuli, experiment).face.slice(-1),
                    Face_2: generatePracticeTrial(practice_stimuli[2], gender_of_stimuli, experiment).face.slice(-1),
                    Body_1: generatePracticeTrial(practice_stimuli[14], gender_of_stimuli, experiment).body.slice(-1),
                    Body_2: generatePracticeTrial(practice_stimuli[2], gender_of_stimuli, experiment).body.slice(-1),
                    trialType: 'Different',
                    corr_response: keyMapping.differentKey,
                    gender: gender_of_stimuli,
                    mask: experiment_masks_to_use,
                }
            ]
    }
 
    // Shuffle trials
    practice_trials = shuffleArray(practice_trials);

    return practice_trials;
}

let practice_trials;

if (experiment == 1) {
    experiment_trials = createTrials_exp1(exp_stimuli, gender_to_present, experiment_masks_to_use);
    practice_trials = createPracticeTrials(practice_stimuli, gender_to_present, experiment_masks_to_use)
    console.log('practice_trials:', practice_trials)
} else if (experiment == 2) {
    experiment_trials = createTrials_exp2(exp_stimuli, gender_to_present, experiment_masks_to_use);
    practice_trials = createPracticeTrials(practice_stimuli, gender_to_present, experiment_masks_to_use)
    console.log('practice_trials:', practice_trials)
}


// produce random order of trials
let randomized_order_of_experiment_trials = _.shuffle(experiment_trials)

// Split up trials for first gender block
let experiment_trials_blocked = [
    randomized_order_of_experiment_trials.slice(0, 22),
    randomized_order_of_experiment_trials.slice(22, 44),
    randomized_order_of_experiment_trials.slice(44, 66),
    randomized_order_of_experiment_trials.slice(66, 88),
    randomized_order_of_experiment_trials.slice(88, 110),
    randomized_order_of_experiment_trials.slice(110, 132),
    randomized_order_of_experiment_trials.slice(132, 154),
    randomized_order_of_experiment_trials.slice(154, 176)
]
