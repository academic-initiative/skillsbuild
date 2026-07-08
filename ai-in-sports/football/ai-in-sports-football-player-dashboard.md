![Build a Football Player Dashboard with IBM Bob](images/player-dashboard-lab-title.png)

## Overview

Turn your passion for football into a hands-on AI experience; build an interactive app that lets you explore player stats in real time and uncover insights that make every game even more exciting.

In this lab, you'll use IBM Bob to create a web application that displays player information in an easy-to-understand format. You'll work with player data and guide IBM Bob using simple instructions to build different parts of your application, organize the data, and create helpful summaries.

The goal of this lab is to show you how AI can help you build applications, even if you're not an expert programmer. You'll learn how to give clear instructions to IBM Bob, set boundaries for what you want, and use real player data to get accurate results. By the end of the lab, you'll have a working application where users can explore player information, see interesting insights, and view team formations.

![Build a Football Player Dashboard with IBM Bob](./images/football-board.png)

***

## Learning objectives

After completing this lab, you should be able to:

- Use IBM Bob to create and improve parts of your application using simple instructions.
- Write clear prompts to get the results you want.
- Build an interactive application that displays player data in a user-friendly way.
- Create grounded AI-powered summaries that only use the actual player information you have.
- Practice prompting to elicit the quality responses.


***

## About this lab

In this lab, you build a player dashboard; an interactive web application that shows how AI can help you explore and analyze player data.

The application includes the following features:

- A player browser where you can select players and view their statistics
- AI-generated player descriptions based only on real data (no guessing or made-up information)
- A team formation view that displays players in their positions on the field
- A clean, professional interface with multiple pages

Throughout the lab, you'll guide IBM Bob with clear instructions and specific requirements. IBM Bob will help you build the application using modern web technologies (like ReactJS for the interface) without any prerequisite knowledge of coding. IBM Bob handles the technical details. You'll focus on what you want the application to do, and IBM Bob will create it for you.

This approach ensures that everything the application shows is accurate, easy to understand, and based on real player data.

***

## Estimated time

**75-90 minutes**

***

## Dataset

This lab uses real player data from the **API-Football** service. You have two options to get the data:

- **Option A:** Fetch fresh data from the API using a simple script (recommended if you want the latest information)
- **Option B:** Use the pre-prepared backup file that's already included in the project at `src/data/players.json`


| Field | Description | Example |
|---|---|---|
| `name` | Full name of the player | "M. Akanji" |
| `photo` | Player photo URL | "https://media.api-sports.io/football/players/5.png" |
| `position` | Playing position | "Defender" |
| `age` | Player's current age | 30 |
| `citizenship` | Player's nationality | "Switzerland" |
| `height` | Height in centimeters | 188 |
| `club` | Player's current club | "Manchester City" |
| `form` | Recent performance rating (0–10) | 7.27931 |


<a name="top"></a>

***

## Prerequisites

**Tip:** Right-click the following link, and open the page in a new tab.

Complete the prerequisite tasks of [Get started with IBM Bob](../get-started-with-ibm-bob.md)

***

## Contents

