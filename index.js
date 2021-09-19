const readline = require('readline');
const fetch = require("node-fetch");
const kana_ver = "alpha-0.0.3";
const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var url = "https://kana.renorari.net/api/api.json";
var userid = "tester";
var userkey = "test_TEST";
var customize_url = "https://raw.githubusercontent.com/TarochanChannel/Kana-dictionary/main/tester.kana";

(async () => {
    console.log(`Kana試験的コンソールクライアントをご利用いただきありがとうございます。\nこのクライアントは、KanaAPIバージョン${kana_ver}に準拠しています。\n${kana_ver}以降のKanaAPIはサポートしかねますのでご了承ください。\n`);
    await new Promise((resolve) => {
        readlineInterface.question(`KanaAPIサーバーのURLは、${url} に設定されています。\n変更する場合は入力してください。\n> `, (answer) => {
            if (answer != "") {
                url = answer;
            };
            console.log(`KanaAPIサーバーのURLは、${url} に設定されました。\n`);
            resolve();
        });
    });
    await new Promise((resolve) => {
        readlineInterface.question(`KanaAPIユーザのIDは、${userid} に設定されています。\n変更する場合は入力してください。\n> `, (answer) => {
            if (answer != "") {
                userid = answer;
            };
            console.log(`KanaAPIユーザのIDは、${userid} に設定されました。\n`);
            resolve();
        });
    });
    await new Promise((resolve) => {
        readlineInterface.question(`KanaAPIユーザのアクセスキー(パスワード)は、${userkey} に設定されています。\n変更する場合は入力してください。\n> `, (answer) => {
            if (answer != "") {
                userkey = answer;
            };
            console.log(`KanaAPIユーザのパスワードは、${userkey} に設定されました。\n`);
            resolve();
        });
    });
    await new Promise((resolve) => {
        readlineInterface.question(`KanaAPIカスタマイズURLは、${customize_url} に設定されています。\n変更する場合は入力してください。\n> `, (answer) => {
            if (answer != "") {
                customize_url = answer;
            };
            console.log(`KanaAPIカスタマイズURLは、${customize_url} に設定されました。\n`);
            resolve();
        });
    });
    console.log("これでKana試験的コンソールクライアントの設定は終了しました。\n\n");
    for (; ;) {
        await new Promise((resolve) => {
            readlineInterface.question("> ", (answer) => {
                fetch(url,{"method":"POST","body":`message=${encodeURI(answer)}&id=${encodeURI(userid)}&key=${encodeURI(userkey)}&customize_url=${encodeURI(customize_url)}`}).then((res) => res.json()).then((data) => {
                    console.log(data);
                    console.log();
                    resolve();
                });
            });
        });
    }
})();