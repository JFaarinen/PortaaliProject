import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';

const KuvienLataus = (props) => {
    const dispatch = useDispatch();

    const onDropFile = (files) => {
        console.log('tiedosto lisätty')
    }

    return (
        <Fragment>
            <div className="card shadow-sm">
                <div className="card-header">
                    <div>Kuvien lataaminen</div>
                </div>
                <div className="card-body">
                    <Dropzone onDrop={onDropFile}>
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
