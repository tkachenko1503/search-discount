import {normalize} from 'normalizr';
import {entitiesSchema} from './schemas';
import invoker from 'ramda/src/invoker';
import map from 'ramda/src/map';

const jsonify = invoker(0, 'toJSON');
const jsonifyCollection = map(jsonify);

export const normalizeModifications = modifications =>
    normalize(jsonifyCollection(modifications), entitiesSchema);

export const throwOnError = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
};

export const openForDownload = pdf => {
    const URL = window.URL || window.webkitURL;
    const downloadUrl = URL.createObjectURL(pdf);

    const link = document.createElement('a');

    link.setAttribute('href', downloadUrl);
    link.setAttribute('download', 'order.pdf');

    link.click();
};
