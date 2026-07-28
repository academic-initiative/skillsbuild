<img src="images/title-f1.png">

# Overview

This lab demonstrates the capabilities of predictive AI. Predictive AI involves using statistical analysis and machinelearning(ML) to identify patterns, anticipate behaviors, and forecast upcoming events. In this case, the lab shows you how to predict the results of a Formula 1 World Championship.

# Learning objectives

After completing this lab, you should be able to:

- Build a machine learning model to predict outcomes.
- Deploy and test the machine learning model.

# Dataset

This lab uses the [Formula 1 Racing Data](https://www.kaggle.com/datasets/jtrotman/formula-1-race-data) dataset which contains race data from 1950 to 2026 race 1 (Australia). **Tip:** Right-click the link to open the link in a new tab.

## Files used from the dataset

| File               | Description           | Purpose                                                                 |
| ------------------ | --------------------- | ----------------------------------------------------------------------- |
| `results.csv`      | Race results data     | Contains finishing positions, points, and race outcomes for each driver |
| `races.csv`        | Race metadata         | Includes race dates, and circuits names                                 |
| `drivers.csv`      | Driver information    | Driver names, nationalities, and biographical data                      |
| `constructors.csv` | Constructor/team data | Team names, nationalities, and historical information                   |
| `status.csv`       | Race status codes     | Finish status descriptions (e.g., "Finished", "Accident", "Engine")     |

## Data preparation process

The datasets were combined and refined by performing comprehensive data engineering and feature extraction to prepare the raw F1 dataset for machine learning models.

## Feature engineering pipeline

The data refinery process enriches the base dataset with the following calculated features:

### 1. **On the podium: `is_podium`**

- **Type:** Boolean (0/1)
- **Purpose:** Identifies if a driver finished in the top 3 positions (podium finish)
- **Use Case:** Binary classification models to predict podium probability

### 2. **Driver Age: `driver_age`**

- **Type:** Numeric (years)
- **Calculation:** Computed from driver's date of birth and race date
- **Purpose:** Captures driver experience and performance correlation with age

### 3. **Historical Track Performance: `hist_track_points`**

- **Type:** Aggregated statistics per driver-circuit combination
- **Metrics:** Average finishing position, podium rate, DNF rate at specific circuits
- **Purpose:** Leverages driver familiarity and past performance at each track

### 4. **Momentum Indicator: `momentum_3`**

- **Type:** Rolling average metric
- **Window:** Previous 3 races in the current season
- **Metrics:** Average finishing position, points scored, consistency
- **Purpose:** Captures recent form and performance trends

## Output datasets

The refined data is exported to multiple formats optimized for different prediction tasks:

| Output File            | Description                          | Column to predict |
| ---------------------- | ------------------------------------ | ------------------------------------ |
| `f1_resultsTill24_TargetPosition.csv` | Refined dataset (2014-2024) to predict driver's position on podium |`target pos` |
| `f1_resultsTill24_IsPodium.csv` | Refined dataset (2014-2024) to predict if the driver will be on the podium | `is_podium` |
| `f1_resultsTill24_points.csv` | Refined dataset (2014-2024) to predict how many points the driver is awarded | `points` |
| `f1_resultsFrom25_testing.csv` | Refined dataset (2025-2026) for testing predictions | N/A |

<a name="top"></a>

# Contents

Complete the following tasks in this lab:

**Part 1: Build a regression model to predict driver's position**

- [Task 1: Sign up for an IBM watsonx trial account](#task01)
- [Task 2: Create a project](#task02)
- [Task 3: Associate the watsonx.ai Runtime service with your project](#task03)
- [Task 4: Add data assets to your project](#task04)
- [Task 5: Build a regression machine learning model](#task05)
- [Task 6: Explore and save a pipeline](#task06)
- [Task 7: Deploy and test the model](#task07)

**Part 2: Build a binary classification model to predict on the podium**
- [Task 8: Build a binary classification machine learning model](#task08)
- [Task 9: Explore and save a pipeline](#task09)
- [Task 10: Deploy and test the model](#task10)

**Part 3: Build a regression model to predict driver's points awarded**

**Option 1: Build, deploy, and test a model by using a Jupyter notebook**
- [Task 11: Create the notebook](#task11)
- [Task 12: Run the notebook](#task12)

**Option 2: Build, deploy, and test a model by using AutoAI**
- [Task 13: Build a binary classification machine learning model](#task13)
- [Task 14: Explore and save a pipeline](#task14)
- [Task 15: Deploy and test the model](#task15)


# Preview the tutorial

Watch the following video to see a preview of the steps in this tutorial.

**Tip:** Right-click the following thumbnail image, and open the video in a new tab.

<a href="https://video.ibm.com/embed/channel/23669513/video/f1-racing">![Video preview of tutorial](images/video-thumbnail-f1-racing.jpg "Video preview of tutorial")</a>

<a name="part01"></a>

<img src="images/f1-part01.png">

In this part of the lab, you use the full data set to build, deploy, and test a regression model.

<a name="task01"></a>

# Task 1: Sign up for an IBM watsonx trial account

When you sign up for a watsonx trial, the watsonx.ai Studio and watsonx.ai Runtime services are provisioned for you. Follow these steps to sign up for a trial account:

1. Visit the watsonx product page at [https://www.ibm.com/products/watsonx](https://www.ibm.com/products/watsonx). **Tip:** Right-click the link to open the link in a new tab.

1. Click **Try it for free**.

1. Watch this video to see how to sign up for an account:

   **Tip:** Right-click the following thumbnail image, and open the video in a new tab.

   <a href="https://video.ibm.com/embed/channel/23952663/video/wx-signup">![Sign up video](images/video-thumbnail-signup.png "Sign up video")</a>

1. Select your region, for example, **Dallas**.

1. Click **Create account or log in**.

1. If you already have an IBMid, then click **Log in**, and sign in with your existing email address and password.

1. If you don’t have an iBMid, type your email address, and complete the registration process to create an account.

The following image shows the watsonx home screen.

<img src="images/watsonx-home-screen.png">

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

1. Click **Create**.

The following image shows the *Overview* tab in the project.

<img src="images/ai-in-sports-overview-tab.png">

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

<img src="images/ai-in-sports-project-manage.png">

[Back to the top](#top)

<a name="task04"></a>

# Task 4: Add data assets to your project

**Tip:** Right-click the links in this task to open each of them in a new tab.

For the training data, you use several [Formula 1 racing datasets](https://www.kaggle.com/datasets/jtrotman/formula-1-race-data/data). **Tip:** Right-click the link to open the link in a new tab.

Follow these steps to add the datasets to the project:

1. Right-click on each of the following files to save them to your hard disk drive:

   - <a href="data/f1-race/f1_resultsTill24_TargetPosition.csv">f1_resultsTill24_TargetPosition.csv</a>
   - <a href="data/f1-race/f1_resultsTill24_IsPodium.csv">f1_resultsTill24_IsPodium.csv</a>
   - <a href="data/f1-race/f1_resultsTill24_points.csv">f1_resultsTill24_points.csv</a>
   - <a href="data/f1-race/f1_resultsFrom25_testing.csv">f1_resultsFrom25_testing.csv</a>

1. Click the **Assets** tab.

1. Click the **Upload asset to project** icon ![Upload asset to project](images/data--set.svg "Upload asset to project").

1. Drag the following files into the side panel, and wait for them to upload:

   - `f1_resultsTill24_TargetPosition.csv`
   - `f1_resultsTill24_IsPodium.csv`
   - `f1_resultsTill24_points.csv`
   - `f1_resultsFrom25_testing.csv`

1.  If necessary, click the **Refresh** icon ![Refresh](images/refresh.svg "Refresh") to see the list of uploaded CSV files.

The following image shows the *Assets* tab in the project.

<img src="images/ai-in-sports-assets-tab-F1.png">

[Back to the top](#top)

<a name="task05"></a>

# Task 5: Build a regression machine learning model

You use the <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/autoai-overview.html?context=wx">AutoAI tool</a> to build a regression model. The AutoAI tool analyzes your data and uses data algorithms, transformations, and parameter settings to create the best predictive model. Follow these steps to build a regression model with the AutoAI tool to predict the final driver position using the `f1_resultsTill24_TargetPosition.csv` dataset and the `target_pos` for the column to predict:

## Task 5a: Create the experiment

1. From the *Assets* tab, click **New asset > Work with models > Build machine learning or RAG solutions automatically**.

1. On the *Build machine learning models automatically* page, select **Build a machine learning model**, and click **Next**.

1. For the *Name*, type the following text:

   ```
   F1 racing experiment, driver position
   ```

1. Confirm that your machine learning service instance that you associated with your project is selected in the *watsonx.ai Runtime service instance* field.

1. Click **Create**, and wait for the AutoAI experiment interface to display.

The following image shows the AutoAI experiment.

<img src="images/autoai-f1-create-experiment-driver-position.png">

[Back to the top](#top)

## Task 5b: Add the training data to the experiment

1. To add the training data to the experiment, click **Select from project**.

1. Select **Data asset > f1_resultsTill24_TargetPosition.csv**, and click **Select asset**.

1. To view the training data, click the **Options** icon ![Options](images/overflow-menu.svg "Options"), and then select **Preview data**.

1. Scroll to the right to see the *target_pos* column. This column indicates the driver's final position. The `target_pos` is used as the prediction column for this experiment.

1. Click **Cancel** to close the data preview.

The following image shows the data preview.

<img src="images/autoai-f1-driver-position-data-preview.png">

[Back to the top](#top)

## Task 5c: Configure the experiment

1. For the *Create a time series analysis?* field, select **No**.

1. For the *What do you want to predict?* field, select **target_pos**.

1. Click **Experiment settings** to view the *Prediction* panel.

1. For the *Prediction type*, **Regression** is selected. Use regression to predict values from a continuous set of values. Regression is a good choice if your prediction column contains many values.

1. For the *Optimized metric*, **Root mean squared error** is selected. The metrics calculates the square root of the mean of the squared differences between the actual values and predicted values.

1. Review the *Algorithms to include* section. Hover over each of the algorithms to see a description.

1. In the *Algorithms to use* section, **2** is selected as the number of top algorithms to apply.

1. Click the **Data source** panel.

1. Scroll to the *Training and holdout method* section to verify how the experiment splits the training data. 90% is used for creating, optimizing, and validating the candidate pipelines, 10% is used for calculating the performance metrics.

1. Since you didn't make any changes, click **Cancel**.

The following image shows the configured experiment.

<img src="images/autoai-f1-driver-position-settings.png">

[Back to the top](#top)

## Task 5d: Run the AutoAI experiment

1. Click **Run experiment**, and wait for the *Relationship map* and *Pipeline leaderboard* to populate.

1. When the experiment completes, explore the *Relationship map* by hovering over each of the pipelines.

1. Click the **Legend** icon ![Legend](images/legend.svg "Legend"), and hover over each item in the legend to see that item on the *Relationship map*.

1. Click the **Rank preferences** icon ![Rank preferences](images/parameters.svg "Rank preferences"), and change the *Score type* to **Holdout**.

The following image shows the completed experiment.

<img src="images/autoai-f1-driver-position-map.png">

[Back to the top](#top)

<a name="task06"></a>

## Task 6: Explore and save a pipeline

Now that the experiment run is completed, follow these steps to explore the pipelines and save the model:

1. In the *Pipeline leaderboard*, select the top performing pipeline with the lowest RMSE score for holdout data.

1. On the *Pipeline details* page, select **Feature summary**. Refer to the [Formula 1 Racing Data](https://www.kaggle.com/datasets/jtrotman/formula-1-race-data) for complete details on each of the columns in the dataset. **Tip:** Right-click the link to open the link in a new tab.

   Review the following features:

   - **grid** represents the starting position of the driver for that specific race determined by a qualifying session held before the race.
   - **momentum_3** represents the 3-race rolling average of the finishing position, points scored, and consistency metrics to capture recent form and performance trends.
   - **hist_track_points** represents the average finishing position, podium rate, DNF rate at specific circuits to leverage driver familiarity and past performance at each track.
   - **driver_age** represents a computation from driver's date of birth and race date to capture driver experience and performance correlation with age.

   The following table compares the features.

   | Metric | Feature Type | Focus | Use Case |
   | :--- | :--- | :--- | :--- |
   | **grid** | Raw / Discrete | Qualifying Speed | Predicting the final result based on starting advantage; calculating "positions gained." |
   | **momentum_3** | Derived / Rolling | Recent Form | Capturing a driver's "hot streak" or recent technical upgrades to the car over the last three races. |
   | **hist_track_points** | Derived / Aggregated | Circuit Expertise | Identifying "track specialists" and predicting performance based on driver familiarity with specific layouts. |
   | **driver_age** | Computed / Temporal | Experience Level | Analyzing the correlation between physical maturity/experience and race-day decision-making or fatigue. |

   Notice that there are created features. Applying a transformation to a column can increase the feature importance, and therefore improves the transformation relative to the others.

1. To save this pipeline as a model, click **Save as**.

   1. Select **Model** as the asset type.

   1. Accept the default model name.

   1. Click **Create**.

The following image shows the model details.

<img src="images/autoai-f1-driver-position-model.png">

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

<img src="images/f1-driver-position-promote-to-space-csv-files.png">

[Back to the top](#top)

## Task 7b: Promote the model to a deployment space

1. Close the windows to return to the *Experiment summary* page.
1. Click the project name to return to the _Assets_ tab.
2. Select the regression model.
3. Click **Promote to space**.
4. For the _Target space_, select an existing space.
5. Select the **Go to the model space after promoting it** option.
5. Click **Promote**.

The following image shows the model to be promoted to the space.

<img src="images/f1-driver-position-promote-to-space.png">

[Back to the top](#top)

## Task 7c: Create a model deployment

1. Click **New deployment**.
2. For the _Deployment type_, select **Online**.
3. Type a name for the deployment; for example:
   ```
   F1 driver position predictions
   ```
4. Click **Create**, and wait for the model to be deployed.
5. When the _Status_ changes to **Deployed**, click the deployment name.

The following image shows the model deployment in the space.

<img src="images/f1-racing-model-deployment.png">

[Back to the top](#top)

## Task 7d: Test the deployed model

1. On the _API reference_ tab, review the endpoints and code snippets to incorporate this deployed model in your application.
1. Click the **Test** tab.
1. On the **Text** tab, click the **Options** icon ![Options](images/overflow-menu.svg "Options"), and then select **Search in space**.
    1. Select **Data asset > f1_resultsFrom25_testing.csv**.
    2. Click **Confirm**.
1. Click **Predict**.
1. On the *Prediction results* page, select **Show input data**.
1. Review the predicted final position for each driver.

1. When you are done, close the *Prediction results* page.

The following image shows the test results. In the Part 2 of this lab, you create a binary classification model to predict if each driver will finish on the podium.

<img src="images/f1-racing-test-driver-position.png">

[Back to the top](#top)

<a name="part02"></a>

<img src="images/f1-part02.png">

In this part of the lab, you use the full data set to build, deploy, and test a binary classification model to predict if the driver will finish on the podium.

<a name="task08"></a>

# Task 8: Build a binary classification machine learning model

You use the <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/autoai-overview.html?context=wx">AutoAI tool</a> to build a machine learning model. Follow these steps to build a binary classification model with the AutoAI tool to predict if the driver will finish on the podium using the `f1_resultsTill24_IsPodium.csv` dataset and the `is_podium` for the column to predict:

## Task 8a: Create the experiment

1. Click **IBM watsonx** in the banner to return to the home screen.

1. Scroll the *Projects* section, and open the **AI in sports** project.

1. From the *Assets* tab, click **New asset > Work with models > Build machine learning or RAG solutions automatically**.

1. On the *Build machine learning models automatically* page, select **Build a machine learning model**, and click **Next**.

1. For the *Name*, type the following text:

   ```
   F1 racing experiment, podium
   ```

1. Confirm that your machine learning service instance that you associated with your project is selected in the *watsonx.ai Runtime service instance* field.

1. Click **Create**, and wait for the AutoAI experiment interface to display.

The following image shows the AutoAI experiment builder.

<img src="images/autoai-f1-create-experiment-podium.png">

[Back to the top](#top)

## Task 8b: Add the training data to the experiment

1. To add the training data to the experiment, click **Select from project**.

1. Select **Data asset > f1_resultsTill24_IsPodium.csv**, and click **Select asset**.

1. To view the training data, click the **Options** icon ![Options](images/overflow-menu.svg "Options"), and then select **Preview data**.

1. Scroll to the right to see the *is_podium* column. This column indicates if the driver finished on the podium. The `is_podium` is used as the prediction column for this experiment.

1. Click **Cancel** to close the data preview.

The following image shows the data preview.

<img src="images/autoai-f1-podium-data-preview.png">

[Back to the top](#top)

## Task 8c: Configure the experiment

1. For the *Create a time series analysis?* field, select **No**.

1. For the *What do you want to predict?* field, select **is_podium**.

1. Click **Experiment settings** to view the *Prediction* panel.

1. For the *Prediction type*, **Binary** is selected. Use binary to classify data into categories. Choose this if your prediction column contains two distinct categories.

1. For the *Optimized metric*, **Accuracy** is selected.

1. Review the *Algorithms to include* section. Hover over each of the algorithms to see a description.

1. In the *Algorithms to use* section, **2** is selected as the number of top algorithms to apply.

1. Click the **Data source** panel.

1. Scroll to the *Training and holdout method* section to verify how the experiment splits the training data. 90% is used for creating, optimizing, and validating the candidate pipelines, 10% is used for calculating the performance metrics.

1. Since you didn't make any changes, click **Cancel**.

The following image shows the configured experiment.

<img src="images/autoai-f1-podium-settings.png">

[Back to the top](#top)

## Task 8d: Run the AutoAI experiment

1. Click **Run experiment**, and wait for the *Relationship map* and *Pipeline leaderboard* to populate.

1. When the experiment completes, explore the *Relationship map* by hovering over each of the pipelines.

1. Click the **Legend** icon ![Legend](images/legend.svg "Legend"), and hover over each item in the legend to see that item on the *Relationship map*.

1. Click the **Rank preferences** icon ![Rank preferences](images/parameters.svg "Rank preferences"), and change the *Score type* to **Holdout**.

The following image shows the completed experiment.

<img src="images/autoai-f1-podium-map.png">

[Back to the top](#top)

<a name="task09"></a>

## Task 9: Explore and save a pipeline

Now that the experiment run is completed, follow these steps to explore the pipelines and save the model:

1. In the *Pipeline leaderboard*, select the top performing pipeline with the highest accuracy score for holdout data.

1. On the *Pipeline details* page, select **Feature summary**. Review the most important features.

1. To save this pipeline as a model, click **Save as**.

   1. Select **Model** as the asset type.

   1. Accept the default model name.

   1. Click **Create**.

The following image shows the model details.

<img src="images/autoai-f1-podium-model.png">

[Back to the top](#top)

<a name="task10"></a>

# Task 10: Deploy and test the model

Now that you saved the best performing model to the project, follow these steps to deploy and test the model.

## Task 10a: Promote the model to a deployment space

1. Back on the _Assets_ tab, open the model.
2. Review the AI factsheet containing the relevant data about the model.
3. Click the **Promote to space** icon ![Promote to space](images/promote.svg "Promote to space").
4. For the _Target space_, select the same deployment space where the datasets were promoted.
5. Select the **Go to the model space after promoting it** option.
6. Click **Promote**.

The following image shows the *Promote to space* page with the model selected.

<img src="images/f1-podium-promote-to-space-model.png">

[Back to the top](#top)

## Task 10b: Create a model deployment

1. Click **New deployment**.
2. For the _Deployment type_, select **Online**.
3. Type a name for the deployment; for example:
   ```
   F1 podium predictions
   ```
4. Click **Create**, and wait for the model to be deployed.
5. When the _Status_ changes to **Deployed**, click the deployment name.

The following image shows the model deployment.

<img src="images/f1-podium-model-deployment.png">

[Back to the top](#top)

## Task 10c: Test the deployed model

1. On the _API reference_ tab, review the endpoints and code snippets to incorporate this deployed model in your application.
1. Click the **Test** tab.
1. On the **Text** tab, click the **Options** icon ![Options](images/overflow-menu.svg "Options"), and then select **Search in space**.
    1. Select **Data asset > f1_resultsFrom25_testing.csv**.
    2. Click **Confirm**.
1. Click **Predict**.
1. On the *Prediction results* page, select **Show input data**.
1. Review the predictions and confidence score for each driver. 1 indicates that the driver finishes on the podium, and 0 indicates that the driver does not finish on the podium. 
1. When you are done, close the *Prediction results* page.

The following image shows the test results.

<img src="images/f1-podium-test.png">

[Back to the top](#top)

<a name="part03"></a>

<img src="images/f1-part03.png">

In this part of the lab, you use the full data set to build, deploy, and test a regression model to predict the points awarded to each driver.

<a name="option1"></a>

# Option 1: Build, deploy, and test a model by using a Jupyter notebook

<a name="task11"></a>

# Task 11: Create the notebook

You can use Python code in a Jupyter notebook along with the watsonx.ai API to build, deploy, and test a model. Follow these steps to create the notebook.

1. Click **IBM watsonx** in the banner to return to the home screen.

1. Scroll the *Projects* section, and open the **AI in sports** project.

1. From *Assets* tab, click **New asset > Work with models > Work with data and models in Python or R notebooks**.

1. Select **From URL** to import a notebook from a GitHub repository.

1. In the *Notebook URL* field, paste the following URL:

   ```
   https://raw.github.ibm.com/Sharyn-Richard1/labs/refs/heads/main/ai-in-sports/data/f1-race/F1-racing-predict-driver-points.ipynb?token=GHSAT0AAAAAAAC6TG6P3AWIJYCMGTD3YHKQ2PICHJA
   ```

1. For the *Name*, type:

   ```
   Predict driver's points
   ```

1. Click **Create**.

The following image shows notebook opened in edit mode.

<img src="images/f1-points-notebook.png">

[Back to the top](#top)

<a name="task12"></a>

# Task 12: Run the notebook

The notebook contains comments and instructions on how to edit the cells before running the code. Follow these steps to run the notebook:

## Set up the project information

1. Click inside the empty cell. 

1. Click the **Options** icon ![Options](images/overflow-menu.svg "Options"), and then select **Insert project token**.

1. Run the cell.

## Read and explore data

1. Click inside the empty cell.
1. Click the **Code Snippets** icon.
2. Select **Read data**.
3. Click **Select data from project**.
4. Select **Data asset > f1_resultsTill24_points.csv**.
5. Click **Select**.
6. For *Load as*, select **pandas DataFrame**.
7. Click **Insert code to cell**.
8. Change the name of the dataframe from *df_1* to **data_df** to match the rest of the code in this notebook.
1. Run the two cells in ths section.

## Build a model

1. Run the cell in the *Prepare the data* section to define the features to use to train the model using the training data, and split the data into training and holdout data.

1. Run the cell in the *Train the model* section to initialize the Snap Random Forest Regressor and train the model.

1. Run the cell in the *Evaluate the trained model* section to use the holdout data to make predictions and determine the accuracy of those predictions.

1. Run the cell in the *View the feature summary* section to see the most important features used to train the model.

## Test the model

1. In the *Load some testing data* section, click inside the empty cell.
   1. Click the **Code Snippets** icon.
   2. Select **Read data**.
   3. Click **Select data from project**.
   4. Select **Data asset > f1_resultsFrom25_testing.csv**.
   5. Click **Select**.
   6. For *Load as*, select **pandas DataFrame**.
   7. Click **Insert code to cell**.
   8. Change the name of the dataframe to **test_df** to match the rest of the code in this notebook.
   1. Run the cell.

1. Run the cell in the *Select the features in the test data* section to identify the same features in the test data that were used in the training data.

1. Run the cell in the *Generate the predictions* section to generate the predictions using the test data.

## Publish the model

1. Run the three cells in the *Set up the credentials* section to pass your API key for authentication.

1. Run the three cells in the *Set up the model metadata* section to specify the model name, deployment name, and software specifications for storing the model.

1. Run the three cells in the *Set the deployment space* section to list the current deployment spaces so you can easily locate the space ID.

1. Run the cell in the *Store the model* section to save the model to the model repository.

1. Run the cell in the *Deploy and score* section to deploy the model to the specified deployment space.

1. Run the five cells in the *Score the model* section to identify the same features list in the testing data, format the test data as a scoring payload, and then send the scoring request.

The following image shows the test results.

<img src="images/f1-points-notebook-test.png">

[Back to the top](#top)

<a name="option2"></a>

# Option 2: Build, deploy, and test a model by using AutoAI

<a name="task13"></a>

# Task 13: Build a regression machine learning model

You use the <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/autoai-overview.html?context=wx">AutoAI tool</a> to build a regression model. Follow these steps to build a regression model with the AutoAI tool to predict the points awarded to each driver using the `f1_resultsTill24_points.csv` dataset and the `points` for the column to predict:

## Task 13a: Create the experiment

1. Click **IBM watsonx** in the banner to return to the home screen.

1. Scroll the *Projects* section, and open the **AI in sports** project.

1. From the *Assets* tab, click **New asset > Work with models > Build machine learning or RAG solutions automatically**.

1. On the *Build machine learning models automatically* page, select **Build a machine learning model**, and click **Next**.

1. For the *Name*, type the following text:

   ```
   F1 racing experiment, driver points
   ```

1. Confirm that your machine learning service instance that you associated with your project is selected in the *watsonx.ai Runtime service instance* field.

1. Click **Create**, and wait for the AutoAI experiment interface to display.

The following image shows the AutoAI experiment.

<img src="images/autoai-f1-create-experiment-points.png">

[Back to the top](#top)

## Task 13b: Add the training data to the experiment

1. To add the training data to the experiment, click **Select from project**.

1. Select **Data asset > f1_resultsTill24_points.csv**, and click **Select asset**.

1. To view the training data, click the **Options** icon ![Options](images/overflow-menu.svg "Options"), and then select **Preview data**.

1. Scroll to the right to see the *points* column. This column indicates the driver's final awarded points. The `points` is used as the prediction column for this experiment.

1. Click **Cancel** to close the data preview.

The following image shows the data preview.

<img src="images/autoai-f1-points-data-preview.png">

[Back to the top](#top)

## Task 13c: Configure the experiment

1. For the *Create a time series analysis?* field, select **No**.

1. For the *What do you want to predict?* field, select **points**.

1. Click **Experiment settings** to view the *Prediction* panel.

1. For the *Prediction type*, **Regression** is selected. Use regression to predict values from a continuous set of values. Regression is a good choice if your prediction column contains many values.

1. For the *Optimized metric*, **Root mean squared error** is selected. The metrics calculates the square root of the mean of the squared differences between the actual values and predicted values.

1. Review the *Algorithms to include* section. Hover over each of the algorithms to see a description.

1. In the *Algorithms to use* section, **2** is selected as the number of top algorithms to apply.

1. Click the **Data source** panel.

1. Scroll to the *Training and holdout method* section to verify how the experiment splits the training data. 90% is used for creating, optimizing, and validating the candidate pipelines, 10% is used for calculating the performance metrics.

1. Since you didn't make any changes, click **Cancel**.

The following image shows the configured experiment.

<img src="images/autoai-f1-points-settings.png">

[Back to the top](#top)

## Task 13d: Run the AutoAI experiment

1. Click **Run experiment**, and wait for the *Relationship map* and *Pipeline leaderboard* to populate.

1. When the experiment completes, explore the *Relationship map* by hovering over each of the pipelines.

1. Click the **Legend** icon ![Legend](images/legend.svg "Legend"), and hover over each item in the legend to see that item on the *Relationship map*.

1. Click the **Rank preferences** icon ![Rank preferences](images/parameters.svg "Rank preferences"), and change the *Score type* to **Holdout**.

The following image shows the completed experiment.

<img src="images/autoai-f1-points-map.png">

[Back to the top](#top)

<a name="task14"></a>

## Task 14: Explore and save a pipeline

Now that the experiment run is completed, follow these steps to explore the pipelines and save the model:

1. In the *Pipeline leaderboard*, select the top performing pipeline with the lowest RMSE score for holdout data.

1. On the *Pipeline details* page, select **Feature summary**. Refer to the [Formula 1 Racing Data](https://www.kaggle.com/datasets/jtrotman/formula-1-race-data) for complete details on each of the columns in the dataset. **Tip:** Right-click the link to open the link in a new tab. Review the most important features.

1. To save this pipeline as a model, click **Save as**.

   1. Select **Model** as the asset type.

   1. Accept the default model name.

   1. Click **Create**.

The following image shows the model details.

<img src="images/autoai-f1-points-model.png">

[Back to the top](#top)

<a name="task15"></a>

# Task 15: Deploy and test the model

Now that you saved the best performing model to the project, follow these steps to deploy and test the model.

## Task 15a: Promote the model to a deployment space

1. Close the windows to return to the *Experiment summary* page.
1. Click the project name to return to the _Assets_ tab.
2. Select the regression model.
3. Click **Promote to space**.
4. For the _Target space_, select an existing space.
5. Select the **Go to the model space after promoting it** option.
5. Click **Promote**.

The following image shows the model to be promoted to the space.

<img src="images/f1-points-promote-to-space.png">

[Back to the top](#top)

## Task 15b: Create a model deployment

1. Click **New deployment**.
2. For the _Deployment type_, select **Online**.
3. Type a name for the deployment; for example:
   ```
   F1 driver points predictions
   ```
4. Click **Create**, and wait for the model to be deployed.
5. When the _Status_ changes to **Deployed**, click the deployment name.

The following image shows the model deployment in the space.

<img src="images/f1-racing-points-model-deployment.png">

[Back to the top](#top)

## Task 15c: Test the deployed model

1. On the _API reference_ tab, review the endpoints and code snippets to incorporate this deployed model in your application.
1. Click the **Test** tab.
1. On the **Text** tab, click the **Options** icon ![Options](images/overflow-menu.svg "Options"), and then select **Search in space**.
    1. Select **Data asset > f1_resultsFrom25_testing.csv**.
    2. Click **Confirm**.
1. Click **Predict**.
1. On the *Prediction results* page, select **Show input data**.
1. Review the predicted final points awarded to each driver.
1. When you are done, close the *Prediction results* page.

The following image shows the test results. In the Part 2 of this lab, you create a binary classification model to predict if each driver will finish on the podium.

<img src="images/f1-racing-test-points.png">

[Back to the top](#top)

# Summary
In this lab, you learned how to complete the following tasks:

- Build a machine learning model to predict outcomes.
- Deploy and test the machine learning model.

# Additional resources

**Tip:** Right-click the links to open each of them in a new tab.

- Try <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/quickstart-tutorials.html?context=wx" target="_blank">watsonx quick start tutorials</a>.
- View <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-models.html?context=wx" target="_blank">supported foundation models in watsonx.ai</a>
- View more <a href="https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/videos-wx.html?context=wx" target="_blank">videos</a>
- Read an [overview of watsonx](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/overview-wx.html?context=wx)
- Find sample datasets, projects, models, prompts, and notebooks in the Resource Hub to gain hands-on experience:

   ![Notebook](../watsonx/images/notebook.svg "Notebook") [Notebooks](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=notebook) that you can add to your project to get started analyzing data and building models.

   ![Project](../watsonx/images/ibm-cloud--projects.svg "Project") [Projects](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=project-template) that you can import containing notebooks, datasets, prompts, and other assets.

   ![Data sets](../watsonx/images/data--set--32.svg "Data sets") [Datasets](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=dataset) that you can add to your project to refine, analyze, and build models.

   ![Prompt](../watsonx/images/prompt.svg "Prompt") [Prompts](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=example-prompt) that you can use in the Prompt Lab to prompt a foundation model.

   ![Model](../watsonx/images/model.svg "Model") [Foundation models](https://dataplatform.cloud.ibm.com/gallery?context=wx&format=foundation-model) that you can use in the Prompt Lab.
