// scripts.js

const MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  
  const data = {
    response: {
      requestType: "FETCH_ATHLETE_DATA",
      requestBy: "ALL_MATCHING_ATHLETES",
      forDisplay: "BEST_RACES",
      data: {
        NM372: {
          firstName: "Nwabisa",
          surname: "Masiko",
          id: "NM372",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [9, 7, 8, 6],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [6, 7, 8, 7],
            },
          ],
        },
  
        SV782: {
          firstName: "Schalk",
          surname: "Venter",
          id: "SV782",
          races: [
            {
              date: '2022-11-18T20:00:00.000Z',
              time: [10, 8, 3, 12],
            },
            {
              date: '2022-11-25T20:00:00.000Z',
              time: [6, 8, 9, 11],
            },
            {
              date: '2022-12-02T20:00:00.000Z',
              time: [10, 11, 4, 8],
            },
            {
              date: '2022-12-09T20:00:00.000Z',
              time: [9, 8, 9, 11],
            },
          ],
        },
      },
    },
  };
  
  // Only edit below this comment
  
  const createHtml = (athleteId) => {
    const athlete = data.response.data[athleteId];
    const races = athlete.races;
    const latestRace = races[races.length - 1];
  
    const fragment = document.createDocumentFragment();
  
    const title = document.createElement('h2');
    title.textContent = athleteId;
    fragment.appendChild(title);
  
    const list = document.createElement('dl');
  
    const fullName = `${athlete.firstName} ${athlete.surname}`;
    const totalRaces = races.length;
    const latestDate = new Date(latestRace.date);
    const latestEventDate = `${latestDate.getDate()} ${MONTHS[latestDate.getMonth()]} ${latestDate.getFullYear()}`;
    const totalTime = latestRace.time.reduce((acc, lapTime) => acc + lapTime, 0);
    const latestTotalTime = `${Math.floor(totalTime / 60).toString().padStart(2, '0')}:${(totalTime % 60).toString().padStart(2, '0')}`;
  
    list.innerHTML = /* html */ `
      <dt>Full Name</dt>
      <dd>${fullName}</dd>
  
      <dt>Total Races</dt>
      <dd>${totalRaces}</dd>
  
      <dt>Event Date (Latest)</dt>
      <dd>${latestEventDate}</dd>
  
      <dt>Total Time (Latest)</dt>
      <dd>${latestTotalTime}</dd>
    `;
  
    fragment.appendChild(list);
  
    return fragment;
  }
  
  const NM372 = document.querySelector('[data-athlete="NM372"]');
  const SV782 = document.querySelector('[data-athlete="SV782"]');
  
  NM372.appendChild(createHtml('NM372'));
  SV782.appendChild(createHtml('SV782'));
  