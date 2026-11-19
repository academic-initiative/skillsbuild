# Video transcript for *Lab: AI in Sports - NCAA Basketball Tournament*

This lab demonstrates the capabilities of predictive AI. Predictive AI involves using statistical analysis and machine learning (ML) to identify patterns, anticipate behaviors, and forecast upcoming events. In this case, the lab shows you how to predict the results of an NCAA basketball tournament.

To complete this lab, sign up for a watsonx trial account. On the watsonx product page, you can try it for free. Select your region, and then continue to create the account or log in. If you already have an IBMid, then click Log in, and sign in with your existing email address and password. If you don’t have an iBMid, type your email address, and complete the registration process to create an account.

When you sign up for a watsonx account, a sandbox project is created for you. You can use that project for this lab, or create a new project. Just provide a name for the project, create an API key, then create the project.

Next, you need to associate your wasonx.ai Runtime service with your project. On the Manage tab, on the Services & Integrations page, you can associate a service. In this case, you want to select the watsonx.ai Runtime service that was provisioned for you when you created your trial account.

Now you are ready to add the datasets from the lab instructions to the project. On the Assets tab, you can drag the csv files into the upload side panel. When the uploads are complete, you’ll see the files listed as assets in the project.

You use the AutoAI tool to build a multiclass classification model. Add a new asset to build a machine learning model. Provide a name, confirm your machine learning service instance is listed, and create the experiment.

The AutoAI tool analyzes your data and uses data algorithms, transformations, and parameter settings to create the best predictive model.

Now add the training data to the experiment. In this case, you want to add the cbb.csv file. When you preview the data, you’ll see that file includes data for college basketball teams. The POSTSEASON column indicates where the team finished in previous seasons. POSTSEASON is used as the prediction column for this experiment.

Now configure the experiment. First, this is not a time series analysis, and the prediction column is POSTSEASON. View the experiment settings. Notice that the prediction type is multiclass classification. This method classifies data into categories. and is useful when the prediction column contains multiple distinct categories. Notice that the optimized metric is Accuracy. Review the algorithms to include in the experiment. In this case, you want the experiment to apply the top 4 algorithms. On the Data source panel, verify that the training and holdout data provides a 90-10 split.  90% is used for creating, optimizing, and validating the candidate pipelines, 10% is used for calculating the performance metrics. Save these settings.

Now run the experiment and wait for the relationship map and pipeline leaderboard to populate. When the experiment completes, you can explore the relationship map. The legend helps you see a particular algorithm in the relationship map. You can also change the rank preferences to see the pipelines ranked by holdout data.

Select the top performing pipeline with the highest accuracy score for holdout data. The Feature summary panel shows the features used in the experiment. In particular, you can see that SEED is the most important feature. SEED is the official ranking (1 through 16) assigned to a team by the NCAA Selection Committee when the tournament bracket is created. Save this pipeline as a machine learning model.

Now you are ready to deploy the model. Return to the Assets tab, select all of the CSV files, and promote them to a space. You need to create a new deployment space. Provide a name, select Testing for the deployment stage, select your watsonx.ai Runtime service from the list, and create the space. Now promote the files to the new deployment space.

Back on the assets tab, open the multiclass classification model to promote it to a space. Review the AI factsheet containing the relevant data about the model. Then promote the model to the same space that you previously created. This time, check the box to go to the model in the space, and promote the model.

There’s the model in the space, and now you can create a new deployment. This will be an online deployment. Provide a name, and create the deployment. When the status changes to deployed, open the deployment.

On the API reference tab, review the endpoints and code snippets to incorporate this deployed model in your application. On the Test tab, search in the space for the test data. Click Predict to see the results. Show the input data. Review the predicted finish and the probability of the results for each of the teams. The predictions are placed into categories; for example, R68 indicates the team would be one of the first 4 teams to be eliminated, S16 indicates that the team would be eliminated in the regional semifinals, and F4 means the team made it to the final 4. The results show that the model probabilities are fairly low and most predictions are R64 and R32. In the second part of this lab, you create a regression model, which yields more accurate predictions.

Return to the AI in sports project, and create a new AutoAI experiment for the regression model. Select the data asset from the project to be used to train the regression model. Preview the data to see that it includes the same type of data as the previous dataset. 

Now configure the experiment. Again, this is not a time series analysis, and the prediction column is POSTSEASON. View the experiment settings. Change the prediction type to regression. This method predicts values from a continuous set of values. Regression is a good choice if your prediction column contains many values.  Select Root mean squared error for the optimized metric. The rest of the settings are the same as the last experiment. Save these settings.

Run the experiment, and wait for the relationship map and pipeline leaderboard to populate. Explore the map and the legend. Then change the rank preferences for the score type to Holdout.

Select the top performing pipeline with the lowest RMSE score for holdout data. View the Feature summary to see that WAB is the most important feature. Wins Above Bubble is a metric used to evaluate the quality of a team's season by comparing their record against the performance of a team right on the fringe of making or missing the NCAA Tournament. Notice that there are created features. Applying a transformation to a column can increase the feature importance, and therefore improves the transformation relative to the others. Save this pipeline as a machine learning model.

Now you are ready to deploy the model. From the project’s Assets tab, open the regression model to review the AI factsheet containing the relevant data about the model. Promote the model to the same deployment space. Then create a model deployment for this regression model.

View the model deployment to test it. Search in the space for the test data, and click Predict. Review the predicted finish for each of the teams. A prediction of 1 indicates the team lost in R64, a prediction of 5 indicates that the team made it to the final four.

The lab includes an optional task to create an AutoAI experiment to build a regression model that uses half of the data. You can then compare the predictions for the two regression models.