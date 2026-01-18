const lexicon = [
  {
    lemma: "mahxaktel",
    ipa: "/ˌmaː.xakˈtɛl/",
    pos: "verb",
    gloss: "to hesitate",
    usage: "Used when someone delays out of uncertainty or fear.",
    example: "Na mahxaktel en silu.",
    translation: "“I hesitated at the doorway.”"
  },
  {
    lemma: "kelen",
    ipa: "/ˈke.len/",
    pos: "noun",
    gloss: "island; homeland",
    usage: "Often used to refer to Kelan as a cultural entity.",
    example: "Kelen ot seli.",
    translation: "“The island is home.”"
  },
  {
    lemma: "taih",
    ipa: "/taɪ̯h/",
    pos: "adjective",
    gloss: "red",
    usage: "Used for physical color and metaphorical “danger.”",
    example: "Taih kulen ot la.",
    translation: "“The sky is red.”"
  }
  // Add more entries here...
];

// Sort alphabetically
lexicon.sort((a, b) => a.lemma.localeCompare(b.lemma));
