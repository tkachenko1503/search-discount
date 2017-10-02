import values from 'ramda/src/values';
import propEq from 'ramda/src/propEq';
import filter from 'ramda/src/filter';

import Category from '../models/Category';
import Product from '../models/Product';
import Modification from '../models/Modification';

const categories = {
    "c1": { id: "1", name: "Бетонные и заборные блоки"},
    "c2": { id: "2", name: "Декоративные блоки"},
    "c3": { id: "2", name: "Крышки заборные"}
};

const products =  {
    "p1": { id: "p1", name: "Пустотный бетонный блок", category: "c1"},
    "p2": { id: "p2", name: "Пустотный бетонный блок", category: "c1"},
    "p3": { id: "p3", name: "Пустотный бетонный блок", category: "c1"},
    "p4": { id: "p4", name: "Пустотный бетонный блок колотый", category: "c1"},
    "p5": { id: "p5", name: "Бетонный блок 1/2", category: "c1"},
    "p6": { id: "p6", name: "Бетонный блок колотый 1/2", category: "c1"},
    "p7": { id: "p7", name: "Бетонный блок 1/4", category: "c1"},
    "p8": { id: "p8", name: "Полублок столба колотый", category: "c1"},
    "p9": { id: "p9", name: "Пустотный бетонный блок", category: "c1"},
    "p10": { id: "p10", name: "Полублок столба [круглый]", category: "c1"},
    "p11": { id: "p11", name: "Декоративный блок «Малага»", category: "c2"},
    "p12": { id: "p12", name: "Дополнительный элемент «Малага» 1/2", category: "c2"},
    "p13": { id: "p13", name: "Декоративный блок «Цветок»", category: "c2"},
    "p14": { id: "p14", name: "Декоративный блок «Ромб»", category: "c2"},
    "p15": { id: "p15", name: "Крышка столба", category: "c3"},
    "p16": { id: "p16", name: "Крышка столба", category: "c3"},
    "p17": { id: "p17", name: "Элемент столба «Светильник»", category: "c3"},
    "p18": { id: "p18", name: "Основание столба", category: "c3"},
    "p19": { id: "p19", name: "Крышка заборная", category: "c3"},
    "p20": { id: "p20", name: "Крышка-ступень колотая", category: "c3"},
    "p21": { id: "p21", name: "Крышка-ступень", category: "c3"},
    "p22": { id: "p22", name: "Крышка заборная закругленая", category: "c3"},
    "p23": { id: "p23", name: "Крышка заборная с фаской", category: "c3"},
    "p24": { id: "p24", name: "Крышка заборная двускатная", category: "c3"},
    "p25": { id: "p25", name: "Крышка-ступень декоративная (колотая)", category: "c3"},
    "p26": { id: "p26", name: "Крышка заборная двускатная", category: "c3"},
    "p27": { id: "p27", name: "Крышка фигурная широкая", category: "c3"},
    "p28": { id: "p28", name: "Крышка заборная закругленная", category: "c3"},
    "p29": { id: "p29", name: "Декоративный наличник (молдинг)", category: "c3"},
    "p30": { id: "p30", name: "Крышка столба колотая", category: "c3"},
    "p31": { id: "p31", name: "Крышка столба колотая", category: "c3"},
    "p32": { id: "p32", name: "Отлив односкатный", category: "c3"},
    "p33": { id: "p33", name: "Подступенок", category: "c3"}
};
const productsValues = values(products);

