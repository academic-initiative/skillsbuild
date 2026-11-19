# Video transcript for *Lab: AI in Sports - Predict the Outcome of a Football Match with IBM Bob*

This lab demonstrates how to build a complete machine learning application that predicts football match winners using data analysis and machine learning in Jupyter notebooks.

This lab uses Kaggle datasets that include 49,016 results of international football matches starting from the very first official match in 1872 up to 2026. The matches range from World Cup to Wild Cup to regular friendly matches.

To complete this lab, you need to sign up for an IBM Bob trial account. If you don’t have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

Now choose a folder location for the lab work, and download the ai-in-sports-football-predictor.zip file from the IBM SkillsBuild GitHub repository to that folder. In Bob, open a terminal window and change directory into that folder. Then execute the commands create a subfolder, and unzip the repository into that folder. When that’s done, open the football-predictor folder to see the file structure. Then ask Bob to verify the current working directory.

Next, prompt Bob to install Jupyter Lab. Bob asks you to approve the switch from Ask mode to Agent mode. At this point, you don’t need to install any python packages. Approve the requests to run the commands to set up the environment.

Now you are ready to ask Bob to start Jupyter Lab. Approve the requests to launch the application in a browser, open the lab notebook. From here, you will follow the instructions in the notebook, working through each cell and asking Bob for help when needed.

The first prompt asks Bob to create a Jupyter notebook containing the code generated for this lab. In this first task, you ask to install and verify the Python libraries needed for this lab. Read through the Task Completed section to understand what the generated code does. Switch to Jupyter Lab, and open the bob_generated_code.ipynb file. Copy the code for task 1, and paste it in the appropriate cell in your notebook. Then run the code. If you encounter any errors, use the fallback code.

Next you want to ask Bob to fetch the international football results dataset from GitHub, load it into a pandas DataFrame, and verify the data. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 2, and paste it in the appropriate cell in your notebook. Then run the code. 

Next you want to ask Bob to analyze the dataset to understand its structure and content. You will examine tournament types, team participation, and match distribution over time. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 3, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the top 10 tournaments, top 15 teams, and matches per decade.

Next you want to ask Bob to transform raw match data into meaningful features that the machine learning model can use. You will compute historical statistics for each team without using future information. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 4, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the computed historical statistics for each team.

Next you want to ask Bob to divide the dataset using a time-based split to ensure the model is evaluated on matches it has never seen during training. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 5, and paste it in the appropriate cell in your notebook. Then run the code. Here you see how the data was split into training and testing datasets.

Next you want to ask Bob to train a Random Forest classifier on the training data and evaluate its performance on the test set. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 6, and paste it in the appropriate cell in your notebook. Then run the code. Here you see information about the trained model and the evaluation of its performance on the test set.

Next you want to ask Bob to compute current statistics for each team and save both the trained model and team data for any future use (for example, data visualization using Streamlit). Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 7, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the top 5 teams by win rate based on computed current statistics for each team.

Next you want to ask Bob to see what are predictions from our model for Brazil vs Argentina, and Germany vs Brazil. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 8, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the model’s predictions for Brazil vs Argentina, and Germany vs Brazil.

Next you want to ask Bob to generate an interactive UI app for predicting the outcome of different matches. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 9, and paste it in the appropriate cell in your notebook. Then run the code. Here you see that the code created an app python file with the Streamlit code.

Next you want to ask Bob to launch the UI app just created to predict outcomes. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 10, and paste it in the appropriate cell in your notebook. Then run the code. 

Test the application by predicting match outcomes. When you are done with the application, you can ask Bob to clean up for you. Refer to the lab guide for complete instructions.