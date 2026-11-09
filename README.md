# ♻ Recycle Today, Protect Tomorrow

**Final English intercultural presentation · Australia × Colombia**

A complete responsive website for GitHub Pages, developed for a three-person live oral presentation about *Plastic Pollution & Recycling*. The page is in English and presents the five slides required by the teacher.

## 🎓 Presentation content

1. **Australia** — capital Canberra, map, 27.92 million residents (March 2026), English and First Nations languages, food, culture, technology, images.
2. **Colombia** — Bogotá, map, 53.3 million (2025 estimate), Spanish and ethnic native languages, food, images, plastic pollution.
3. **Statistics** — Australia 67.5% resource recovery (2024–25) and Colombia 19.69% waste recovered in the public cleaning-service system (2024); the website explicitly explains why these indicators cannot be directly compared.
4. **Organizations** — DCCEEW, APCO, Clean Up Australia; MinAmbiente, SuperServicios and local recycling associations.
5. **Awareness campaign** — logo, poster, slogan, objectives, action plan, vocabulary, YouTube video, QR and grammatical structures.

Additional final-phase deliverables: **live podcast script for 3 people, recording on the user's device, reflection, future forms, modal verbs, Zero / First / Second Conditionals, and Past Perfect**.

## 🧰 Technical features

- HTML5, CSS3 and vanilla JavaScript; no build or dependency installation required.
- Keyboard presentation mode: **▶ Present**, **← →**, **Page Up / Page Down**, **Home / End**, **Esc**.
- Maps: **OpenStreetMap**; credited photography: **Wikimedia Commons** and Bogotá city government.
- Photo galleries use the public **Wikimedia Commons MediaWiki API**; no API key required.
- Video: **YouTube's privacy-enhanced embed** (reference video from UNEP / United Nations).
- QR code: **api.qrserver.com**, generated from the public YouTube link.
- Live podcast audio: browser's **MediaRecorder** and microphone access; downloaded locally, **never automatically uploaded**.
- Responsive for phones and desktop; linked sources included on the site.

## 🚀 Publish in a NEW GitHub repository (leave UX repositories untouched)

1. Visit **https://github.com/new** while signed into the account `santkd16`.
2. Create a **public repository** called **`recycle-today-australia-colombia`**. Do not create it inside the UX project or rename the UX project.
3. Upload **the contents of this ZIP**, not the enclosing folder: `index.html`, `styles.css`, `script.js`, `assets/`, `.nojekyll`, `.github/workflows/deploy.yml`, `README.md`, etc.
4. Go to the new repository's **Settings → Pages**. Under **Build and deployment → Source**, select **GitHub Actions**.
5. In **Actions → Deploy English presentation → Run workflow**, run the deployment, or push another change to `main`.
6. When the green check appears, the website should be at **https://santkd16.github.io/recycle-today-australia-colombia/**.

*Only claim the website is published after the GitHub Actions deployment succeeds.* The connected GitHub tool in this conversation does not expose the operation to create a new repository or administer GitHub Pages, so those steps require your account in the GitHub interface.

## 🔧 Before the class

- Replace "Three English students" with the three real student names and optionally teacher/course details in `index.html`.
- Record the original team video. Replace `VIDEO_ID` in `script.js` with the 11-character ID from your team's public YouTube video. The page will show its video and QR automatically.
- Add a dedicated contact email **only if the group approves making it public**. Do not publish personal phone numbers.
- Practice the script together; each person has a defined speaking part.
- Check the external image API, video, QR and maps on the classroom Wi-Fi. The campaign's additional poster is saved locally in `assets/poster-campana.svg`.
- If no internet is available, the page's headings, text, graphics and local poster still work; external services need connectivity.

## ⚠ Source accuracy

Australia's **67.5%** is national **resource recovery** over different waste streams (including energy recovery). Colombia's **19.69%** refers to waste **reported recovered in the public cleaning-service system**. They must **not be interpreted as identical recycling metrics**. Sources are linked below and in the page.

Sources: [DCCEEW 2026](https://www.dcceew.gov.au/environment/protection/waste/publications/national-waste-resource-recovery-report-2026), [SuperServicios 2024 sectorial report listing](https://www.superservicios.gov.co/publicaciones), [ABS population](https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release), [DANE population](https://www.dane.gov.co/index.php/estadisticas-por-tema/demografia-y-poblacion/proyecciones-de-poblacion), [MinCultura languages](https://mng.mincultura.gov.co/areas/poblaciones/APP-de-lenguas-nativas/Paginas/default.aspx), and the page's References section.