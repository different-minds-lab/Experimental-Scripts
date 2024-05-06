# What is included in the Geo PsiZ Submodule?

## Folders

#### img

Includes the stimuli used in this study. The rock images were sourced from Nosofsky and colleages 2018. These images were vetted by a geologist to ensure sufficient identifying features were present. We took a subset of the stimulus set and ensured that the images used were similar to the samples students came across in the lab.

**rock_pics** includes the image trial stimuli.

**rock_name_stims** includes the label trial stimuli. These label stimuli were generated in Python using the Pillow package. The script used to generate these stimuli is titled "makeRockPics.py" and can be found within the **img** folder.

**General file naming:** The prefix of the file name denotes the stimulus' category membership (i.e., i = igneous and s = sedimentary). The letter that follows the underscore denotes the rock type. This general protocol is used for both the rock image and rock label stimuli.


#### node_modules

This folder is critical if you are wanting to pilot the experiment locally by hosting a local server. When you run "npm install" after downloading this submodule onto your local device, all of those submodules are essentially activated.

#### required_scripts

**jspsych-6.1.0**
Folder containing all the jsPsych plugins used throughout this experiment (among others). You can determine which ones were actually used by referencing the "experiment.html" script.

**S1**
This folder contains the experimental scripts that were used in the first round of data collection (i.e., session 1 = S1). The two scripts that were adjusted across sessions were the experiment.js script and survey.js script. Why? We had some survey questions that were not relevant prior before students had been exposed to course content.

**8c2-embedding-module.js**
This experiment used the 8-choose-2 trial configuration for PsiZ collect trials. Meaning, on each trial 8 reference images were presented on screen and participants were asked to select, in order of similarity, the two most similar options to the central one. This JavaScript script is loaded within the experiment.html script. We call on this script in the experiment.js file as it is used to define the overall functionality and appearance and functionality of our PsiZ similarity ranking trials.

**experiment.js**
This script initiates Pavlovia (where we hosted our online experiment) and runs the overall experiment. It also calls on variables and functions defined in supporting scripts (e.g., survey.js and 8c2-embedding-module.js).

**fun_n_vars.js**
This script hosts the majority of functions and variables that are called upon in the experiment.js script.

**styles.css**
Specifies DML specific, css preferences for overall visual appearance of our experiment.

**survey.js**
Defines all the survey questions used throughout the experiment. Variables are then called upon in the experiment.js script.

### html scripts

#### index.html
Defines the welcome screen that participants are presented with. The informed consent form was made available via the course website, so it is not repeated in the index.html file. When participants click the "Get Started" button at the end of this page, the experiment.html script is loaded and they are welcomed into the experiment.

#### experiment.html
This script loads all of the supporting scripts and runs them. After completing all the content defined in the experiment.js script, participants are redirected to the debrief.html screen.

#### debrief.html
This screen provides debrief information to participants.

### img_list.js
An extra supporting JavaScript file that outputs a text file with the img paths.

### .json files
Used to load the npm content on the npm install command

