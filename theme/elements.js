const getCrunchyrollThemeElements = () => ([
  [ // Primary-colored elements
    ...document.getElementsByTagName('body'),
    ...document.getElementsByClassName('main-tabs'),
  ],
  [ // Secondary-colored elements
    ...document.getElementsByClassName('site-header'),
    ...document.getElementsByClassName('template-container'),
    ...document.getElementsByClassName('old-template-body'),
    ...[...document.getElementsByClassName('group-item')].flatMap((e) => [...e.getElementsByTagName('a')]),
    // ...[...document.querySelectorAll('#tabs')].flatMap((e) => [...e.querySelectorAll('a:not(.selected):not(.sub-tabs-category)')]), //need to add custom css rule instead
  ],
  [ // Tertiary-colored elements
    ...document.getElementsByClassName('white-wrapper'),
    ...document.getElementsByClassName('header-searchbox'),
    ...document.getElementsByClassName('availability-notes-low'),
    ...document.getElementsByClassName('guestbook-form'),
    ...document.getElementsByClassName('guestbook-sort-bar'),
    ...document.getElementsByClassName('message-container'),
    ...document.getElementsByClassName('reply-form'),
    ...document.getElementsByClassName('show-all-simulcasts-button'),
    ...document.getElementsByClassName('season-dropdown'),
    document.getElementById('tabs'),
    ...document.getElementsByClassName('sub-tabs'),
    // ...[...document.querySelectorAll('#tabs')].flatMap((e) => [...e.querySelectorAll('a.selected:not(.sub-tabs-category)')]), //need to add custom css rule instead
  ],
]).map((arr) => arr.filter((e) => !!e));