/**
 * jspsych-html-mouse-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

let embeddingStartTime = 0;
let selectedItems = [];
let RT_1 = 0;
let RT_2 = 0;
let RT_submit = 0;
let catchIndex = 0;
var deselectedCount = 0;
let selectedPosition = null;

jsPsych.plugins["8c2-embedding-module"] = function () {

    var plugin = {};

    plugin.info = {
        name: '8c2-embedding-module',
        description: '',
        parameters: {
            practice: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'trial type, true -> is a practice trial',
                default: false
            },
            reference: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'query path'
            },

            options: {
                type: jsPsych.plugins.parameterType.ARR,
                pretty_name: 'array of options',
                default: false
            },
            catchTrial: {
                type: jsPsych.plugins.parameterType.BOOL,
                default: false
            },
            test: {
                type: jsPsych.plugins.parameterType.BOOL,
                default: false
            }
        }
    };

    plugin.trial = function (display_element, trial) {

        let new_html = "";
        embeddingStartTime = 0;
        selectedItems = [];
        catchIndex = 0;
        RT_1 = 0;
        RT_2 = 0;
        var deselectedCount = 0;
        let windowY = window.innerHeight;
        let windowX = window.innerWidth;

        // Rename trial vars for easier reference
        let reference = trial.reference;
        let options = trial.options;
        let catchTrial = trial.catchTrial;
        // console.log(catchTrial);

        //console.log(reference, trial.options)

        // image dictionaries for paddings
        let imageLocations = { "query": { "left": 0, "top": 0 }, "option1": { "left": 0, "top": 0 }, "option2": { "left": 0, "top": 0 }, "option3": { "left": 0, "top": 0 },
            "option4": { "left": 0, "top": 0 }, "option5": { "left": 0, "top": 0 }, "option6": { "left": 0, "top": 0 }, "option7": { "left": 0, "top": 0 },
            "option8": { "left": 0, "top": 0 }

            // Calculate the image locations based on the screen dimensions and the assigned position (trial parameters targetLocation and eyeLocation)
        };let imgKeys = ["query", "option1", "option2", "option3", "option4", "option5", "option6", "option7", "option8"];
        let allLocations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        imgKeys.forEach(item => {
            let location = 0;

            // assign location based on current type
            // remove any assigned locations so that distractors can be picked from remaining options

            if (item == "query") {
                location = 9;
                _.remove(allLocations, e => {
                    return e === location;
                });
            } else {
                location = allLocations[0];
                //location = allLocations[Math.floor(Math.random()*allLocations.length)];
                _.remove(allLocations, e => {
                    return e === location;
                });
            }

            if (location == 1 || location == 7 || location == 8) {
                // Leftmost x
                imageLocations[item]["left"] = -1 * (windowX * 0.3);
            } else if (location == 2 || location == 6 || location == 9) {
                // Middle column x
                imageLocations[item]["left"] = 0;
            } else {
                // Rightmost x
                imageLocations[item]["left"] = windowX * 0.3;
            }

            // Calculate the y-axis value (vertical location)
            if (location == 1 || location == 2 || location == 3) {
                // Topmost y
                imageLocations[item]["top"] = -1 * (windowY * 0.3);
            } else if (location == 8 || location == 4 || location == 9) {
                // Middle row y
                imageLocations[item]["top"] = 0;
            } else {
                // Bottom row y
                imageLocations[item]["top"] = windowY * 0.3;
            }

            // move over the images half of their size
            imageLocations[item]["top"] = imageLocations[item]["top"] - 75;
            imageLocations[item]["left"] = imageLocations[item]["left"] - 150;
        });

        // Add the images to the html string to be displayed with their calculated locations
        new_html = "<div class='main' id='jspsych-html-mouse-response-stimulus'>";

        // replace a random reference with catch image if we are in a catch trial
        if (catchTrial == true) {
            // select index to replace with catch image, references have indices < 8 AND > 1
            while (catchIndex < 1) catchIndex = Math.floor(Math.random() * 8);

            console.log("CATCH TRIAL");
            console.log(`${catchIndex} catch index`);

            // replace the imgpath in the reference list to be the reference
            options[catchIndex - 1] = reference;
        }
        imgKeys.map((imgID, index) => {
            let imgPath = imgID == "query" || index == catchIndex ? reference : options[index - 1];
            let imgStyle = index != catchIndex ? "' style='max-height:200px; position:absolute; margin-top:" : "' style='max-height:200px; position:absolute; margin-top:";

            // append each image to the screen
            new_html = new_html + "<img id='" + imgID + imgStyle + imageLocations[imgID]["top"] + "px; margin-left:" + imageLocations[imgID]["left"] + "px;' ' src='" + imgPath + "'/>" + "<div id='" + (imgID + "-display-num") + "' style='max-height:200px; position:absolute; margin-top:" + imageLocations[imgID]["top"] + "px; margin-left:" + (imageLocations[imgID]["left"] + 50) + "px;'></div>";
        });

        // calculate the location for the submit button
        // let button_top = 0;
        // let button_left = windowX * .3 + 150;

        // add the submit button html and the final div tag close
        // new_html = new_html + "<button id='submit-btn' style='position:absolute; margin-top:" + button_top + "px; margin-left:" + button_left + "px; border: 5px solid black;'>Submit</button></div>";

        // draw
        display_element.innerHTML = new_html;

        // function to end trial when it is time
        var end_trial = function () {
            RT_submit = Date.now() - embeddingStartTime;

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // Remove click handler
            document.getElementById("jspsych-html-mouse-response-stimulus").removeEventListener('click', after_response);
            document.removeEventListener('keydown', spacebar_listener);

            // convert the selected items from their html id's to the img filename from the original options array
            for (let i = 0; i < selectedItems.length; i++) {
                let item = selectedItems[i];
                let array_location = _.toInteger(item.replace("option", "")) - 1;
                selectedItems[i] = options[array_location];
            }
            let embeddingOutput = []
            if (selectedItems.length > 0) {
                // start embedding output with the reference item and selected items
                embeddingOutput = [reference, selectedItems[0], selectedItems[1]];

                // remove selected items from the option array to determine the unselected items
                let options_copy = _.cloneDeep(options);
                selectedItems.forEach(selected => {
                    _.remove(options_copy, e => {
                        return e === selected;
                    });
                });

                // add unselected items to the embedding array
                options_copy.forEach(not_selected => {
                    embeddingOutput.push(not_selected);
                });
            } else {
                embeddingOutput = [reference].concat(options)
            }

            // record correct/incorrect responses for catch trials
            let catchResponse = "NA";
            if (catchIndex != 0) catchResponse = selectedItems.includes(reference) ? 1 : 0;

            // gather the data to store for the trial
            var trial_data = {
                "rt": Date.now() - embeddingStartTime,
                "selected": selectedItems,
                "query": reference,
                "references": options,
                "embedding_output": embeddingOutput,
                "RT_1": RT_1,
                "RT_2": RT_2,
                "RT_submit": RT_submit,
                "deselectedCont": deselectedCount,
                "selectedPosition": selectedPosition,
                "catchResponse": catchResponse
            };

            console.log(trial_data);

            // clear the display
            display_element.innerHTML = '';

            // move on to the next trial
            jsPsych.finishTrial(trial_data);
        };
        // Function to handle spacebar presses
        var spacebar_listener = function (e) {
            if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault(); // Prevent the spacebar from scrolling the page

                // Check if an option has been selected
                if (selectedItems.length == 2) {
                    end_trial(); // End the trial if an option is selected and space is pressed
                }
            }
        };
        // function to handle responses by the subject
        var after_response = function (e) {

            // only record the first response
            let cursorX = e.pageX;
            let cursorY = e.pageY;

            // re calculate the screen dimensions, a 3x3 grid to use to classify mouse clicks
            let screenX = window.innerWidth - 100;
            let screenX30 = screenX * .3;
            let screenY = window.innerHeight;
            let screenY30 = screenY * .3;

            let col = 0;
            let row = 0;
            let position = 0;

            if (cursorX < screenX30) {
                // leftmost column
                col = 1;
            } else if (cursorX > screenX * .7) {
                // rightmost column
                col = 3;
            } else {
                // middle column
                col = 2;
            }

            if (cursorY < screenY30) {
                // topmost row
                row = 1;
            } else if (cursorY > screenY * .7) {
                // bottommost column 
                row = 3;
            } else {
                // middle row
                row = 2;
            }

            // use the row and column selection to classify the click by stimulus position
            if (row == 1) {
                if (col == 1) {
                    position = 1;
                } else if (col == 2) {
                    position = 2;
                } else {
                    position = 3;
                }
            } else if (row == 2) {
                if (col == 1) {
                    position = 8;
                } else if (col == 3) {
                    position = 4;
                } else {
                    position = 9;
                }
            } else {
                if (col == 1) {
                    position = 7;
                } else if (col == 2) {
                    position = 6;
                } else {
                    position = 5;
                }
            }

            //console.log(position)
            //console.log(`ROW: ${row}`)
            //console.log(`COL: ${col}`)

            let itemId = position == 9 ? "query" : "option" + String(position);
            let displayStringId = itemId + "-display-num";
            //console.log(itemId)

            // check if the item is being unselected
            if (selectedItems.includes(itemId)) {
                deselectedCount++
                // if 2 items had been selected, remove access to submit button
                // if (selectedItems.length == 2) {
                //     document.getElementById("submit-btn").removeEventListener('click', end_trial);
                //     document.getElementById("submit-btn").style.border = "5px solid black";
                // }

                // remove border from item and remove from selected list
                document.getElementById(itemId).style.border = "none";
                _.remove(selectedItems, e => {
                    return e === itemId;
                });
                changeElementByID(displayStringId, "");

                if (selectedItems.length == 1) {
                    let firstItemId = selectedItems[0] + "-display-num";
                    changeElementByID(firstItemId, "1");
                    RT_1 = RT_2;
                }

                //console.log(selectedItems)

            } else {
                // if item is not yet selected

                // add the item if not at max length of selected items
                if (selectedItems.length < 2 && position != 9) {
                    selectedPosition = position;
                    // display a 1 or 2 based on the item's order in selectedItems
                    if (selectedItems.length == 0) {
                        changeElementByID(displayStringId, "1");
                        RT_1 = Date.now() - embeddingStartTime;
                    } else if (selectedItems.length == 1) {
                        changeElementByID(displayStringId, "2");
                        RT_2 = Date.now() - embeddingStartTime;
                    }

                    document.getElementById(itemId).style.border = "5px dotted black";
                    selectedItems.push(itemId);
                }
            }
        };

        // highlight the reference image
        document.getElementById("query").style.border = "3px solid green";

        // start the response listener for the mouse clicks to select stimuli
        document.getElementById("jspsych-html-mouse-response-stimulus").addEventListener('click', after_response);
        embeddingStartTime = Date.now();
        document.addEventListener('keydown', spacebar_listener);
    };

    return plugin;
}();