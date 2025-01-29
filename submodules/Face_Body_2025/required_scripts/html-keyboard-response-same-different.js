// /**
//  * jspsych-html-keyboard-response-same-different
//  * Josh de Leeuw
//  *
//  * plugin for displaying a stimulus and getting a keyboard response
//  *
//  * documentation: docs.jspsych.org
//  *
//  **/


//  jsPsych.plugins["html-keyboard-response-same-different"] = (function() {

//     var plugin = {};
  
//     plugin.info = {
//       name: 'html-keyboard-response-same-different',
//       description: '',
//       parameters: {
//         stimulus: {
//           type: jsPsych.plugins.parameterType.HTML_STRING,
//           pretty_name: 'Stimulus',
//           default: undefined,
//           description: 'The HTML string to be displayed'
//         },
//         choices: {
//           type: jsPsych.plugins.parameterType.KEYCODE,
//           array: true,
//           pretty_name: 'Choices',
//           default: jsPsych.ALL_KEYS,
//           description: 'The keys the subject is allowed to press to respond to the stimulus.'
//         },
//         sameKey: {
//             type: jsPsych.plugins.parameterType.KEYCODE,
//             pretty_name: 'sameKey',
//             default: jsPsych.ALL_KEYS,
//             description: 'The keys the subject is allowed to press to respond to the stimulus.'
//           },
//           differentKey: {
//             type: jsPsych.plugins.parameterType.KEYCODE,
//             pretty_name: 'differentKey',
//             default: jsPsych.ALL_KEYS,
//             description: 'The keys the subject is allowed to press to respond to the stimulus.'
//           },
//         prompt: {
//           type: jsPsych.plugins.parameterType.STRING,
//           pretty_name: 'Prompt',
//           default: null,
//           description: 'Any content here will be displayed below the stimulus.'
//         },
//         stimulus_duration: {
//           type: jsPsych.plugins.parameterType.INT,
//           pretty_name: 'Stimulus duration',
//           default: null,
//           description: 'How long to hide the stimulus.'
//         },
//         trial_duration: {
//           type: jsPsych.plugins.parameterType.INT,
//           pretty_name: 'Trial duration',
//           default: null,
//           description: 'How long to show trial before it ends.'
//         },
//         response_ends_trial: {
//           type: jsPsych.plugins.parameterType.BOOL,
//           pretty_name: 'Response ends trial',
//           default: true,
//           description: 'If true, trial will end when subject makes a response.'
//         },
  
//       }
//     }
  
//     plugin.trial = function(display_element, trial) {
  
//     let sameKey = trial.sameKey
//     let differentKey = trial.differentKey

//       var new_html = '<div id="jspsych-html-keyboard-response-same-different-stimulus">'+trial.stimulus+'</div>';
  
//       // add prompt
//       if(trial.prompt !== null){
//         new_html += trial.prompt;
//       }
  
//       // draw
//       display_element.innerHTML = new_html;
  
//       // store response
//       var response = {
//         rt: null,
//         key: null
//       };
  
//       // function to end trial when it is time
//       var end_trial = function() {
  
//         // kill any remaining setTimeout handlers
//         jsPsych.pluginAPI.clearAllTimeouts();
  
//         // kill keyboard listeners
//         if (typeof keyboardListener !== 'undefined') {
//           jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
//         }
  
//         // gather the data to store for the trial
//         var trial_data = {
//           "rt": response.rt,
//           "stimulus": trial.stimulus,
//           "key_press": response.key,
//           "sameKey": trial.sameKey,
//           "differentKey": trial.differentKey
//         };
  
//         var html = `
//         <div style="text-align: center;">
//           <div style="margin-top: 100px;">
//             <span style="float: left; margin-left: 40px;">[${trial.sameKey}] = Same</span>
//             <span style="float: right; margin-right: 40px;">[${trial.differentKey}] = Different</span>
//           </div>
//         </div>
//       `;
//         if (trial.prompt !== null) {
//           html += trial.prompt;
//         }
  
//         display_element.innerHTML = html;

//         // clear the display
//         display_element.innerHTML = '';
  
//         // move on to the next trial
//         jsPsych.finishTrial(trial_data);
//       };
  
//       // function to handle responses by the subject
//       var after_response = function(info) {
  
//         // after a valid response, the stimulus will have the CSS class 'responded'
//         // which can be used to provide visual feedback that a response was recorded
//         display_element.querySelector('#jspsych-html-keyboard-response-same-different-stimulus').className += ' responded';
  
//         // only record the first response
//         if (response.key == null) {
//           response = info;
//         }
  
//         if (trial.response_ends_trial) {
//           end_trial();
//         }
//       };
  
