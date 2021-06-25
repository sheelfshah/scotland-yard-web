var station_neighbors = {
  "1": {
    "taxi": ["8", "9"],
    "bus": ["46", "58"],
    "underground": ["46"],
    "blackticket": []
  },
  "2": {
    "taxi": ["10", "20"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "3": {
    "taxi": ["4", "11", "12"],
    "bus": ["22", "23"],
    "underground": [],
    "blackticket": []
  },
  "4": {
    "taxi": ["3", "13"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "5": {
    "taxi": ["15", "16"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "6": {
    "taxi": ["7", "29"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "7": {
    "taxi": ["6", "17"],
    "bus": ["42"],
    "underground": [],
    "blackticket": []
  },
  "8": {
    "taxi": ["1", "18", "19"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "9": {
    "taxi": ["1", "19", "20"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "10": {
    "taxi": ["2", "11", "21", "34"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "11": {
    "taxi": ["3", "10", "22"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "12": {
    "taxi": ["3", "23"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "13": {
    "taxi": ["4", "14", "23", "24"],
    "bus": ["23", "14", "52"],
    "underground": ["46", "67", "89"],
    "blackticket": []
  },
  "14": {
    "taxi": ["13", "15", "25"],
    "bus": ["13", "15"],
    "underground": [],
    "blackticket": []
  },
  "15": {
    "taxi": ["5", "14", "16", "26", "28"],
    "bus": ["14", "29", "41"],
    "underground": [],
    "blackticket": []
  },
  "16": {
    "taxi": ["5", "15", "28", "29"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "17": {
    "taxi": ["7", "29", "30"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "18": {
    "taxi": ["8", "31", "43"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "19": {
    "taxi": ["8", "9", "32"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "20": {
    "taxi": ["2", "9", "33"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "21": {
    "taxi": ["10", "33"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "22": {
    "taxi": ["11", "23", "34", "35"],
    "bus": ["3", "23", "34", "65"],
    "underground": [],
    "blackticket": []
  },
  "23": {
    "taxi": ["12", "13", "22", "37"],
    "bus": ["3", "13", "22", "67"],
    "underground": [],
    "blackticket": []
  },
  "24": {
    "taxi": ["13", "37", "38"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "25": {
    "taxi": ["14", "38", "39"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "26": {
    "taxi": ["15", "27", "39"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "27": {
    "taxi": ["26", "28", "40"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "28": {
    "taxi": ["15", "16", "27", "41"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "29": {
    "taxi": ["6", "16", "17", "41", "42"],
    "bus": ["15", "41", "42", "55"],
    "underground": [],
    "blackticket": []
  },
  "30": {
    "taxi": ["17", "42"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "31": {
    "taxi": ["18", "43", "44"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "32": {
    "taxi": ["19", "33", "44", "45"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "33": {
    "taxi": ["20", "21", "32", "46"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "34": {
    "taxi": ["10", "22", "47", "48"],
    "bus": ["22", "46", "63"],
    "underground": [],
    "blackticket": []
  },
  "35": {
    "taxi": ["22", "36", "48", "65"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "36": {
    "taxi": ["35", "37", "49"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "37": {
    "taxi": ["23", "24", "36", "50"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "38": {
    "taxi": ["24", "25", "50", "51"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "39": {
    "taxi": ["25", "26", "51", "52"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "40": {
    "taxi": ["27", "41", "52", "53"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "41": {
    "taxi": ["28", "29", "40", "54"],
    "bus": ["15", "29", "52", "87"],
    "underground": [],
    "blackticket": []
  },
  "42": {
    "taxi": ["29", "30", "56", "72"],
    "bus": ["7", "29", "72"],
    "underground": [],
    "blackticket": []
  },
  "43": {
    "taxi": ["18", "31", "57"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "44": {
    "taxi": ["31", "32", "58"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "45": {
    "taxi": ["32", "46", "58", "59", "60"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "46": {
    "taxi": ["33", "45", "47", "61"],
    "bus": ["1", "34", "58", "78"],
    "underground": ["1", "13", "74", "79"],
    "blackticket": []
  },
  "47": {
    "taxi": ["34", "46", "62"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "48": {
    "taxi": ["34", "35", "62", "63"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "49": {
    "taxi": ["36", "50", "66"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "50": {
    "taxi": ["37", "38", "49"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "51": {
    "taxi": ["38", "39", "52", "67", "68"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "52": {
    "taxi": ["39", "40", "51", "69"],
    "bus": ["13", "41", "67", "86"],
    "underground": [],
    "blackticket": []
  },
  "53": {
    "taxi": ["40", "54", "69"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "54": {
    "taxi": ["41", "53", "55", "70"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "55": {
    "taxi": ["54", "71"],
    "bus": ["29", "89"],
    "underground": [],
    "blackticket": []
  },
  "56": {
    "taxi": ["42", "91"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "57": {
    "taxi": ["43", "58", "73"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "58": {
    "taxi": ["44", "45", "57", "59", "74", "75"],
    "bus": ["1", "46", "74", "77"],
    "underground": [],
    "blackticket": []
  },
  "59": {
    "taxi": ["45", "58", "75", "76"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "60": {
    "taxi": ["45", "61", "76"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "61": {
    "taxi": ["46", "60", "62", "76", "78"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "62": {
    "taxi": ["47", "48", "61", "79"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "63": {
    "taxi": ["48", "64", "79", "80"],
    "bus": ["34", "65", "79", "100"],
    "underground": [],
    "blackticket": []
  },
  "64": {
    "taxi": ["63", "65", "81"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "65": {
    "taxi": ["35", "64", "66", "82"],
    "bus": ["22", "63", "67", "82"],
    "underground": [],
    "blackticket": []
  },
  "66": {
    "taxi": ["49", "65", "67", "82"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "67": {
    "taxi": ["51", "66", "68", "84"],
    "bus": ["23", "52", "65", "82", "102"],
    "underground": ["13", "79", "89", "111"],
    "blackticket": []
  },
  "68": {
    "taxi": ["51", "67", "69", "85"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "69": {
    "taxi": ["52", "53", "68", "86"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "70": {
    "taxi": ["54", "71", "87"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "71": {
    "taxi": ["55", "70", "72", "89"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "72": {
    "taxi": ["42", "71", "90", "91"],
    "bus": ["42", "105", "107"],
    "underground": [],
    "blackticket": []
  },
  "73": {
    "taxi": ["57", "74", "92"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "74": {
    "taxi": ["58", "73", "75", "92"],
    "bus": ["58", "94"],
    "underground": ["46"],
    "blackticket": []
  },
  "75": {
    "taxi": ["58", "59", "74", "94"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "76": {
    "taxi": ["59", "60", "61", "77"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "77": {
    "taxi": ["76", "78", "95", "96"],
    "bus": ["58", "78", "94", "124"],
    "underground": [],
    "blackticket": []
  },
  "78": {
    "taxi": ["61", "77", "79", "97"],
    "bus": ["46", "77", "79"],
    "underground": [],
    "blackticket": []
  },
  "79": {
    "taxi": ["62", "63", "78", "98"],
    "bus": ["63", "78"],
    "underground": ["46", "67", "93", "111"],
    "blackticket": []
  },
  "80": {
    "taxi": ["63", "99", "100"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "81": {
    "taxi": ["64", "82", "100"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "82": {
    "taxi": ["65", "66", "81", "101"],
    "bus": ["65", "67", "100", "140"],
    "underground": [],
    "blackticket": []
  },
  "83": {
    "taxi": ["101", "102"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "84": {
    "taxi": ["67", "85"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "85": {
    "taxi": ["68", "84", "103"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "86": {
    "taxi": ["69", "103", "104"],
    "bus": ["52", "87", "102", "116"],
    "underground": [],
    "blackticket": []
  },
  "87": {
    "taxi": ["70", "88"],
    "bus": ["41", "86", "105"],
    "underground": [],
    "blackticket": []
  },
  "88": {
    "taxi": ["87", "89", "117"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "89": {
    "taxi": ["71", "88", "105"],
    "bus": ["55", "105"],
    "underground": ["13", "67", "140", "128"],
    "blackticket": []
  },
  "90": {
    "taxi": ["72", "91", "105"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "91": {
    "taxi": ["56", "72", "90", "105", "107"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "92": {
    "taxi": ["73", "74", "93"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "93": {
    "taxi": ["92", "94"],
    "bus": ["94"],
    "underground": ["79"],
    "blackticket": []
  },
  "94": {
    "taxi": ["75", "93", "95"],
    "bus": ["74", "77", "93"],
    "underground": [],
    "blackticket": []
  },
  "95": {
    "taxi": ["77", "94", "122"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "96": {
    "taxi": ["77", "97", "109"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "97": {
    "taxi": ["78", "96", "98", "109"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "98": {
    "taxi": ["79", "97", "99", "110"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "99": {
    "taxi": ["80", "98", "110", "112"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "100": {
    "taxi": ["80", "81", "101", "112", "113"],
    "bus": ["63", "82", "111"],
    "underground": [],
    "blackticket": []
  },
  "101": {
    "taxi": ["82", "83", "100", "114"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "102": {
    "taxi": ["83", "103", "115"],
    "bus": ["67", "86", "127"],
    "underground": [],
    "blackticket": []
  },
  "103": {
    "taxi": ["85", "86", "102"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "104": {
    "taxi": ["86", "116"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "105": {
    "taxi": ["89", "90", "91", "106", "108"],
    "bus": ["72", "87", "89", "107", "108"],
    "underground": [],
    "blackticket": []
  },
  "106": {
    "taxi": ["105", "107"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "107": {
    "taxi": ["91", "106", "119"],
    "bus": ["72", "105", "161"],
    "underground": [],
    "blackticket": []
  },
  "108": {
    "taxi": ["105", "117", "119"],
    "bus": ["105", "116", "135"],
    "underground": [],
    "blackticket": ["115"]
  },
  "109": {
    "taxi": ["96", "97", "110", "124"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "110": {
    "taxi": ["98", "99", "109", "111"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "111": {
    "taxi": ["110", "112", "124"],
    "bus": ["100", "124"],
    "underground": ["163", "153", "79", "67"],
    "blackticket": []
  },
  "112": {
    "taxi": ["99", "100", "111", "125"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "113": {
    "taxi": ["100", "114", "125"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "114": {
    "taxi": ["101", "113", "115", "126", "131", "132"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "115": {
    "taxi": ["102", "114", "126", "127"],
    "bus": [],
    "underground": [],
    "blackticket": ["108", "157"]
  },
  "116": {
    "taxi": ["104", "117", "127", "118"],
    "bus": ["86", "108", "127", "142"],
    "underground": [],
    "blackticket": []
  },
  "117": {
    "taxi": ["88", "116", "108", "129"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "118": {
    "taxi": ["116", "134", "129", "142"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "119": {
    "taxi": ["107", "108", "136"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "120": {
    "taxi": ["121", "144"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "121": {
    "taxi": ["120", "122", "145"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "122": {
    "taxi": ["95", "121", "123", "146"],
    "bus": ["123", "144"],
    "underground": [],
    "blackticket": []
  },
  "123": {
    "taxi": ["122", "124", "137", "148", "149"],
    "bus": ["122", "124", "144", "165"],
    "underground": [],
    "blackticket": []
  },
  "124": {
    "taxi": ["109", "111", "123", "130", "138"],
    "bus": ["77", "111", "123", "153"],
    "underground": [],
    "blackticket": []
  },
  "125": {
    "taxi": ["112", "113", "131"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "126": {
    "taxi": ["114", "115", "127", "140"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "127": {
    "taxi": ["115", "116", "126", "133", "134"],
    "bus": ["102", "116", "133"],
    "underground": [],
    "blackticket": []
  },
  "128": {
    "taxi": ["172", "188", "160", "142", "143"],
    "bus": ["199", "187", "142", "161", "135"],
    "underground": ["185", "140", "89"],
    "blackticket": []
  },
  "129": {
    "taxi": ["117", "118", "135", "142", "143"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "130": {
    "taxi": ["124", "131", "139"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "131": {
    "taxi": ["114", "125", "130"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "132": {
    "taxi": ["114", "140"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "133": {
    "taxi": ["127", "140", "141"],
    "bus": ["127", "140", "157"],
    "underground": [],
    "blackticket": []
  },
  "134": {
    "taxi": ["127", "118", "141", "142"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "135": {
    "taxi": ["129", "136", "143", "161"],
    "bus": ["108", "128", "161"],
    "underground": [],
    "blackticket": []
  },
  "136": {
    "taxi": ["119", "135", "162"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "137": {
    "taxi": ["123", "147"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "138": {
    "taxi": ["124", "150", "152"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "139": {
    "taxi": ["130", "140", "153", "154"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "140": {
    "taxi": ["126", "132", "133", "139", "154", "156"],
    "bus": ["82", "133", "154", "156"],
    "underground": ["89", "153", "128"],
    "blackticket": []
  },
  "141": {
    "taxi": ["133", "134", "142", "158"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "142": {
    "taxi": ["118", "129", "134", "141", "143", "158"],
    "bus": ["116", "157", "128"],
    "underground": [],
    "blackticket": []
  },
  "143": {
    "taxi": ["129", "135", "142", "128", "160"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "144": {
    "taxi": ["120", "145", "177"],
    "bus": ["122", "123", "163"],
    "underground": [],
    "blackticket": []
  },
  "145": {
    "taxi": ["121", "144", "146"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "146": {
    "taxi": ["122", "145", "147", "163"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "147": {
    "taxi": ["137", "146", "164"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "148": {
    "taxi": ["123", "149", "164"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "149": {
    "taxi": ["123", "148", "150", "165"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "150": {
    "taxi": ["138", "149", "151"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "151": {
    "taxi": ["150", "152", "165", "166"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "152": {
    "taxi": ["138", "151", "153"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "153": {
    "taxi": ["139", "152", "154", "166", "167"],
    "bus": ["124", "154", "180", "184"],
    "underground": ["111", "140", "163", "185"],
    "blackticket": []
  },
  "154": {
    "taxi": ["139", "140", "153", "155"],
    "bus": ["153", "140", "156"],
    "underground": [],
    "blackticket": []
  },
  "155": {
    "taxi": ["154", "167", "168", "156"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "156": {
    "taxi": ["140", "155", "157", "169"],
    "bus": ["140", "154", "157", "184"],
    "underground": [],
    "blackticket": []
  },
  "157": {
    "taxi": ["156", "158", "170"],
    "bus": ["133", "142", "156", "185"],
    "underground": [],
    "blackticket": ["115", "194"]
  },
  "158": {
    "taxi": ["141", "142", "157", "159"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "159": {
    "taxi": ["186", "198", "172", "170", "158"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "160": {
    "taxi": ["143", "128", "161", "173"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "161": {
    "taxi": ["135", "160", "174"],
    "bus": ["107", "135", "128", "199"],
    "underground": [],
    "blackticket": []
  },
  "162": {
    "taxi": ["136", "175"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "163": {
    "taxi": ["146", "177"],
    "bus": ["144", "176", "191"],
    "underground": ["111", "153"],
    "blackticket": []
  },
  "164": {
    "taxi": ["147", "148", "178", "179"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "165": {
    "taxi": ["149", "151", "179", "180"],
    "bus": ["123", "180", "191"],
    "underground": [],
    "blackticket": []
  },
  "166": {
    "taxi": ["151", "153", "181", "183"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "167": {
    "taxi": ["153", "155", "168", "183"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "168": {
    "taxi": ["155", "167", "184"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "169": {
    "taxi": ["156", "184"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "170": {
    "taxi": ["157", "159", "185"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "171": {
    "taxi": ["199", "173", "175"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "172": {
    "taxi": ["128", "159", "187"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "173": {
    "taxi": ["160", "174", "188", "171"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "174": {
    "taxi": ["161", "173", "175"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "175": {
    "taxi": ["162", "174", "171"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "176": {
    "taxi": ["177", "189"],
    "bus": ["163", "190"],
    "underground": [],
    "blackticket": []
  },
  "177": {
    "taxi": ["144", "163", "176"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "178": {
    "taxi": ["164", "189", "191"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "179": {
    "taxi": ["164", "165", "191"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "180": {
    "taxi": ["165", "181", "193"],
    "bus": ["153", "165", "184", "190"],
    "underground": [],
    "blackticket": []
  },
  "181": {
    "taxi": ["166", "180", "182", "193"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "182": {
    "taxi": ["181", "183", "195"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "183": {
    "taxi": ["166", "167", "182", "196"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "184": {
    "taxi": ["168", "169", "196", "197", "185"],
    "bus": ["153", "156", "180", "185"],
    "underground": [],
    "blackticket": []
  },
  "185": {
    "taxi": ["170", "184", "186"],
    "bus": ["157", "184", "187", "199"],
    "underground": ["153", "128"],
    "blackticket": []
  },
  "186": {
    "taxi": ["159", "185", "198"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "187": {
    "taxi": ["172", "188", "198"],
    "bus": ["128", "185"],
    "underground": [],
    "blackticket": []
  },
  "188": {
    "taxi": ["128", "173", "187", "199"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "189": {
    "taxi": ["176", "178", "190"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "190": {
    "taxi": ["189", "191", "192"],
    "bus": ["176", "180", "191"],
    "underground": [],
    "blackticket": []
  },
  "191": {
    "taxi": ["178", "179", "190", "192"],
    "bus": ["163", "165", "190"],
    "underground": [],
    "blackticket": []
  },
  "192": {
    "taxi": ["190", "191", "194"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "193": {
    "taxi": ["180", "181", "194"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "194": {
    "taxi": ["192", "193", "195"],
    "bus": [],
    "underground": [],
    "blackticket": ["157"]
  },
  "195": {
    "taxi": ["182", "194", "197"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "196": {
    "taxi": ["183", "184", "197"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "197": {
    "taxi": ["195", "196", "184"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "198": {
    "taxi": ["159", "186", "187", "199"],
    "bus": [],
    "underground": [],
    "blackticket": []
  },
  "199": {
    "taxi": ["171", "188", "198"],
    "bus": ["128", "161"],
    "underground": [],
    "blackticket": []
  }
};