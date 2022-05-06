const router = require("express").Router();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "sistem_interface" 
});

router.post('/create', (req, res) => {

    const nama = req.body.NAMA;
    const kategori = req.body.KATEGORI;
    const harga = req.body.HARGA;

    const sqlInsert = "INSERT INTO `barangs` (`NAMA`, `KATEGORI`, `HARGA`) VALUES (?,?,?);"
    db.query(sqlInsert, [nama, kategori, harga], (err, result)=>{
        if (err) console.log(err);
        res.send(result);
    })
});

router.get('/get', (req, res) => {
    const sqlSelect = "SELECT * FROM `barangs`";
    db.query(sqlSelect, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.delete('/delete/:kode', (req, res) => {
    const id = req.params.kode;
    const sqlInsert = 
        "DELETE FROM `barangs` WHERE `KODE` = ?;"
    
    db.query(sqlInsert, id, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.patch('/update/:kode', (req, res) => {
    const id = req.params.kode;

    const nama = req.body.NAMA;
    const kategori = req.body.KATEGORI;
    const harga = req.body.HARGA;

    const sqlInsert = 
        "UPDATE `barangs` SET `NAMA`=?, `KATEGORI`=?, `HARGA`=? WHERE `KODE`= ?";
    db.query(sqlInsert, [nama, kategori, harga, id], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
})

module.exports = router;