//       // start the response listener
//       if (trial.choices != jsPsych.NO_KEYS) {
//         var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
//           callback_function: after_response,
//           valid_responses: trial.choices,
//           rt_method: 'performance',
//           persist: false,
//           allow_held_key: false
//         });
//       }
  
//       // hide stimulus if stimulus_duration is set
//       if (trial.stimulus_duration !== null) {
//         jsPsych.pluginAPI.setTimeout(function() {
//           display_element.querySelector('#jspsych-html-keyboard-response-same-different-stimulus').style.visibility = 'hidden';
//         }, trial.stimulus_duration);
//       }
  
//       // end trial if trial_duration is set
//       if (trial.trial_duration !== null) {
//         jsPsych.pluginAPI.setTimeout(function() {
//           end_trial();
//         }, trial.trial_duration);
//       }
  
//     };
  
//     return plugin;
//   })();
  
/**
 * jspsych-html-keyboard-response-same-different
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

 jsPsych.plugins["html-keyboard-response-same-different"] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: 'html-keyboard-response-same-different',
      description: '',
      parameters: {
        stimulus: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          pretty_name: 'Stimulus',
          default: undefined,
          description: 'The HTML string to be displayed'
        },
        choices: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          array: true,
          pretty_name: 'Choices',
          default: jsPsych.ALL_KEYS,
          description: 'The keys the subject is allowed to press to respond to the stimulus.'
        },
        sameKey: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'sameKey',
          default: 'f', // Default to 'f' if not set
          description: 'Key to indicate a "Same" response'
        },
        differentKey: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'differentKey',
          default: 'j', // Default to 'j' if not set
          description: 'Key to indicate a "Different" response'
        },
        prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Prompt',
          default: null,
          description: 'Any content here will be displayed below the stimulus.'
        },
        stimulus_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Stimulus duration',
          default: null,
          description: 'How long to show the stimulus.'
        },
        trial_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Trial duration',
          default: null,
          description: 'How long to show trial before it ends.'
        },
        response_ends_trial: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Response ends trial',
          default: true,
          description: 'If true, trial will end when subject makes a response.'
        },
      }
    }
  
    plugin.trial = function(display_element, trial) {

    // Create the HTML to display stimulus and key mappings
    var new_html = `
    <img class="jspsych-html-keyboard-response-same-different" src="${trial.stimulus}">
    <div style="margin-top: 100px;">
    `;

    // Check if 'F' is the same or different key, and position it on the left side
    if (trial.sameKey === 'F') {
    new_html += `
        <span style="float: left; margin-left: 40px;">[F] = Same</span>
        <span style="float: right; margin-right: 40px;">[J] = Different</span>
    `;
    } else {
    new_html += `
        <span style="float: left; margin-left: 40px;">[F] = Different</span>
        <span style="float: right; margin-right: 40px;">[J] = Same</span>
    `;
    }

    new_html += `</div>`;

  
      // Add prompt if it exists
      if (trial.prompt !== null) {
        new_html += `<div>${trial.prompt}</div>`;
      }
  
      // Draw the HTML
      display_element.innerHTML = new_html;
  
      // Store response
      var response = {
        rt: null,
        key: null
      };
  
      // Function to end trial
      var end_trial = function() {
  
        // Clear any setTimeout handlers
        jsPsych.pluginAPI.clearAllTimeouts();
  
        // Cancel keyboard listener if it exists
        if (typeof keyboardListener !== 'undefined') {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }
  
        // Gather trial data
        var trial_data = {
          "rt": response.rt,
          "stimulus": trial.stimulus,
          "key_press": response.key,
          "sameKey": trial.sameKey,
          "differentKey": trial.differentKey
        };
  
        // Clear display
        display_element.innerHTML = '';
  
        // End the trial
        jsPsych.finishTrial(trial_data);
      };
  
      // Function to handle responses
      var after_response = function(info) {
  
        // Add 'responded' CSS class for feedback
        display_element.querySelector('#jspsych-html-keyboard-response-same-different-stimulus').className += ' responded';
  
        // Record the first response only
        if (response.key === null) {
          response = info;
        }
  
        if (trial.response_ends_trial) {
          end_trial();
        }
      };
  
      // Start the keyboard response listener
      if (trial.choices != jsPsych.NO_KEYS) {
        var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: trial.choices,
          rt_method: 'performance',
          persist: false,
          allow_held_key: false
        });
      }
  
      // Hide stimulus if stimulus_duration is set
      if (trial.stimulus_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          display_element.querySelector('#jspsych-html-keyboard-response-same-different-stimulus').style.visibility = 'hidden';
        }, trial.stimulus_duration);
      }
  
      // End trial if trial_duration is set
      if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          end_trial();
        }, trial.trial_duration);
      }
    };
  
    return plugin;
  })();
  