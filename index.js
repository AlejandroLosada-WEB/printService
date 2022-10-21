
const dfd = require("danfojs")
const tf = require("@tensorflow/tfjs")
const cors = require("cors");
const express = require("express");
const server = express()
server.use(cors());
const ThermalPrinter = require("node-thermal-printer").printer;
const PrinterTypes = require("node-thermal-printer").types;
const meses=['01','02','03','04','05','06','07','08','09','10','11','12'];
const dia=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
//const http = require('http');
//const httpServer = http.createServer(server);
server.use(express.json());



server.get('/camarero/:mesa/:ip',(req,res)=>{
  res.send("CAMARERO")
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    //interface: 'tcp://192.168.1.44:9100',
    //interface: '//localhost/EPSON TM-T20II Receipt',
    interface: "tcp://"+req.params.ip+":9100",
  });

      printer.setCharacterSet("PC850_MULTILINGUAL"); 
      printer.setTextSize(1,1);    

      printer.println("SOLICITUD DE CAMARERO"); 
      printer.println(""); 
      printer.setTextSize(0,1);
      printer.underline(true);   
      printer.println("MESA: "+req.params.mesa); 
      printer.underline(false);   
      printer.println(""); 
      printer.println("FECHA: "+dia[new Date().getDate()]+"/"+meses[new Date().getMonth()]+"/"+new Date().getFullYear()); 
      printer.println("HORA: "+(new Date().getHours()<10?'0':'') + new Date().getHours()+":"+(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()+":"+(new Date().getSeconds()<10?'0':'') + new Date().getSeconds())
      printer.println(""); 
      
      printer.beep();
  
      printer.cut();
  
  //printer.openCashDrawer();
   
  try {
    let execute = printer.execute()
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
});


server.get('/cuenta/:mesa/:ip',(req,res)=>{
  res.send("CUENTA")
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    //interface: 'tcp://192.168.1.44:9100',
    //interface: '//localhost/EPSON TM-T20II Receipt',
    interface: "tcp://"+req.params.ip+":9100",
  });

      printer.setCharacterSet("PC850_MULTILINGUAL"); 
      printer.setTextSize(1,1);    

      printer.println("SOLICITUD DE CUENTA"); 
      printer.println(""); 
      printer.setTextSize(0,1);
      printer.underline(true);   
      printer.println("MESA: "+req.params.mesa); 
      printer.underline(false);   
      printer.println(""); 
      printer.println("FECHA: "+dia[new Date().getDate()]+"/"+meses[new Date().getMonth()]+"/"+new Date().getFullYear()); 
      printer.println("HORA: "+(new Date().getHours()<10?'0':'') + new Date().getHours()+":"+(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()+":"+(new Date().getSeconds()<10?'0':'') + new Date().getSeconds())
      printer.println(""); 
      
      printer.beep();
  
      printer.cut();
  
  //printer.openCashDrawer();
   
  try {
    let execute = printer.execute()
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
});



