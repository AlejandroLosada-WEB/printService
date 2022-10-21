const Service = require("node-windows").Service;

const svc = new Service({
    name:'printService',
    description: 'Elbarqr',
    script: 'D:\\copias nuevas\\print\\index.js',
  });

  svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
  });
  
  // Uninstall the service.
  svc.uninstall();

  