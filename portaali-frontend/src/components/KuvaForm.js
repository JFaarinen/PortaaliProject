import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lisaaKuva } from '../reducers/kuvaReducer';

import Dropzone from 'react-dropzone';

const KuvaForm = () => {
    const dispatch = useDispatch();
    const tuoteId = useParams().id;
    console.log(tuoteId);
    const tuotteet = useSelector(state => state.tuotteet);
    const tuote = tuotteet.find(tuote => tuote.id === tuoteId);
    if (!tuote) {
        return null;
    }

    const onDropImage = (files) => {
        console.log('tiedosto lisätty')
        let formData = new FormData();
        files.map((file, index) => {
            formData.append("image", file);
        });
        dispatch(lisaaKuva(tuoteId, formData));
    }

    return (
        <Fragment>
            <div className="card shadow-sm">
                <div className="card-header">
                    <label>Kuvien lataaminen tuotteelle {tuote.nimi}</label>
                </div>
                <div className="card-body">
                    <Dropzone onDrop={onDropImage}>
                        {({ getRootProps, getInputProps }) => (
                            <div
                                className="m-1"
                                style={{
                                    width: "350px",
                                    height: "240px",
                                    border: "1px solid lightgray",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Vedä kuvatiedostoja tänne tai napsauta kenttää tiedostojen valitsemiseksi</p>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                </div>
            </div>
        </Fragment>
    )
}

export default KuvaForm;
