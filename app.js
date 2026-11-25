const examples = {
  essay: 'Electric vehicles always cause more lifetime emissions than diesel cars because of battery manufacturing.',
  debate: 'For a fictional debate, assume electric vehicles always cause more lifetime emissions than diesel cars.'
};

function opinionMatch(text) {
  const pattern = /\b(is|are)\s+(?:the\s+)?(best|worst)\s+((?:video\s+)?(?:games?|films?|movies?|songs?|books?))\b/i;
  for (const part of text.trim().split(/(?<=[.!?])(?:\s+|(?=[A-Z]))(?=\S)/)) {
    const match = !part.endsWith('?') && part.match(pattern);
    if (match) return match;
  }
  return null;
}

function opinionFeedback(text) {
  const [, verb, rank, noun] = opinionMatch(text);
  const plural = noun.toLowerCase().replace(/s?$/, 's');
  const group = verb.toLowerCase() === 'is' ? 'is one of the' : 'are among the';
  return 'What makes it stand out to you? Give a reason. To place it in a group, try “' +
    group + ' ' + rank.toLowerCase() + ' ' + plural + '”. To express uncertainty, try “may be the ' +
    rank.toLowerCase() + ' ' + noun.toLowerCase() + '”.';
}

function predictionSubject(sentence) {
  const active = /^no other game will ever surpass ([^.!?;\n]+?)[.!]?$/i;
  const passive = /^([^.!?;\n]+?) will never be surpassed by (?:any )?other games?[.!]?$/i;
  const match = sentence.trim().match(active) || sentence.trim().match(passive);
  return match ? match[1].trim() : '';
}

function assessDraft(text, mode) {
  if (!text.trim()) return 'empty';
  if (mode === 'debate') return 'debate';
  const sentence = text.trim();
  const sentences = sentence.split(/(?<=[.!?])(?:\s+|(?=[A-Z]))(?=\S)/);
  if (opinionMatch(sentence)) return 'opinion';
  if (sentences.length > 1) return 'multiple';
  if (sentence.endsWith('?')) return 'outside';
  if (predictionSubject(sentence)) return 'prediction';
  const vehicles = /\b(evs?|electric (cars?|vehicles?))\b/i.test(sentence) && /\bdiesel\b/i.test(sentence);
  const emissions = /\b(emissions?|emit(?:s|ting)?|co2|carbon|pollut\w*)\b/i.test(sentence);
  const absolute = /\b(always|never|all|every)\b/i.test(sentence);
  if (vehicles && emissions && absolute) {
    const debateCue = /\b(?:for (?:a |the )?(?:fictional )?debate|debate premise|assume (?:for|in) (?:a |the )?debate)\b/i;
    return debateCue.test(sentence) ? 'clarify' : 'review';
  }
  return 'outside';
}

if (typeof module !== 'undefined') module.exports = { examples, assessDraft };

if (typeof document !== 'undefined') {
  const byId = id => document.getElementById(id);
  const draft = byId('draft');
  const mode = byId('mode');
  const status = byId('status');
  const feedback = byId('feedback');
  const actions = byId('actions');
  const compare = byId('compare');
  const evidence = byId('evidence');
  const prediction = byId('prediction');
  const preview = byId('prediction-preview');
  const wording = byId('prediction-wording');

  function setFeedback(message, active = false) {
    status.textContent = message;
    actions.hidden = !active;
    feedback.dataset.active = String(active);
    evidence.hidden = true;
    prediction.hidden = true;
    preview.hidden = true;
    wording.textContent = '';
    compare.setAttribute('aria-expanded', 'false');
  }

  function loadExample(example) {
    draft.value = examples[example];
    mode.value = 'essay';
    const notice = example === 'essay'
      ? 'Essay example loaded. Select Check draft.'
      : 'Debate example loaded in Academic essay mode to demonstrate a mismatch between wording and mode.';
    setFeedback(notice);
  }

  byId('essay').onclick = () => loadExample('essay');
  byId('debate').onclick = () => loadExample('debate');
  draft.addEventListener('input', () => setFeedback('Draft changed. Select Check draft to continue.'));
  mode.addEventListener('change', () => setFeedback('Writing mode changed. Select Check draft to continue.'));

  const messages = {
    empty: 'Enter a draft or load an example first.',
    debate: 'Debate mode is active. Evidence prompts are off.',
    multiple: 'Try checking one sentence at a time.',
    outside: 'No matching rule for this wording. Try one of the sentence types listed under the editor.',
    prediction: 'What do you want to say about this game?',
    review: 'This wording makes a broad comparison. Under which conditions would it hold? Compare the example evidence or dismiss the suggestion.',
    clarify: 'Academic essay mode is on, but this looks like a debate premise. Compare data for a factual claim, dismiss this prompt once, or switch to Debate.'
  };
  byId('check').onclick = () => {
    const result = assessDraft(draft.value, mode.value);
    const message = result === 'opinion' ? opinionFeedback(draft.value) : messages[result];
    setFeedback(message, result === 'review' || result === 'clarify');
    if (result === 'prediction') {
      prediction.hidden = false;
      feedback.dataset.active = 'true';
    }
    byId('switch').hidden = result !== 'clarify';
  };

  compare.onclick = () => {
    evidence.hidden = !evidence.hidden;
    compare.setAttribute('aria-expanded', String(!evidence.hidden));
  };

  byId('dismiss').onclick = () => {
    setFeedback('Dismissed this time. Academic essay mode is still on.');
    draft.focus();
  };

  byId('keep-prediction').onclick = () => {
    setFeedback('Original wording kept.');
    draft.focus();
  };

  function showPredictionPreview(text) {
    wording.textContent = text;
    preview.hidden = false;
  }

  byId('choose-so-far').onclick = () => {
    showPredictionPreview('For me, no other game has surpassed ' + predictionSubject(draft.value) + ' so far.');
  };

  byId('choose-future').onclick = () => {
    showPredictionPreview('I think it’ll be hard for any other game to surpass ' + predictionSubject(draft.value) + '.');
  };

  byId('apply-prediction').onclick = () => {
    if (preview.hidden || !wording.textContent) return;
    draft.value = wording.textContent;
    setFeedback('Suggested wording applied. You can edit it in your draft.');
    draft.focus();
  };

  byId('switch').onclick = () => {
    mode.value = 'debate';
    setFeedback(messages.debate);
    mode.focus();
  };

  byId('use').onclick = () => {
    draft.value = 'The comparison depends on manufacturing emissions, energy sources and lifetime distance.';
    setFeedback('Suggested wording applied. You can edit it in your draft.');
    draft.focus();
  };
}

