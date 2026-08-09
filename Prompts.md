# ABTalks — All Prompts From Today

## 1. Initial ABTalks redesign

> Redesign ABTalks. It runs a 60-day coding challenge for Indian college students. Students pick a track, build something every day, and maintain a public learning streak by submitting a GitHub commit and LinkedIn post. Build mobile-first screens for `/`, `/dashboard`, and `/day/12`. Include current streak, today's task, challenge progress, completion, standing/achievements, task details, GitHub/LinkedIn proof submission, first-day zero state, missed day, empty profile, and at least one thoughtful UX improvement. Use mocked data. Authentication, real accounts, production DB, recruiter dashboard and admin panel are out of scope.

## 2. Mobile-first UX polish

> Add Dark Mode by Default, thumb-friendly touch targets, a sticky bottom action bar, streak freeze/recovery, proof preview cards, a shareable progress card, Day 1/Kickoff state, missed-day state, incomplete-profile nudge, confetti on submission, and one-click Test Link buttons for GitHub/LinkedIn.

## 3. Bigger fonts, colour, validation, public URL and daily joke

> Make fonts bigger, add more colours to the dark landing page, use quirky shaped boxes, validate Gmail as `@gmail.com`, validate LinkedIn and GitHub URLs, add autofill options, use a public URL rather than localhost, add more confetti, make ABTalks understandable to a first-time student, and add a popup daily coding joke that is funny and teaches coding.

## 4. Hero cleanup and advanced interactions

> Remove `BUILD EVERY DAY`, `YOUR WORK COUNTS ↑`, `SHIP IT ✦`, and `60 DAYS · INDIA`. The coding joke should only appear when clicked and each click should give a new joke from 20 jokes in rotation. Add GitHub diff/commit previews, LinkedIn post skeleton, live dashboard activity ticker, milestone badges with tooltips, starter-template copy with toast, estimated time/skill/difficulty metadata, toggleable audio/haptic feedback, and themed code-symbol confetti.

## 5. Fix the blank page

> Fix the blank page in the v4 project.

## 6. Rebuild for localhost

> This page is showing up as blank can you make it again to http://localhost:5173/

## 7. Previous v5 request

> Add audio, not just an audio button option. With every joke, change the emoji because only one emoji appears right now. Make some of the weird landing-page shapes a little bigger so their text stays completely inside. Make CHOOSE, BUILD and PROVE clickable so something opens or they go somewhere. If I write even one letter in the GitHub field, show `github.com/` at the back so the user does not need to write it. Make the personal builder page use the same colour format as the first page, including orange/yellow options. Give me all prompts of today in an MD file.

## 8. Latest correction — audio must be button-controlled

> You did not make anything change in the last prompt. Do it again properly. The song can just be beats if a song is not allowed. I do not want the audio played when I click on a joke. I want an audio button: if I click on it, I want the audio to play.

### Latest implementation

- Added a **Play beats** button to the landing page.
- Beats are generated locally with the browser Web Audio API, so there is no copyrighted song or external audio file.
- Clicking **Play beats** starts a short looping coding beat. Clicking it again stops the beat.
- **Need a joke?** does **not** play audio.
- **Another joke** does **not** play audio.
- Joke emojis remain unique across the 20-joke rotation.
- CHOOSE / BUILD / PROVE are actual links.
- Landing cards are larger so their text fits inside.
- GitHub fields show `github.com/` as a fixed visual prefix while the user types the username/repository.
- Builder profile remains available at `/builder/twisha` and uses the same colour language as the landing page.

## Route map

```text
/
/dashboard
/day/12
```
