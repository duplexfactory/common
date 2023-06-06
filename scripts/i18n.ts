import fetch from "node-fetch";
import { writeFileSync } from 'fs';
import { join } from 'path';

const csv = require('csvtojson')

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
    const spreadSheetUrl = ""
    const res = await fetch("")
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
                writeFileSync(join(__dirname, '../../lang/en-US.ts'), 'export default ' + JSON.stringify(enResult), {
                    flag: 'w',
                });
                writeFileSync(join(__dirname, '../../lang/zh-Hant.ts'), 'export default ' + JSON.stringify(zhResult), {
                    flag: 'w',
                });

            });

}
main().then(r => {
    console.log('Completed')
})
