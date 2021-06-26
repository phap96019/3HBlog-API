const CronJob = require('cron').CronJob;
const job = new CronJob({
  cronTime: '*/1 * * * *',
  // https://crontab.guru/#*_*_*_*_* 
  onTick: function() {
    console.log('Cron job log: ', new Date());
  },
  start: true, 
  timeZone: 'Asia/Ho_Chi_Minh'
});

module.exports = job;