import React, { useState, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lisaaKuva } from '../reducers/kuvaReducer';
import FileBase from 'react-file-base64';

import Dropzone from 'react-dropzone';

const KuvaForm = () => {
    const [newImages, setNewImages] = useState([]);
    const dispatch = useDispatch();
    const tuoteId = useParams().id;
    console.log(tuoteId);
    const tuotteet = useSelector(state => state.tuotteet);
    const tuote = tuotteet.find(tuote => tuote.id === tuoteId);
    if (!tuote) {
        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const updTuote = { ...tuote, img: tuote.img.concat(newImages) }
        console.log('päivitykseen menevä tuote:', updTuote);
        dispatch(lisaaKuva(tuoteId, updTuote));
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
                    <div>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => {
                                console.log('base64:', base64);
                                setNewImages(newImages.concat(base64));
                            }}
                        />
                    </div>
                    <div>
                        <div>Lisättävät kuvat</div>
                        <div>{newImages.length}</div>
                    </div>
                    <button onClick={handleSubmit}>Päivitä kuvat</button>
                </div>
            </div>
        </Fragment>
    )
}

export default KuvaForm;
