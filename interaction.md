# System and interaction frames

## System diagram

```mermaid
flowchart LR
  U[Writer] -->|draft and mode| E[Editor · implemented]
  E -->|check request| D[Wording rules and mode gate · simulated AI]
  M[Mock evidence fixture] -->|fixed comparison| F[Feedback card · implemented]
  D -->|prompt or status| F
  F -->|compare, dismiss or switch mode| U
  U -->|optional wording change| E
  R[Live retrieval and claim analysis · planned] -.-> D
```

The simulated decision runs on a check request. Debate mode suppresses evidence prompts. The evidence fixture is a fixed local example.

## Essay review

1. Load essay example → Check draft → Side panel asks about conditions for a broad comparison.
2. Compare data → Panel opens the mock evidence and a possible revision.
3. Use suggested wording → Editor applies the revision on request. Dismiss → Editor keeps the original.

![Essay evidence open with revision and dismiss controls](essay-review.png)

![Draft after the writer applies the optional revision](essay-revised.png)

## Clarifying a debate premise

1. Load debate example → Check draft in Academic essay mode → Panel asks because debate wording conflicts with the selected mode. The writer can compare data or dismiss this prompt once.
2. Dismiss and switch to Debate → Panel closes and the mode changes.
3. Check draft again → Status confirms that evidence prompts are off and the draft remains intact.

![Clarification while the debate draft is in Academic essay mode](debate-misread.png)

![The draft after switching to Debate and checking again](debate-recovery.png)

## Choosing the intent of a GTA prediction

![After Check draft, the writer chooses what they mean by “No other game will ever surpass GTA.”](gta-intent.png)

![Choosing a less certain prediction opens a preview. The original stays in the editor until the writer selects Use suggested wording.](gta-preview.png)

