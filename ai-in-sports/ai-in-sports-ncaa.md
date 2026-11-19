<img src="../watsonx/images/lab00.png">

# Overview

This lab demonstrates the capabilities of predictive AI. Predictive AI involves using statistical analysis and machine learning (ML) to identify patterns, anticipate behaviors, and forecast upcoming events. In this case, the lab shows you how to predict the results of an NCAA basketball tournament.

# Learning objectives

After completing this lab, you should be able to:

- Build a machine learning model to predict outcomes.
- Deploy and test the machine learning model.

<a name="top"></a>

# Contents

Complete the following tasks in this lab:

**Part 1: Build a regression model**

- [Task 1: Sign up for an IBM watsonx trial account](#task01)
- [Task 2: Create a project](#task02)
- [Task 3: Associate the watsonx.ai Runtime service with your project](#task03)
- [Task 4: Add data assets to your project](#task04)
- [Task 5: Build a multiclass classification machine learning model](#task05)
- [Task 6: Explore and save a pipeline](#task06)
- [Task 7: Deploy and test the model](#task07)

**Part 2: Build a multiclass classification model**
- [Task 8: Build a regression machine learning model](#task08)
- [Task 9: Explore and save a pipeline](#task09)
- [Task 10: Deploy and test the model](#task10)
- [Optional: Build another regression model](#optional)

# Preview the tutorial

Watch the following video to see a preview of the steps in this tutorial.

**Tip:** Right-click the following thumbnail image, and open the video in a new tab.

<a href="https://video.ibm.com/embed/channel/23669513/video/ncaa-bb">![Video preview of tutorial](../watsonx/images/video-thumbnail-ncaa.jpg "Video preview of tutorial")</a>

<p>Right-click the link to view the <a href="ai-in-sports-ncaa-video-transcript.md" target="_blank">video transcript</a>.</p>

<a name="part01"></a>

<img src="../watsonx/images/lab01.png">

In this part of the lab, you use the full data set to build, deploy, and test a multiclass classification model.

<a name="task01"></a>

# Task 1: Sign up for an IBM watsonx trial account

When you sign up for a watsonx trial, the watsonx.ai Studio and watsonx.ai Runtime services are provisioned for you. Follow these steps to sign up for a trial account:

1. Visit the watsonx product page at [https://www.ibm.com/products/watsonx](https://www.ibm.com/products/watsonx). **Tip:** Right-click the link to open the link in a new tab.

1. Click **Try it for free**.

1. Watch this video to see how to sign up for an account:

   **Tip:** Right-click the following thumbnail image, and open the video in a new tab.

   <a href="https://video.ibm.com/embed/channel/23952663/video/wx-signup">![Sign up video](../watsonx/images/video-thumbnail-signup.png "Sign up video")</a>

1. Select your region, for example, **Dallas**.

1. Click **Create account or log in**.

1. If you already have an IBMid, then click **Log in**, and sign in with your existing email address and password.

1. If you don’t have an iBMid, type your email address, and complete the registration process to create an account.

The following image shows the watsonx home screen.

<img src="../watsonx/images/watsonx-home-screen.png">

[Back to the top](#top)

<a name="task02"></a>

# Task 2: Create a project

When you sign up for a watsonx account, a sandbox project is created for you. You can use that project for this lab, or create a new project. Follow these steps to create a new project:

1. In the *Quick links* section, click **Projects**.

1. On the *Projects* page, click **New project**.

1. For the *Name*, type:

   ```
   AI in sports
   ```

1. Click **Create key** to create an API key.

1. Click **Create**.

The following image shows the *Overview* tab in the project.

<img src="../watsonx/images/ai-in-sports-overview-tab.png">

[Back to the top](#top)

<a name="task03"></a>

# Task 3: Associate the watsonx.ai Runtime service with your project

To create machine learning models in your project, follow these steps to associate your wasonx.ai Runtime service with your project:

1. Click the **Manage** tab.

1. Select the **Services & integrations** page.

1. Click **Associate service**.

   1. Select your watsonx.ai Runtime service.

   1. Click **Associate**.

The following image shows the *Manage* tab in the project.

<img src="../watsonx/images/ai-in-sports-project-manage.png">

[Back to the top](#top)

<a name="task04"></a>

# Task 4: Add data assets to your project

**Tip:** Right-click the links in this task to open each of them in a new tab.

For the training data, you use several [college basketball playoff datasets](https://www.kaggle.com/datasets/andrewsundberg/college-basketball-dataset/data). Follow these steps to add the datasets to the project:

1. Right-click on each of the following files to save them to your hard disk drive:

   - <a href="data/cbb.csv">cbb.csv</a>
   - <a href="data/cbb25-full.csv">cbb25-full.csv</a>
   - <a href="data/cbb25HalfData.csv">cbb25HalfData.csv</a>
   - <a href="data/cbbRegression.csv">cbbRegression.csv</a>
   - <a href="data/cbbRegressionHalfData.csv">cbbRegressionHalfData.csv</a>

1. Click the **Assets** tab.

1. Click the **Upload asset to project** icon ![Upload asset to project](../watsonx/images/data--set.svg "Upload asset to project").

1. Drag the following files into the side panel, and wait for them to upload:

   - cbb.csv
   - cbb25-full.csv
   - cbb25-HalfData.csv
   - cbbRegression.csv
   - cbbRegressionHalfData.csv

1.  If necessary, click the **Refresh** icon ![Refresh](../watsonx/images/refresh.svg "Refresh") to see the list of uploaded CSV files.

The following image shows the *Assets* tab in the project.

<img src="../watsonx/images/ai-in-sports-assets-tab.png">

[Back to the top](#top)

<a name="task05"></a>

# Task 5: Build a multiclass classification machine learning model

You use the <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/autoai-overview.html?context=wx">AutoAI tool</a> to build a multiclass classification model. The AutoAI tool analyzes your data and uses data algorithms, transformations, and parameter settings to create the best predictive model. Follow these steps to build a multiclass classification model with the AutoAI tool.

## Task 5a: Create the experiment

1. From the *Assets* tab, click **New asset > Work with models > Build machine learning or RAG solutions automatically**.

1. On the *Build machine learning models automatically* page, select **Build a machine learning model**, and click **Next**.

1. For the *Name*, type the following text:

   ```
   AI in sports experiment, multiclass classification
   ```

1. Confirm that your machine learning service instance that you associated with your project is selected in the *watsonx.ai Runtime service instance* field.

1. Click **Create**, and wait for the AutoAI experiment interface to display.

The following image shows the AutoAI experiment.

<img src="../watsonx/images/autoai-create-experiment-multi.png">

[Back to the top](#top)

## Task 5b: Add the training data to the experiment

1. To add the training data to the experiment, click **Select from project**.

1. Select **Data asset > cbb.csv**, and click **Select asset**.

1. To view the training data, click the **Options** icon ![Options](../watsonx/images/overflow-menu.svg "Options"), and then select **Preview data**. The data includes data for college basketball teams.

1. Scroll to the right to see the *POSTSEASON* column. This column indicates where the team finished in previous seasons. The POSTSEASON is used as the prediction column for this experiment.

1. Click **Cancel** to close the data preview.

The following image shows the data preview.

<img src="../watsonx/images/autoai-multi-data-preview.png">

[Back to the top](#top)

## Task 5c: Configure the experiment

1. For the *Create a time series analysis?* field, select **No**.

1. For the *What do you want to predict?* field, select **POSTSEASON**.

1. Click **Experiment settings** to view the *Prediction* panel.

1. For the *Prediction type*, select **Multiclass classification**. Use multiclass classification to classify data into categories. Choose this prediction type if your prediction column contains multiple distinct categories.

1. For the *Optimized metric*, select **Accuracy**.

1. Review the *Algorithms to include* section. Hover over each of the algorithms to see a description.

1. In the *Algorithms to use* section, select **4** as the number of top algorithms to apply.

1. Click the **Data source** panel.

1. Scroll to the *Training and holdout method* section to verify how the experiment splits the training data. 90% is used for creating, optimizing, and validating the candidate pipelines, 10% is used for calculating the performance metrics.

1. Click **Save settings**.

The following image shows the configured experiment.

<img src="../watsonx/images/autoai-multiclass.png">

[Back to the top](#top)

## Task 5d: Run the AutoAI experiment

1. Click **Run experiment**, and wait for the *Relationship map* and *Pipeline leaderboard* to populate.

1. When the experiment completes, explore the *Relationship map* by hovering over each of the pipelines.

1. Click the **Legend** icon ![Legend](../watsonx/images/legend.svg "Legend"), and hover over each item in the legend to see that item on the *Relationship map*.

1. Click the **Rank preferences** icon ![Rank preferences](../watsonx/images/parameters.svg "Rank preferences"), and change the *Score type* to **Holdout**.

The following image shows the completed experiment.

<img src="../watsonx/images/autoai-multiclass-map.png">

[Back to the top](#top)

<a name="task06"></a>

## Task 6: Explore and save a pipeline

Now that the experiment run is completed, follow these steps to explore the pipelines and save the model:

1. In the *Pipeline leaderboard*, select the top performing pipeline with the highest accuracy score for holdout data.

1. On the *Pipeline details* page, select **Feature summary**. Refer to the [College Basketball dataset](https://www.kaggle.com/datasets/andrewsundberg/college-basketball-dataset/data) for complete details on each of the columns in the dataset. **Tip:** Right-click the link to open the link in a new tab.

   Review the following features:

   - **BARTHAG** estimates the probability that a team would beat an average Division I team.
   - **WAB** measures a team's record strength by comparing their actual record against how an average bubble team (that is, a team on the verge of making or missing the tournament) would perform against the same schedule.
   - **SEED** is the official ranking (1 through 16) assigned to a team by the NCAA Selection Committee when the tournament bracket is created.
   - **G** stands for games that are played and represents the total number of games a team that is played during the season (typically including the regular season and conference tournaments).

   The following table compares the features.

   | Feature | Type | Focus | Use Case |
   | :--- | :--- | :--- | :--- |
   | **BARTHAG** | Efficiency | Predicts future performance and strength. | Best for predicting "upsets." |
   | **WAB** | Achievement | Measures the quality of the record. | Best for predicting if a team gets in. |
   | **SEED** | Rank | The committee's official "starting line." | Best for predicting how far a team goes. |
   | **G** | Volume | The total number of games played. | Best for normalizing per-game stats. |

1. To save this pipeline as a model, click **Save as**.

   1. Select **Model** as the asset type.

   1. Accept the default model name.

   1. Click **Create**.

The following image shows the model details.

<img src="../watsonx/images/autoai-multiclass-full-model.png">

[Back to the top](#top)

<a name="task07"></a>

# Task 7: Deploy and test the model

Now that you saved the best performing model to the project, follow these steps to deploy and test the model.

## Task 7a: Promote the assets to a deployment space

1. Close the windows to return to the *Experiment summary* page.
1. Click the project name to return to the _Assets_ tab.
2. Select all of the CSV files that you uploaded to the project in Task 4.
3. Click **Promote to space**.
4. For the _Target space_, either select an existing space, or follow these steps to create a new space:
    1. Select **Create a new deployment space**.
    2. Provide a name for the new space; for example, `AI in sports deployment space`.
    3. For the _Deployment stage_, select **Testing**.
    4. For the _watsonx.ai Runtime_, select your **watsonx.ai Runtime** service.
    5. Click **Create**. The new deployment space is selected for the target space.
5. Click **Promote**.
1. Click **Close** to return to the *Assets* tab.

The following image shows the *Promote to space* page with the CSV files selected.

<img src="../watsonx/images/promote-to-space-csv-files.png">

[Back to the top](#top)

## Task 7b: Promote the model to a deployment space

1. Back on the *Assets* tab, select the multiclass classification model.
2. Review the AI factsheet containing the relevant data about the model.
3. Click **Promote to space**.
4. For the _Target space_, select an existing space.
5. Select the **Go to the model in the space after promoting it** option.
5. Click **Promote**.

The following image shows the model to be promoted to the space.

<img src="../watsonx/images/promote-to-space-multiclass.png">

[Back to the top](#top)

## Task 7c: Create a model deployment

1. Click **New deployment**.
2. For the _Deployment type_, select **Online**.
3. Type a name for the deployment; for example, `Basketball predictions, multiclass`.
4. Click **Create**, and wait for the model to be deployed.
5. When the _Status_ changes to **Deployed**, click the deployment name.

The following image shows the model deployment in the space.

<img src="../watsonx/images/model-deployment-multiclass.png">

[Back to the top](#top)

## Task 7d: Test the deployed model

1. On the _API reference_ tab, review the endpoints and code snippets to incorporate this deployed model in your application.
1. Click the **Test** tab.
1. Click **Search in space**.
    1. Select **Data asset > cbb25-full.csv**.
    2. Click **Confirm**.
1. Click **Predict**.
1. On the *Prediction results* page, select **Show input data**.
1. Review the predicted finish and the probability of the results for each of the teams. The following table provides a description for each of the possible values in the POSTSEASON column.

   | Value | Round Reached | Description |
   | :--- | :--- | :--- |
   | **R68** | First Four | Eliminated in the play-in games. |
   | **R64** | Round of 64 | Eliminated in the first full round of the tournament. |
   | **R32** | Round of 32 | Eliminated in the second round. |
   | **S16** | Sweet Sixteen | Eliminated in the regional semifinals. |
   | **E8** | Elite Eight | Eliminated in the regional finals. |
   | **F4** | Final Four | Eliminated in the national semifinals. |
   | **2ND** | Runner-up | Lost in the National Championship game. |
   | **Champion** | Winner | Won the NCAA March Madness Tournament. |

1. When you are done, close the *Prediction results* page.

The following image shows the test results. The results show that the model probabilities are fairly low and most predictions are *R64* and *R32*. In the Part 2 of this lab, you create a regression model, which yields more accurate predictions.

<img src="../watsonx/images/test-multiclass.png">

[Back to the top](#top)

<a name="part02"></a>

<img src="../watsonx/images/lab02.png">

In this part of the lab, you use the full data set to build, deploy, and test a regression model.

<a name="task08"></a>

# Task 8: Build a regression machine learning model

You use the <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/autoai-overview.html?context=wx">AutoAI tool</a> to build a machine learning model. Follow these steps to build a regression model with the AutoAI tool.

## Task 8a: Create the experiment

1. Click **IBM watsonx** in the banner.

1. Open the **AI in sports** project.

1. From the *Assets* tab, click **New asset > Work with models > Build machine learning or RAG solutions automatically**.

1. On the *Build machine learning models automatically* page, select **Build a machine learning model**, and click **Next**.

1. For the *Name*, type the following text:

   ```
   AI in sports experiment, regression
   ```

1. Confirm that your machine learning service instance that you associated with your project is selected in the *watsonx.ai Runtime service instance* field.

1. Click **Create**, and wait for the AutoAI experiment interface to display.

The following image shows the AutoAI experiment builder.

<img src="../watsonx/images/autoai-create-experiment.png">

[Back to the top](#top)

## Task 8b: Add the training data to the experiment

1. To add the training data to the experiment, click **Select from project**.

1. Select **Data asset > cbbRegression.csv**, and click **Select asset**.

1. To view the training data, click the **Options** icon ![Options](../watsonx/images/overflow-menu.svg "Options"), and then select **Preview data**. The data includes data for college basketball teams.

1. Scroll to the right to see the *POSTSEASON* column. This column indicates where the team finished in previous seasons. The POSTSEASON is used as the prediction column for this experiment.

1. Click **Cancel** to close the data preview.

The following image shows the data preview.

<img src="../watsonx/images/autoai-data-preview.png">

[Back to the top](#top)

## Task 8c: Configure the experiment

1. For the *Create a time series analysis?* field, select **No**.

1. For the *What do you want to predict?* field, select **POSTSEASON**.

1. Click **Experiment settings** to view the *Prediction* panel.

1. For the *Prediction type*, select **Regression**. Use regression to predict values from a continuous set of values. Regression is a good choice if your prediction column contains many values.

1. For the *Optimized metric*, select **Root mean squared error (RMSE)**.

1. Review the *Algorithms to include* section. Hover over each of the algorithms to see a description.

1. In the *Algorithms to use* section, select **4** as the number of top algorithms to apply.

1. Click the **Data source** panel.

1. Scroll to the *Training and holdout method* section to verify how the experiment splits the training data. 90% is used for creating, optimizing, and validating the candidate pipelines, 10% is used for calculating the performance metrics.

1. Click **Save settings**.

The following image shows the configured experiment.

<img src="../watsonx/images/autoai-regression.png">

[Back to the top](#top)

## Task 8d: Run the AutoAI experiment

1. Click **Run experiment**, and wait for the *Relationship map* and *Pipeline leaderboard* to populate.

1. When the experiment completes, explore the *Relationship map* by hovering over each of the pipelines.

1. Click the **Legend** icon ![Legend](../watsonx/images/legend.svg "Legend"), and hover over each item in the legend to see that item on the *Relationship map*.

1. Click the **Rank preferences** icon ![Rank preferences](../watsonx/images/parameters.svg "Rank preferences"), and change the *Score type* to **Holdout**.

The following image shows the completed experiment.

<img src="../watsonx/images/autoai-regression-map.png">

[Back to the top](#top)

<a name="task09"></a>

## Task 9: Explore and save a pipeline

Now that the experiment run is completed, follow these steps to explore the pipelines and save the model:

1. In the *Pipeline leaderboard*, select the top performing pipeline with the lowest RMSE score for holdout data.

1. On the *Pipeline details* page, select **Feature summary**. Review the following features:

   - **BARTHAG** estimates the probability that a team would beat an average Division I team.
   - **WAB** measures a team's record strength by comparing their actual record against how an average bubble team (that is, a team on the verge of making or missing the tournament) would perform against the same schedule.
   - **SEED** is the official ranking (1 through 16) assigned to a team by the NCAA Selection Committee when the tournament bracket is created.
   - **G** stands for games that are played and represents the total number of games a team that is played during the season (typically including the regular season and conference tournaments).

   The following table compares the features.

   | Feature | Type | Focus | Use Case |
   | :--- | :--- | :--- | :--- |
   | **BARTHAG** | Efficiency | Predicts future performance and strength. | Best for predicting "upsets." |
   | **WAB** | Achievement | Measures the quality of the record. | Best for predicting if a team gets in. |
   | **SEED** | Rank | The committee's official "starting line." | Best for predicting how far a team goes. |
   | **G** | Volume | The total number of games played. | Best for normalizing per-game stats. |

   Notice that there are created features. Applying a transformation to a column can increase the feature importance, and therefore improves the transformation relative to the others.

1. To save this pipeline as a model, click **Save as**.

   1. Select **Model** as the asset type.

   1. Accept the default model name.

   1. Click **Create**.

The following image shows the model details.

<img src="../watsonx/images/autoai-regression-full-model.png">

[Back to the top](#top)

<a name="task10"></a>

# Task 10: Deploy and test the model

Now that you saved the best performing model to the project, follow these steps to deploy and test the model.

## Task 10a: Promote the model to a deployment space

1. Close the windows to return to the *Experiment summary* page.
1. Click the project name to return to the _Assets_ tab.
1. Open the regression model.
2. Review the AI factsheet containing the relevant data about the model.
3. Click the **Promote to space** icon ![Promote to space](../watsonx/images/promote.svg "Promote to space").
4. For the _Target space_, select the same deployment space where the datasets were promoted.
5. Select the **Go to the model in the space after promoting it** option.
6. Click **Promote**.

The following image shows the *Promote to space* page with the model selected.

<img src="../watsonx/images/promote-to-space-model.png">

[Back to the top](#top)

## Task 10b: Create a model deployment

1. Click **New deployment**.
2. For the _Deployment type_, select **Online**.
3. Type a name for the deployment; for example, `Basketball predictions, regression full data`.
4. Click **Create**, and wait for the model to be deployed.
5. When the _Status_ changes to **Deployed**, click the deployment name.

The following image shows the model deployment.

<img src="../watsonx/images/model-deployment-regression.png">

[Back to the top](#top)

## Task 10c: Test the deployed model

1. On the _API reference_ tab, review the endpoints and code snippets to incorporate this deployed model in your application.
1. Click the **Test** tab.
1. Click **Search in space**.
    1. Select **Data asset > cbb25-full.csv**.
    2. Click **Confirm**.
1. Click **Predict**.
1. On the *Prediction results* page, select **Show input data**.
1. Review the predicted finish for each of the teams. The following table describes the meaning of each of the postseason scores; for example, A prediction of 1 indicates the team lost in R64, a prediction of 5 indicates that the team made it to the final four.

   | Tournament Round | Prediction for postseason placement |
   | ----- | ----- |
   | No tournament/Lost in R68 | 0 |
   | Lost in R64 | 1 |
   | Lost in R32 | 2 |
   | Lost in R16 | 3 |
   | Lost in R8 | 4 |
   | Lost in R4 | 5 |
   | Lost in Championship | 6 |
   | Won Championship | 7 |

1. When you are done, close the *Prediction results* page.

The following image shows the test results.

<img src="../watsonx/images/test-regression-full.png">

[Back to the top](#top)

<a name="optional"></a>

# Optional: Build another regression model

Create an AutoAI experiment to build a regression model that uses the *cbbRegressionHalfData.csv* file as the training data and the *cbbHalfData.csv* file as the testing data. Compare the predictions for the two regression models.

The following image shows the configured experiment.

<img src="../watsonx/images/autoai-regression-half.png">

The following image shows the completed experiment.

<img src="../watsonx/images/autoai-regression-half-map.png">

The following image shows the model details. Refer to the [College Basketball dataset](https://www.kaggle.com/datasets/andrewsundberg/college-basketball-dataset/data) for complete details on each of the columns in the dataset.

<img src="../watsonx/images/autoai-regression-half-model.png">

The following image shows the test results. Compare these results to the regression model that uses the full dataset.

<img src="../watsonx/images/test-regression-half.png">

[Back to the top](#top)

# Summary
In this lab, you learned how to complete the following tasks:

- Build a machine learning model to predict outcomes.
- Deploy and test the machine learning model.

# Additional resources

**Tip:** Right-click the links to open each of them in a new tab.

- Try <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/quickstart-tutorials.html?context=wx" target="_blank">watsonx quick start tutorials</a>.
- <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-models.html?context=wx" target="_blank">Supported foundation models in watsonx.ai</a>
- View more <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/videos-wx.html?context=wx" target="_blank">videos</a>
- [Overview of watsonx](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/overview-wx.html?context=wx)
- Find sample datasets, projects, models, prompts, and notebooks in the Resource Hub to gain hands-on experience:

   ![Notebook](../watsonx/images/notebook.svg "Notebook") [Notebooks](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=notebook) that you can add to your project to get started analyzing data and building models.

   ![Project](../watsonx/images/ibm-cloud--projects.svg "Project") [Projects](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=project-template) that you can import containing notebooks, datasets, prompts, and other assets.

   ![Data sets](../watsonx/images/data--set--32.svg "Data sets") [Datasets](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=dataset) that you can add to your project to refine, analyze, and build models.

   ![Prompt](../watsonx/images/prompt.svg "Prompt") [Prompts](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=example-prompt) that you can use in the Prompt Lab to prompt a foundation model.

   ![Model](../watsonx/images/model.svg "Model") [Foundation models](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=foundation-model) that you can use in the Prompt Lab.