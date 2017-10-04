import jsPDF from 'jspdf';

export const htmlToPdf = (node) => {
    const document = new jsPDF();

    document.fromHTML(node, 15, 15);

    return document;
};
