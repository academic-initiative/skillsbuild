![Predict the Outcome of a Football Match with IBM Bob](images/predict-football-title.png)

> **From "I don't code" to "I built an AI app!" - Bob makes it happen**

## About IBM Bob - Your AI coding partner

IBM Bob lets you:

- **Write code for you** - Just describe what you need, Bob writes it.
- **Understand your project** - Bob reads and comprehends your entire codebase.
- **Debug errors** - Paste an error message, Bob fixes it.
- **Explain concepts** - Ask Bob to explain any code or concept.
- **Work in any language** - Write in Python, JavaScript, Java, and more.
- **Set up environments** - Bob handles installations and configurations.

## Learning objectives

After completing this lab, you should be able to:
- Prompt IBM Bob to generate Python code for data science workflows.
- Build and evaluate a machine learning model for sports prediction.
- Apply feature engineering techniques to historical sports data.
- Train and evaluate the machine learning model.

**You don't need to be a coding expert** - Bob handles the technical details while you focus on learning and building!

## About this lab

In this lab, you'll build a **complete machine learning application** that predicts football match winners using data analysis and machine learning in Jupyter notebooks.

Bob writes all the code for you! You will:
- Read what each step does.
- Copy the prompt to Bob.
- Paste Bob's code and run it to analyze the data and build a machine learning model.
- Review the results.

No deep Python, machine learning, or data science knowledge needed - Leave that to Bob!

## About the dataset

This lab uses the datasets from [Kaggle dataset: International football results from 1872 to 2026](https://www.kaggle.com/datasets/martj42/international-football-results-from-1872-to-2017).

This dataset includes 49,016 results of international football matches starting from the very first official match in 1872 up to 2026. The matches range from World Cup to Wild Cup to regular friendly matches. The matches are strictly men's full internationals and the data does not include Olympic Games or matches where at least one of the teams was the nation's B-team, U-23 or a league select team.

The results.csv dataset includes the following columns:

- date - date of the match
- home_team - the name of the home team
- away_team - the name of the away team
- home_score - full-time home team score including extra time, not including penalty-shootouts
- away_score - full-time away team score including extra time, not including penalty-shootouts
- tournament - the name of the tournament
- city - the name of the city/town/administrative unit where the match was played
- country - the name of the country where the match was played
- neutral - TRUE/FALSE column indicating whether the match was played at a neutral venue

## Estimated time

**60-90 minutes**

## Prerequisites

**Tip:** Right-click the following link, and open the page in a new tab.

Complete the prerequisite tasks of [Get started with IBM Bob](../get-started-with-ibm-bob.md)

<a name="top"></a>

## Contents

- [Task 1: Open Bob in your working directory](#task01)
- [Task 2: Set up your environment](#task02)
- [Task 3: Start Jupyter Lab to run the notebook](#task03)
- [Task 4: Clean up when you're done](#task04)

<a name="task01"></a>

## Task 1: Open Bob in your working directory

**Note:** This is a manual step, Bob can't do it for security reasons.

Follow these steps to create a directory and open that directory in Bob:

1. Choose a folder location for the lab work.
1. Download the [ai-in-sports-football-predictor.zip](https://github.com/academic-initiative/skillsbuild/blob/main/ai-in-sports/data/ai-in-sports-football-predictor.zip) from the IBM SkillsBuild GitHub repository to the folder you chose in step 1.
1. In IBM Bob, verify whether the terminal panel is visible. If you don't see a terminal panel, click **Terminal > New Terminal**.
1. Use the `cd` command in the terminal panel to move into that folder.
1. Execute the following commands to create the directory and unzip the repository.

   ```
   mkdir football-predictor
   cd football-predictor
   unzip ../ai-in-sports-football-predictor.zip
   ```
1. Open the `football-predictor` folder:
   1. Click **File > Open Folder**.
   1. Navigate to the `football-predictor` folder.
   1. Click **Open**.

1. Verify that you are in *Ask* mode.

   <img src="images/bob-panel.png" alt="Modes panel" width="35%">

1. Copy and paste the following prompt to Bob and review the response:
    ```
    Hey Bob, What's my current working directory?
    ```
1. Verify that the working folder is correct.

[Back to the top](#top)

<a name="task02"></a>

## Task 2: Set up your environment

Follow these steps to set up your environment to complete this lab:

1. In Bob's chat panel, copy and paste the following prompt:

   ```
   Great! Now please setup the necessary environment for this lab, 
   but don't install the packages that go inside Jupyter Lab.
   I'll do that part while following the lab.
   ```

1. Click **Approve once** to switch to *Agent* mode.

1. Click **Approve once** repeatedly when prompted to run the commands to set up the environment.

**What Bob will do:**
- Install Jupyter Lab itself (the application).
- Set up the basic environment.
- Prepare everything needed to run the lab.

**Note:** Bob will NOT install the lab-specific packages (like pandas, scikit-learn, etc.) - you'll install those yourself by following the instructions in the Jupyter notebook.

[Back to the top](#top)

<a name="task03"></a>

## Task 3: Start Jupyter Lab to run the notebook

1. In Bob's chat panel, copy and paste the following prompt:

   ```
   Please run Jupyter Lab for me so that I can start working on the lab.
   Once ready, give me the URL that I should open in a browser.
   ```
1. If prompted, confirm that you want to start Jupyter Lab.

1. Click **Approve once** to run the command to start Jupyter Lab.

   **Note:** You may need to click **Proced while running** to get the clean URL info.

1. Click the link that Bob provides (or copy-paste it into your browser). Your browser will open Jupyter Lab.
1. If the `corelab.ipynb` notebook does not open, find and open the lab notebook.
1. Follow the instructions in the notebook. Work through each cell, asking Bob for help when needed.

**Tip:** Keep Bob's chat open while you work through the lab. You can ask Bob questions, request code for specific cells, or get help with errors!

[Back to the top](#top)

<a name="task04"></a>

## Task 4: Clean up when you're done

When you've finished the lab, copy and paste the following prompt into Bob's chat panel:

```
I'm all done with the lab! Please stop Jupyter Lab and clean up for me.
```

**What Bob will do:**
- Stop the Jupyter Lab server.
- Clean up any running processes.
- Keep your saved work.

[Back to the top](#top)

<a name="summary"></a>

## Summary

In this lab, you used IBM Bob to build a **complete machine learning application** that predicts football match winners using data analysis and machine learning in Jupyter notebooks.

### What you learned

Now that you have completed this lab, you should be able to:

- Prompt Bob to help you write machine learning code.
- Debug any issues you encounter.
- Run the code generated by Bob in Jupyter Lab.

[Back to the top](#top)

<a name="additional-resources"></a>

## Additional resources

- [IBM Bob documentation](https://bob.ibm.com/docs)
