import TVShowApp from './src/App.js';

describe('Testing Application counters ...', () => {
  const mockedComments = [
    {
      username: 'mock user 1',
      creation_date: '2022-04-22',
      comment: 'mock comment 1',
    },
    {
      username: 'mock user 2',
      creation_date: '2022-04-22',
      comment: 'mock comment 3',
    },
    {
      username: 'mock user 3',
      creation_date: '2022-04-22',
      comment: 'mock comment 3',
    },
  ];

  const mockedReservations = [
    {
      username: 'Joe Bidne',
      date_end: '2020-10-16',
      date_start: '2020-10-15',
    },
    {
      username: 'Add Me',
      date_end: '2022-03-09',
      date_start: '2021-04-25',
    },
    {
      date_end: '2022-01-01',
      date_start: '2021-02-03',
      username: 'Add 3rd Reserver',
    },
    {
      username: 'Update Dynamicaly',
      date_start: '2022-04-19',
      date_end: '2022-05-05',
    },
  ];

  const mockedShows = [
    {
      id: 250,
      name: 'mocked show 1',
    },
    {
      id: 250,
      name: 'mocked show 1',
    }];

  test('Comment Count should be equal to 3', () => {
    const commentCount = TVShowApp.getCommentCount(mockedComments);
    expect(commentCount).toBe(3);
  });

  test('Reservation Count should be equal to 4', () => {
    const commentCount = TVShowApp.getReservationCount(mockedReservations);
    expect(commentCount).toBe(4);
  });

  test('Show Count should be equal to 2', () => {
    const commentCount = TVShowApp.getShowsCounter(mockedShows);
    expect(commentCount).toBe(2);
  });
});