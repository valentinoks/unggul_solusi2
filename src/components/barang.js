import React, { useState, useEffect } from "react";
import '../Pelanggan.css';
import Axios from 'axios';

export default function Barang() {
  const [nama, setNama] = useState('');
  const [kategori, setKategori] = useState('');
  const [harga, setHarga] = useState('');

  const[dataList, setDataList] = useState([]);
  const[dataList2, setDataList2] = useState([]);

  useEffect(()=> {
    Axios.get("http://localhost:3001/api/v1/barang/get").then((response)=>{
      setDataList(response.data);
    });
  }, [dataList2]);

  const submitData = ()=>{
    Axios.post("http://localhost:3001/api/v1/barang/create", {
      NAMA: nama, 
      KATEGORI: kategori, 
      HARGA: harga
    });

    setDataList([
      ...dataList, 
      {
        NAMA: nama, 
        KATEGORI: kategori, 
        HARGA: harga
      }
    ]);
  };

  const updateData = (id) => {
    Axios.patch(`http://localhost:3001/api/v1/barang/update/${id}`, {
        NAMA: nama, 
        KATEGORI: kategori, 
        HARGA: harga
    }).then(()=>{
      setDataList2([
        ...dataList2
      ]);
    });
  };

  const deleteData = (id) => {
    Axios.delete(`http://localhost:3001/api/v1/barang/delete/${id}`).then(()=>{
      setDataList2((items) => items.filter((ele, i) => {
        return ele.KODE !== id;
      }));
    });
  };

  return (
    <div className="Pelanggan">
    <h1>BARANG</h1>

    <div className="form">
      <label>Nama: </label>
      <input type = "text" name="nama" onChange={(e)=>{
        setNama(e.target.value)
      }}/>
      <label>Kategori: </label>
      <input type = "text" name="kategori" onChange={(e)=>{
        setKategori(e.target.value)
      }}/>
      <label>Harga: </label>
      <input type = "text" name="harga" onChange={(e)=>{
        setHarga(e.target.value)
      }}/>
      <button onClick={submitData}>Submit</button>
      {dataList.map((val)=>{
        return (
        <div className="card">
          <p>Nama: {val.NAMA}</p>
          <p>Kategori: {val.KATEGORI}</p>
          <p>Harga: {val.HARGA}</p> 

          <button onClick={() => updateData(val.KODE)}>Update</button>
          <button onClick={() => deleteData(val.KODE)}>Delete</button>
        </div>
        );
      })}

    </div>
  </div>
  );
}