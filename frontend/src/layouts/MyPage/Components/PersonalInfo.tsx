import React, {useState} from "react";
import {User} from "../../../models/User.ts";
import {useTranslation} from "react-i18next";
import {EditPersonalInfoRequest} from "../../../models/EditPersonalInfoRequest.ts";
import {AlertModal} from "../../Utils/AlertModal.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation} from "@fortawesome/free-solid-svg-icons";


export const PersonalInfo: React.FC<{ user: User, setNewStepsAdded?: (value: boolean) => void }> = (prop) => {

    const {t} = useTranslation();
    const [httpError, setHttpError] = useState('')
    const [name, setName] = useState(prop.user.name)
    const [email, setEmail] = useState(prop.user.email)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const saveChanges = async () => {
        const editedUser = new EditPersonalInfoRequest(prop.user.id, name, email)
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/editPersonalInfo`
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedUser)
        }
        const fetchEditUserResponse = await fetch(url, headers)

        if (!fetchEditUserResponse.ok) {
            setHttpError(fetchEditUserResponse.statusText)
            return
        }

        if (prop.setNewStepsAdded) {
            prop.setNewStepsAdded(true)
        }

        setIsModalOpen(false)
        localStorage.setItem('userToken', editedUser.email)
        AlertModal.showConfirm(`${t('Saved')}`)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (prop.user.name === name && prop.user.email === email) {
                setIsModalOpen(false)
                setHttpError('')
                return
            } else if (name === '' || email === '') {
                setHttpError(`${t('NotEmpty')}`)
                return
            } else {
                setHttpError('')
                await saveChanges()
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <div className={'col-7 col-md-4 myPageMargin mb-3 card'}>
                <h5 className={'card-header'}>{t('PersonalInfo')}</h5>
                <div className={'card-body'}>
                    <ul className={'list-unstyled fs-6'}>
                        <li className={''}>{t('Name')}: {prop.user.name}</li>
                        <li className={''}>Email: {prop.user.email}</li>
                        <li className={''}>ID: {prop.user.id}</li>
                        <li className={''}>TeamID: {prop.user.teamId}</li>
                    </ul>
                    <button type="button" className="btn btn-sm btn-success" data-bs-toggle="modal"
                            onClick={() => setIsModalOpen(true)}>
                        {t('Edit')}
                    </button>
                </div>
            </div>

            {/*MODAL*/}
            <div className={`modal fade ${isModalOpen ? 'show d-block' : ''}`} id={'editPersonal'}
                 data-bs-backdrop={'static'} data-bs-keyboard={'false'}
                 tabIndex={-1}
                 aria-labelledby={'editPersonalLabel'} aria-hidden={'true'}>
                <div className={'modal-dialog'}>
                    <form className={'modal-content'} onSubmit={handleSubmit}>
                        <div className={'modal-header'}>
                            <h1 className={'modal-title fs-5'} id={'editPersonalLabel'}>
                                {t('EditPersonalInfo')}</h1>
                            <button type={'button'} className={'btn-close'}
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setName(prop.user.name);
                                        setEmail(prop.user.email);
                                        setHttpError('')
                                    }}
                                    aria-label={'Close'}></button>
                        </div>
                        <div className={'modal-body'}>

                            <label className={'form-label mb-3 mx-1'}>{t('YourData')}</label>

                            <div className={'input-group mb-2'}>
                                <div className={'input-group input-group-sm mb-3 mx-1'}>
                                    <span className={'input-group-text'} id={'inputGroup-sizing-sm'}
                                          style={{width: '55px'}}>{t('Name')}</span>
                                    <input type={'text'} className={`form-control ${name === '' ? 'is-invalid' : ''}`}
                                           aria-label={'Sizing example input'}
                                           aria-describedby={'inputGroup-sizing-sm'} value={name}
                                           onChange={(e) => setName(e.target.value)}/>
                                </div>

                                <div className={'input-group input-group-sm mb-3 mx-1'}>
                                    <span className={'input-group-text'} id={'inputGroup-sizing-sm'}
                                          style={{width: '55px'}}>Email</span>
                                    <input type={'text'} className={`form-control ${email === '' ? 'is-invalid' : ''}`}
                                           aria-label={'Sizing example input'}
                                           aria-describedby={'inputGroup-sizing-sm'} value={email}
                                           onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                            </div>

                            {httpError !== '' &&
                                <div className='text-danger text-end'>
                                    <p><FontAwesomeIcon icon={faCircleExclamation}/> {httpError}</p>
                                </div>
                            }

                        </div>
                        <div className={'modal-footer'}>
                            <button type={'button'} className={'btn border-secondary'}
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setName(prop.user.name);
                                        setEmail(prop.user.email);
                                        setHttpError('');
                                    }}>
                                {t('Close')}</button>
                            <button type={'submit'}
                                    className={'btn btn-success'}>
                                {t('Save')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
