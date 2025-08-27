# PrepX Technical Test: Save Our Codebase, You’re Our Only Hope!

Alright, buckle up, code wrangler! Welcome to the wild west of **PrepX**, the ultimate Learning Management System designed to whip dental students into exam-crushing shape! Our previous dev team, bless their hearts, left us a codebase that’s less "clean code" and more "digital dumpster fire"—think unused imports scattered like confetti, commented-out code haunting the files like ghosts of features past, and monolith components so chunky they could double as a dentist’s chair. But fear not, because YOU, our coding hero, are here to save the day with your refactoring superpowers!

Your mission, should you choose to accept it (and you’d better, because it’s a technical test), is to tame this beastly codebase and bring some order to the chaos. You’ll be working on two key pages in our PrepX platform:

1. **Exams List Page**: This is where dental dreams are displayed—a glorious list of exams ready to be conquered. Your job is to make sure it shows off those exams like a proud parent at a spelling bee.
2. **Create Exam Form**: A multi-step form that’s supposed to guide users through crafting the perfect exam, but right now, it’s about as smooth as a root canal without anesthesia. The final step’s data collection is dropping the ball harder than a clumsy dental assistant, and it’s your job to fix it.

## Your Quests
Here are your two main tasks to prove you’re the code dentist we need:
1. **Fix the Create Exam Form**: The last step of the form is acting like it forgot how to collect data—probably daydreaming about fluoride treatments. Get in there, debug the logic, and make sure all the data is gathered properly so it can be sent off without a hitch.
2. **Local Storage for Exams**: For testing purposes, you’ll need to save those freshly minted exams to local storage (pick your favorite method—localStorage, IndexedDB, or whatever you think is the bee’s knees) and display them proudly on the Exams List page. Make it snappy and reliable, like a dentist’s appointment reminder.

## How to Run the Test
Ready to dive into this codebase like a dentist tackling a tricky molar? Here’s how to get the app up and running:
1. **Install Dependencies**: Our codebase is a needy patient, so give it the packages it craves. Run one of these commands in your terminal, depending on your package manager of choice:
   - `pnpm install`
   - `yarn install`
   - `npm install`
2. **Run the App**: Fire up the dev server and see the chaos in action! Just run:
   - `pnpm dev`
   Watch the app spring to life (or limp along, given its current state) in your browser, ready for your expert touch.

## How to Submit
You’ll find the codebase in all its chaotic glory at [URL here]. Fork that repo, work your magic, and submit a pull request to our test repo. Before you dive in, take a moment to play around with the form—get a feel for its quirks and conditions, like poking around a patient’s mouth before a procedure.

## Bonus Points
Want to make our jaws drop? Sprinkle in some **best practices**, refactor that monolith into sleek, reusable components, and sweep away those unused imports and commented code like plaque on a tooth. Show us you can make this codebase sparkle brighter than a freshly polished smile!