const modifications = {
    "i1": {id: "i1", name: "Серый (базовый)", size: "390×190×100", palletSize: 120, weight: 10, price: 38, discount: 10, product: "p1"},
    "i2": {id: "i2", name: "Цветной*", size: "390×190×100", palletSize: 120, weight: 10, price: 44, discount: 10, product: "p1"},
    "i3": {id: "i3", name: "Белый", size: "390×190×100", palletSize: 120, weight: 10, price: 62, discount: 10, product: "p1"},
    "i4": {id: "i4", name: "Элит (белый + цвет)", size: "390×190×100", palletSize: 120, weight: 10, price: 69, discount: 10, product: "p1"},


    "i5": {id: "i5", name: "Серый (базовый)", size: "390×190×190", palletSize: 60, weight: 18, price: 72, discount: 10, product: "p2"},
    "i6": {id: "i6", name: "Цветной*", size: "390×190×190", palletSize: 60, weight: 18, price: 90, discount: 10, product: "p2"},
    "i7": {id: "i7", name: "Белый", size: "390×190×190", palletSize: 60, weight: 18, price: 107, discount: 10, product: "p2"},
    "i8": {id: "i8", name: "Элит (белый + цвет)", size: "390×190×190", palletSize: 60, weight: 18, price: 120, discount: 10, product: "p2"},


    "i9": {id: "i9", name: "Серый (базовый)", size: "390×190×120", palletSize: 96, weight: 12, price: 52, discount: 10, product: "p3"},
    "i10": {id: "i10", name: "Цветной*", size: "390×190×120", palletSize: 96, weight: 12, price: 62, discount: 18, product: "p3"},
    "i11": {id: "i11", name: "Белый", size: "390×190×120", palletSize: 96, weight: 12, price: 86, discount: 10, product: "p3"},
    "i12": {id: "i12", name: "Элит (белый + цвет)", size: "390×190×120", palletSize: 96, weight: 12, price: 98, discount: 10, product: "p3"},


    "i13": {id: "i13", name: "Серый (базовый)", size: "390×190×120", palletSize: 96, weight: 12, price: 70, discount: 10, product: "p4"},
    "i14": {id: "i14", name: "Цветной*", size: "390×190×120", palletSize: 96, weight: 12, price: 82, discount: 18, product: "p4"},
    "i15": {id: "i15", name: "Белый", size: "390×190×120", palletSize: 96, weight: 12, price: 113, discount: 10, product: "p4"},
    "i16": {id: "i16", name: "Элит (белый + цвет)", size: "390×190×120", palletSize: 96, weight: 12, price: 134, discount: 10, product: "p4"},


    "i17": {id: "i17", name: "Серый (базовый)", size: "390х120х88", palletSize: 192, weight: 6.4, price: 35, discount: 10, product: "p5"},
    "i18": {id: "i18", name: "Цветной*", size: "390х120х88", palletSize: 192, weight: 6.4, price: 41, discount: 18, product: "p5"},
    "i18a": {id: "i18a", name: "Белый", size: "390х120х88", palletSize: 192, weight: 6.4, price: 46, discount: 10, product: "p5"},
    "i20": {id: "i20", name: "Элит (белый + цвет)", size: "390х120х88", palletSize: 192, weight: 6.4, price: 54, discount: 10, product: "p5"},


    "i21": {id: "i21", name: "Серый (базовый)", size: "188х120х190", palletSize: 192, weight: 6.2, price: 36, discount: 10, product: "p6"},
    "i22": {id: "i22", name: "Цветной*", size: "188х120х190", palletSize: 192, weight: 6.2, price: 42, discount: 18, product: "p6"},
    "i23": {id: "i23", name: "Белый", size: "188х120х190", palletSize: 192, weight: 6.2, price: 58, discount: 10, product: "p6"},
    "i24": {id: "i24", name: "Элит (белый + цвет)", size: "188х120х190", palletSize: 192, weight: 6.2, price: 68, discount: 10, product: "p6"},


    "i25": {id: "i25", name: "Серый (базовый)", size: "188х120х88", palletSize: 384, weight: 3.1, price: 18, discount: 10, product: "p7"},
    "i26": {id: "i26", name: "Цветной*", size: "188х120х88", palletSize: 384, weight: 3.1, price: 23, discount: 18, product: "p7"},
    "i27": {id: "i27", name: "Белый", size: "188х120х88", palletSize: 384, weight: 3.1, price: 29, discount: 10, product: "p7"},
    "i28": {id: "i28", name: "Элит (белый + цвет)", size: "188х120х88", palletSize: 384, weight: 3.1, price: 34, discount: 10, product: "p7"},


    "i29": {id: "i29", name: "Серый (базовый)", size: "190х190х190", palletSize: 96, weight: 11, price: 66, discount: 10, product: "p8"},
    "i30": {id: "i30", name: "Цветной*", size: "190х190х190", palletSize: 96, weight: 11, price: 23, discount: 80, product: "p8"},
    "i31": {id: "i31", name: "Белый", size: "190х190х190", palletSize: 96, weight: 11, price: 99, discount: 10, product: "p8"},
    "i32": {id: "i32", name: "Элит (белый + цвет)", size: "190х190х190", palletSize: 96, weight: 11, price: 113, discount: 10, product: "p8"},


    "i33": {id: "i33", name: "Серый (базовый)", size: "190х190х190", palletSize: 96, weight: 11, price: 66, discount: 10, product: "p8"},
    "i34": {id: "i34", name: "Цветной*", size: "190х190х190", palletSize: 96, weight: 11, price: 23, discount: 80, product: "p8"},
    "i35": {id: "i35", name: "Белый", size: "190х190х190", palletSize: 96, weight: 11, price: 99, discount: 10, product: "p8"},
    "i36": {id: "i36", name: "Элит (белый + цвет)", size: "190х190х190", palletSize: 96, weight: 11, price: 113, discount: 10, product: "p8"},


    "i37": {id: "i37", name: "Серый (базовый)", size: "300×300×300", palletSize: 36, weight: 30, price: 142, discount: 10, product: "p9"},
    "i38": {id: "i38", name: "Цветной*", size: "300×300×300", palletSize: 36, weight: 30, price: 167, discount: 80, product: "p9"},
    "i39": {id: "i39", name: "Белый", size: "300×300×300", palletSize: 36, weight: 30, price: 210, discount: 10, product: "p9"},
    "i40": {id: "i40", name: "Элит (белый + цвет)", size: "300×300×300", palletSize: 36, weight: 30, price: 231, discount: 10, product: "p9"},


    "i41": {id: "i41", name: "Серый (базовый)", size: "300×300×300", palletSize: 36, weight: 30, price: 142, discount: 10, product: "p10"},
    "i42": {id: "i42", name: "Цветной*", size: "300×300×300", palletSize: 36, weight: 30, price: 167, discount: 80, product: "p10"},
    "i43": {id: "i43", name: "Белый", size: "300×300×300", palletSize: 36, weight: 30, price: 210, discount: 10, product: "p10"},
    "i44": {id: "i44", name: "Элит (белый + цвет)", size: "300×300×300", palletSize: 36, weight: 30, price: 231, discount: 10, product: "p10"},


    "i45": {id: "i45", name: "Серый (базовый)", size: "200×200×100", palletSize: 168, weight: 4, price: 44, discount: 10, product: "p11"},
    "i46": {id: "i46", name: "Цветной*", size: "200×200×100", palletSize: 168, weight: 4, price: 54, discount: 80, product: "p11"},
    "i47": {id: "i47", name: "Белый", size: "200×200×100", palletSize: 168, weight: 4, price: 59, discount: 10, product: "p11"},
    "i48": {id: "i48", name: "Элит (белый + цвет)", size: "200×200×100", palletSize: 168, weight: 4, price: 67, discount: 10, product: "p11"},


    "i49": {id: "i49", name: "Серый (базовый)", size: "250×105×100", palletSize: 490, weight: 1.2, price: 30, discount: 10, product: "p12"},
    "i50": {id: "i50", name: "Цветной*", size: "250×105×100", palletSize: 490, weight: 1.2, price: 54, discount: 38, product: "p12"},
    "i51": {id: "i51", name: "Белый", size: "250×105×100", palletSize: 490, weight: 1.2, price: 41, discount: 10, product: "p12"},
    "i52": {id: "i52", name: "Элит (белый + цвет)", size: "250×105×100", palletSize: 490, weight: 1.2, price: 44, discount: 10, product: "p12"},

    "i53": {id: "i53", name: "Серый (базовый)", size: "300×300×100", palletSize: 64, weight: 15, price: 195, discount: 10, product: "p13"},
    "i54": {id: "i54", name: "Цветной*", size: "300×300×100", palletSize: 64, weight: 15, price: 218, discount: 10, product: "p13"},
    "i55": {id: "i55", name: "Белый", size: "300×300×100", palletSize: 64, weight: 15, price: 258, discount: 10, product: "p13"},
    "i56": {id: "i56", name: "Элит (белый + цвет)", size: "300×300×100", palletSize: 64, weight: 15, price: 270, discount: 10, product: "p13"},

    "i57": {id: "i57", name: "Серый (базовый)", size: "300×300×100", palletSize: 64, weight: 11, price: 195, discount: 10, product: "p14"},
    "i58": {id: "i58", name: "Цветной*", size: "300×300×100", palletSize: 64, weight: 11, price: 218, discount: 10, product: "p14"},
    "i59": {id: "i59", name: "Белый", size: "300×300×100", palletSize: 64, weight: 11, price: 258, discount: 10, product: "p14"},
    "i60": {id: "i60", name: "Элит (белый + цвет)", size: "300×300×100", palletSize: 64, weight: 11, price: 270, discount: 10, product: "p14"},


    "i61": {id: "i61", name: "Серый (базовый)", size: "500×500×100", palletSize: 10, weight: 33.8, price: 297, discount: 10, product: "p15"},
    "i62": {id: "i62", name: "Цветной*", size: "500×500×100", palletSize: 10, weight: 33.8, price: 366, discount: 10, product: "p15"},
    "i63": {id: "i63", name: "Белый", size: "500×500×100", palletSize: 10, weight: 33.8, price: 442, discount: 10, product: "p15"},
    "i64": {id: "i64", name: "Элит (белый + цвет)", size: "500×500×100", palletSize: 10, weight: 33.8, price: 451, discount: 10, product: "p15"},


    "i65": {id: "i65", name: "Серый (базовый)", size: "400×400×100", palletSize: 20, weight: 19, price: 240, discount: 10, product: "p16"},
    "i66": {id: "i66", name: "Цветной*", size: "400×400×100", palletSize: 20, weight: 19, price: 280, discount: 10, product: "p16"},
    "i67": {id: "i67", name: "Белый", size: "400×400×100", palletSize: 20, weight: 19, price: 331, discount: 10, product: "p16"},
    "i68": {id: "i68", name: "Элит (белый + цвет)", size: "400×400×100", palletSize: 20, weight: 19, price: 384, discount: 10, product: "p16"},


    "i69": {id: "i69", name: "Серый (базовый)", size: "300×300×60", palletSize: 71, weight: 6.5, price: 178, discount: 10, product: "p17"},
    "i70": {id: "i70", name: "Цветной*", size: "300×300×60", palletSize: 71, weight: 6.5, price: 197, discount: 10, product: "p17"},
    "i71": {id: "i71", name: "Белый", size: "300×300×60", palletSize: 71, weight: 6.5, price: 255, discount: 10, product: "p17"},
    "i72": {id: "i72", name: "Элит (белый + цвет)", size: "300×300×60", palletSize: 71, weight: 6.5, price: 295, discount: 10, product: "p17"},


    "i72a": {id: "i72a", name: "Серый (базовый)", size: "400×400×70 ", palletSize: 36, weight: 19, price: 231, discount: 10, product: "p18"},
    "i73": {id: "i73", name: "Цветной*", size: "400×400×70", palletSize: 36, weight: 19, price: 266, discount: 10, product: "p18"},
    "i74": {id: "i74", name: "Белый", size: "400×400×70", palletSize: 36, weight: 19, price: 324, discount: 10, product: "p18"},
    "i75": {id: "i75", name: "Элит (белый + цвет)", size: "400×400×70", palletSize: 36, weight: 19, price: 367, discount: 10, product: "p18"},

    "i76": {id: "i76", name: "Серый (базовый)", size: "250×500×50", palletSize: 70, weight: 12, price: 166, discount: 10, product: "p19"},
    "i77": {id: "i77", name: "Цветной*", size: "250×500×50", palletSize: 70, weight: 12, price: 211, discount: 10, product: "p19"},
    "i78": {id: "i78", name: "Белый", size: "250×500×50", palletSize: 70, weight: 12, price: 252, discount: 10, product: "p19"},
    "i79": {id: "i79", name: "Элит (белый + цвет)", size: "400×400×70", palletSize: 70, weight: 12, price: 276, discount: 10, product: "p19"},
    "i80": {id: "i80", name: "Серый (базовый)", size: "300х500х50", palletSize: 42, weight: 15.8, price: 244, discount: 10, product: "p20"},
    "i81": {id: "i81", name: "Цветной*", size: "300х500х50", palletSize: 42, weight: 15.8, price: 274, discount: 10, product: "p20"},
    "i82": {id: "i82", name: "Белый", size: "300х500х50", palletSize: 42, weight: 15.8, price: 327, discount: 10, product: "p20"},
    "i83": {id: "i83", name: "Элит (белый + цвет)", size: "300х500х50", palletSize: 42, weight: 15.8, price: 358, discount: 10, product: "p20"},


    "i81a": {id: "i81a", name: "Серый (базовый)", size: "300х500х70", palletSize: 42, weight: 23, price: 291, discount: 10, product: "p21"},
    "i82a": {id: "i82a", name: "Цветной*", size: "300х500х70", palletSize: 42, weight: 23, price: 329, discount: 10, product: "p21"},
    "i83a": {id: "i83a", name: "Белый", size: "300х500х70", palletSize: 42, weight: 23, price: 372, discount: 10, product: "p21"},
    "i84": {id: "i84", name: "Элит (белый + цвет)", size: "300х500х70", palletSize: 42, weight: 23, price: 409, discount: 10, product: "p21"},


    "i85": {id: "i85", name: "Серый (базовый)", size: "150×400×40", palletSize: 155, weight: 5.5, price: 90, discount: 10, product: "p22"},
    "i86": {id: "i86", name: "Цветной*", size: "150×400×40", palletSize: 155, weight: 5.5, price: 105, discount: 10, product: "p22"},
    "i87": {id: "i87", name: "Белый", size: "150×400×40", palletSize: 155, weight: 5.5, price: 124, discount: 10, product: "p22"},
    "i88": {id: "i88", name: "Элит (белый + цвет)", size: "150×400×40", palletSize: 155, weight: 5.5, price: 143, discount: 10, product: "p22"},

    "i89": {id: "i89", name: "Серый (базовый)", size: "150×400×40", palletSize: 155, weight: 5.5, price: 81, discount: 10, product: "p23"},
    "i90": {id: "i90", name: "Цветной*", size: "150×400×40", palletSize: 155, weight: 5.5, price: 99, discount: 10, product: "p23"},
    "i91": {id: "i91", name: "Белый", size: "150×400×40", palletSize: 155, weight: 5.5, price: 117, discount: 10, product: "p23"},
    "i92": {id: "i92", name: "Элит (белый + цвет)", size: "150×400×40", palletSize: 155, weight: 5.5, price: 135, discount: 10, product: "p23"},


    "i93": {id: "i93", name: "Серый (базовый)", size: "170×400×50", palletSize: 98, weight: 6.75, price: 95, discount: 10, product: "p24"},
    "i94": {id: "i94", name: "Цветной*", size: "170×400×50", palletSize: 98, weight: 6.75, price: 114, discount: 10, product: "p24"},
    "i95": {id: "i95", name: "Белый", size: "170×400×50", palletSize: 98, weight: 6.75, price: 142, discount: 10, product: "p24"},
    "i96": {id: "i96", name: "Элит (белый + цвет)", size: "170×400×50", palletSize: 98, weight: 6.75, price: 164, discount: 10, product: "p24"},

    "i97": {id: "i97", name: "Серый (базовый)", size: "300×500×70", palletSize: 42, weight: 23, price: 288, discount: 10, product: "p25"},
    "i98": {id: "i98", name: "Цветной*", size: "300×500×70", palletSize: 42, weight: 23, price: 333, discount: 10, product: "p25"},
    "i99": {id: "i99", name: "Белый", size: "300×500×70", palletSize: 42, weight: 23, price: 377, discount: 10, product: "p25"},
    "i100": {id: "i100", name: "Элит (белый + цвет)", size: "300×500×70", palletSize: 42, weight: 23, price: 414, discount: 10, product: "p25"},


    "i101": {id: "i101", name: "Серый (базовый)", size: "500х90х350", palletSize: 32, weight: 23.75, price: 280, discount: 10, product: "p26"},
    "i102": {id: "i102", name: "Цветной*", size: "500х90х350", palletSize: 32, weight: 23.75, price: 321, discount: 10, product: "p26"},
    "i103": {id: "i103", name: "Белый", size: "500х90х350", palletSize: 32, weight: 23.75, price: 395, discount: 10, product: "p26"},
    "i104": {id: "i104", name: "Элит (белый + цвет)", size: "500х90х350", palletSize: 32, weight: 23.75, price: 433, discount: 10, product: "p26"},


    "i105": {id: "i105", name: "Серый (базовый)", size: "400х550х60", palletSize: 32, weight: 28.2, price: 280, discount: 10, product: "p27"},
    "i106": {id: "i106", name: "Цветной*", size: "400х550х60", palletSize: 32, weight: 28.2, price: 321, discount: 10, product: "p27"},
    "i107": {id: "i107", name: "Белый", size: "400х550х60", palletSize: 32, weight: 28.2, price: 395, discount: 10, product: "p27"},
    "i108": {id: "i108", name: "Элит (белый + цвет)", size: "400х550х60", palletSize: 32, weight: 28.2, price: 433, discount: 10, product: "p27"},


    "i109": {id: "i109", name: "Серый (базовый)", size: "400х50х170", palletSize: 145, weight: 5, price: 95, discount: 10, product: "p28"},
    "i110": {id: "i110", name: "Цветной*", size: "400х50х170", palletSize: 145, weight: 5, price: 114, discount: 10, product: "p28"},
    "i111": {id: "i111", name: "Белый", size: "400х50х170", palletSize: 145, weight: 5, price: 142, discount: 10, product: "p28"},
    "i112": {id: "i112", name: "Элит (белый + цвет)", size: "400х50х170", palletSize: 145, weight: 5, price: 164, discount: 10, product: "p28"},


    "i113": {id: "i113", name: "Серый (базовый)", size: "500×80×50", palletSize: 88, weight: 4.38, price: 123, discount: 10, product: "p29"},
    "i114": {id: "i114", name: "Цветной*", size: "500×80×50", palletSize: 88, weight: 4.38, price: 130, discount: 10, product: "p29"},
    "i115": {id: "i115", name: "Белый", size: "500×80×50", palletSize: 88, weight: 4.38, price: 160, discount: 10, product: "p29"},
    "i116": {id: "i116", name: "Элит (белый + цвет)", size: "500×80×50", palletSize: 88, weight: 4.38, price: 182, discount: 10, product: "p29"},

    "i117": {id: "i117", name: "Серый (базовый)", size: "400×400×60", palletSize: 42, weight: 21, price: 338, discount: 10, product: "p30"},
    "i118": {id: "i118", name: "Цветной*", size: "400×400×60", palletSize: 42, weight: 21, price: 389, discount: 10, product: "p30"},
    "i119": {id: "i119", name: "Белый", size: "400×400×60", palletSize: 42, weight: 21, price: 458, discount: 10, product: "p30"},
    "i120": {id: "i120", name: "Элит (белый + цвет)", size: "400×400×60", palletSize: 42, weight: 21, price: 508, discount: 10, product: "p30"},


    "i121": {id: "i121", name: "Серый (базовый)", size: "200×220×60", palletSize: 132, weight: 5.8, price: 113, discount: 10, product: "p31"},
    "i122": {id: "i122", name: "Цветной*", size: "200×220×60", palletSize: 132, weight: 5.8, price: 130, discount: 10, product: "p31"},
    "i123": {id: "i123", name: "Белый", size: "200×220×60", palletSize: 132, weight: 5.8, price: 157, discount: 10, product: "p31"},
    "i124": {id: "i124", name: "Элит (белый + цвет)", size: "200×220×60", palletSize: 132, weight: 5.8, price: 176, discount: 10, product: "p31"},


    "i125": {id: "i125", name: "Серый (базовый)", size: "400х40х170", palletSize: 98, weight: 4.25, price: 79, discount: 10, product: "p32"},
    "i126": {id: "i126", name: "Цветной*", size: "400х40х170", palletSize: 98, weight: 4.25, price: 104, discount: 10, product: "p32"},
    "i127": {id: "i127", name: "Белый", size: "400х40х170", palletSize: 98, weight: 4.25, price: 125, discount: 10, product: "p32"},
    "i128": {id: "i128", name: "Элит (белый + цвет)", size: "400х40х170", palletSize: 98, weight: 4.25, price: 132, discount: 10, product: "p32"},

    "i129": {id: "i129", name: "Серый (базовый)", size: "500х60х160", palletSize: 156, weight: 8.85, price: 124, discount: 10, product: "p33"},
    "i130": {id: "i130", name: "Цветной*", size: "500х60х160", palletSize: 156, weight: 8.85, price: 140, discount: 10, product: "p33"},
    "i131": {id: "i131", name: "Белый", size: "500х60х160", palletSize: 156, weight: 8.85, price: 166, discount: 10, product: "p33"},
    "i132": {id: "i132", name: "Элит (белый + цвет)", size: "500х60х160", palletSize: 156, weight: 8.85, price: 177, discount: 10, product: "p33"}
};
const modificationsValues = values(modifications);


for (let category in categories) {
    const cat = new Category();

    cat.set('name', categories[category].name);

    cat
        .save()
        .then((createdCategory) => {
            const prods = filter(propEq('category', category))(productsValues);

            for (let i = 0; i < prods.length; i++) {
                const pr = new Product();

                pr.set('name', prods[i].name);
                pr.set('category', createdCategory);

                pr
                    .save()
                    .then((createdProduct) => {
                        const mods = filter(propEq('product', prods[i].id))(modificationsValues);

                        for (let j = 0; j < mods.length; j++) {
                            const md = new Modification();

                            md.set('name', mods[j].name);
                            md.set('size', mods[j].size);
                            md.set('palletSize', mods[j].palletSize);
                            md.set('weight', mods[j].weight);
                            md.set('price', mods[j].price);
                            md.set('discount', mods[j].discount);
                            md.set('product', createdProduct);

                            md.save();
                        }
                    });
            }
        });
}