server.post('/cocina/:ip',(req,res)=>{
  res.send("COCINA")
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    //interface: 'tcp://192.168.1.44:9100',
    //interface: '//localhost/EPSON TM-T20II Receipt',
    interface: "tcp://"+req.params.ip+":9100",
  });

  /*resp={
    "respuesta": [
        {
            "_id": "61bdcb03ba8d38e42ee318dd",
            "_id_mesa": "3",
            "_id_producto": "61ae374bd97347dc97c92780",
            "fecha": "2021-12-18T11:50:27.167Z",
            "imagen": "assets/empresas/Polymnia F Pruebas-618183025cdbfa2360606994/productos/<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot POST /api/productos/img/productos/</pre>\n</body>\n</html>\n",
            "nombre": "alguna Tapa",
            "precio": 10.8,
            "precioConIva": 12,
            "ivaProducto": 1.2,
            "pagado": false,
            "tipoPagamiento": "No pagado",
            "servido": false,
            "tipo": "cocina",
            "categoria": "bocatas",
            "_id_franquicia": "618183025cdbfa2360606994",
            "_id_principal": "618180a240448d2398804ea9",
            "_id_franquicia_iv": "616c656a616e64726f6c6f736164616d",
            "_id_principal_iv": "616c656a616e64726f6c6f736164616d",
            "notas": "",
            "borrado": false,
            "__v": 0
        }
    ],
    "categorias": [
        "Producto AUTOEDITABLE",
        "entrantes",
        "primeros",
        "segundos",
        "ensaladas",
        "carnes",
        "pescados",
        "tapas",
        "raciones",
        "bocatas",
        "postres",
        "tierra",
        "mar",
        "tostadas",
        "Menu"
    ]
}*/
  resp=req.body;


  var flags = [], output = [], l = resp['respuesta'].length, m;
  for( m=0; m<l; m++) {
      if( flags[resp['respuesta'][m]._id_mesa]) continue;
      flags[resp['respuesta'][m]._id_mesa] = true;
      output.push(resp['respuesta'][m]._id_mesa);
  }


  for (let j=0;j<output.length;j++){

      printer.setCharacterSet("PC850_MULTILINGUAL"); 
      printer.setTextSize(1,1);    

      printer.println("PEDIDOS COCINA"); 
      printer.println(""); 
      printer.setTextSize(0,1);
      printer.underline(true);   
      printer.println("MESA: "+output[j]); 
      printer.underline(false);   
      printer.println(""); 
      printer.println("FECHA: "+dia[new Date().getDate()]+"/"+meses[new Date().getMonth()]+"/"+new Date().getFullYear()); 
      printer.println("HORA: "+(new Date().getHours()<10?'0':'') + new Date().getHours()+":"+(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()+":"+(new Date().getSeconds()<10?'0':'') + new Date().getSeconds())
      printer.println(""); 
      
      printer.tableCustom([
        { text:"CANTIDAD", align:"LEFT", bold:true},
        { text:"PRODUCTO", align:"CENTER", bold:true },
        { text:"NOTAS", align:"RIGHT", bold:true }
      ]);
      printer.println(""); 
      printer.setTextSize(0,0);
      for(let c=0;c<resp['categorias'].length;c++){
        for(let i=0;i<resp['respuesta'].length;i++){
          if(output[j]==resp['respuesta'][i]['_id_mesa'] || output[j]==resp['respuesta'][i]['_id_mesa'][0]){
          
              if(resp['categorias'][c]==resp['respuesta'][i]['categoria'] && resp['respuesta'][i]['tipo']!="menú"){
                if(cont==0){
                  printer.println(""); 
                  printer.tableCustom([
                    { text:"", align:"LEFT",cols:12, bold:true},
                    { text:resp['categorias'][c].toUpperCase(), align:"CENTER",cols:24, bold:true },
                    { text:"", align:"RIGHT",cols:12, bold:true }
                  ]);
                // a=a+"<thead class='text-center mt-3'><tr><th colspan='3'>"+resp['categorias'][c].toUpperCase()+"</th></tr></thead>";
                printer.println(""); 
                }
                
                printer.tableCustom([
                  { text:"1", align:"LEFT",cols:12, bold:true},
                  { text:resp['respuesta'][i]['nombre'], align:"CENTER",cols:24, bold:true },
                  { text:resp['respuesta'][i]['notas'], align:"RIGHT",cols:12, bold:true }
                ]);
                //a=a+"<tr><td>1</td><td>"+resp['respuesta'][i]['nombre']+"</td><td>"+resp['respuesta'][i]['notas']+"</td></tr>";
                cont++;
              }
              if(resp['categorias'][c]==resp['respuesta'][i]['categoria'] && resp['respuesta'][i]['tipo']=="menú"){
                if(cont==0){
                  printer.println(""); 
                  printer.tableCustom([
                    { text:"", align:"LEFT",cols:12, bold:true},
                    { text:resp['categorias'][c].toUpperCase(), align:"CENTER",cols:24, bold:true },
                    { text:"", align:"RIGHT",cols:12, bold:true }
                  ]);
                  printer.println(""); 
                }
                
                if(resp['respuesta'][i]['servidoMenuCocinaPrimero']==false){
                  printer.tableCustom([
                    { text:"1", align:"LEFT",cols:12, bold:true},
                    { text:"1º "+resp['respuesta'][i]['primero'], align:"CENTER",cols:24, bold:true },
                    { text:resp['respuesta'][i]['notas'], align:"RIGHT",cols:12, bold:true }
                  ]);
                  //a=a+"<tr><td>1</td><td>Primero "+resp[i]['primero']+"</td><td>"+resp[i]['notas']+"</td></tr>";
                }
                if(resp['respuesta'][i]['servidoMenuCocinaSegundo']==false && resp['respuesta'][i]['segundo']!=null){
                  printer.tableCustom([
                    { text:"1", align:"LEFT",cols:12, bold:true},
                    { text:"2º "+resp['respuesta'][i]['segundo'], align:"CENTER",cols:24, bold:true },
                    { text:resp['respuesta'][i]['notasSegundo'], align:"RIGHT",cols:12, bold:true }
                  ]);
                  //a=a+"<tr><td>1</td><td>Segundo "+resp[i]['segundo']+"</td><td>"+resp[i]['notasSegundo']+"</td></tr>";
                }
                
                cont++;
              }
          
          }

        }
        cont=0;
      }
  
      printer.beep();
  
      printer.cut();
  }
 
 
  //printer.openCashDrawer();
   
  try {
    let execute = printer.execute()
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
});




