# Atlas Trek

Build a modern, production-ready trekking and travel discovery web application called "NepGuide".

The app must be deployable on Vercel and should use Supabase as the database/backend where appropriate.

IMPORTANT:

- Build the actual working application, not just a static mockup.

- Use clean, modular, scalable architecture.

- Make the UI responsive for desktop, tablet and mobile.

- Prioritize excellent animations, smooth transitions and polished UX.

- The initial content focus is Nepal, but the architecture MUST support adding every country in the world later.

- Do not hard-code the architecture specifically for Nepal.

- Use realistic sample data for Nepal initially.

- If an external API/key is required, create a clear environment-variable setup and graceful fallback.

- Avoid exposing secret keys on the frontend.

# 1. BRAND

Website name:

NepGuide

Create a clean custom logo for NepGuide using an appropriate mountain + route/path/travel visual concept.

For now, generate the logo yourself using SVG/CSS rather than requiring me to upload an image.

Brand feeling:

- Adventure

- Premium

- Clean

- Modern

- Geographic/exploration focused

- Trustworthy

Use a light overall visual theme.

Suggested colors:

- Off-white / very light background

- Deep mountain green

- Himalayan blue

- Dark charcoal text

- Subtle orange/red accent inspired by Nepal

Do not make the site look like a generic travel booking website.

# 2. HOMEPAGE / HERO

Create a beautiful immersive homepage.

At the top:

Navbar:

- NepGuide logo

- Explore

- Destinations

- Trekking Routes

- Countries

- About

- Search icon / search field

- Responsive mobile navigation

Main hero section:

Large headline:

"Explore the World. Trek Beyond the Map."

Supporting text:

"Discover trekking routes, destinations, road journeys, travel distances, estimated days and trip costs — starting with Nepal."

Place a prominent search bar below the heading.

Search placeholder:

"Search popular destinations..."

Search should support:

- Countries

- Cities

- Trekking destinations

- Trekking routes

- Mountains

- Popular attractions

Examples:

Everest Base Camp

Annapurna Circuit

Pokhara

Mustang

Langtang

Manaslu Circuit

Nepal

When a user searches for a destination/country:

1. Show autocomplete suggestions.

2. On selection, smoothly animate the globe.

3. Rotate the globe toward the selected country/region.

4. Highlight the selected location.

5. Open/show the relevant country or destination information.

6. Scroll smoothly to the relevant map/details section.

# 3. INTERACTIVE 3D GLOBE

This is one of the main features of the website.

Create a large interactive 3D Earth/globe.

The globe should:

- Rotate slowly automatically.

- Allow mouse drag rotation.

- Allow touch drag on mobile.

- Allow zoom.

- Have beautiful atmospheric lighting.

- Have subtle stars/background particles.

- Feel premium and cinematic but remain lightweight.

- Use WebGL/Three.js or another appropriate technology.

The globe should display country boundaries.

Countries should be clickable.

When hovering:

- Highlight the country.

- Show country name.

- Use a subtle glow.

When clicking a country:

- Smoothly rotate/transition the globe to that country.

- Highlight the selected country.

- Display that country's travel information.

- Show popular destinations/routes for that country.

Initially populate detailed data for Nepal.

For other countries:

- Create the database architecture and UI so they can be added later.

- It is okay to show a "Coming soon" state for countries without detailed route data.

# 4. NEPAL AS INITIAL FOCUS

Nepal should have extensive initial sample content.

Create data for major destinations and trekking routes such as:

EVEREST REGION

- Everest Base Camp Trek

- Everest Base Camp via standard route

- Gokyo Lakes Trek

- Gokyo–Everest Base Camp route

- Three Passes Trek

- Everest View Trek

ANNAPURNA REGION

- Annapurna Circuit

- Annapurna Base Camp Trek

- Mardi Himal Trek

- Ghorepani Poon Hill Trek

- Khopra Ridge Trek

