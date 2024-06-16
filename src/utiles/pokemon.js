// 説明: 全体のポケモンAPIを取得するための関数
export const getAllPokemon = (url) => {
    /*
     【非同期処理】
     Promise: 非同期処理を扱うための構文
     resolve: 非同期処理が成功した場合に呼び出される
     reject: 非同期処理が失敗した場合に呼び出される
     async/await: 非同期処理を同期処理のように扱うための構文
    */
    return new Promise((resolve, reject) => {
        // fetch: データAPIを取得する
        fetch(url)
            // Promiseチェーンthen: 非同期処理が成功した場合に呼び出されるJson形式に変換
            .then((res) => res.json())
            //Promiseチェーンthen: resolveで成功した場合に呼び出される
            .then((data) => resolve(data));
        });
    };

// 説明: 各詳細ポケモンデータを取得するための関数
export const getPokemon = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => resolve(data));
    });
};