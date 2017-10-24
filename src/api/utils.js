import {normalize} from 'normalizr';
import {entitiesSchema} from './schemas';
import invoker from 'ramda/src/invoker';
import map from 'ramda/src/map';

const filename = 'order.pdf';
let host = process.env.NODE_ENV !== 'production' ? 'http://localhost:8090' : '';

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


const createLink = (blobData) => {
    const URL = window.URL || window.webkitURL;
    const dataURL = URL.createObjectURL(blobData);

    const link = document.createElement('a');

    link.setAttribute('href', dataURL);

    // cleanup
    setTimeout(
        () => URL.revokeObjectURL(dataURL),
        100
    );

    return link;
};


export const openForDownload = pdf => {
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they
        // were created. These URLs will no longer resolve as the data backing the URL has been freed."
        window.navigator.msSaveBlob(pdf, filename);
    } else {
        const link = createLink(pdf);

        link.setAttribute('download', filename);
        link.click();
    }
};


export const openInBlankTab = pdf => {
    const link = createLink(pdf);

    link.setAttribute('target', '_blank');
    link.click();
};


export const checkoutRequest = (action, body) => {
    const url = `${host}/checkout/${action}`;
    const data = {
        method: "POST",
        body
    };

    return fetch(url, data)
        .then(throwOnError);
};
