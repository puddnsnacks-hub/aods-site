# CHOOSE — which component

1. Find the family by the end goal, meaning what the user is doing, in the table below. The end goal gives the family, not the mechanism: a pagination is a row of links, but its goal is to move the user, so it is wayfinding.
2. Answer the question in that family's section. Each answer names one component.
3. If the rival you are weighing sits in another family, look for the compound section named with both. The compound sections follow the eleven family sections.
4. An answer may narrow the component: `field.parts[error, help]` means those parts of a field; `ground[data-ground=dark]` means a ground with that value.
5. Every component in the system appears here at least once. If a need is not here, check NOT IN THE SYSTEM before inventing anything.

| Family | The end goal | Family | The end goal |
|---|---|---|---|
| fields | the user gives | sets | two or more grouped blocks |
| actions | the user triggers | data | values the user looks up or compares |
| messages | the user receives | chrome | the page frame |
| wayfinding | the user goes | conversation | the user with AI |
| content | the user reads | layout | the model every page is made of |
| blocks | content contained | | |

## FIELDS — the user gives
Members: `input` `label` `field` `form` `select` `checkbox` `radio` `switch` `selection-card` `search`

### What does the user give?
- A search query → search
- Any other free text → input
- One value from a long list → select
- One value from a short list → radio
- Any number of values, or a single yes or no → checkbox
- A setting that takes effect at once → switch
- A choice among options that each need a title and a description → selection-card

### How much of the form is it?
- The control's name → label
- One control or set of options, with its name, help and error → field
- Groups of fields and their actions → form

## ACTIONS — the user triggers
Members: `button` `button-group` `chip`

### What does the user trigger?
- One task → button
- Several tasks, together → button-group
- A filter or a toggle over a set of results → chip

## MESSAGES — the user receives
Members: `alert` `site-alert` `toast` `badge` `error-summary` `steps` `modal`

### What is the object of the message?
- The field above → field.parts[error, help]
- What it sits beside → alert
- The preceding action → toast
- A submitted form → error-summary
- The whole site → site-alert
- A mandatory decision → modal

## WAYFINDING — the user goes
Members: `link` `breadcrumb` `menu` `in-page-nav` `tabs` `pagination` `document-link` `explorer`

### Where do the links go?
Note: the silhouette does not decide; the destination does. A side nav can be either.
- Other pages → menu
- Sections of this page → in-page-nav
- The pages above this one → breadcrumb
- The next pages of one list → pagination

### What happens when the user picks?
- The view changes in place → tabs
- The page scrolls to a section → in-page-nav

### How long are the labels?
- A word or two → tabs
- A title with a summary and a meta line → explorer

### What is at the other end?
- A page → link
- A file → document-link

## CONTENT — the user reads
Members: `prose` `text` `code` `kbd` `eyebrow` `section-heading` `pull-quote` `divider` `icon` `sr-only`

### Who wrote the markup?
- An author or a CMS, as bare tags → prose
- You, class by class → text

### What is the text for?
- Opening a page or a section → section-heading
- Naming what the block below is about → eyebrow

### What is the string?
Note: inside prose, a bare code tag is already styled; add no class.
- A key to press → kbd
- Something to type, copy or match → code

### Where does the line go?
- Between two blocks → divider
- Under an eyebrow → eyebrow[data-divider]
- Around a panel → paper

### Is it seen, or only announced?
Note: if the words would help sighted users too, show them.
- Seen, as a mark from the icon set → icon
- Only announced → sr-only

## BLOCKS — content contained
Members: `summary-box` `card` `tile` `section-opener` `objective` `hero` `disclosure`

### What is the block?
- A piece of content in its own right → card
- A piece of content led by an image → tile
- A recap of what came before → summary-box
- One point of a numbered argument → objective

## SETS — two or more grouped blocks
Members: `accordion` `reference-list` `collection`

