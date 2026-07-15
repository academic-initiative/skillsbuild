# Build a DJ Application with IBM Bob

## Lab overview

Go from listener to creator; build a DJ mixing app that lets you mix tracks, add effects, and showcase your app development skills in a fun, interactive project.

This lab starts with a basic DeckFlow web application, a two-deck DJ mixer built on Web Audio and Elementary Audio (running as WASM in an AudioWorklet). In this lab, you use IBM Bob to add new features to the application based on a specification document.

IBM Bob is your AI development partner for the full software lifecycle, from planning to delivery. IBM Bob accelerates software development by automating complex, time‑consuming work, from building new features to modernizing legacy systems and strengthening secure delivery. Teams can ship high‑quality software with less effort and greater control over AI cost and outcomes.

## Learning objectives

After completing this lab, you should be able to:

- Create a comprehensive planning document.
- Implement features based on a specification document.
- Test the new features.
- Explore new features and potential pitfalls in the implementation plan.

## Vibe coding

Vibe coding is a modern approach to software development where you describe what you want in plain language, and AI tools generate the code for you. Instead of focusing on writing every line of code, developers focus on their intent, guiding and refining the AI’s output. This shift makes coding more flexible, faster, and accessible, especially for rapid prototyping and experimentation. Overall, it represents a move from syntax-driven coding to intent-driven, AI-assisted development.

Vibe coding is powerful for speed and creativity, but its weaknesses, such as poor structure, inconsistent quality, and limited understanding, make it hard to scale. As a result, teams naturally transition to spec-driven development, where clearer requirements guide both humans and AI toward more reliable, maintainable systems.

As projects grow in complexity, teams often move from vibe coding to spec-driven development, shifting from loosely defined prompts to clear, detailed specifications that guide both humans and AI toward better outcomes.

Spec-driven development is a more structured approach where requirements, constraints, and design details are clearly defined upfront. AI (or developers) then implement against those specifications, resulting in more reliable, maintainable systems. For this reason, this lab uses a specification document written by a developer with the assitance of AI.