- Tilicho Lake Trek

- Nar Phu Valley Trek

LANGTANG REGION

- Langtang Valley Trek

- Gosaikunda Trek

- Langtang–Gosaikunda Trek

- Helambu Trek

MANASLU / GANESH / CENTRAL HIMALAYA

- Manaslu Circuit Trek

- Tsum Valley Trek

- Ganesh Himal Trek

MUSTANG

- Upper Mustang Trek

- Lower Mustang Trek

- Jomsom / Muktinath route

DOLPO

- Upper Dolpo Trek

- Lower Dolpo Trek

- Shey Phoksundo route

KANCHENJUNGA

- Kanchenjunga Base Camp Trek

OTHER DESTINATIONS

- Pokhara

- Kathmandu

- Chitwan

- Lumbini

- Nagarkot

- Bandipur

- Ilam

- Rara Lake

- Khaptad

- Janakpur

- Everest region

- Annapurna region

- Langtang region

- Mustang region

Do not imply that this is an exhaustive list. Structure the database so more can easily be added.

# 5. MAP SECTION

After the globe, create a large interactive map section.

The map should be one of the primary features of the application.

Use a modern map library such as MapLibre GL JS, Mapbox GL JS, or another suitable mapping solution.

Prefer an open-source solution where practical.

The map should show:

- Nepal country boundary

- Provinces/regions where useful

- Major cities

- Airports

- Major highways/roads

- Trekking trails/routes

- Trekking destinations

- Mountain/base camp locations

- Important landmarks

- Route start/end points

Roads must be clearly distinguishable from trekking trails.

Use different visual styles:

Road:

solid lines

Trekking trail:

dashed/dotted mountain-colored lines

Major trekking route:

thicker highlighted line

Selected route:

animated glowing line

Use map markers/icons for:

- Trekking

- City

- Airport

- Mountain

- Lake

- Heritage site

- Base camp

The map should feel visually clean and not overloaded.

# 6. ROUTE ANIMATIONS

When a user selects a trekking route:

Animate the route being drawn on the map.

Then show:

- Start point

- End point

- Major stops

- Distance

- Elevation information where available

- Estimated trekking days

- Difficulty

- Best season

- Estimated budget

- Transportation information

Add an optional animated route progression effect.

Example:

Kathmandu

↓

Lukla

↓

Phakding

↓

Namche Bazaar

↓

Tengboche

↓

Dingboche

↓

Lobuche

↓

Everest Base Camp

The exact route stages should come from the database.

# 7. DESTINATION CARDS BELOW MAP

Under the map create:

"Popular Destinations in Nepal"

Use beautiful cards.

Each card should include:

- Destination image

- Name

- Region

- Short description

- Trek/travel type

- Approximate duration

- Difficulty

- Starting price/budget estimate

Cards should have hover animations.

Clicking a card should open a detailed destination page or modal.

Examples:

Everest Base Camp

Annapurna Circuit

Annapurna Base Camp

Mardi Himal

Langtang Valley

Manaslu Circuit

Upper Mustang

Gokyo Lakes

Gosaikunda

Tilicho Lake

Pokhara

Mustang

# 8. DESTINATION DETAIL PAGE

When clicking a destination, create a beautiful detailed page.

Header:

- Large hero image

- Destination name

- Region

- Short introduction

Then show an information dashboard:

Distance:

Example:

"Approx. 130 km trekking distance"

Duration:

"12–14 days"

Difficulty:

"Moderate / Challenging"

Estimated budget:

"USD XXX–XXX"

Best season:

"Spring / Autumn"

Starting point:

"Kathmandu"

Highest point:

"XXX m"

Then sections:

Overview

Route

Day-by-day itinerary

Map

Distance

Transportation

Accommodation

Food

Permits

Estimated cost

Best season

Difficulty

Safety / preparation

Nearby destinations

# 9. TRIP COST CALCULATOR

