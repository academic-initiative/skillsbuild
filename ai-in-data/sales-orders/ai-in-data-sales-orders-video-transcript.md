# Video transcript for *Lab: AI in Data - Build an Interactive Sales Orders Dashboard with IBM Bob*

This video shows you how to use IBM Bob to build a sales orders intelligence dashboard for enterprise operations.

Modern enterprise data teams deal with fragmented records spread across multiple source systems. In this lab, you act as an Enterprise Data and Operations Analyst who needs to connect three separate CSV exports into a single unified dataset, and then turn that dataset into an executive-ready web dashboard without manually writing code. IBM Bob handles the technical details while you focus on what you want the application to do.

To complete this lab, you need to sign up for an IBM Bob trial account. If you don't have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

Choose a folder location for the lab work. Download the zip file containing the CSV datasets into that folder. In Bob, open a terminal window and change directory into that folder. Then execute the commands to create a project subfolder and extract the three source CSV files into the data subdirectory. When that's done, open the ai-in-data-sales-orders folder in Bob.

Before you can build the pipeline and dashboard, you need to initialize a Node.js project and install two CSV libraries. Prompt Bob to set up the package.json file, install the dependencies, and create the required directory structure.

Now you are ready to build the data merge pipeline. This task prompts Bob to create a Node.js script that loads all three CSV files, builds in-memory lookup maps for customers and sales representatives, joins every order record with its corresponding customer and sales rep data, strips sensitive PII fields, and writes the consolidated 18-column dataset to a new file. When Bob is done, check the console output to confirm that all orders were successfully merged.

With the merged dataset ready, you can now build the web dashboard. This task prompts Bob to create a clean, responsive single-page HTML dashboard that loads Papa Parse and Chart dot JS from CDN, fetches and parses the merged CSV file directly in the browser, and renders an executive header with dataset metadata. When Bob is done, serve the directory with a local web server and open the dashboard in your browser. Check the developer tools to confirm 8,333 records are loaded.

This task prompts Bob to compute key operational metrics from the loaded dataset and renders them as four responsive KPI summary cards at the top of the dashboard — Total Orders, Total Freight Charges, Unique Customers, and Active Sales Representatives. When Bob is done, refresh the browser and verify the cards show total orders, unique customers, and  active sales reps.

This task prompts Bob to add three interactive Chart.js visualizations to the dashboard. The first chart shows order volume broken down by sales territory. The second ranks the top 15 sales representatives by order count. The third is a horizontal bar chart highlighting the top 10 customers by year-to-date sales. When Bob is done, refresh the browser and hover over the bars to inspect the formatted tooltips.

This task prompts Bob to add an interactive, client-side searchable data table showing detailed order rows. As you type in the search box, the table instantly filters across customer names, sales rep names, territories, and order IDs in real time and the record counter updates. When Bob is done, refresh the browser and try typing a territory name like North East to see the instant filtering in action.

The final task prompts Bob to enhance the dashboard with three operational additions: a territory filter dropdown that coordinates with the search bar and recalculates the KPI cards, pagination controls so the browser renders smoothly across all rows, and a CSV export button that downloads the currently filtered dataset. When Bob is done, refresh the browser and try selecting a territory from the dropdown. Notice that the KPI cards automatically update based on the filter. Verify the Previous and Next page links. Search for a specific customer. Then click Export Filtered View to download the result. Notice that the exported CSV contains only the filtered data.

Now that you have a working dashboard, you can switch to plan mode and ask Bob to recommend enhancements and improvements to the data and dashboard. Bob prompts you to answer questions that should be addressed in the plan. When Bob is done, you can view the plan to see what improvements Bob recommends.

In this lab, you built an end-to-end sales intelligence data pipeline and operational dashboard. You used Node.js to merge three relational CSV exports, sanitized customer data by removing sensitive PII, loaded the dataset client-side with Papa Parse, displayed executive KPI metrics, visualized territory and sales performance with Chart dot JS, and delivered an interactive searchable and filterable orders portal. Refer to the lab guide for complete details.