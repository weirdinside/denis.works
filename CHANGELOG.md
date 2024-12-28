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

- optimize 3D and add options for turning on/off ASCII and b/w
- manage screen size for work sub-projects on smaller screens
- ~~clean up conditional path logic for hiding parent routes in navigation~~

## [0.1.2] - December 28th, 2024

- refactored Nav and NavItem into its own reusable component, storing routes in a constants file (_utils/constants.ts_)
- adjusted path logic and redid some framing css to allow outlets in navigation components - this may require a second look

### TODO

- remaining tasks from 0.1.1
