import * as React from 'react';
import {TotalStepsOfUsers} from "../../../models/TotalStepsOfUsers.ts";
import {useTranslation} from "react-i18next";
import {Team} from "../../../models/Team.ts";

export const Progressbar: React.FC<{ data: TotalStepsOfUsers, team?: Team }> = (prop) => {

    const {t} = useTranslation()

    const goalSteps = prop.team?.stepsGoal ?? 0
    const percentOfSteps = parseFloat(((prop.data.totalSteps / goalSteps) * 100).toFixed(1));


    return (
        <div className={'mt-3'}>
            <p className={'form-label'}>{prop.data.name} - {prop.data.totalSteps.toLocaleString('sv-SE')} {t('steps')}
            </p>
            <div className={'progress bg-light bg-opacity-25'} role={'progressbar'}
                 aria-label={'Animated striped example'}
                 aria-valuenow={percentOfSteps}
                 aria-valuemin={0} aria-valuemax={100}>
                <div className={'progress-bar progress-bar-striped progress-bar-animated bg-success overflow-visible'}
                     style={{width: `${percentOfSteps}%`}}>{percentOfSteps}%
                </div>
            </div>
        </div>
    )
}
