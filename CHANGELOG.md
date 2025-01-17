# CHANGELOG

## [0.0.1] - December 17th, 2024

- basic design implemented with some transitions and [nuqs](https://nuqs.47ng.com/) as state management

### TODO

- ~~get rid of monolith file structure, split code into separate components~~
- ~~fix light mode styles, add dark mode toggle at top right of screen~~
- ~~collapse footer into a single (i) icon on the bottom right of screen~~
- ~~put 'weird inside' logo on top left of screen that directs to parent site~~

## [0.1.1] - December 27th, 2024

- massive redesign into the 'analog device' design language. removed nuqs as state manager, though may be useful in the future for mini-interactions
- implemented react-router for page routing and styling for breakpoints of the frame

### TODO

- ~~optimize 3D~~ and [SCRAPPED] add options for turning on/off ASCII and b/w (?)
- ~~manage screen size for work sub-projects on smaller screens~~
- ~~clean up conditional path logic for hiding parent routes in navigation~~

## [0.1.2] - December 28th, 2024

- refactored Nav and NavItem into its own reusable component, storing routes in a constants file (_utils/constants.ts_)
- adjusted path logic and redid some framing css to allow outlets in navigation components - this may require a second look

### TODO

- ~~remaining tasks from 0.1.1~~

## [0.1.3] - January 1st, 2025

- added transitions between routes
- wrote more copy for certain pages (mainly PRESS.md from DENIS EP)
- changed behavior of images on certain pages to be static, and added color underlay/overlay for ASCII (possibly re-implement with p5.js? no need to use 3JS / R3F here)
- more mobile optimization

### TODO

- ~~debug route exits not working in framer-motion~~ convert to RTG instead??
- ~~add icons on buttons for navigation and style 'glow' when active~~
- simplify component logic for .pkg routes
  - ~~add motion.div templates for these~~ might not be necessary if using RTG

## [1.1.4] - January 3rd, 2025 [*DEPLOYMENT BUILD*]

- added icons to buttons for page navigation
- changed parts of mobile styling to better fit on small devices

### TODO

- remaining tasks from 0.1.3
- ~~audio player design + implementation~~

## [1.2.0] - January 17th, 2025

- implemented audio player in rudimentary fashion
- doesn't really work on mobile that well, maybe you need to use audioCtx

### TODO

- redo audio player implementation and figure out a better design possibly
