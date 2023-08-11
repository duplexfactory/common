import fetch from "node-fetch";
import { writeFileSync } from 'fs';
import { join } from 'path';
import csv from 'csvtojson';

function setDeepValue(obj: any, value: any, p: string) {
    let i;
    const path = p.split('.');
    for (i = 0; i < path.length - 1; i++) {
        if (!obj[path[i]])
            obj[path[i]] = {};
        obj = obj[path[i]];
    }
    obj[path[i]] = value;
}

const enResult = {}
const zhResult = {}

const main = async () => {
    // for google sheet: https://docs.google.com/spreadsheets/d/{{ID}}/gviz/tq?tqx=out:csv&sheet={{sheet_name}}
    const spreadSheetUrl = process.argv[2] || process.env.SHEET_URL || ""
    const res = await fetch(spreadSheetUrl)
    await csv()
        .fromStream(res.body)
        .subscribe(
            (json: {key: string, en: string, zh: string}) => {
                setDeepValue(enResult, json.en, json.key)
                setDeepValue(zhResult, json.zh, json.key)
            },
            () => {

            },
            () => {
                writeFileSync(join(__dirname, '../dist/lang/en-US.ts'), 'export default ' + JSON.stringify(enResult), {
                    flag: 'w',
                });
                writeFileSync(join(__dirname, '../dist/lang/zh-Hant.ts'), 'export default ' + JSON.stringify(zhResult), {
                    flag: 'w',
                });

            });

}
main().then(r => {
    console.log('Completed')
})
