const {Router} = require('express');
const router = Router();


const mysqlConnection = require('./db/db.js');

router.get('/',(req,res)=>{
  res.send('Si funciona')
})


router.get('/carro',(req,res)=>{
  mysqlConnection.query('SELECT * FROM carro',
  (err,rows,fields)=>{
    if(!err)
   {
     res.json(rows);
   }else{
     console.log(err);
   }
  })
}) 

router.post('/carro', (req, res) => {
  const {id,PLACA,MARCA,MODELO,DOC_DUENIO} = req.body
  let tipo = [id,PLACA,MARCA,MODELO,DOC_DUENIO];
  let nuevoTipo = `INSERT INTO carro VALUES (?,?,?,?,?);`

 mysqlConnection.query(nuevoTipo,tipo, (err,results,fields) => {
   if(err){
     return console.error(err.message);
   }
   res.json({message:`Tipo Usuario Ingresado`})
 });
});

router.put('/carro/:id', (req,res) => {
  const {PLACA,MARCA,MODELO,DOC_DUENIO} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE carro SET PLACA =?,MARCA=?,MODELO=?,DOC_DUENIO = ? WHERE id = ?`,[PLACA,MARCA,MODELO,DOC_DUENIO,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `Tipo usuario ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});

 //PETICIÓN O SERVICIO DELETE - ELIMINACIÓN DE DATOS
 router.delete('/carro/:id', (req,res) => {
  const { id } = req.params;
  mysqlConnection.query(`DELETE FROM carro WHERE id =?`,[id],(err,rows,fields) => {
    if("!err"){
      res.json({status: `El tipo usuario ha sido eliminado`})
    }else{
      console.log(err);
    }
  });
});

router.get('/usuario',(req,res)=>{
  mysqlConnection.query('SELECT * FROM usuario',
  (err,rows,fields)=>{
    if(!err)
   {
     res.json(rows);
   }else{
     console.log(err);
   }
  })
}) 






        // Tipo usuario
    //Petición get
router.get('/Tipo_usuario',(req,res)=>{
    mysqlConnection.query('SELECT * FROM TIPO_USUARIO',
    (err,rows,fields)=>{
      if(!err)
     {
       res.json(rows);
     }else{
       console.log(err);
     }
    })
}) 

    //Petición post
   router.post('/Tipo_usuario', (req, res) => {
    const {id,TIPO_USUARIO} = req.body
    let tipo = [id,TIPO_USUARIO];
    let nuevoTipo = `INSERT INTO TIPO_USUARIO VALUES (?,?);`

   mysqlConnection.query(nuevoTipo,tipo, (err,results,fields) => {
     if(err){
       return console.error(err.message);
     }
     res.json({message:`Tipo Usuario Ingresado`})
   });
  });
  
     //Petición put
  router.put('/Tipo_usuario/:id', (req,res) => {
  const {TIPO_USUARIO} = req.body
  const { id } = req.params 

mysqlConnection.query(`UPDATE TIPO_USUARIO SET TIPO_USUARIO = ? WHERE id = ?`,[TIPO_USUARIO,id], (err, rows,fields) => {
   if(!err){
    res.json({status: `Tipo usuario ha sido actualizado con éxito`});
   }else{
     console.log(err);
   }
});
});

  //PETICIÓN O SERVICIO DELETE - ELIMINACIÓN DE DATOS
  router.delete('/Tipo_usuario/:id', (req,res) => {
    const { id } = req.params;
    mysqlConnection.query(`DELETE FROM TIPO_USUARIO WHERE id =?`,[id],(err,rows,fields) => {
      if("!err"){
        res.json({status: `El tipo usuario ha sido eliminado`})
      }else{
        console.log(err);
      }
    });
  });

module.exports = router;