For more information, see [Spec-driven Development with IBM Bob](https://heidloff.net/article/spec-driven-development-ibm-bob/).

## Estimated time

**75-90 minutes**

<a name="top"></a>

## Prerequisites

**Tip:** Right-click the following link, and open the page in a new tab.

Complete the prerequisite tasks of [Get started with IBM Bob](../ai-in-sports/get-started-with-ibm-bob.md)

***

## Contents

- [Task 1: Clone and open the starter project](#task01)
- [Task 2: Explore the codebase](#task02)
- [Task 3: Create an implementation plan](#task03)
- [Task 4: Explore the starting application](#task04)
- [Task 5: Implement the plan](#task05)
- [Task 6: Revisit the implementation plan](#task06)
- [Summary](#summary)
- [More resources](#additional-resources)

***

<a name="task01"></a>

## Task 1: Clone and open the starter project

The `dj-app` is a pre-built starter project that includes a basic DJ web application. Follow these steps to clone the repository as a starting point for the project:

Follow these steps to create a directory and open that directory in Bob:

1. Choose a folder location for the lab work.
1. Download the [dj-app.zip](dj-app.zip) from the IBM SkillsBuild GitHub repository to the folder you chose in step 1.
1. In IBM Bob, verify whether the terminal panel is visible. If you don't see a terminal panel, click **Terminal > New Terminal**.
1. Use the `cd` command in the terminal panel to move into that folder.
1. Execute the following commands to create the directory and unzip the repository.

   ```
   mkdir dj-app
   cd dj-app
   unzip ../dj-app.zip
   ```
1. Open the `dj-app` folder:
   1. Click **File > Open Folder**.
   1. Navigate to the `dj-app` folder.
   1. Click **Open**.

3. Review the project structure.


1. Verify that you are in *Ask* mode.

   <img src="images/bob-panel.png" alt="Modes panel" width="35%">

1. Copy and paste the following prompt to Bob and review the response:
    ```
    Hey Bob, What's my current working directory?
    ```
1. Verify that the working folder is correct.

[Back to the top](#top)

***

<a name="task02"></a>

## Task 2: Explore the codebase

Follow these steps to use Bob's Ask mode to explore the existing code base:

1. Click **New task**.

1. Switch to **Ask** mode.

1. Copy and paste the following prompt:

    ```
    Explore the codebase for this application.
    What does the app do? Based on the spec, which phases have already been implemented in the application? 
    What needs to be done next?
    Please point out any areas that need particular attention?
    ```

1. To confirm permission to read the files, click **Approve once** when prompted by Bob.

1. Review the results. Bob's response is similar to the following response:

   ![Explore codebase response](images/explore-codebase-response.png)

[Back to the top](#top)

***

<a name="task03"></a>

## Task 3: Create an implementation plan

Follow these steps to use Bob's Plan mode to create an implementation plan:

1. Click **New task**.

1. Switch to **Plan** mode.

1. Copy and paste the following prompt:

    ```
    Read the files in this folder.
    Then read the spec.md file to create a implementation plan for phase 4.
    The app is currently in the phase 3 stage.
    The implementation plan should add the phase 4 features to the existing phase 3 app.
    ```

1. To confirm permission to read the files, click **Approve once** when prompted by Bob.

1. Review the ToDo list, and then click **Approve once** when prompted by Bob.

1. Review the Phase 4 implementation plan details for the following features:
   - Tempo control
   - Cue point
   - Loop functionality
   - Visual markers
   
1. Copy and paste the following prompt:

    ```
    Create a high-level overview first, then detailed breakdowns for each feature (tempo, loops, cue, markers).
    Save the plan as implementation-plan.md in markdown format.
    ```
    
1. Review the ToDo list, and then click **Approve once** when prompted by Bob.


[Back to the top](#top)

***

<a name="task04"></a>

## Task 4: Explore the starting application

Follow these steps to explore the initial DJ web application:

1. Click **New task**.

1. Switch to **Agent** mode.

1. Copy and paste the following prompt:

    ```
    Start the app
    ```
1. To confirm permission to read the files and run the commands, click **Approve once** and **Run** when prompted by Bob.

1. When the server starts, click **Proceed While Running** to see the response, which includes the URL to launch the app:

   `The app is now running successfully!`

   `The development server is live at: http://localhost:5173/`

1. Create a music folder in your project, and then copy at least two audio files into the music folder.

1. Click the URL to explore the starting application.

1. Load the music tracks and experiment with the application.

The following image shows the initial application.

![Starting application](images/phase3-start.png)

[Back to the top](#top)

***

<a name="task05"></a>

## Task 5: Implement the plan

Follow these steps to implement each of the features in Phase 4:

### Feature 1: Implement tempo control

1. Click **New task**.

1. Copy and paste the following prompt:

    ```
    Implement the tempo control feature in the phase 4 implementation plan
    ```

1. Click **Approve once** when prompted by Bob to confirm permission to read, edit, and create files, and approve the proposed ToDo list.

1. Copy and paste the following prompt:

    ```
    Use the music in the music folder to test the implementation of this feature
    ```

1. Click **Approve once** when prompted.

1. Return to the web application, load the music tracks, and experiment with the tempo control.

The following image shows the tempo control feature implemented.

![Tempo control](images/phase4-feature1.png)

### Feature 2: Implement cue point

1. Click **New task**.

1. Copy and paste the following prompt:

    ```
    Implement the cue point feature in the phase 4 implementation plan
    ```

1. Click **Approve once** when prompted by Bob to confirm permission to read, edit, and create files, and approve the proposed ToDo list.

1. Copy and paste the following prompt:

    ```
    Use the music in the music folder to test the implementation of this feature
    ```

1. Click **Approve once** when prompted.

1. Return to the web application, load the music tracks, and experiment with the cue point feature.

The following image shows the cue point feature implemented.

![Cue point](images/phase4-feature2.png)

### Feature 3: Implement loop functionality

1. Click **New task**.

1. Copy and paste the following prompt:

    ```
    Implement the loop functionality feature in the phase 4 implementation plan
    ```

1. Click **Approve once** when prompted by Bob to confirm permission to read, edit, and create files, and approve the proposed ToDo list.

1. Copy and paste the following prompt:

    ```
    Use the music in the music folder to test the implementation of this feature
    ```

1. Click **Approve once** when prompted.

1. Return to the web application, load the music tracks, and experiment with the loop functionality feature.

The following image shows the loop functionality feature implemented.

![Loops](images/phase4-feature3.png)

### Feature 4: Implement visual markers

1. Click **New task**.

1. Copy and paste the following prompt:

    ```
    Implement the visual markers feature in the phase 4 implementation plan
    ```

1. Click **Approve once** when prompted by Bob to confirm permission to read, edit, and create files, and approve the proposed ToDo list.

1. Copy and paste the following prompt:

    ```
    Use the music in the music folder to test the implementation of this feature
    ```

1. Click **Approve once** when prompted.

1. Return to the web application, load the music tracks, and experiment with the visual markers feature.

The following image shows the visual markers feature implementation.

![Visual markers](images/phase4-feature4.png)

[Back to the top](#top)

***

<a name="task06"></a>

## Task 6: Revisit the implementation plan

Follow these steps to use the grill-me skill in Bob's Advanced mode to revisit the implementation plan to make sure that it meets your needs:

1. Click **New task**.

1. Switch to **Agent** mode.

1. Copy and paste the following prompt:

    ```
    I'd like you to grill me about this project plan.
    ```

1. Click **Approve once** when prompted by Bob to confirm permission to read, edit, and create files, and approve the proposed ToDo list.

1. Read and respond to the questions from Bob to revisit the implementation plan to make sure that meets your needs. Bob might find anomalies or recommend modifications, and prompt you to choose from options.

1. Review the results of the grilling session.

The following image shows an example of the results of the grilling session.

![Grilling complete](images/grilling.png)

[Back to the top](#top)

***

<a name="summary"></a>

## Summary

In this lab, you started with a basic DeckFlow web application, a two-deck DJ mixer built on Web Audio and Elementary Audio (running as WASM in an AudioWorklet). You used IBM Bob to add four new features to the application based on a specification document.


### What you learned

Now that you completed this lab, you should be able to:
- Create a comprehensive planning document.
- Implement more features based on a specification document.
- Test the new features.
- Explore new features and potential pitfalls in the implementation plan.

***

<a name="additional-resources"></a>

## More resources

- [IBM Bob documentation](https://bob.ibm.com/docs)

[Back to the top](#top)
