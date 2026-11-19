# Video transcript for *Lab: AI in Arts - Build a DJ Application with IBM Bob*

This video starts with a basic DeckFlow web application, a two-deck DJ mixer. You use IBM Bob to add new features to the application based on a specification document.
Vibe coding is a modern approach to software development where you describe what you want in plain language, and AI tools generate the code for you.

As projects grow in complexity, teams often move from vibe coding to spec-driven development, shifting from loosely defined prompts to clear, detailed specifications that guide both humans and AI toward better outcomes.

Spec-driven development is a more structured approach where requirements, constraints, and design details are clearly defined upfront.

To complete this lab, you need to sign up for an IBM Bob trial account. If you don’t have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

Now choose a folder location for the lab work, and download the DJ app zip file from the IBM SkillsBuild GitHub repository to that folder. In Bob, open a terminal window and change directory into that folder. Then execute the commands to create a subfolder, and unzip the repository into that folder. When that’s done, open the dj-app folder to see the file structure. Then ask Bob to verify the current working directory.

Now you are ready to use Bob's Ask mode to explore the existing code base. Review the results. Bob discovered that this is a multi-phase project, with phases 1 through 3 complete. Phase 4 is next to be implemented.

Next, switch to Plan mode, and ask Bob to read the specification document to create an implementation plan for phase 4. Review Bob’s Phase 4 implementation plan details. Phase 4 includes implementing four features: Tempo control, Cue points, Loop functionality, and Visual markers.

Start the application and load the music samples to see how the application works.

Now ask Bob to create a high-level overview first, and then a detailed implementation plan for the four features.

Next, switch to Agent mode and prompt Bob to start the application so that you can explore its existing features. Create a music folder in your project, and copy at least two audio files into the music folder. Load the music tracks and experiment with the application.

Now you are ready to prompt Bob to implement the tempo control feature. When the implementation is complete, prompt Bob to use the supplied music to test the implementation. When Bob provides a testing plan, switch to the application, load the music tracks, and experiment with the tempo control. 

Now you are ready to prompt Bob to implement the cue point feature. When the implementation is complete, prompt Bob to use the supplied music to test the implementation. When Bob provides a testing plan, switch to the application, load the music tracks, and experiment with the cue point feature. 

Now you are ready to prompt Bob to implement the loop functionality feature. When the implementation is complete, prompt Bob to use the supplied music to test the implementation. When Bob provides a testing plan, switch to the application, load the music tracks, and experiment with the loop functionality feature. 

Now you are ready to prompt Bob to implement the visual markers feature. When the implementation is complete, prompt Bob to use the supplied music to test the implementation. When Bob provides a testing plan, switch to the application, load the music tracks, and experiment with the visual markers feature. 

With all of the phase 4 features implemented, use the grill-me skill to revisit the implementation plan to make sure that it meets your needs. Read and respond to the questions from Bob to revisit the implementation plan to make sure that meets your needs. Bob might find anomalies or recommend modifications, and prompt you to choose from options.

- Here Bob is suggesting changes to how the loop feature was implemented. You can ask Bob to create a project plan with suggestions for future enhancements to the application.
- Here Bob is recommending changes to the cue point feature. You can simply accept Bob’s recommendation and ask to add it to the project plan.
- Here Bob is suggesting that the feature was implemented as intended, but points out potential risks with the implementation.
- Here Bob is pointing out that tempo knob doesn’t have a disabled state. In this case, you want to tell Bob to make no changes.
- Here Bob asks about the waveform loop region draw order.
- This next question points out a potential gap in the application code.
- If Bob makes suggestions that you’d rather not implement, just tell Bob to skip the recommendation.
- Bob may ask about intentional design decisions.
- Bob also checks the existing application code against the specification document to note any discrepancies.
- Bob points out potential problems even when there is a current workaround in place.
- This suggestion relates to the audio-control rate.
- This question points out a potential drift in the loop feature.
- This question suggests an addition to the documentation.
- This last question is about a feature that hasn’t been implemented yet, but may need to be revisited in an upcoming implementation phase.

Bob provides a summary of the grill me session, and you can view the final project plan.

In this lab, you started with a basic DeckFlow web application, a two-deck DJ mixer built on Web Audio and Elementary Audio (running as WASM in an AudioWorklet). You used IBM Bob to add four new features to the application based on a specification document. Refer to the lab guide for complete details.