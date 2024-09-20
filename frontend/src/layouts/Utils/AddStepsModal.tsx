import {useTranslation} from "react-i18next";
import {useState} from "react";
import {SpinnerLoading} from "./SpinnerLoading.tsx";
import {User} from "../../models/User.ts";
import {AddStepsRequest} from "../../models/AddStepsRequest.ts";


export const AddStepsModal = ({setNewStepsAdded, teamId}: { setNewStepsAdded: (value: boolean) => void; teamId: string }) => {

    const {t} = useTranslation();
    const [httpError, setHttpError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState('')
    const [newSteps, setNewSteps] = useState('')

    const modalElement = document.getElementById('addStepsModal');
    modalElement?.addEventListener('shown.bs.modal', fetchUsers);

    async function fetchUsers() {
        const url = `http://localhost:8080/api/users/search/findUsersByTeamsId?teamId=${teamId}`
        const fetchUsersResponse = await fetch(url)

        if (!fetchUsersResponse.ok) {
            setIsLoading(false)
            setHttpError("Something went wrong")
        }

        const fetchUsersResponseJson = await fetchUsersResponse.json()
        const fetchUsersData = fetchUsersResponseJson._embedded.users

        const usersTemp: User[] = []

        for (const key in fetchUsersData) {
            usersTemp.push({
                id: fetchUsersData[key].id,
                name: fetchUsersData[key].name,
                email: fetchUsersData[key].email,
            })
        }
        setUsers(usersTemp)
        setIsLoading(false)
    }

    async function saveSteps() {
        const saveStepsData = new AddStepsRequest(Number(selectedUser), Number(newSteps))

        const url = "http://localhost:8080/api/stepsHistory/addSteps"
        const headers = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saveStepsData)
        }
        const saveStepsResponse = await fetch(url, headers)

        if (!saveStepsResponse.ok){
            throw new Error('Something went wrong') //TODO: skapa ett felmeddealnde som kommer upp
        }

        setNewStepsAdded(true)
        setNewSteps('')
        setSelectedUser('')
    }


    return (
        <div className={'modal fade'} id={'addStepsModal'} data-bs-backdrop={'static'} data-bs-keyboard={'false'}
             tabIndex={-1}
             aria-labelledby={'addStepsModalLabel'} aria-hidden={'true'}>
            <div className={'modal-dialog'}>
                <div className={'modal-content'}>
                    <div className={'modal-header'}>
                        <h1 className={'modal-title fs-5'} id={'addStepsModalLabel'}>{t('addSteps')}</h1>
                        <button type={'button'} className={'btn-close'} data-bs-dismiss={'modal'}
                                aria-label={'Close'}></button>
                    </div>
                    <div className={'modal-body'}>
                        {isLoading ?
                            <SpinnerLoading/>
                            :
                            <>
                                <label className={'form-label'}>{t('addSteps')}</label>
                                <div className={'input-group mb-3'}>
                                    <select className={'form-select'} aria-label={'Default select example'}
                                            value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                                        <option value="">{t('usersList')}</option>
                                        {users.map((user: User) =>
                                            <option key={user.id} value={user.id}>{user.name}</option>)
                                        }
                                    </select>
                                    <input type={'number'} className={'form-control'} placeholder={t('Steps')} value={newSteps}
                                           onChange={(e) => setNewSteps(e.target.value)}/>
                                </div>
                            </>
                        }
                        {httpError !== '' && <div className='container m-5'>
                            <p>{httpError}</p>
                        </div>}
                    </div>
                    <div className={'modal-footer'}>
                        <button type={'button'} className={'btn border-secondary'}
                                data-bs-dismiss={'modal'}>{t('Close')}</button>
                        <button type={'button'} className={'btn btn-success'} onClick={saveSteps} {...(newSteps && {'data-bs-dismiss': 'modal'})}>
                            {t('addStepsButton')}
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}