server.post('/barra/:ip',(req,res)=>{
  res.send("BARRA")
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    //interface: 'tcp://192.168.1.44:9100',
    //interface: '//localhost/EPSON TM-T20II Receipt',
    interface: "tcp://"+req.params.ip+":9100",
  });
   
  /*resp=[
    {
        "_id": "61be19ec874855a3d3f6b64e",
        "_id_mesa": "Manual",
        "_id_producto": "618183025cdbfa2360606998",
        "fecha": "2021-12-18T17:27:08.673Z",
        "imagen": "assets/img/img/Colacao.png",
        "nombre": "Colacao",
        "precio": 1.62,
        "precioConIva": 1.8,
        "ivaProducto": 0.18,
        "pagado": false,
        "tipoPagamiento": "No pagado",
        "servido": false,
        "tipo": "bar",
        "categoria": "cafés",
        "_id_franquicia": "618183025cdbfa2360606994",
        "_id_principal": "618180a240448d2398804ea9",
        "_id_franquicia_iv": "616c656a616e64726f6c6f736164616d",
        "_id_principal_iv": "616c656a616e64726f6c6f736164616d",
        "notas": "",
        "borrado": false,
        "__v": 0
    },
    {
        "_id": "61be1b1e874855a3d3f6b6a0",
        "_id_mesa": "Manual",
        "_id_producto": "618183035cdbfa23606069c8",
        "fecha": "2021-12-18T17:32:14.418Z",
        "imagen": "assets/img/img/Ron-cola.png",
        "nombre": "Ron-cola",
        "precio": 4.5,
        "precioConIva": 5,
        "ivaProducto": 0.5,
        "pagado": false,
        "tipoPagamiento": "No pagado",
        "servido": false,
        "tipo": "bar",
        "categoria": "copas",
        "_id_franquicia": "618183025cdbfa2360606994",
        "_id_principal": "618180a240448d2398804ea9",
        "_id_franquicia_iv": "616c656a616e64726f6c6f736164616d",
        "_id_principal_iv": "616c656a616e64726f6c6f736164616d",
        "notas": "",
        "borrado": false,
        "__v": 0
    }
]*/
  resp=req.body;


  var flags = [], output = [], l = resp.length, m;
  for( m=0; m<l; m++) {
      if( flags[resp[m]._id_mesa]) continue;
      flags[resp[m]._id_mesa] = true;
      output.push(resp[m]._id_mesa);
  }

  for (let j=0;j<output.length;j++){

      printer.setCharacterSet("PC850_MULTILINGUAL"); 
      printer.setTextSize(1,1);    

      printer.println("PEDIDOS BARRA"); 
      printer.println(""); 
      printer.setTextSize(0,1);
      printer.underline(true);   
      printer.println("MESA: "+output[j]); 
      printer.underline(false);   
      printer.println(""); 
      printer.println("FECHA: "+dia[new Date().getDate()]+"/"+meses[new Date().getMonth()]+"/"+new Date().getFullYear()); 
      printer.println("HORA: "+(new Date().getHours()<10?'0':'') + new Date().getHours()+":"+(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()+":"+(new Date().getSeconds()<10?'0':'') + new Date().getSeconds())
      printer.println(""); 
      
      printer.tableCustom([
        { text:"CANTIDAD", align:"LEFT", bold:true},
        { text:"PRODUCTO", align:"CENTER", bold:true },
        { text:"NOTAS", align:"RIGHT", bold:true }
      ]);
      printer.println(""); 

      for(let i=0;i<resp.length;i++){

        if(output[j]==resp[i]['_id_mesa'] || output[j]==resp[i]['_id_mesa'][0]){

            if(resp[i]['tipo']=="bar"){
              printer.tableCustom([
                { text:"1", align:"LEFT",cols:12, bold:true},
                { text:resp[i]['nombre'], align:"CENTER",cols:24, bold:true },
                { text:resp[i]['notas'], align:"RIGHT",cols:12, bold:true }
              ]);
            }

            if(resp[i]['nombre']=="Menú completo"){
              printer.tableCustom([
                { text:"1", align:"LEFT", cols:12, bold:true},
                { text:resp[i]['bebida'], align:"CENTER", cols:24, bold:true },
                { text:resp[i]['notasBebida'], align:"RIGHT", cols:12, bold:true }
              ]);
            }

            if(resp[i]['nombre']=="Medio menú"){
              printer.tableCustom([
                { text:"1", align:"LEFT", cols:12, bold:true},
                { text:resp[i]['bebida'], align:"CENTER", cols:24, bold:true },
                { text:resp[i]['notasBebida'], align:"RIGHT",cols:12, bold:true }
              ]);
            }
        }
      
        
      }

      printer.cut();
      printer.beep();

  }
  
  //printer.openCashDrawer();

  try {
    let execute = printer.execute()
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }
});