### What is the list of?
- Questions, each opening onto its answer → accordion
- Terms and their definitions, always shown → dl
- Numbered sources → reference-list
- Pages, each with a summary → collection
- Files → document-link

## DATA — values the user looks up or compares
Members: `stat` `dl` `table`

### What shape is the data?
Note: a table holds data. Content arranged in columns is layout, not a table.
- Measured figures, each with a label → stat
- One record's fields → dl
- Many records, compared → table

## CHROME — the page frame
Members: `header` `footer` `gov-banner` `skip-link`

### Which part of the frame is it?
- The official-site notice → gov-banner
- The jump to the main content → skip-link
- The top of every page → header
- The bottom of every page → footer

## CONVERSATION — the user with AI
Members: `conv-thread` `conv-message` `conv-avatar` `conv-composer` `conv-chip` `conv-step` `conv-source` `conv-actions` `conv-typing` `conv-notice`

### Is the user talking with AI?
- Yes → conv-thread
- No → layout

### Whose turn is it?
- The user's or the assistant's → conv-message
- The system's → conv-notice

### Which part of a turn is it?
- The speaker's mark → conv-avatar
- The buttons under a reply → conv-actions
- The wait before a reply → conv-typing

### What is being typed?
- A turn → conv-composer
- A form value → input

### What does the chip offer?
- Something to say → conv-chip
- A filter → chip

### What does the reference point to?
- The source of the assistant's claim → conv-source
- A numbered source in the page's own list → reference-list

## LAYOUT — the model every page is made of
Members: `page` `ground` `layout` `paper`

### What is it for?
- The whole document → page
- A section's color, edge to edge → ground
- Columns within a section → ground[data-container]
- A panel with its own fill → paper
- Arrangement and spacing only → layout

## WAYFINDING and FIELDS
### What does choosing do?
- Goes to another page → menu
- Runs a command → menu
- Sets a value → select

## MESSAGES and ACTIONS
### Can the user act on it?
- No → badge
- Yes → chip

## ACTIONS and WAYFINDING
### Does it go somewhere, or do something?
- Does something → button
- Goes somewhere → link

## MESSAGES and CONVERSATION
### Who is making progress?
- The user, through pages → steps
- The assistant, through its work → conv-step

## CONTENT and BLOCKS
### What opens it?
- The page, with a photograph → hero
- A page or a section, without one → section-heading
- A numbered section → section-opener

### What is the set-apart text?
- A sentence repeated from the text → pull-quote
- A recap of the argument → summary-box

## BLOCKS and SETS
### Does the panel describe something else, or itself?
Note: a disclosure is one bar; an accordion is a list.
- Something above it → disclosure
- Itself → accordion

## NOT IN THE SYSTEM
### Looking for a carousel, a slider or a sideways-scrolling strip?
Note: no horizontal scrollers. When something does not fit, wrap it, fold it or cut it.
- Chips or links that do not fit → layout[data-kind=cluster]
- Site navigation that does not fit → header
- Tabs that do not fit → tabs
- An on-this-page nav on a narrow screen → in-page-nav
- A table too wide for the page → table
- Slides → none

### Looking for a dark mode or a theme switch?
Note: dark is a variant on components, never a page mode.
- A dark section → ground[data-ground=dark]
- One dark block on a light page → card[data-surface=dark]
- A switch for the whole site → none

### Looking for rounded corners or a pill?
Note: outside the conversation family, boxes, buttons and pills are square.
- Rounded, in a conversation with AI → conv-thread
- Rounded anywhere else → none

### Looking for an icon font, or one component per icon?
Note: an icon alone is never a name; an icon-only control also carries a hidden label.
- Any mark in the set → icon
- An icon font → none

### Looking for a spinner, a loader or a progress bar?
Note: the system has none of these; say so rather than build one.
- A journey across pages → steps
- The assistant composing → conv-typing
- The assistant's tool call → conv-step
- A table still loading → table[aria-busy]
- A spinner or a percentage bar → none
