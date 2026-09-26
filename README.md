# WEB103 Project 4 - Bolt Bucket

Submitted by: **Quoc Bao Le**

About this web app: **A car customizer where users pick exterior color, wheels, spoiler, interior, and engine. The preview SVG updates live and the price recalculates with each choice. Builds are saved to a PostgreSQL database and can be viewed, edited, or deleted.**

Time spent: **5** hours

## Required Features

- [x] The web app uses React to display data from the API.
- [x] The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.
  - [x] NOTE: walkthrough includes Render dashboard + `SELECT * FROM custom_items;`
- [x] Users can view multiple features of the `CustomItem` they can customize (5 features).
- [x] Each customizable feature has multiple options (3–5 each).
- [x] On selecting each option, the displayed visual icon updates.
- [x] The price changes dynamically as different options are selected.
- [x] The visual interface changes in response to at least one customizable feature.
- [x] The user can submit their choices to save the item.
- [x] Impossible combos show an error message and are not saved.
- [x] Users can view a list of all submitted `CustomItem`s.
- [x] Users can edit a submitted `CustomItem` from the list view.
- [x] Users can delete a submitted `CustomItem` from the list view.
- [x] Users can update or delete `CustomItem`s from the detail page.

## Optional Features

- [x] Selecting particular options prevents incompatible options from being selected even before form submission — the Save button greys out and a warning appears the moment an incompatible combo is picked.

## Additional Features

- [x] Live pricing — the total updates on every dropdown change without submitting
- [x] Five customizable features (color, wheels, spoiler, interior, engine) instead of the minimum
- [x] SVG preview redraws for every feature, not just one
- [x] Nickname required before saving

## Video Walkthrough

<img src='Recording 2026-09-26 at 17.03.22.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with gifcap

## Notes

Building the SVG preview so all five features changed visually was the hardest part — I had to parametrize wheel radius, body fill, seat color, spoiler geometry, and engine badge all from a single `build` object. The impossible-combo validation lives in a shared `options.js` file that both the client and server import, so the frontend blocks bad submits before the request goes out and the backend rejects them again if the client is bypassed.

## License

Copyright 2026 Quoc Bao Le

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.