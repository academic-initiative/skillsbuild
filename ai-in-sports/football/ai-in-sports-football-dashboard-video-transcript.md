# Video transcript for *Lab: AI in Sports - Build a Football Player Dashboard with IBM Bob*

This lab demonstrates how to use IBM Bob to create an interactive dashboard application that displays football player information.

The application includes the following features:
- A player browser where you can select players and view their statistics
- AI-generated player descriptions based only on real data (no guessing or made-up information)
- A team formation view that displays players in their positions on the field
- A clean, professional interface with multiple pages

This lab uses real player data from the API-Football service. 

To complete this lab, you need to sign up for an IBM Bob trial account. If you don’t have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

After signing in to Bob, switch to Agent mode in order to prompt Bob to help you set up the environment with Node.js, Yarn, and Git. Bob will verify if you already have the prerequisites installed, and ask you if want to install any prerequisites that you don’t currently have installed. For all of the prompts in this lab, Bob will prompt you to approve, run, and save, as required.

If Yarn wasn’t installed, then manually install it using the terminal.

Now you are aready to clone the repository containing the carbon react template. When that’s complete, open the template-carbon-react folder. Now start the react app in a browser.

Next, visit the API Football site, and create a free account. After signing in, view your account details to view and copy your API key.

Before using your API key in the application, you need to store it securely. You will prompt Bob to create 3 files. The env file is a special file that stores sensitive information (like your API key) separately from your code. The gitignore file tells Git which files to ignore when sharing code, so your API key stays private. The dotenv file is a tool that helps your application read the API key from the .env file.

After Bob creates the files, edit the env file to replace your_api_key_here with the actual API key you copied from API-Football, and save the file.

Now you'll create a script that automatically downloads player information from API-Football and saves it to your project. Think of this as a one-time download that gets all the player data you need. This prompt asks Bob to connect to API-Football using your API key for authentication, download information about players from the Premier League (2024 season), extract the specific details you need (name, photo, position, age, etc.), save the data in a format your application can use, and store it in a file called players.json. When the tasks are complete, you should see a success message.

The starter template you downloaded includes many features you don't need for this lab - like a complex navigation menu, extra pages, and styling files. Let's remove these unnecessary parts to create a clean, simple starting point for our player dashboard. This prompt asks Bob to remove extra folders and files that add complexity, simplify the main application to just show a basic header, and clean up the styling to keep it minimal. After Bob makes these changes, refresh your browser to see the simplified application. You should see a clean page with just the Player dashboard header.

Next, you will add the first interactive feature to your application - a dropdown menu that lets you select a player from the list. This prompt asks Bob to install a tool that helps write better code (TypeScript), create a new dropdown component using the Carbon Design System, connect it to your player data, and add it to your application page. When that’s done, refresh the browser to see the dropdown menu with player names, and information about the selected player. Refer to the lab instructions if you need to troubleshoot any errors.

Now that you can select a player, let's display their detailed information in a nice card format. This prompt asks Bob to create a new card component to display player information, add it to your application below the dropdown, and connect it so it updates when you select different players. After Bob completes the changes, you may need to restart the application to see the new component.

Now, test the player statistics card. Select a player from the dropdown to see the player's photo and statistics display. When you select different players - the information update. The dash indicates missing information.

Next, you will implement grounded AI. By comparing external sources like Wikipedia against your own private data, you will discover grounding—the most critical concept in AI. This hands-on process demonstrates exactly why controlling your data sources is essential for accuracy. This prompt tells Bob to create a feature that fetches player information from Wikipedia so you can see what happens when you use external data sources. When Bob is done, refresh the browser or restart yarn.

Select several players from your dataset and observe what happens. For most players, you’ll see "No information found" or error messages. This happens because Wikipedia doesn't recognize abbreviated names. For some players, you’ll see career achievements and trophies, and so on. Notice that the results are inconsistent. When data displays, it includes information NOT in your dataset, you have no control over what Wikipedia shows, and no form rating information is displayed. Wikipedia has much more information than your dataset, and not all of that information is relevant. That’s were grounding comes in. This prompt tells Bob to only use your dataset. When Bob is done, refresh the browser or restart yarn.

Now retest the application to see much better results.  Every player now has a summary, the form rating is now included, all information comes from your dataset only, and is displayed in a consistent format for all players.

This final task creates an interactive football field display that shows 11 randomly selected players positioned on a realistic football pitch using their actual photos. Users can click a button to generate different random team formations. This prompt asks Bob to create the visual football field display that shows player photos arranged in a football formation.

This next prompt tells Bob to create a helper function that randomly picks 11 players from the full list of available players.

This prompt adds a navigation menu at the top of the application and creates a second page for the team formation visualizer, allowing users to switch between viewing individual players and viewing team formations. When Bob is done, refresh the browser to test the new feature.

This prompt upgrades the football field to look more realistic by adding professional pitch markings like you'd see on a real football field, including penalty areas, corner arcs, and goal indicators. When Bob is done, refresh the browser to verify that everything works correctly and looks professional. Generate several random teams to see the results.

You've now completed a full Player Dashboard with individual player analysis with AI-generated summaries, professional team formation visualization on a realistic football pitch, clean navigation between different application views. Refer back to the lab instructions for additional challenges to try out on your own.