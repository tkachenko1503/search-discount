import React from 'react';
import map from 'ramda/src/map';
import values from 'ramda/src/values';
import pipe from 'ramda/src/pipe';

import Modification from '../Modification';

const makeModifications = pipe(
    map(modification => <Modification key={modification.objectId} modification={modification}/>),
    values
);

const ModificationList = ({modifications}) => {
    return (
        <div>
            {makeModifications(modifications)}
        </div>
    );
};

export default ModificationList;
