
const dumpService = {};

//TODO will break on fail, maybe a timeout
dumpService.startService = function startDump (config){
  this.getDump(config.dumpUrl).then(function(response){
    dumpService.data = (JSON.parse(response));
    dumpService.startService(config);
  })
 .catch(e => (console.log(e)))
};

dumpService.getDump = function getDump (url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Check you dump server, failed to load page, status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => {
        resolve(body.join(''));
      });
    });
    request.on('error', (err) => reject(err));
  });
};

dumpService.data = {};

export default dumpService;
