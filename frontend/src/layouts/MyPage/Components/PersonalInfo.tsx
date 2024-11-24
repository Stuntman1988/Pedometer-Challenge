import React from "react";
import {User} from "../../../models/User.ts";


export const PersonalInfo: React.FC<{user: User}> = (prop) => {



    return (
        <div className={'col-7 col-md-4 myPageMargin mb-3 card'}>
            <h5 className={'card-header'}>Personlig information</h5>
            <div className={'card-body'}>
                <ul className={'list-unstyled fs-6'}>
                    <li className={''}>Namn: {prop.user.name}</li>
                    <li className={''}>Email: {prop.user.email}</li>
                    <li className={''}>ID: {prop.user.id}</li>
                    <li className={''}>TeamID: {prop.user.teamId}</li>
                </ul>
                <a href={'#'} className={'btn btn-primary'}>Go somewhere</a>
            </div>
        </div>
    )
}
