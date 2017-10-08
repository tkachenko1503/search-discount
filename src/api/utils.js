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

const filename = 'order.pdf';

export const openForDownload = pdf => {
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they
        // were created. These URLs will no longer resolve as the data backing the URL has been freed."
        window.navigator.msSaveBlob(pdf, filename);
    } else {
        const URL = window.URL || window.webkitURL;
        const downloadUrl = URL.createObjectURL(pdf);

        const link = document.createElement('a');

        link.setAttribute('href', downloadUrl);
        link.setAttribute('download', filename);

        link.click();

        // cleanup
        setTimeout(
            () => URL.revokeObjectURL(downloadUrl),
            100
        );
    }

};
