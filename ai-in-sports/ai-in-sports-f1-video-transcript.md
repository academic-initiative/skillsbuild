# Video transcript for *Lab: AI in Sports - Formula 1 Racing*

This lab demonstrates the capabilities of predictive AI. Predictive AI involves using statistical analysis and machine learning (ML) to identify patterns, anticipate behaviors, and forecast upcoming events. In this case, the lab shows you how to predict the results of a Formula 1 racing championship.

To complete this lab, sign up for a watsonx trial account. On the watsonx product page, you can try it for free. Select your region, and then continue to create the account or log in.  If you already have an IBMid, then click Log in, and sign in with your existing email address and password. If you don’t have an iBMid, type your email address, and complete the registration process to create an account.

When you sign up for a watsonx account, a sandbox project is created for you. You can use that project for this lab, or create a new project. Just provide a name for the project, create an API key, then create the project.

Next, you need to associate your wasonx.ai Runtime service with your project. On the Manage tab, on the Services & Integrations page, you can associate a service. In this case, you want to select the watsonx.ai Runtime service that was provisioned for you when you created your trial account.

Now you are ready to add the datasets from the lab instructions to the project. On the Assets tab, you can drag the csv files into the upload side panel. When the uploads are complete, you’ll see the files listed as assets in the project.

You use the AutoAI tool to build a regression model. Add a new asset to build a machine learning model. Provide a name, confirm your machine learning service instance is listed, and create the experiment.

The AutoAI tool analyzes your data and uses data algorithms, transformations, and parameter settings to create the best predictive model.

Now add the training data to the experiment. In this case, you want to add the TargetPosition.csv file. When you preview the data, you’ll see that file includes data for Formula 1 drivers. The target position column indicates the driver's final position. The target position is used as the prediction column for this experiment.

Now configure the experiment. First, this is not a time series analysis, and the prediction column is target position. View the experiment settings. Notice that the prediction type is regression. This method classifies data into categories. and is useful when the prediction column contains multiple distinct categories. Notice that the optimized metric is Root Mean Square Error. The metrics calculates the square root of the mean of the squared differences between the actual values and predicted values. Review the algorithms to include in the experiment. In this case, you want the experiment to apply the top 4 algorithms. On the Data source panel, verify that the training and holdout data provides a 90-10 split.  90% is used for creating, optimizing, and validating the candidate pipelines, 10% is used for calculating the performance metrics. Save these settings.

Now run the experiment and wait for the relationship map and pipeline leaderboard to populate. When the experiment completes, you can explore the relationship map. The legend helps you see a particular algorithm in the relationship map. You can also change the rank preferences to see the pipelines ranked by holdout data.

Select the top performing pipeline with the lowest RMSE score for holdout data. The Feature summary panel shows the features used in the experiment. In particular, you can see that GRID is the most important feature. Grid represents the starting position of the driver for that specific race determined by a qualifying session held before the race. Notice that there are created features. Applying a transformation to a column can increase the feature importance, and therefore improves the transformation relative to the others. Save this pipeline as a machine learning model.

Now you are ready to deploy the model. Return to the Assets tab, select all of the CSV files that you previously uploaded, and promote them to a space. You need to create a new deployment space. Provide a name, select Testing for the deployment stage, select your watsonx.ai Runtime service from the list, and create the space. Now promote the files to the new deployment space.

Back on the assets tab, open the regression model to promote it to a space. Review the AI factsheet containing the relevant data about the model. Then promote the model to the same space that you previously created. This time, check the box to go to the model in the space, and promote the model.

There’s the model in the space, and now you can create a new deployment. This will be an online deployment. Provide a name, and create the deployment. When the status changes to deployed, open the deployment.

On the API reference tab, review the endpoints and code snippets to incorporate this deployed model in your application. On the Test tab, search in the space for the test data. Click Predict to see the results. Show the input data. Review the predicted final position for each of the drivers. Next you will create a binary classification model to predict if the driver will finish on the podium.

Return to the AI in sports project, and create a new AutoAI experiment for the binary classification model. Select the data asset from the project to be used to train the regression model. Preview the data to see that it includes the same type of data as the previous dataset. The is_podium colum indicates where the driver finished in previous races.

Now configure the experiment. Again, this is not a time series analysis, and the prediction column is is_podium. View the experiment settings. The prediction type is Binary. Use binary to classify data into categories. Choose this if your prediction column contains two distinct categories. Select Accuracy for the optimized metric. The rest of the settings are the same as the last experiment. Save these settings.

Run the experiment, and wait for the relationship map and pipeline leaderboard to populate. Explore the map and the legend. Then change the rank preferences for the score type to Holdout.

Select the top performing pipeline with the highest accuracy score for holdout data. View the Feature summary to see that grid is the most important feature. Save this pipeline as a machine learning model.

Now you are ready to deploy the model. From the project’s Assets tab, open the binary classification model to review the AI factsheet containing the relevant data about the model. Promote the model to the same deployment space. Then create a model deployment for this binary classification model.

View the model deployment to test it. Search in the space for the test data, and click Predict. Review the predictions and confidence score for each driver. 1 indicates that the driver finishes on the podium, and 0 indicates that the driver does not finish on the podium.

Next you will build a regression model to predict the points awarded to each driver. Return to your project.

Add an asset to the project. In this case you want to add a Juptyer notebook. You will import the notebook from a GitHub repository. Paste the URL to the notebook, provide a descriptive name, and create the notebook. Wait for the notebook to open in edit mode.

The notebook contains comments and instructions on how to edit the cells before running the code. In the first empty cell, you need to insert your project token. The project access token is a unique identifier that grants the necessary permissions to perform various tasks and access resources within a specific project in watsonx. If you don't have a project access token, you can create one in the project under the Manage tab, on the Access control page.

Next, you will read and explore the data. Since the data set is in the project, you can insert the code snippet to read the data set into a pandas DataFrame. Change the name of the dataframe from df_1 to data_df to match the rest of the code in this notebook. Run the two cells in ths section to see the data columns.

In the next section, you will build the model. Run the cell in the Prepare the data section to define the features to use to train the model using the training data, and split the data into training and holdout data. Run the cell in the Train the model section to initialize the Snap Random Forest Regressor and train the model. Run the cell in the Evaluate the trained model section to use the holdout data to make predictions and determine the accuracy of those predictions. Run the cell in the View the feature summary section to see the most important features used to train the model.

You can insert the code snippet to read the data set into a pandas DataFrame. Change the name of the dataframe to test_df to match the rest of the code in this notebook. Run the cell in ths section to see the data columns. Run the cell in the Select the features in the test data section to identify the same features in the test data that were used in the training data. Run the cell in the Generate the predictions* section to generate the predictions using the test data.

Run the three cells in the Set up the credentials section to pass your API key for authentication.  If you don't have an API key, you can create one on the watson X home page. Run the three cells in the Set up the model metadata section to specify the model name, deployment name, and software specifications for storing the model. Run the three cells in the Set the deployment space section to list the current deployment spaces so you can easily locate the space ID. Run the cell in the Store the model section to save the model to the model repository. Run the cell in the Deploy and score section to deploy the model to the specified deployment space. Run the five cells in the Score the model section to identify the same features list in the testing data, format the test data as a scoring payload, and then send the scoring request. Review the prediction results for the test data.