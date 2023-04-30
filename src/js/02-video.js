import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');
const STORAGE_KEY = 'videoplayer-current-time';

const currentTime = localStorage.getItem(STORAGE_KEY);

if (currentTime) {
  player.setCurrentTime(currentTime);
}

const timeUpdateHandler = (data) => {
  localStorage.setItem(STORAGE_KEY, data.seconds);
  console.log('data', data);
};

const throttledHandler = throttle(timeUpdateHandler, 1000);

player.on('timeupdate', throttledHandler);
player.on('play', () => {
  console.log(localStorage.getItem(STORAGE_KEY));
});
