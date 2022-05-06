const router = require("express").Router();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "sistem_interface" 
});

router.post('/create', (req, res) => {

    const nama = req.body.NAMA;
    const domisili = req.body.DOMISILI;
    const jenis_kelamin = req.body.JENIS_KELAMIN;

    const sqlInsert = "INSERT INTO `pelanggans` (`NAMA`, `DOMISILI`, `JENIS_KELAMIN`) VALUES (?,?,?);"
    db.query(sqlInsert, [nama, domisili, jenis_kelamin], (err, result)=>{
        if (err) console.log(err);
        res.send(result);
    })
});

router.get('/get', (req, res) => {
    const sqlSelect = "SELECT * FROM `pelanggans`";
    db.query(sqlSelect, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.delete('/delete/:id_pelanggan', (req, res) => {
    const id = req.params.id_pelanggan;
    const sqlInsert = 
        "DELETE FROM `pelanggans` WHERE `ID_PELANGGAN` = ?;"
    
    db.query(sqlInsert, id, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

router.patch('/update/:id_pelanggan', (req, res) => {
    const id = req.params.id_pelanggan;

    const nama = req.body.NAMA;
    const domisili = req.body.DOMISILI;
    const jenis_kelamin = req.body.JENIS_KELAMIN;

    const sqlInsert = 
        "UPDATE `pelanggans` SET `NAMA`=?, `DOMISILI`=?, `JENIS_KELAMIN`=? WHERE `ID_PELANGGAN`= ?";
    db.query(sqlInsert, [nama, domisili, jenis_kelamin, id], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
})

module.exports = router;