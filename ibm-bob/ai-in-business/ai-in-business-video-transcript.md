# Video transcript for *Lab: AI in Business - Build a Social Listening Dashboard with IBM Bob*

This video shows you how to use IBM Bob to build a social listening dashboard for a small business.
To complete this lab, you need to sign up for an IBM Bob trial account. If you don't have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

You will also need a free Mistral AI account. Create one at console.mistral.ai. Email and phone verification are required, but no credit card. Create an API key to use later.

Now choose a folder location for the lab work. Download the data zip file into that folder. In Bob, open a terminal window and change directory into that folder. Then execute the commands to create a project subfolder and unzip the data files into it. When that's done, open the ai-in-business folder in Bob.

Before you can build the application, you need a few tools installed inside a virtual environment. Prompt Bob to create a Python virtual environment and install several libraries into it.

The application connects to Mistral's API, so you need to store your API key securely in a dot-env file. Replace the placeholder text with the key you copied from the Mistral console, and run the command in the terminal.

Now you are ready to create the starter application. Prompt Bob to create a Streamlit app that loads both data files, displays a header with the business name and search term, and shows a metrics row; all built from a single CONFIG dictionary so that every later step stays consistent. When Bob is done, activate the virtual environment and run the app, then navigate to the provided URL to see the starter application.

This task connects to the Mistral language model and scores every post for sentiment; how the author feels, and intent, what kind of post it is. The results are cached to a JSON file so the API is only called once per dataset. When Bob is done, refresh the browser and watch the progress bar on the first load. The second load should be instantaneous.

This task adds the core business logic of the dashboard. Every post is tagged with a competitor name if one is mentioned, and then routed into exactly one of six action queues. The order of the routing rules matters: each post lands in the first queue whose conditions it meets. When Bob is done, refresh the browser and explore the six queue tabs.

This task turns the queues from labels into a to-do list. Each post in the Escalate, Respond, and Amplify queues gets two buttons: Handled and Not relevant. And the triage state is saved so it survives browser refreshes and app restarts. When Bob is done, refresh the browser and test the triage buttons.

This task brings in the second data source. News headlines provide market context. They are tagged with competitor names and displayed newest-first so you can read the season's calendar at a glance. When Bob is done, refresh the browser. Notice that Starbucks dominates the headlines, and you can trace exactly when each chain launched its fall menu.

This task turns the dashboard from a snapshot into a workflow. A date range control in the sidebar lets you narrow the view to any range within the data, and a Compared to the previous period line shows how the numbers changed. Try dragging the end date back to September 7, then forward to September 8. The Competitor promo tab grows by five posts when Dunkin's giveaway lands in the data.

The final task turns the dashboard's analysis into a hand-off document. Click “Download weekly brief” in the sidebar to generate a Markdown file the café owner can read and act on without ever opening the dashboard. When you are done, press CTRL+C in the terminal window to stop the application.

In this lab, you built a social listening dashboard that scores social posts for sentiment and intent, routes every post into an action queue, lets you triage those queues, tracks week-over-week movement, and exports a weekly brief for the café owner. Refer to the lab guide for complete details.