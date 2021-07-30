import React, { useState, Fragment } from 'react';
import FileBase from 'react-file-base64';
import { paivitaTuote } from '../reducers/tuoteReducer';

const KuvaForm = ({ kuvat, setKuvat }) => {
    const [values, setValues] = useState({ otsikko: '', kuvaus: '', kuvatiedosto: '', etusivu: false });
    const [newImage, setNewImage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setKuvat(kuvat.concat({
            otsikko: values.otsikko,
            kuvaus: values.kuvaus,
            kuvatiedosto: newImage,
            etusivu: kuvat.length > 1 ? false : true
        }));
        setValues({ otsikko: '', kuvaus: '', kuvatiedosto: '', etusivu: false });
        setNewImage('');
    }

    return (
        <Fragment>
            <div className="card shadow-sm">
                <div className="card-header">
                    <label>Kuvien lisääminen: </label>
                </div>
                <div className="card-body">
                    <div>
                        Otsikko: <input
                            name='otsikko'
                            type='text'
                            value={values.otsikko}
                            onChange={(event) => setValues({ ...values, otsikko: event.target.value })}
                        />
                    </div>
                    <div>
                        Kuvaus: <input
                            name='kuvaus'
                            type='text'
                            value={values.kuvaus}
                            onChange={(event) => setValues({ ...values, kuvaus: event.target.value })}
                        />
                    </div>
                    <div>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => {
                                console.log('base64:', base64);
                                setNewImage(base64);
                            }}
                        />
                    </div>
                    <div>
                        <div>Lisättävät kuvat</div>
                        <div>{kuvat.length}</div>
                    </div>
                    <button onClick={handleSubmit}>Lisää kuva</button>
                </div>
            </div>
        </Fragment>
    )
}

export default KuvaForm;
