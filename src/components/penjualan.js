import React, { useState, useEffect } from "react";
import '../Pelanggan.css';
import Axios from 'axios';

export default function Penjualan() {
  const [tgl, setTgl] = useState('');
  const [kodePelanggan, setKodePelanggan] = useState('');
  const [subtotal, setSubtotal] = useState('');

  const[dataList, setDataList] = useState([]);
  const[dataList2, setDataList2] = useState([]);

  useEffect(()=> {
    Axios.get("http://localhost:3001/api/v1/penjualan/get").then((response)=>{
      setDataList(response.data);
    });
  }, [dataList2]);

  const submitData = ()=>{
    Axios.post("http://localhost:3001/api/v1/penjualan/create", {
      TGL: tgl, 
      KODE_PELANGGAN: kodePelanggan, 
      SUBTOTAL: subtotal
    });

    setDataList([
      ...dataList, 
      {
        TGL: tgl, 
        KODE_PELANGGAN: kodePelanggan, 
        SUBTOTAL: subtotal
      }
    ]);
  };

  const updateData = (id) => {
    Axios.patch(`http://localhost:3001/api/v1/penjualan/update/${id}`, {
        TGL: tgl, 
        KODE_PELANGGAN: kodePelanggan, 
        SUBTOTAL: subtotal
    }).then(()=>{
      setDataList2([
        ...dataList2
      ]);
    });
  };

  const deleteData = (id) => {
    Axios.delete(`http://localhost:3001/api/v1/penjualan/delete/${id}`).then(()=>{
      setDataList2((items) => items.filter((ele, i) => {
        return ele.ID_NOTA !== id;
      }));
    });
  };

  return (
    <div className="Pelanggan">
    <h1>PENJUALAN</h1>

    <div className="form">
      <label>Tanggal: </label>
      <input type = "text" name="nama" onChange={(e)=>{
        setTgl(e.target.value)
      }}/>
      <label>Kode Pelanggan: </label>
      <input type = "text" name="domisili" onChange={(e)=>{
        setKodePelanggan(e.target.value)
      }}/>
      <label>Subtotal: </label>
      <input type = "text" name="jenisKelamin" onChange={(e)=>{
        setSubtotal(e.target.value)
      }}/>
      <button onClick={submitData}>Submit</button>
      {dataList.map((val)=>{
        return (
        <div className="card">
          <p>Tanggal: {val.TGL}</p>
          <p>Kode Pelanggan: {val.KODE_PELANGGAN}</p>
          <p>Subtotal: {val.SUBTOTAL}</p> 

          <button onClick={() => updateData(val.ID_NOTA)}>Update</button>
          <button onClick={() => deleteData(val.ID_NOTA)}>Delete</button>
        </div>
        );
      })}

    </div>
  </div>
  );
}