server.post('/caja/:ip',(req,res)=>{
  res.send("CAJA")
  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    //interface: 'tcp://192.168.1.44:9100',
    //interface: '//localhost/EPSON TM-T20II Receipt',
    interface: "tcp://"+req.params.ip+":9100",
  });
   //console.log(req.body)
  imprimirTicketVenta(printer,req.body);

});



async function imprimirTicketVenta(printer,resp){

  /*let resp={  
    "caja": {
        "respuesta": [
            {
                "_id": "61cc3d3131dcab0d2bfcd27d",
                "_id_mesa": "6",
                "_id_producto": "61a25d5e96f56010847552b3",
                "fecha": "2021-12-29T10:49:21.988Z",
                "imagen": "assets/empresas/Polymnia F Pruebas-618183025cdbfa2360606994/productos/<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot POST /api/productos/img/productos/</pre>\n</body>\n</html>\n",
                "nombre": "Ración chuññasquitas de ternera a la brasa con patatas",
                "precio": 1.11,
                "precioConIva": 1000.23,
                "ivaProducto": 0.12,
                "pagado": false,
                "tipoPagamiento": "No pagado",
                "servido": true,
                "tipo": "bar",
                "categoria": "refrescos",
                "_id_franquicia": "618183025cdbfa2360606994",
                "_id_principal": "618180a240448d2398804ea9",
                "_id_franquicia_iv": "616c656a616e64726f6c6f736164616d",
                "_id_principal_iv": "616c656a616e64726f6c6f736164616d",
                "notas": "",
                "borrado": false,
                "macAddr": "00-FF-7A-E9-E6-9A",
                "__v": 0
            },
            {
              "_id": "61cc3d3131dcab0d2bfcd27d",
              "_id_mesa": "6",
              "_id_producto": "61a25d5e96f56010847552b3",
              "fecha": "2021-12-29T10:49:21.988Z",
              "imagen": "assets/empresas/Polymnia F Pruebas-618183025cdbfa2360606994/productos/<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot POST /api/productos/img/productos/</pre>\n</body>\n</html>\n",
              "nombre": "Ración chuññasquitas de ternera a la brasa con patatas",
              "precio": 1.11,
              "precioConIva": 1000.23,
              "ivaProducto": 0.12,
              "pagado": false,
              "tipoPagamiento": "No pagado",
              "servido": true,
              "tipo": "bar",
              "categoria": "refrescos",
              "_id_franquicia": "618183025cdbfa2360606994",
              "_id_principal": "618180a240448d2398804ea9",
              "_id_franquicia_iv": "616c656a616e64726f6c6f736164616d",
              "_id_principal_iv": "616c656a616e64726f6c6f736164616d",
              "notas": "",
              "borrado": false,
              "macAddr": "00-FF-7A-E9-E6-9A",
              "__v": 0
          }
        ],
        "datos": {
            "nombreFranquicia": "Polymnia",
            "cif": "00000000",
            "numeroFactura": "27/2021",
            "mesa": "6",
            "fechaFactura": "29/12/2021"
        }
    }
}*/



  df = new dfd.DataFrame(resp['caja']['respuesta'])
  
  let suma = df.groupby(["_id_mesa"])
  let suma2=suma.agg({"precioConIva":"sum","precio":"sum","ivaProducto":"sum"})
  let suma3=suma2.to_json({ download: false }); 
  totalConIva=suma3[0]["precioConIva_sum"];
  totalSinIva=suma3[0]["precio_sum"];
  totalIvaProductos=suma3[0]["ivaProducto_sum"];
  

  let grp = df.groupby(["nombre"])
  let grp2=grp.agg({"notas":"count","precioConIva":"sum"})
  pedidos_cuenta=grp2.to_json({ download: false }); 
  
  
 

 
  printer.setCharacterSet("PC850_MULTILINGUAL"); 
  printer.alignCenter();  
  await printer.printImage('./img/logo.png');
  printer.setTextSize(0,0);    
 
  //console.log(resp['caja'])
  printer.alignLeft(); 
  printer.println(""); 
  printer.println("FACTURA SIMPLIFICADA: "+resp['caja']['datos']['numeroFactura']); 
  printer.println(resp['caja']['datos']['nombreFranquicia']); 
  printer.println("CIF: "+resp['caja']['datos']['cif']); 

  if(resp['caja']['datos']['empresa']==true){
    printer.println("EMPRESA:"+resp['caja']['datos']['nombreEmpresa']); 
    printer.println("CIF EMPRESA"+resp['caja']['datos']['cifEmpresa']); 
    printer.println("PERSONA ABONADORA:"+resp['caja']['datos']['nombrePersona']); 
  }

  
  printer.println("MESA: "+resp['caja']['datos']['mesa']); 
  printer.println("FECHA: "+resp['caja']['datos']['fechaFactura']); 
  printer.println("HORA: "+(new Date().getHours()<10?'0':'') + new Date().getHours()+":"+(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()+":"+(new Date().getSeconds()<10?'0':'') + new Date().getSeconds()); 
    
  printer.println(""); 
  printer.tableCustom([
    { text:"CANTIDAD", align:"LEFT",cols:12, bold:true},
    { text:"PRODUCTO", align:"CENTER",cols:24, bold:true },
    { text:"PRECIO", align:"RIGHT",cols:13, bold:true }
  ]);
  printer.println(""); 
 
  for(let i=0;i<pedidos_cuenta.length;i++){
    //48 COLS
    printer.tableCustom([
      { text:pedidos_cuenta[i]['notas_count'], align:"LEFT",cols:12, bold:true},
      { text:pedidos_cuenta[i]['nombre'], align:"CENTER",cols:24, bold:true },
      { text:pedidos_cuenta[i]['precioConIva_sum'], align:"RIGHT",cols:12, bold:true },
    ]);

  }

  printer.drawLine();

  
  totalSinIva=Number(totalSinIva.toFixed(3));
  totalSinIva=Math.round(totalSinIva * 100) / 100;
  
  totalIvaProductos=Number(totalIvaProductos.toFixed(3));
  totalIvaProductos=Math.round(totalIvaProductos * 100) / 100;

  totalConIva=Number(totalConIva.toFixed(3));
  totalConIva=Math.round(totalConIva * 100) / 100;

  printer.tableCustom([
    { text:"IVA10%:", align:"LEFT",cols:12, bold:true},
    { text:totalSinIva+"", align:"CENTER",cols:24, bold:true },
    { text:totalIvaProductos+"", align:"RIGHT",cols:12, bold:true },
  ]);
  printer.drawLine(); 
  printer.tableCustom([
    { text:"TOTAL:", align:"LEFT",cols:12, bold:true},
    { text:"(Impuestos incluidos)", align:"CENTER",cols:24, bold:true },
    { text:totalConIva+" EUR", align:"RIGHT",cols:12, bold:true },
  ]);

  

  if(resp['caja']['datos']['efectivo']==0){
    printer.println(""); 
    printer.tableCustom([
      { text:"PAGADO:", align:"LEFT",cols:14, bold:true},
      { text:"Tarjeta", align:"CENTER",cols:20, bold:true },
      { text:"Cambio 0 EUR", align:"RIGHT",cols:14, bold:true },
    ]);
  }

  if(resp['caja']['datos']['efectivo']!=-1 && resp['caja']['datos']['efectivo']!=0){
    cambio=Number(resp['caja']['datos']['efectivo'])-Number(totalConIva);
    cambio=Number(cambio.toFixed(3));
    cambio=Math.round(cambio * 100) / 100;
    printer.println(""); 
    printer.tableCustom([
      { text:"PAGADO:", align:"LEFT",cols:14, bold:true},
      { text:"Efectivo", align:"CENTER",cols:20, bold:true },
      { text:resp['caja']['datos']['efectivo']+" EUR", align:"RIGHT",cols:14, bold:true },
    ]);
    printer.println(""); 
    printer.tableCustom([
      { text:"", align:"LEFT",cols:14, bold:true},
      { text:"Cambio", align:"CENTER",cols:20, bold:true },
      { text:cambio+" EUR", align:"RIGHT",cols:14, bold:true },
    ]);
  }


  printer.alignCenter();  
  printer.println(""); 
  printer.println("¡GRACIAS POR SU VISITA!"); 
  
  printer.cut();
  printer.openCashDrawer();

  try {
    let execute = printer.execute()
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }

}



/*


async function imprimirTicketVentaMAL(printer){

  let resp={  
    "caja": {
        "respuesta": [
            {
                "_id": "61cc3d3131dcab0d2bfcd27d",
                "_id_mesa": "6",
                "_id_producto": "61a25d5e96f56010847552b3",
                "fecha": "2021-12-29T10:49:21.988Z",
                "imagen": "assets/empresas/Polymnia F Pruebas-618183025cdbfa2360606994/productos/<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot POST /api/productos/img/productos/</pre>\n</body>\n</html>\n",
                "nombre": "Ración chuññasquitas de ternera a la brasa con patatas",
                "precio": 1.11,
                "precioConIva": 1000.23,
                "ivaProducto": 0.12,
                "pagado": false,
                "tipoPagamiento": "No pagado",
                "servido": true,
                "tipo": "bar",
                "categoria": "refrescos",
                "_id_franquicia": "618183025cdbfa2360606994",
                "_id_principal": "618180a240448d2398804ea9",
                "_id_franquicia_iv": "616c656a616e64726f6c6f736164616d",
                "_id_principal_iv": "616c656a616e64726f6c6f736164616d",
                "notas": "",
                "borrado": false,
                "macAddr": "00-FF-7A-E9-E6-9A",
                "__v": 0
            },
            {
              "_id": "61cc3d3131dcab0d2bfcd27d",
              "_id_mesa": "6",
              "_id_producto": "61a25d5e96f56010847552b3",
              "fecha": "2021-12-29T10:49:21.988Z",
              "imagen": "assets/empresas/Polymnia F Pruebas-618183025cdbfa2360606994/productos/<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>Cannot POST /api/productos/img/productos/</pre>\n</body>\n</html>\n",
              "nombre": "Tapa chuññasquitas de ternera a la brasa con patatas",
              "precio": 1.11,
              "precioConIva": 1000.23,
              "ivaProducto": 0.12,
              "pagado": false,
              "tipoPagamiento": "No pagado",
              "servido": true,
              "tipo": "bar",
              "categoria": "refrescos",
              "_id_franquicia": "618183025cdbfa2360606994",
              "_id_principal": "618180a240448d2398804ea9",
              "_id_franquicia_iv": "616c656a616e64726f6c6f736164616d",
              "_id_principal_iv": "616c656a616e64726f6c6f736164616d",
              "notas": "",
              "borrado": false,
              "macAddr": "00-FF-7A-E9-E6-9A",
              "__v": 0
          }
        ],
        "datos": {
            "nombreFranquicia": "Polymnia",
            "cif": "00000000",
            "numeroFactura": "27/2021",
            "mesa": "6",
            "fechaFactura": "29/12/2021"
        }
    }
}



  df = new dfd.DataFrame(resp['caja']['respuesta'])
  //grupoId=df.groupby(["_id_producto"]).print()
  //let grp = df.groupby(["_id_producto"])
  //console.log(df)
  //console.log("------------------------------------------------------------")
  let suma = df.groupby(["_id_mesa"])
  let suma2=suma.agg({"precioConIva":"sum","precio":"sum","ivaProducto":"sum"})
  let suma3=suma2.to_json({ download: false }); 
  totalConIva=suma3[0]["precioConIva_sum"];
  totalSinIva=suma3[0]["precio_sum"];
  totalIvaProductos=suma3[0]["ivaProducto_sum"];
  

  let grp = df.groupby(["nombre"])
  let grp2=grp.agg({"notas":"count","precioConIva":"sum"})
  pedidos_cuenta=grp2.to_json({ download: false }); 
  
  
  console.log(pedidos_cuenta[0])
  console.log(totalConIva)
  console.log(totalSinIva)
  console.log(totalIvaProductos)


  //    .agg({'notas':'count', 'precioConIva': 'sum'})
  //    .reset_index()
  //    .rename(columns={'notas':'Cantidad','precioConIva':'precio'})
  //console.log(grp)
  //grp.print()
  //df.print()

 
  /*printer.setCharacterSet("PC850_MULTILINGUAL"); 
  printer.alignCenter();  
  await printer.printImage('./img/logo.png');
  printer.setTextSize(0,0);    
 
  //console.log(resp['caja'])
  printer.alignLeft(); 
  printer.println(""); 
  printer.println("FACTURA SIMPLIFICADA: "+resp['caja']['datos']['numeroFactura']); 
  printer.println(resp['caja']['datos']['nombreFranquicia']); 
  printer.println("CIF: "+resp['caja']['datos']['cif']); 
  printer.println("MESA: "+resp['caja']['datos']['mesa']); 
  printer.println("FECHA: "+resp['caja']['datos']['fechaFactura']); 
  printer.println("HORA: "+(new Date().getHours()<10?'0':'') + new Date().getHours()+":"+(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()+":"+(new Date().getSeconds()<10?'0':'') + new Date().getSeconds()); 
    
  printer.println(""); 
  printer.tableCustom([
    { text:"CANTIDAD", align:"LEFT",cols:12, bold:true},
    { text:"PRODUCTO", align:"CENTER",cols:24, bold:true },
    { text:"PRECIO", align:"RIGHT",cols:13, bold:true }
  ]);
  printer.println(""); 
  var totalSinIva=0;
  var ivaTotal=0;
  var totalConIva=0;
  for(let i=0;i<resp['caja']['respuesta'].length;i++){
    //48 COLS
    printer.tableCustom([
      { text:"1", align:"LEFT",cols:12, bold:true},
      { text:resp['caja']['respuesta'][i]['nombre'], align:"CENTER",cols:24, bold:true },
      { text:resp['caja']['respuesta'][i]['precioConIva'], align:"RIGHT",cols:12, bold:true },
    ]);

    totalSinIva=Number(totalSinIva)+Number(resp['caja']['respuesta'][i]['precio']);
    totalSinIva=Number(totalSinIva.toFixed(3));
    totalSinIva=Math.round(totalSinIva * 100) / 100;

    ivaTotal=Number(ivaTotal)+Number(resp['caja']['respuesta'][i]['ivaProducto']);
    ivaTotal=Number(ivaTotal.toFixed(3));
    ivaTotal=Math.round(ivaTotal * 100) / 100;

    totalConIva=Number(totalConIva)+Number(resp['caja']['respuesta'][i]['precioConIva']); 
    totalConIva=Number(totalConIva.toFixed(3));
    totalConIva=Math.round(totalConIva * 100) / 100;
  }

  printer.drawLine();

  printer.tableCustom([
    { text:"IVA10%:", align:"LEFT",cols:12, bold:true},
    { text:totalSinIva, align:"CENTER",cols:24, bold:true },
    { text:ivaTotal, align:"RIGHT",cols:13, bold:true },
  ]);
  printer.drawLine(); 
  printer.tableCustom([
    { text:"TOTAL:", align:"LEFT",cols:12, bold:true},
    { text:"(Impuestos incluidos)", align:"CENTER",cols:24, bold:true },
    { text:totalConIva+" EUR", align:"RIGHT",cols:12, bold:true },
  ]);

  printer.alignCenter();  
  printer.println(""); 
  printer.println("¡GRACIAS POR SU VISITA!"); 
  

  
  printer.cut();
  printer.openCashDrawer();

  try {
    let execute = printer.execute()
    console.error("Print done!");
  } catch (error) {
    console.log("Print failed:", error);
  }

}*/








const serverLest=server.listen(3009,()=>{
    console.log("Escuchando en el puerto "+3009);
    //console.log("HTTPS");
});
