Add estimated cost information.

Break cost into categories:

- Transportation

- Accommodation

- Food

- Guide

- Porter

- Permits

- Flights

- Miscellaneous

Show:

Estimated total:

NPR XXX,XXX

Also allow currency selection:

NPR

USD

EUR

GBP

INR

Use approximate estimates and clearly label them as estimates.

Do not present estimated costs as guaranteed prices.

# 10. TRAVEL DISTANCE

For destinations, show useful travel information.

Example:

Kathmandu → Pokhara

Road distance:

XXX km

Approximate road travel:

X hours

Flight:

X minutes

For trekking routes:

Kathmandu → Lukla

Flight

Lukla → Everest Base Camp

Trekking

Use clear icons.

Where actual road routing is unavailable, label values as approximate rather than pretending they are exact.

# 11. SEARCH + GLOBE CONNECTION

This interaction is extremely important.

Example:

User searches:

"Everest Base Camp"

Then:

1. Search suggestions appear.

2. User selects Everest Base Camp.

3. Globe rotates toward Nepal.

4. Nepal highlights.

5. A subtle marker appears around the Everest region.

6. UI transitions toward the Nepal map.

7. Everest Base Camp route becomes highlighted.

8. Destination information panel opens.

Another example:

User searches:

"Japan"

Then:

- Globe rotates to Japan.

- Japan becomes highlighted.

- Japan country panel opens.

- If detailed content doesn't exist yet:

  show "Japan travel routes are coming soon."

- Do NOT break the interface.

# 12. COUNTRY EXPLORATION

Create a reusable country page structure.

Example:

Country:

Nepal

Sections:

- Country overview

- Popular destinations

- Popular trekking routes

- Major cities

- Mountains

- Travel information

- Map

- Recommended routes

Database structure must support:

countries

regions

cities

destinations

trekking_routes

route_stops

road_routes

attractions

images

travel_info

cost_estimates

Each route should reference its country and region.

# 13. SUPABASE DATABASE

Use Supabase for structured content.

Create appropriate tables such as:

countries

regions

destinations

trekking_routes

route_stops

attractions

cities

road_routes

travel_costs

travel_seasons

images

Suggested route fields:

id

country_id

region_id

name

slug

description

short_description

difficulty

duration_days

distance_km

elevation_max_m

best_season

start_location

end_location

estimated_cost_min

estimated_cost_max

currency

hero_image

is_featured

created_at

updated_at

Route stops:

id

route_id

name

latitude

longitude

day_number

elevation_m

distance_from_previous_km

description

Destinations:

id

country_id

region_id

name

slug

type

description

latitude

longitude

image

duration_days

distance_km

difficulty

estimated_cost_min

estimated_cost_max

best_season

is_featured

Countries:

id

name

slug

iso_code

latitude

longitude

description

hero_image

is_active

Make relationships and indexes sensible.

# 14. ADMIN / CONTENT ARCHITECTURE

Do not necessarily build a full admin dashboard initially, but structure the project so a future admin dashboard can easily manage:

- Countries

- Destinations

- Routes

- Route stops

- Images

- Cost estimates

- Travel information

Supabase should make this scalable.

# 15. DESIGN

Overall design:

Light theme.

Background:

#F7F9F7 or similar.

Cards:

White with subtle borders and shadows.

Typography:

Modern sans-serif.

Use large editorial headings.

Avoid excessive gradients.

Use subtle glassmorphism only where it improves the design.

Maps/globe can have darker geographic visuals while the overall website remains light.

The interface should feel like a combination of:

- modern travel explorer

- geographic atlas

- trekking guide

- interactive map

NOT:

- generic booking website

- generic dashboard

- overly colorful tourism website

# 16. ANIMATIONS

Animations are very important.

Use smooth animations for:

- Globe rotation

- Country selection

- Search suggestions

- Map route drawing

- Card hover

- Page transitions

