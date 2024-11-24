import {AddStepsModal} from "../../Scoreboard/Components/AddStepsModal.tsx";
import React from "react";
import {User} from "../../../models/User.ts";
import {StepsHistory} from "../../../models/StepsHistory.ts";


export const StepsHistoryComp: React.FC<{user: User, stepsHistoryOfUser: StepsHistory[], totalSteps: number, setNewStepsAdded?: (value: boolean) => void}> = (prop) => {


    function parseDate(date: Date) {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat("en-US", {dateStyle: "medium"}).format(newDate);
    }

    function parseTime(date: Date) {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat("en-US", {timeStyle: "short", hour12: false}).format(newDate);
    }

    // const removeSteps = async => {
    //
    // }

    return (
        <>
            <div className={'overflow-y-auto'}
                 style={{maxHeight: "350px", width: "100%", overflowX: "hidden"}}>
                {prop.stepsHistoryOfUser.map(sh => (
                    <li className='border card-text mb-1' key={sh.id}
                        style={{listStyle: "none"}}>
                        <div className='row p-1'>
                            <p className='col-4 mb-0'>{sh.steps} steg</p>
                            <p className='col-5 col-md-6 mb-0'>{parseDate(sh.createdAt)} - {parseTime(sh.createdAt)}</p>
                            <button className={'col-2 btn btn-danger btn-sm ms-2'}
                                    style={{maxWidth: "65px"}}>Ta bort
                            </button>
                        </div>
                    </li>
                ))}
            </div>
            <div className={''}>
                <h6 className={'mx-1 mt-2'}>{prop.totalSteps} Totalt antal steg</h6>
            </div>
            {prop.user.teamId &&
                <>
                    <button className={'btn btn-success mt-2'} data-bs-toggle="modal"
                            data-bs-target="#addStepsModal">Lägg till steg</button>

                    <AddStepsModal setNewStepsAdded={prop.setNewStepsAdded} teamId={prop.user.teamId.toString()}/>
                </>
            }

        </>

    )
}
