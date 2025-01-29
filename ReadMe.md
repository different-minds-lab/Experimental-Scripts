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
**Step 2a)**
  Clone the repository if you have not already done so. Use the command below to do so. You will now have a folder called "Experimental-Scripts" on your Desktop. 
  ```
  git clone https://github.com/different-minds-lab/Experimental-Scripts
  ```
**Step 2b)**
Open the folder "Experimental-Scripts" (now located on your Desktop) through your computer's GUI, then move your experiment's folder into the "submodules" folder (nested within the "Experimental-Scripts" folder) that you cloned (make sure that the name of your experiment folder matches the name of the submodule you plan to create). For example, the name of the GeoPsiZ folder would be "GeoPsiZ" given that the name of the submodule will also be "GeoPsiZ".

**Step 3)**
   Now, once all file contents are transferred into the Experimental-Scripts/submodules folder, return to your terminal/command line. Navigate into the folder that you just cloned using the command provided below (note, before running the Step 4 command, make sure you're just in "Experimental-Scripts" in your terminal and not the "submodules" folder).
   ```
   cd Experimental-Scripts
   ```
**Step 4)**
   Now it is time to add your submodule contents to the git repository. Please use your experiment's name in the below command when adding your submodule. The command to add your submodule is provided below. NOTE! Replace "name_of_experiment" (listed as the last section of the command) with the name of your experiment (e.g., "GeoPsiZ").
   ```
   git submodule add https://github.com/different-minds-lab/Experimental-Scripts/submodules name_of_experiment
   ```

**Step 5)**
   In your terminal/command line, run the following commands (make sure you are in "Experimental-Scripts"! Replace "insert push message here" with "update name_of_experiment submodule". For example "update GeoPsiZ submodule".
   ```
   git add .
   git commit -m "insert push message here"
   git push
   ```
**Step 8)**
Upon confirming that your experiment's materials were successfully added to the submodule (i.e., by refreshing the Git Hub page online and seeing your git message in the commit history), you may delete the entire "Experimental-Scripts" folder from your computer. This way, you will free up space on your computer.