- [Task 1: Set up your environment](#task01)
- [Task 2: Get player data](#task02)
- [Task 3: Build the player selector](#task03)
- [Task 4: Display player statistics](#task04)
- [Task 5: Implement Grounded AI (The Most Important Lesson)](#task05)
- [Task 6: Build a Team Formation Visualizer](#task06)
- [Extra Challenges](#challenges)
- [Summary](#summary)
- [Additional resources](#additional-resources)

***

# Preview the tutorial

Watch the following video to see a preview of the steps in this tutorial.

**Note:** Some user interface elements in the video might look different from your IBM Bob environment.

**Tip:** Right-click the following thumbnail image, and open the video in a new tab.

<a href="https://video.ibm.com/embed/channel/23669513/video/football-dashboard">![Video preview of tutorial](images/video-thumbnail-football.jpg "Video preview of tutorial")</a>

***

<a name="task01"></a>

## Task 1: Set up your environment

In this task, you clone the starter project, install dependencies, and confirm that the development server runs correctly.

### Task 1a: Activate Bob's Agent mode

IBM Bob has different modes for different tasks. For this lab, you'll use **Agent** mode, which helps you write and modify code.

1. Look for the Bob chat side panel.
2. Select **Agent** mode.

   ![IBM Bob panel](images/bob-panel.png)

You're now ready to start building with Bob!

### Task 1b: Install prerequisites with Bob's help

Before you can build the application, you need a few tools installed on your computer:
- **Node.js** - A program that lets you run JavaScript code on your computer (not just in a web browser)
- **Yarn** - A tool that helps download and manage the code libraries your application needs
- **Git** - A tool for downloading code from the internet and tracking changes to your files

Don't worry if you don't have these installed yet - IBM Bob will help you check and install them!

2. In Bob's chat panel, copy and paste the following prompt:

   ```text
   I need to set up a development environment for a React project. 
   Can you help me verify I have Node.js 18+, Yarn, and Git installed?

   If installed, notify me with the versions.
   If not installed, guide me through installation:
   1. First check if I'm using Mac or Windows.
   2. Detect which shell(s) I'm using (bash, zsh, etc.) and test commands in each to find where tools are available.
   3. Use the appropriate shell for all subsequent commands.
   4. Run the appropriate installation commands.
   5. Explain each command briefly before running it.
   6. Ask for my confirmation before executing each command.

   Note: On macOS, if tools like Homebrew are installed but not found in the default shell, try using interactive shell mode (e.g., `zsh -i -c 'command'`) to load the full environment profile.
   ```

   ![Bob Prompt One](./images/bob-prompt-1.png)

3. Follow Bob's guidance to verify or install the required tools.

### Task 1c: Clone and open the starter project

The `template-carbon-react` is a pre-built starter project that includes everything you need to create a professional-looking web application. It comes with IBM's Carbon Design System, which provides ready-to-use buttons, menus, forms, and other visual elements that look polished and work well together. Think of it as a template that saves you from designing everything from scratch.

1. In IBM Bob, verify if the terminal panel is visible. If you don't see a terminal panel, click **Terminal > New Terminal**.

2. In the terminal, copy and paste these commands to clone the starter project and open it:

   ```bash
   git clone https://github.com/IBM/template-carbon-react
   cd template-carbon-react
   ```

   ![Clone Repo](./images/clone-repo.png)

2. **Important:** In IBM Bob, click **File > Open Folder**, then open the `template-carbon-react` folder that you just cloned.

   This ensures all file paths in subsequent prompts work correctly.

3. Review the project structure:

   ```text
   template-carbon-react/
   ├── src/
   │   ├── App.jsx             ← Main application file
   │   ├── components/         ← Your components will go here
   │   └── content/            ← Template content (you'll modify this)
   ├── server/
   │   └── server.js           ← Express server
   ├── public/                 ← Static files
   └── package.json            ← Project dependencies
   ```

**Note:** You'll create additional folders like `data/` and `scripts/` as you progress through the lab.

### Task 1d: Install dependencies and start the app

1. Copy and paste these commands in Bob's terminal:

   ```bash
   yarn install
   yarn start:dev
   ```

   - `yarn install` downloads all the code libraries your application needs (this may take a minute)
   - `yarn start:dev` starts your application so you can view it in a web browser

   ![Install and Start](./images/install-and-start.png)


2. Open a browser, and navigate to the following URL:

   ```txt
      http://localhost:3000
   ```

   The Carbon React starter page displays.

![Starter App](./images/app-home-initial.png)

[Back to the top](#top)

***

<a name="task02"></a>

## Task 2: Get player data

In this task, you'll get the player data that your application will display. You have two ways to do this - choose whichever works better for you.

### Option A: Fetch live data (Recommended)

This option gets the latest player information directly from the API-Football service.

#### Step 2a: Get your API key

An API key is like a password that lets your application access the player data from API-Football.

**Tip:** Right-click the following link, and open the page in a new tab.

1. Visit [API-Football](https://www.api-football.com/) and create a free account.
2. After signing in, clik the **Account** icon ![Account icon](images/api-football-account.svg "Account icon").
3. Click **My Access**.
4. At the top of the page, next to *API key*, hover over the blurred API key.
5. Copy this API key (you'll need it in the next steps).

![API Key Location](./data_collect/data/images/three.png)

#### Step 2b: Ask Bob to set up the environment

Before using your API key in the application, you need to store it securely. Here's what you'll set up:

- **`.env` file** - A special file that stores sensitive information (like your API key) separately from your code
- **`.gitignore`** - A file that tells Git which files to ignore when sharing code, so your API key stays private
- **`dotenv` package** - A tool that helps your application read the API key from the `.env` file

1. Copy and paste the following prompt in Bob's chat panel:

   ```
   I need to securely store an API key using environment variables.

   Please help me:
   1. Check if a .env file exists in the project root directory.
      - If it exists, add this line to it: API_FOOTBALL_KEY=your_api_key_here
      - If it doesn't exist, create a new .env file with this line: API_FOOTBALL_KEY=your_api_key_here
   2. Make sure .env is listed in .gitignore so the API key won't be accidentally shared.
   3. Install the dotenv package using yarn:
      - First, detect which shell(s) I'm using (bash, zsh, etc.) and test yarn in each to find where it's available.
      - Use the appropriate shell for the yarn install command.
      - If yarn is not found in the default shell, try using interactive shell mode (e.g., `zsh -i -c 'yarn add dotenv'`) to load the full environment profile.
      - Run: yarn add dotenv

   After you complete these steps, I'll replace "your_api_key_here" with my actual API key from API-Football.

   Please explain what each step does before executing it.

   ```

   ![Bob Creating .env File](./images/bob-prompt-2.png)

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

1. After Bob creates the `.env` file, replace `your_api_key_here` with the actual API key you copied from API-Football in Step 2a, and save the file.

#### Step 2c: Download player data from API-Football

Now you'll create a script that automatically downloads player information from API-Football and saves it to your project. Think of this as a one-time download that gets all the player data you need.

**About API-Football:**
API-Football (https://v3.football.api-sports.io) is a service that provides comprehensive football/soccer data from leagues around the world. you'll use their player information endpoint, which gives us detailed data including:
- Player biographical information (name, age, nationality, photo)
- Performance statistics (games played, ratings)
- Current team information

The API requires authentication - that's why you set up the API key in Step 2a. Your key acts like a password that proves you have permission to access the data.

**What this script will do:**
- Connect to API-Football using your API key for authentication.
- Download information about players from the Premier League (2024 season).
- Extract the specific details you need (name, photo, position, age, etc.).
- Save the data in a format your application can use.
- Store it in a file called `players.json`.

**Why Premier League 2024?** The free API-Football account only provides data for recent seasons (2022-2024). you're using Premier League as an example, but the same approach would work for World Cup data with a paid account.

1. Copy and paste the following prompt for Bob to create this script:

   ```text
   Create a Node.js script at scripts/fetchPlayers.js that downloads Premier League player data from API-Football and saves it to my project.

   Important Context: The free API-Football plan supports seasons 2022-2024. However, the 2024 season is currently in progress and doesn't have complete statistics or ratings for most players. You need to use the 2023 season (the most recent completed season) to get players with actual performance ratings. You use league ID 39 (Premier League) to filter for Premier League-specific statistics.

   What the script should do:
   1. Create a folder called "src/data" if it doesn't exist yet (this is where you'll store the player information).

   2. Read my API key (already added) from the .env file using the dotenv package.

   3. Connect to API-Football at: https://v3.football.api-sports.io.
      - Use my API key to authenticate (send it in the header as 'x-apisports-key').
      - Use Node.js's built-in fetch() function to make the requests.

   4. Download player data from several top Premier League teams for the 2023 season:
      - Critical: Query the API using team IDs (not league ID) with season 2023 because this returns players with complete game statistics and performance ratings. Querying by league alone or using 2024 season returns players without ratings.
      - Fetch from multiple well-known Premier League teams (e.g., Manchester City, Manchester United, Liverpool, Arsenal, Chelsea, Tottenham) to get a diverse player pool.
      - Use endpoint format: /players?team={teamId}&season=2023
      - Add a delay of at least 500ms between requests to avoid rate limiting.

   5. For each player, extract and save these details:
      - Player name (from player.name)
      - Photo URL (from player.photo)
      - Position (from their Premier League statistics where league.id equals 39)
      - Age (from player.age)
      - Nationality (from player.nationality, save as citizenship)
      - Height (from player.height, convert to number by removing non-digit characters)
      - Current club name (from their Premier League statistics where league.id equals 39)
      - Form rating (from their Premier League statistics where league.id equals 39 - the rating is typically found in the games object as a string like "7.279310", so use parseFloat() to convert it to a number)
   
      Note: Each player has statistics for multiple competitions (Premier League, Champions League, FA Cup, etc.). You must filter for the statistics entry where league.id equals 39 (Premier League) to get their Premier League-specific performance rating.

   6. Skip any players that don't have statistics information or don't have Premier League (league.id === 39) statistics.

   7. Remove duplicate players (same name) since players may display when querying multiple teams.

   8. Save all the player data to a file: src/data/players.json (formatted nicely so it's readable).

   9. Show console messages:
      - Progress messages as each team is fetched
      - Total players fetched
      - Final count after removing duplicates
      - Confirmation message with the number of players saved

   10. If anything goes wrong, show me a clear error message explaining what happened.

   After you create the script, run it:
   1. First, detect which shell(s) have Node.js available (bash, zsh, etc.) and test the node command in each.
   2. Use the shell where Node.js is available to run: node scripts/fetchPlayers.js
   3. If Node.js is not found in the default shell, try interactive shell mode (e.g., `zsh -i -c 'node scripts/fetchPlayers.js'`) to load the full environment profile.
   4. Show me the output so I can verify the data was downloaded successfully.
   ```

   ![Bob previewing the data](./images/bob-prompt-3.png)

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

   When the tasks are complete, you see a sample of a player record.

   ![Bob showing the data](./images/bob-get-data.png)

### Option B: Use backup data

If you prefer to skip the API setup and data fetching, you can use pre-downloaded player data instead.

**What to do:**

1. Use the backup player data file from this repository:
   - Download the [players.json](./data_collect/data/backup_json_players/players.json) from the repository file location: `/data_collect/data/backup_json_players/players.json`

2. Copy this file to your project:
   - Create a folder called `src/data` in your project if it doesn't exist.
   - Copy `/data_collect/data/backup_json_players/players.json` into `src/data/`.
   Your final file should be at: `src/data/players.json`

Once you have the file in place, you can proceed to Task 3.

[Back to the top](#top)

***

<a name="task03"></a>

## Task 3: Build the player selector

In this task, you simplify the template app and create a dropdown component that lists all players.

### Task 3a: Clean up the template

The starter template you downloaded includes many features you don't need for this lab - like a complex navigation menu, extra pages, and styling files. Let's remove these unnecessary parts to create a clean, simple starting point for our player dashboard.

**What Bob will do:**
- Remove extra folders and files that add complexity
- Simplify the main application to just show a basic header
- Clean up the styling to keep it minimal

1. Copy and paste the following prompt for Bob to clean up the template:

   ```text
   I need to simplify the template application to create a clean starting point for my player dashboard.

   Please help me:

   1. Delete the folder called "src/content" and everything inside it.
      (This contains navigation menus and pages you don't need)

   2. Clean up the styling:
      - Look for any lines that import or reference files from the "content" folder you just deleted.
      - Remove those lines since those files no longer exist.
      - Add simple styling for the main container (padding, centered layout with reasonable width).

   3. Simplify the main application:
      - Remove any code related to navigation menus or complex layouts.
      - Update it to use modern React style.
      - Create a simple page with just a header that says "Player Dashboard" and a main content area below it.
      - Keep it clean and minimal - no complex navigation.

   After these changes, the app should show just a clean page with a header, ready for us to add our player selector.
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

1. After Bob makes these changes, refresh your browser at `http://localhost:3000` to see the simplified application. A clean page with just the *Player Dashboard* header displays.

### Task 3b: Add a player selector dropdown

Now let's add the first interactive feature to your application - a dropdown menu that lets you select a player from the list.

**What you're building:**
- A dropdown menu showing all player names
- When you select a player, their name displays below the dropdown
- This will be the foundation for displaying detailed player information later

**What Bob will do:**
- Install a tool that helps write better code (TypeScript).
- Create a new dropdown component using the Carbon Design System.
- Connect it to your player data.
- Add it to your application page.

1. Copy and paste the following prompt for Bob to create the player selector:

   ```text
   I need to add a dropdown menu to my application that shows all the players and lets me select one.

   Please help me:

   1. First, install TypeScript as a development tool:
      - Detect which shell has yarn available (bash, zsh, etc.).
      - Use that shell to run: yarn add -D typescript
      - If yarn is not found in the default shell, try interactive shell mode (e.g., `zsh -i -c 'yarn add -D typescript'`).
      - Wait for installation to complete.

   2. Create a new dropdown component for selecting players:
      - The dropdown should show all player names from the data.
      - Include a default option that says "Select a player...".
      - When someone selects a player, remember which one was chosen.
      - Use the Carbon Design System's Select component for a professional look.
      - Save this in an appropriate location in the project structure.

   3. Add this dropdown to the main application page:
      - Load the player data from the file you created earlier (src/data/players.json).
      - Display the dropdown component on the page.
      - When a player is selected, show their name below the dropdown as confirmation.
      - Keep the layout simple and clean.

   After you make these changes, I should be able to see a dropdown menu on my page with all the player names.
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

1. After Bob completes the changes, check your browser at `http://localhost:3000`. You see:
   - A dropdown menu with player names
   - When you select a player, their name displays below the dropdown

![Player Selector](./images/task-3.png)

#### Troubleshooting

If you encounter any compilation errors after completing this task, you can ask Bob to help you reslve the issue. Two common issues are listed below, however, if you see a different error, then simply tell Bob about the ask error ask Bob to fix it.

**Issue 1: SASS compilation error**

If you see an error message about `rem(-40px)` requiring 2 arguments in `_landing-page.scss`, this indicates that the `src/content` directory wasn't completely removed in an earlier step.

Ask Bob to fix it by copying this prompt:

```text
I'm getting a SASS compilation error about the rem() function in _landing-page.scss.

Please help me:
1. Check if the src/content directory still exists and delete it completely.
2. Open src/App.scss and remove any @use statements that reference './content/LandingPage/landing-page'.
3. Add basic styles for the .app container (padding, max-width, margin: auto).
```

**Issue 2: TypeScript module not found**

If you see an error that the TypeScript module cannot be found, the TypeScript dependency may not have been installed correctly.

Ask Bob to fix it by copying this prompt:

```text
I'm getting an error that the TypeScript module cannot be found.

Please:
1. Install TypeScript as a development dependency: yarn add -D typescript
2. Wait for the installation to complete.
3. Restart the development server with: yarn start:dev
```

After Bob resolves these issues, refresh your browser and test the player selector again.

[Back to the top](#top)

***

<a name="task04"></a>

## Task 4: Display player statistics

Now that you can select a player, let's display their detailed information in a nice card format.

**What you're building:**
- A player information card that shows when you select a player
- Displays the player's photo, name, and key statistics
- Shows information in an organized, easy-to-read format
- Handles missing information gracefully (shows "—" for missing data)

**What Bob will do:**
- Create a new card component to display player information.
- Add it to your application below the dropdown.
- Connect it so it updates when you select different players.

1. Copy and paste the following prompt for Bob to create the player statistics card:

   ```text
   I need to display detailed player information when someone selects a player from the dropdown.

   Please help me:

   1. Create a player information card that displays:
      - Player's photo as a circular image at the top (about 120 pixels wide)
      - Player's name as a heading below the photo
      - A list of statistics in a clean format with labels and values:
        * Position (where they play)
        * Age
        * Nationality
        * Current club/team
        * Form rating (show as "X / 10" format, like "7.5 / 10")
   
   2. Design requirements:
      - Use the Carbon Design System's card/tile component for a professional look
      - Display the photo centered at the top with rounded edges (circular)
      - Show statistics in a structured list with labels on the left and values on the right
      - If any information is missing, show "—" instead of leaving it blank
      - If there's no photo, either skip it or show a placeholder

   3. Add this card to the main application page:
      - Place it below the player dropdown
      - Only show the card when a player is selected
      - Update the card automatically when a different player is selected
      - Don't change how the dropdown works

   After you make these changes, I should see detailed player information display below the dropdown when I select a player.
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

1. After Bob completes the changes, you may need to restart the application to see the new component. Follow these steps:
   1. In the terminal, press `Ctrl+C` to stop the server.
   1. Copy and paste the following command into the terminal window:
      ```bash
      yarn start:dev
      ```
   1. If prompted to run on a different port, press Enter.

1. Now, test the player statistics card:
   1. Go to your browser at `http://localhost:3000`.
   2. Select a player from the dropdown. The player's photo and statistics display.
   4. Try selecting different players - the information should update.
   5. Check that missing information shows "—".

![Statistics Panel](./images/task-4.png)

[Back to the top](#top)

***

<a name="task05"></a>

## Task 5: Implement Grounded AI (The Most Important Lesson)

**What you'll learn:** The difference between using external information sources (like Wikipedia) versus using only your own data. This teaches you a critical concept called "grounding."

This is the most important task because it shows you why controlling your data sources matters.

---

### Task 5a: Create a summary using Wikipedia

First, let's create a feature that fetches player information from Wikipedia. This will show you what happens when you use external data sources.

1. Copy and paste this instruction into Bob's chat window:

   ```text
   Add a player summary feature that fetches information from Wikipedia.

   When someone clicks a player, fetch a brief summary about them from Wikipedia and display it below the player card.

   Display it in a box with:
   - Label: "Player Information"
   - The Wikipedia summary (first 2-3 sentences)
   - Small note: "Source: Wikipedia"

   When no player is selected, hide the summary section.

   Note: Use the Wikipedia API (no API key needed) to fetch the summary.
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

1. After Bob completes the changes, follow these steps:
   1. If your app is still running, stop it by pressing `Ctrl+C` in the terminal.
   1. Copy and paste the following command into the terminal window:
      ```bash
      yarn start:dev
      ```
   1. If prompted to run on a different port, press Enter.
   1. Refresh your browser at `http://localhost:3000`.

---

### Task 5b: Test the Wikipedia version

Click on several players from your dataset and observe what happens. Try players like **V. van Dijk**, **Oscar Bobb**, **D. Rice**, **J. Maddison**, and a few others.

**What you'll likely see:**

For most players:
- "No information found" or error messages
- This happens because Wikipedia doesn't recognize abbreviated names (like "V. van Dijk" instead of "Virgil van Dijk")

For some players (if Wikipedia finds them):
- Career achievements and trophies
- Playing style and skills
- Career history and transfers
- Awards and recognition

**Important observations:**
- Results are inconsistent - some players work, most don't
- When data displays, it includes information NOT in your dataset
- You have no control over what Wikipedia shows
- **Missing:** No form rating information is displayed

**Remember which players you tested - you'll check them again after grounding to see the difference!**

Your dataset contains **only 8 fields**:
- Player name
- Player photo
- Position
- Age
- Citizenship
- Height
- Club name
- Form rating

**The problem:** Wikipedia has MUCH more information than your dataset. While interesting, this creates issues:

1. **Outdated information** - Wikipedia might say a player is at a different club
2. **Unverified claims** - Your app can't verify Wikipedia's facts
3. **Inconsistent data** - Wikipedia info doesn't match your dataset structure
4. **Missing players** - Lesser-known players might not have Wikipedia pages

---

### Understanding "Grounded AI"

| Term | Meaning |
|---|---|
| ✅ **Grounded** | Using only information from YOUR dataset |
| ❌ **Ungrounded** | Using external sources (Wikipedia, Google, etc.) |
| **Data boundary** | The specific fields in your dataset—your limit |

**Why grounding matters:**
- You control the accuracy.
- You know the data is current (as of your last update).
- You can verify every claim.
- It works for all players in your dataset.

---

### Task 5c: Convert to grounded summaries

1. Now fix the feature to use only your dataset. Tell Bob:

   ```text
   Replace the Wikipedia summary with a grounded summary that uses ONLY our dataset.

   Use only these fields from the player data:
   - player_name, position, age, citizenship, current_club_name, form_rating

   Rules for the summary:
   1. Only use the fields listed above - no external sources.
   2. If a field is empty, skip it (don't fetch from elsewhere).
   3. For form_rating, describe it as:
      - 8.0 or higher: "in strong form"
      - 6.0 to 7.9: "showing consistent form"
      - Below 6.0: "building form"
      - If empty: don't mention form
   4. End with: "This profile is based on the available dataset only."

   Update the display:
   - Label: "Player Summary"
   - The grounded summary
   - Small note: "This summary is based only on the loaded dataset."
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

1. After Bob completes the changes, follow these steps:
   1. If your app is still running, stop it by pressing `Ctrl+C` in the terminal.
   1. Copy and paste the following command into the terminal window:
      ```bash
      yarn start:dev
      ```
   1. If prompted to run on a different port, press Enter.
   1. Refresh your browser at `http://localhost:3000`.
---

### Task 5d: Test the same players again and compare

Now click on the same players you tested before (like **V. van Dijk**, **Oscar Bobb**, **D. Rice**, **J. Maddison**) and observe the difference.

**What changed?**

**Before (Wikipedia - Task 5b):**
- Most players: "No information found" or errors
- Inconsistent results
- No form rating information
- External information when available

**After (Grounded - Now):**
- ✅ **Every player now has a summary**
- ✅ Summaries include: name, position, age, citizenship, club
- ✅ **Form rating is now included** (e.g., "showing consistent form", "in strong form", "building form")
- ✅ All information comes from your dataset only
- ✅ Consistent format for all players

**Key improvements:**

| What | Wikipedia (Before) | Grounded (After) |
|---|---|---|
| Works for all players? | ❌ Many errors | ✅ Yes, every player |
| Includes form rating? | ❌ No | ✅ Yes |
| Uses only your data? | ❌ External sources | ✅ Yes, 7 fields only |
| Consistent results? | ❌ Varies | ✅ Same format |

---

### Task 5e: Final verification

Test a few more players to confirm the grounded approach works consistently:

- ✅ Summary displays for every player you select
- ✅ Summary mentions only: name, position, age, citizenship, club, and form description
- ✅ No external information (trophies, career history, playing style)
- ✅ Form rating is described in words based on the rating value
- ✅ The transparency note displays: "This summary is based only on the loaded dataset."
- ✅ Summary updates immediately when switching players
![AI Summary Panel](./images/task-5.png)

---

### Why This Matters

**What you learned:**

| Approach | Pros | Cons |
|---|---|---|
| **External (Wikipedia)** | Rich, detailed information | Unverified, outdated, inconsistent, missing data |
| **Grounded (Your data)** | Verified, consistent, complete | Limited to your 7 fields |

**Real-world applications:**

This lesson applies to any system where accuracy matters:

- **Medical records** - Use patient's actual data, not general medical information.
- **Financial reports** - Use actual transactions, not market estimates.
- **Legal documents** - Use case facts, not general legal principles.
- **Customer service** - Use customer's account data, not assumptions.

**Key takeaway:** Always know your "data boundary" - the specific information you have and can verify. Don't mix it with external sources unless you explicitly want to and can verify the external data.

[Back to the top](#top)

***

<a name="task06"></a>

## Task 6: Build a Team Formation Visualizer

**What this does:** This final task creates an interactive football field display that shows 11 randomly selected players positioned on a realistic football pitch using their actual photos. Users can click a button to generate different random team formations.

![Formation Example](./images/formation-example.png)

### Task 6a: Create the Formation Board display

**What this does:** This creates the visual football field display that shows player photos arranged in a football formation (forwards, midfielders, defenders, and goalkeeper).

1. Copy and paste the following instructions for Bob:

   ```text
   Create a new file called FormationBoard that displays a football field with a green gradient background and a slight three-dimensional perspective effect. The field should be 800 pixels wide and 600 pixels tall, with rounded corners and a shadow effect.

   Add white field markings including a center circle, penalty box, and goal area at the bottom.

   The display should accept a list of players and show them in a standard football formation:
   - Two forwards at the top
   - Four midfielders in the middle row
   - Four defenders in the lower row
   - One goalkeeper at the bottom center

   Each player should display as a circular photo with their name below and a number badge showing their position (1 through 11).

   If no players are provided, show a message saying "Click Generate Random Team to see the formation".

   Use inline styling and include proper type definitions for the player data.
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

### Task 6b: Create team generator helper

**What this does:** This creates a helper function that randomly picks 11 players from the full list of available players.

1. Copy and paste the following instructions for Bob:

   ```text
   Create a new file called teamGenerator with a function named generateRandomTeam that takes a list of all available players and returns 11 randomly selected players.

   The function should:
   1. Shuffle the player list randomly
   2. Select the first 11 players from the shuffled list
   3. Return those 11 players

   Keep the logic simple with no filtering by position - just pure random selection. Include proper type definitions and make sure the function can be used by other parts of the application.
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

### Task 6c: Add navigation and formation page

**What this does:** This adds a navigation menu at the top of the application and creates a second page for the team formation visualizer, allowing users to switch between viewing individual players and viewing team formations.

1. Copy and paste the following instructions for Bob:

   ```text
   Update the main application file to add a navigation header and support for multiple pages.

   Import the necessary header and navigation menu items from the Carbon Design System. Also import the FormationBoard display and the generateRandomTeam helper function.

   Add tracking for:
   1. Which page is currently being shown (either browser or formation)
   2. The selected team of 11 players

   Create a dark-themed header at the top with the title "Player Dashboard" and two navigation menu items:
   - "Player Browser" - switches to the browser page
   - "Team Formation" - switches to the formation page

   When users click these menu items, switch between the two pages.

   On the browser page:
   - Show the existing player selector and player card functionality

   On the formation page:
   - Show a heading "Team Formation Visualizer"
   - Show a button labeled "Generate Random Team" that picks 11 random players when clicked
   - Show the FormationBoard display with those players

   Make sure the header stays fixed at the top and add appropriate spacing below it. Center the formation board on its page and use consistent spacing throughout.

   The application should now have two distinct pages accessible via the header navigation.
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

**Test your progress:**

After completing Task 6c, save all files and check your application:

1. Refresh your browser if the application doesn't restart automatically.
2. In the header, click **Team Formation**.
4. On the *Team Formation* page, click the **Generate Random Team** button. Basic football field displays with 11 player photos arranged in formation.
6. Click **Player Browser** in the navigation to switch back to the original player browsing page. Both pages should work smoothly.

The field will look basic at this stage - you'll make it look professional in the next step!

### Task 6d: Enhance the football field with professional pitch markings

**What this does:** This upgrades the football field to look more realistic by adding professional pitch markings like you'd see on a real football field, including penalty areas, corner arcs, and goal indicators.

1. Copy and paste the following instructions for Bob:

   ```text
   Update the FormationBoard file to create a professional-looking football pitch that matches official football field markings.

   Make the field taller and narrower (in a vertical orientation) to match real football field proportions. Use a lighter green gradient for the grass and add a crisp white border around the entire field. Remove the three-dimensional tilted effect to keep it flat and clean, but add a subtle inner shadow for depth.

   Add detailed white field markings following official football pitch standards:

   1. HALFWAY LINE & CENTER:
      - A horizontal line across the exact middle of the field (full width)
      - A center circle positioned at the exact center of the field
      - A small solid white center spot at the dead center

   2. PENALTY AREAS (at both ends - top and bottom):
      - Large penalty boxes extending into the field from each end, centered horizontally
      - Smaller goal areas (six-yard boxes) nested inside each penalty box, positioned flush against the end line
      - Penalty spots positioned inside each penalty box, centered horizontally
      - IMPORTANT: Penalty arcs (D-rings) are semi-circles that extend INTO the field from the penalty spot, with the flat edge aligned with the penalty box line. The arc should curve away from the goal, not toward it.

   3. CORNER ARCS:
      - Small quarter-circle arcs in all four corners of the field

   4. GOAL INDICATORS:
      - Small rectangles extending OUTSIDE the field boundaries at the top and bottom edges to represent the goals
      - Position them centered on each end line
      - Use a white background with a checkered or diagonal stripe pattern to simulate goal nets

   5. FIELD PROPORTIONS:
      - The penalty box should be approximately half the width of the field
      - The goal area should be approximately half the width of the penalty box
      - All markings should be symmetric between top and bottom

   Adjust the player positions to work well with the taller field layout, keeping the same formation structure (forwards, midfielders, defenders, goalkeeper) but spacing them appropriately for the new dimensions. Make the player photos slightly smaller so they fit nicely on the vertical field without looking cramped.

   Use inline styling only. Ensure all markings are precisely positioned, perfectly symmetric, and match the reference image provided.
   ```

1. Click **Approve once** when prompted by Bob to grant permissions and run command to complete the tasks.

### Task 6e: Test the enhanced formation visualizer

**What this does:** This verifies that everything works correctly and looks professional.

**Testing steps:**

1. Save all your files.
1. Refresh your browser if the application doesn't restart automatically.
2. In the header, click **Team Formation**.
3. Click the **Generate Random Team** button.
4. Check that the football field looks professional with all these features:
   - A tall rectangular field with a white border
   - Green grass with a gradient effect
   - A white halfway line across the middle with a center circle and center spot
   - Two penalty areas (top and bottom) with smaller goal areas inside
   - Penalty spots and curved arcs in each penalty area
   - Small curved arcs in all four corners
   - Goal indicators with a net pattern at top and bottom
   - 11 player photos arranged in formation
   - Player names displayed below their photos in white text with shadows
   - Numbers 1 through 11 shown on white circular badges on each player
   - All lines and markings are crisp and properly aligned
5. Click the button several times to see different random team selections.
6. Switch back and forth between the Player Browser and Team Formation pages using the navigation menu.

![Formation Board](./images/football-board.png)

### Why this task matters

This final task demonstrates several important web development skills:
- **Complex visual layouts** - Building a realistic football pitch with precise positioning and markings
- **Styling mastery** - Using positioning techniques, borders, and gradients to create professional layouts
- **Data manipulation** - Random selection and array operations
- **Building cohesive interfaces** - Combining multiple elements into a unified view
- **Navigation patterns** - Multi-page application with state management
- **Real-world application** - Creating something visually impressive and practical

You've now completed a full Player Dashboard with:
- Individual player analysis with AI-generated summaries
- Professional team formation visualization on a realistic football pitch
- Clean navigation between different application views

[Back to the top](#top)

***

<a name="challenges"></a>

## Extra Challenges

Want to explore more? Try these fun enhancements to make your app even better:

### Challenge 1: Filter players by their position

Add a dropdown menu that lets you view only specific types of players—like showing just Forwards, Midfielders, Defenders, or Goalkeepers.

**How to do it:** Ask Bob to add a position filter dropdown that works alongside your team selector.

### Challenge 2: Sort your player list

Add options to organize your players in different ways: alphabetically by name (A-Z or Z-A), by age (youngest to oldest), or by their performance rating (best players first).

**How to do it:** Ask Bob to add sorting buttons or a dropdown menu with these ordering options.

### Challenge 3: Compare two players at once

View two players side-by-side to easily compare their stats, ages, and performance ratings.

**How to do it:** Ask Bob to create a comparison view with two player cards displayed next to each other.

### Challenge 4: Search for players by name

Add a search box where you can type a player's name and instantly see matching results.

**How to do it:** Ask Bob to add a search bar that filters the player list as you type.

### Challenge 5: Click a player to see their details

When you click on a player icon in the football formation board, display their full information (stats, position, rating) in a panel beside the board.

**How to do it:** Ask Bob to make players clickable on the formation board and show their details in a side panel.

### Challenge 6: Build realistic team formations

Make the team generator smarter by selecting players based on their actual positions—like 2 forwards, 4 midfielders, 4 defenders, and 1 goalkeeper for a proper team lineup.

**How to do it:** Ask Bob to update the random team generator to pick players by position instead of randomly.

### Challenge 7: Switch between different formations

Add a dropdown to choose different team formations (like 4-4-2, 4-3-3, or 3-5-2) and see players arranged differently on the field.

**How to do it:** Ask Bob to create a formation selector that repositions players based on the chosen tactical setup.

### Challenge 8: Show player stats on hover

When you move your mouse over a player on the formation board, display a small popup showing their key statistics.

**How to do it:** Ask Bob to add hover tooltips that display when you point at players on the field.

### Challenge 9: Rebuild the app in Python

This application is built using React (a JavaScript framework). Try recreating it using Python with Streamlit—a popular tool for building interactive data applications in Python.

**How to do it:** Ask Bob to convert the application to Python using Streamlit for the user interface. Note that the visual layout and interactions will be different, as Streamlit uses a different approach than React.

[Back to the top](#top)

***

<a name="summary"></a>

## Summary

In this lab, you used IBM Bob to create a Premier League player dashboard. You learned how to give Bob clear, detailed instructions to build an interactive application with multiple pages, AI-powered player summaries based on real data, and a realistic football field visualization—all using professional design components.

### What you learned

**Detailed instructions lead to better results.** When you give Bob specific requirements—like exact player information to display, precise field measurements, and clear layout instructions—you consistently get more accurate results that match what you envisioned.

**Providing context improves quality.** Telling Bob about your available data (which player statistics exist, how to handle missing information, what components to use) helps Bob create better applications with fewer errors and revisions.

**AI summaries should stick to the facts.** Player summaries that only use actual data from your dataset are more reliable and trustworthy than AI-generated content that might include made-up information. Always review what AI creates to ensure accuracy.

**Complex designs need precise specifications.** Building detailed visual elements like the football pitch requires exact measurements, positioning details, and styling instructions to achieve professional-looking results.

**Multiple pages improve user experience.** Organizing your application into separate pages (like Player Browser and Formation Board) with clear navigation makes it easier to use and more professional.

***

<a name="additional-resources"></a>

## Additional resources

- [IBM Bob documentation](https://bob.ibm.com/docs)
- [API-Football documentation](https://www.api-football.com/documentation-v3)
- [IBM Carbon Design System](https://carbondesignsystem.com/)
- [React documentation](https://react.dev)

[Back to the top](#top)
