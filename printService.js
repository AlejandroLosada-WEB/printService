const Service = require("node-windows").Service;
//const Service = require('node-mac').Service;
const svc = new Service({
    name:'printService',
    description: 'Elbarqr',
    script: 'D:\\copias nuevas\\print\\index.js',
  });

  svc.on('install',function(){
    svc.start();
  });
  
  svc.install();

  