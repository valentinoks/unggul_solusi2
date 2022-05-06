const router = require("express").Router();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "sistem_interface" 
});

router.post('/create', (req, res) => {

    const tgl = req.body.TGL;
    const kode_pelanggan = req.body.KODE_PELANGGAN;
    const subtotal = req.body.SUBTOTAL;

    const sqlInsert = "INSERT INTO `penjualans` (`TGL`, `KODE_PELANGGAN`, `SUBTOTAL`) VALUES (?,?,?);"
    db.query(sqlInsert, [tgl, kode_pelanggan, subtotal], (err, result)=>{
        if (err) console.log(err);
        res.send(result);
    })
});

router.get('/get', (req, res) => {
    const sqlSelect = "SELECT * FROM `penjualans`";
    db.query(sqlSelect, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.delete('/delete/:id_nota', (req, res) => {
    const id = req.params.id_nota;
    const sqlInsert = 
        "DELETE FROM `penjualans` WHERE `ID_NOTA` = ?;"
    
    db.query(sqlInsert, id, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.patch('/update/:id_nota', (req, res) => {
    const id = req.params.id_nota;

    const tgl = req.body.TGL;
    const kode_pelanggan = req.body.KODE_PELANGGAN;
    const subtotal = req.body.SUBTOTAL;

    const sqlInsert = 
        "UPDATE `penjualans` SET `TGL`=?, `KODE_PELANGGAN`=?, `SUBTOTAL`=? WHERE `ID_NOTA`= ?";
    db.query(sqlInsert, [tgl, kode_pelanggan, subtotal, id], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
})

module.exports = router;