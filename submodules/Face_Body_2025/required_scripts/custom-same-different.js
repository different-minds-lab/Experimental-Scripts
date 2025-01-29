/**
 * jspsych-same-different
 * Josh de Leeuw
 *
 * plugin for showing two stimuli sequentially and getting a same / different judgment
 *
 * documentation: docs.jspsych.org
 *
 */

 jsPsych.plugins['custom-same-different'] = (function() {

    var plugin = {};
    
    plugin.info = {
      name: 'custom-same-different',
      description: '',
      parameters: {
        stim1: {
          type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'First Image',
          default: undefined,
          description: 'The images to be displayed.'
        },
        stim2: {
          type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'Second Image',
          default: undefined,
          description: 'The images to be displayed.'
        },
        mask: {
          type: jsPsych.plugins.parameterType.IMAGE,
          pretty_name: 'Mask',
          default: undefined,
          description: 'The images to be displayed.'
        },
        Face_1: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Face 1',
          default: 'Face_1',
          description: 'The face to be displayed.'
        },
        Face_2: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Face 2',
          default: 'Face_2',
          description: 'The face to be displayed.'
        },
        Body_1: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Body 1',
          default: 'Body_1',
          description: 'The body to be displayed.'
        },
        Body_2: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Body 2',
          default: 'Body_2',
          description: 'The face to be displayed.'
        },
        sameKey: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Same key',
          default: 'F',
          description: ''
        },
        differentKey: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Different key',
          default: 'J',
          description: 'The key that subjects should press to indicate that the two stimuli are the same.'
        },
        first_stim_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'First stimulus duration',
          default: null,
          description: 'How long to show the first stimulus for in milliseconds.'
        },
        mask_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Mask duration',
          default: 500,
          description: 'How long to show a blank screen in between the two stimuli.'
        },
        second_stim_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Second stimulus duration',
          default: null,
          description: 'How long to show the second stimulus for in milliseconds.'
        },
        prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Prompt',
          default: null,
          description: 'Any content here will be displayed below the stimulus.'
        },
        corr_response: {
          type: jsPsych.plugins.parameterType.STRING,
        },
        trialType: {
          type: jsPsych.plugins.parameterType.STRING,
        }
      }
    }
  
    plugin.trial = function(display_element, trial) {
      let debugging = false
      if (debugging) {
        console.log("////")
        console.log(trial.stim1)
        console.log(trial.stim2)
        console.log(trial.mask)
        console.log("////")
        console.log(trial.corr_response)
      }
      
    let correct_response_key = trial.corr_response

    // Create the HTML to display stimulus and key mappings
    var new_html = `
    <div style="text-align: center;">
      <img class="jspsych-same-different-stimulus" src="${trial.stim1}">
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

      var first_stim_info;

      jsPsych.pluginAPI.setTimeout(function() {
        showMask();
      }, trial.first_stim_duration);
  
// Show Mask
function showMask() {
  display_element.innerHTML = `
    <div style="text-align: center;">
      <img class="jspsych-same-different-stimulus" src="${trial.mask}">
      <div style="margin-top: 100px;">
        <span style="float: left; margin-left: 40px;">[F] = ${trial.sameKey === 'F' ? 'Same' : 'Different'}</span>
        <span style="float: right; margin-right: 40px;">[J] = ${trial.sameKey === 'J' ? 'Same' : 'Different'}</span>
      </div>
    </div>
  `;
  jsPsych.pluginAPI.setTimeout(showSecondStim, trial.mask_duration);
}

// Show Second Stimulus
function showSecondStim() {
  var second_stim_html = `
    <div style="text-align: center;">
      <img class="jspsych-same-different-stimulus" src="${trial.stim2}">
      <div style="margin-top: 100px;">
        <span style="float: left; margin-left: 40px;">[F] = ${trial.sameKey === 'F' ? 'Same' : 'Different'}</span>
        <span style="float: right; margin-right: 40px;">[J] = ${trial.sameKey === 'J' ? 'Same' : 'Different'}</span>
      </div>
    </div>
  `;

  if (trial.prompt !== null) {
    second_stim_html += `<div>${trial.prompt}</div>`;
  }

  display_element.innerHTML = second_stim_html;
  
  var after_response = function(info) {

    // Kill any remaining setTimeout handlers
    jsPsych.pluginAPI.clearAllTimeouts();
  
    var correct = false;
  
    // Check if the pressed key matches the correct response key
    var pressed_key = info.key === 74 ? 'J' : info.key === 70 ? 'F' : null;
    
    if (pressed_key === correct_response_key) {
      correct = true;
    }
  
    var trial_data = {
      "rt": info.rt,
      "correct": correct,
      "stim1": trial.stim1,
      "stim2": trial.stim2,
      "mask": trial.mask,
      "Face_1": trial.Face_1,
      "Face_2": trial.Face_2,
      'gender': trial.gender,
      "Body_1": trial.Body_1,
      "Body_2": trial.Body_2,
      "stim1_alignment": trial.stim1_alignment,
      "stim2_alignment": trial.stim2_alignment,
      "key_press": pressed_key,
      'sameKey': trial.sameKey,
      'differentKey': trial.differentKey,
      'correct_response_key': correct_response_key,
    };
  
    if (first_stim_info) {
      trial_data["rt_stim1"] = first_stim_info.rt;
      trial_data["key_press_stim1"] = first_stim_info.key;
    }
  
    display_element.innerHTML = '';
  
    if (debugging) {console.log("Trial output:", trial_data);}
    jsPsych.finishTrial(trial_data);
  }
  

        if (_.isNull(trial.second_stim_duration) == false) {
          // CODE RUNS IF WE SPECIFY A TIMEOUT FOR SECOND STIM
          jsPsych.pluginAPI.setTimeout(function() {
            display_element.querySelector('.jspsych-same-different-stimulus').style.visibility = 'hidden';
            let info = {"key": 0}
            after_response(info);
          }, trial.second_stim_duration);
        }
  
        jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: [trial.sameKey, trial.differentKey],
          rt_method: 'performance',
          persist: false,
          allow_held_key: false
        });
  
      }
  
    };
  
    return plugin;
  })();