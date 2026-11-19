# Video transcript for *Lab: AI in Arts - Build an Animation Studio Application with IBM Bob*

This video shows you how to use IBM Bob to build an animation studio application.
Vibe coding is a modern approach to software development where you describe what you want in plain language, and AI tools generate the code for you.

As projects grow in complexity, teams often move from vibe coding to spec-driven development, shifting from loosely defined prompts to clear, detailed specifications that guide both humans and AI toward better outcomes.

Spec-driven development is a more structured approach where requirements, constraints, and design details are clearly defined upfront.

To complete this lab, you need to sign up for an IBM Bob trial account. If you don’t have a trial account, watch the Get started with IBM Bob video, and then follow the steps to sign up.

Now choose a folder location for the lab work. In Bob, open a terminal window and change directory into that folder. Then execute the commands to create a subfolder, and change to that folder. When that’s done, open the animation studio folder. You will need a few images for testing the application, so copy those images into the new folder.

Before you can build the application, you need a few tools installed. Prompt Bob to set up a development environment for your project that includes python, streamlit, pillow, open CV python, and numpy.

Now you are ready to create a Streamlit application. Decide on the application title, background and primary colors, and a page icon. Prompt Bob to create the application to your specifications. If Bob doesn’t start the application, you can do that through the terminal. Then navigate to the supplied URL to see the starter application.

The next task prompts Bob to create a canvas where the animator can see the placement of the images, a section for canvas settings, such as, the dimensions and frames per second, and a mechanism to upload the images, provide a sprite name, and persist the sprites to disk. When the task completes, return to the application in the browser to test the new features.

This task prompts Bob to create two sections to add keyframes for the animation, place the sprites in a keyframe, and adjust the position, rotation, and layer, and so on, for the keyframe. When the task completes, return to the application in the browser to test the new features.

This task prompts Bob how to handle a single sprite with multiple uploaded images. When the task completes, return to the application in the browser to test the new features.

This task prompts Bob to add a scene effects section, such as, blur and brightness. When the task completes, return to the application in the browser to test the new features.

By default, the animation will loop continuously, but the animator may want to have the animation stop after playing once. When the task completes, return to the application in the browser to test the new features.

Once the animator has selected all of the options, the application needs a button to render the animation and then export the animation to a GIF file. When the task completes, return to the application in the browser to test the new features.

In this lab, you built an application that allows the user to upload images as sprites, position them on a canvas across keyframes, apply per-frame scene effects, and export the result as a .gif. Refer to the lab guide for complete details.