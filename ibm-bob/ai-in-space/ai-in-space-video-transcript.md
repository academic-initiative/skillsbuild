# Video transcript for *Lab: AI in Space - Build a Space Weather Data Dashboard with IBM Bob*

This video shows you how to build a complete machine learning application that predicts the probability of a space launch using data analysis and machine learning in Jupyter notebooks.

This lab uses the Kaggle dataset: NASA_space_weather_data. This comprehensive dataset contains space weather events collected from NASA's Database of Notifications, Knowledge, Information API. It includes detailed information about solar flares, coronal mass ejections, geomagnetic storms, and high-speed solar wind streams that occurred over the past 2 years.

To complete this lab, you need to sign up for an IBM Bob trial account. If you don’t have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

Now choose a folder location for the lab work. Download the application files from the lab guide to that folder. In Bob, open a terminal window and change directory into that folder. Then execute the commands to create a subfolder, change to that folder, and unzip the lab files. When that’s done, open the space weather predictor folder. Prompt Bob to confirm your working directory.

This lab includes a Jupyter notebook that you can run in Jupyter Lab. Prompt Bob to set up the environment for you. This prompt installs Jupyter Lab, but does not install all of the packages for this lab. That will be done in the notebook. 

Now you are ready to prompt Bob to start Jupyter Lab. Approve the requests to launch the application in a browser, open the lab notebook. From here, you will follow the instructions in the notebook, working through each cell and asking Bob for help when needed.

The first prompt asks Bob to create a Jupyter notebook containing the code generated for this lab. In this first task, you ask to install and verify the Python libraries needed for this lab. Read through the summary to understand what Bob did. Switch to Jupyter Lab, and open the bob_generated_code notebook file. Copy the code for task 1, and paste it in the appropriate cell in your notebook. Then run the code. If you encounter any errors, use the fallback code.

Next you want to ask Bob to fetch the Space results dataset from GitHub, load it into a pandas DataFrame, and verify the data. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 2, and paste it in the appropriate cell in your notebook. Then run the code. The output shows the first three rows of the ingested dataset.

Next, you want to clean and prepare the space weather dataset by handling missing values, removing any duplicates, standardizing data types, and ensuring data quality for analysis. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 3, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the first 3 rows of the cleaned and prepared dataset.

Next, you want to analyze the cleaned space weather dataset to understand patterns, distributions, and relationships between different event types and their characteristics. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 4, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the event type distribution, temporal summary, solar flare summary, geomagnetic storm summary, and some exploratory data analysis charts.

Next, you want to transform raw space weather event data into meaningful risk features for the go/no-go decision model. Compute historical activity patterns without using future information. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 5, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the first three rows of the transformed dataset.

Next, you want to build a risk scoring function that calculates launch safety scores based on recent space weather activity. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 6, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the risk scoring features with the data categorized as low, moderate, or extreme risk.

Next, you want to train a classification model to predict launch recommendations (GO/NO-GO) based on space weather features. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 7, and paste it in the appropriate cell in your notebook. Then run the code. Here you see the details of the trained model including the model accuracy and feature importance.

Next, you want to save the trained model and current space weather statistics for use in the dashboard application. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 8, and paste it in the appropriate cell in your notebook. Then run the code. Here you see that the model and weather statistics have been saved.

Lastly, you want to build a dashboard with matplotlib that lets you pick any date range from the saved risk data and see the day-by-day go, no-go analysis, risk score trend, and solar event breakdown for that window. Read the summary to understand what the generated code does. Switch back to Jupyter Lab, and reload the notebook with the generated code. Copy the code for task 9, and paste it in the appropriate cell in your notebook. Then run the code. Here you see charts showing the risk analysis per day.

When you are done with the application, you can ask Bob to clean up for you. Refer to the lab guide for complete details.