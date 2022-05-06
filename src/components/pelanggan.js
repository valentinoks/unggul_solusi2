import React, { useState, useEffect } from "react";
import '../Pelanggan.css';
import Axios from 'axios';

export default function Pelanggan() {
  const [nama, setNama] = useState('');
  const [domisili, setDomisili] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');

  const[dataList, setDataList] = useState([]);
  const[dataList2, setDataList2] = useState([]);

  useEffect(()=> {
    Axios.get("http://localhost:3001/api/v1/pelanggan/get").then((response)=>{
      setDataList(response.data);
    });
  }, [dataList2]);

  const submitData = ()=>{
    Axios.post("http://localhost:3001/api/v1/pelanggan/create", {
      NAMA: nama, 
      DOMISILI: domisili, 
      JENIS_KELAMIN: jenisKelamin
    });

    setDataList([
      ...dataList, 
      {
        NAMA: nama, 
        DOMISILI: domisili, 
        JENIS_KELAMIN: jenisKelamin
      }
    ]);
  };

  const updateData = (id) => {
    Axios.patch(`http://localhost:3001/api/v1/pelanggan/update/${id}`, {
      NAMA: nama, 
      DOMISILI: domisili, 
      JENIS_KELAMIN: jenisKelamin
    }).then(()=>{
      setDataList2([
        ...dataList2
      ]);
    });
  };

  const deleteData = (id) => {
    Axios.delete(`http://localhost:3001/api/v1/pelanggan/delete/${id}`).then(()=>{
      setDataList2((items) => items.filter((ele, i) => {
        return ele.ID_PELANGGAN !== id;
      }));
    });
  };

  return (
    <div className="Pelanggan">
    <h1>PELANGGAN</h1>

    <div className="form">
      <label>Nama: </label>
      <input type = "text" name="nama" onChange={(e)=>{
        setNama(e.target.value)
      }}/>
      <label>Domisili: </label>
      <input type = "text" name="domisili" onChange={(e)=>{
        setDomisili(e.target.value)
      }}/>
      <label>Jenis Kelamin: </label>
      <input type = "text" name="jenisKelamin" onChange={(e)=>{
        setJenisKelamin(e.target.value)
      }}/>
      <button onClick={submitData}>Submit</button>
      {dataList.map((val)=>{
        return (
        <div className="card">
          <p>Nama: {val.NAMA}</p>
          <p>Domisili: {val.DOMISILI}</p>
          <p>Jenis Kelamin: {val.JENIS_KELAMIN}</p> 

          <button onClick={() => updateData(val.ID_PELANGGAN)}>Update</button>
          <button onClick={() => deleteData(val.ID_PELANGGAN)}>Delete</button>
        </div>
        );
      })}

    </div>
  </div>
  );
}