- Modal opening

- Scroll reveal

- Number counters

- Map marker appearance

- Route selection

Keep animations performant.

Respect:

prefers-reduced-motion

Do not make animations annoying or excessive.

# 17. RESPONSIVE DESIGN

Desktop:

Large interactive globe + content.

Tablet:

Responsive globe and map.

Mobile:

- Globe should remain interactive but appropriately sized.

- Search should be prominent.

- Map should remain usable.

- Cards should become horizontally scrollable or stacked.

- Route details should be easy to read.

- Navigation should become a mobile menu.

# 18. PERFORMANCE

Optimize for Vercel deployment.

Use:

- lazy loading

- image optimization

- code splitting

- efficient map rendering

- efficient 3D rendering

- caching where appropriate

Do not load unnecessary heavy resources before needed.

The 3D globe should not make the site unusably slow.

# 19. ACCESSIBILITY

Include:

- keyboard navigation

- accessible buttons

- alt text

- proper heading hierarchy

- sufficient contrast

- visible focus states

- reduced motion support

# 20. SEO

Create SEO-friendly pages.

Dynamic metadata for:

- Country

- Destination

- Trekking route

Example:

NepGuide | Everest Base Camp Trek

Use clean URLs:

/country/nepal

/destination/everest-base-camp

/trek/everest-base-camp-trek

# 21. INITIAL NEPAL EXPERIENCE

When someone first visits the website:

Show:

NepGuide

"Explore the World. Trek Beyond the Map."

Search bar:

"Search popular destinations..."

Then a beautiful 3D globe.

The globe should initially focus visually on Nepal or rotate naturally and eventually reveal Nepal.

Below:

"Explore Nepal"

Interactive Nepal map.

Then:

"Popular Trekking Routes"

Cards for:

- Everest Base Camp

- Annapurna Circuit

- Annapurna Base Camp

- Mardi Himal

- Langtang Valley

- Manaslu Circuit

- Upper Mustang

- Gokyo Lakes

- Gosaikunda

- Tilicho Lake

Then:

"Popular Destinations"

Pokhara

Kathmandu

Mustang

Chitwan

Lumbini

Nagarkot

Bandipur

Rara Lake

Ilam

Janakpur

# 22. MAP DATA / FALLBACK

If a map provider/API key is unavailable:

Do not show a broken map.

Instead:

- provide a clear setup message for the required environment variable

- use a graceful fallback map/visualization where possible

- keep all destination information functional

Create .env.example with required variables.

Do not commit secret API keys.

# 23. VERCEL

Make sure the project is Vercel deployment ready.

Include:

- correct build configuration

- environment variable documentation

- production-safe error handling

- Supabase configuration

- no localhost-only assumptions

# 24. IMPORTANT PRODUCT PRINCIPLE

The website should feel like:

"Google Maps + trekking guide + interactive globe + travel atlas"

but with its own NepGuide identity.

The globe, map and destination content should feel like one connected experience rather than separate pages.

A user should be able to:

Search → Globe rotates → Country highlights → Map opens → Route highlights → Destination details → Cost/distance/days appear.

Make this entire interaction smooth and visually impressive.

# 25. FINAL IMPLEMENTATION REQUIREMENT

Before considering the project complete:

- Test all navigation.

- Test search.

- Test globe interaction.

- Test country selection.

- Test map interaction.

- Test route selection.

- Test destination cards.

- Test responsive layout.

- Test Supabase queries.

- Handle missing data gracefully.

- Remove placeholder lorem ipsum.

- Use realistic Nepal travel/trekking content.

- Make sure no UI element looks unfinished.

- Make the application feel production-ready.

Start by implementing the homepage, 3D globe, search, Nepal map, Nepal routes, destination cards, destination details and Supabase schema.

Then make the architecture ready for every country in the world.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3d96a489-a6d2-450a-8c1c-b7dab1cb3edd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
