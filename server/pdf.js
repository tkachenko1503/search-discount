import {Chromeless} from 'chromeless';

export function generate(html) {
    const chromeless = new Chromeless();

    return chromeless
        .setHtml(html)
        .pdf({landscape: true});
}
