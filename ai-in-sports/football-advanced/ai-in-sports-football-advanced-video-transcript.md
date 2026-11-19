# Video transcript for *Lab: AI in Sports - Prompt IBM Bob for Implementation and Design Approaches*

This lab demonstrates how to ask IBM Bob for recommended approaches to implement enhanced features in a dashboard application that displays football player information.

In this lab, you will add features to an existing player dashboard. The first feature makes the player’s picture clickable to see their details. The second feature makes the team generator smarter by building realistic team formations. The third feature add a dropdown list to switch between different formations.

To complete this lab, you need to sign up for an IBM Bob trial account. If you don’t have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

After signing in to Bob, switch to Agent mode in order to prompt Bob to help you set up the environment with Node.js, Yarn, and Git. Bob will verify if you already have the prerequisites installed, and ask you if want to install any prerequisites that you don’t currently have installed. For all of the prompts in this lab, Bob will prompt you to approve as required.

The football-player-dashboard starter project is based on the template-carbon-react pre-built starter project, and modified to create a professional-looking football player dashboard  application. Download the zipped application from the lab guide. Then in Bob’s terminal, unzip the application into the folder of your choice. 

When that’s done, open the folder to see the project structure. Finally, ask Bob to verify your working directory. Now you are ready to get started enhancing the application.

This lab uses real player data from the API-Football service. Next, visit the API Football site, and create a free account. After signing in, view your account details to view and copy your API key.

In Bob, edit the .env file, and replace your_api_key_here with the actual API key you copied from API-Football in the previous step, and save the file.

Now you are ready to ask Bob to explore the existing codebase. What does the app do? What features have already been implemented in the application?  What can be done next? Please point out any areas that need particular attention?

When Bob completes the task, you might see critical errors. Ask Bob to fix any critical issues discovered during the exploration of the codebase.

Now you can explore the starter application. If Yarn wasn’t installed, then manually install it using the terminal, and start the application in a browser. Test the application by selecting several different players to see their statistics, and then create several team formations. A basic football field displays with 11 player photos arranged in formation.

Next, you want to provide Bob with the scope of the features that you want to implement, and let Bob create a To Do list for you. It looks like you are ready to implement the first feature: clickable player statistics. Return to the application in the browser. Now when you click a player’s photo on the generated team, you see that player’s statistics. 

For the next feature, the first step is to determine which team formations are realistic. Since Bob knows the scope of the three features, it can consider the third feature when responding.

Bob can accomplish building realistic team formations using multiple approaches. Prompt Bob for recommendations before implementing the feature.

Select one of the recommended approaches, and then prompt Bob to implement the feature, providing some specific details. Return to the application in the browser to see the new button to generate a dream team.

For the last feature, you want to add a dropdown list for the user to select a formation before generating their dream team. Prompt Bob for the most popular and most competitive formations.

Then prompt Bob to implement the feature using the most popular formations. Return to the application in the browser to see the new dropdown list. Select a formation, and then generate a dream team.

With all of the features implemented, use the grill-me skill to revisit the application to make sure that it meets your needs. Read and respond to Bob’s questions. Bob might find anomalies or recommend modifications, and prompt you to choose from options.

You can ask Bob to create a project plan for the next implementation phase. Bob might ask you about your architectural decisions, and make recommendations based on your decisions. Bob might suggest that you have extraneous code that can be removed safely without affecting the application. Here Bob is asking about changes to the user interface. Since Bob is doing a deep dive, it has insights into the data and how to best represent it in the application. When you’re not sure how to respond, you can ask Bob for recommendations.

At the end of the session, Bob provides a summary. You've now completed a enhanced Player Dashboard with clickable player photos, realistic team formations, and a feature to select different team formations. Refer back to the lab guide for complete instructions.