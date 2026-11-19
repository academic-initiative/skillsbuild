# Video transcript for *Lab: AI in Sports - Build a Tennis Match Predictor with IBM Bob*

This videos shows you how to design, build, and deploy an end-to-end machine learning solution using real ATP tennis data and IBM Bob, your AI development partner.

This lab uses the ATP Tennis 2000 - 2026 Daily update dataset. The dataset is structured as a match-level dataset, where each row represents a single tennis match.

To complete this lab, you need to sign up for an IBM Bob trial account. If you don’t have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

To get started, open a terminal window in Bob, and create a folder for your project, and then download the dataset from the Kaggle site into the new folder. Then open that folder.

In Agent mode, prompt Bob to confirm that you have Python installed. For all of the prompts in this lab, Bob will prompt you to approve, as necessary.

Switch to plan mode to plan the implementation. Prompt Bob with the specifics of the plan. 

When Bob is finished, review the proposed implementation plan. You’re not quite ready to start implementation at this point. Prompt Bob to create a plan document with the details of each of the phases of the implementation. Review the document, and tell Bob to save the markdown file. 

With the plan in place, switch to Agent mode to tell Bob to implement the plan. Include any instructions for how you want Bob to progress through the implementation.

When Bob shows you all of the phases, approve the ToDo list, and prompt Bob to begin implementing phase 1, project setup. Bob will provide. summary at the end of the phase, and show you an updated ToDo list for your review. Note the project setup files created during this phase.

Now tell Bob to start implementing phase 2, data preparation. In this phase, Bob creates the training, testing, and holdout data from the ATP tennis dataset.

Next tell Bob to start phase 3, feature engineering. In this phase, Bob transforms the raw data into features that help a machine learning model learn patterns and make more accurate predictions.

Now you are ready to tell Bob to implement phase 4, model building or training. In this phase, Bob trains a Random Forest classifier machine learning model on the training dataset, evaluates it on the test dataset, and serialises it.

Now start phase 5, model interpretation. In this phase, Bob examines why the predictive model makes its predictions and which features have the greatest influence on those predictions.

Begin phase 6, model predictions. In this phase, Bob runs the trained model on the holdout dataset and produces a results table comparing predictions to actuals.

Start phase 7, Streamlit web UI. In this phase, Bob delivers a runnable interactive web UI for two-player match prediction.

Next start phase 8, testing. In this phase, verify the correctness of the data pipeline and feature engineering, and confirm the full application runs end-to-end without errors.

Now that the implementation is complete, prompt Bob to start the application, and provide a URL to test the application in a browser.

Select several player match ups and predict the outcomes. If you encounter any errors in the app, ask Bob to help you troubleshoot the error.

Refer to the lab guide for complete instructions.