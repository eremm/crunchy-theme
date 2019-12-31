const getCrunchyrollThemeElements = () => ([
  [ // Primary-colored elements
    ...document.getElementsByTagName('body'),
  ],
  [ // Secondary-colored elements
    ...document.getElementsByClassName('site-header'),
    ...document.getElementsByClassName('template-container'),
    ...document.getElementsByClassName('old-template-body'),
  ],
  [ // Tertiary-colored elements
    ...[...document.getElementsByClassName('group-item')].flatMap(
      (item) => [...item.getElementsByTagName('a')]
    ),
    ...document.getElementsByClassName('white-wrapper'),
    ...document.getElementsByClassName('header-searchbox'),
    ...document.getElementsByClassName('availability-notes-low'),
    ...document.getElementsByClassName('guestbook-form'),
    ...document.getElementsByClassName('guestbook-sort-bar'),
    ...document.getElementsByClassName('message-container'),
    ...document.getElementsByClassName('reply-form'),
    ...document.getElementsByClassName('show-all-simulcasts-button'),
  ],
]);