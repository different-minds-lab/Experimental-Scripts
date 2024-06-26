# Different Minds Lab: Experimental Scripts Repository

This repository acts as a database / archive of all previously run experiments in the Different Minds Lab [https://onlineacademiccommunity.uvic.ca/differentmindslab/].

## Why does this repository exist?
1. **Resource:** All of these experimental materials act as an excellent resource for current and future lab members.
2. **Accountability:** When sharing code with collaborators, there is an expectation that code will be documented to a reasonable extent (e.g., comments included throughout scripts). This same expectation applies to adding code to this repository!
   - **Some added benefits of this accountability measure include:**
      1. If you end up returning to a project at a later date, you will be able to recall the experimental protocol you implemented.
      2. To meet this accountability criteria, you may end up being more strategic and clear in how you go about writing code, which may actually save you time! :)
3. **Helpful documentation when writing a manuscript:** Sometimes, the timeline from coding up an experiment, to collecting data, to analysing data, to finally writing up a manuscript can be quite lengthy! Considering this, having clear and concise documentation detailing how you went about things will be helpful to you and other members involved in the research.

## What is NOT included in this repository?
- Participant data (participant data is not to be stored on GitHub)
- Analysis scripts
- Results

## What IS included in this repository?
- **Arguably most importantly:** A ReadMe file to orient lab members to the experiment's submodule. This ReadMe file should detail the general procedures of the experiment: stages of the experiment, tasks completed by participants, and general trial constraints used.
- All content needed to run the experiment that was conducted in the lab.
- Examples of content that meet these criteria are included below for reference:
   - Stimuli
   - jsPsych plugins called throughout the experiment
   - JavaScript files used to run the experiment
   - Supporting HTML and CSS scripts

## When should I add my experiment's materials to this repository?
- After data collection is complete and the majority of your analyses have been run.
   - If you pre-registered your study on OSF, that would also be a good time to add your code to this repository.

## How can I add my code to this repository?
- Each experiment will have its own _submodule_ in this repository. If you are not familiar with submodules, please review these two websites:
   - https://gist.github.com/gitaarik/8735255
   - https://www.atlassian.com/git/tutorials/git-submodule

- Please read the instructions provided below ***very*** carefully.
  
**Step 1)**
  Open your computer's command line or terminal and navigate to an easily accessible folder (e.g., Desktop or Downloads)
  ```
  cd Desktop
  ```
**Step 2)**
  Clone the repository if you have not already done so. Use the command below to do so.
  ```
  git clone https://github.com/different-minds-lab/Experimental-Scripts
  ```

**Step 3)**
   Navigate into the folder that you just cloned.
   ```
   cd Experimental-Scripts
   ```
**Step 4)**
   Add your new submodule. Please use your experiment's name when adding your submodule. An example of how to add your submodule is provided below. NOTE! Replace "name_of_experiment" (listed as the last section of the command) with the name of your experiment.
   ```
   git submodule add https://github.com/different-minds-lab/Experimental-Scripts name_of_experiment
   ```
**Step 5)**
   Open up the "Experimental-Scripts" folder that you cloned using your preferred IDE (e.g., Visual Studio code). Copy and paste all of your experiment's materials to your newly generated subcomponent. This subcomponent should appear as a folder that is nested within the "Experimental-Scripts" folder.

   
**Step 6)**
   Double-check to ensure all of your documentation and scripts are present. 

   
**Step 7)**
   Return to your terminal and navigate into the "Experimental-Scripts" folder if you are not already seated within it. Then, run the following commands. Replace "insert push message here" with "update name_of_experiment submodule".
   ```
   git add .
   git commit -m "insert push message here"
   git push
   ```
**Step 8)**
Upon confirming that your experiment's materials were successfully added to the submodule, you may delete the entire "Experimental-Scripts" folder from your computer. This way, you will free up space on your computer.
