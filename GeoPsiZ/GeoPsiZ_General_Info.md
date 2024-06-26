# Geo PsiZ - General Info

## What is Geo PsiZ

**When was it conducted?** 2023-24 School Year

**Where was it conducted?** University of Victoria

**If I have questions, who should I contact about this experiment?** Anna Lawrance (annalawrance@uvic.ca). Please make sure to carefully read through this documentation before contacting them.

**Who wrote the experimental scripts?** Anna Lawrance wrote the experimental scripts, building off a template of PsiZ-Collect that Amy vanWell created.

**Is there an OSF page associated with this experiment?** Yes. It can be accessed via this link: https://osf.io/sutn2/

**Brief synopsis of the experiment:**
Geo PsiZ was a psychovisual experiment that followed undergraduate students throughout a post-secondary level introductory geology course. Through the course, participants gained extensive conceptual knowledge and perceptual experience in rocks through both the lecture and lab components of the course. 

**Through this work, we addressed three key questions:** 
1) How do categories for rock knowledge form?
2) How do categories restructure following conceptual and perceptual training?
3) Is the trajectory of this category restructuring indicative of academic performance?

Shifts in category structure were assessed using PsiZ [https://psiz.readthedocs.io/en/latest/], a machine learning package that infers a multi-dimensional category representation (i.e., psychological embedding) based on participants judgments of image similarity. 

Category structure was inferred at two time points: at course outset and later, after participants engaged with relevant course content. 

Our analysis encompassed both visuoperceptual and semantic dimensions. Participants provided similarity judgments on images of rocks to assess visuoperceptual category structure, while judgments on rock type labels assessed semantic category structure.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

## Timeline of the experiment
Participants completed two data collection sessions that occurred ~2.5 months apart.

At each time point, they completed trials in the following order: welcome/instructions HTML screen, intro survey, image similarity ranking trials, survey questions on image trial strategies, label similarity ranking trials, survey questions on label trial strategies, general survey questions, debrief screen.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

### Similarity Ranking Trials

Participants completed 125 PsiZ similarity ranking trials, split into image and label trials. Of the 125 trials, 87 were image trials (3 of which were fixed trials). The remaining 38 trials were label trials (2 of which were fixed trials). Participants completed trials in blocks of 20 and were provided with a short break at the end of each block.

On each trial, participants were presented with an array of 9 images arranged in a grid. Participants were asked to select the two peripheral images that they considered to be the most similar to the center reference image highlighted in green. Participants indicated their selections in order of similarity (i.e., first most similar, followed by second most similar) through a mouse-click. Once two images were selected, participants submitted their response by pressing their spacebar. 

**Stimulus counts:**
- Images: 42 images in the rock image stimulus set.
- Labels: 16 labels, 14 of which were rock type labels.

We used conceptually informed **trial constraints** to 1) allow for more efficient data collection, 2) reduce the likelihood of "misinformation trials," and 3) assess category structure at three different levels of abstraction.

This study used 3 different trial constraints: between-category, within-category, and within-type. Each constraint was implemented to allow the observer to make similarity judgments at different levels of abstraction: category-, type-, and exemplar-level. 

Given that similarity ranking trials allowed participants to select and rank the two most similar images, we obtained information about a participant's rock category and type-level understanding of rocks through one trial constraint. Thus, the between-category and within-category trial types employed the same constraints on reference image selection. These constraints are detailed below.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

### Trial Constraints (see experiment.js for clear-cut explanations of constraints on reference selections)

**Category-Type Level:**

~80% of image trials utilized the category-type level constraint. Category-level similarity trials assessed one’s perception of rocks that belonged to different categories from the query image. These trials ensured that, if the conceptual knowledge was present in the observer, we would have sufficient trials for the model to differentiate between the two categories (i.e., igneous and sedimentary).
Two of the three fixed image trials used this constraint type.

One of the fixed label trials presented a category label as the query. The other fixed label trial presented a rock type label as the query with 8 rock type reference labels. Therefore, we had one fixed label trial per constraint type.

**Type Level**

Type-level similarity trials assessed one’s perception of rocks belonging to the same category as the query image. These trials ensured that, if the conceptual knowledge was present in the observer, we would have sufficient trials for the model to differentiate between different rock types (e.g., highlight that basalt and diorite are different rock types).

**Exemplar Level**

~20% of image trials utilized the exemplar-level constraint. Exemplar-level similarity trials assessed one’s perception of rocks that belong to the same rock type as the query image. These trials ensured that, if the conceptual knowledge was present in the observer, we would have sufficient trials for the model to cluster the exemplars of the same rock type with one another. That is, through these trials, we anticipated that the three exemplars of each rock type (e.g., basalt) would cluster with one another.

One of the three fixed image trials used this constraint type.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

### Survey questions
We surveyed participants 1) general interest in geology, 2) past experience in geology, 3) confidence in rock ID abilities, 4) demographics, 5) similarity judgment strategies, and more at both time points. All of the survey question code can be found in the survey.js script.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

### How To Install

1. Clone the submodule onto your computer.
2. If you don't already have Node.js on your computer, install it from: [Download link](https://nodejs.org/en/download/)
3. In terminal, navigate to the GeoPsiZ folder that you downloaded, and run the command:

```
npm install
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

### How To Run Experiments

Follow the next step to create a local HTTPS server. **You must complete installation to perform these steps.**

1. In terminal, navigate to the folder you have been coding in and run the following command:

```
npm run experiment
```

**The server you have opened will close if you exit the tab in which you ran the previous command. You will have to repeat step 1 each time you want to run the experiment.**

2. In the browser, navigate to this URL:
   [Localhost](http://localhost:8000/)
3. You may need to select the public folder from there. Once you've done that, you'll be at the index.html file and at the start of the program.
