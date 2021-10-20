# Change Log

## [v0.2.27]

** Fixes **
  - Update documentation to follow latest api signatures
  - Remove positioning functionality in lieu of moveable and resizable window.
  - Remove open component icon in lieu of smaller and less obtrusive button with text.
  - Remember resized width and height when you reopen devtools. (IndexDB)

## [1.0.0]
** Package and security updates 4/26/2021 **
 - Update all packages to latest versions
 - Fix a few small bugs
 - update theme switcher to simple button
 - cleanup padding in keys

## [1.0.1]
  - Remove validating keys from cache for display
  - Further cleanup padding and UI (still work in progress)

## [1.0.2]
  - Feature make the keys window draggable

## [1.0.3]
  - Fixed default styling (tricked by tailwind and storybook)

## [1.0.4]
  - Fixed Data window to always be current width and height

## [2.0.0]
  - Upgrade to SWR 1.0
  - Slightly change implementation to work with new cache from swr.
  - Upgrade dependencies

## [2.0.4]
  - Implement custom cache to bring back old subscribe functionality
## [2.0.6]
  - More fixes and remove indexdb approach store 1 theme value in localstorage instead.

# [2.1.1]
  - Fixes middleware issues using post message. Clearing and mutating should work again as well.
  - Cleaned up UI.