# Draft Check

README prose word count: 760

Draft Check is a browser prototype for writers reviewing claims in an essay. It implements an editor, two sample drafts, a writing mode selector, and an evidence card with dismissal and revision controls. JavaScript uses wording rules for broad EV and diesel emissions comparisons, some best/worst judgements and a small set of game predictions. The evidence card contains fictional teaching material. Live source retrieval and general claim analysis are planned.

## Technology stack

HTML provides the editor and controls, CSS handles the two-panel layout, and local JavaScript checks the writing mode and wording. Gemini supported the Lab 3 simulation. Codex assisted with implementation and testing. The source collection and retrieval method for a future evidence service are still undecided.

## Run or inspect

Open `index.html` in your browser with `app.js` in the same folder. The demo uses HTML, CSS and plain JavaScript. It runs locally without setup, dependencies or API keys.

1. Select **Load essay example**, **Check draft** and **Compare data**. Read the evidence, then choose whether to use the suggested wording or dismiss the card.
2. Select **Load debate example** and **Check draft**. The demo starts in Academic essay mode and asks about intent when debate wording conflicts with that mode. Select **Dismiss and switch to Debate**, then check again. The text stays in the editor and the status confirms that evidence prompts are off.
3. In Academic essay mode, replace the draft with an unrelated sentence and check it. The status explains which types of wording the prototype can recognise.

4. In Academic essay mode, check “No other game will ever surpass GTA.” Choose a less certain prediction to preview the wording. Keep the original or select **Use suggested wording** to apply the revision.

## Additional files

The [interaction frames](interaction.md) show the prototype in use. The [system diagram](Draft%20Check%20system%20architecture.png) identifies working, simulated and planned components. All prototype materials are in this repository. No separate ZIP is needed.

## Development record

- Lab 2 storyboards set out a comparison card and a recovery action. The worksheet revision added a visible source label so the reader could see why the card appeared.
- Lab 3 simulated a normal check and a debate false alarm. The design added a dismissal action and an explicit mode selector after the false alarm.
- The A2 prototype turned those flows into clickable states. The evidence panel now labels its data as fictional. The author applies any wording change explicitly.
- A local Edge browser check covered opening the evidence without editing the draft, applying a suggestion, recovering from the debate false alarm, handling unsupported and blank inputs, and fitting a narrow viewport. The browser reported no script errors.

I tried a sentence about Genshin Impact. The first version returned a generic message. Following this trial, Codex replaced exact matching with limited wording rules. Try typing “Genshin Impact is the best game in the world.” to see the revised response.

I then added a second sentence. Opinion feedback now checks each sentence for supported wording, including when the space after a full stop is missing. The EV rewrite still requires a single sentence.

I found the question helpful and suggested offering two edits: “one of the best” to allow other choices, or “may be the best” to express uncertainty. The prototype now shows both options for supported judgements. The writer chooses whether to edit.

## Four checks of the debate cue

Each check used “EVs always emit more CO2 than diesel cars.” Only the mode and the words before the claim varied.

| Mode | Words before the claim | Observed feedback |
| --- | --- | --- |
| Academic essay | None | Offered example evidence |
| Academic essay | For a debate, suppose | Asked about intent |
| Academic essay | For the sake of argument, suppose | Offered evidence despite the debate premise |
| Debate | For the sake of argument, suppose | Suppressed the evidence prompt |

## AI assistance

Codex helped turn my Lab 2 storyboards and Lab 3 specification into a working browser prototype. I tried my own sentence about Genshin Impact and suggested offering two possible edits. For “No other game will ever surpass GTA.”, the first version softened the sentence before asking what I meant, so I asked for an intent choice and preview first. I also pointed out that the writer already chooses a mode before checking a draft. Codex revised the feedback and tested the example flows in Edge, including whether dismissing a prompt preserved the original text.

Codex also helped draft the report, prepare the system diagram and README, and capture screenshots from the browser. We compared the literature claims with the cited research and used the Week 1 slides to check the explanation of the feedback loop. The screenshots show the prototype running with illustrative data.

